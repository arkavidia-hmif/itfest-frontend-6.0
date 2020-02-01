<template>
  <v-app-bar fixed app>
    <nuxt-link :to="backTo" class="no-underline">
      <v-app-bar-nav-icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-app-bar-nav-icon>
    </nuxt-link>
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
