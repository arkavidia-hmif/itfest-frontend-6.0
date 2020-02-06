<template>
  <div class="pa-4">
    <v-form>
      <div class="my-4">
        <div class="form-label">
          You're giving..
        </div>
        <v-text-field full-width suffix="points" outlined class="mt-4" />
      </div>
      <div class="my-4">
        <div class="form-label">
          Account destination
        </div>
        <div class="account-number">
          887964
        </div>
      </div>
      <div class="my-4">
        <div class="form-label">
          Points left after giving
        </div>
        <div class="points-balance">
          350
        </div>
      </div>
    </v-form>
    <v-btn color="#4336D7" class="white--text text-none" block @click="process">
      Give Points!
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.account-number {
  position: relative;
  bottom: 7.5px;
  font-size:2em;
  font-weight:600;
  color:#FF0B51;
}
.points-balance {
  position: relative;
  bottom: 15px;
  font-size:4em;
  font-weight:600;
  color:#3F32D5;
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';


@Component({})
class TransferPoints extends Vue {
  process() {
    this.$emit('close');
  }
}

export default TransferPoints;
</script>
