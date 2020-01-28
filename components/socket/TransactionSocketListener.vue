<template>
  <div>
    <slot />
    <v-dialog v-model="visitorFeedbackDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <VisitorFeedbackDialog
        :company-name="senderName"
        :points-awarded="pointsAwarded"
        :whats-good-options="whatsGoodOptions"
        @skip="visitorFeedbackDialog = false"
        @submit="(event) => onFeedbackSubmit(event)"
      />
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="info"
      top
      multi-line
      timeout="4000"
      @click="snackbar = false"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Action, Getter, Watch, Vue } from 'nuxt-property-decorator';
import api from '~/api/api';
import { TransactionEventType } from "~/api/socket";
import VisitorFeedbackDialog from '~/components/visitor-feedback/VisitorFeedbackDialog.vue';

const whatsGoodOptions = [
  { title: 'Stands out from the crowd', value: 'stands_out' },
  { title: 'Fun & engaging games', value: 'fun_games' },
  { title: 'Friendly people', value: 'friendly_people' },
  { title: 'Nice decoration', value: 'nice_decoration' }
];

@Component({
  components: { VisitorFeedbackDialog }
})
class TransactionSocketListener extends Vue {
  @Action("user/fetchUser") fetchUserAction;
  @Getter('auth/getToken') token;
  @Getter('auth/isLoggedIn') isLoggedIn;

  whatsGoodOptions = whatsGoodOptions;
  pointsAwarded = 200;
  senderName = "";
  visitorFeedbackDialog = false;
  snackbar = false;
  snackbarText = '';

  mounted() {
    if (this.isLoggedIn) {
      this.initiateSocket(this.token);
    }
  }

  @Watch("isLoggedIn")
  loggedInWatcher(val: boolean) {
    if (val) {
      this.initiateSocket(this.token);
    }
  }

  initiateSocket(token: string) {
    api.socket.initiateSocket(token);

    api.socket.addListener(TransactionEventType.GIVE, (data) => {
      const name = data.from.name;
      const amount = data.amount;

      this.showSnackbar(`You just received ${amount} points from ${name}!`);
      this.fetchUserAction();
    });

    api.socket.addListener(TransactionEventType.REDEEM, (data) => {
      const name = data.item.name;
      const amount = data.amount;

      this.showSnackbar(`You just redeemed ${name} for ${amount} points!`);
      this.fetchUserAction();
    });

    api.socket.addListener(TransactionEventType.PLAY, (data) => {
      const name = data.from.name;
      const amount = data.amount;

      this.senderName = name;
      this.pointsAwarded = amount;
      this.visitorFeedbackDialog = true;
    });
  }

  onFeedbackSubmit() {
    this.visitorFeedbackDialog = false;
  }

  showSnackbar(message: string) {
    this.snackbar = true;
    this.snackbarText = message;
  }
}

export default TransactionSocketListener;

</script>

<style scoped>

</style>
