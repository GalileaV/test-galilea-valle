import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import mailData from "./resources/mailData";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer: state => ({
    firstLoad: state.firstLoad,
    inboxEmails: state.inboxEmails,
    deletedEmails: state.deletedEmails,
    spamEmails: state.spamEmails,
    currentEmail: state.currentEmail,
    currentOffset: state.currentOffset
  })
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firstLoad: true,
    inboxEmails: [],
    deletedEmails: [],
    spamEmails: [],
    currentEmail: null,
    currentOffset: 0
  },
  mutations: {
    setFirstLoadExecuted(state) {
      state.firstLoad = false;
    },
    initializeDataBase(state) {
      state.inboxEmails = mailData.slice(0, 4);
      state.currentOffset = state.inboxEmails.length;
    },
    initializeMailingInterval(state) {
      let mailingInterval = setInterval(() => {
        if (state.currentOffset <= mailData.length - 2) {
          state.inboxEmails = [
            ...mailData.slice(state.currentOffset, state.currentOffset + 2),
            ...state.inboxEmails
          ];
          state.currentOffset += 2;
        } else {
          clearInterval(mailingInterval);
          mailingInterval = null;
        }
      }, 90000);
    },
    setCurrentEmail(state, item) {
      state.currentEmail = item;
      let indexToRead = (item.deleted
        ? state.deletedEmails
        : item.spam
        ? state.spamEmails
        : state.inboxEmails
      ).findIndex(email => email.id == item.id);

      if (indexToRead != -1) {
        (item.deleted
          ? state.deletedEmails
          : item.spam
          ? state.spamEmails
          : state.inboxEmails)[indexToRead].read = true;
      }
    },
    removeCurrentEmail(state) {
      state.currentEmail = null;
    },
    setEmailAsUnread(state) {
      let indexToUnread = (state.currentEmail.deleted
        ? state.deletedEmails
        : state.currentEmail.spam
        ? state.spamEmails
        : state.inboxEmails
      ).findIndex(email => email.id == state.currentEmail.id);

      if (indexToUnread != -1) {
        (state.currentEmail.deleted
          ? state.deletedEmails
          : state.currentEmail.spam
          ? state.spamEmails
          : state.inboxEmails)[indexToUnread].read = false;
        state.currentEmail = null;
      }
    },
    deletedEmail(state) {
      let indexToDelete = (state.currentEmail.spam
        ? state.spamEmails
        : state.inboxEmails
      ).findIndex(email => email.id == state.currentEmail.id);
      if (indexToDelete != -1) {
        (state.currentEmail.spam ? state.spamEmails : state.inboxEmails).splice(
          indexToDelete,
          1
        );
        state.currentEmail.deleted = true;
        state.deletedEmails.unshift(state.currentEmail);
        state.currentEmail = null;
      }
    },
    setEmailAsSpam(state) {
      let imboxIndex = state.inboxEmails.findIndex(
        email => email.id == state.currentEmail.id
      );
      let spamIndex = state.spamEmails.findIndex(
        email => email.id == state.currentEmail.id
      );
      if (state.currentEmail.spam) {
        state.currentEmail.spam = false;
        if (spamIndex != -1) state.spamEmails.splice(spamIndex, 1);
        state.inboxEmails.push(state.currentEmail);
      } else {
        state.currentEmail.spam = true;
        state.spamEmails.unshift(state.currentEmail);
        if (imboxIndex != -1) state.inboxEmails.splice(imboxIndex, 1);
      }
    }
  },
  getters: {
    firstLoad: state => state.firstLoad,
    inboxEmails: state => state.inboxEmails,
    deletedEmails: state => state.deletedEmails,
    spamEmails: state => state.spamEmails,
    currentEmail: state => state.currentEmail,
    currentOffset: state => state.currentOffset
  },
  actions: {},
  plugins: [vuexLocalStorage.plugin]
});
