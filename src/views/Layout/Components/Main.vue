<template>
    <div id='main-wrap'>
        <div class="main-content">
            <div class="content">
              <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang='scss' scoped>
@import '../../../styles/config.scss';
   #main-wrap{
       position: fixed;
       overflow:auto; 
       top: 75px;
       left: $navMenu;
       right: 0;
       bottom: 0;
       border: 30px solid #f7f7f7;
       border-bottom: none;
       -webkit-box-sizing: border-box;
       @include webkit(transition, all .3s ease 0s); 
   }
      .open{ #mainr-wrap{ left: $navMenu; }}
      .close{ #main-wrap{ left: $navMenuMin; }}

   .main-content{
      width: 100%;
      height: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
   }
   .content{
      width: 100%;
      height: 100%;
      padding: 30px 30px 0 30px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
   }
</style>