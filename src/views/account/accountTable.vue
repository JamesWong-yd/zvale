<template>
  <div>
    <Row :gutter="20">
      <Col span="3">
      <div class="my-label">账户</div>
      </Col>
      <Col span="7">
      <Input v-model="params.account" @on-enter="searchData" clearable="clearable"></Input>
      </Col>
      <Col span="3">
      <div class="my-label">姓名</div>
      </Col>
      <Col span="7">
      <Input v-model="params.name" @on-enter="searchData" clearable="clearable"></Input>
      </Col>
      <Col span="4">
      <Button type="primary" @click="searchData">搜索</Button>
      </Col>
    </Row>
    <br>
    <Table :loading="loading" border size="small" :columns="columns" highlight-row @on-current-change="rowData" :data="listData"></Table>
    <div style="margin: 5px;padding:5px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" size="small" show-total show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/api/account'

export default {
  data() {
    return {
      loading: true,
      params: {
        account: '',
        name: '',
        limit: 10,
        page: 1
      },
      total: 0,
      columns: [
        {
          title: '账号',
          key: 'account',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '手机',
          key: 'phone',
          align: 'center'
        },
        {
          title: '状态',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            const text = params.row.state === 1 ? '生效' : '失效'
            let self = this
            return h('div', [
              h(
                'i-switch',
                {
                  props: {
                    type: 'primary',
                    size: 'large',
                    value: params.row.state === 1,
                    disabled: params.row.account === 'admin'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    'on-change': (value) => {
                      event.stopPropagation()
                      self.switchState(params.row, function(res) {
                        params.row.state = res.state
                      })
                    }
                  }
                },
                [
                  h('span', { slot: 'open', domProps: { innerHTML: '生效' } }),
                  h('span', { slot: 'close', domProps: { innerHTML: '失效' } })
                ]
              )
            ])
          }
        }
      ],
      listData: []
    }
  },
  created() {
    this._getAccountList(this, this.params)
  },
  methods: {
    _getAccountList: async (self, params) => {
      const res = await Account.getAccountList(params)
      self.listData = res.data
      self.total = res.count
      self.loading = false
    },
    pageChangeRender: function(page) {
      this.loading = true
      this.params.page = page
      this._getAccountList(this, this.params)
    },
    limitChangeRender: function(limit) {
      this.loading = true
      this.params.limit = limit
      this._getAccountList(this, this.params)
    },
    reloadRender: function() {
      this.loading = true
      this.params.account = ''
      this.params.name = ''
      this._getAccountList(this, this.params)
    },
    rowData: function(res) {
      this.$emit('selectData', res)
    },
    searchData: function() {
      this.loading = true
      this._getAccountList(this, this.params)
    },
    switchState: async function(req, callback) {
      let state = req.state === 1 ? 0 : 1
      const res = await Account.accountState({ id: req._id, state: state })
      if (res.status) {
        this.$Message.success(res.msg)
        callback(res.data)
      } else {
        this.$Message.error(res.msg)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-label {
  line-height: 32px;
  text-align: center;
}
</style>

