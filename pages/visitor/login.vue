<template>
  <v-content>
    <v-container fluid fill-height>
      <v-row no-gutters class="pa-4">
        <v-col cols="12">
          <div class="form-title my-4 mb-8">
            <h1>
              Login ke Dashboard
            </h1>
          </div>
        </v-col>
        <v-col cols="12">
          <VisitorLoginForm />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
.form-title::after {
    content: "";
    position: absolute;
    width:150px;
    left:10;
    border-bottom:6px solid #FF084F;
}
</style>

<script lang="ts">
import Vue from 'vue';
import VisitorLoginForm from '~/components/visitor-login/VisitorLoginForm.vue';

export default Vue.extend({
  name: 'VisitorRegister',
  components: {
    VisitorLoginForm
  }
});
</script>
