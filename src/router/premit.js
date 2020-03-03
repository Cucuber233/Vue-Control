import router from "./index";
import { getToken } from '@/utils/app.js';

const whiteRouter = ['/login']

//路由守卫
router.beforeEach((to, from, next) => {
    //console.log(to)  // 进入的页面（下一个页面）
    //console.log(from)  // 离开之前俺的页面（上一个页面）
   // console.log(next)
    
    if(getToken()){
        //console.log('存在')
        next()
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login')
        }
        //1.直接进入 index 的时候，参数 to 被改变成了 "/index", 触发路由指向，就会跑 berdoreEach
        //2.再一次 next 指向了；哦滚， 再次发生路由指向， 再跑beforeEach， 参数的 to 被改变成了 "/login"
        //3.白名单判断存在， 则直接执行 next()，因为没有参数，所以不会再次跑 beforeEach
    }
  })