<template>
  <v-card class="pa-10" max-width="500">
    <v-form @submit.prevent="save" ref="form">
      <h3>{{this.session.company.name}}</h3>
      <v-text-field label="Name" v-model="name" :rules="nameRules" required />
      <v-text-field label="Sku" v-model="sku" :rules="skuRules" required />
      <v-text-field label="Price" v-model="price" :rules="priceRules" required />
      <v-text-field label="Discount" v-model="discount" :rules="discountRules" required />
      <v-btn class="my-5 primary" block :loading="isLoading" @click="save">{{this.title}}</v-btn>
      <v-alert v-if="hasError" class="justify-start" text type="error">{{this.error_description}}</v-alert>
    </v-form>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
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
      sku: "",
      price: "",
      discount: "",
      title: "Create Product",
      nameRules: [v => !!v || "Fullname is required"],
      skuRules: [v => !!v || "Sku is required"],
      priceRules: [v => !!v || "Price is required"],
      discountRules: [v => !!v || "Discount is required"]
    };
  },
  computed: {
    ...mapGetters(["getProduct"]),
    ...mapState(["session"])
  },
  methods: {
    ...mapActions(["createProduct", "updateProduct"]),
    save() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        if (this.id) {
          this.updateProduct({
            id: this.id,
            name: this.name,
            sku: this.sku,
            price: this.price,
            discount: this.discount
          })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
            .finally((this.isLoading = false));
        } else {
          this.createProduct({
            companyId: this.companyJoined.id,
            name: this.name,
            sku: this.sku,
            price: this.price,
            discount: this.discount
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
      if (nval) {
        let product = this.getProduct(nval);
        this.name = product.name;
        this.sku = product.sku;
        this.discount = product.discount;
        this.price = product.price;
        this.title = "Update Product";
      } else {
        this.name = "";
        this.sku = "";
        this.discount = "";
        this.price = "";
        this.title = "Create Product";
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>