<template>
  <v-container fluid>
    <v-row class="px-2" style="background-color:white">
      <v-col v-if="isUserLoaded" :cols="12" class="black--text title pb-12" style="background-color:white">
        Signed in as <b style="color:red"> {{ user.name }} </b>
      </v-col>
      <v-col :cols="12">
        <v-card color="white" elevation="8">
          <v-row>
            <v-col :cols="6">
              <v-card-text class="subtitle-1 font-weight-medium mt-1 black--text" style="text-align: left">
                Remaining Points:
              </v-card-text>
            </v-col>
            <v-col :cols="6">
              <v-card-text v-if="isUserLoaded" class="display-2 font-weight-black" style="text-align: right;color:blue">
                {{ user.point }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card color="white" elevation="8">
          <v-row>
            <v-dialog
              v-model="show"
              @close="show = !show"
            >
              <template v-slot:activator="{ on }">
                <v-col @click="show = !show" v-on="on">
                  <v-card-text class="headline font-weight-bold" style="color:blue">
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
                <v-card-actions style="text-align: center" v-if="errorMessage === ''">
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
        <nuxt-link to="/tenant/trx">
          <v-card color="white" elevation="8">
            <v-row>
              <v-col>
                <v-card-text class="headline font-weight-bold" style="color:blue">
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
        </nuxt-link>
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
        }else if(val.status == 400){
          this.errorMessage = 'invalid-qrid';
        } else {
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
