<template>
  <div>
    <BackToolbar title-text="Update Profile" back-to="/visitor/" />
    <v-content>
      <v-row no-gutters class="pa-4">
        <v-col cols="12">
          <VisitorUpdateProfileForm />
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
  ::v-deep .v-text-field__slot > input{
    font-size:1.2em;
    font-weight:600;
  }
  ::v-deep .v-text-field__slot > .v-text-field__suffix{
    color: #545454;
    font-size:1.2em;
    font-weight:600;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import VisitorUpdateProfileForm from '~/components/visitor-profile/VisitorUpdateProfileForm.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';

export default Vue.extend({
  name: 'VisitorUpdateProfile',
  components: {
      BackToolbar,
      VisitorUpdateProfileForm
  }
});
</script>
