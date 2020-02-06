<template>
  <div>
    <BackToolbar title-text="Scan QR Code" back-to="/tenant/" />
    <v-content>
      <div class="reader-container">
        <VueQrReader v-if="readerEnabled" @code-scanned="codeScanned" />
      </div>
    </v-content>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <TenantGivePoint :qrid="scanned" class="white" @close="handleGivePointFinished" />
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { UserData } from '~/api/types';
import VueQrReader from '~/components/VueQrReader.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';
import TenantGivePoint from '~/components/tenant-give-point/TenantGivePoint.vue';

@Component({
  components: {
    VueQrReader,
    BackToolbar,
    TenantGivePoint
  }
})

class GivePointScanPage extends Vue {
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;
  @Action('game/changeQrCode') changeQrCode;
  @Action('game/getStatus') getStatusAction;

  isUserLoaded: boolean = false;
  scanned: string = '';
  show: boolean = false;
  dialog: boolean = false;
  readerEnabled: boolean = true;
  errorMessage: string = '';

  mounted() {
    this.fetchUserAction().finally(()=>{
      this.isUserLoaded = true;
    });
  }

  codeScanned(code) {
    this.getStatusAction({qr: code}).then((val) =>{
      // eslint-disable-next-line no-console
      console.log(val);
      if (val.status === 404) {
        this.errorMessage = 'visitor-not-found';
      }
      else if (val.status === 400) {
        this.errorMessage = 'invalid-qrid';
      }
      else {
        if (this.errorMessage === '') {
          this.scanned = code;
          this.readerEnabled = false;
          this.dialog = true;
        }
      }
    });
  }

  handleGivePointFinished() {
    this.$router.push('/tenant');
  }
}

export default GivePointScanPage;
</script>
