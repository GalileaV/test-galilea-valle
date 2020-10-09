<template>
  <div id="inbox">
    <div class="inbox-header">
      <div class="row justify-space-between row-1">
        <div class="row align-center title">
          <p>{{ filterTypes[filterTypeSelected].text }}</p>
          <p class="new-mails-count">
            {{ unreadEmails }}
          </p>
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
            id="menu"
            :class="'filter-by-menu ' + (menuVisible ? 'grow' : '')"
          >
            <div
              v-for="(type, index) in filterTypes"
              :key="type.value"
              class="list-item"
              @click="selectFilter(index)"
            >
              {{ type.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="row-2">
        <div class="row justify-space-between search-input">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            :disabled="
              $store.getters[filterTypes[filterTypeSelected].value].length == 0
            "
          />
          <SearchIcon />
        </div>
      </div>
    </div>
    <InboxList :list="dataList" :search="search" />
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
      dataList: "inboxEmails",
      filterTypes: [
        { text: "Inbox", value: "inboxEmails" },
        { text: "Spam", value: "spamEmails" },
        { text: "Deleted", value: "deletedEmails" }
      ]
    };
  },
  computed: {
    unreadEmails() {
      let count = 0;
      this.$store.getters[
        this.filterTypes[this.filterTypeSelected].value
      ].forEach(element => {
        if (!element.read) count++;
      });
      return count;
    }
  },
  watch: {
    filterTypeSelected(val) {
      this.dataList = this.filterTypes[val].value;
    }
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
