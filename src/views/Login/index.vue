<template>
    <div id='login'>
        <div class="menu_wrap "> 
         <ul class="menu_tab">
            <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
        </ul>
        <!--表单-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login_form" size="medium">
        <el-form-item  prop="username">
            <label>邮箱</label>
            <el-input type="text " v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password">
            <label>密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength='20' minlength='6'></el-input>
        </el-form-item>

         <el-form-item  prop="password" v-show="model === 'register'">
            <label>请再次输入密码</label>
            <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength='20' minlength='6'></el-input>
        </el-form-item>

        <el-form-item  prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="11">
                <el-col :span="15">
                    <el-input v-model="ruleForm.code" maxlength='6' minlength='6'></el-input>
                </el-col>
                <el-col :span="9">
                    <el-button type="success" class="block" @click="getSms()" :disabled="codeButton.Status">{{codeButton.Text}}</el-button>
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="block" :disabled="loginButtonStatus">{{ model == "login" ? '登录':'注册' }}</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import sha1 from 'js-sha1';
import { GetSms,Register,Login } from '@/api/login.js';//引入接口
import service from '@/utils/request.js';
import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
import { stripscript,validateEmail,validatecod,validatePass } from '@/utils/validate.js';
export default {
   // setup(props, { refs, context }){
      //console.log(context)
      /**
      attrs: (...) == this.$attrs
      emit: (...) == this.$emits
      isServer: (...) == this.$isServer
      listeners: (...) == this.$listeners
      parent: (...) == this.$parent
      refs: (...) == this.$refs
      root: (...) == this
      **/
  // }
     setup(props, { refs, root }){
       //验证码
        let validatecode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('验证码不能为空'));
        }else if(validatecod(value)){
          callback(new Error('验证码格式有误'));
        }else{
          callback();
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入验证码'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
      //验证邮箱
      let validateusername = (rule, value, callback) => {
        //ruleForm.username = stripscript(value);
        value = ruleForm.username;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else if(validateEmail(value)){
            callback(new Error('邮箱格式有误'));
        }        
        else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
          callback();//ture
        }
      };
      //验证密码
      let validatePassword = (rule, value, callback) => {
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));value
        }else if(validatePass(value)){
          callback(new Error('密码为6-20位数字与字母组合'));
        }  else {
          callback();
        }
      };
      //再次验证密码
       var validatePasswords = (rule, value, callback) => {
         //解决v-show的问题
         if(model.value === 'login'){
           callback();
         }
       ruleForm.password = stripscript(value);
        value = ruleForm.passwords;
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!value === ruleForm.password){
          callback(new Error('再次输入密码有误'));
        }else {
          callback();
      }
    };
      /**声明数据**/
      //这里放置data数据，生命周期，自定义的函数
      const menuTab = reactive( [
                { txt: '登录', current: true, type: 'login'},
                { txt: '注册', current: false, type: 'register'}
            ])
            //console.log(menuTab);
            //模块值
        const model = ref('login');
        const loginButtonStatus = ref(true);//login禁用
        const timer = ref(null);//定时器
        const codeButton = reactive ({
          Status : false,//验证码按钮开启中
          Text :'获取验证码'
        })       
            const  ruleForm = reactive({
              username: '',
              password: '',
              passwords: '',
              code: ''
            })
            //表单验证
            const rules = reactive({
            username: [
              { validator: validateusername, trigger: 'blur' }
            ],
            password: [
              { validator: validatePassword, trigger: 'blur' }
            ], 
            passwords: [
              { validator: validatePasswords, trigger: 'blur' }
            ],
            code: [
              { validator: validatecode, trigger: 'blur' }
            ]
          })
            //console.log(model.value);
            //console.log(isRef(model) ? '基础数据类型' : '对象类型')
           /**
           * 声明函数
           **/
          const toggleMenu = (data => {
              //console.log(data)
              menuTab.forEach((element) => {
                  element.current = false
              });
              data.current = true;
              //修改模块值
              model.value = data.type; 
              //重置表单
              refs['ruleForm'].resetFields();
              })
              /**
              * 获取验证码
              **/
          const getSms = (()=>{
              if(ruleForm.username == ''){
                root.$message.error('邮箱不能为空');
                return false
              }
              if(validateEmail(ruleForm.username)){
                root.$message.error('邮箱格式有误');
                return false
               }
               codeButton.Status = true;//验证按钮禁用
               codeButton.Text = '发送中';
              //请求接口,获取验证码
              let requestData = { username: ruleForm.username, module: model.value }
//setTimeout(() => {
                 GetSms(requestData).then(response => {
                  let data = response.data;
                  //console.log(data)
                  root.$message({
                  message: data.message,
                  type: 'success',
                });  
                //启用注册或登录按钮
                loginButtonStatus.value = false;
                //启用定时器，倒计时
                contDown(60)
                }).catch(erro => {
                  //console.log(erro)
                })
  //},3000) 
              })
              /**
              * 提交表单
              **/       
          const submitForm = (formName => {      
            refs[formName].validate((valid) => {
              if (valid) {
                //alert('submit!');
                //判断调用login或register接口
                model.value === 'login' ? login() : register()  
              }else {
                console.log('error submit!!');
                return false;
              }
            })
        })
        /**
         *登录
         * **/
        const login = (() =>{
           let requestData ={
                  username: ruleForm.username,
                  password: sha1(ruleForm.password),
                  code: ruleForm.code,
                  module: 'login'
                }
                //登录接口
                root.$store.dispatch('app/login', requestData).then(response =>{
                   let data = response.data;
                 root.$message({
                   message: data.message,
                   type: 'success'
                 })
                //页面跳转
                 root.$router.push({
                   name: 'Console'
                 })
                }).catch(error =>{

                })

                // Login(requestData).then(response => {
                //  console.log(response)
                //  let data = response.data;
                //  root.$message({
                //    message: data.message,
                //    type: 'success'
                //  })
                //  //页面跳转
                //  root.$router.push({
                //    name: 'Console'
                //  })
                // }).catch(error =>{

                // })
        })
        /**
         *注册
         ***/
        const register = (() =>{
           let requestData ={
                  username: ruleForm.username,
                  password: sha1(ruleForm.password),
                  code: ruleForm.code,
                  module: 'register'
                }
                //注册接口
                Register(requestData).then(response => {
                 console.log(response)
                 let data = response.data;
                 root.$message({
                   message: data.message,
                   type: 'success'
                 })
                 //注册后跳转登录页
                 toggleMenu( menuTab[0]);
                 cleacontDown();
                }).catch(error =>{

                })
        })//注册
        //倒计时
        const contDown = ((number) =>{
          //判断定时器是否存在,存在就清除
          //if(tiemr.value){clearInterval(timer.value)}
          let time = number;
          timer.value = setInterval(() =>{
            time--;
            console.log(time);
          if( time < 0 ){
            clearInterval(timer.value);
            codeButton.Status = false;
            codeButton.Text = "获取验证码"
          }else{
            codeButton.Text = `倒计时${time}秒`
          }
          },1000)
        })
        /**
         *  清除倒计时
         **/ 
        const cleacontDown = (() =>{
          codeButton.Status = false;
          codeButton.Text = '获取验证码';
          clearInterval(timer.value)
        }) 
          /**
           * 挂载完成后执行
           **/
          onMounted(() => {
            //GetSms()
            //console.log(process.env.VUE_APP_ABC) 

          })
          return{
            menuTab,
            model,
            ruleForm,
            rules,
            toggleMenu,  
            submitForm,
            getSms,
            loginButtonStatus,
            codeButton
          }
    },
}
</script>
<style lang="scss" scoped>
    #login{
        background-color: #344a5f;
        height: 100vh;
    }
    .menu_wrap{
        width: 330px;
        height: 500px;
        margin: auto;    
    }
    .menu_tab{
        text-align: center;
        li{     
            display:inline-block;
            border-radius: 2px;
            width: 88px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
        }
        .current{
            background-color: rgba( 0, 0, 0,.1);
        }  
    }
    .login_form{
        margin-top: 29px;
        label{
          display: block;
          font-size: 14px;
          color: #fff;
          margin-bottom: 3px; 
        }
    .block{
        display: block;
        width: 100%;  
    }   
    }
</style>



<!--
密码加密：
1·在前端加密预加密一次
登陆密码：123456（普通字符串）
经过加密后： sha1（'123456'） == '67sa5d65as67f567as567f57as5' (普通加密后的字符串)

2·后台加密
接受的字符串：'67sa5d65as67f567as567f57as5' 
后台在次加密：md5('67sa5d65as67f567as567f57as5') == '8s7af678a786f7856da5g78a678ds8a' （最终的加密后的密码）
最终新的字符串写入数据库：8s7af678a786f7856da5g78a678ds8a

3·登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示
-->