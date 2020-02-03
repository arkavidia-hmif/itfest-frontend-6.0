<template>
  <v-row no-gutters style="margin-top: 16px;">
    <v-pagination
      v-model="page"
      :length="totalPages"
      @input="pageChanged"
    />
    <v-container
      v-for="(item, i) in inventory"
      :key="i"
      fluid
      class="listbox"
      ma-2
      pa-5
    >
      <v-row>
        <v-icon small class="mr-2 mb-1" @click="edit(item.item.id)">fa-edit</v-icon>
        <div style="font-weight: 800; margin-right: 0.5rem">
          Owner:
        </div>
        <div style="font-weight: 800; color: #FF0B51;">
          {{ getName(item.item.ownerId) }}
        </div>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-row>
            <div style="margin-right: 0.5rem">
              Name:
            </div>
            <div style="color: #3F32D5;">
              {{ item.item.name }}
            </div>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <div style="margin-right: 0.5rem">
              Price:
            </div>
            <div style="color: #3F32D5;">
              {{ item.item.price }} points
            </div>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <div style="margin-right: 0.5rem">
          Stock:
        </div>
        <div style="color: #3F32D5;">
          {{ item.qty }}
        </div>
      </v-row>
    </v-container>
    <v-pagination
      v-if="inventory.length > 0"
      v-model="page"
      :length="totalPages"
      @input="pageChanged"
    />
  </v-row>
</template>

<style lang="scss" scoped>
  .listbox {
    background-color: #e2e0e0;
  }
</style>

<script lang="ts">
    import {Component, Vue} from 'nuxt-property-decorator';
    import {InventoryData} from "~/api/types";
    import arkavidiaApi from "~/api/api";

    @Component({})
    class ListStocks extends Vue {

        inventory: InventoryData[] = [];
        numberOfItems: number = 10;
        page: number = 1;
        totalPages: number = 0;
        companies: Map<number, string> = new Map<number, string>();

        loadStocks() {
            arkavidiaApi.stock.getInventory({
                page: this.page,
                itemPerPage: this.numberOfItems
            })
                .then(result => {
                    this.page = result.page;
                    this.totalPages = result.totalPages;
                    this.inventory = result.data;
                });
        }

        created() {
            arkavidiaApi.user.getAllTenants()
                .then((tenants) => {
                    for (let tenant of tenants) {
                        this.companies.set(tenant.id, tenant.name);
                    }
                });
            this.loadStocks();

        }

        pageChanged() {
            this.loadStocks();
        }

        edit(id) {
          this.$router.push(`/admin/edit/${id}`);
        }

        getName(tenantId) {
            if (this.companies.has(tenantId)) {
                return this.companies.get(tenantId);
            }
            return 'Arkavidia Admin';
        }
    }

    export default ListStocks;
</script>
