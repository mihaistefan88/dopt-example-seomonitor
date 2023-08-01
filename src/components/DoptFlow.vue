<template>
  <div v-if="flow">
    <button
        v-if="modalBlockState.active"
        @click="completeTransition"
    >
      {{ modalBlock.sid }}
    </button>
  </div>
</template>

<script>
import Dopt from '@dopt/javascript';

export default {
  props: {
    dopt: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      flow: null,
      flowState: null,
      modalBlock: null,
      modalBlockState: null
    };
  },
  methods: {
    completeTransition() {
      this.modalBlock.transition('complete');
    }
  },
  created() {
    this.flow = this.dopt.flow('dev-example-flow');
    this.flowState = this.flow.state;

    this.flow.subscribe(({ state }) => {
      this.flowState = state;
    });

    this.modalBlock = this.dopt.block('test-modal');
    this.modalBlockState = this.modalBlock.state;

    this.modalBlock.subscribe(({ state }) => {
      this.modalBlockState = state;
    });
  }
};
</script>
