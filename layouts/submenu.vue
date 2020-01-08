<template>
  <v-app>
    <v-container class="pa-0" fluid>
      <v-row>
        <v-col class="back-header" cols="12">
          <v-row>
            <v-col class="text-center" cols="3">
              <v-icon color="#000">
                mdi-arrow-left
              </v-icon>
            </v-col>
            <v-col>
              Title
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
.back-header{
  background-color:white;
  color: #000;
  font-family: 'Raleway', sans-serif;
}
</style>

<script>
export default {}
</script>
