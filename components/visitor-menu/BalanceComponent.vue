<template>
  <div class="balance-container elevation-12 d-flex flex-column align-center justify-center pa-4">
    <div>
      Current Points:
    </div>
    <div class="balance-number">
      {{ points }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.balance-number {
  // position: relative;
  // bottom: 30px;
  line-height: 140%;
  color:#4336D7;
  font-weight: 600;
  font-size: 4em;
  padding-top: -10px;
}
.balance-container {
  border-radius: 5px;
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BalanceComponent',
  props: {
    points: {
      default: '12345',
      type: String
    }
  }
});
</script>
