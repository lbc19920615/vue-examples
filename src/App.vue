<template>
  <user name="google开发者1" uid="test1" @hovermodal="onHoverModal"></user>

  <user name="google开发者2" uid="test2" @hovermodal="onHoverModal"></user>

  <user-modal ref="modal">
    <div>关注: {{ userInfo.attentionNum }}</div>
    <div>粉丝: {{ userInfo.fanNum }}</div>
    <div>微博: {{ userInfo.weiboNum }}</div>
  </user-modal>
</template>

<script>
console.log(import.meta.env);

import User from "./components/user.vue";
import UserModal from "./components/userModal.vue";
export default {
  components: { UserModal, User },
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    onHoverModal(e) {
      this.userInfo = e.userInfo;
      // console.log(e)
      this.$refs.modal.open(e.option);
    },
  },
};
</script>

<style>
.user {
  display: inline-block;
  width: 300px;
  height: 150px;
  background-color: antiquewhite;
  margin: 100px;
}
</style>
