<template>
  <div>
    <div class="ma-4 mt-10">
      Signed in as <span class="ml-1" style="color: #FF0B51; font-size: 1.2rem; vertical-align: sub">Administrator</span>
    </div>
    <div>
      <HomeButton label="Redeem Visitor Points" icon="fa-sync-alt" href="scan-user" />
      <HomeButton label="See Merch Stock" icon="fa-database" href="merchandise-stock" />
      <HomeButton label="Add Merch Stock" icon="fa-cart-plus" href="add-stock" />
      <HomeButton label="Update Merch Stock" icon="fa-edit" href="update-stock" />
      <HomeButton label="See Redemption History" icon="fa-history" href="redemption-history" />
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
