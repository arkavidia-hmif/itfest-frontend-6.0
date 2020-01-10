<template>
  <v-app>
    <v-container class="pa-0" fluid>
      <v-row>
        <v-col class="back-header pa-0" cols="12">
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
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style lang="scss">
* {
  font-family: 'Raleway', sans-serif;
  color: #000;
}
</style>

<style lang="scss" scoped>
.back-header{
  background-color:white;
  font-weight: 600;
  font-size: 1.2em;
}
</style>

<script>
export default {}
</script>
