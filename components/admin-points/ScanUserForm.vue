<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="py-5" cols="10">
      <v-card-text :v-if="errorMessage !== ''">
        {{ errorMessage }}
      </v-card-text>
      <vue-qr-reader
        @code-scanned="codeScanned"
        @error-captured="captureError"
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

import {Component, Vue} from 'nuxt-property-decorator';
import VueQrReader from '~/components/VueQrReader.vue';

@Component({
  components: {
    VueQrReader
  }
})
class ScanUserForm extends Vue {
  errorMessage: string = '';

  mounted() {
    console.log(this);
  }

  codeScanned(code) {
    console.log(code);
  }

  captureError(error) {
    console.log(error.name);
    switch (error.name) {
      case 'NotAllowedError':
        this.errorMessage = 'Camera permission denied.';
        break;
      case 'NotFoundError':
        this.errorMessage = 'There is no connected camera.';
        break;
      case 'NotSupportedError':
        this.errorMessage =
                'Seems like this page is served in non-secure context.';
        break;
      case 'NotReadableError':
        this.errorMessage =
                "Couldn't access your camera. Is it already in use?";
        break;
      case 'OverconstrainedError':
        this.errorMessage = "Constraints don't match any installed camera.";
        break;
      default:
        this.errorMessage = 'UNKNOWN ERROR: ' + error.message;
    }
  }
}

export default ScanUserForm;
</script>
