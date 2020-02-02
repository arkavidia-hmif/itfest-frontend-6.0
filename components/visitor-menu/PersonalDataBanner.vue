<template>
  <div class="d-flex personal-data-banner pa-4 align-center">
    <div>
      <v-icon color="#ffffff" size="50">
        mdi-database
      </v-icon>
    </div>
    <div class="px-2">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-data-banner {
  background-color:#6BC805;
  color: #ffffff;
  border-radius:5px;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PersonalDataBanner',
  props: {
    text: {
      default: 'MESSAGE',
      type: String
    }
  }
});
</script>
