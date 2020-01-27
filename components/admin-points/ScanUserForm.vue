<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="py-5" cols="10">
      <qrcode-stream
        ref="qr"
        @decode="onDecode"
        @init="onInit"
        stop-on-scanned="true"
        use-back-camera="true"
        draw-on-found="true"
        line-color="#00FF00"
        line-width="20"
        video-height="480"
        video-width="640"
        responsive="true"
      />
      <div>Value: <a :href="result" target="_blank">{{ result }}</a></div>
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
  name: 'ScanUserForm',
  components: {
    'qrcode-stream': QrcodeStream
  },
  data: () => ({
    result: '',
    error: ''
  }),
  methods: {
    onDecode(result) {
      this.result = result;
    },
    async onInit(promise) {
      try {
        await promise;
      }
      catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        }
        else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        }
        else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        }
        else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        }
        else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        }
        else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      }
    }
  }
});
</script>
