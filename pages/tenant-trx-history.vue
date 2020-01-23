<template>
  <div>
    <v-toolbar>
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Transaction History</v-toolbar-title>

      <v-spacer />
    </v-toolbar>
    <div class="mt-4">
      <template v-for="(item, i) in items">
        <TenantTrxHistoryItem :key="i" :visitor-id="item.visitorId" :points="item.points" :time="item.time" class="my-2" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TenantTrxHistoryItem from '../components/TenantTrxHistoryItem.vue'

export default Vue.extend({
  name: 'TenantTrxHistory',
  components: { TenantTrxHistoryItem },
  props: {},
  data () {
    return {
      items: [
        { visitorId: '321793', points: 50, time: '11:30' },
        { visitorId: '321871', points: 50, time: '11:39' },
        { visitorId: '688456', points: 150, time: '12:12' }
      ]
    }
  }
})
</script>

<style scoped>

</style>
