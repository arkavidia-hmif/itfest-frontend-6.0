<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="py-5" cols="10">
      <qrcode-stream
        ref="qr"
        v-on:code-scanned="codeScanned"
        stop-on-scanned="true"
        use-back-camera="true"
        draw-on-found="true"
        line-color="#00FF00"
        line-width="20"
        video-height="480"
        video-width="640"
        responsive="true"
      />
      <div>Value: {{ scanned }}</div>
    </v-col>
    <v-col class="d-flex justify-center" cols="10">
      <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%">
        Search User
      </v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

  .full-width {
    width: 100%;
  }

</style>

<script lang="ts">
import Vue from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

export default Vue.extend({
  components: {
    'qrcode-stream': QrcodeStream
  },
  data: () => ({
    scanned: ''
  }),
  methods: {
    codeScanned(event) {
      this.scanned = event.detail[0];
    }
  }
});
</script>
