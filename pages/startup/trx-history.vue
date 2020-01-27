<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(history,index) in histories" :key="index" :cols="12" class="pa-5">
        <v-card class="pb-5" style="background-color: #EFEFEF">
          <v-row>
            <v-col :cols="8">
              <v-card-text class="headline font-weight-medium black--text pb-0" style="text-align: left">
                Visitor: <b style="color:red"> {{ history.visitor }} </b>
              </v-card-text>
            </v-col>
            <v-col :cols="3" class="title mt-5 mr-1" style="text-align:right">
              {{ history.time }}
            </v-col>
          </v-row>
          <v-card-text class="title font-weight-normal black--text py-0" style="text-align: left">
            Points given: <b style="color:blue"> {{ history.point }} </b>
          </v-card-text>
        </v-card>
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
      histories: [
        {
          visitor: '388728',
          point: 75,
          time: '12:59'
        },
        {
          visitor: '388728',
          point: 125,
          time: '12:59'
        },
        {
          visitor: '388728',
          point: 25,
          time: '12:59'
        }
      ]
    }
  }
})
</script>
