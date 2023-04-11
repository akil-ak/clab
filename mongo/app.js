var express=require('express')
var mongoose =require('mongoose')
var bodyparser=require('body-parser')
var methodOverride=require('method-override')
const app=express()
app.set('view engine','ejs')
app.listen(3000);
app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
const url="mongodb+srv://Akil:eNaCmWvsNfhDM63D@cluster0.9lx2cvr.mongodb.net/details?retryWrites=true&w=majority"
mongoose.connect(url,
    {useNewUrlParser:true,
        useUnifiedTopology:true}).then(()=>{
            console.log("connected")
        }).catch(e=>console.log(e));
        const schema=new mongoose.Schema({
            name:{
                type:String,
                required:true
            },
            detail:{
                type:String,
                required:true
            }
        })
        var details=mongoose.model('details',schema);
app.get("/",(req,res)=>{
    details.find().then((data)=>{
        console.log(data);
        res.render('index',{data:data})
    }).catch(e=>console.log(e))
   

})
app.post("/add",(req,res)=>{
    var data=new details(
        {name:req.body.name,
            detail:req.body.detail
        });
        data.save().then(()=>{
            console.log("data saved")
            res.redirect("/")
        }).catch(e=>console.log(e));
})
app.delete("/delete/:id",(req,res)=>{
    details.deleteOne({_id:req.params.id}).then((data)=>{
        console.log(data);
    }).catch(e=>console.log(e));
})
app.get('/update/:id',(req,res)=>{
    details.findById({'_id':req.params.id}).then((data)=>{
        res.render("edit",{data:data})
    }).catch(e=>console.log(e));
    app.put('/update/:id',(req,res)=>{
        details.findOne({'_id':req.params.id}).then((data)=>{
            data.name=req.body.name,
            data.detail=req.body.detail
            data.save().then(()=>{
        res.redirect("/");        
            }).catch(e=>console.log(e));

        })
    })
   
})