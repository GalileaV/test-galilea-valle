<template>
  <div id="inbox">
    <div class="inbox-header">
      <div class="row justify-space-between row-1">
        <div class="row align-center title">
          <p>{{ filterTypes[filterTypeSelected].text }}</p>
          <p class="new-mails-count">{{ $mailData.length }}</p>
        </div>
        <div class="dropdown">
          <div class="row align-center filter-by-input" @click="selectTrigger">
            <p>Filter by</p>
            <div class="col filter-arrows">
              <p>{{ "▲" }}</p>
              <p>{{ "▼" }}</p>
            </div>
          </div>
          <div
            v-show="menuVisible"
            :class="'filter-by-menu ' + (menuVisible ? 'grow' : '')"
          >
            <div
              v-for="type in filterTypes"
              :key="type.value"
              class="list-item"
              @click="selectFilter(type.value)"
            >
              {{ type.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="row-2">
        <div class="row justify-space-between search-input">
          <input v-model="search" type="text" placeholder="Search" />
          <SearchIcon />
        </div>
      </div>
    </div>
    <InboxList :items="dataItems" />
  </div>
</template>

<script>
import InboxList from "./InboxList.vue";
import SearchIcon from "../assets/search.svg";
export default {
  name: "Inbox",
  components: {
    InboxList,
    SearchIcon
  },
  data() {
    return {
      filterTypeSelected: 0,
      menuVisible: false,
      search: "",
      dataItems: [],
      filterTypes: [
        { text: "Inbox", value: 0 },
        { text: "Spam", value: 1 },
        { text: "Deleted", value: 2 }
      ]
    };
  },
  watch: {
    filterTypeSelected(val) {
      console.log(val);
      this.dataItems = this.$mailData;
    }
  },
  mounted() {
    console.log(this.$mailData);
    this.dataItems = this.$mailData;
  },
  methods: {
    selectTrigger() {
      this.menuVisible = !this.menuVisible;
    },
    selectFilter(value) {
      this.filterTypeSelected = value;
      this.menuVisible = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/Inbox.scss";
</style>
