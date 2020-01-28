<template>
  <div>
    <v-toolbar>
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Transaction History</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <div>
      <TenantTrxHistory />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TenantTrxHistory from '~/components/tenant-history/TenantTrxHistory.vue';

export default Vue.extend({
  name: 'TenantTrxHistoryPage',
  components: { TenantTrxHistory },
  props: {},
  data() {
    return {

    };
  }
});
</script>

<style scoped>

</style>
