<template>
  <div id="mail-viewer">
    <div class="row mail-nav-bar justify-space-between">
      <div class="row left-btns">
        <button class="delete-btn">Delete</button>
        <button class="spam-btn">Spam</button>
      </div>
      <button class="unread-btn">Mark as unread</button>
    </div>
    <MailDetail :content="$mailData[0]" />
  </div>
</template>

<script>
import MailDetail from "./MailDetail.vue";
export default {
  name: "MailViewer",
  components: {
    MailDetail
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/MailViewer.scss";
</style>
