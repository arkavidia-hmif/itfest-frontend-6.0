<template>
  <div>
    <BackToolbar title-text="Give Point" back-to="/tenant/" />
    <div v-if="!isLoading" class="mt-12 pa-4">
      <v-row style="background-color:white">
        <v-col v-if="errorMessage !== ''" :cols="12">
          <v-alert
            type="error"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
        <v-col :cols="12" class="pa-5">
          <div class="">
            Which difficulties did the visitor played?
            <v-checkbox
              v-model="selected"
              label="Easy"
              value="Easy"
              class="mb-0 mt-4"
              @click.native="pointChange"
            />
            <v-checkbox
              v-model="selected"
              label="Medium"
              value="Medium"
              class="my-0"
              @click.native="pointChange"
            />
            <v-checkbox
              v-model="selected"
              label="Hard"
              value="Hard"
              class="my-0"
              @click.native="pointChange"
            />
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5" style="color:black">
          <div class="">
            You're giving <b style="color:#4854D6"> {{ pointTemp }} </b> points to <b>{{ qrName }}</b>
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5" style="color:black">
          <div>
            Remaining points after giving:
          </div>
          <div v-if="isUserLoaded" class=" mt-5 font-weight-bold">
            <b class="font-weight-black" style="color:#4854D6"> {{ user.point - pointTemp }} </b> points
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5">
          <v-row justify="center">
            <v-btn color="#4854D6" style="text-transform: none;color: white" @click="submitPoint">
              Give Point
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Action, Getter, Vue, Prop} from 'nuxt-property-decorator';
  import {UserData} from '../../api/types';
  import BackToolbar from '~/components/partials/BackToolbar.vue';

  @Component({
    components: {
      BackToolbar
    }
  })
  class TenantGivePoint extends Vue {
    @Prop() qrid!: string;

    @Action('user/fetchUser') fetchUserAction;
    @Getter('user/getUser') user!: UserData;
    @Action('game/playGame') playAction;
    @Action('game/getQrDetails') getQrDetailsAction;

    selected: Array<string> = [];
    pointTemp: number = 0;
    isUserLoaded: boolean = false;
    errorMessage: string = '';
    isLoading: boolean = true;
    qrName: string = "";

    pointChange() {
      let x = 0;
      if (this.selected.includes('Easy')) {
        x += 25;
      }
      if (this.selected.includes('Medium')) {
        x += 50;
      }
      if (this.selected.includes('Hard')) {
        x += 75;
      }
      this.pointTemp = x;
    }

    submitPoint() {
      let temp: number[] = [];
      if (this.selected.includes('Easy')) {
        temp.push(1);
      }
      if (this.selected.includes('Medium')) {
        temp.push(2);
      }
      if (this.selected.includes('Hard')) {
        temp.push(3);
      }

      this.playAction({qrId: this.qrid, difficultyLevels: temp})
        .then(() =>{
          this.$emit('close');
        })
        .catch(e => {
          switch (e.response.code) {
            case 400:
              this.errorMessage = "Insufficient points";
              break;
            case 404:
              this.errorMessage = "User not found";
              break;
            default:
              this.errorMessage = e.response.data.code || e.toString();
          }
        });
    }
    mounted() {
      this.isLoading = true;
      this.getQrDetailsAction({ qrId: this.qrid })
        .then(qr => {
          this.qrName = qr.name;
        })
        .catch(e => {
          switch (e.response.status) {
            case 400:
            case 404:
              this.errorMessage = "Invalid QR code";
              break;
            default:
              this.errorMessage = e.response.data.code || e.toString();
          }
        })
        .finally(() => {
          this.isLoading = false;
        });

      this.fetchUserAction()
        .finally(()=>{
          this.isUserLoaded = true;
        });
    }
  }

  export default TenantGivePoint;
</script>

<style scoped>
</style>
