<template>
  <v-container>
    <Alert v-if="error" type="error" class="mt-4" :message="error" />
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
  </v-container>
</template>

<script lang="ts">
import { Component, Action, Vue } from 'nuxt-property-decorator';
import Alert from '~/components/partials/Alert.vue';
import { ApiError } from '~/api/base';
import { LoginStatus } from '~/api/types';

@Component({
  components: { Alert }
})

class VisitorLoginForm extends Vue {
  error = '';
  emailAddress: string = '';
  password: string = '';
  isValid: boolean = false;
  loggingIn: boolean = false;
  emailRules = [
    v => !!v || 'Email is required  !',
    v => /.+@.+/.test(v) || 'Must be a valid email address.'
  ];
  passwordRules = [
    v => !!v || 'Password is required',
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
        this.$router.push('/visitor/menu');
      })
      .catch((e) => {
        if (e instanceof ApiError) {
          if (e.errorCode === LoginStatus.NO_USER) {
            this.error = 'User belum terdaftar';
            return;
          }

          this.error = e.message;
          return;
        }

        this.error = e.toString();
      })
      .finally(() => {
        this.loggingIn = false;
      });
  }
}

export default VisitorLoginForm;

</script>
