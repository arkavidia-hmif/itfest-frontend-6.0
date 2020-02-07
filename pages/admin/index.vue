<template>
  <div v-if="isUserLoaded">
    <div class="ma-4 mt-10">
      Signed in as <span class="ml-1" style="color: #FF0B51;">{{ user.name || user.username }}</span>
    </div>
    <div>
      <HomeButton label="Redeem Visitor Points" icon="fa-sync-alt" href="/admin/scan-user" />
      <HomeButton label="See Merch Stock" icon="fa-database" href="/admin/merchandise-stock" />
      <HomeButton label="Add Merch Stock" icon="fa-cart-plus" href="/admin/add-stock" />
      <HomeButton label="Logout" icon="fa-sign-out-alt" @click="doLogout" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
  import {Component, Action, Getter, Vue} from 'nuxt-property-decorator';
  import {UserData} from '~/api/types';
  import HomeButton from '~/components/admin-stock/HomeButton.vue';

  @Component({
    components: { HomeButton }
  })
  class AdminMenu extends Vue {
    @Action('user/fetchUser') fetchUserAction;
    @Getter('user/getUser') user!: UserData;
    @Action('auth/logout') logoutAction;

    isUserLoaded: boolean = false;

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

  export default AdminMenu;
</script>
