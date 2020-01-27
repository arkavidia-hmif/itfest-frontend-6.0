<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="py-5" cols="10">
      <v-form>
        <div class="my-4">
          <div class="form-label">
            Merchandise
          </div>
          <div class="d-flex align-center">
            <div class="px-2">
              <v-select :items="items" full-width label="Item" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            From
          </div>
          <div class="d-flex align-center">
            <div class="px-2">
              <v-select :items="tenants" full-width label="Tenant" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Price
          </div>
          <div class="d-flex align-center">
            <div class="px-2">
              <v-text-field full-width suffix="points" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Amount
          </div>
          <div class="d-flex align-center">
            <v-row class="px-2">
              <v-text-field full-width :v-model="inputedAmount" type="number" suffix="pcs" />
            </v-row>
          </div>
        </div>
      </v-form>
    </v-col>
    <v-col class="d-flex justify-center" cols="10">
      <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%">
        Update Merch Stock
      </v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    inputedAmount: 0,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    tenants: ['Company A', 'Company B', 'Company C']
  })
});
</script>
