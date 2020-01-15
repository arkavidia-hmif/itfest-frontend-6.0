<template>
  <v-row justify="center" justify-md="start" align="center" no-gutters>
    <v-col
      cols="12"
      md="6"
      lg="4"
      align-center
      justify-center
    >
      <div class="text-right display-1 section-title font-weight-bold mb-4">
        Login ke dashboard.
      </div>
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
</template>

<style lang="scss" scoped>
  .headline{
    font-weight: 700;
  }
  .section-title {
    position: absolute;
    padding-bottom: 8px;
  }

  .section-title::after {
    content: "";
    position: absolute;
    width: 150px;
    height: 1px;
    bottom: -4px;
    right: 0;
    border-bottom: 6px solid #FF084F;
  }
</style>

<script>
import Vue from 'vue';
import MerchantLoginForm from './MerchantLoginForm.vue';

export default Vue.extend({
  name: 'MerchantLogin',
  components: {
    MerchantLoginForm
  }
});
</script>
