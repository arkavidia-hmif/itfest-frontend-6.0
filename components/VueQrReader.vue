<template>
  <client-only>
    <qrcode-stream @decode="onDecode" />
  </client-only>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'VueQrReader',
  components: { QrcodeStream },
  methods: {
    onDecode(decodedString) {
      this.$emit('code-scanned', decodedString);
    }
  }
};
</script>

<style scoped>
</style>
