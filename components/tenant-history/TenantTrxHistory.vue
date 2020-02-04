<template>
  <div class="mt-4">
    <template v-for="(item, i) in items">
      <TenantTrxHistoryItem :key="i" :visitor-id="item.visitorId" :points="item.points" :time="item.time" class="my-2" />
    </template>
    <div v-if="isLoading" class="pa-4" align="center">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <div v-else class="pa-4">
      <v-btn block outlined color="primary" @click="nextPage">
        Load More
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import moment from 'moment';

import { Transaction } from "../../api/types";
import TenantTrxHistoryItem from './TenantTrxHistoryItem.vue';

@Component({
  components: { TenantTrxHistoryItem }
})
class TenantTrxHistory extends Vue {
  isLoading: boolean = false;
  currentPage: number = 1;
  @Action('user/fetchTransactions') fetchTransactionAction;
  @Getter('user/getTransactions') transactions!: Transaction[];

  mounted() {
    this.isLoading = true;
    this.fetchTransactionAction({ page: this.currentPage })
      .finally(() => {
        this.isLoading = false;
      });
  }

  get items() {
    return this.transactions.map(transaction => {
      return {
        visitorId: transaction.to.name || `#${transaction.to.id}`,
        points: transaction.amount,
        time: moment(transaction.createdAt).format("HH:mm")
      };
    });
  }

  nextPage() {
    this.isLoading = true;
    this.fetchTransactionAction({ page: this.currentPage + 1 })
      .then(() => {
        this.currentPage++;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}

export default TenantTrxHistory;

</script>


<style scoped>

</style>
