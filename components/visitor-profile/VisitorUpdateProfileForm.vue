<template>
  <v-form v-model="isValid" @submit.prevent="attemptUpdateProfile">
    <v-text-field
      v-model="fullName"
      :rules="nameRules"
      label="Full name"
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
      :value="interestsName[i-1]"
      hide-details
      class="mt-2"
      color="#3F32D5"
    />
    <div class="d-flex">
      <v-checkbox v-model="interestOther" label="Others : " hide-details class="mt-2" color="#3F32D5" />
      <v-text-field v-model="interestOtherValue" :disabled="!interestOther" class="px-2 py-0" hide-details single-line />
    </div>
    <h4 class="mt-4">
      Disclaimer
    </h4>
    <p class="mt-3">
      Personal data that you have input could be used by startup tenats to carry out product promotions and disseminate information related to recruitment.
    </p>
    <v-checkbox v-model="agreeTOA" label="I agree to the statement above." hide-details color="#3F32D5" />
    <Alert v-if="error" type="error" class="mt-4" :message="error" />
    <div class="d-flex justify-center py-4">
      <v-btn
        type="submit"
        :loading="isUpdating"
        :disabled="!isValid"
        :color="agreeTOA? `#FF084F` : ``"
        :class="(agreeTOA? `white--text` : ``)+` text-none`"
        x-large
        block
      >
        Update Profile
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { Gender, User } from '~/api/types.ts';
import Alert from '~/components/partials/Alert.vue';
import { ApiError } from '~/api/base';
import { LoginStatus } from '~/api/types';

@Component({
  components: { Alert }
})
class VisitorUpdateProfileForm extends Vue {
  isUpdating: boolean = false;
  isValid: boolean = false;
  isBonusAcquired: boolean = false;
  isAllDataFilled: boolean = false;
  fullName: string = '';
  emailAddress: string = '';
  password: string = '';
  rePassword: string = '';
  gender: string = '';
  date: string = new Date().toISOString().substr(0, 10);
  interests: string[] = [];
  interestOther: boolean = false;
  interestOtherValue: string = '';
  agreeTOA: boolean = false;
  modal: boolean = false;
  error: string = '';
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
  emailRules = [
    v => !!v || 'Email is required!',
    v => /.+@.+/.test(v) || 'Must be a valid email address.'
  ];
  passwordRules = [
    v => !!v || 'Password is required',
    v => (v && v.length >= 8) || 'Password must have 8+ characters.',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character.',
    v => /(?=.*\d)/.test(v) || 'Must have one number.',
    v => /([!@#$%^&*])/.test(v) || 'Must have one special character [!@#$%^&*].'
  ];
  rePasswordRules = [
    v => !!v || 'Password confirmation is required!',
  ];

  get passwordsFilled(): boolean {
    return (this.password !== '' && this.rePassword !== '');
  }

  @Getter('user/getVisitorData') user!: User;
  @Action('user/editVisitorProfile') updateProfileAction;

    attemptUpdateProfile() {
    if (!this.isValid) {
      return;
    }

    // Init Visitor Account
    const genderEnum : Gender = (this.gender==="Male"?1:2);

    const name = this.fullName;
    const email = this.emailAddress;
    const password = this.password;
    const dob = this.date;
    const gender = genderEnum;
    const interest = this.interests;
    if (!this.interestOtherValue) {
      interest.push(this.interestOtherValue);
    }

    // Set action after submitting form
    this.isUpdating = true;

    this.updateProfileAction({name, email, password, dob, gender, interest})
      .then(() => {
        this.$router.push('/visitor/edit-profile');
      })
      .catch((e) => {
        this.error = e.toString();
      })
      .finally(() => {
        this.isUpdating = false;
      });
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

export default VisitorUpdateProfileForm;

</script>
