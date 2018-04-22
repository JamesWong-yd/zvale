<template>
  <div>
    <Steps style="margin:20px 0" :current="currentStep">
      <Step title="定义名称及描述"></Step>
      <Step title="选择基础模型"></Step>
      <Step title="定义模型样式"></Step>
      <Step title="创建完成"></Step>
    </Steps>
    <div class="zvale-step-content">
      <h2>{{stepTitle[currentStep]}}</h2>
      <div class="zvale-step-form">
        <!-- 定义名称 -->
        <Form v-show="currentStep === 0" style="width:500px;margin:0 auto" label-position="left" :label-width="100">
          <FormItem label="模型名称" required>
            <Input v-model="headerInfo.name" placeholder="Enter you model name"></Input>
          </FormItem>
          <FormItem label="模型描述">
            <Input type="textarea" v-model="headerInfo.description" placeholder="Enter you model description"></Input>
          </FormItem>
        </Form>
        <!--  选择模型 -->
        <ul class="zvale-stepheader-ul" v-show="currentStep === 1">
          <li @click="selectHeader('header-normal')">
            <Row>
              <Col span="18">
              <div is="header-normal" :headerInfo="headerInfo"></div>
              </Col>
              <Col span="3" class="zvale-stepheader-box"> LOGO导航同行
              </Col>
              <Col span="3" class="zvale-stepheader-box">
              <Icon class="zvale-stepheader-icon" type="checkmark-round" :color="selectHeaderIcon('header-normal')"></Icon>
              </Col>
            </Row>
          </li>
          <li @click="selectHeader('header-one')">
            <Row>
              <Col span="18">
              <div is="header-normal" :headerInfo="headerInfo"></div>
              </Col>
              <Col span="3" class="zvale-stepheader-box"> 导航独行
              </Col>
              <Col span="3" class="zvale-stepheader-box">
              <Icon class="zvale-stepheader-icon" type="checkmark-round" :color="selectHeaderIcon('header-one')"></Icon>
              </Col>
            </Row>
          </li>
        </ul>
        <!-- 编辑模型 -->
        <div v-show="currentStep===2">
          <div v-if="headerInfo.type" :is="headerInfo.type" :headerInfo="headerInfo"></div>
          <Form class="zvale-step-form" label-position="left" :label-width="100">
            <FormItem label="背景颜色" required>
              <Input v-model="headerInfo.background" placeholder="Enter you model background"></Input>
            </FormItem>
            <FormItem label="logo类型">
              <Input v-model="headerInfo.background" placeholder="Enter you model background"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <div class="zvale-step-btn">
      <Button v-if="currentStep !== 0 && currentStep !==3" @click="currentStep--" type="primary" size="large">上一步</Button>
      <Button v-if="currentStep !== 2 && currentStep !== 3" @click="nextStep" type="primary" size="large">下一步</Button>
      <Button v-else-if="currentStep !== 3" type="primary" @click="submitHeaderInfo" size="large">创建</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentStep: 0,
      stepTitle: [
        '模型的名称及描述',
        '选择基础模型',
        '定义模型样式',
        '创建成功'
      ],
      headerInfo: {
        name: '',
        description: '',
        type: 'header-normal',
        background: '#8BC34A',
        logoType: 'image',
        logoContent: '../../../../../static/images/logo-min.png',
        color: '#DCEDC8',
        activeNavType: 'border',
        activeNavColor: '#fff',
        activeNavOtherColor: '#fff'
      }
    }
  },
  methods: {
    selectHeaderIcon(index) {
      return this.headerInfo.type === index ? '#666' : ''
    },
    selectHeader(type) {
      this.headerInfo.type = type
    },
    nextStep() {
      if (this.currentStep === 0 && !this.checkInput([this.headerInfo.name])) {
        return
      }
      this.currentStep++
    },
    submitHeaderInfo() {
      this.currentStep++
    },
    checkInput(array) {
      if (!array || !array.length) return
      for (let i = 0; i < array.length; i++) {
        if (!array[i]) {
          this.$Message.error('请完善输入必填项。')
          return false
        }
      }
      return true
    }
  },
  components: {
    'header-normal': resolve => {
      require(['./normal.vue'], resolve)
    }
  }
}
</script>

<style scoped>
.zvale-step-content {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.zvale-step-content h2 {
  line-height: 2;
}
.zvale-step-form {
  padding: 10px;
}
.zvale-step-btn {
  padding-top: 10px;
  text-align: center;
}
.zvale-stepheader-ul li {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.zvale-stepheader-ul li:hover {
  box-shadow: 0 0 3px #666;
}
.zvale-stepheader-box {
  line-height: 60px;
  font-size: 16px;
  text-align: center;
  border-left: 1px solid #ccc;
}
.zvale-stepheader-icon {
  vertical-align: middle;
  font-size: 40px;
  color: #ededed;
}
</style>

