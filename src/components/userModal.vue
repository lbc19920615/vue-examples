<style lang="less">
.user-modal {
  width: 600px;
  height: 300px;
  background: aqua;
  position: fixed;
  .user-modal__userinfo {
    display: flex;
  }
}
</style>

<template>
  <div v-if="modalIsActivted"
       ref="modalRef"
       class="user-modal"
       :style="{left: modalPosLeft, top: modalPosTop}"
       @mouseleave="onModalMouseLeave"
  >
    <div class="user-modal__userinfo">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import {useModal} from "./userHooks";

export default {
  name: "userModal",
  setup() {
    let modal = useModal()

    function open(e) {
      modal.modalPosLeft.value = e.modalPosLeft
      modal.modalPosTop.value = e.modalPosTop
      modal.modalIsActivted.value = true
    }

    return {
      ...modal,
      open
    }
  }
}
</script>
