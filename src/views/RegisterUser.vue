<template>
  <v-layout wrap fluid fill-height class="primary">
    <v-row align="center">
      <v-col xs="12" md="6" lg="5" align="center">
        <v-container>
          <v-card class="pa-10" max-width="500">
            <v-form @submit.prevent="authenticate" ref="form">
              <h2>Sign Up</h2>
              <v-text-field label="Fullname" v-model="fullname" :rules="fullnameRules" required />
              <v-text-field label="Email" v-model="email" :rules="emailRules" required />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                label="Password"
                hint="At least 8 characters"
                :rules="passwordRules"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword1 ? 'text' : 'password'"
                v-model="passwordConfirmation"
                label="Password Confirmation"
                hint="At least 8 characters"
                :rules="passwordConfirmationRules"
                @click:append="showPassword1 = !showPassword1"
              ></v-text-field>
              <v-btn class="my-5 primary" block :loading="isLoading" @click="authenticate">Sign Up</v-btn>
              <v-alert
                v-if="hasError"
                class="justify-start"
                text
                type="error"
              >{{this.error_description}}</v-alert>
              <p class="text-center">
                Already have an account
                <router-link :to="{name:'login'}">Sign In</router-link>
              </p>
            </v-form>
          </v-card>
        </v-container>
      </v-col>
      <v-col xs="12" md="6" lg="7" align="center">
        <v-img max-width="700" src="../assets/authentication.svg" />
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showPassword: false,
      showPassword1: false,
      isLoading: false,
      hasError: false,
      error_description: "",
      valid: false,
      fullname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      fullnameRules: [v => !!v || "Fullname is required"],
      emailRules: [
        v => !!v || "Username is required",
        v => /.+@.+/.test(v) || "must be a e-mail valid"
      ],
      passwordRules: [
        value => !!value || "Password is required",
        value =>
          (value && value.length >= 8) ||
          "Password must be least than 8 characters"
      ],
      passwordConfirmationRules: [
        v => (v && v == this.password) || "Password confirmation not match"
      ]
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    authenticate() {
      // Validate Form
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.registerUser({
          name: this.fullname,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        })
          .then(logged => {
            console.log(logged);
            this.$router.push({ name: "Companies" });
          })
          .catch(error => {
            console.log(error);
            this.hasError = true;
            this.error_description = error.data.error;
          })
          .finally((this.isLoading = false));
      }
    }
  }
};
</script>