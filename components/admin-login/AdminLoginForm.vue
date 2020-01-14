<template>
  <v-form class="px-4 justify-center">
    <v-text-field label="Email Address" type="text" />
    <v-text-field label="Password" type="password" />
    <div class="text-center">
      <v-btn color="success" class="mt-4 px-12 py-2 text-none" rounded>
        {{ buttonText }}
      </v-btn>
      <v-list-item v-if="showRegisterButton">
        <v-list-item-content>
          <v-list-item-subtitle>
            Not registered yet? <a href="#">Register here.</a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-form>
</template>

<style lang="scss" scoped>

</style>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminLoginForm',
  props: {
    buttonText: {
      default: 'something',
      type: String
    },
    showRegisterButton: {
      default: true,
      type: Boolean
    }
  }
});
</script>
