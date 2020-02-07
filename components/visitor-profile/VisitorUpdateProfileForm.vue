<template>
  <v-form ref="form" v-model="isValid" @submit.prevent="attemptUpdateProfile">
    <v-text-field
      v-model="fullName"
      :rules="nameRules"
      label="Full name"
      required
    />
    <v-text-field
      v-model="emailAddress"
      :rules="emailRules"
      label="Email"
      disabled
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
      <v-radio value="Male" label="Male" color="#3F32D5" />
      <v-radio value="Female" label="Female" color="#3F32D5" />
    </v-radio-group>
    <h4 class="mt-4">
      Interests
    </h4>
    <v-checkbox
      v-for="label of interestsName"
      :key="label"
      v-model="interests"
      :label="label"
      :value="label"
      hide-details
      class="mt-2"
      color="#3F32D5"
    />
    <div class="d-flex">
      <v-checkbox v-model="interestOther" label="Others : " hide-details class="mt-2" color="#3F32D5" />
      <v-text-field
        v-model="interestOtherValue"
        :disabled="!interestOther"
        class="px-2 py-0"
        hide-details
        single-line
      />
    </div>
    <div class="d-flex justify-center py-4">
      <v-btn
        type="submit"
        :loading="isUpdating"
        :disabled="!isValid"
        x-large
        block
      >
        Update Profile
      </v-btn>
    </div>

    <MessageDialog
      ref="messageDialog"
      title="Profile Updated"
      @dismissed="$router.push('/visitor/')"
    />
    <MessageDialog
      ref="errorDialog"
    >
      <template slot="title" class="red--text">
        <v-card-title class="headline red--text">
          Failed to Update
        </v-card-title>
      </template>
      <v-card-text>
        {{ error }}
      </v-card-text>
    </MessageDialog>
  </v-form>
</template>

<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { Gender } from '~/api/types.ts';
import Alert from '~/components/partials/Alert.vue';
import MessageDialog from "~/components/MessageDialog.vue";
import { UserData } from '~/api/types';

@Component({
  components: { Alert, MessageDialog }
})
class VisitorUpdateProfileForm extends Vue {
  isUpdating: boolean = false;
  isValid: boolean = false;
  isBonusAcquired: boolean = false;
  isAllDataFilled: boolean = false;
  fullName: string = '';
  emailAddress: string = '';
  gender: string = 'Male';
  date: string = new Date().toISOString().substr(0, 10);
  rawInterests: string[] = [];
  interests: string[] = [];
  interestOther: boolean = false;
  interestOtherValue: string = '';
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
    v => !!v || 'Full name is required!',
    v => /^([A-Za-z' ]*)$/.test(v) || 'Must be a valid name.'
  ];
  emailRules = [
    v => !!v || 'Email is required!',
    v => /.+@.+/.test(v) || 'Must be a valid email address.'
  ];

  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;
  @Action('user/updateProfile') updateProfileAction;

  mounted() {
    this.fetchUserAction()
        .finally(()=>{
          if (this.user) {
              if (this.user.name) {
                const regex = /.+@.+/ig;
                const matches = regex.exec(this.user.name);
                if (matches) {
                  this.fullName = '';
                }
                else {
                  this.fullName = this.user.name;
                }
              }
              if (this.user.email) {
                this.emailAddress = this.user.email;
              }
              if (this.user.dob) {
                this.date = new Date(this.user.dob).toISOString().substr(0, 10);
              }
              if (this.user.gender) {
                this.gender = (this.user.gender===1?"Male":"Female");
              }
              if (this.user.interest) {
                if (this.user.interest.length > 0) {
                  this.rawInterests = this.user.interest;
                  for (const rawInterest of this.rawInterests) {
                      if (this.interestsName.includes(rawInterest)) {
                          this.interests.push(rawInterest);
                      }
                      else {
                          this.interestOther = true;
                          this.interestOtherValue = rawInterest;
                      }
                  }
                }
              }
          }
        });
  }

  attemptUpdateProfile() {
    if (!this.isValid) {
      return;
    }

    // Init Visitor Account
    const genderEnum : Gender = (this.gender==="Male"?1:2);

    const name = this.fullName;
    const email = this.emailAddress;
    const dob = this.date;
    const gender = genderEnum;
    const interest = this.interests.slice();
    if (this.interestOther) {
      interest.push(this.interestOtherValue);
    }
    if (interest.length <= 0) {
        this.error = "You must specify at least 1 interest";
        (this.$refs.errorDialog as Vue & { show: () => boolean }).show();
        return;
    }
    else if (interest[interest.length - 1] === "") {
        this.error = "You must specify other interest option";
        (this.$refs.errorDialog as Vue & { show: () => boolean }).show();
        return;     
    }
    // Set action after submitting form
    this.isUpdating = true;

    this.updateProfileAction({name, email, dob, gender, interest})
      .then(() => {
        (this.$refs.messageDialog as Vue & { show: () => boolean }).show();
      })
      .catch((e) => {
        this.error = e.toString();
        (this.$refs.errorDialog as Vue & { show: () => boolean }).show();
      })
      .finally(() => {
        this.isUpdating = false;
      });
  }
}

export default VisitorUpdateProfileForm;

</script>
