<template>
  <v-row align="center" justify="center">
    <v-col class="pa-5" cols="10">
      <v-card>
        <v-list>
          <v-list-item>
            <v-form>
              <div class="d-flex align-center">
                <div class="px-2 transfer-input">
                  <v-text-field label="You're giving.." color="red" />
                </div>
                <div class="px-2">
                  points
                </div>
              </div>
              <div class="my-4">
                <div class="form-label">
                  Account destination
                </div>
                <div class="account-number">
                  882947
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
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col class="d-flex justify-center">
      <v-btn color="rgb(22, 26, 255)">
        Give Points!
      </v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.account-number {
  font-size:2em;
  font-weight:600;
  color:rgb(255, 22, 53);
}
.points-balance {
  font-size:4em;
  font-weight:600;
  color:rgb(22, 26, 255);
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'submenu',
  name: 'VisitorTransfer'
})
</script>
