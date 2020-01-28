<template>
  <v-container fluid fill-height>
    <v-row style="background-color:white">
      <v-col :cols="12" class="pa-5">
        <div class="headline">
          Which difficulties did the visitor played?
          <v-checkbox
            @click.native="pointChange"
            v-model="selected"
            class="black--checkbox"
            label="Easy"
            value="Easy"
          />
          <v-checkbox
            @click.native="pointChange"
            v-model="selected"
            class="black--checkbox"
            label="Medium"
            value="Medium"
          />
          <v-checkbox
            @click.native="pointChange"
            v-model="selected"
            class="black--checkbox"
            label="Hard"
            value="Hard"
          />
        </div>
      </v-col>
      <v-col :cols="12" class="pa-5" style="color:black">
        <div class="headline">
          You're giving
        </div>
        <div class="display-1 mt-5">
          <b style="color:#4854D6"> {{ pointTemp }} </b> points
        </div>
      </v-col>
      <v-col :cols="12" class="pa-5" style="color:black">
        <div class="headline">
          Account destination
        </div>
        <div class="display-1 mt-5">
          <b style="color:#E4491C"> {{ accountTemp }} </b>
        </div>
      </v-col>
      <v-col :cols="12" class="pa-5" style="color:black">
        <div class="headline">
          Remaining points after giving
        </div>
        <div class="display-1 mt-5 font-weight-bold">
          <b class="display-2 font-weight-black" style="color:#4854D6"> {{ remainingPoint }} </b> points
        </div>
      </v-col>
      <v-col :cols="12" class="pa-5">
        <v-row justify="center">
          <v-btn color="#4854D6" style="text-transform: none;color: white">
            Give Point
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  layout: 'submenu',
  name: 'TransactionsHistory',
  data () {
    return {
      selected: [],
      pointTemp: 0,
      accountTemp: 123123,
      remainingPoint: 4900
    }
  },
  methods: {
    pointChange () {
      let x = 0
      if (this.selected.includes('Easy')) {
        x += 25
      }
      if (this.selected.includes('Medium')) {
        x += 50
      }
      if (this.selected.includes('Hard')) {
        x += 75
      }
      this.pointTemp = x
    }
  }
})
</script>
<style scoped>
  .black--checkbox /deep/ label {
    color: black;
    font-size: 24px;
  }
</style>
