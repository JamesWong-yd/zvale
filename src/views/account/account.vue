<template>
  <div>
    <Row :gutter="16">
      <Col span="16">
      <Card :bordered="false">
        <p slot="title">用户列表</p>
        <account-table ref="accountTable" @selectData="selectDataId"></account-table>
      </Card>
      </Col>
      <Col span="8">
      <Card :bordered="false">
        <p slot="title">用户详情</p>
        <Form ref="formValidate" :model="formValidate" :rules="handleButton==='1' ? ruleValidate : editRuleValidate" :label-width="80">
          <FormItem>
            <RadioGroup v-model="handleButton" type="button">
              <Radio label="1">创建用户</Radio>
              <Radio label="0" :disabled="!this.editId">修改用户</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="账号" prop="account">
            <Input v-model="formValidate.account" placeholder="Enter your account"></Input>
          </FormItem>
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="密码" prop="pwd">
            <Input type="password" v-model="formValidate.pwd" placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem label="重复密码" prop="repwd">
            <Input type="password" v-model="formValidate.repwd" placeholder="Repeat enter your password"></Input>
          </FormItem>
          <FormItem label="状态" prop="state">
            <RadioGroup v-model="formValidate.state">
              <Radio label="1">生效</Radio>
              <Radio label="0">失效</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="Enter your phone"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
          </FormItem>
          <FormItem>
            <Button :disabled="handleButton==='0'" type="primary" @click="handleSubmit('formValidate')">创建</Button>
            <Button :disabled="handleButton==='1'" type="warning" @click="handleEdit('formValidate')">修改</Button>
            <Button type="ghost" @click="handleReset('formValidate')">清空</Button>
          </FormItem>
        </Form>
        <Spin size="large" fix v-if="formspinShow"></Spin>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Account from '@/api/account'

export default {
  data() {
    const validateAccount = async (rule, value, callback) => {
      if (!value) return callback(new Error('账号不能为空'))
      if (this.handleButton === '0' && value === this.editAccount) {
        return callback()
      } else {
        const res = await Account.accountValidate({ account: value })
        if (res.data.result) {
          return callback(new Error(res.msg))
        }
      }
    }
    const validePwd = (rule, value, callback) => {
      if (value !== this.formValidate.repwd && this.formValidate.repwd) {
        callback(new Error('两次输入密码不一致'))
      }
      if (this.formValidate.repwd) {
        this.$refs.formValidate.validateField('repwd')
      }
      callback()
    }
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.formValidate.pwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      handleButton: '1',
      editId: '',
      editAccount: '',
      formspinShow: false,
      formValidate: {
        account: '',
        name: '',
        pwd: '',
        repwd: '',
        phone: '',
        email: '',
        state: 1
      },
      ruleValidate: {
        account: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        pwd: [
          {
            required: true,
            pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
            message:
              '密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符',
            trigger: 'blur'
          },
          { validator: validePwd, trigger: 'blur' }
        ],
        repwd: [
          { required: true, validator: valideRePassword, trigger: 'blur' },
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        phone: [
          {
            pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        state: [{ required: true }]
      },
      editRuleValidate: {
        account: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        pwd: [
          {
            pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
            message:
              '密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符',
            trigger: 'blur'
          },
          { validator: validePwd, trigger: 'blur' }
        ],
        repwd: [{ validator: valideRePassword, trigger: 'blur' }],
        phone: [
          {
            pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ],
        email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        state: [{ required: true }]
      }
    }
  },
  methods: {
    _addAccount: async function(req) {
      this.formspinShow = true
      const res = await Account.addAccount(req)
      this.formspinShow = false
      if (res.status) this.submitInit(res.msg)
    },
    _editAccount: async function(req) {
      this.formspinShow = true
      const res = await Account.editAccount(req)
      this.formspinShow = false
      if (res.status) this.submitInit(res.msg)
    },
    submitInit (msg) {
      this.$Message.success(msg)
      this.$refs.accountTable.reloadRender()
      this.handleReset('formValidate')
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this._addAccount(this.formValidate)
        } else {
          this.$Message.error('请正确填写信息')
        }
      })
    },
    handleEdit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 传输用户信息
          let edata = this.formValidate
          edata.accountId = this.editId
          if (!this.formValidate.pwd) {
            delete edata.pwd
            delete edata.repwd
          }
          this._editAccount(edata)
        } else {
          this.$Message.error('请正确填写信息')
        }
      })
    },
    handleReset(name) {
      this.editId = ''
      this.handleButton = '1'
      this.editAccount = ''
      this.$refs[name].resetFields()
    },
    selectDataId: async function(res) {
      const editDate = await Account.getAccount(res._id)
      if (editDate.status) {
        this.editId = res._id
        this.editAccount = res.account
        this.handleButton = '0'
        this.formValidate = editDate.data
      } else {
        this.$Message.error('获取用户信息失败')
      }
    }
  },
  components: {
    accountTable: resolve => {
      require(['@/views/account/accountTable.vue'], resolve)
    }
  }
}
</script>

<style lang="stylus" scoped>
.zvale-card {
  padding-right: 5px;
  padding-left: 5px;
}
</style>

