<template>
  <v-layout>
    <h1>Bienvenido</h1>
    <p>{{this.session.user.name}} {{this.session.company.name}}</p>
    <v-btn @click="changeCompany">Leave Company</v-btn>
    <router-link :to="{name:'CreateProduct'}">Create</router-link>
    <list-products @joinEvent="selectCompany" :products="products"></list-products>
    <router-view></router-view>
  </v-layout>
</template>
<script>
import ListProducts from "../components/ListProducts";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ListProducts
  },
  computed: {
    ...mapState(["session", "products"])
  },
  methods: {
    ...mapActions(["listProducts", "leaveCompany"]),
    selectCompany(p) {
      this.joinCompany({ companyId: p })
        .then(response => {
          console.log(response);
          this.$router.push({ name: "Products" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeCompany() {
      this.leaveCompany()
        .then(response => {
          console.log(response);
          this.$router.push({ name: "Companies" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.listProducts()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>