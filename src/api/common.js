import { getCategory } from '@/api/new.js';
import { reactive } from  '@vue/composition-api';
export function common() {
    let data_category = reactive({
        item: []
    })
    const GetCategory = () => {
        getCategory({}).then(response => {
            data_category.item = response.data.data.data
            //console.log(response.data.data.data)
        }).catch(error => {

        })
    }
    return {
        data_category,
        GetCategory
    }
}

