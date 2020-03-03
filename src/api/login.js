import service from '@/utils/request.js';//引入拦截器和axios

/**
 * 获取验证码
 * **/
export function GetSms(data) {
   return service.request({
    method: 'post',
    url: '/getSms/',
    data //data: data , 左边data是变量名（key）后台接收，右边data为接收的参数，如果两者同名可以写成一个
  })
}
/**
 * 获取用户角色
 **/
/**
 * 登录
 **/
export function Login(data) {
  return service.request({
    method: 'post',
    url: '/login/',
    data
  })
}
/**
 * 注册
 **/
export function Register(data){
   return service.request({
      method: 'post',
      url: '/register/',
      data //data: data , 左边data是变量名（key）后台接收，右边data为接收的参数，如果两者同名可以写成一个
    })
}
//请求接口
