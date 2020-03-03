/**过滤特殊字符**/
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
     rs = rs + str.substr(i, 1).replace(pattern, '');
   }
  return rs;
  }
/**验证邮箱**/
export function validateEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!reg.test(value)){
        return true 
    }
    else{
        return false
    }
}
/**验证码**/
export function validatecod(value) {
    let reg = /^[a-zA-Z0-9]{6}$/;
    if(!reg.test(value)){
        return true
    }else{
        return false
    }
}
/**验证密码**/
export function validatePass(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value) ? true : false;
}