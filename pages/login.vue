<template>
  <v-content>
    <v-container fluid fill-height class="login-container pa-0">
      <v-row justify="center" align="center" wrap no-gutters="">
        <v-col cols="10">
          <Login />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
.login-container{
  background-image:linear-gradient(#7cddcd,#ff0850);
}
</style>

<script lang="ts">
import Vue from 'vue';
import Login from '~/components/login/Login.vue';

export default Vue.extend({
  components: {
    Login
  }
});
</script>
