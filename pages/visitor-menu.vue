<template>
  <v-content>
    <v-container>
      <v-row no-gutters class="py-4">
        <v-col cols="12">
          <SignedInAs />
        </v-col>
        <v-col cols="12" class="py-2">
          <PersonalDataBanner message="Fill in your peronal data to earn 20 points for FREE!" />
        </v-col>
        <v-col cols="12" class="py-2">
          <BalanceComponent />
        </v-col>
        <v-col cols="4">
          <SubmenuComponent />
        </v-col>
        <v-col cols="4">
          <SubmenuComponent />
        </v-col>
        <v-col cols="4">
          <SubmenuComponent />
        </v-col>
        <v-col cols="12">
          Feedback
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
import PersonalDataBanner from '~/components/visitor-menu/PersonalDataBanner.vue';
import BalanceComponent from '~/components/visitor-menu/BalanceComponent.vue';
import SubmenuComponent from '~/components/visitor-menu/SubmenuComponent.vue';

export default Vue.extend({
  name: 'VisitorMenu',
  components: {
    SignedInAs,
    PersonalDataBanner,
    BalanceComponent,
    SubmenuComponent
  }
});
</script>
