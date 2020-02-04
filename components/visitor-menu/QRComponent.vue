<template>
  <v-card elevation="3" color="white">
    <div class="pa-4 grey lighten-4">
      <div class="font-weight-bold">
        Your QR Code
      </div>
      <div>
        This is your QR Code for your account.
      </div>
    </div>
    <div class="pa-4" align="center">
      <QRCodeVue :value="url" :size="size" level="H" />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import QRCodeVue from 'qrcode.vue';

export default Vue.extend({
  name: 'QRComponent',
  components: {
    QRCodeVue
  },
  props: {
    url: {
      default: '',
      type: String
    },
    size: {
      default: 200,
      type: Number
    }
  }
});
</script>
