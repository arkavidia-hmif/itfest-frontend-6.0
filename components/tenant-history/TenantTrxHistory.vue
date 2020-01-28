<template>
  <div class="mt-4">
    <template v-for="(item, i) in items">
      <TenantTrxHistoryItem :key="i" :visitor-id="item.visitorId" :points="item.points" time="" class="my-2" />
    </template>
    <div v-if="isLoading" class="pa-4" align="center">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { Transaction } from "../../api/types";
import TenantTrxHistoryItem from './TenantTrxHistoryItem.vue';

@Component({
  components: { TenantTrxHistoryItem }
})
class TenantTrxHistory extends Vue {
  isLoading: boolean = false;
  @Action('user/fetchTransactions') fetchTransactionAction;
  @Getter('user/getTransactions') transactions!: Transaction[];

  mounted() {
    this.isLoading = true;
    this.fetchTransactionAction()
      .finally(() => {
        this.isLoading = false;
      });
  }

  get items() {
    return this.transactions.map(transaction => {
      return {
        visitorId: transaction.toId,
        points: transaction.amount
      };
    });
  }
}

export default TenantTrxHistory;

</script>


<style scoped>

</style>
