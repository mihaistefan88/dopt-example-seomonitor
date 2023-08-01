<template>
  <div v-if="flow">
    <DoptModal v-for="i in 3" :key="i"
               :active="modalBlock.state.active"
               :id="i" :title="modalBlock.block.sid"
               :rendered-blocks="renderedBlocks"
               @renderBlock="setRenderedBlock"
    ></DoptModal>

    <table>
      <thead>
      <tr>
        <td>#</td>
        <td>Name</td>
        <td>Example column</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>Barbie</td>
        <td>7.5</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Oppenheimer</td>
        <td>8.5</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import Dopt from '@dopt/javascript';
import DoptModal from './DoptModal.vue';

export default {
  props: {
    dopt: {
      type: Object,
      required: true
    }
  },
  components: {DoptModal},
  data() {
    return {
      flow: null,
      flowState: null,
      modalBlock: null,
      modalBlockState: null,
      highlightBlock: null,
      highlightBlockState: null,
      renderedBlocks: {},
      activeRenderedBlockUid: null,
      currentIteratingBlock: null,
    };
  },
  methods: {
    setRenderedBlock(obj) {
      this.renderedBlocks = {...obj}
    },
    completeTransition() {
      this.modalBlock.transition('complete');
      this.modalBlock.state.exited = true;
    }
  },
  created() {
    this.flow = this.dopt.flow('dev-example-flow');
    this.flow.reset();
    this.flowState = this.flow.state;

    this.flow.subscribe(({state}) => {
      this.flowState = state;
    });

    this.modalBlock = this.dopt.modal('dev-example-flow.brave-feet-boil');
    this.modalBlockState = this.modalBlock.state;
    this.modalBlock.subscribe(({state}) => {
      this.modalBlockState = state;
    });

    // this.highlightBlock = this.dopt.block('dev-example-flow.chatty-owls-scream');
    // this.highlightBlockState = this.highlightBlock.state;
    // this.highlightBlock.subscribe(({ state }) => {
    //   this.highlightBlockState = state;
    // });


    console.log('blockstate active', this.modalBlockState.active)
    console.log('flowstate started', this.flowState.started)
  }
};
</script>

<style>
.highlighted {
  background-color: #ffff00;
}
</style>
