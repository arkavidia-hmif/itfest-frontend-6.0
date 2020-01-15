<template>
  <v-content>
    <v-container fluid fill-height>
      <v-row>
        <v-col cols="12">
          <div class="form-title">
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
            <v-label>
              Gender
            </v-label>
            <v-radio-group v-model="gender" row>
              <v-radio label="Male" color="#3F32D5" />
              <v-radio label="Female" color="#3F32D5" />
            </v-radio-group>
            <v-label>
              Interests
            </v-label>
            <v-checkbox v-model="interests" label="Financial Technology" hide-details />
            <v-checkbox v-model="interests" label="Education Technology" hide-details />
            <v-checkbox v-model="interests" label="Health Technology" hide-details />
            <v-checkbox v-model="interests" label="E-commerce" hide-details />
            <v-checkbox v-model="interests" label="Tourism" hide-details />
            <div class="d-flex">
              <v-checkbox v-model="interestOther" label="Others : " hide-details />
              <v-text-field :disabled="!interestOther" />
            </div>
            <v-label>
              Disclaimer
            </v-label>
            <p>Personal data that you have input could be used by startup tenats to carry out product promotions and disseminate information related to recruitment.</p>
            <v-checkbox v-model="agreeTOA" label="I agree to the statement above." hide-details />
            <v-btn :disabled="!agreeTOA">
              Register!
            </v-btn>
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
});
</script>
