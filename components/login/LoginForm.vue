<template>
  <div>
    <Alert v-if="error" type="error" class="mt-4" :message="error" />
    <v-form v-model="isValid" @submit.prevent="attemptLogin">
      <v-text-field
        v-model="emailAddress"
        :rules="emailRules"
        label="Username or Email"
        outlined
      />
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        outlined
      />
      <v-btn
        :loading="loggingIn"
        type="submit"
        color="#FF084F"
        class="white--text"
        x-large
        block
      >
        Login!
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Action, Vue } from 'nuxt-property-decorator';
import Alert from '~/components/partials/Alert.vue';

@Component({
  components: { Alert }
})

class LoginForm extends Vue {
  error = '';
  emailAddress: string = '';
  password: string = '';
  isValid: boolean = false;
  loggingIn: boolean = false;
  emailRules = [
    v => !!v || 'Email is required!'
  ];
  passwordRules = [
    v => !!v || 'Password is required'
  ];

  @Action('auth/login') loginAction;

  attemptLogin() {
    if (!this.isValid) {
      return;
    }

    this.loggingIn = true;
    const userid = this.emailAddress;
    const password = this.password;
    this.loginAction({ userid, password })
      .then(() => {
        this.$router.push('/');
      })
      .catch((e) => {
        switch (e.response.status) {
          case 401:
          case 404:
            this.error = 'Invalid email and/or password';
            break;
          default:
            this.error = e.response.data.code || e.toString();
        }
      })
      .finally(() => {
        this.loggingIn = false;
      });
  }
}

export default LoginForm;

</script>
