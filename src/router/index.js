import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//引入布局组件
import Layout from '@/views/Layout/index.vue';

const routes = [
  {
    path: "/",
    redirect: "login", //重定向
    hidden: true,
    meta: {
      name: '主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: '登录'
    },
    component: ()=> import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",  
    meta: {
      name: '控制台',
      icon: 'console'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    children: [  
      {
        path: "/index",
        name: "Index",
        meta: {
          name: '首页 '
        },
        component: () => import("../views/Console/index.vue")
      },
    ]
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",  
    meta: {
      name: '信息管理',
      icon: 'info'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "Info",
        meta: {
          name: '信息列表'
        },
        component: () => import("../views/info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "Index",
        meta: {
          name: '信息分类'
        },
        component: () => import("../views/info/category.vue")
      }
    ]
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",  
    meta: {
      name: '用户管理',
      icon: 'user'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    children: [
      {
        path: "/info",
        name: "Info",
        meta: {
          name: '用户列表'
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  },

];

const router = new VueRouter({
  routes
});

export default router;
