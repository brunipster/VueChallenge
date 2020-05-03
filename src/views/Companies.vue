<template>
  <v-layout>
    <h1>Bienvenido</h1>
    <p>{{this.session.user.name}}</p>
    <router-link :to="{name:'CreateCompany'}">Create</router-link>
    <v-btn @click="LogOut">LogOut</v-btn>
    <v-btn @click="Reset">Reset Password</v-btn>
    <list-companies @joinEvent="selectCompany" :companies="companies"></list-companies>
    <router-view></router-view>
  </v-layout>
</template>
<script>
import listCompanies from "../components/ListCompanies";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    listCompanies
  },
  computed: {
    ...mapState(["session", "companies"])
  },
  methods: {
    ...mapActions(["listCompanies", "joinCompany"]),
    selectCompany(p) {
      this.joinCompany({ companyId: p })
        .then(response => {
          console.log(response);
          this.$router.push({ path: "Products" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    logOut() {}
  },
  created() {
    this.listCompanies()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>