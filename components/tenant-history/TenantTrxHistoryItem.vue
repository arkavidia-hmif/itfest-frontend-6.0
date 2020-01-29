<template>
  <div class="grey lighten-4 px-4 py-3">
    <div style="float: right" class="ma-1 grey--text text--darken-1">
      {{ time }}
    </div>
    <div class="title font-weight-bold">
      Visitor <span style="color: #FF084F">{{ visitorId }}</span>
    </div>
    <div class="subtitle">
      Points given: <span style="color: #7608FF">{{ points }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TenantTrxHistoryItem',
  props: {
    time: {
      type: String,
      required: true
    },
    visitorId: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      required: true
    }
  }
});
</script>

<style scoped>

</style>
