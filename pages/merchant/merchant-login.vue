<template>
  <v-content class="merchant-login-container">
    <v-container class="fill-height" fluid pa-6>
      <v-row justify="center" justify-md="start" align="center" no-gutters>
        <v-col
          cols="12"
          md="6"
          lg="4"
          align-center
          justify-center
        >
          <MerchantLogin />
        </v-col>
        <v-col v-show="$vuetify.breakpoint.lgAndUp" lg="1" />
        <v-col
          cols="12"
          md="6"
          lg="5"
          align-center
          justify-center
        >
          <MerchantLoginForm :button-text="'Login'" />
        </v-col>
      </v-row>
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
import MerchantLoginForm from '~/components/merchant-login/MerchantLoginForm.vue';

export default Vue.extend({
  components: {
    MerchantLogin,
    MerchantLoginForm
  }
});
</script>
