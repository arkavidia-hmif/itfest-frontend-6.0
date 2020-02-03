<template>
  <div>
    <BackToolbar title-text="Give Point"/>
    <v-container fluid class="mt-12">
      <v-row style="background-color:white">
        <v-col :cols="12" v-if="errorMessage !== ''">
          <v-alert
            type="error"
          >
           {{errorMessage}}
          </v-alert>
        </v-col>
        <v-col :cols="12" class="pa-5">
          <div class="headline">
            Which difficulties did the visitor played?
            <v-checkbox
              @click.native="pointChange"
              class="black--checkbox"
              label="Easy"
              v-model="selected"
              value="Easy"
            />
            <v-checkbox
              @click.native="pointChange"
              class="black--checkbox"
              label="Medium"
              v-model="selected"
              value="Medium"
            />
            <v-checkbox
              @click.native="pointChange"
              class="black--checkbox"
              label="Hard"
              v-model="selected"
              value="Hard"
            />
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5" style="color:black">
          <div class="headline">
            You're giving
          </div>
          <div class="display-1 mt-5">
            <b style="color:#4854D6"> {{ pointTemp }} </b> points
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5" style="color:black">
          <div class="headline">
            Account destination
          </div>
          <div class="display-1 mt-5">
            <b style="color:#E4491C"> {{ qr.name }} </b>
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5" style="color:black">
          <div class="headline">
            Remaining points after giving
          </div>
          <div class="display-1 mt-5 font-weight-bold" v-if="isUserLoaded">
            <b class="display-2 font-weight-black" style="color:#4854D6"> {{ user.point - pointTemp}} </b> points
          </div>
        </v-col>
        <v-col :cols="12" class="pa-5">
          <v-row justify="center">
            <v-btn @click="submitPoint" color="#4854D6" style="text-transform: none;color: white">
              Give Point
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import {Component, Action, Getter, Vue} from 'nuxt-property-decorator';
  import {UserData, Qrcode} from '../../api/types';
  import BackToolbar from '~/components/partials/BackToolbar.vue';

  @Component({
    components: {
      BackToolbar
    }
  })
  class givePoint extends Vue {

    @Action('user/fetchUser') fetchUserAction;
    @Getter('user/getUser') user!: UserData;
    @Getter('game/getQrcode') qr!: Qrcode;
    @Action('game/playGame') playAction;

    isQrCodeLoad: boolean = false
    selected: Array<string> = [];
    pointTemp: number = 0;
    accountTemp: string = "123123";
    isUserLoaded: boolean = false;
    errorMessage: string = '';

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
      this.playAction({qrId: this.qr.qrid, difficultyLevels: temp}).then( (val) =>{
        console.log(val);
        if (val.data.status !== 200){
          this.errorMessage = val.data.code;
        } else{
          this.$router.push('/tenant');
        }
      });
    }
    mounted() {
      this.fetchUserAction().finally(()=>{
        this.isUserLoaded = true;
      });
      // this.
    }
  }

  export default givePoint;
</script>
<style scoped>
  .black--checkbox /deep/ label {
    color: black;
    font-size: 24px;
  }
</style>
