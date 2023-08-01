<template>
  <div v-if="active">
    <div>{{title}} {{_uid}}</div>
    <div>{{body}}</div>
  </div>
</template>
<script>
export default {
  props: ['id','title','body','dismiss','dismissLabel','completeLabel','complete','active', 'blockUid'],
  mounted() {
    this.$emit('renderBlock', this._uid);
  }
}
</script>
