<template>
  <v-dialog
    v-model="visible"
    max-width="310"
  >
    <v-card>
      <slot name="title">
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
      </slot>

      <slot />

      <v-card-actions>
        <v-spacer />

        <v-btn
          :color="dismissColor"
          text
          @click="dismissDialog"
        >
          {{ dismissText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import {Emit, Prop, Provide, Vue} from "nuxt-property-decorator";
    import {Component} from "~/node_modules/nuxt-property-decorator";

    @Component({})
    export default class MessageDialog extends Vue {

        @Provide()
        visible: boolean = false;
        @Prop({type: String, default: ""})
        title!: string;
        @Prop({type: String, default: "Dismiss"})
        dismissText!: string;
        @Prop({type: String, default: "black darken-1"})
        dismissColor!: string;

        show() {
            this.visible = true;
        }

        hide() {
            this.visible = false;
        }

        @Emit("dismissed")
        dismissDialog() {
            this.visible = false;
        }

    }
</script>

<style scoped>

</style>
