<template>
  <v-container fluid>
    <div align="center" class="py-2">
      <v-img :src="require('~/assets/logo-horz.svg')" width="60%" />
    </div>
    <v-row v-if="isUserLoaded" class="px-2">
      <v-col :cols="12">
        <v-card color="#FF084F" elevation="3" class="white--text">
          <div style="background: #00000022" class="px-4 py-2">
            Signed in as <b> {{ user.name }} </b>
          </div>
          <div class="pa-4">
            <div>
              Remaining points:
            </div>
            <div class="display-1 font-weight-black">
              {{ user.point }}
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card color="#7608FF" class="white--text" elevation="3">
          <v-row>
            <v-dialog
              v-model="show"
              @close="show = !show"
            >
              <template v-slot:activator="{ on }">
                <v-col @click="show = !show" v-on="on">
                  <v-card-text class="headline font-weight-bold">
                    <v-row>
                      <div class="ml-4 mt-1">
                        <i class="mdi mdi-48px mdi-hand-heart" />
                      </div>
                      <div class="ml-4 mt-3">
                        Give Points
                      </div>
                    </v-row>
                  </v-card-text>
                </v-col>
              </template>
              <v-card>
                <v-card-text class="display-2 center" style="color:red;text-align: center">
                  {{ errorMessage }}
                </v-card-text>
                <v-card-actions v-if="errorMessage === ''" style="text-align: center">
                  <vue-qr-reader
                    v-if="show"
                    @code-scanned="codeScanned"
                    @error-captured="errorCaptured"
                  />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card color="#FFBA07" class="white--text" elevation="3" @click="$router.push('/tenant/trx')">
          <v-row>
            <v-col>
              <v-card-text class="headline font-weight-bold">
                <v-row>
                  <div class="ml-4 mt-1">
                    <i class="mdi mdi-history mdi-48px" />
                  </div>
                  <div class="ml-4 mt-1 remove-underline" style="text-decoration: none">
                    Transaction History
                  </div>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Component, Action, Getter, Vue} from 'nuxt-property-decorator';
  import {UserData} from '../../api/types';
  import VueQrReader from '~/components/VueQrReader.vue';

  @Component({
    components: {
      VueQrReader
    }
  })

  class TenantMenu extends Vue {
    @Action('user/fetchUser') fetchUserAction;
    @Getter('user/getUser') user!: UserData;
    @Action('game/changeQrCode') changeQrCode;
    @Action('game/getStatus') getStatusAction;

    isUserLoaded: boolean = false;
    scanned: string = '';
    show: boolean = false;
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
else if (val.status === 400){
          this.errorMessage = 'invalid-qrid';
        }
 else {
          if (this.errorMessage === ''){
            this.changeQrCode({qr: code}).finally( () =>{
              this.$router.push('/tenant/give-point');
            });
          }
        }
      });


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
  export default TenantMenu;
</script>
<style>
</style>
