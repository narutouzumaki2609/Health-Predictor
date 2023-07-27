const express=require('express')
const bodyParser=require('body-parser');
const mongoose = require("mongoose");

const accountSid = 'AC7695ff238048a3ab64cdc079afce5776'; 
const authToken = 'c31996eb26df9ef58c547761d24bd66e'; 
const client = require('twilio')(accountSid, authToken);

app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

userSchema=mongoose.Schema({
     name:String,
     age:String,
     addr:String,
     phone:String,
     gender:String,
     height:String,
     weight:String,
     move:String,
     visio:String,
     hear:String,
     phydef:String,
     breath:String,
     tired:String,  
     inter:String,
     simpspeak:String,
     emout:String,
     reac:String,
     learn:String,
     recges:String,
     harmful:String,
     play_with_simple:String,
     Phy_disabled:String,
     Vision_disabled:String,
     Hearing_disabled:String,
     Respiratory_disabled:String,
     Social_syndrome:String,
     Cognitive_syndrome:String,
    

});
citySchema=mongoose.Schema({
    city:[String]

})

const User=new mongoose.model("User",userSchema);
const City=new mongoose.model("City",citySchema);

app.get("/",function(req,res){
    res.render("index");

});
app.get("/user",function(req,res){
    res.render("user");
})
var ans=[];
async function processUserData(phone) {
    try {
      const user = await User.find({ phone: phone });
  
      if (user.length === 0) {
        const usr = new User({
          // ... User data initialization ...
            name:name,
            age:age,
            addr:addr,
            phone:phone,
            gender:gender,
            height:height,
            weight:weight,
            move:move,
            
            visio:visio,
            hear:hear,
            phydef:phydef,
            breath:breath,
            tired:tired,  
            inter:inter,
            simpspeak:simpspeak,
            emout:emout,
            reac:reac,
            learn:learn,
            recges:recges,
            harmful:harmful,
            play_with_simple:play_with_simple,
                    
                
        });
  
        await usr.save();
  
        
        if(usr.move==='Y' || usr.phydef==='Y'){
            usr.Phy_disabled="Yes";
            ans.push('The Child is having Physical Disability');
             
        

        }
        if(usr.visio==='Y'){
            usr.Vision_disabled="Yes";
            ans.push('The Child is having Vision Disability');
             
        
        }
        if(usr.hear==='Y'){
            usr.Hearing_disabled="Yes";
            ans.push('The'+usr.name+'is having Hearing Disorder');
             
        
        }
        if(usr.breath==='Y' || usr.tired==="Y"){
            usr.Respiratory_disabled="Yes";
            ans.push('The Child is having Respiratory Syndrome');
             
        
        }
        if(usr.inter==='Y' || usr.simpspeak==="Y"|| usr.emout==='Y' || usr.reac==='Y'){
            usr.Social_syndrome="Yes";
            ans.push('The Child is having Social Syndrome');
             
        
        }
        if(usr.learn==='Y' || usr.recges==="Y"|| usr.harmful==='Y' || usr.play_with_simple==='Y'){
            usr.Cognitive_syndrome="Yes";
            ans.push('The Child is having Cognitive Syndrome');
             
        
        }
        await usr.save();
       
        
       }
       else{
        const usr=user[0];

        if(usr.move==='Y' || usr.phydef==='Y'){
            usr.Phy_disabled="Yes";
            ans.push('The Child is having Physical Disability');
             

        }
        if(usr.visio==='Y'){
            usr.Vision_disabled="Yes";
            ans.push('The Child is having Vision Disability');
             
        
        }
        if(usr.hear==='Y'){
            usr.Hearing_disabled="Yes";
            ans.push('The '+usr.name+' is having Hearing Disorder');
             
        
        }
        if(usr.breath==='Y' || usr.tired==="Y"){
            usr.Respiratory_disabled="Yes";
            
            ans.push('The Child is having Respiratory Syndrome');
        
        }
        if(usr.inter==='Y' || usr.simpspeak==="Y"|| usr.emout==='Y' || usr.reac==='Y'){
            usr.Social_syndrome="Yes";
            ans.push('The Child is having Social Syndrome');
             
        }
        if(usr.learn==='Y' || usr.recges==="Y"|| usr.harmful==='Y' || usr.play_with_simple==='Y'){
            usr.Cognitive_syndrome="Yes";
            ans.push('The Child is having Cognitive Syndrome');
             
        }
        await usr.save();


       
          
       
      }
    } 
    catch (err) {
      console.error(err);
    }
  }
  
  var name;
  var age;
  var addr;
  var phone;
  var gender;
  var height;
  var weight;
  var move;
  var visio;
  var hear;
  var phydef;
  var breath;
  var tired;
  var inter;
  var simpspeak;
  var emout;
  var reac;
  var learn;
  var recges;
  var harmful;
  var play_with_simple;
app.post("/user",function(req,res){
    name=req.body.name;
    age=req.body.age;
    addr=req.body.addr;
    phone=req.body.phoneNo;
    gender=req.body.gender;
    height=req.body.height;
    weight=req.body.weight;
    move=req.body.p1;
    visio=req.body.p2;
    hear=req.body.p3;
    phydef=req.body.p4;
    breath=req.body.p5;
    tired=req.body.p6;  
    inter=req.body.s1;
    simpspeak=req.body.s2;
    emout=req.body.s3;
    reac=req.body.s4;
    learn=req.body.c1;
    recges=req.body.c2;
    harmful=req.body.c3;
    play_with_simple=req.body.c4;
    processUserData(phone);
    // if(usr.Cognitive_syndrome==="Yes" ||usr.Hearing_disabled==="Yes" ||usr.Phy_disabled==="Yes" || usr.Respiratory_disabled==="Yes" || usr.Social_syndrome==="Yes" || usr.Vision_disabled==="Yes"){
    //     res.render("output",{item:"Your Child is Disabled",item2:"Our team will get back soon."});
    //    }
    //    else{
    //     res.render("output",{item:"Your Child is Not Disabled",item2:"Thank You for taking the survey"});
    //    }
//     User.find({phone:phone},async function(err,user){
//         if(err){
//             console.log(err);
//         }
//         else{
//             if(user.length==0){
//                 const usr=await new User({
//                     name:name,
//                     age:age,
//                     addr:addr,
//                     phone:phone,
//                     gender:gender,
//                     height:height,
//                     weight:weight,
//                     move:move,
                    
//                     visio:visio,
//                     hear:hear,
//                     phydef:phydef,
//                     breath:breath,
//                     tired:tired,  
//                     inter:inter,
//                     simpspeak:simpspeak,
//                     emout:emout,
//                     reac:reac,
//                     learn:learn,
//                     recges:recges,
//                     harmful:harmful,
//                     play_with_simple:play_with_simple,
                    
                
//                 }).save();
//                 // await usr.save();
               
//                 if(usr.move==='Y' || usr.phydef==='Y'){
//                     usr.Phy_disabled="Yes";
                  
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Physical Disability', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+919877769072' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();

//                 }
//                 if(usr.visio==='Y'){
//                     usr.Vision_disabled="Yes";
                    
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Vision Disability', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.hear==='Y'){
//                     usr.Hearing_disabled="Yes";
         
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The'+usr.name+'is having Hearing Disorder', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.breath==='Y' || usr.tired==="Y"){
//                     usr.Respiratory_disabled="Yes";
             
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Respiratory Syndrome', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.inter==='Y' || usr.simpspeak==="Y"|| usr.emout==='Y' || usr.reac==='Y'){
//                     usr.Social_syndrome="Yes";
                  
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Social Syndrome', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.learn==='Y' || usr.recges==="Y"|| usr.harmful==='Y' || usr.play_with_simple==='Y'){
//                     usr.Cognitive_syndrome="Yes";
                 
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Cognitive Syndrome', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 usr.save();
               
//                 if(usr.Cognitive_syndrome==="Yes" ||usr.Hearing_disabled==="Yes" ||usr.Phy_disabled==="Yes" || usr.Respiratory_disabled==="Yes" || usr.Social_syndrome==="Yes" || usr.Vision_disabled==="Yes"){
//                     res.render("output",{item:"Few medical issues have been identified in your ward.",item2:"Our team will get back to you soon for assistance and diagnosis."});
//                    }
//                    else{
//                     res.render("output",{item:"Your child does not suffer from any serious disability as of now.",item2:"Thank You for taking the survey. We will remind you to retake the survey after appropriate intervals."});
//                    }
//                }
//                else{
//                 const usr=user[0];
        
//                 if(usr.move==='Y' || usr.phydef==='Y'){
//                     usr.Phy_disabled="Yes";
                    
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Physical Disability', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();

//                 }
//                 if(usr.visio==='Y'){
//                     usr.Vision_disabled="Yes";
                    
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Vision Disability', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.hear==='Y'){
//                     usr.Hearing_disabled="Yes";
                   
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The '+usr.name+' is having Hearing Disorder', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.breath==='Y' || usr.tired==="Y"){
//                     usr.Respiratory_disabled="Yes";
                    
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Respiratory Syndrome', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.inter==='Y' || usr.simpspeak==="Y"|| usr.emout==='Y' || usr.reac==='Y'){
//                     usr.Social_syndrome="Yes";
                    
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Social Syndrome', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 if(usr.learn==='Y' || usr.recges==="Y"|| usr.harmful==='Y' || usr.play_with_simple==='Y'){
//                     usr.Cognitive_syndrome="Yes";
                 
                     
//                 client.messages 
//                 .create({ 
//                    body: 'The Child is having Cognitive Syndrome', 
//                    from: 'whatsapp:+14155238886',       
//                    to: 'whatsapp:+916283383206' 
//                  }) 
//                 .then(message => console.log(message.sid)) 
//                 .done();
//                 }
//                 usr.save();


               
                  
//                if(usr.Cognitive_syndrome==="Yes" ||usr.Hearing_disabled==="Yes" ||usr.Phy_disabled==="Yes" || usr.Respiratory_disabled==="Yes" || usr.Social_syndrome==="Yes" || usr.Vision_disabled==="Yes"){
//                 res.render("output",{item:"Your Child is Disabled",item2:"Our team will get back soon."});
//                }
//                else{
//                 res.render("output",{item:"Your Child is Not Disabled",item2:"Thank You for taking the survey"});
//                }


//                }
//         }
//     })
    console.log(ans);
    res.render('Result',{ans});
        
});
app.get("/admin",function(req,res){
    res.render("admin",{item:[],item2:""});
})
app.post("/admin",function(req,res){
    var city=req.body.city;
    User.find({addr:city},function(err,user){
        res.render("admin",{item:user,item2:city});
    })
})
app.listen(3000,function(req,res){
 console.log("Server");   
})