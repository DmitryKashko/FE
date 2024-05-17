import {defineStore} from "pinia";
import {ref} from "vue";
import {useHTTP} from "@/services/http.js";

export const useGetProducts = defineStore("getProducts", () => {
    const listProducts = ref([])
    const axios = useHTTP()
    const getProducts = async () => {
        try {
            const res = await axios.apiCall('get', `products`)
            listProducts.value = res
        } catch (e) {
            console.log(e, 'products')
        } finally {

        }
    }
    return { getProducts, listProducts }
});
export const useCreateProducts = defineStore("createProducts", () => {
    const listResponse = ref([])
    const axios = useHTTP()
    const loading = ref(false)
    const errors = ref({})
    const createProducts = async (products) => {
        loading.value = true
        errors.value = {}
        try {
            const res = await axios.apiCall('post', 'products', {
                products: products
            })
            listResponse.value = res
        } catch (e) {
            errors.value = e.response.data
        } finally {
            loading.value = false
        }
    }
    return { createProducts, listResponse, loading, errors }
});