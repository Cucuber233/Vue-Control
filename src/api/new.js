import service from '@/utils/request.js';//引入拦截器和axios

//信息分类添加一级
export function  AddFirst(data) {
    return service.request({
        method: 'post',
        url: '/news/addFirstCategory/',
        data       //data: data , 左边data是变量名（key）后台接收，右边data为接收的参数，如果两者同名可以写成一个
    })
}

//获取信息分类
export function getCategory(data) {
    return service.request({
     method: 'post',
     url: '/news/getCategory/',
     data 
    })   
}

//删除分类
export function DeleteCategory(cateGroy_delete) {
    return service.request({
        method: 'post',
        url: '/news/deleteCategory/',
        data: cateGroy_delete

    })
}

//修改分类
export function EditCategory(edit_category) {
    return service.request({
        method: 'post',
        url: '/news/editCategory/',
        data: edit_category
    })
}