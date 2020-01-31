<template>
  <div>
    <BackToolbar title-text="Merchandise Stock" back-to="/admin/" />
    <v-content>
      <ListStocks />
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
</style>

<style scoped>
::v-deep .v-text-field__slot > input{
  font-size:1.2em;
  font-weight:600;
}
::v-deep .v-text-field__slot > .v-text-field__suffix{
  color: #545454;
  font-size:1.2em;
  font-weight:600;
}
</style>

<script>
import Vue from 'vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';
import ListStocks from '~/components/admin-stock/ListStocks.vue';

export default Vue.extend({
  name: 'MerchandiseStock',
  components: {
    BackToolbar,
    ListStocks
  }
});
</script>
