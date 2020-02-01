<template>
  <div>
    <h3>
      Your QR Code
    </h3>
    <div>
      <p>
        This is your QRCode for your account.
      </p>
      <div class="d-flex justify-center">
        <QRCodeVue :value="url" :size="size" level="H" />
      </div>
    </div>
  </div>
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
