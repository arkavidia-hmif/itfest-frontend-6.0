<template>
  <v-form class="justify-center">
    <v-text-field label="Username" type="text" outlined background-color="white" />
    <v-text-field label="Password" type="password" outlined background-color="white" />
    <div class="text-center">
      <v-btn class="mt-4 px-12 py-2" outlined>
        {{ buttonText }}
      </v-btn>
      <div class="subtitle-1 mt-4">
        <div v-if="showRegisterButton">
          Belum terdaftar? <a href="#">Daftar di sini.</a>
        </div>
        <div v-if="showForgotButton">
          Lupa password? <a href="#">Setel ulang di sini.</a>
        </div>
      </div>
    </div>
  </v-form>
</template>

<style lang="scss" scoped>
a {
  text-decoration:none;
}
</style>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'MerchantLoginForm',
  props: {
    buttonText: {
      default: 'something',
      type: String
    },
    showRegisterButton: {
      default: true,
      type: Boolean
    },
    showForgotButton: {
      default: true,
      type: Boolean
    }
  }
});
</script>
