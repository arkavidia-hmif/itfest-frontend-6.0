<template>
  <div class="d-flex justify-center signed-in-container">
    <div class="px-1">
      Signed in as
    </div>
    <div class="account-id px-1">
      {{ name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signed-in-container {
  font-size:1.2em;
  .account-id {
    font-weight:600;
    color: #FF0B51;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SignedInAs',
  props: {
    name: {
      default: 'user',
      type: String
    }
  }
});
</script>
