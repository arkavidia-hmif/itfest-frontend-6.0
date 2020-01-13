<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar height="86" class="px-4">
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>
          Title
        </v-toolbar-title>
      </v-toolbar>
    </v-col>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-col class="pa-5" cols="10">
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
        </v-col>
        <v-col class="d-flex justify-center" cols="10">
          <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%">
            Give Points!
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

.account-number {
  font-size:2em;
  font-weight:600;
  color:#FF0B51;
}
.points-balance {
  font-size:4em;
  font-weight:600;
  color:#3F32D5;
}
</style>

<style scoped>
::v-deep .v-text-field__slot > input{
  color:#FF0B51;
  font-size:1.2em;
  font-weight:600;
}
</style>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'submenu',
  name: 'VisitorTransfer'
})
</script>
