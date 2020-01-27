<template>
  <v-content>
    <v-container>
      <div>
        <v-img :src="require('~/assets/logo-horz.svg')" aspect-ratio="15" contain class="py-2" />
      </div>
      <v-row no-gutters class="py-4">
        <v-col cols="12">
          <SignedInAs />
        </v-col>
        <v-col cols="12" class="py-2">
          <BalanceComponent />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-row no-gutters>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-account-outline" submenu-title="Personal Data" />
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-refresh" submenu-title="Trade Points" />
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-wallet-outline" submenu-title="Points History" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <FeedbackComponent />
        </v-col>
        <v-col cols="12">
          QR
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
</style>

<script lang="ts">
import Vue from 'vue';
import SignedInAs from '~/components/visitor-menu/SignedInAs.vue';
import BalanceComponent from '~/components/visitor-menu/BalanceComponent.vue';
import SubmenuComponent from '~/components/visitor-menu/SubmenuComponent.vue';
import FeedbackComponent from '~/components/visitor-menu/FeedbackComponent.vue';

export default Vue.extend({
  name: 'VisitorMenu',
  components: {
    SignedInAs,
    BalanceComponent,
    SubmenuComponent,
    FeedbackComponent
  }
});
</script>
