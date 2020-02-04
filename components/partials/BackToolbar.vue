<template>
  <v-app-bar fixed app>
    <v-btn icon :to="backTo" exact>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-toolbar-title class="toolbar-title pl-0">
      {{ titleText }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.toolbar-title {
  color: #545454;
  font-weight: 600;
}
.no-underline {
  text-decoration: none;
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
    },
    backTo: {
      default: '/',
      type: String
    }
  }
});
</script>
