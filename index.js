const express = require('express');
const fs = require('fs')

const getImage = require('./util/casUtils');
const cookieParser = require('cookie-parser');
const config = require('./config');
const stringRandom = require('string-random');

const app = express();

let key2mf = new Array();
let key2cas = new Array();
let availuser = new Array();

app.use(cookieParser());

app.get('/captcha', async function(req, res){
  let cas = await getImage();
  res.send({success: true, key: cas[1]});
  key2mf[cas[1]] = cas[2];
  key2cas[cas[1]] = cas[0]
  console.log(key2mf);
  res.end();
})

app.get('/image/:key', function(req,res) {
  let content = fs.readFileSync(`./tmp/${key2cas[req.params.key]}.gif`,'binary');
  res.setHeader("Content-Type", 'image/gif');
  res.writeHead(200, 'Ok');
  res.write(content, 'binary');
  // console.log(key2mf);
  res.end();
})

app.get('/check/:key/:answer', async function(req, res){
  // if(req.params.answer == keyreq.cookies.key)
  // console.log(req.cookies);
  if (req.params.key !== undefined || req.params.key !== 'A') {
    //console.log(key2mf[0].key)
    // let success = false;
      if(key2mf[req.params.key] !== undefined  && key2mf[req.params.key] === req.params.answer) {
        userKey = stringRandom()
        availuser[userKey] = new Date().getTime();
        delete key2mf[req.params.key];
        res.setHeader("Set-Cookie", `key=A; Path=/check`);
        res.send({
          success: true,
          userkey: userKey
        });
        res.end();
        return;
      }
    // res.setHeader("Set-Cookie", `key=A Path=/check`);
    delete key2mf[req.params.key];
    res.send({
      success: false
    });
    res.end();
  }
})

app.get('/server/:access_token/:user_token', (req, res) => {
  if(req.params.access_token == config.access_token) {
    if(availuser[req.params.user_token] == undefined) {
      res.send({success:false, message: 'Check failed'});
    } else {
      res.write({success:true, checkTime: availuser[req.params.user_token]})
      delete availuser[req.params.user_token];
      res.end();
      /// NEED TEST
    }
  } else {
    res.send({success: false, message:'403'})
  }
})
if(config.debug) app.get('/', express.static('./test'));

app.listen(3000,'0.0.0.0', function(){
  console.log('Captcha Server is running');
})