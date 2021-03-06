const {
    checkUser,
    getAll,
    postRegistration,
    postRegistrationAdmin,
    getAuth,
    postAuth,
    deleteItem,
    patchItem,
    getById,
} = require('./models');

class Controller{

    async postCheck(req, res){
        const { body } = req;
        
        if(!body.email && !body.login) {
            res.status(402).json({message: 'Fields is not defined'});
            return;
        }
        
        try{
            const check = await checkUser(body);
            if(check instanceof Error) throw check;
            res.json(check);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }

    async getById(req, res){
        const { id } = req.params;

        if (!id) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        try {
        const result = await getById(id);
        
        if (result instanceof Error) throw result;
            res.json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async getAll(req, res){
        const { authorization } = req.headers;

        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }
        
        try{
            const users = await getAll(authorization);
            if(users instanceof Error) throw users;
            res.json(users);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }

    async postRegistration(req, res){
        try{
            const { body } = req;
            if(!body.email || !body.password || !body.login) {
                res.status(402).json({message: 'Fields is not defined'});
                return;
            }
            
            body.isDeleted = false;
            body.isAdmin = false;
            body.name = '';
            body.phone = '';
            body.additionalPhone = '';
            
            const user = await postRegistration(body);
            
            if(user instanceof Error) throw user;
            res.header('Authorization', user.token);
            res.json(user.user);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }

    async postRegistrationAdmin(req, res){
        try{
            const { body } = req;
            const { authorization } = req.headers;
        
            if(!authorization){
                res.status(403).json({message: 'Authorization failed'});
                return;
            }
        
            if(!body.email || !body.password || !body.login) {
                res.status(402).json({message: 'Fields is not defined'});
                return;
            }
            
            body.isDeleted = false;
            body.isAdmin = true;
            
            const result = await postRegistrationAdmin(body, authorization);
            if(result instanceof Error) throw result;
            res.json(result);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }

    async getAuth(req, res){

        const { authorization } = req.headers;
        
        if(!authorization){
            res.status(403).json({message: 'Authorization failed'});
            return;
        }

        try{
            const user = await getAuth(authorization);
            if(user instanceof Error) throw user;
            res.json(user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    async postAuth(req, res){

        const { body } = req;
        
        if(body && (!body.login || !body.password)) {
            res.status(403).json({message: 'Fields is not defined'});
            return;
        }
        try{
            const user = await postAuth(body);
            
            if(user instanceof Error) throw user;
            res.header('Authorization', user.token);
            res.json(user.user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    async deleteUser(req, res){
                
        const { authorization } = req.headers;
        
        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }
        try{
            const { id } = req.params;
            const user = await deleteItem(id, authorization);
           //console.log(user);
            if(user instanceof Error) throw user;
            
            res.json(user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    async patchUser(req, res){
                
        const { authorization } = req.headers;

        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }

        try{
            const { id } = req.params;
            const { body } = req;
            const user = await patchItem(body, id, authorization);
            if(user instanceof Error) throw user;
            res.json(user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
}

module.exports = new Controller();