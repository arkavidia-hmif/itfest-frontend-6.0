<template>
  <div>
    <BackToolbar title-text="Scan QR Code" back-to="/visitor/" />
    <v-content>
      <div class="mb-6 grey lighten-4">
        <VueQrReader v-if="!dialog" @code-scanned="codeScanned" />
      </div>
      <div class="pa-4">
        <div>
          Scan QR codes to play games at IT Festival and work on those <i>sweet</i> prizes!
        </div>
        <v-card tile color="#fffd70" elevation="3" class="my-4">
          <v-row no-gutters class="pa-2">
            <v-col cols="4">
              <div class="d-flex align-center justify-center pa-4">
                <v-icon size="75" color="#b0af5b">
                  mdi-lightbulb-on-outline
                </v-icon>
              </div>
            </v-col>
            <v-col cols="8">
              <div class="d-flex flex-column tip-container">
                <div>
                  <h3>
                    Pro Tip:
                  </h3>
                </div>
                <div>
                  Use this as an opportunity to work with others to get various prizes!
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-content>
    <v-dialog v-model="dialog" color="white">
      <TransferForm :qrid="scanned" class="white" @close="handleGivePointFinished" />
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.tip-container {
  color:#b0af5b;
}
</style>

<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { UserData } from '~/api/types';
import VueQrReader from '~/components/VueQrReader.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';
import TransferForm from '~/components/visitor-transfer/TransferForm.vue';

@Component({
  components: {
    VueQrReader,
    BackToolbar,
    TransferForm
  }
})

class VisitorScanPage extends Vue {
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;
  @Action('game/changeQrCode') changeQrCode;
  @Action('game/getStatus') getStatusAction;

  isUserLoaded: boolean = false;
  scanned: string = '';
  show: boolean = false;
  dialog: boolean = false;
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
          this.dialog = true;
        }
      }
    });
  }

  handleGivePointFinished() {
    this.$router.push("/visitor");
  }

  process() {
    this.$router.push('/visitor/transfer/');
  }
}

export default VisitorScanPage;
</script>
