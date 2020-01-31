<template>
  <v-content>
    <v-container>
      <div>
        <v-img :src="require('~/assets/logo-horz.svg')" aspect-ratio="15" contain class="py-2" />
      </div>
      <div v-if="isUserLoaded">
        {{ user }}
      </div>
      <div v-if="isQRLoaded">
        {{ qrcode.qrid }}
      </div>
      <v-row no-gutters class="py-4">
        <v-col cols="12">
          <SignedInAs :name="user.name" v-if="isUserLoaded"/>
        </v-col>
        <v-col cols="12" class="pa-2 py-4">
          <BalanceComponent :points="user.point.toString()" v-if="isUserLoaded" />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-row no-gutters>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-account-outline" submenu-title="Personal Data" />
            </v-col>
            <v-col cols="4">
              <nuxt-link to="/visitor/trx">
                <SubmenuComponent submenu-icon="mdi-wallet-outline" submenu-title="Points History" />
              </nuxt-link>
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-qrcode-scan" submenu-title="Transfer Points" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <FeedbackComponent />
        </v-col>
        <v-col cols="12" v-if="isQRLoaded">
          <QRComponent :value="qrcode.qrid" :size="300" />
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
import QRComponent from '~/components/visitor-menu/QRComponent.vue';
import {Component, Action, Getter} from 'nuxt-property-decorator';
import { UserData, Transaction, Qrcode } from '~/api/types';

@Component({
  components: {
    SignedInAs,
    BalanceComponent,
    SubmenuComponent,
    FeedbackComponent,
    QRComponent
  }
})

class VisitorIndexPage extends Vue{
  isUserLoaded : Boolean = false;
  isQRLoaded : Boolean = false;
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;

  @Action('user/fetchQRID') fetchQRIDAction;
  @Getter('user/getQRID') qrcode!: Qrcode;
  mounted() {
    this.fetchUserAction()
      .finally(()=>{
        this.isUserLoaded=true;
      });
    this.fetchQRIDAction()
      .finally(()=>{
        this.isQRLoaded=true;
      });
  }

}

export default VisitorIndexPage;
</script>
