<template>
  <div v-ripple>
    <nuxt-link :to="targetLink" style="text-decoration:none;">
      <div class="d-flex flex-column align-center justify-center pa-2 submenu-container">
        <div class="elevation-4 pa-2 icon-container">
          <v-icon size="80" color="#4336D7">
            {{ submenuIcon }}
          </v-icon>
        </div>
        <div class="text-center my-2 title-container">
          {{ submenuTitle }}
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.submenu-container{
  border-radius: 10px;
  .icon-container {
    border-radius:5px;
  }
  .title-container {
    font-size:1em;
    font-weight:600;
    text-decoration: none;
    color: #000000;
    a:visited {
      text-decoration: none;
    }
  }
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
    },
    targetLink: {
      default: '/visitor/',
      type: String
    }
  }
});
</script>
