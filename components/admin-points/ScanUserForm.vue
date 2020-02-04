<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col cols="10">
      <v-card-text :v-if="errorMessage !== ''">
        {{ errorMessage }}
      </v-card-text>
      <vue-qr-reader
        ref = "qr"
        @code-scanned="codeScanned"
        @error-captured="captureError"
      />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

  .full-width {
    width: 100%;
  }

</style>

<script lang="ts">

    import {Component, Getter, Mutation, Vue} from 'nuxt-property-decorator';
import VueQrReader from '~/components/VueQrReader.vue';
import arkavidiaApi from "~/api/api";

@Component({
  components: {
    VueQrReader
  }
})
class ScanUserForm extends Vue {
  errorMessage: string = '';

    @Mutation("redemption/setTarget") setRedemptionTarget;

  codeScanned(code) {
    arkavidiaApi.user.getUser({id: code})
        .then(user => {
            this.$store.commit("redemption/setTarget", {
                qrid: code,
                username: user.username,
                name: user.name,
                role: user.role
            });
            this.$router.push(`/admin/redeem-points`);
        });
  }

  captureError(error) {
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
