<template>
  <div align="left" no-gutters>
    <v-form v-if="redemptionTarget" class="pa-4">
      <v-alert v-model="message.visible" :type="message.type" :dismissible="true" class="mt-2">
        {{ message.text }}
      </v-alert>
      <div class="my-2">
        Using points from
        <b style="color: #FF0B51">{{ redemptionTarget.name }} </b>
      </div>
      <div class="my-4">
        <div class="form-label">
          From
        </div>
        <v-select
          v-model="selectedInventory"
          :items="inventories"
          return-object
          item-text="name"
          full-width
          label="Tenant"
          outlined
          class="mt-2"
        />
      </div>
      <div class="my-4">
        <div class="form-label">
          Merchandise
        </div>
        <v-select
          v-model="selectedItem"
          :items="selectedInventory.items"
          item-text="name"
          full-width
          label="Item"
          return-object
          outlined
          class="mt-2"
        >
          <template slot="selection" slot-scope="{ item }">
            <span>{{ item.name }}</span> <span style="margin-left: 0.5rem;">({{ item.price }} pts)</span>
          </template>
          <template slot="item" slot-scope="{ item }">
            <span>{{ item.name }}</span> <v-spacer /> <span class="float-right">{{ item.price }} pts</span>
          </template>
        </v-select>
      </div>
      <div class="my-4">
        <div class="form-label">
          Amount
        </div>
        <v-text-field
          v-model="amount"
          :rules="naturalNumber"
          full-width
          type="number"
          :suffix="'out of ' + selectedItem.qty + ' pcs'"
          step="1"
          min="1"
          :disabled="selectedItem.qty == 0"
          outlined
          class="mt-2"
        />
      </div>
      <div class="my-4">
        <div class="form-label">
          Total price
        </div>
        <div class="headline font-weight-bold" style="color: #3F32D5;">
          {{ isSelectionValid ? selectedItem.price * amount : '-' }} points
        </div>
      </div>
      <v-btn color="#4336D7" class="white--text text-none" block @click="validateRedeem">
        Redeem Points
      </v-btn>
    </v-form>
    <ConfirmationDialog
      ref="confirmDialog"
      title="Redeem merchadise?"
      confirm-text="Redeem"
      confirm-color="green darken-1"
      cancel-text="Cancel"
      cancel-color="red darken-1"
      @confirmed="redeem"
    >
      The merchandise {{ selectedItem.name }} will be redeemed and the points will be deducted by {{ selectedItem.price * amount }}.
    </ConfirmationDialog>
    <MessageDialog
      ref="messageDialog"
      title="Merchandise redeemed"
      @dismissed="$router.push(`/admin/scan-user/`)"
    >
      The merchandise has been redeemed
    </MessageDialog>
  </div>
</template>

<style lang="scss" scoped>

  .full-width {
    width: 100%;
  }

</style>

<script lang="ts">
    import {Vue, Component, Getter} from 'nuxt-property-decorator';
    import arkavidiaApi from "~/api/api";
    import { Tenant, Item } from "~/api/types";
    import ConfirmationDialog from "~/components/ConfirmationDialog.vue";
    import MessageDialog from "~/components/MessageDialog.vue";

const errorMessages = {
    "invalid-jwt": "Not authorized",
    "forbidden": "Forbidden",
    "user-not-found": "Invalid user"
};

@Component({
    components: {
        ConfirmationDialog,
        MessageDialog
    }
})
export default class RedeemPointsForm extends Vue {

    @Getter("redemption/getTarget") redemptionTarget;

    message = {
        visible: false,
        text: '',
        type: 'info'
    };

    inventories: Tenant[] = [];
    selectedInventory: Tenant = {
        id: 0,
        name: "No company",
        items: []
    };

    selectedItem: Item = {
        id: 0,
        name: "No item",
        price: 0,
        qty: 0
    };
    amount: number = 1;
    naturalNumber = [
        v => (v > 0) || 'Value must more than 0',
        v => this.isAmountEnough(v) || 'Not enough stock'
    ];

    created(): void {
        if (this.redemptionTarget == null) {
            this.$router.push(`/admin/`);
        }
        arkavidiaApi.stock.getItemPerOwner()
            .then(inventories => {
                for (const inventory of inventories) {
                    inventory.items = inventory.items.filter(item => item.qty > 0);
                }
                this.inventories = inventories.filter(inventory => inventory.items.length > 0);
            });
    }

    isAmountEnough(amount) {
        return amount <= this.selectedItem.qty;
    }

    get isSelectionValid() {
        return (this.selectedInventory.items.includes(this.selectedItem)) && (this.amount > 0) && (this.amount <= this.selectedItem.qty);
    }

    validateRedeem() {
        if (!this.isSelectionValid) {
            return;
        }
        (this.$refs.confirmDialog as Vue & { show: () => boolean }).show();
    }

    redeem() {
        arkavidiaApi.user.redeemItem({
            id: this.redemptionTarget.QRid,
            itemId: this.selectedItem.id,
            amount: this.amount
        }).then(() => {
            (this.$refs.messageDialog as Vue & { show: () => boolean }).show();
        }).catch(error => {
            this.message.visible = true;
            this.message.type = 'error';
            const code = error.response.data.code;
            if (code in errorMessages) {
                this.message.text = errorMessages[error.response.data.code];
            }
            else {
                this.message.text = 'Unknown error';
            }
        });
    }
}
</script>
