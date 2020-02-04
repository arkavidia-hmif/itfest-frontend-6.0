<template>
  <v-row class="transaction-container pa-1">
    <v-col cols="10" class="pa-2">
      <div class="d-flex flex-column">
        <div class="d-flex grantor-container align-start">
          <div>
            From:
          </div>
          <div class="px-2 grantor-account">
            {{ typePrefix(fromType) }} {{ pointsFrom }}
          </div>
        </div>
        <div class="d-flex grantor-container align-start">
          <div>
            To:
          </div>
          <div class="px-2 grantor-account">
            {{ typePrefix(toType) }} {{ pointsTo }}
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
    font-size:1.1rem;
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
    fromType: {
      type: String,
      default: 'visitor'
    },
    pointsFrom: {
      type: String,
      default: 'citenjin'
    },
    toType: {
      type: String,
      default: 'visitor'
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
    type: {
      type: String,
      default: 'give'
    },
    received: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    typePrefix(type){
      let result = '';
      if (type==='admin') result = '[A]';
      else if (type==='tenant') result = '[T]';
      else result = '[V]';

      return result;
    }
  }
});
</script>
