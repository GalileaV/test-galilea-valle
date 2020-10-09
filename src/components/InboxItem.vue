<template>
  <div
    :id="item.id + 'inbox-item'"
    :class="'row justify-space-between inbox-item' + computedClasses(item)"
    @click="select(item)"
  >
    <div class="data-overview">
      <p class="from">{{ item.fromName }}</p>
      <p class="subject">{{ item.subject }}</p>
    </div>
    <div class="extras">
      <p>{{ item.time }}</p>
      <AttachIcon v-if="!item.read" class="icon" />
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
  methods: {
    select(item) {
      this.$store.commit("setCurrentEmail", item);
    },
    computedClasses(item) {
      let classes = !item.read ? " pending" : " read";
      if (item.spam) classes += " spam";
      if (
        this.$store.getters.currentEmail &&
        this.$store.getters.currentEmail.id == item.id
      )
        classes += " selected";
      return classes;
    }
  }
};
</script>

<style scoped lang="scss"></style>
