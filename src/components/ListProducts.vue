<template>
  <v-layout grid-list-md>
    <v-card class="pa-10" v-for="item in products" :key="item.id">
      <h2>{{item.name}}</h2>
      <p>{{item.sku}}</p>
      <p>{{item.price}}</p>
      <p>{{item.discount}}</p>
      <router-link :to="{name:'UpdateProduct', query: {id: item.id} }">Update</router-link>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  props: {
    products: Array
  }
};
</script>