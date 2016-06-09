var express = require('express');
var app = express();
var portNumber=8000;
var MongoClient = require('mongodb').MongoClient;

app.listen(portNumber);

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html" );
})

app.get('/index.html', function (req, res) {

   
   response = {
       names:req.query.names,
       email:req.query.email
   };
  
   
   // res.write(response.names);
   // console.log("ijijijijijij");
   console.log(response);
   // res.write(response.email);

  
   // res.(response);
   
   
  

setTimeout(function(){

MongoClient.connect("mongodb://localhost:27017/realbox",function(err,db){

if(!err)
  console.log("connected");
else console.log(err);

var collection= db.collection('users');



var user1={"name":response.names,"email_id":response.email};

collection.insert([user1],function(err,result){
if(err)
  console.log(err);

else { console.log(result);
}


});

collection.find().toArray(function(err,result){

if(err){
  console.log(err);


}
else
  if(result.length){
    
    console.log("result");
    console.log(result);
    res.write("<h1>Users Registered so far</h1>");
  
    res.write(JSON.stringify(result));
    res.write("<br>");
// console.log("Found %j \n" , result);
// res.json(result);
res.end();
}
else{
  console.log("Sorry no result found");

}


db.close( );
  

})




// app.use(express.static('public'));



});

},4000);
});