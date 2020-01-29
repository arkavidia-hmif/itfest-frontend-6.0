<template>
  <v-form v-model="isValid">
    <v-text-field
      v-model="emailAddress"
      :rules="emailRules"
      label="Email"
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
    />
    <v-btn
      color="#FF084F"
      class="white--text my-12"
      x-large
      block
    >
      Login!
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: { }
})
class VisitorRegisterForm extends Vue {
  isValid: boolean = false;
  emailAddress: string = '';
  password: string = '';
  emailRules = [
    v => !!v || 'Email is required!',
    v => /.+@.+/.test(v) || 'Must be a valid email address.'
  ];
  passwordRules = [
    v => !!v || 'Password is required',
  ];
}

export default VisitorRegisterForm;

</script>
