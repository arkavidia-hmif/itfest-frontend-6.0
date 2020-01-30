<template>
  <v-form class="px-4 justify-center" @submit.prevent="attemptLogin">
    <v-text-field v-model="username" label="Email Address" type="text" />
    <v-text-field v-model="password" label="Password" type="password" />
    <div class="text-center">
      <v-btn :loading="isLoggingIn" type="submit" color="success" class="mt-4 px-12 py-2 text-none" rounded>
        Login
      </v-btn>
    </div>
  </v-form>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Action, Vue } from 'nuxt-property-decorator';

@Component({
  components: { }
})
class LoginForm extends Vue {
  username: string = '';
  password: string = '';
  isLoggingIn: boolean = false;
  @Action('auth/login') loginAction;

  attemptLogin() {
    if (!this.username || !this.password) {
      return;
    }

    this.isLoggingIn = true;
    const userid = this.username;
    const password = this.password;
    this.loginAction({ userid, password })
      .then(() => {
        this.$router.push('/');
      })
      .catch(() => {
        // TODO do something
      })
      .finally(() => {
        this.isLoggingIn = false;
      });
  }
}

export default LoginForm;

</script>
