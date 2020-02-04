<template>
  <div>
    <BackToolbar title-text="History Redeem" back-to="/admin/" />
    <v-content>
      <RedeemHistory />
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
</style>

<style scoped>
  ::v-deep .v-text-field__slot > input {
    font-size: 1.2em;
    font-weight: 600;
  }

  ::v-deep .v-text-field__slot > .v-text-field__suffix {
    color: #545454;
    font-size: 1.2em;
    font-weight: 600;
  }
</style>

<script>
    import Vue from 'vue';
    import BackToolbar from '~/components/partials/BackToolbar.vue';
    import RedeemHistory from '~/components/admin-points/RedeemHistory.vue';

    export default Vue.extend({
        name: 'RedemptionHistory',
        components: {
            BackToolbar,
            RedeemHistory
        }
    });
</script>
