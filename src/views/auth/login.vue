<template>
  <v-card
    max-width="1224px"
    rounded="0"
    min-height="100vh"
    class="mx-auto transparent"
    flat
  >
    <v-container>
      <v-row class="overflow-hidden" style="height: 100vh" align="center">
        <v-card
          flat
          height="70vh"
          width="50%"
          rounded
          class="d-flex flex-column justify-center pa-8 overflow-hidden"
        >
          <v-card flat class="transparent">
            <v-card-title class="text-h3 mb-3">
              {{ auth.login }}
            </v-card-title>
            <v-card-subtitle>
              {{ auth.loginSubtitle }}
            </v-card-subtitle>
            <v-form v-model="valid" ref="form" @submit.prevent="submitLogin">
              <v-text-field
                v-model="email"
                :label="auth.email"
                color="primary"
                :rules="emailRules"
                :disabled="loading"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="password"
                :label="auth.password"
                :type="showPassword ? 'text' : 'password'"
                color="primary"
                :rules="passwordRules"
                :disabled="loading"
                outlined
                class="mt-3"
              >
                <template #append>
                  <v-btn
                    icon
                    @click="showPassword = !showPassword"
                    :color="showPassword ? 'primary' : 'grey'"
                  >
                    <v-icon>{{
                      showPassword ? "mdi-eye" : "mdi-eye-off"
                    }}</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
              <v-card-subtitle>{{ auth.forgotPassword }}</v-card-subtitle>
              <v-btn
                class="mt-2 py-5"
                variant="flat"
                type="submit"
                block
                color="primary"
                :disabled="!valid || loading"
                :loading="loading"
              >
                {{ auth.login }}
              </v-btn>
            </v-form>
            <v-card-subtitle class="mx-auto mt-auto text-center pt-7">
              {{ auth.allRightsReserved }} &copy; {{ general.companyName }}
            </v-card-subtitle>
          </v-card>
        </v-card>
        <v-card
          flat
          width="50%"
          class="transparent d-flex justify-center align-center"
          outlined
          tile
        >
          <v-img
            style="height: 70vh"
            cover
            src="https://images.unsplash.com/photo-1680584405372-defac8a5db62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2535&q=80"
          ></v-img>
        </v-card>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { auth, general } from "@/locals/ar-KSA";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase letter",
        (v) => /[0-9]/.test(v) || "Password must contain at least one number",
        (v) =>
          /[^A-Za-z0-9]/.test(v) ||
          "Password must contain at least one special character",
      ],
      loading: false,
    };
  },
  computed: {
    formValid() {
      return (
        this.emailRules.every((rule) => rule(this.email) === true) &&
        this.passwordRules.every((rule) => rule(this.password) === true)
      );
    },
    auth() {
      return auth;
    },
    general() {
      return general;
    },
  },
  methods: {
    submitLogin() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push({ name: "dashboard" });
      }, 2000);

      if (!this.loading) {
        localStorage.setItem("auth", "true");

        this.$router.push("/");
      }
    },
  },
};
</script>
