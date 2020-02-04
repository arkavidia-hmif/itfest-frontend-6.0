<template>
  <v-content>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <div class="title-container pa-4">
            <h1>
              Scan QR Code
            </h1>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex align-center justify-center my-6 pa-2">
            <div style="width:360px;height:360px" class="reader-container">
              <vue-qr-reader
                :video-width="360"
                :video-height="360"
                @code-scanned="codeScanned"
                @error-captured="errorCaptured"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="pa-4">
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
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}

.title-container::after {
  content: "";
  position: absolute;
  width: 150px;
  left: 10;
  border-bottom: 6px solid red;
}

.reader-container {
  background-color:#eeeeee;
}

.tip-container {
  color:#b0af5b;
}
</style>

<script lang="ts">
import jsQR from 'jsqr'
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { UserData, Qrcode } from '~/api/types';
import VueQrReader from '~/components/VueQrReader.vue';

@Component({
  components: {
    VueQrReader
  }
})

class VisitorScanPage extends Vue {
  @Action('give/fetchVisitorQR') fetchVisitorQRAction;
  @Getter('user/getVisitorQR') qr!: Qrcode;
  
  isGiveLoaded: boolean = false;
  scanned: string = '';
  show: boolean = false;
  errorMessage: string = '';

  mounted() {
    this.fetchVisitorQRAction().finally(()=>{
      this.isGiveLoaded = true;
    });
  }

  codeScanned(code) {
    try {
      this.fetchVisitorQRAction({qr:code})
        .then((val) => {
          if(val.name) {
            this.$router.push('/visitor/transfer');
          }
          else {
            console.log('User gak ketemu'); // dibuat v-alert
          }
        })
    }
    catch(e) {
      console.log(e); // dibuat v-alert
    }
  }

  errorCaptured(error) {
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

export default VisitorScanPage;
</script>