<template>
  <div>
    <Row :gutter="16">
      <Col span="16">
      <Card :bordered="false">
        <p slot="title">消息管理列表</p>
        <message-table ref="messageTable" @selectData="selectDataId"></message-table>
      </Card>
      </Col>
      <Col span="8">
      <Card :bordered="false">
        <p slot="title">管理消息</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem>
            <RadioGroup v-model="handleButton" type="button">
              <Radio label="1">发送消息</Radio>
              <Radio label="0" :disabled="!msgLook">查看消息</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" :readonly="handleButton==='0'" placeholder="Enter your title"></Input>
          </FormItem>
          <FormItem label="类型" prop="type">
            <Input v-model="formValidate.type" :readonly="handleButton==='0'" placeholder="Enter your type"></Input>
          </FormItem>
          <FormItem label="发送时间" prop="sendDate">
            <DatePicker v-model="formValidate.sendDate" :readonly="handleButton==='0'" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
            <Checkbox style="margin-left:20px;" :value="sendInTimeChecked" :disabled="handleButton==='0'" @on-change="sendInTime">
              <span>立即发送</span>
            </Checkbox>
          </FormItem>
          <FormItem label="消息内容" prop="content">
            <Input v-model="formValidate.content" :readonly="handleButton==='0'" type="textarea" :autosize="{minRows: 4}" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="接收人员" prop="receiver">
            <div v-if="handleButton==='1'">
              <Select v-model="formValidate.receiver" filterable multiple>
                <Option v-for="item in accountList" :value="item._id" :key="item._id">{{ item.name }}</Option>
              </Select>
              <Checkbox :value="allReceiverChecked" @on-change="sendAllCount">
                <span>所有用户
                  <strong style="color:red">（注意：取消勾选所有用户时将会清空所有选择人员）</strong>
                </span>
              </Checkbox>
            </div>
            <div v-else>
              <Input v-model="msgLookReceiver" readonly="readonly" type="textarea" :autosize="{minRows: 2}" placeholder="Enter something..."></Input>
            </div>
          </FormItem>
          <FormItem v-if="handleButton==='0'" label="创建时间">
            <Input v-model="formValidate.createTime" readonly="readonly" ></Input>
          </FormItem>
          <FormItem>
            <Button :disabled="handleButton==='0'" type="primary" @click="handleSubmit('formValidate')">发送</Button>
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
import Message from '@/api/message'

export default {
  name: 'msgManage_index',
  data() {
    return {
      handleButton: '1',
      msgLook: false,
      sendInTimeChecked: false,
      allReceiverChecked: false,
      msgLookReceiver: '',
      formValidate: {
        title: '',
        type: '',
        sendDate: {type:Date, default: ''},
        receiver: [],
        content: ''
      },
      accountList: [],
      ruleValidate: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' },
        type: { required: true, message: '类型不能为空', trigger: 'blur' },
        sendDate: { required: true, message: '发送时间不能为空' },
        content: { required: true, message: '内容不能为空', trigger: 'blur' },
        receiver: { required: true, message: '接收者不能为空' },
      }
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
    _AddMessage: async function (req){
      const res = await Message.addMessage(req)
      if(res.status){
        this.$Message.success(res.msg)
        this.$refs.messageTable.reloadRender()
        this.handleReset('formValidate')
      }
    },
    sendInTime(value) {
      this.formValidate.sendDate = value ? new Date() : ''
      this.sendInTimeChecked = value
    },
    sendAllCount(value){
      this.formValidate.receiver = []
      this.allReceiverChecked = value
      if(value){
        for (const key in this.accountList) {
          this.formValidate.receiver.push(this.accountList[key]._id)
        }
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this._AddMessage(this.formValidate)
        } else {
          this.$Message.error('请正确填写信息')
        }
      })
    },
    handleReset(name) {
      this.allReceiverChecked = false
      this.sendInTimeChecked = false
      this.msgLook = false
      this.handleButton = '1'
      this.$refs[name].resetFields()
    },
    selectDataId: async function(data) {
      const res = await Message.getMessage(data._id)
      this.formValidate = res.data
      this.receiverRender(res.data.receiver)
      this.handleButton = '0'
      this.msgLook = true
    },
    receiverRender: function(data){
      this.msgLookReceiver = ''
      this.formValidate.receiver = []
      for (const key in data) {
        this.msgLookReceiver+= `${data[key].name}、`
        this.formValidate.receiver.push(data[key]._id)
      }
    }
  },
  components: {
    messageTable: resolve => {
      require(['@/views/message/component/messageTable'], resolve)
    }
  }
}
</script>

