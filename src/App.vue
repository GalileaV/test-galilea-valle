<template>
  <div id="app">
    <Inbox />
    <MailViewer />
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
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
