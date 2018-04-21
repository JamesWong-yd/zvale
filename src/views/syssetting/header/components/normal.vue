<template>
  <header class="zvale-header-box" :style="headerStyle">
    <div class="zvale-header">
      <div class="zvale-logo" @click="goPage('/index')">
        <img class="zvale-logo-image" v-if="headerInfo.logo.type==='image'" :src="headerInfo.logo.content">
        <div v-else class="zvale-logo-text">{{headerInfo.logo.content}}</div>
      </div>
      <ul class="zvale-nav">
        <li v-for="(nav, index) in nav" @mouseover="hoverColor($event, nav.path, true)" @mouseout="hoverColor($event, nav.path, false)" :style="navStyle(nav.path)" :key="index" @click="goPage(nav.path)">{{nav.name}}</li>
      </ul>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    headerInfo: {
      background: String,
      logo: {
        type: String,
        content: String
      },
      color: String,
      activeNav: {
        type: String,
        color: String,
        otherColor: String
      }
    }
  },
  data() {
    return {
      activeIndex: 'index',
      nav: [
        { path: '/index', name: '导航1' },
        { path: '/list', name: '导航2' },
        { path: '/detail', name: '导航3' }
      ]
    }
  },
  computed: {
    headerStyle() {
      return {
        background: this.headerInfo.background
      }
    }
  },
  created () {
    this.activeIndex = '/index'
  },
  methods: {
    goPage(path){
      this.activeIndex = path
    },
    hoverColor(event, index, action) {
      const that = event.currentTarget
      const hoverType = this.headerInfo.activeNav.type
      const hoverColor = action
        ? this.headerInfo.activeNav.color
        : this.headerInfo.color
      const otherHoverColor = this.headerInfo.activeNav.otherColor
      if (this.activeIndex !== index) {
        that.style.color = hoverColor
        if (hoverType === 'border') {
          that.style.borderBottom = action ? `3px solid ${otherHoverColor}` : ''
        }
        if (hoverType === 'background') {
          that.style.background = action ? otherHoverColor : ''
        }
      }
    },
    navStyle(index) {
      const actnav = { color: this.headerInfo.color }
      if (this.activeIndex === index) {
        actnav.color = `${this.headerInfo.activeNav.color}`
        if (this.headerInfo.activeNav.type === 'border') {
          actnav.borderBottom = `3px solid ${
            this.headerInfo.activeNav.otherColor
          }`
        }
        if (this.headerInfo.activeNav.type === 'background') {
          actnav.background = this.headerInfo.activeNav.otherColor
        }
      }
      return actnav
    }
  }
}
</script>

<style lang="stylus" scoped>
.zvale-header-box {
  width: 100%;
  background: #fff;
}

.zvale-header {
  max-width: 100%;
  padding: 0 10px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
}

.zvale-logo {
  height: 50px;
  margin: 5px;
  overflow: hidden;
}

.zvale-logo-image {
  height: 50px;
  cursor: pointer;
}

.zvale-logo-text {
  font-size: 22px;
  color: #212121;
  line-height: 50px;
  cursor: pointer;
}

.zvale-nav {
  max-width: 900px;
  height: 60px;
  margin: 0;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  line-height: 60px;
  transition: all 0.5s;
}

.zvale-nav li {
  text-align: center;
  font-size: 16px;
  color: #212121;
  margin: 0 10px;
  padding: 0 10px;
  cursor: pointer;
}
</style>
