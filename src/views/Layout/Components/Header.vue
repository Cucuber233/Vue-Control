<template>
    <div id='header-wrap'>
        <div class='pull_left header_icon' @click="navMenuState"><svg-icon iconClass='menu' className='menu' /></div>
        <div class='pull_right'>
            <div class='user-info pull_left'>
                {{ username }}
            </div>
            <div class="header_icon pull_left"><svg-icon iconClass='exit' className='menu' /></div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
    name: 'layoutHeader',
    setup(props, { root }){
        const navMenuState = () => {
            root.$store.commit('app/SET_COLLAPSE')
            //root.$store.dispatch('setMenuStatus', { 'name': "aaa"})
        }
        const username = computed(() => root.$store.state.app.username)
        return {
            navMenuState,
            username
        }
    } 
}
</script>

<style lang='scss' scoped>
@import '../../../styles/config.scss';
   #header-wrap{
       position: fixed;
       top: 0;
       right: 0;
       left: $navMenu;
       height: 75px;
       line-height: 75px;
       background-color: #fff;
       //-webkit-box-shadow: 0 3px 16px 0  rgba(0, 0, 0, .1);
       @include webkit(box-shadow,  0 3px 16px 0  rgba(0, 0, 0, .1));
       @include webkit(transition, all .3s ease 0s);
   }
      .open{ #header-wrap{ left: $navMenu; }}
      .close{ #header-wrap{ left: $navMenuMin; }}

   .header_icon{
       padding: 0 32px;
       svg{ 
          font-size: 25px;
          margin-bottom: -15px;
          cursor: pointer;
        }
   }
   .user-info{
       height: 100%;
       padding: 0 32px; 
       border-right: 1px solid #ededed;
      + .header_icon{
          padding: 0 28px;
      } 
   }
  
   
</style>