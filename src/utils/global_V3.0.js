import { MessageBox } from 'element-ui';
import { ref } from '@vue/composition-api'
export function global() {
  const data = ref('')
  const conFirm = (params) => {
    MessageBox.confirm(params.content, params.tips || '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: params.type || 'warning',
      center: true
    }).then(() => {
      params.fn && params.fn(params.id || '')
      // root.$message({
      //   type: 'success',
      //   message: '删除成功!'
      //});
    }).catch(() => {
      params.catchfn && params.catchfn()
  //     root.$message({
  //       type: 'info',
  //       message: '已取消删除'
  //     });
     });
  }
  return {
    data,
    conFirm
  }
}