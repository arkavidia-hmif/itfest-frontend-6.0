<template>
  <v-container>
    <nuxt-link to="/visitor-transfer">
      Transfer
    </nuxt-link>
    <div>
      Userdata: {{ user }}
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator';
import { UserData } from '../api/types';

@Component({
  components: { }
})
class IndexPage extends Vue {
  @Action('user/fetchUser') fetchUserAction;
  @Getter('user/getUser') user: UserData;

  mounted() {
    this.fetchUserAction();
  }
}

export default IndexPage;

</script>
