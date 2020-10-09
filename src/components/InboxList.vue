<template>
  <div id="inbox-list">
    <div class="list-container">
      <InboxItem
        v-for="element in search != '' ? searchResult : $store.getters[list]"
        :key="element.id"
        :item="element"
      />
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
    list: {
      type: String,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  computed: {
    searchResult() {
      if (this.search != "") {
        return this.$store.getters[this.list].filter(item => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(v => item.fromName.toLowerCase().includes(v));
        });
      } else {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/InboxList.scss";
</style>
