<template>
  <v-row align="center" justify="center" no-gutters>
    <v-alert v-model="message.visible" :type="message.type" :dismissible="true" class="mt-2">
      {{ message.text }}
    </v-alert>
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
            From Company
          </div>
          <div class="d-flex align-center">
            <div class="px-2 full-width">
              <v-combobox
                v-model="company"
                :items="companies"
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
      <v-btn @click="submit" color="#4336D7" class="white--text text-none" height="50px" width="100%">
        Add Merch Stock
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
    import {Action, Component, Getter, Vue} from 'nuxt-property-decorator';
    import {UserData} from "~/api/types";
    import arkavidiaApi from "~/api/api";
    import Alert from "~/components/partials/Alert.vue";

const errorMessages = {
    'item-exists': 'Item already exist'
}

@Component({
    components: {
        Alert
    }
})

class AddStockForm extends Vue {
    @Action('stock/fetchInventory') fetchInventory;
    @Getter('stock/getInventory') inventory;

    message = {
        visible: false,
        text: '',
        type: 'info'
    };
    amount: number = 1;
    price: number = 1;
    itemName: string = '';
    company?: UserData = undefined;
    companies: UserData[] = [];
    naturalNumber = [
        v => (v > 0) || 'Value must more than 0'
    ];

    mounted(): void {
      arkavidiaApi.user.getAllTenants()
          .then((tenants) => {
            this.companies = tenants;
            if (this.companies) {
                this.company = this.companies[0];
            }
            else {
                this.company = undefined;
            }
          });

        if (this.inventory == null) {
            this.inventory = this.fetchInventory();
        }
    }

    submit(): void {
      if (!this.itemName) {
          this.message.visible = true;
          this.message.type = 'error';
          this.message.text = "Empty item name";
          return;
      }
      else if (this.company == null) {
          this.message.visible = true;
          this.message.type = 'error';
          this.message.text = "No startup selected";
          return;
      }
      arkavidiaApi.stock.createItem({
          amount: this.amount,
          name: this.itemName,
          owner: this.company.id,
          price: this.price
      }).then(() => {
          this.message.visible = true;
          this.message.type = 'success';
          this.message.text = 'Item created';
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

export default AddStockForm;
</script>
