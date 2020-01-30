<template>
  <div>
    <BackToolbar title-text="Points History" back-to="/visitor/menu" />
    <v-content>
      <v-container v-if="isTransactionLoaded">
        <div v-if="transactionCount===0" class="d-flex flex-column align-center justify-center no-transaction-container" style="height:90vh">
          <div>
            No transaction yet..
          </div>
          <div>
            <i>Get <span>playing</span>! :)</i>
          </div>
        </div>
        <TransactionComponent
          v-for="i in transactionCount"
          :key="i"
          :received="i%2===0 ? true : false"
          class="my-4"
          :points-from="dummy[i-1].from.name"
          :points-to="dummy[i-1].to.name"
          :points-amount="dummy[i-1].amount"
          time="10:59"
        />
      </v-container>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Raleway', sans-serif;
}
.no-transaction-container {
  font-size:1.4em;
  span {
    font-weight: 600;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import TransactionComponent from '~/components/visitor-history/TransactionComponent.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';
import { Transaction, TransactionActor } from '~/api/types';
import { Component, Getter, Action } from 'nuxt-property-decorator';

@Component({
  components:{
    TransactionComponent,
    BackToolbar,
  }
})

class VisitorTransferPage extends Vue {
  isTransactionLoaded : Boolean = false;
  transactionCount : Number = 0;
  @Action('user/fetchTransactions') fetchTransactionAction;
  @Getter('user/getTransactions') transactions!: Transaction[];
  actor1 : TransactionActor = {
    id: 123,
    email: 'peter.parker@gmail.com',
    username: 'peter.parker',
    name: 'Peter Parker',
    role: 'visitor'
  };
  actor2 : TransactionActor = {
    id: 124,
    email: 'jimmy.parker@gmail.com',
    username: 'jimmy.parker',
    name: 'Jimmy Parker',
    role: 'visitor'
  };
  dummy : Transaction[] = [
    {
        id: 1,
        amount: 100,
        from: this.actor1,
        to: this.actor2,
        transfer: true
    },
    {
        id: 2,
        amount: 150,
        from: this.actor2,
        to: this.actor1,
        transfer: false
    },
  ]

  mounted() {
    this.fetchTransactionAction()
      .finally(() =>{
        this.isTransactionLoaded = true;
        this.transactionCount = this.dummy.length;
      })
  }
}

export default VisitorTransferPage;
</script>
