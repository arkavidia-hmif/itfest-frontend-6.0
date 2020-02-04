<template>
  <v-content class="ma-4">
    <v-btn
      :to="href"
      width="100%"
      x-large
      raised
      style="color: #3F32D5"
      @click="$emit('click')"
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
      required: false,
      default: ''
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
