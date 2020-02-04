<template>
  <v-app>
    <TransactionSocketListener />
    <v-container class="pa-0" style="max-width: 600px">
      <nuxt />
    </v-container>
  </v-app>
</template>

<script lang="ts">
  import TransactionSocketListener from '~/components/socket/TransactionSocketListener.vue';

  export default {
    components: { TransactionSocketListener }
  };
</script>
