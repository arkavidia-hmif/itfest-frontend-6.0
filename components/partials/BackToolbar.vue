<template>
  <v-toolbar height="75" class="px-4">
    <v-btn icon>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-toolbar-title class="toolbar-title">
      {{ titleText }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<style lang="scss" scoped>
.toolbar-title {
  color: #545454;
  font-weight: 600;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'BackToolbar',
  props: {
    titleText: {
      default: 'Title',
      type: String
    }
  }
})
</script>
