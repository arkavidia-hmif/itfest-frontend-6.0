<template>
  <v-content>
    <v-container fluid fill-height>
      <v-row no-gutters class="pa-4">
        <v-col cols="12">
          <div class="form-title my-4 mb-8">
            <h1>
              Registration time!
            </h1>
          </div>
        </v-col>
        <v-col cols="12">
          <v-form>
            <v-text-field
              v-model="fullName"
              label="Full name"
            />
            <v-text-field
              v-model="emailAddress"
              label="Email"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            />
            <v-text-field
              v-model="rePassword"
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

export default Vue.extend({
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
    ]
  })
});
</script>
