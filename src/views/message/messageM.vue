<template>
  <div>
    <Row :gutter="16">
      <Col span="16">
      <Card :bordered="false">
        <p slot="title">消息管理列表</p>
        <!-- <account-table ref="msgMTable" @selectData="selectDataId"></account-table> -->
      </Card>
      </Col>
      <Col span="8">
      <Card :bordered="false">
        <p slot="title">管理消息</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem>
            <RadioGroup v-model="handleButton" type="button">
              <Radio label="1">发送消息</Radio>
              <Radio label="0" :disabled="!this.msgLook">查看消息</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" :readonly="this.msgLook" placeholder="Enter your title"></Input>
          </FormItem>
          <FormItem label="类型" prop="type">
            <Input v-model="formValidate.type" :readonly="this.msgLook" placeholder="Enter your type"></Input>
          </FormItem>
          <FormItem label="发送时间" prop="sendDate">
            <DatePicker v-model="formValidate.sendDate" :readonly="this.msgLook" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
            <Checkbox style="margin-left:20px;" :disabled="this.msgLook" @on-change="sendInTime">
              <span>立即发送</span>
            </Checkbox>
          </FormItem>
          <FormItem label="消息内容" prop="content">
            <Input v-model="formValidate.content" :readonly="this.msgLook" type="textarea" :autosize="{minRows: 4}" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="接收人员" prop="receiver">
            <Select v-model="formValidate.receiver" filterable multiple>
              <Option v-for="item in accountList" :value="item._id" :key="item._id">{{ item.name }}</Option>
            </Select>
            <Checkbox :disabled="this.msgLook" @on-change="sendAllCount">
              <span>所有用户<strong style="color:red">（注意：一旦选取所有用户，将会清空所选择的人员）</strong></span>
            </Checkbox>
          </FormItem>
          <FormItem>
            <Button :disabled="handleButton==='0'" type="primary" @click="handleSubmit('formValidate')">创建</Button>
            <Button type="ghost" @click="handleReset('formValidate')">清空</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Account from '@/api/account'
export default {
  name: 'msgManage_index',
  data() {
    return {
      handleButton: '1',
      msgLook: false,
      formValidate: {
        title: '',
        type: '',
        sendDate: '',
        receiver: [],
        content: ''
      },
      accountList: [],
      ruleValidate: {}
    }
  },
  created() {
    this._getAccountList({ limit: 999999, state: 1 })
  },
  methods: {
    _getAccountList: async function (params) {
      const res = await Account.getAccountList(params)
      this.accountList = res.data
    },
    sendInTime(value) {
      this.formValidate.sendDate = value && !this.msgLook ? new Date() * 1 : ''
    },
    sendAllCount(value){
      this.formValidate.receiver = []
      if(value){
        for (const key in this.accountList) {
          this.formValidate.receiver.push(this.accountList[key]._id)
        }
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this._addAccount(this.formValidate)
        } else {
          this.$Message.error('请正确填写信息')
        }
      })
    },
    handleReset(name) {
      this.msgLook = false
      this.$refs[name].resetFields()
    },
  }
}
</script>

