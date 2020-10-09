<template>
  <div
    id="mail-detail"
    :class="$store.getters.currentEmail.spam ? 'is-spam' : ''"
  >
    <div class="grid-item">
      <p class="from">{{ $store.getters.currentEmail.fromName }}</p>
      <p class="from-email">{{ $store.getters.currentEmail.from }}</p>
    </div>
    <div class="row align-center tags">
      Tags
      <p class="tag">{{ $store.getters.currentEmail.tag }}</p>
    </div>
    <div class="mail-body">
      <div class="text">
        <p>{{ $store.getters.currentEmail.body }}</p>
      </div>
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
  }
};
</script>

<style scoped lang="scss"></style>
