<template>
  <div class="mt-4">
    <template v-for="(item, i) in items">
      <RedeemHistoryItem :key="i" :visitor-id="item.visitorId" :points="item.points" time="" class="my-2" />
    </template>
    <div v-if="isLoading" class="pa-4" align="center">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </div>
</template>
<script lang="ts">
    import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
    import { Transaction } from "../../api/types";
    import RedeemHistoryItem from './RedeemHistoryItem.vue';

    @Component({
        components: { RedeemHistoryItem }
    })
    class RedeemHistory extends Vue {
        isLoading: boolean = false;
        @Action('user/fetchTransactions') fetchTransactionAction;
        @Getter('user/getTransactions') transactions!: Transaction[];

        mounted() {
            this.isLoading = true;
            this.fetchTransactionAction()
                .finally(() => {
                    this.isLoading = false;
                    console.log(this.transactions);
                    console.log(this.items);
                });
        }

        get items() {
            return this.transactions.map(transaction => {
                return {
                    visitorId: transaction.to.name,
                    points: transaction.amount
                };
            });
        }
    }

    export default RedeemHistory;

</script>


<style scoped>

</style>
