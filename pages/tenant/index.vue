<template>
  <v-container fluid>
    <div align="center" class="py-2">
      <v-img :src="require('~/assets/logo-horz.svg')" width="60%" />
    </div>
    <v-row v-if="isUserLoaded" class="px-2">
      <v-col :cols="12">
        <v-card color="#FF084F" elevation="3" class="white--text">
          <div style="background: #00000022" class="px-4 py-2">
            Signed in as <b> {{ user.name }} </b>
          </div>
          <div class="pa-4">
            <div>
              Remaining points:
            </div>
            <div class="display-1 font-weight-black">
              {{ user.point }}
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card color="#7608FF" class="white--text" elevation="3" @click="$router.push('/tenant/give-point')">
          <v-row>
            <v-col>
              <v-card-text class="headline font-weight-bold">
                <v-row>
                  <div class="ml-4 mt-1">
                    <i class="mdi mdi-48px mdi-hand-heart" />
                  </div>
                  <div class="ml-4 mt-3">
                    Give Points
                  </div>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card color="#FFBA07" class="white--text" elevation="3" @click="$router.push('/tenant/trx')">
          <v-row>
            <v-col>
              <v-card-text class="headline font-weight-bold">
                <v-row>
                  <div class="ml-4 mt-1">
                    <i class="mdi mdi-history mdi-48px" />
                  </div>
                  <div class="ml-4 mt-1 remove-underline" style="text-decoration: none">
                    Transaction History
                  </div>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12">
        <v-card color="red" class="white--text pa-5 mt-8" elevation="3" @click="doLogout">
          <div class="headline font-weight-bold">
            Logout
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Component, Action, Getter, Vue} from 'nuxt-property-decorator';
  import {UserData} from '../../api/types';

  @Component({
    components: {}
  })
  class TenantMenu extends Vue {
    @Action('user/fetchUser') fetchUserAction;
    @Getter('user/getUser') user!: UserData;
    @Action('game/getStatus') getStatusAction;
    @Action('auth/logout') logoutAction;

    isUserLoaded: boolean = false;
    scanned: string = '';
    show: boolean = false;
    errorMessage: string = '';

    mounted() {
      this.fetchUserAction().finally(()=>{
        this.isUserLoaded = true;
      });
    }

    doLogout() {
      this.logoutAction();
      this.$router.push('/');
    }
  }
  export default TenantMenu;
</script>
<style>
</style>
