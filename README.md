# Chemistry Captcha
化学验证码

# 使用
python目录下提供了一些小工具，不做解释

1. 修改config.js中的access_token
2. `yarn && yarn server`，服务将在0.0.0.0:3000上启动
3. Enjoy

# API

## /captcha
获取一张验证码的图片并在客户端设置cookie。

## /check/:answer
检查答案是否正确，以json返回。

- 若成功，success=true并返回userkey用作服务端验证，同时清除客户端cookie
- 若失败，success=false，同时清除客户端cookie

任何一种情况下的重新验证都需再次获取验证码图片

## /server/:access_token/:user_token
access_token: 服务端token，在config.js中设置

user_token: 由用户传入的token，在check接口调用且验证成功后返回
