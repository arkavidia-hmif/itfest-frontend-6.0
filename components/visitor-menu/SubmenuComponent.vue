<template>
  <div>
    <div>
      <v-icon>
        {{ submenuIcon }}
      </v-icon>
    </div>
    <div>
      {{ submenuTitle }}
    </div>
  </div>
</template>

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
