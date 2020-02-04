<template>
  <div>
    <BackToolbar title-text="Points History" back-to="/visitor/" />
    <v-content>
      <VisitorTrxHistory v-if="isUserLoaded" />
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
.no-transaction-container {
  font-size:1.4em;
  span {
    font-weight: 600;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter, Action } from 'nuxt-property-decorator';
import VisitorTrxHistory from '~/components/visitor-history/VisitorTrxHistory.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';
import { UserData } from "~/api/types";

@Component({
  components: {
    VisitorTrxHistory,
    BackToolbar,
  }
})

class VisitorTransferPage extends Vue {
  isUserLoaded : Boolean = false;
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;

  mounted() {
    this.fetchUserAction()
      .finally(() =>{
        this.isUserLoaded = true;
      });
  }
}

export default VisitorTransferPage;
</script>
