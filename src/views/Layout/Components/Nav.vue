<template>
    <div id='nav-wrap'>
      <div class="logo"><img class="image" src="../../../images/logo.png" alt="无图片"></div>
      <el-menu default-active="1-4-1" 
      class="el-menu-vertical-demo" 
      :collapse="isCollapse" 
      background-color="transparent" 
      text-color='#fff'
      router>  
         <template v-for='(item, index) in routers'> 
          <el-submenu  v-if='!item.hidden' :key='item.id' :index="index + ''">
            <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
            <span slot="title">{{item.meta.name}}</span>      
            </template>
            <el-menu-item-group>
            <el-menu-item v-for='subItem in item.children' :key='subItem.id' :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
         </template>
        </el-menu>
    </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api';
export default {
    name: 'navMenu',
    setup( props, { root }){
      //data数据
      //console.log(root.$router.options.routes);
      const routers = reactive(root.$router.options.routes);
      /***
      * computed监听
      **/
      const isCollapse = computed(() => {
        return root.$store.state.app.isCollapse
      })

      return {
        isCollapse,
        routers
      };
    }
}   
</script>

<style lang='scss' scoped>
@import '../../../styles/config.scss';
   #nav-wrap{
       position: fixed;
       top: 0;
       left: 0;
       width: $navMenu;
       height: 100vh;
       background-color: #344a5f;
       @include webkit(transition, all .3s ease 0s);
   }
   svg{
     font-size: 18px;
     margin-right: 10px;
   }
   .logo{
     text-align: center;
     margin-top: -15px;
     margin-bottom: -15px; 
     .image{
       width: 200px;
       height: 150px;
       @include webkit(transition, all .3s ease 0s);
      }
    }
    .open{ #nav-wrap{ width: $navMenu; }}
    .close{
       #nav-wrap{ width: $navMenuMin; }
       .logo img{
         padding-top: 10px;
         width: 100%;
         height: 60px;
       }
    }
    .el-menu{
      border: none;
    }



//    .el-menu-vertical-demo:not(.el-menu--collapse) {
//     width: 200px;
//     min-height: 400px;
//   }
</style>