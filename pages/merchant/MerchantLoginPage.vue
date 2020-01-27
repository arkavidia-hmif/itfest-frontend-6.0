<template>
  <v-content class="merchant-login-container">
    <v-container class="fill-height" fluid pa-12>
      <MerchantLogin />
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
.merchant-login-container{
  background-color:#fefefe;
}
</style>

<script lang="ts">
import Vue from 'vue';
import MerchantLogin from '~/components/merchant-login/MerchantLogin.vue';

export default Vue.extend({
  components: {
    MerchantLogin
  }
});
</script>
