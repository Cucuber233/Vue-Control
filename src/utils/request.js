import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, getUserName } from './app.js';


const BASEURL = process.env.NODE_ENV === 'production' ? '' : 'devApi';

//创建axios，赋给变量service
//撸码前端API地址：http://www.web-jshtml.cn/productapi
const service = axios.create({
  baseURL: BASEURL,  // http://192.168.50.74:8080/devApi/ == http://www.web-jshtml.cn/productapi
  timeout: 15000,
});


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //后台需要前端这边传相关的参数（在请求头添加参数）
    //Tokey
    //userId
    //sui
    //console.log(config.headers)
    //业务需求

    //请求头添加参数
    config.headers.Tokey = getToken();
    config.headers.username = getUserName();
    config.headers.sui = '333333';
    
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么 
    //console.log(response)
    let data = response.data;
    if(data.resCode !== 0){
      //console.log(Message)      
      Message.error(data.message);
      return Promise.reject(data); //跑catch
    }else{
      return response;
      //return Promise.resolve(data); //跑then
    }
    //return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default service;//导出
/**export default 外部引用不需花括号**/
/**export 外部引用需花括号**/