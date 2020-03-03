import { Login } from '@/api/login.js';
import { setToken, setUserName, getUserName } from '@/utils/app';
   const state = {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
        //isCollapse: JSON.parse( localStorage.getItem('isCollapse')) || false
        //isCollapse: Cookie.get('isCollapse') || false
        to_ken: '',
        username: getUserName() || false
    }
    const getters = {  //类似computed，计算属性
       count: state => state.count + 10
    }
    const mutations = { //同步操作,没有回调处理事件
        SET_COLLAPSE: (state) => {
            console.log('app')
            state.isCollapse = !state.isCollapse;
            //console.log(state.isCollapse)
            //html5本地存储
            //Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
            window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
            //windw.localStorage.setItem('isCollapse', JSon.stringify('isCollpase'))
        },
        SET_TOKEN: (state, value) => {
            state.to_ken = value
        },
        SET_USERNAME: (state, value) => {
            state.username = value
        }
    }
    const actions = {//同步或异步操作
        //异步，请求接口返回数据后，接着去做别的事情(可以回调处理事件)
        //setMenuStatus(content, data){
        // content.state
        // content.getters
        // content.commit
        // content.rootGetters
        // content.rootState
        // content.commit('SET_COLLAPSE')
        //}
        login(content, data) {
            return new Promise((resolve, reject) => {
                //接口
                Login(data).then(response => {
                    //token, username
                    console.log(response)
                    let data = response.data.data;
                    //存到state
                    content.commit('SET_TOKEN', data.token);
                    content.commit('SET_USERNAME', data.username);
                    //存到cookit
                    setToken(data.token)
                    setUserName(data.username)
                    resolve(response)
                }).catch(() => {
                    reject()
                })
            })
        }
    }

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};