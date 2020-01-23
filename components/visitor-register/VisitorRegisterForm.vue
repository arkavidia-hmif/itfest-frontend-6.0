<template>
  <v-form>
    <v-text-field
      :rules="nameRules"
      v-model="fullName"
      label="Full name"
    />
    <v-text-field
      :rules="emailRules"
      v-model="emailAddress"
      label="Email"
    />
    <v-text-field
      :rules="passwordRules"
      v-model="password"
      label="Password"
      type="password"
    />
    <v-text-field
      :rules="[() => passwordMatch() || 'Passwords do not match!']"
      v-model.lazy="rePassword"
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
          v-on="on"
          label="Day of Birth"
          append-icon="mdi-calendar"
          readonly
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
        <v-btn @click="$refs.dialog.save(date)" color="#FF0B51" class="white--text">
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
      :label="interestsName[i-1]"
      :value="`interest-`+(i-1).toString()"
      v-model="interests"
      hide-details
      class="mt-2"
    />
    <div class="d-flex">
      <v-checkbox v-model="interestOther" label="Others : " hide-details class="mt-2" />
      <v-text-field :disabled="!interestOther" class="px-2 py-0" hide-details single-line />
    </div>
    <h4 class="mt-4">
      Disclaimer
    </h4>
    <p class="mt-3">
      Personal data that you have input could be used by startup tenats to carry out product promotions and disseminate information related to recruitment.
    </p>
    <v-checkbox v-model="agreeTOA" label="I agree to the statement above." hide-details />
    <div class="d-flex justify-center py-4">
      <v-btn
        :disabled="!agreeTOA"
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
import Vue from 'vue';

export default Vue.extend({
  name: 'VisitorRegisterForm',
  data: () => ({
    fullName: '',
    emailAddress: '',
    password: '',
    rePassword: '',
    gender: '',
    date: new Date().toISOString().substr(0, 10),
    interests: [],
    interestOther: false,
    agreeTOA: false,
    modal: false,
    interestsName: [
      'Financial Technology',
      'Education Technology',
      'Health Technology',
      'E-commerce',
      'Tourism'
    ],
    nameRules: [
      v => !!v || 'Full name is required!'
    ],
    Rules: [
      v => !!v || 'Full name is required!'
    ],
    emailRules: [
      v => !!v || 'Email is required!',
      v => /.+@.+/.test(v) || 'Must be a valid email address.'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must have 8+ characters.',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character.',
      v => /(?=.*\d)/.test(v) || 'Must have one number.',
      v => /([!@#$%^&*])/.test(v) || 'Must have one special character [!@#$%^&*].'
    ]
  }),
  computed: {
    passwordsFilled() {
      return (this.password !== '' && this.rePassword !== '');
    },
  },
  methods: {
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
});
</script>
