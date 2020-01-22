<template>
  <div class="d-flex flex-column align-center justify-center pa-2">
    <div class="elevation-6 pa-2 icon-container">
      <v-icon size="60" color="#4336D7">
        {{ submenuIcon }}
      </v-icon>
    </div>
    <div class="text-center my-2 title-container">
      {{ submenuTitle }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-container {
  border-radius:5px;
}
.title-container {
  font-size:0.9em;
  font-weight:600;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SubmenuComponent',
  props: {
    submenuIcon: {
      default: 'mdi-account',
      type: String
    },
    submenuTitle: {
      default: 'Submenu Title',
      type: String
    }
  }
});
</script>
