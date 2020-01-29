<template>
  <v-form v-model="isValid" @submit.prevent="attemptLogin">
    <v-text-field
      v-model="emailAddress"
      :rules="emailRules"
      label="Email"
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
    />
    <v-btn
      :loading="loggingIn"
      type="submit"
      color="#FF084F"
      class="white--text my-12"
      x-large
      block
    >
      Login!
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Action, Vue } from 'nuxt-property-decorator';

@Component({
  components: { }
})

class VisitorRegisterForm extends Vue {
  emailAddress: string = '';
  password: string = '';
  loggingIn: boolean = false;
  emailRules = [
    v => !!v || 'Email is required!',
    v => /.+@.+/.test(v) || 'Must be a valid email address.'
  ];
  passwordRules = [
    v => !!v || 'Password is required',
  ];

  @Action('auth/login') loginAction;
  
  attemptLogin() {
    if (!this.emailAddress || !this.password) {
      return;
    }

    this.loggingIn = true;
    const email = this.emailAddress;
    const pass = this.password;
    this.loginAction({ email, pass })
      .then(() => {
        this.$router.push('/visitor/menu');
      })
      .catch(() => {

      })
      .finally(() => {
        this.loggingIn = false;
      });
  }
}

export default VisitorRegisterForm;

</script>
