<template>
  <!-- Stub page for displaying visitor feedback dialog -->
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" class="ma-6" dark>
        Open Dialog
      </v-btn>
    </template>
    <VisitorFeedbackDialog
      :company-name="companyName"
      :points-awarded="pointsAwarded"
      :whats-good-options="whatsGoodOptions"
      @skip="dialog = false"
      @submit="(event) => onSubmit(event)"
    />
  </v-dialog>
</template>

<script>
import VisitorFeedbackDialog from '../components/VisitorFeedbackDialog'
export default {
  name: 'VisitorFeedback',
  components: { VisitorFeedbackDialog },
  data () {
    return {
      dialog: false,
      companyName: 'Eduka System',
      pointsAwarded: 300,
      whatsGoodOptions: [
        { title: 'Stands out from the crowd', value: 'stands_out' },
        { title: 'Fun & engaging games', value: 'fun_games' },
        { title: 'Friendly people', value: 'friendly_people' },
        { title: 'Nice decoration', value: 'nice_decoration' }
      ]
    }
  },
  methods: {
    onSubmit (data) {
      this.dialog = false
      alert(`You gave rating level ${data.rating}`)
    }
  }
}
</script>

<style scoped>

</style>
