<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <h1 class="navbar-brand">Product List</h1>
      <div class="d-flex">
        <router-link to="product/new" class="btn btn-outline-success mx-2">ADD</router-link>
        <button class="btn btn-danger" @click="onDelete">MASS DELETE</button>
      </div>
    </div>
  </nav>
  <hr>
  <div class="row">
    <div class="col-md-3 my-1"  v-for="product in products">
      <div class="item">
          <div class="text-start">
            <input type="checkbox" class="delete-checkbox" :value="product.id" @change="onChecked(product.id)">
          </div>
          <div class="text-center">
            <p class="card-text">{{product.sku}}</p>
            <p class="card-text">{{product.name}}</p>
            <p class="card-text">{{product.price}} $</p>
            <p class="card-text" v-if="product.type.name ==='furniture'"> Dimension: <span v-for="(value,index) in product.product_attributes">{{value.value}} <span v-if="index != Object.keys(product.product_attributes).length - 1">x</span> </span></p>
            <p class="card-text" v-if="product.type.name ==='dvd'"> Size: <span v-for="(value,index) in product.product_attributes">{{value.value}} MB</span></p>
            <p class="card-text" v-if="product.type.name ==='book'"> Weight: <span v-for="(value,index) in product.product_attributes">{{value.value}} KG</span></p>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
export default {
  name: 'ProductList',
  data() {
    return{
      url: "https://backend.ym-solution.com/api/all-product",
      deleteUrl: "https://backend.ym-solution.com/api/delete",
      products: null ,
      checkedRows: []
    }
  },
  mounted() {
      this.getAllProducts()
  },
  methods:{
    onChecked(id){
      if(!this.checkedRows.includes(id)){
        this.checkedRows.push(id)
      } else {
        this.checkedRows.splice(this.checkedRows.indexOf(id),1)
      }
    },onDelete(e){
      e.preventDefault();
      axios.post(this.deleteUrl, {'ids': this.checkedRows})
          .then(response => {
            if(response.data.status == 200){
              this.getAllProducts()
            }
          })
    },
    getAllProducts(){
        axios.get(this.url) .then(response => (this.products = response.data.data))
    }
  }
}
</script>
