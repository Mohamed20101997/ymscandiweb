<template>
  <div class="home">
    <ProductList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'ProductListView',
  components: {
    ProductList
  }
}
</script>
