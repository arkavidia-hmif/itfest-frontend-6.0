<template>
  <v-row class="transaction-container pa-4">
    <v-col cols="10" class="pa-2">
      <div class="d-flex flex-column">
        <div class="d-flex grantor-container">
          <div>
            From:
          </div>
          <div class="px-2 grantor-account">
            {{ pointsFrom }}
          </div>
        </div>
        <div class="d-flex grantor-container">
          <div>
            To:
          </div>
          <div class="px-2 grantor-account">
            {{ pointsTo }}
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="2" class="text-right pa-2">
      {{ time }}
    </v-col>
    <v-col cols="12" class="pa-2 pt-0">
      <div class="d-flex received-container">
        <div>
          Points {{ received ? "Received" : "Transferred" }}:
        </div>
        <div class="px-2 received-points">
          {{ pointsAmount }}
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.grantor-container {
  font-weight: 600;
  font-size:1.3em;
  .grantor-account {
    color: #FE1256;
  }
}
.received-container {
  font-size:1.1em;
  .received-points {
    color: #4337D7;
  }
}
.transaction-container {
  background-color:#EFEFEF;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TransactionComponent',
  props: {
    pointsFrom: {
      type: String,
      default: 'citenjin'
    },
    pointsTo: {
      type: String,
      default: 'citenjin2'
    },
    pointsAmount: {
      type: String,
      default: '12345'
    },
    time: {
      type: String,
      default: '10:10'
    },
    received: {
      type: Boolean,
      default: true
    }
  }
});
</script>
