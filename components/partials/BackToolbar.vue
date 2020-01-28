<template>
  <v-app-bar fixed app>
    <v-app-bar-nav-icon>
      <v-icon>mdi-chevron-left</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="toolbar-title">
      {{ titleText }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.toolbar-title {
  color: #545454;
  font-weight: 600;
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BackToolbar',
  props: {
    titleText: {
      default: 'Title',
      type: String
    }
  }
});
</script>
