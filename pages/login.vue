<template>
  <v-content>
    <div class="pa-4 my-12">
      <v-img :src="require('~/assets/logo-horz.svg')" width="60%" />
      <div class="form-title mt-8 mb-8">
        <div class="headline font-weight-bold">
          Welcome to Arkavidia 6.0 IT Festival!
        </div>
        <div class="subtitle mt-2">
          Please login to continue
        </div>
      </div>
      <LoginForm />
      <div class="mt-4">
        Are you a new visitor? <nuxt-link to="/visitor/register">
          Register here!
        </nuxt-link>
      </div>
    </div>
  </v-content>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '~/components/login/LoginForm.vue';

export default Vue.extend({
  name: 'Login',
  components: {
    LoginForm
  }
});
</script>
