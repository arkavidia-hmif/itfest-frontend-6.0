<template>
  <div class="mt-4">
    <div v-if="items.length === 0" class="d-flex flex-column align-center justify-center no-transaction-container" style="height:90vh">
      <div>
        No transaction yet..
      </div>
      <div>
        <i>Visit our tenants and play the games!</i>
      </div>
    </div>
    <template v-for="(item, i) in items">
      <VisitorTrxHistoryItem
        :key="i"
        :from="item.from"
        :to="item.to"
        :points="item.points"
        :time="item.time"
        class="my-2"
      />
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
import VisitorTrxHistoryItem from './VisitorTrxHistoryItem.vue';

@Component({
  components: { VisitorTrxHistoryItem }
})
class VisitorTrxHistory extends Vue {
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
        from: transaction.from.name || `#${transaction.from.id}`,
        to: transaction.to.name || `#${transaction.to.id}`,
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

export default VisitorTrxHistory;

</script>


<style scoped>

</style>
