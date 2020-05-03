<template>
  <v-layout wrap fluid fill-height class="primary">
    <v-row align="center">
      <v-col xs="12" md="6" lg="7" align="center">
        <v-img max-width="500" src="../assets/logo-login.svg" />
      </v-col>
      <v-col xs="12" md="6" lg="5" align="center">
        <v-container>
          <v-card class="pa-10" max-width="500">
            <v-form @submit.prevent="authenticate" ref="form">
              <h2>Sign In</h2>
              <v-text-field label="Username" v-model="username" :rules="usernameRules" required />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                label="Password"
                hint="At least 8 characters"
                :rules="passwordRules"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn class="my-5 primary" block :loading="isLoading" @click="authenticate">Sing In</v-btn>
              <v-alert
                v-if="hasError"
                class="justify-start"
                text
                type="error"
              >{{this.error_description}}</v-alert>
              <p class="text-center">
                I´m a new user
                <router-link :to="{name:'register-user'}">Sign Up</router-link>
              </p>
            </v-form>
          </v-card>
        </v-container>
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
      isLoading: false,
      hasError: false,
      error_description: "",
      valid: false,
      username: "",
      password: "",
      usernameRules: [
        v => !!v || "Username is required",
        v => /.+@.+/.test(v) || "must be a e-mail valid"
      ],
      passwordRules: [
        value => !!value || "Password is required",
        value =>
          (value && value.length >= 8) || "Name must be least than 8 characters"
      ]
    };
  },
  methods: {
    ...mapActions(["login"]),
    authenticate() {
      // Validate Form
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.login({ email: this.username, password: this.password })
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