import {ref, watch} from "vue";
import {defineStore} from "pinia";
import axios from 'axios'


export const useHTTP = defineStore("axios", () => {

  const error = ref(null)
  const loading = ref(false)
  const baseURL = ref('')

  axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
/*  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Accept'] = 'application/json'
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'*/
  /*axios.interceptors.request.use(config => {
    return config
  })*/

  /*axios.interceptors.response.use(response => {
    return response
  }, async error => {
    return Promise.reject(error)
  })*/

  async function apiCall(method, path, data= null, params = null, headers = null, responseType= null) {
    loading.value = true
    try {
      const response = await axios({
        method: method,
        url: path,
        data: data,
        params: params,
        responseType: responseType,
      })
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      loading.value = false
    }
  }


  return { error, loading, apiCall }
});
