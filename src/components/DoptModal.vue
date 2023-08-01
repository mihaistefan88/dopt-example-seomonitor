<template>
  <div v-if="active && renderedBlocks[title] === this._uid">
    <div>{{title}} {{_uid}}</div>
    <div>{{body}}</div>
  </div>
</template>
<script>
export default {
  props: ['id','title','body','dismiss','dismissLabel','completeLabel','complete','active', 'blockUid', 'renderedBlocks'],
  mounted() {
    if (!this.renderedBlocks[this.title]) {
      this.$emit('renderBlock', {[this.title]: this._uid});
    }
  },
  watch: {
    renderBlocks() {
      console.log('changed renderblocks')
    }
  },
  unmounted() {
      delete this.renderedBlocks[this.title];
  }
}
</script>
