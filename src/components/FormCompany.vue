<template>
  <v-card class="pa-10" max-width="500">
    <v-form @submit.prevent="save" ref="form">
      <v-text-field label="Name" v-model="name" :rules="nameRules" required />
      <v-text-field label="Ruc" v-model="ruc" :rules="rucRules" required />
      <v-btn class="my-5 primary" block :loading="isLoading" @click="save">{{this.title}}</v-btn>
      <v-alert v-if="hasError" class="justify-start" text type="error">{{this.error_description}}</v-alert>
    </v-form>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    id: Number
  },
  data() {
    return {
      isLoading: false,
      hasError: false,
      error_description: "",
      name: "",
      ruc: "",
      title: "Create Company",
      nameRules: [v => !!v || "Fullname is required"],
      rucRules: [
        v => !!v || "Username is required",
        v => (!!v && v.length == 11) || "Invalid Ruc"
      ]
    };
  },
  computed: {
    ...mapGetters(["getCompany"])
  },
  methods: {
    ...mapActions(["createCompany", "updateCompany"]),
    save() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        if (this.id) {
          this.updateCompany({
            id: this.id,
            name: this.name,
            ruc: this.ruc
          })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
            .finally((this.isLoading = false));
        } else {
          this.createCompany({
            name: this.name,
            ruc: this.ruc
          })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
            .finally((this.isLoading = false));
        }
      }
    }
  },
  watch: {
    id: function(nval) {
      console.log("Update");
      console.log(nval);
      if (nval) {
        let company = this.getCompany(nval);
        this.name = company.name;
        this.ruc = company.ruc;
        this.title = "Update Company";
      } else {
        this.name = "";
        this.ruc = "";
        this.title = "Create Company";
        this.$refs.form.resetValidation();
      }
    }
  },
  created() {
    if (this.id) {
      let company = this.getCompany(this.id);
      this.name = company.name;
      this.ruc = company.ruc;
      this.title = "Update Company";
    } else {
      this.name = "";
      this.ruc = "";
      this.title = "Create Company";
      this.$refs.form.resetValidation();
    }
  }
};
</script>