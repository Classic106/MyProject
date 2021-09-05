const { unlink } = require("fs").promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongooseHidden = require('mongoose-hidden')();

const { userScheme, User } = require('./userScheme');
const { Car, TmpCar } = require('../cars/carScheme');

const saltRounds = 10;
const secret = process.env.SECRET;

userScheme.plugin(mongooseHidden, { hidden: { _id: false } });

(()=>{
    setInterval(() => {
        User.find({isDeleted: true})
        .then(users =>{
            for(let key in users){
                if(users[key].deleteDate+2.628e+9 < Date.now())
                 User.deleteOne({_id: users[key]._id});
            }
        })
    }, 2147483647);
})();

class Models{

    async checkUser(body){
        
       return User.find({})
        .or([{'email': body.email},{'login': body.login}])
        .then(user => {
            if(!user.length) return true;
            if(user.length >= 2) return 'both';
            if(user[0].email === body.email) return 'email';
            if(user[0].login === body.login) return 'login';
            return new Error('Somethig wrong');
        });
    }

    getById(id){
        return User.findOne({_id: id})
        .then(user => user.isAdmin ? new Error('User not found!!!') : user);
    }

    getAll(token){
        
        const { id } = jwt.verify(token, secret);

        return User.findOne({_id: id})
            
            .then(user =>
                (!user && !user.isAdmin) ?
                    new Error('User not found') : 
                        User.find({}).populate('carsId')
            )
    }

    getAuth(token){
            const { id } = jwt.verify(token, secret);
            
            if(!id) throw new Error('User not found');

            return User.findOne({_id: id})
                .populate('carsId')
                .then(user => {
                    //console.log(user);
                    if(user && !user.isDeleted) {
                        delete user.isDeleted;
                        return user
                    };
                    throw new Error('User not found');
                })
    }

    postAuth(body){

        return User.findOne({})
        .or([{'email': body.login},{'login': body.login}])
        .where('isDeleted').equals(false)
        .populate('carsId')
        .then(async user => {

            if(!user) return new Error('User Not Found');
            
            const compare = await bcrypt.compare(body.password, user.password);

            return compare ? {
                user, token: jwt.sign({id: user._id}, secret)
            } : new Error('User Not Found');
        })
    }

    postRegistration(body){
        
        return User.find({})
            .or([{'email': body.email},{'login': body.login}])
            .then(async user => {

                const salt = await bcrypt.genSalt(saltRounds);
                body.password = await bcrypt.hash(body.password, salt);
            
                return (user.length > 0) ? new Error('Email or login is exist') :
                    new User({...body, date: Date.now()}).save()
                        .then(user => {
                           
                            delete user.isDeleted;
                            return {
                                user,
                                token: jwt.sign({id: user._id}, secret)
                            }
                    })
            })
    }

    postRegistrationAdmin(body, token){

        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user) return new Error('User not found');
                if(!user.isAdmin) return new Error('Authorization failed');
            
                return new User(body).save().then(user => true)
            })
    }
    
    deleteItem(idUser, token){

        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
        .then(async u => {

            if(!u) return new Error('User not found');
            
            return User.findOne({_id: idUser})
                .then(async user =>{
                    
                    if(!user) return new Error('User not found');

                    if(user.carsId.length > 0){

                    await Car.find({_id: [...user.carsId]})
                        .then(async cars => {

                            for(let key in cars){

                                if(cars[key].images.length > 0){

                                    for(let pic in cars[key].images){
                                        
                                        const uploadPath = __dirname.replace(
                                            /\/server\/.+/,
                                            '/server/public/carsImages/'
                                        );
                                        
                                        unlink(
                                            uploadPath+cars[key].images[pic]
                                            .match(/\w+\.(jpg|jpeg|png)$/
                                        )[0]);
                                    }
                                }
                            }
                        await Car.deleteMany({_id: [...user.carsId]});
                    });
                }
               
                await TmpCar.find({userId: user._id})
                .then(tmpCars =>{
                    
                    if(tmpCars.length > 0){

                        let tmpCarsIds = [];

                        for(let key in tmpCars){
                            
                            const tmpCar = tmpCars[key];

                            tmpCarsIds.push(tmpCar._id);
                            
                            if(tmpCar.images.length > 0){
                            
                                for(let pic in tmpCar.images){
                                    const uploadPath = __dirname.replace(
                                        /\/server\/.+/,
                                        '/server/public/tempCarsImages/'
                                    );
                                    
                                    unlink(uploadPath+tmpCar.images[pic]
                                        .match(/\w+\.(jpg|jpeg|png)$/)[0]);
                                }
                            }
                        }
                        TmpCar.deleteMany({_id: tmpCarsIds})
                        .then(car => car);
                    }
                });

                if(id == user._id && !u.isAdmin){
                    
                    return User.findOneAndUpdate(
                        {_id: idUser},
                        {   
                            isDeleted: true,
                            deleteDate: Date.now(),
                        },
                        {new: true}
                    )
                    .then(user => {
                        delete user.isDeleted;
                        return user;
                    });
                        
                }else if(u.isAdmin){

                    User.deleteOne({_id: idUser})
                        .then(()=> User.find({}))
                        
                }else return new Error('User not found');
            });
        })
    }

    async patchItem(body, idUser, token){
        
        const { id } = jwt.verify(token, secret);
        
        if(body.password){
            const salt = await bcrypt.genSalt(saltRounds);
            body.password = await bcrypt.hash(body.password, salt);
        }

        return User.findOne({_id: id})
        .then(user => {
            if(!user) return new Error('User not found');
            return (id == user.id || user.isAdmin) ?
                User.findOneAndUpdate({_id: idUser}, body, {new: true})
                    .populate('carsId')
                    .then(user => {
                        delete user.isDeleted;
                        return user;
                    })
                : new Error('User not found');
        })
    }
}

module.exports = new Models();