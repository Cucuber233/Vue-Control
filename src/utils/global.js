import { MessageBox } from 'element-ui';
export default {
    install (Vue, options){
        Vue.prototype.conFirm = (params) => {
            MessageBox.confirm(params.content, params.tips || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type || 'warning',
                center: true
              }).then(() => {
                params.fn &&  params.fn()
                // root.$message({
                //   type: 'success',
                //   message: '删除成功!'
                //});
              }).catch(() => {
            //     root.$message({
            //       type: 'info',
            //       message: '已取消删除'
            //     });
               });
        }
    }
}