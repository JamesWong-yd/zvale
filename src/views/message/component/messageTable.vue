<template>
  <div>
    <Row :gutter="20">
      <Col span="3">
        <div class="my-label">标题</div>
      </Col>
      <Col span="7">
        <Input v-model="params.title" @on-enter="searchData" clearable="clearable"></Input>
      </Col>
      <Col span="3">
        <div class="my-label">发送时间</div>
      </Col>
      <Col span="8">
        <DatePicker v-model="sendDate" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time(Excluding seconds)" style="width: 100%"></DatePicker>
      </Col>
      <Col span="3">
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
import Message from '@/api/message'
import Moment from 'moment'

export default {
  data() {
    return {
      loading: true,
      sendDate: '',
      params: {
        limit: 10,
        page: 1,
        title: '',
        sendDateStart: '',
        sendDateEnd: ''
      },
      total: 0,
      listData: [],
      columns: [
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '发送时间',
          align: 'center',
          render: (h, params) => {
            return Moment(params.row.sendDate).format("YYYY-MM-DD HH:mm:ss")
          }
        },
        {
          title: '发送人',
          align: 'center',
          render: (h, params) => {
            return params.row.author.name
          }
        },
        {
          title: '状态',
          align: 'center',
          render: (h, params) => {
            let idex = params.row.state
            let stateObj = {
              1: { text: '成功', color: '#2d8cf0' },
              0: { text: '已删除', color: '#ed3f14' }
            }
            return h(
              'span',
              { style: { color: stateObj[idex].color } },
              stateObj[idex].text
            )
          }
        },
        {
          title: '操作',
          align: 'center',
          width: '120px',
          render: (h, params) => {
            let self = this
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: params.row.state === 0
                  },
                  on: {
                    click: () => {
                      event.stopPropagation()
                      self.removeMessage(params.row, function(res) {
                        params.row.state =res.ok ? 0 : 1
                      })
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  created() {
    this._getMessageList(this.params)
  },
  methods: {
    _getMessageList: async function(params) {
      const res = await Message.getMessageList(params)
      this.listData = res.data
      this.total = res.count
      this.loading = false
    },
    pageChangeRender: function(page) {
      this.loading = true
      this.params.page = page
      this._getMessageList(this.params)
    },
    limitChangeRender: function(limit) {
      this.loading = true
      this.params.limit = limit
      this._getMessageList(this.params)
    },
    reloadRender: function() {
      this.loading = true
      this.params.title = ''
      this.params.sendDateStart = ''
      this.params.sendDateEnd = ''
      this._getMessageList(this.params)
    },
    rowData: function(res) {
      this.$emit('selectData', res)
    },
    searchData: function() {
      if(this.sendDate){
        this.params.sendDateStart = this.sendDate[0],
        this.params.sendDateEnd = this.sendDate[1]
      }
      this.loading = true
      this._getMessageList(this.params)
    },
    removeMessage: async function(req, callback) {
      const res = await Message.removeMessage({ id: req._id})
      if (res.status) {
        this.$Message.success('删除成功')
        callback(res.data)
      } else {
        this.$Message.error(res.msg)
      }
    }
  }
}
</script>

<style scoped>
.my-label {
  line-height: 32px;
  text-align: center;
}
</style>
