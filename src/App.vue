<template>
  <div id="app">
    <Inbox />
    <MailViewer v-if="$store.getters.currentEmail" />
  </div>
</template>

<script>
import Inbox from "./components/Inbox.vue";
import MailViewer from "./components/MailViewer.vue";
export default {
  name: "App",
  components: {
    Inbox,
    MailViewer
  },
  created() {
    if (this.$store.getters.firstLoad) {
      this.$store.commit("initializeDataBase");
      this.$store.commit("setFirstLoadExecuted");
    }
    this.$store.commit("initializeMailingInterval");
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
