<template>
  <div>
    <BackToolbar title-text="Update Merch Stock" back-to="/admin/merchandise-stock" />
    <v-content>
      <UpdateStockForm />
    </v-content>
  </div>
</template>

<script>
  import Vue from 'vue';
  import BackToolbar from '~/components/partials/BackToolbar.vue';
  import UpdateStockForm from '~/components/admin-stock/UpdateStockForm.vue';

  export default Vue.extend({
    name: 'EditMerchStock',
    components: {
      BackToolbar,
      UpdateStockForm
    }
  });
</script>

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
