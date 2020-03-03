<template>
    <div>
        <el-row :gutter='16'>
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">分类：</label>
                    <div class="wrap-content">
                      <el-select v-model="category_value" placeholder="请选择" style="width: 100%">
                        <el-option
                        v-for="item in options.category"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id">
                        </el-option>
                     </el-select>  
                    </div>
                </div>   
            </el-col>

             <el-col :span="7">
                <div class="label-wrap data">
                    <label for="">日期：&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                      <el-date-picker
                      style="width: 100%;"
                        v-model="date_value"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']">
                      </el-date-picker>
                    </div>
                </div>   
            </el-col>

            <el-col :span="3">
                <div class="label-wrap key-work">
                    <label for="">关键字：&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                       <el-select v-model="select_key" style="width: 100%;">
                            <el-option v-for="item in search_option"
                            :key='item.value' :label='item.label' 
                            :value='item.value'>
                            </el-option>
                       </el-select>
                    </div>
                </div>   
            </el-col>

            <el-col :span="3">
                <el-input v-model="search_keywork" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-col>    
            <el-col :span='2'>
                <el-button type='danger' style="width: 100%;">搜索</el-button>
            </el-col>
            <el-col :span='3'>.</el-col>
            <el-col :span='2'>
                <el-button type='danger' class='pull_right' style="width: 100%;" @click='dialog_info = true'>新增</el-button>
            </el-col>
       </el-row>
<div class="black-space-30"></div>    <!-- 间隔30px-->
      <!-- table表格 -->
         <el-table :data="table_data" border style="width: 100%">
          <el-table-column type="selection" width="45">
          </el-table-column>
            <el-table-column  prop="title" label="标题" width="830px">
            </el-table-column>
            <el-table-column prop="category" label="类别" width="134px"></el-table-column>
             <el-table-column prop="date" label="日期" width="237px">
            </el-table-column>
             <el-table-column prop="user" label="管理员" width="115px">
            </el-table-column>
 
          <el-table-column prop="address" label="操作">
              <template slot-scope='scope'>
                  <el-button type='danger' size="mini" @click="delete_item">删除</el-button>
                  <el-button type='success' size="mini">编辑</el-button>
              </template>
            </el-table-column> 
        </el-table>
<div class="black-space-30"></div>   <!-- 间隔30px-->
        <!-- 底部分页 -->
        <el-row >
            <el-col :span='12'>
               <el-button type='danger' size="medium" @click='deleteAll'>批量删除</el-button> 
            </el-col>
            <el-col :span='12'>
                <el-pagination 
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                background layout="total, prev, pager, next, jumper, sizes" 
                :total="100" class="pull_right" :page-sizes="[20, 50, 100]">
                </el-pagination>
            </el-col>
        </el-row>
     <!-- 新增弹窗 -->
     <DialogInfo :flag='dialog_info'  @close='close_dialog' />
  </div>
</template>

<script>
import { getCategory } from '@/api/new.js'
import DialogInfo from './dialog/info.vue'
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { global } from '@/utils/global_V3.0.js';
import { common } from '@/api/common.js'
import categoryVue from './category.vue';
export default {
    name: 'infoIndex',
    components: { DialogInfo },
    setup( props, { root }){

      //Vue3.0引入方法
      const { conFirm } = global();
      const { data_category, GetCategory } = common();

      /**
       *数据
       */
    const select_key = ref('id')
    const category_value = ref('') 
    const date_value = ref('')
    const search_keywork = ref('')
    const dialog_info =ref(false)
    //信息弹窗标记
    const  options = reactive({
      category: []
    } 
    //[{
    //       value: '1',
    //       label: '国际信息'
    //     }, {
    //       value: '2',
    //       label: '国内信息'
    //     }, {
    //       value: '3',
    //       label: '行业信息'
    //     }]
      )

        //搜索关键字
    const search_option = reactive([{
            value: 'id',
            label: 'ID'
        },{
            value: 'title',
            label: '标题'
        }]);
    const table_data = reactive([{
          title: '啊师傅体认到法国如果',
          category: '国际信息',
          date: '2019-12-15',
          user: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
         title: '爱上法拉盛空气我看人偷拍狂魔v',
          category: '国际信息',
          date: '2019-12-15',
          user: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
            title: '阿萨斯骷髅法师卡佛考试咖啡可可',
          category: '国际信息',
          date: '2019-12-15',
          user: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          title: '阿三酱豆腐卡刷积分卡时间覅时间佛i骄傲',
          category: '国际信息',
          date: '2019-12-15',
          user: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }])
      

        const handleSizeChange = (val) => {
           console.log(`每页 ${val} 条`);
        }
        const handleCurrentChange =(val) => {
           console.log(`当前页: ${val}`);
        }
        const close_dialog = () => {
          dialog_info.value = false
        }
        const delete_item = () => {
          conFirm(
             {
              content: '确认删除当前信息',
              tips: '警告',
              fn: confirm_delete
            }
          )

          // root.conFirm(
          //   {
          //     content: '确认删除当前信息',
          //     tips: '警告',
          //     fn: confirm_delete
          //   }
          // )
        }
        const deleteAll = () => {
          conFirm(
             {
              content: '确认删除选中全部信息',
              type: 'success',
              fn: confirm_delete
            }
          )

          // root.conFirm(
          //   {
          //     content: '确认删除选中全部信息',
          //     type: 'success',
          //     fn: confirm_delete
          //   }
          // )
        }
        const confirm_delete = () => {
          console.log(1111)
        }
        
 
//添加分类
      //  const GetCateGory = () => {
      //    getCategory({}).then(response=> {
      //       let data = response.data.data.data;
      //       //console.log(data)
      //       options.category = data
      //    }).catch(errror => {

      //    })
      //  }
       //console.log(options)
        onMounted(() => {
          //GetCateGory()
          GetCategory()
        })
        watch(() => data_category.item, (value) => {
          options.category = value
        })

        return {
            //ref
            category_value,
            date_value,
            select_key,
            search_keywork,
            dialog_info,
            close_dialog,  
            //reactive
            options,
            table_data,
            search_option,
            //function
            handleSizeChange,
            handleCurrentChange,
            delete_item,
            deleteAll
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/config.scss';
   .label-wrap{
     &.category{ @include labelDom( left, 60, 40 ); }
     &.data{ @include labelDom( right, 93, 40 );}
     &.key-work{ @include labelDom( right, 99, 40 );}
   }
</style>