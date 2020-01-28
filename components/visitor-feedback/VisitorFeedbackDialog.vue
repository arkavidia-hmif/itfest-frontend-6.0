<template>
  <v-card elevation="0">
    <div align="center" class="pa-4">
      <v-toolbar-title class="font-weight-bold">
        Yay, you've got points!
      </v-toolbar-title>
      <div class="mt-4">
        <b>{{ companyName }}</b> just awarded you {{ pointsAwarded }} points for playing their game.
      </div>
    </div>
    <v-divider />
    <div class="px-4 pt-4" align="center">
      <div class="subtitle grey--text text--darken-1">
        How challenging were the games?
      </div>
    </div>
    <div class="pa-2 d-flex flex-row align-center justify-center">
      <small class="grey--text">Easy</small>
      <v-rating
        v-model="rating"
        background-color="grey lighten-2"
        color="orange"
        large
        full-icon="mdi-star"
        empty-icon="mdi-star"
      />
      <small class="grey--text">Hard</small>
    </div>
    <v-divider />
    <div class="pa-4" align="center">
      <div class="subtitle grey--text text--darken-1">
        What's good about the stand?
      </div>
      <MultipleOptionPicker v-model="whatsGoodModel" :options="whatsGoodOptions" class="pt-2" multiple />
    </div>
    <v-divider />
    <div class="px-4 pt-4" align="center">
      <div class="subtitle grey--text text--darken-1">
        Anything else?
      </div>
      <v-textarea
        v-model="otherFeedback"
        class="mt-4"
        outlined
        name="input-7-4"
        placeholder="Write something"
      />
    </div>
    <v-row class="pa-4" no-gutters>
      <v-col :cols="6" class="pr-2">
        <v-btn outlined block @click="skip">
          Skip
        </v-btn>
      </v-col>
      <v-col :cols="6" class="pl-2">
        <v-btn elevation="0" block color="primary" @click="submit">
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import MultipleOptionPicker from './MultipleOptionPicker.vue';

  @Component({
    components: { MultipleOptionPicker }
  })
  class VisitorFeedbackDialog extends Vue {
    @Prop() companyName!: string;
    @Prop() whatsGoodOptions!: { [key: string]: string }[];
    @Prop() pointsAwarded!: number;

    rating: number = 0;
    whatsGoodModel: string[] = [];
    otherFeedback: string = '';

    skip() {
      this.$emit('skip');
      this.clear();
    }

    submit() {
      const submitData = {
        rating: this.rating,
        whatsGood: this.whatsGoodModel,
        otherFeedback: this.otherFeedback
      };

      this.$emit('submit', submitData);
      this.clear();
    }

    clear() {
      this.rating = 0;
      this.whatsGoodModel = [];
      this.otherFeedback = '';
    }
  }

  export default VisitorFeedbackDialog;
</script>

<style scoped>

</style>
