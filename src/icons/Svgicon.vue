<template>
<svg :class="svgClass" aria-hidden="true">
   <use :xlink:href="iconName"></use>
</svg>
</template> 

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api';
export default {
    name: 'svgIcon',
    props: {
        iconClass: {
            type: String,//定义接受的值类型
            default:'',
        //     required: true,
        // validator: (value) => {
        //     return value >= 0
        // }
        },
        className: {
            type: String,
            default: '',
            // required: true,
            // validator: (value) =>{
            //     return value >=0
            // }
        }
    },
    setup(props, context){
    //console.log(props.iconClass)
    //console.log(props.className)
    //const msg = ref('海利304')
    //const number = ref(1);
    /**
    *监听属性变化，计算属性，得出结果，并返回
    **/
    const iconName = computed(() => `#icon-${props.iconClass}` ) //定义svg图片是哪个
    const svgClass = computed(() => {
        if(props.className){
            return `svg-icon ${props.className}`
        }else{
            return `svg-icon`
        }
    })

        return{
            //msg,
            iconName,
            svgClass
        }   
    }
     
}
</script>

<style lang="scss" scoped>
  .svg-icon{
      width: 1.5em;
      height: 1.5em;
      fill: currentColor; // currentColor = color
  }
</style>