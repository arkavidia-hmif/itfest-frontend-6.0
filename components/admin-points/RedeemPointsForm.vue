<template>
  <v-row align="center" justify="center" no-gutters>
    <v-alert v-model="message.visible" :type="message.type" :dismissible="true" class="mt-2">
      {{ message.text }}
    </v-alert>
    <v-col class="py-5" cols="10">
      <v-form v-if="redemptionTarget">
        <div class="my-2">
          <div class="form-label">
            Using points from
            <span style="font-weight: 800; font-size: 1.5em; margin-right: 0.5rem; color: #FF0B51; vertical-align: sub">
              {{ redemptionTarget.name }}
            </span>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            From
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-select
                v-model="selectedInventory"
                :items="inventories"
                return-object
                item-text="name"
                full-width
                label="Tenant"
              />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Merchandise
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-select
                v-model="selectedItem"
                :items="selectedInventory.items"
                item-text="name"
                full-width
                label="Item"
                return-object
              >
                <template slot="selection" slot-scope="{ item }">
                  {{ item.name }}
                </template>
                <template slot="item" slot-scope="{ item }">
                  <span>{{ item.name }}</span> <v-spacer></v-spacer> <span class="float-right">{{ item.price }} pts</span>
                </template>
              </v-select>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Amount
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-text-field
                v-model="amount"
                :rules="naturalNumber"
                full-width
                type="number"
                :suffix="`out of ${this.selectedItem.qty} pcs`"
                step="1"
                min="1"
                :disabled="this.selectedItem.qty == 0"
              />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Total price
          </div>
          <v-row class="ml-2">
            <div style="font-weight: 800; font-size: 3em; margin-right: 0.5rem; color: #3F32D5; display: flex; align-items: center;">
              {{ isSelectionValid ? selectedItem.price * amount : '-' }}
            </div>
            <div style="font-weight: 800; font-size: 1.5em; display: flex; align-items: center;">
              points
            </div>
          </v-row>
        </div>
      </v-form>
    </v-col>
    <v-col class="d-flex justify-center" cols="10">
      <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%" @click="validateRedeem">
        Redeem Points
      </v-btn>
    </v-col>
    <ConfirmationDialog
      ref="confirmDialog"
      title="Redeem merchadise?"
      confirm-text="Redeem"
      confirm-color="green darken-1"
      cancel-text="Cancel"
      cancel-color="red darken-1"
      @confirmed="redeem"
    >
      The merchandise {{ selectedItem.name }} will be redeemed and the points will be deducted by {{ selectedItem.price }}.
    </ConfirmationDialog>
    <MessageDialog
      ref="messageDialog"
      title="Merchandise redeemed"
      @dismissed="$router.push(`/admin/scan-user/`)"
    >
      The merchandise has been redeemed
    </MessageDialog>
  </v-row>
</template>

<style lang="scss" scoped>

  .full-width {
    width: 100%;
  }

</style>

<script lang="ts">
    import {Vue, Component, Getter} from 'nuxt-property-decorator';
    import arkavidiaApi from "~/api/api";
    import { Tenant, Item} from "~/api/types";
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
            this.$router.push(`/admin/scan-user`);
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
