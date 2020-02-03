<template>
  <v-row align="center" justify="center" no-gutters>
    <ConfirmationDialog
      ref="deleteDialog"
      title="Delete merchandise?"
      confirm-text="Delete"
      confirm-color="red darken-1"
      cancel-text="Cancel"
      cancel-color="green darken-1"
      @confirmed="deleteStock"
    >
      The merchandise will be deleted and the data will be lost
    </ConfirmationDialog>
    <v-alert v-model="message.visible" :type="message.type" :dismissible="true" class="mt-2">
      {{ message.text }}
    </v-alert>
    <v-progress-linear :active="!isItemLoaded" indeterminate />
    <v-col class="py-5" cols="10">
      <v-form>
        <div class="my-4">
          <div class="form-label">
            Merchandise
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-text-field v-model="itemName" full-width label="item" type="text" />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Owner
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-combobox
                v-model="company"
                disabled
                item-value="id"
                item-text="name"
                full-width
                return-object
              />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div class="form-label">
            Price
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-text-field
                v-model="price"
                :rules="naturalNumber"
                full-width
                type="number"
                suffix="points"
                step="1"
                min="1"
              />
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
                suffix="pcs"
                step="1"
                min="1"
              />
            </div>
          </div>
        </div>
      </v-form>
    </v-col>
    <v-col class="d-flex justify-center" cols="10">
      <v-btn color="#4336D7" class="white--text text-none" height="50px" width="100%" @click="submit">
        Update Merch Stock
      </v-btn>
    </v-col>
    <v-col class="d-flex justify-center mt-4" cols="10">
      <v-btn color="#FF0B51" class="white--text text-none" height="50px" width="100%" @click="$refs.deleteDialog && $refs.deleteDialog.show()">
        Delete Merch Stock
      </v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

  .full-width {
    width: 100%;
  }

</style>

<script lang="ts">

  import {Component, Vue} from 'nuxt-property-decorator';
  import arkavidiaApi from "~/api/api";
  import ConfirmationDialog from "~/components/ConfirmationDialog.vue";

  interface Company {
    id: number;
    name: string;
  }

  const errorMessages = {
    'item-exists': 'Item already exist'
  };

  @Component({
      components: {
          ConfirmationDialog
      }
  })
  export default class UpdateStockForm extends Vue {

    message = {
      visible: false,
      text: '',
      type: 'info'
    };
    isItemLoaded: boolean = false;
    amount: number = 1;
    price: number = 1;
    itemId: number = NaN;
    itemName: string = '';
    ownerId: number = NaN;
    company: Company = {
      id: 1,
      name: "Admin Arkavidia"
    };
    naturalNumber = [
      v => (v > 0) || 'Value must more than 0'
    ];

    created(): void {
      if ('id' in this.$route.params) {
        this.itemId = parseInt(this.$route.params.id);
      }
      if (isNaN(this.itemId)) {
        this.$router.push("/admin/");
      }
      arkavidiaApi.stock.getItem({id: this.itemId})
        .then(inventory => {
          this.itemName = inventory.item.name;
          this.price = inventory.item.price;
          this.amount = inventory.qty;
          this.ownerId = inventory.item.ownerId;
          return arkavidiaApi.user.getUser({id: this.ownerId});
        }).then(owner => {
          this.company = {
            id: owner.id,
            name: owner.name
          };
          this.isItemLoaded = true;
        });
    }

    submit(): void {
      if (!this.itemName) {
        this.message.visible = true;
        this.message.type = 'error';
        this.message.text = "Empty item name";
        return;
      }
      arkavidiaApi.stock.updateItem({
        id: this.itemId,
        amount: this.amount,
        name: this.itemName,
        price: this.price
      }).then(() => {
        this.message.visible = true;
        this.message.type = 'success';
        this.message.text = 'Item updated';
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

    deleteStock(): void {
      arkavidiaApi.stock.deleteItem({id: this.itemId});
      this.$router.push(`/admin/merchandise-stock`);
    }
  }

</script>
