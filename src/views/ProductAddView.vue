<template>
  <div class="home">
    <ProductAdd/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductAdd from '@/components/ProductAdd.vue'

export default {
  name: 'ProductAddView',
  components: {
    ProductAdd
  }
}
</script>
