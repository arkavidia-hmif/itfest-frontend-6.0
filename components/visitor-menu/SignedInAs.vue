<template>
  <div class="d-flex">
    <div class="d-flex align-center">
      <h3 class="px-3">
        Signed in as
      </h3>
    </div>
    <div class="d-flex align-center">
      <h3 class="account-id">
        341256
      </h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-id {
  font-size: 2em;
  color: #FF0B51;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SignedInAs'
});
</script>
