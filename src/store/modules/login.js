import { Login } from '@/api/login.js';
   const state = {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
        //isCollapse: JSON.parse( localStorage.getItem('isCollapse')) || false
        //isCollapse: Cookie.get('isCollapse') || false
    }
    const getters = {  //类似computed，计算属性
       count: state => state.count + 10
    }
    const mutations = { //同步操作,没有回调处理事件
        SET_COLLAPSE: (state) => {
            console.log('login')
            state.isCollapse = !state.isCollapse;
            //console.log(state.isCollapse)
            //html5本地存储
            //Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
            window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
            //windw.localStorage.setItem('isCollapse', JSon.stringify('isCollpase'))
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
                    resolve(response)
                }).catch(() => {
                    reject()
                })
            })
        }
    }

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
};