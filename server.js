//express
let express = require("express");
let app = express();
var reload = require('reload')
const path = require("path");

//Static Folder
app.use(express.static(__dirname + '/public/dist'));

//Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Morgan
let morgan = require("morgan");
app.use(morgan("dev"));

//Mongo DB
let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/usersSchema');
let UserSchema = new mongoose.Schema({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true},
    email:{type:String, require:true},
    editable:{type:Boolean, require: true}
})

mongoose.model("User",UserSchema);
let User = mongoose.model("User", UserSchema);

//Routes
app.get("/users", (req, res, next) => {
    console.log("Server > GET '/users' ");
    User.find({}, (err, users)=>{
        return res.json(users);
        console.log(res.json(users));
    })
})

app.post("/users",(req,res,next)=>{
    console.log("Server > POST '/users' ", req.body);
    delete req.body._id
    User.create(req.body,(err,user)=>{
        if(err) return res.json(err)
        else return res.json(user)
    })
})

app.delete("/users/:id",(req,res,next) => {
    console.log(req.params.id);
    User.deleteOne({_id:req.params.id},(err, data)=>{
        if(err) return res.json(err)
        else return res.json(data)
    })
})

app.put("/users/:id",(req,res,next)=>{
    User.update({_id:req.params.id},req.body,(err, rawData)=>{
        if(err) return res.json(err)
        else return res.json(rawData)
    })
})

app.all("=",(req,res,next) => {
    res.sendfile(path.resolve("./public/dist/index.html"))
})

reload(app);
app.listen(1337);