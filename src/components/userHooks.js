import {onMounted, onUnmounted, ref} from "vue";

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )

function hideOnClickOutside(onOutSideClicked) {
  let ref = null

  const outsideClickListener = event => {
    let element = ref.value
    if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
      if (onOutSideClicked) {
        onOutSideClicked()
      }
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  const addClickListener = (ele) => {
    ref = ele
    document.addEventListener('click', outsideClickListener)
  }

  return {
    removeClickListener,
    addClickListener,
  }
}

export let useLink = function () {
  const delay = 400

  let timer = null
  let modalIsActivted = ref(false)

  let showFunc = null
  let onShow = function (func) {
    showFunc = func
  }

  let onMouseEnterLink = function (e) {
    if (!modalIsActivted.value) {
      const { left, top } = e.target.getBoundingClientRect()

      let modalPosLeft = (left + e.target.clientWidth) + 'px'
      let modalPosTop = (top + e.target.clientHeight) + 'px'

      timer = setTimeout(() => {
        if (showFunc) {
          showFunc({
            modalPosLeft,
            modalPosTop,
          })
        }
      }, delay)
    }
  }
  return {
    onMouseEnterLink,
    onShow,
  }
}

export let useModal = function () {
  const modalRef  = ref(null)

  let modalIsActivted = ref(false)

  let modalPosLeft = ref(0)
  let modalPosTop = ref(0)


  function hideModal() {
    modalIsActivted.value = false
  }

  let outSideClickedManager = hideOnClickOutside(function () {
    // console.log('onOutSideClicked')
    hideModal()
  })

  let onModalMouseLeave = function () {
    modalIsActivted.value = false
  }

  onMounted(() => {
    outSideClickedManager.addClickListener(modalRef)
  })

  onUnmounted(() => {
    outSideClickedManager.removeClickListener()
  })

  return {
    onModalMouseLeave,
    modalRef,
    modalIsActivted,
    modalPosLeft,
    modalPosTop,
  }
}
