<template>
  <div id="mail-viewer">
    <div class="row mail-nav-bar justify-space-between align-center">
      <div class="row left-btns">
        <button
          v-if="!$store.getters.currentEmail.deleted"
          class="delete-btn"
          @click="$store.commit('deletedEmail')"
        >
          Delete
        </button>
        <p v-else class="deleted">Deleted</p>
        <button
          v-if="!$store.getters.currentEmail.deleted"
          :class="
            'spam-btn' + ($store.getters.currentEmail.spam ? ' is-spam' : '')
          "
          @click="$store.commit('setEmailAsSpam')"
        >
          Spam
        </button>
      </div>
      <button class="unread-btn" @click="markAsUnread()">
        Mark as unread
      </button>
    </div>
    <MailDetail />
  </div>
</template>

<script>
import MailDetail from "./MailDetail.vue";
export default {
  name: "MailViewer",
  components: {
    MailDetail
  },
  methods: {
    markAsUnread() {
      this.$store.commit("setEmailAsUnread");
    }
  }
};
</script>

<style scoped lang="scss"></style>
