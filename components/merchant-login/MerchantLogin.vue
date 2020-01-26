<template>
  <div class="text-right display-1 section-title font-weight-bold mb-6 px-3">
    Login ke dashboard.
  </div>
</template>

<style lang="scss" scoped>
  .headline{
    font-weight: 700;
  }

  .section-title {
    position:relative;
  }

  .section-title::after {
    content: "";
    position: absolute;
    width: 160px;
    height: 1px;
    bottom: -6px;
    right: 0;
    border-bottom: 6px solid #FF084F;
  }
</style>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'MerchantLogin'
});
</script>
