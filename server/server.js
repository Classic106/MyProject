const mongoose = require("mongoose");

const app = require('./app');

mongoose.connect(process.env.DB,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, 
    function(err){
        if(err) console.log(err);
});

app.listen(process.env.PORT, ()=>{
  console.log('Server opened on port '+process.env.PORT);
});

module.exports = app;
