<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="py-5" cols="10">
      <v-form>
        <div class="my-4">
          <div class="form-label">
            Using points from
          </div>
          <div style="font-weight: 800; font-size: 1.5em; margin-right: 0.5rem; color: #FF0B51;">
            88791
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Merchandise
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-select :items="items" full-width label="Item" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            From
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-select :items="tenants" full-width label="Tenant" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Amount
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-select :items="amounts" full-width label="Amount" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Total price
          </div>
          <v-row class="ml-2">
            <div style="font-weight: 800; font-size: 3em; margin-right: 0.5rem; color: #3F32D5; display: flex; align-items: center;">
              20
            </div>
            <div style="font-weight: 800; font-size: 1.5em; display: flex; align-items: center;">
              points
            </div>
          </v-row>
        </div>
      </v-form>
    </v-col>
    <v-col class="d-flex justify-center" cols="10">
      <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%">
        Redeem Points
      </v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

  .full-width {
    width: 100%;
  }

</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    tenants: ['Company A', 'Company B', 'Company C'],
    amounts: [1, 2, 3, 4]
  })
});
</script>
