<template>
  <v-content class="ma-4">
    <v-btn
      :href="href"
      fluid
      width="100%"
      x-large
      raised
      class="px-8 py-10"
      style="color: #3F32D5"
    >
      <v-icon left x-large class="mr-6">
        {{ icon }}
      </v-icon>
      {{ label }}
    </v-btn>
  </v-content>
</template>

<script>
export default {
  name: 'HomeButton',
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
  .v-btn {
    justify-content: end;
    padding: 3rem;
  }
</style>
