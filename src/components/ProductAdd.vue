<template>

  <nav class="navbar bg-light">
    <div class="container-fluid">
      <h1 class="navbar-brand">Product Add</h1>
      <div class="d-flex">
        <button  class="btn btn-outline-success mx-2" @click="onFormSubmit">Save</button>
        <router-link to="/" class="btn btn-danger">Cancel</router-link>
      </div>
    </div>
  </nav>
  <hr>
  <form id="product_form">

    <div class="inputs">
      <div class="input-container">
        <div>
          <label for="sku">SKU</label>
        </div>
        <div>
          <input type="text" id="sku" name="sku" class="form-control" @change="handleChange" :value="form.sku">
          <span class="text-danger">{{errors['sku']}}</span>
        </div>

      </div>

      <div class="input-container">
        <div>
          <label for="name">Name</label>
        </div>
        <div>
          <input type="text" id="name" class="form-control" name="name" @change="handleChange" :value="form.name">
          <span class="text-danger">{{errors['name']}}</span>
        </div>
      </div>

      <div class="input-container">
        <div>
          <label for="price">Price</label>
        </div>
        <div>
          <input type="text" id="price" class="form-control" name="price"  @change="handleChange" :value="form.price">
          <span class="text-danger">{{errors['price']}}</span>
        </div>
      </div>

      <div class="input-container">
        <div>
          <label for="productType">Type switcher</label>
        </div>
        <div>
          <select id="productType" class="form-select" v-model="selected" name="type_id"  @change="handleChange" :value="form.type_id">
            <option>Type switcher</option>
            <option v-for="option in options"  :value="option.value">{{option.name}}</option>
          </select>
          <span class="text-danger">{{errors['type_id']}}</span>
        </div>

      </div>
    </div>



    <div class="row" v-if="selected === '3'">
      <div class="col-md-4 type">
        <div class="row">
          <div class="col-md-2">
            <label for="size">Size</label>
          </div>
          <div class="col-md-10">
            <input type="number" id="size" class="form-control" name="size"  @change="handleChange" :value="form.size">
            <span class="text-danger">{{errors['size']}}</span>
          </div>
          <p>Please, provide size </p>
        </div>
      </div>
    </div>

    <div class="row" v-if="selected === '1'">
      <div class="col-md-4 type">
        <div class="row">
          <div class="col-md-2">
            <label for="weight">Weight</label>
          </div>
          <div class="col-md-10">
            <input type="number" id="weight" class="form-control" name="weight"  @change="handleChange" :value="form.weight">
            <span class="text-danger">{{errors['weight']}}</span>
          </div>
          <p>Please, provide weight</p>
        </div>
      </div>
    </div>

    <div class="row" v-if="selected === '2'">
      <div class="col-md-4 type">

        <div class="row mb-1">
          <div class="col-md-2">
            <label for="height">Height</label>
          </div>
          <div class="col-md-10">
            <input type="number" id="height" class="form-control" name="height"  @change="handleChange" :value="form.height">
            <span class="text-danger">{{errors['height']}}</span>
          </div>
        </div>


        <div class="row  mb-1">
          <div class="col-md-2">
            <label for="width">Width</label>
          </div>
          <div class="col-md-10">
            <input type="number" id="width" class="form-control" name="width"  @change="handleChange" :value="form.width">
            <span class="text-danger">{{errors['width']}}</span>
          </div>
        </div>


        <div class="row  mb-1">
          <div class="col-md-2">
            <label for="lenght">length</label>
          </div>
          <div class="col-md-10">
            <input type="number" id="length" class="form-control" name="length"  @change="handleChange" :value="form.length">
            <span class="text-danger">{{errors['length']}}</span>
          </div>
        </div>
        <p>Please, provide dimensions </p>
      </div>
    </div>

  </form>

</template>

<script>
import axios from "axios";

export default {
  name: 'ProductAdd',
  data() {
    return{
      errors:{sku: '' , name: '' , price: '', type_id: '', size: '' , weight: '', height: '' , width: '' ,length: ''},
      url : 'https://backend.ym-solution.com/api/add-product',
      form:  {sku: '' , name: '' , price: '', type_id: '', size: '' , weight: '', height: '' , width: '' ,length: ''},
      selected: "Type switcher",
      options: [
        { value: '1', name: 'Book' },
        { value: '2', name: 'Furniture' },
        { value: '3', name: 'DVD' }
      ]
    }
  },methods:{
    handleChange(event){
      const {name , value} = event.target;
      let form  = this.form;
      form[name] = value;
      this.form = form;
    },
    onFormSubmit(e){
      e.preventDefault();
          this.loader = true;
          axios.post(this.url , this.form)
              .then(response => {
                if(response.data.status == 201){
                  this.$router.replace('/');
                }else{
                  this.errors.sku =  response.data.errors.sku !== undefined ? response.data.errors.sku[0] : '';
                  this.errors.name = response.data.errors.name !== undefined ?  response.data.errors.name[0] : '';
                  this.errors.price = response.data.errors.price !== undefined ?  response.data.errors.price[0] : '';
                  this.errors.type_id = response.data.errors.type_id !== undefined ?  response.data.errors.type_id[0] : '';
                  this.errors.width = response.data.errors.width !== undefined ?  response.data.errors.width[0] : '';
                  this.errors.weight = response.data.errors.weight !== undefined ?  response.data.errors.weight[0] : '';
                  this.errors.size = response.data.errors.size !== undefined ?  response.data.errors.size[0] : '';
                  this.errors.length = response.data.errors.length !== undefined ?  response.data.errors.length[0] : '';
                  this.errors.height = response.data.errors.height !== undefined ?  response.data.errors.height[0] : '';
                }

              })
    },
  }
}
</script>
