<template>
    <div>
          <!-- 新增弹窗 -->
       <el-dialog title="新增" :visible.sync="dialog_info_flag" @close='close' width='580px' append-to-body>
        <div class="dialog_cneter">
             <el-form :model="form">
                 <el-form-item label="标题：" :label-width="formLabelWidth" class="el-form-center">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="类型：" :label-width="formLabelWidth" class="el-form-center">
                <el-input v-model="form.name" autocomplete="off" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="概括：" :label-width="formLabelWidth" class="el-form-center">
                <el-input type="textarea" v-model="form.name" autocomplete="off" placeholder="请输入概述"></el-input>
                </el-form-item>
            </el-form>
        </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
            </div>
       </el-dialog>
    </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed, watch } from '@vue/composition-api';
export default {
    name: 'dialogInfo',
                //vue.2.0
        // data(){
        //     return{
        //         dialog_info_flag: true,
        //          form: {
        //             name: '',
        //             region: '',
        //             date1: '',
        //             date2: '',
        //             delivery: false,
        //             type: [],
        //             resource: '',
        //             desc: ''
        //             },
        //         formLabelWidth: '120px'
        //     }
        
        //  },
        //  methods:{
        //      close(){
        //         //this.dialog_info_flag = false
        //         this.$emit('close', false) 
        //      }
        //  },
        //   //单向数据流，父级 -> 子级， 不能反向修改
        // props: {
        //     flag: 
        //     { 
        //         type: Boolean,
        //         default: false
        //     }
        // },
        // watch: {
        //     flag:{
        //         handler(newValue, oldValue){
        //          this.dialog_info_flag = newValue;   
        //         }   
        //     }
        // }    

//vue3.0 
        props: {
            flag: 
            { 
                type: Boolean,
                default: false
            }  
        },
        setup(props, { root, emit }){
        const formLabelWidth = ref('120px') 
        const dialog_info_flag =ref(false)
        const form = reactive({
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                    })
        const close = () => {
            //this.dialog_info_flag = false
            emit('close', false)     
        }

        watch(() =>  dialog_info_flag.value = props.flag ) 

            return{
                dialog_info_flag,
                form,
                formLabelWidth,
                close,
            }
         
    }       

}
</script>

<style lang='scss' scoped>
.dialog_cneter{
   padding: 0 60px 0 0;
}
</style>