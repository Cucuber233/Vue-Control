<template>
  <div :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import LayoutHeader from './Components/Header';
import LayoutMain from './Components/Main';
import LayoutNav from './Components/Nav';
export default {
    name: 'layout',
    components: { LayoutHeader, LayoutNav, LayoutMain},
    setup( props, { root }){
        const menuStatus = computed(() => root.$store.state.app.isCollapse );
        return {
          menuStatus
        }
    }
}
</script>

<style lang='scss' scoped>

</style>
