<template>
  <div>
    <BackToolbar title-text="Points History" back-to="/visitor/" />
    <v-content>
      <v-container v-if="isTransactionLoaded && isUserLoaded">
        {{ dummy }}
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
          :received="dummy.transactions[i-1].to.name===user.name?true:false"
          :type="dummy.transactions[i-1].type"
          :from-type="dummy.transactions[i-1].from.role"
          :points-from="dummy.transactions[i-1].from.name"
          :to-type="dummy.transactions[i-1].to.role"
          :points-to="dummy.transactions[i-1].to.name"
          :points-amount="dummy.transactions[i-1].amount"
          :time="dummy.transactions[i-1].createdAt.substring(11,16)"
          class="my-2"
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
import { Component, Getter, Action } from 'nuxt-property-decorator';
import TransactionComponent from '~/components/visitor-history/TransactionComponent.vue';
import BackToolbar from '~/components/partials/BackToolbar.vue';
<<<<<<< HEAD
import { Transaction, TransactionActor } from '~/api/types';
=======
import { Transaction, TransactionActor, TransactionPagination, UserData } from '~/api/types';
import { Component, Getter, Action } from 'nuxt-property-decorator';
>>>>>>> r/history-redesign

@Component({
  components: {
    TransactionComponent,
    BackToolbar,
  }
})

class VisitorTransferPage extends Vue {
  isUserLoaded : Boolean = false;
  isTransactionLoaded : Boolean = false;
  transactionCount : Number = 0;
  @Action('user/fetchTransactions') fetchTransactionAction;
  @Getter('user/getTransactions') transactions!: TransactionPagination;
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;

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
  actor3 : TransactionActor = {
    id: 125,
    email: 'jimmy2.parker@gmail.com',
    username: 'jimmy2.parker',
    name: 'Admin Parker',
    role: 'admin'
  };
  actor4 : TransactionActor = {
    id: 126,
    email: 'jimmy3.parker@gmail.com',
    username: 'jimmy3.parker',
    name: 'Tenant Parker',
    role: 'tenant'
  };
  dummy : TransactionPagination = {
    transactions: [
        {
          id: 1,
          createdAt: "2020-01-31T00:14:49.370Z",
          amount: 123,
          type: "give",
          from: this.actor1,
          to: this.actor2,
        },
        {
          id: 2,
          createdAt: "2020-01-28T11:31:31.642Z",
          amount: 150,
          type: "give",
          from: this.actor2,
          to: this.actor1,
        },
        {
          id: 3,
          createdAt: "2020-01-28T11:31:31.642Z",
          amount: 150,
          type: "redeem",
          from: this.actor3,
          to: this.actor1,
        },
        {
          id: 4,
          createdAt: "2020-01-28T11:31:31.642Z",
          amount: 150,
          type: "play",
          from: this.actor4,
          to: this.actor1,
        },
    ],
    page: 1,
    itemPerPage: 1,
    total: 4
  }
  

  mounted() {
    this.fetchTransactionAction()
      .finally(() =>{
        this.isTransactionLoaded = true;
<<<<<<< HEAD
        this.transactionCount = this.dummy.length;
      });
=======
        this.transactionCount = this.dummy.transactions.length;
      })
    this.fetchUserAction()
      .finally(() =>{
        this.isUserLoaded = true;
      })
>>>>>>> r/history-redesign
  }
}

export default VisitorTransferPage;
</script>
