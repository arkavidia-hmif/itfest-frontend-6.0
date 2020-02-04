<template>
  <v-dialog
    v-model="visible"
    max-width="310"
  >
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          :color="cancelColor"
          text
          @click="cancelDialog"
        >
          {{ cancelText }}
        </v-btn>

        <v-btn
          :color="confirmColor"
          text
          @click="confirmDialog"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import {Emit, Prop, Provide, Vue} from "nuxt-property-decorator";
    import {Component} from "~/node_modules/nuxt-property-decorator";

    @Component({})
    export default class ConfirmationDialog extends Vue {

        @Provide()
        visible: boolean = false;
        @Prop({type: String, required: true})
        title!: string;
        @Prop({type: String, default: "Yes"})
        confirmText!: string;
        @Prop({type: String, default: "green darken-1"})
        confirmColor!: string;
        @Prop({type: String, default: "No"})
        cancelText!: string;
        @Prop({type: String, default: "red darken-1"})
        cancelColor!: string;

        show() {
            this.visible = true;
        }

        hide() {
            this.visible = false;
        }

        @Emit("cancelled")
        cancelDialog() {
            this.visible = false;
        }

        @Emit("confirmed")
        confirmDialog() {
            this.visible = false;
        }

    }
</script>

<style scoped>

</style>
