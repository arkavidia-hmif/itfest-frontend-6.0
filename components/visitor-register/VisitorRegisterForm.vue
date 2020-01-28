<template>
  <v-form v-model="isValid">
    <v-text-field
      v-model="fullName"
      :rules="nameRules"
      label="Full name"
    />
    <v-text-field
      v-model="voucherCode"
      :rules="voucherRules"
      label="Voucher Code"
    />
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
    <v-text-field
      v-model.lazy="rePassword"
      :rules="[() => passwordMatch() || 'Passwords do not match!']"
      label="Re-type Password"
      type="password"
    />
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="Day of Birth"
          append-icon="mdi-calendar"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        no-title
        scrollable
        show-current="false"
        color="#FF0B51"
      >
        <v-spacer />
        <v-btn color="#FF0B51" class="white--text" @click="$refs.dialog.save(date)">
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <h4 class="mt-4">
      Gender
    </h4>
    <v-radio-group v-model="gender" row class="mt-2" hide-details>
      <v-radio label="Male" color="#3F32D5" />
      <v-radio label="Female" color="#3F32D5" />
    </v-radio-group>
    <h4 class="mt-4">
      Interests
    </h4>
    <v-checkbox
      v-for="i in 5"
      :key="i"
      v-model="interests"
      :label="interestsName[i-1]"
      :value="`interest-`+(i-1).toString()"
      hide-details
      class="mt-2"
      color="#3F32D5"
    />
    <div class="d-flex">
      <v-checkbox v-model="interestOther" label="Others : " hide-details class="mt-2" color="#3F32D5" />
      <v-text-field :disabled="!interestOther" class="px-2 py-0" hide-details single-line />
    </div>
    <h4 class="mt-4">
      Disclaimer
    </h4>
    <p class="mt-3">
      Personal data that you have input could be used by startup tenats to carry out product promotions and disseminate information related to recruitment.
    </p>
    <v-checkbox v-model="agreeTOA" label="I agree to the statement above." hide-details color="#3F32D5" />
    <div class="d-flex justify-center py-4">
      <v-btn
        :disabled="!isValid"
        :color="agreeTOA? `#FF084F` : ``"
        :class="(agreeTOA? `white--text` : ``)+` text-none`"
        x-large
      >
        Register!
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: { }
})
class VisitorRegisterForm extends Vue {
  isValid: boolean = false;
  fullName: string = '';
  emailAddress: string = '';
  password: string = '';
  rePassword: string = '';
  gender: string = '';
  date: string = new Date().toISOString().substr(0, 10);
  interests: string[] = [];
  interestOther: boolean = false;
  agreeTOA: boolean = false;
  modal: boolean = false;
  interestsName: string[] = [
    'Financial Technology',
    'Education Technology',
    'Health Technology',
    'E-commerce',
    'Tourism'
    ];
  nameRules = [
    v => !!v || 'Full name is required!'
  ];
  Rules = [
    v => !!v || 'Full name is required!'
  ];
  emailRules = [
    v => !!v || 'Email is required!',
    v => /.+@.+/.test(v) || 'Must be a valid email address.'
  ];
  voucherRules = [
    v => !!v || 'Voucher code is required!',
  ];
  passwordRules = [
    v => !!v || 'Password is required',
    v => (v && v.length >= 8) || 'Password must have 8+ characters.',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character.',
    v => /(?=.*\d)/.test(v) || 'Must have one number.',
    v => /([!@#$%^&*])/.test(v) || 'Must have one special character [!@#$%^&*].'
  ];

  get passwordsFilled(): boolean {
    return (this.password !== '' && this.rePassword !== '');
  }

  passwordMatch() {
    let samePassword = false;
    if (this.passwordsFilled) {
      if (this.password === this.rePassword) {
        samePassword = true;
      }
    }
    return samePassword;
  }
}

export default VisitorRegisterForm;

</script>
