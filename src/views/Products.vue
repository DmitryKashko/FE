<script setup>
import {useCreateProducts, useGetProducts} from "@/api/Products.js";
import {ref, reactive, computed, watch} from "vue";

const getProducts = useGetProducts()
const createProducts = useCreateProducts()
getProducts.getProducts()
const newProducts = ref([])
const textErrors = reactive({
  name: '',
  quantity: '',
  sum: '',
  be: ''
})


const addProducts = () => {
  newProducts.value.push({
    name: '',
    quantity: '',
    sum: '',
  })
}

const deleteProducts = (key) => {
  newProducts.value.splice(key, 1)
}
const clear = () => {
  textErrors.name = ''
  textErrors.quantity = ''
  textErrors.sum = ''
  newProducts.value = []
}
const save = () => {
  textErrors.name = ''
  textErrors.quantity = ''
  textErrors.sum = ''
    newProducts.value.find( (item, key) => {
      if(!item.name) {
        textErrors.name = 'Имя не должно быть пустым'
      }
      if(!item.quantity) {
        textErrors.quantity = 'Введите количество продуктов'
      }
      if(!item.sum) {
        textErrors.sum = 'Введите стоимость'
      }
    })
  /*console.log(textErrors)*/

  if(!textErrors.name && !textErrors.quantity && !textErrors.sum) {
    createProducts.createProducts(newProducts.value)
  }
}
watch(() => createProducts.loading, (newQuery, oldQuery) => {
  if(!createProducts.loading && !createProducts.errors.message) {
    newProducts.value = []
    textErrors.be = ''
    getProducts.getProducts()
  } else if(!!createProducts.errors.message) {
    textErrors.be = createProducts.errors.message
  }
});

</script>

<template>
  <div class="text-danger">
    {{ textErrors.be}}
  </div>
  <div class="text-danger">
    {{ textErrors.name}}
  </div>
  <div class="text-danger">
    {{ textErrors.quantity}}
  </div>
  <div class="text-danger">
    {{ textErrors.sum}}
  </div>
  <div class="d-flex flex-column border" style="min-width: 50em">
    <div class="d-flex mt-2 me-2 ms-2">
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Наименование продукта</th>
          <th scope="col">Количество шт</th>
          <th scope="col">Стоимость продукта Руб</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, key) in getProducts.listProducts" :key="key">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.sum }}</td>
        </tr>
        <tr v-for="(item, key) in newProducts" :key="key">
          <td><input placeholder="Наименование продукта" v-model="item.name"></td>
          <td><input placeholder="Количество шт" v-model="item.quantity"></td>
          <th><input placeholder="Стоимость продукта Руб" v-model="item.sum"></th>
          <td><button  @click.prevent="deleteProducts(key)">Удалить</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex align-self-center mb-2">
      <button class="text-center" @click.prevent="addProducts()">Добавить</button>
    </div>
  </div>
  <div class="mt-2">
    <button class="me-2" @click.prevent="clear()">Отмена</button>
    <button @click.prevent="save()">Сохранить</button>
  </div>
</template>

<style scoped>
</style>
