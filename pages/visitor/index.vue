<template>
  <v-content>
    <v-container>
      <div>
        <v-img :src="require('~/assets/logo-horz.svg')" aspect-ratio="15" contain class="py-2" />
      </div>
      <v-row no-gutters class="py-4">
        <v-col cols="12">
          <SignedInAs v-if="isUserLoaded" :name="user.name" />
        </v-col>
        <v-col cols="12" class="pa-2 py-4">
          <BalanceComponent v-if="isUserLoaded" :points="user.point.toString()" />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-row no-gutters>
            <v-col cols="4">
              <nuxt-link to="/visitor/update-profile" class="no-underline">
                <SubmenuComponent submenu-icon="mdi-account-outline" submenu-title="Personal Data" />
              </nuxt-link>
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-wallet-outline" submenu-title="Points History" target-link="/visitor/trx/" />
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-qrcode-scan" submenu-title="Transfer Points" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" v-if="isQRLoaded">
          <QRComponent :url="qrcode.qrid" :size="250" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
.no-underline {
  text-decoration: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import {Component, Action, Getter} from 'nuxt-property-decorator';
import SignedInAs from '~/components/visitor-menu/SignedInAs.vue';
import BalanceComponent from '~/components/visitor-menu/BalanceComponent.vue';
import SubmenuComponent from '~/components/visitor-menu/SubmenuComponent.vue';
import QRComponent from '~/components/visitor-menu/QRComponent.vue';
import { UserData, Qrcode } from '~/api/types';

@Component({
  components: {
    SignedInAs,
    BalanceComponent,
    SubmenuComponent,
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
