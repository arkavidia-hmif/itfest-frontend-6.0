<template>
  <v-container />
</template>

<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { UserData } from '../api/types';

@Component({
  components: { }
})
class IndexPage extends Vue {
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user!: UserData;

  mounted() {
    this.fetchUserAction()
      .then(() => {
          const role = this.user.role;
          if (role === 'tenant') {
              this.$router.push('/tenant');
          }
          else if (role === 'admin') {
              this.$router.push('/admin');
          }
          else {
              this.$router.push('/visitor');
          }
      })
      .catch(() => {
          // TODO do something
      });
  }
}

export default IndexPage;

</script>
