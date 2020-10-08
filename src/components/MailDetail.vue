<template>
  <div id="mail-detail">
    <div class="grid-item">
      <p class="from">{{ content.from }}</p>
    </div>
    <div class="row align-center tags">
      Tags
      <p class="tag">{{ content.tag }}</p>
    </div>
    <div class="mail-body">
      <p>{{ content.body }}</p>
      <div class="row align-center justify-space-between mail-fotter">
        <AttachIcon />
        <button>Replay</button>
      </div>
    </div>
  </div>
</template>

<script>
import AttachIcon from "../assets/attach_file.svg";
export default {
  name: "MailDetail",
  components: {
    AttachIcon
  },
  props: {
    content: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/MailDetail.scss";
</style>
