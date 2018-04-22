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
          <li v-for="(modelitem, index) in headerBaseModel" :key="index" @click="selectHeader(modelitem.type)">
            <Row>
              <Col span="18">
              <div :is="modelitem.type" :headerInfo="headerInfo"></div>
              </Col>
              <Col span="3" class="zvale-stepheader-box"> {{modelitem.title}}
              </Col>
              <Col span="3" class="zvale-stepheader-box">
              <Icon class="zvale-stepheader-icon" type="checkmark-round" :color="selectHeaderIcon(modelitem.type)"></Icon>
              </Col>
            </Row>
          </li>
        </ul>
        <!-- 编辑模型 -->
        <div v-show="currentStep===2">
          <div style="margin:10px 0;" v-if="headerInfo.type" :is="headerInfo.type" :headerInfo="headerInfo"></div>
          <Form style="border-top:1px solid #ccc" class="zvale-step-form" label-position="left" :label-width="100">
            <Row>
              <Col span="6">
              <FormItem label="背景颜色">
                <ColorPicker v-model="headerInfo.background" size="large" />
                <Input v-model="headerInfo.background" size="large" placeholder="" style="width:80px;"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="导航字体颜色">
                <ColorPicker v-model="headerInfo.color" size="large" />
                <Input v-model="headerInfo.color" size="large" placeholder="" style="width:80px;"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="选中字体颜色">
                <ColorPicker v-model="headerInfo.activeNavColor" size="large" />
                <Input v-model="headerInfo.activeNavColor" size="large" placeholder="" style="width:80px;"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="选中样式颜色">
                <ColorPicker v-model="headerInfo.activeNavOtherColor" size="large" />
                <Input v-model="headerInfo.activeNavOtherColor" size="large" placeholder="" style="width:80px;"></Input>
              </FormItem>
              </Col>
            </Row>
            <FormItem label="导航选中模式">
              <RadioGroup v-model="headerInfo.activeNavType" type="button">
                <Radio label="border">
                  <span>下划线</span>
                </Radio>
                <Radio label="background">
                  <span>背景</span>
                </Radio>
                <Radio label="text">
                  <span>仅文字</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="logo类型">
              <RadioGroup @on-change="selectTypeChange" v-model="headerInfo.logoType" type="button">
                <Radio label="image">
                  <span>图片</span>
                </Radio>
                <Radio label="text">
                  <span>文字</span>
                </Radio>
              </RadioGroup>
              <div v-if="headerInfo.logoType==='image'">
                <p>请上传图片：</p>
                <Upload :action="fileUrl" :show-upload-list="false" :headers="authorization" accept="image/jpg, image/jpeg, image/png" :format="['jpg','jpeg','png']" :on-success="fileUpload" :on-progress="fileUploadBefore">
                  <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                </Upload>
                <p>或者填入资源路径</p>
                <Input v-model="newUploadUrl" @on-blur="urltoLogocontent" size="large" placeholder="" style="width:300px;"></Input>
              </div>
              <div v-else>
                <p>请输入LOGO名称：</p>
                <Input v-model="headerInfo.logoContent" size="large" placeholder="" style="width:100px;"></Input>
              </div>
            </FormItem>
          </Form>
        </div>
        <div v-show="currentStep===3">
          <div class="zvale-stepheader-success">
            <!-- <div :is="headerInfo.type" :headerInfo="headerInfo"></div> -->
            <p style="margin-top:20px">创建成功，你可以在基础配置选择使用这个模型</p>
          </div>
        </div>
      </div>
    </div>
    <div class="zvale-step-btn">
      <Button v-if="currentStep !== 0 && currentStep !==3" @click="currentStep--" type="primary" size="large">上一步</Button>
      <Button v-if="currentStep !== 2 && currentStep !== 3" @click="nextStep" type="primary" size="large">下一步</Button>
      <Button v-else-if="currentStep !== 3" type="primary" @click="submitHeaderInfo" size="large">创建</Button>
    </div>
    <Spin size="large" fix v-if="formspinShow"></Spin>
  </div>
</template>
<script>
import service from '@/api/service'
import { addHeaderModel } from '@/api/syssetting'

export default {
  data() {
    return {
      submitflag: false,
      formspinShow: false,
      currentStep: 0,
      fileUrl: service + 'upload',
      newUploadUrl: '',
      authorization: {
        Authorization: localStorage._rma
      },
      uploadFileurl: '',
      uploadLogotext: '',
      stepTitle: [
        '模型的名称及描述',
        '选择基础模型',
        '定义模型样式',
        '创建成功'
      ],
      headerBaseModel: [
        {
          type: 'header-normal',
          title: 'LOGO导航同行'
        }
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
        activeNavColor: '#FFFFFF',
        activeNavOtherColor: '#FFFFFF'
      }
    }
  },
  methods: {
    _addHeaderModel: async function(req) {
      const res = await addHeaderModel(req)
      this.formspinShow = false
      if (res.status) {
        this.currentStep++
        this.$Message.success(res.msg)
      } else {
        this.$Message.error(res.msg)
      }
    },
    selectHeaderIcon(index) {
      return this.headerInfo.type === index ? '#666' : ''
    },
    selectHeader(type) {
      this.headerInfo.type = type
    },
    selectTypeChange(res) {
      if (res === 'image') {
        this.uploadLogotext = this.headerInfo.logoContent
        this.headerInfo.logoContent = this.uploadFileurl
      } else {
        this.uploadFileurl = this.headerInfo.logoContent
        this.headerInfo.logoContent = this.uploadLogotext
      }
    },
    nextStep() {
      if (this.currentStep === 0 && !this.checkInput([this.headerInfo.name])) {
        return
      }
      if (this.currentStep === 1 && !this.checkInput([this.headerInfo.type])) {
        return
      }
      this.currentStep++
    },
    fileUploadBefore() {
      this.formspinShow = true
    },
    fileUpload(response, file, fileList) {
      this.formspinShow = false
      if (response.status) {
        this.$Message.success(response.msg)
        this.headerInfo.logoContent =
          service.replace(/\/bm\//, '') + response.data.path
        this.newUploadUrl = response.data.path
      } else {
        this.$Message.success(response.msg)
      }
    },
    urltoLogocontent() {
      this.headerInfo.logoContent =
        service.replace(/\/bm\//, '') + this.newUploadUrl
    },
    submitHeaderInfo() {
      this.formspinShow = true
      if (this.headerInfo.logoType === 'image') {
        this.headerInfo.newUploadUrl = this.newUploadUrl
      }
      // 提交
      this._addHeaderModel(this.headerInfo)
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
.zvale-stepheader-success{
  padding: 30px 0;
  font-size: 20px;
  text-align: center;
}
</style>

