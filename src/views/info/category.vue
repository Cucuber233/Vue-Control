<template>
    <div id='category'>
        <el-button type='danger' @click='AddfirstCategory( {type : "first_add_categroy" } )'>添加一级分类</el-button>
        <hr class='hr-style'/>
        <div>
            <el-row :gutter='30'>
              <el-col :span='8'>
                <div class="category-wrap">
                    <div class='category' v-for='firstItem in category.item' :key='firstItem.id'>
                        <!--一级分类-->
                        <h4>
                            <svg-icon icon-class='plus'></svg-icon>
                            {{ firstItem.category_name }}--{{ firstItem.id }}
                            <div class='button-group'>
                                <el-button size="mini" round type='danger' @click='editCategory({ data: firstItem, type: "first_edit_categroy" })'>编辑</el-button>
                                <el-button size="mini" round type='success'>添加子级</el-button>
                                <el-button size="mini" round @click='delete_category_confirm(firstItem.id)'>删除</el-button>
                            </div>
                        </h4>
                        <!--子级分类-->
                        <ul>
                            <li v-for='childrenItem in firstItem.children' :key='childrenItem.id'>
                                {{ childrenItem.category_name }}
                                <div class='button-group'>
                                <el-button size="mini" round type='danger'>编辑</el-button>
                                <el-button size="mini" round>删除</el-button>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div> 
              </el-col> 

              <el-col :span='16'>
                <h4 class='menu-title'>一级分类编辑</h4>
                <el-form :label-position="labelPosition" label-width="142px" :model="formLabelAlign" class="form-size" ref="form">
                    <el-form-item label="一级分类名称" v-if='Addcategory.first'>
                        <el-input v-model="form.categoryName" :disabled="Addcategory_first_disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类名称" v-if='Addcategory.second'>
                        <el-input v-model="formLabelAlign.region" :disabled="Addcategory_second_disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click='sumbit' :disabled="sumbit_button_disabled">确定</el-button>
                    </el-form-item>
                </el-form>
              </el-col>
            </el-row>
        </div> 
    </div>  
</template>

<script>
import { global } from '@/utils/global_V3.0.js'
import { AddFirst, getCategory, DeleteCategory, EditCategory } from '@/api/new.js';
import { reactive, ref, onMounted } from '@vue/composition-api';
export default {
    name: 'infoIndexCategory',
    setup( props, { root, refs }){
        //globel
        const { conFirm } = global();

        const labelPosition = ref('right')
        const Addcategory_first_disabled = ref(true)
        const Addcategory_second_disabled = ref(true)
        const sumbit_button_disabled = ref(true)
        const sumbit_button_type = ref('')
        const delete_Id =ref('')

        const form = reactive({
            categoryName: '',
            categoryClass: ''
        })
        const formLabelAlign =  reactive({
          name: '',
          region: '',
          type: ''
        })
        const Addcategory = reactive({
            first: true,
            second: true
        })
        const category = reactive({
            item:[
                // {
                //     id: "1",
                //     category_name: "国际信息",
                // },
                // {
                //     id: "2",
                //     category_name: "国内信息",
                //         children: [{
                //             id: "43",
                //             category_name: "信息1",
                //         },
                //         {
                //             id: "4",
                //             category_name: "信息2",
                //         }]
                // }
            ],
            current: []
        })
        

        const AddfirstCategory = (params) => {
              Addcategory.first = true,
              Addcategory_first_disabled.value = false
              sumbit_button_disabled.value = false
              Addcategory.second = false;
              sumbit_button_type.value = params.type
        }
         const addFirstCategory = () => {
             if(form.categoryName == ''){
                root.$message({
                    message: '分类名称不能为空',
                    type: 'error'
                })
                return false;
            }
           AddFirst( {categoryName: form.categoryName} ).then(response  => {
               let data = response.data;
               if(data.resCode === 0){
                root.$message({
                  message: data.message,
                  center: true,
                  type: 'success',
                });
                //GetcateGory()
                category.item.push(response.data.data);
               }  
               form.categoryName = ''
           }).catch(error => {

           }) 
        }

//添加分类
        const GetcateGory = () => {
            getCategory({}).then(response => {
                    let data = response.data.data.data;
                    category.item = data;
                }).catch(error => {

            })
        }
        const delete_category_confirm = (category) => { 
            delete_Id.value = category;
                conFirm(
                {
                   content: '确认删除选中全部信息',
                   type: 'success',
                   fn: confirm_delete,
                   catchfn: () => {
                       delete_Id.value = ''
                   }
                }
          )
        }

        //修改
        const editCategory = (params) => {
              Addcategory.first = true,
              Addcategory_first_disabled.value = false
              sumbit_button_disabled.value = false
              Addcategory.second = false
              sumbit_button_type.value = params.type 
              //一级名称输入还原名称
              form.categoryName = params.data.category_name
              //储存当前数据对象
              category.current = params.data
        }
        const editFirstCategory = () => {
            if(category.current.length == 0){
                root.$message({
                    message: '未选择分类',
                    type: 'error'
                })
                return false
            }
            // console.log(category.current)
            // return false
            let request = {
                id: category.current.id,
                categoryName: form.categoryName
            }
            EditCategory(request).then(response => {
                root.$message({
                    message: response.data.message,
                    type: 'success'
                })
                let data = category.item.filter(item => item.id == category.current.id )
                //console.log(data)
                console.log(response)
                data[0].category_name = response.data.data.data.categoryName;
                form.categoryName = ''
                category.current = []
            }).catch(error => {

            })
        }


        const confirm_delete = () => {
            console.log(delete_Id.value)
            DeleteCategory({ categoryId: delete_Id.value }).then(response => {
                //let index = category.item.findIndex(item => item.id == delete_Id.value )
                //console.log(index)
                //splice('起始位置'，'删除数量'，'替换删除了的数据'....)
                //category.item.splice(index, 1);
                let newData = category.item.filter(item => item.id !== delete_Id.value );
                category.item = newData;
            }).catch(error => {

            })
        }

        const sumbit = () => {
            if(sumbit_button_type.value == "first_add_categroy"){
                addFirstCategory()
            }else if(sumbit_button_type.value == "first_edit_categroy"){
                editFirstCategory()
            }

           //refs[form].resetFields();
        }
/**
 * 生命周期
 */
//挂载完成时执行，（DOM元素完成时，实例完成）
onMounted(() => {
    GetcateGory()
})
       
    return {
        //ref
        labelPosition, Addcategory_first_disabled, Addcategory_second_disabled, sumbit_button_disabled, sumbit_button_type,
        //reactive
        formLabelAlign, form, Addcategory, category,
        //method
        sumbit, AddfirstCategory, GetcateGory, delete_category_confirm, editCategory
    }
  } 
}
</script>

<style lang='scss' scoped>
@import '@/styles/config.scss';
.category-wrap{
    div:first-child{
        &::before{
           top: 21px; 
        }
    }
      div:last-child{
        &::before{
           bottom: 21px; 
        }
    }
}
.menu-title{
    line-height: 44px;
    background-color: #f3f3f3;
    padding-left: 22px;

}
.category{
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &::before{
                content: '';
                position: absolute;
                width: 32px;
                left: 24px;
                top: -21px;
                bottom: 0px;
                border-left: 1px dotted #000;
            }
    h4{
        position: relative;
        margin-left: 40px;
        left: -29px;
    }
    svg{
        line-height: 44px;
        text-align: center;
        font-size: 17px;
    }
    ul{
        list-style: none;
        padding: 0px;
        li{
            padding-left: 60px;
            padding-left: 40px;
            margin-left: 25px;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                width: 32px;
                left: 0px;
                top: 22px;
                border: 1px dotted #000;
            }
        }
    } 
    li, h4{
        @include webkit(transition, all .3s ease 0s);
        &:hover{ 
            background-color: #f3f3f3;
            .button-group{ display: block; }
        };
            
    }
    .button-group{
        display: none;
        position: absolute;
        z-index: 2;
        right: 11px;
        top: -1px;
        button{ font-size: 12px; }
    }
}  
.form-size{
    width: 410px;
}
.hr-style{
    // width: calc( 100% + 60px);
    // margin-left: -30px;

    margin-left: -30px;
    margin-right: -30px;
    border: none;
    border-bottom: 1px solid #ececec; 
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>