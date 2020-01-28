<template>
  <div>
    <v-btn
      v-for="option in options"
      :key="option.value"
      :color="value.includes(option.value) ? 'light-green lighten-1' : 'grey darken-1'"
      :outlined="!value.includes(option.value)"
      :data-option="option.value"
      class="text-none my-2"
      elevation="0"
      block
      @click="() => toggle(option.value)"
    >
      {{ option.title }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MultipleOptionPicker',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: Boolean
  },
  methods: {
    toggle(optionValue) {
      let value = [...this.value];

      if (value.includes(optionValue)) {
        if (this.multiple) {
          value = value.filter(function(value) {
            return value !== optionValue;
          });
        }
 else {
          value = [];
        }
      }
 else if (this.multiple) {
        value.push(optionValue);
      }
 else {
        value = [optionValue];
      }

      this.$emit('input', value);
    }
  }
};
</script>

<style scoped>

</style>
