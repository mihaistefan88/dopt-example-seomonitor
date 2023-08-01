<template>
  <div>
    <div v-if="!doptReady" id="dopt-pending"/>
    <div v-if="!flowReady" id="flow-pending"/>
    <div v-if="flowReady" id="flow-succeeded"/>
    <DoptFlow v-if="doptReady" :dopt="dopt"/>
  </div>
</template>

<script>
import { DoptApiClient as UsersApiClient } from '@dopt/users-javascript-browser-client';
import { Dopt as DoptJavaScriptClient } from '@dopt/javascript';
import DoptFlow from './DoptFlow.vue';

export default {
  components: {
    DoptFlow
  },
  data() {
    return {
      dopt: null,
      doptReady: false,
      flowReady: false,
    };
  },
  created() {
    (async () => {
      const usersClient = new UsersApiClient({
        apiKey: "users-50bb7fde4ef0bc8a564b19b136891d8531a074ab320bab4e68fc73bb68669cff_NzM3"
      });

      const userId = 'test-user'; // a stable identifier for your user

      await usersClient.users.identifyUser({
        identifier: userId,
        properties: {city: 'Oakland'},
      });

      this.dopt = new DoptJavaScriptClient({
        apiKey: "blocks-742329a2b3126353b34edb83e0b96932d03af6171262737e7cb6ff7baf685195_Njc3",
        userId,
        flowVersions: {
          'dev-example-flow': 2,
        }
      });

      await this.dopt.flow('dev-example-flow').initialized();

      this.flowReady = true;
      this.doptReady = true;
    })();
  },
};
</script>
