<template>
  <v-row no-gutters style="margin-top: 16px;">
    {{ inventory }}
    <v-container
      v-for="(item, i) in inventory"
      :key="i"
      fluid
      class="listbox"
      ma-2
      pa-5
    >
      <v-row>
        <v-col cols="6">
          <v-row>
            <div style="margin-right: 0.5rem">
              Name:
            </div>
            <div style="color: #3F32D5;">
              {{ item.item.name }}
            </div>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <div style="margin-right: 0.5rem">
              Price:
            </div>
            <div style="color: #3F32D5;">
              {{ item.item.price }} points
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <div style="margin-right: 0.5rem">
          Stock:
        </div>
        <div style="color: #3F32D5;">
          {{ item.qty }}
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
import {Action} from "~/node_modules/vuex-class";
import {InventoryData} from "~/api/types";

// export default Vue.extend({
//   data: () => ({
//     lists: [
//       {
//         'company': 'Amartha',
//         'product': 'Pulpen (X2)',
//         'point': 10,
//         'stock': 700
//       },
//       {
//         'company': 'Jenius',
//         'product': 'Pulpen (X2)',
//         'point': 10,
//         'stock': 700
//       }
//     ]
//   })
// });

  export default class ListStocks extends Vue {
      @Action('stock/fetchInventory') fetchInventoryAction;

      inventory: InventoryData[] = [];

      mounted(): void {
          this.fetchInventoryAction()
              .then((inventory) => {
                this.inventory = inventory;
              });
      }
  }
</script>
