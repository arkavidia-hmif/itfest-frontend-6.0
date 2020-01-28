<template>
  <div>
    <BackToolbar title-text="Points History" back-to="/visitor/menu" />
    <v-content>
      <v-container>
        <TransactionComponent
          :key="i"
          :received="i%2===1 ? true : false"
          v-for="i in 10"
          class="my-4"
          points-from="388728"
          points-amount="12345"
          time="10:59"
        />
      </v-container>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
</style>

<script lang="ts">
import Vue from 'vue';
import TransactionComponent from '~/components/visitor-history/TransactionComponent.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';

export default Vue.extend({
  name: 'VisitorHistory',
  components: {
    TransactionComponent,
    BackToolbar
  }
});
</script>
