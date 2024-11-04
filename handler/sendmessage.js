const client=require("twilio")('API key','password');
const sendmessage=function(req,res){
 // console.log(req.body);
  const mobile="+91"+req.body.mobile;
  const message=req.body.message;
  console.log(mobile);
  client.messages.create({
   body: message,
   to: mobile,
   from: '<your assigned number>'
}).then(function(message){
  console.log(message);
})
.catch(error => console.log(error))
  res.end("message sent");
}

module.exports={sendmessage};
