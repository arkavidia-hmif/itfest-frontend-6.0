<template>
  <div>
    <div class="ma-4 mt-10">
      Signed in as <span class="ml-1" style="color: #FF0B51; font-size: 1.2rem; vertical-align: sub">Administrator</span>
    </div>
    <div>
      <HomeButton label="Redeem Points" icon="fa-sync-alt" href="admin/redeem-points" />
      <HomeButton label="See Merch Stock" icon="fa-database" href="admin/merchandise-stock" />
      <HomeButton label="Update Merch Stock" icon="fa-cart-plus" href="admin/update-stock" />
      <HomeButton label="Scan User" icon="fa-qrcode" href="admin/scan-user" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  * {
    font-family: 'Raleway', sans-serif;
    font-weight: 800;
  }
</style>

<script>
import HomeButton from '../../components/admin-stock/HomeButton';
export default {
  components: { HomeButton }
};
</script>
