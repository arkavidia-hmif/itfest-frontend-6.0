<template>
  <v-row no-gutters style="margin-top: 16px;">
    <v-container
      v-for="(item, i) in lists"
      :key="i"
      fluid
      class="listbox"
      ma-2
      pa-5
    >
      <v-row>
        <div style="font-weight: 800; margin-right: 0.5rem">
          Startup:
        </div>
        <div style="font-weight: 800; color: #FF0B51;">
          {{ item.company }}
        </div>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-row>
            <div style="margin-right: 0.5rem">
              Name:
            </div>
            <div style="color: #3F32D5;">
              {{ item.product }}
            </div>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <div style="margin-right: 0.5rem">
              Price:
            </div>
            <div style="color: #3F32D5;">
              {{ item.point }} points
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <div style="margin-right: 0.5rem">
          Stock:
        </div>
        <div style="color: #3F32D5;">
          {{ item.stock }}
        </div>
      </v-row>
    </v-container>
  </v-row>
</template>

<style lang="scss" scoped>
  .listbox {
    background-color: #e2e0e0;
  }
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    lists: [
      {
        'company': 'Amartha',
        'product': 'Pulpen (X2)',
        'point': 10,
        'stock': 700
      },
      {
        'company': 'Jenius',
        'product': 'Pulpen (X2)',
        'point': 10,
        'stock': 700
      }
    ]
  })
});
</script>
