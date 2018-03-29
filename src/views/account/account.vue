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
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="账号" prop="account">
            <Input v-model="formValidate.account" placeholder="Enter your account"></Input>
          </FormItem>
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="密码" prop="pwd">
            <Input type="password" v-model="formValidate.pwd" @on-blur="validateREPWD" placeholder="Enter your password"></Input>
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
            <Button type="primary" @click="handleSubmit('formValidate')">创建用户</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
  data() {
    return {
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
        account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        pwd: [
          {
            required: true,
            pattern: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
            message:
              '密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符',
            trigger: 'blur'
          }
        ],
        repwd: [
          { required: true, message: '两次密码输入不一致', trigger: 'blur' }
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
      }
    }
  },
  methods: {
    _addAccount: async function(req) {
      const res = await Account.addAccount(req)
      if(res.status){
        this.accountTableReload()
        this.$Message.success('创建成功')
        // this.handleReset('formValidate')
      }
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
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    selectDataId(res) {
      console.log(res)
    },
    validateREPWD() {
      this.ruleValidate.repwd[0].pattern = this.formValidate.pwd
    },
    // 刷新表格
    accountTableReload() {
      this.$refs.accountTable.reloadRender()
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

