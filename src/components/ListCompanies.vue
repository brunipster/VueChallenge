<template>
  <v-layout grid-list-md>
    <v-card class="pa-10" v-for="item in companies" :key="item.id">
      <h2>{{item.name}}</h2>
      <p>{{item.ruc}}</p>
      <router-link :to="{name:'UpdateCompany', query: {id: item.id} }">Update</router-link>
      <v-btn @click="join(item.id)">Join</v-btn>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  props: {
    companies: Array,
    joinEvent: Function
  },
  methods: {
    join(p) {
      this.$emit("joinEvent", p);
    }
  }
};
</script>