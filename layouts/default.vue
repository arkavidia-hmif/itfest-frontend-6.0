<template>
  <v-app>
    <TransactionSocketListener />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
  import TransactionSocketListener from '~/components/socket/TransactionSocketListener.vue';

  export default {
    components: { TransactionSocketListener }
  };
</script>
