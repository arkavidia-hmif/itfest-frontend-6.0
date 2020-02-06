<template>
  <div class="pa-4">
    <v-form v-if="isUserLoaded">
      <div v-if="!!errorMessage">
        <v-alert
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
      </div>
      <div>
        <div class="form-label">
          You're giving..
        </div>
        <v-text-field v-model="pointTemp" full-width suffix="points" outlined class="mt-4" />
      </div>
      <div class="form-label">
        Recipient: <b style="color: #FF0B51">{{ qrName }}</b>
      </div>
      <div class="form-label mb-4">
        Points left after giving: <b style="color: #3F32D5">{{ user.point - pointTemp }}</b>
      </div>
    </v-form>
    <v-btn
      color="#4336D7"
      class="white--text text-none"
      block
      :disabled="!valid"
      :loading="isLoading"
      @click="process"
    >
      Give Points!
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.account-number {
  position: relative;
  bottom: 7.5px;
  font-size:2em;
  font-weight:600;
  color:#FF0B51;
}
.points-balance {
  position: relative;
  bottom: 15px;
  font-size:4em;
  font-weight:600;
  color:#3F32D5;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Action, Getter } from 'nuxt-property-decorator';
import { UserData } from "~/api/types";

@Component({})
class TransferPoints extends Vue {
  @Prop() qrid!: string;
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;
  @Action('game/playGame') playAction;
  @Action('game/getQrDetails') getQrDetailsAction;
  @Action('user/transferPoint') transferPointAction;

  selected: Array<string> = [];
  pointTemp: number = 0;
  isUserLoaded: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = true;
  qrName: string = "";

  mounted() {
    this.isLoading = true;
    this.getQrDetailsAction({ qrId: this.qrid })
      .then(qr => {
        this.qrName = qr.name;
        this.isLoading = false;
      });
    this.fetchUserAction().finally(()=>{
      this.isUserLoaded = true;
    });
  }

  get valid() {
    const { point } = this.user;
      return this.pointTemp <= (point || 0);
  }

  process() {
    if (this.valid) {
      this.transferPointAction({recipientQrId: this.qrid, amount: this.pointTemp})
        .then(() => {
          this.$emit('close');
        })
        .catch(() => {
          // TODO show error
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}

export default TransferPoints;
</script>
