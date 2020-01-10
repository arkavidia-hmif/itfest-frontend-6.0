<template>
  <v-container fluid>
    <v-row style="background-color:white" class="px-2">
      <v-col :cols="12" class="black--text title pb-12" style="background-color:white">
        Signed in as <b style="color:red"> {{ company.name }} </b>
      </v-col>
      <v-col :cols="12">
        <v-card elevation="8" color="white">
          <v-row>
            <v-col :cols="6">
              <v-card-text class="subtitle-1 font-weight-medium mt-1 black--text" style="text-align: left">
                Remaining Points:
              </v-card-text>
            </v-col>
            <v-col :cols="6">
              <v-card-text class="display-2 font-weight-black" style="text-align: right;color:blue">
                {{ company.point }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card elevation="8" color="white">
          <v-row>
            <v-col>
              <v-card-text class="headline font-weight-bold" style="color:blue">
                <v-row>
                  <div class="ml-4 mt-1">
                    <i class="mdi mdi-48px mdi-hand-heart" />
                  </div>
                  <div class="ml-4 mt-3">
                    Give Points
                  </div>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card elevation="8" color="white">
          <v-row>
            <v-col>
              <v-card-text class="headline font-weight-bold" style="color:blue">
                <v-row>
                  <div class="ml-4 mt-1">
                    <i class="mdi mdi-history mdi-48px" />
                  </div>
                  <div class="ml-4 mt-1">
                    Transaction History
                  </div>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      company: {
        name: 'NamaCompany',
        point: 5000
      }
    }
  }
}
</script>
