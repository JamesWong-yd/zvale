<template>
  <div @click="screenBefore" class="lock-screen-btn-con">
    <Tooltip content="锁屏" placement="bottom">
      <Icon type="locked" :size="20"></Icon>
    </Tooltip>
    <Modal v-model="modal" title="请输入锁屏密码" @on-ok="modalOk" :mask-closable="false" width="400px">
      <Input v-model="screenPwd" type="password" autofocus="autofocus" placeholder="Enter your lockscreen password..."></Input>
      <p style="color:red;padding-top:10px">注：可任意输入任务数字、字母或符号，仅用于锁屏解锁。</p>
    </Modal>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import md5 from 'md5'

const setLockBackSize = () => {
  let x = document.body.clientWidth
  let y = document.body.clientHeight
  let r = Math.sqrt(x * x + y * y)
  return parseInt(r)
}
export default {
  name: 'lockScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal: false,
      screenPwd: ''
    }
  },
  methods: {
    screenBefore() {
      this.modal = true
      this.screenPwd = ''
    },
    modalOk() {
      localStorage.screenPwd = md5(this.screenPwd)
      this.lockScreen()
    },
    lockScreen() {
      let lockScreenBack = document.getElementById('lock_screen_back')
      lockScreenBack.style.transition = 'all 3s'
      lockScreenBack.style.zIndex = 10000
      lockScreenBack.style.boxShadow =
        '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset'
      this.showUnlock = true
      Cookies.set('last_page_name', this.$route.name) // 本地存储锁屏之前打开的页面以便解锁后打开
      setTimeout(() => {
        lockScreenBack.style.transition = 'all 0s'
        this.$router.push({
          name: 'locking'
        })
      }, 800)
      Cookies.set('locking', '1')
    }
  },
  mounted() {
    let lockScreenBack
    if (!document.getElementById('lock_screen_back')) {
      let lockdiv = document.createElement('div')
      lockdiv.setAttribute('id', 'lock_screen_back')
      lockdiv.setAttribute('class', 'lock-screen-back')
      document.body.appendChild(lockdiv)
      lockScreenBack = document.getElementById('lock_screen_back')
      window.addEventListener('resize', () => {
        let size = setLockBackSize()
        this.lockScreenSize = size
        lockScreenBack.style.transition = 'all 0s'
        lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
      })
    } else {
      lockScreenBack = document.getElementById('lock_screen_back')
    }
    let size = setLockBackSize()
    this.lockScreenSize = size
    lockScreenBack.style.transition = 'all 3s'
    lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
  }
}
</script>

