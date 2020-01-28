<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="headline mb-1" align="center">
        Login
      </v-list-item-title>
      <v-list-item-subtitle align="center">
        Silakan login terlebih dahulu.
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<style lang="scss" scoped>
.headline{
 font-weight: 600;
}
</style>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminLoginHeader'
});

</script>
