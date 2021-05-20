<template>
  <a class="user" :href="href"
    @mouseenter="onMouseEnterLink"
  >{{name}}</a>
</template>

<script lang="ts">
import {computed, reactive, toRefs} from 'vue';
import {useLink} from "./userHooks";
import {userInfoInterface} from "../types/user";
import { getUserInfo } from '../api/user'

export default {
  name: "user",
  props: {
    name: {
      type: String,
      default: '',
    },
    uid: {
      type: String,
      default: '',
    }
  },
  emits: [
    'hovermodal'
  ],
  setup(props, {emit}) {
    const { uid } = toRefs(props)

    let { onMouseEnterLink, onShow, modalIsActivted } = useLink()

    let userInfoObj: userInfoInterface = {
      attentionNum: 0,
      fanNum: 0,
      weiboNum: 0,
    }

    const userInfo = reactive(userInfoObj)

    onShow((e) => {
      getUserInfo().then(res => {
        if (res.status > 199) {
          for (let k in res.data) {
            userInfo[k] = res.data[k]
          }
        }
        emit('hovermodal', {
          userInfo,
          option: e
        })
      })
    })

    let href = computed(() => {
      return `/user/${uid.value}/detail`
    })

    return {
      onMouseEnterLink,
      modalIsActivted,
      href
    }
  }
}
</script>
