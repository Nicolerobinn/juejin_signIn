const got = require('got')

const { cookie, aid, uuid, _signature, PUSH_PLUS_TOKEN } = require('./config')

const BASEURL = 'https://api.juejin.cn/growth_api/v1/check_in' // 掘金签到api

const URL = `${BASEURL}?aid=${aid}&uuid=${uuid}&_signature=${_signature}`


// http header 去掘金的请求里面拿
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
const HEADERS = {
  cookie,
  'user-agent': USER_AGENT
}

// 签到
const  signIn = async () =>{
  const res = await got.post(URL, {
    hooks: {
      beforeRequest: [
        options => {
          Object.assign(options.headers, HEADERS)
        }
      ]
    }
  })
  console.log(res.body)
  handlePush(res.body)
}

 // pushplus 推送
const handlePush = async   (desp)=> {
  const body = {
    token:PUSH_PLUS_TOKEN,
    title: '签到结果',
    content: desp
  };
  const res = await got.post('http://www.pushplus.plus/send', {
    json: body
  })
  console.log(res.body)
}

signIn()

