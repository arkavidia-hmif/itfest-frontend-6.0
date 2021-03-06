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
        <v-col v-if="user && !user.filled" cols="12" class="pa-2 py-4">
          <nuxt-link to="/visitor/update-profile/" class="no-underline">
            <PersonalDataBanner />
          </nuxt-link>
        </v-col>
        <v-col cols="12" class="pa-2">
          <BalanceComponent v-if="isUserLoaded" :points="user.point.toString()" />
        </v-col>
        <v-col cols="12" class="py-2">
          <v-row no-gutters>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-account-outline" submenu-title="Personal Data" target-link="/visitor/update-profile/" />
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-wallet-outline" submenu-title="Points History" target-link="/visitor/trx/" />
            </v-col>
            <v-col cols="4">
              <SubmenuComponent submenu-icon="mdi-qrcode-scan" submenu-title="Transfer Points" target-link="/visitor/transfer/" />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="isQRLoaded" cols="12">
          <QRComponent :url="qrcode.qrid" :size="250" />
        </v-col>
      </v-row>
      <v-btn color="red" class="white--text mt-8" block @click="doLogout">
        Logout
      </v-btn>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
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
import PersonalDataBanner from '~/components/visitor-menu/PersonalDataBanner.vue';
import { UserData, Qrcode } from '~/api/types';

@Component({
  components: {
    SignedInAs,
    BalanceComponent,
    SubmenuComponent,
    QRComponent,
    PersonalDataBanner
  }
})

class VisitorIndexPage extends Vue{
  isUserLoaded : Boolean = false;
  isQRLoaded : Boolean = false;
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;

  @Action('user/fetchQRID') fetchQRIDAction;
  @Getter('user/getQRID') qrcode!: Qrcode;

  @Action("auth/logout") logoutAction;

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

  doLogout() {
    this.logoutAction();
    this.$router.push('/');
  }
}

export default VisitorIndexPage;
</script>
