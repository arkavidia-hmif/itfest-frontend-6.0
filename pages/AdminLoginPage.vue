<template>
  <v-content>
    <v-container fluid fill-height class="login-container">
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" lg="4">
          <AdminLogin />
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
import AdminLogin from '~/components/admin-login/AdminLogin.vue';

export default Vue.extend({
  components: {
    AdminLogin
  }
});
</script>
