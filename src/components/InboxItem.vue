<template>
  <div
    id="inbox-item"
    :class="
      'row justify-space-between' + (!item.isReaded ? ' pending' : ' read')
    "
  >
    <div class="data-overview">
      <p class="from">{{ item.from }}</p>
      <p class="subject">{{ item.subject }}</p>
    </div>
    <div class="extras">
      <p class="from">{{ item.date }}</p>
      <AttachIcon class="icon" />
    </div>
  </div>
</template>

<script>
import AttachIcon from "../assets/attach_file.svg";
export default {
  name: "InboxItem",
  components: {
    AttachIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/InboxItem.scss";
</style>
