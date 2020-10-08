<template>
  <div id="inbox-list">
    <div class="list-container">
      <InboxItem v-for="element in items" :key="element.id" :item="element" />
    </div>
  </div>
</template>

<script>
import InboxItem from "./InboxItem.vue";
export default {
  name: "InboxList",
  components: {
    InboxItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/InboxList.scss";
</style>
