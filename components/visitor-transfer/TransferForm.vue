<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col class="py-5" cols="10">
      <v-form>
        <div class="my-4">
          <div class="form-label">
            You're giving..
          </div>
          <div class="d-flex align-center">
            <div class="px-2 transfer-input">
              <v-text-field full-width suffix="points" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Account destination
          </div>
          <div class="account-number">
            887964
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Points left after giving
          </div>
          <div class="points-balance">
            350
          </div>
        </div>
      </v-form>
    </v-col>
    <v-col class="d-flex justify-center" cols="10">
      <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%">
        Give Points!
      </v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.account-number {
  position: relative;
  bottom: 7.5px;
  font-size:2em;
  font-weight:600;
  color:#FF0B51;
}
.points-balance {
  position: relative;
  bottom: 15px;
  font-size:4em;
  font-weight:600;
  color:#3F32D5;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>
