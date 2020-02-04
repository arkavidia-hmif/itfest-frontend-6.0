<template>
  <div>
    <BackToolbar title-text="Transaction History" back-to="/tenant" />
    <v-content>
      <TenantTrxHistory />
    </v-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TenantTrxHistory from '~/components/tenant-history/TenantTrxHistory.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';

export default Vue.extend({
  name: 'TenantTrxHistoryPage',
  components: {
    TenantTrxHistory,
    BackToolbar
  },
  props: {},
  data() {
    return {

    };
  }
});
</script>

<style scoped>

</style>
