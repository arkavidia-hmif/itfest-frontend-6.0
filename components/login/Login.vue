<template>
  <v-card class="pa-4" elevation="24">
    <v-row wrap align="center" justify="center">
      <v-col cols="12">
        <ArkavidiaLoginImage class="my-2" />
      </v-col>
      <v-col cols="12">
        <LoginHeader />
      </v-col>
      <v-col cols="12">
        <v-card-text>
          <LoginForm :button-text="'LOGIN'" :show-register-button="true" />
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import Vue from 'vue';
import LoginForm from './LoginForm.vue';
import ArkavidiaLoginImage from './ArkavidiaLoginImage.vue';
import LoginHeader from './LoginHeader.vue';

export default Vue.extend({
  name: 'AdminLogin',
  components: {
    LoginForm,
    ArkavidiaLoginImage,
    LoginHeader
  }
});
</script>
