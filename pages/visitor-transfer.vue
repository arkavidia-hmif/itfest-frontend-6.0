<template>
  <div>
    <BackToolbar title-text="Give Points" />
    <v-content>
      <TransferForm />
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
import TransferForm from '~/components/visitor-transfer/TransferForm.vue';

export default Vue.extend({
  name: 'VisitorTransfer',
  components: {
    BackToolbar,
    TransferForm
  }
});
</script>
