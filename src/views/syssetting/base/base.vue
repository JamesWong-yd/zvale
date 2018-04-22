<template>
  <div>
    <Card :bordered="false">
      <p slot="title">网站配置</p>
      <div style="padding:10px;width:700px;margin: 0 auto">
        <div class="zvale-title">
          <input type="text" v-model="formValidate.title" placeholder="Enter your web title">
        </div>
        <div>
          <div v-if="headerInfo.type" :is="headerInfo.type" :headerInfo="headerInfo"></div>
          <div v-else class="zvale-header-select" @click="selectModel">
            点击选择头部模型
          </div>
        </div>
        <div class="zvale-main">
          这是内容主题
        </div>
        <div>
          <div v-if="footerInfo.type" :is="footerInfo.type" :footerInfo="footerInfo"></div>
          <div v-else class="zvale-footer-select">
            点击选择底部模型
          </div>
        </div>
        <div class="zvale-having">
          <input type="text" v-model="formValidate.company" placeholder="Enter your company">
          <input type="text" v-model="formValidate.registerNo" placeholder="Enter your register number">
        </div>
      </div>
      <Spin size="large" fix v-if="formspinShow"></Spin>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formspinShow: true,
      formValidate: {
        title: '',
        keywords: '',
        description: '',
        registerNo: '',
        company: '',
      },
      ruleValidate: {},
      headerInfo: {
        type: '',
        background: '#ccc',
        logoType: 'text',
        logoContent: '666',
        color: '#fff',
        activeNavType: 'border', // border \ text \ background
        activeNavColor: 'red',
        activeNavOtherColor: '#dac'
      },
      footerInfo: {}
    }
  },
  created () {
    this.formspinShow = false
  },
  methods: {
    selectModel(){
      this.headerInfo.type = 'header-normal'
    }
  },
  components: {
    'header-normal': resolve => {
      require(['../header/components/normal.vue'], resolve)
    }
  }
}
</script>

<style scoped>
.zvale-title {
  width: 200px;
  margin: 10px 0;
}
.zvale-title input {
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
  outline: none;
}
.zvale-header-select,
.zvale-main,
.zvale-footer-select {
  height: 60px;
  background: #ccc;
  text-align: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  line-height: 60px;
  margin: 5px 0;
}
.zvale-main {
  height: 500px;
  line-height: 500px;
}
.zvale-having {
  background: #ccc;
  padding: 10px;
  overflow: hidden;
}
.zvale-having input {
  width: 200px;
  border: none;
  outline: none;
  background: #ccc;
}
.zvale-having input:last-child {
  float: right;
}
</style>
