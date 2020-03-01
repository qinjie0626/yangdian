let url = 'http://yd.msword.top'
let IndexData = url + '/getIndexData'
let getClassify = url +'/getClassify'
let getDetails  = url + '/getDetails'
let music = 'http://localhost:3000'
let Login = music + '/login/cellphone'
let Register= music + '/register/cellphone'
// 验证验证码
let captCha = music + '/captcha/verify'
let existence = music + '/cellphone/existence/check'
// 发送验证码
let sent = music + '/captcha/sent'
// 用户详情
let userDetail = music + '/user/detail'
export default {
    IndexData,
    getClassify,
    getDetails,
    Login,
    Register,
    captCha,
    existence,
    sent,
    userDetail
}