<template>
  <v-form v-model="isValid" @submit.prevent="attemptLogin">
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
    <h4 class="mt-4">
      Disclaimer
    </h4>
    <p class="mt-3">
      All personal data that you have input could be used by startup tenats to carry out product promotions and disseminate information related to recruitment.
    </p>
    <v-checkbox v-model="agreeTOA" label="I agree to the statement above." hide-details color="#3F32D5" />
    <Alert v-if="error" type="error" class="mt-4" :message="error" />
    <div class="d-flex justify-center py-4">
      <v-btn
        type="submit"
        :loading="isLoggingIn"
        :disabled="!isValid"
        :color="agreeTOA? `#FF084F` : ``"
        :class="(agreeTOA? `white--text` : ``)+` text-none`"
        x-large
        block
      >
        Register!
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Action, Vue } from 'nuxt-property-decorator';
import Alert from '~/components/partials/Alert.vue';
import { ApiError } from '~/api/base';
import { LoginStatus } from '~/api/types';

@Component({
  components: { Alert }
})
class VisitorRegisterForm extends Vue {
  isLoggingIn: boolean = false;
  isValid: boolean = false;
  voucherCode: string = '';
  emailAddress: string = '';
  password: string = '';
  rePassword: string = '';
  agreeTOA: boolean = false;
  error: string = '';
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
  rePasswordRules = [
    v => !!v || 'Password confirmation is required!',
  ];

  get passwordsFilled(): boolean {
    return (this.password !== '' && this.rePassword !== '');
  }

  @Action('auth/visitorRegister') registerAction;

  attemptLogin() {
    if (!this.isValid) {
      return;
    }

    // Init Visitor Account
    const email = this.emailAddress;
    const voucher = this.voucherCode.toLowerCase();
    const password = this.password;

    // Set action after submitting form
    this.isLoggingIn = true;

    this.registerAction({email, voucher, password})
      .then(() => {
        this.$router.push('/visitor/menu');
      })
      .catch((e) => {
        if (e instanceof ApiError) {
          if (e.errorCode === LoginStatus.NO_USER) {
            this.error = 'User belum terdaftar';
            return;
          }

          this.error = 'Silakan periksa kembali kode voucher yang Anda masukkan.';
          return;
        }

        this.error = e.toString();
      })
      .finally(() => {
        this.isLoggingIn = false;
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

export default VisitorRegisterForm;

</script>
