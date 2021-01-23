const express = require('express');
const fs = require('fs')

const getImage = require('./util/casUtils');
const cookieParser = require('cookie-parser');
const { access_token } = require('./config');
const stringRandom = require('string-random');

const app = express();

let key2mf = [];
let availuser = new Array();

app.use(cookieParser());

app.get('/captcha', async function(req, res){
  let cas = await getImage();
  res.setHeader("Content-Type", 'image/gif');
  res.setHeader("Set-Cookie", `key=${cas[1]}; Path=/check`);
  key2mf.push({key: cas[1], mf: cas[2]});
  let content = fs.readFileSync(`./tmp/${cas[0]}.gif`,'binary'); 
  res.writeHead(200, 'Ok');
  res.write(content, 'binary');
  console.log(key2mf);
  res.end();
})

app.get('/check/:answer', async function(req, res){
  // if(req.params.answer == keyreq.cookies.key)
  console.log(req.cookies);
  if (req.cookies['key'] !== undefined || req.cookies['key'] !== 'A') {
    console.log(key2mf[0].key)
    console.log(key2mf[0].key)
    for(let i in key2mf) {
      if(key2mf[i].key === req.cookies['key'] && key2mf[i].mf === req.params.answer) {
        userKey = stringRandom()
        availuser[serverKey] = new Date().getTime();
        res.setHeader("Set-Cookie", `key=A; Path=/check`);
        res.send({
          success: true,
          userkey: userKey
        });
        res.end();
        return;
      } else {
        res.setHeader("Set-Cookie", `key=A Path=/check`);
        res.send({
          success: false
        });
        res.end();
        return;
      }
    }
    res.setHeader("Set-Cookie", `key=A Path=/check`);
    res.send({
      success: false
    });
    res.end();
  }
})

app.get('/server/:access_token/:user_token', (req, res) => {
  if(req.params.access_token == access_token) {
    if(availuser[req.params.user_token] == undefined) {
      res.send({success:false, message: 'Check failed'});
    } else {
      res.send({success:true, checkTime: availuser[req.params.user_token]})
    }
  } else {
    res.send({success: false, message:'403'})
  }
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000,'0.0.0.0', function(){
  console.log('Captcha Server is running');
})