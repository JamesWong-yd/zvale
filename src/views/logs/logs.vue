<template>
  <div>
    <Card :bordered="false">
      <p slot="title">日志审计模块</p>
      <Row :gutter="20">
        <Col span="3">
        <div class="my-label">日志内容</div>
        </Col>
        <Col span="7">
        <Input v-model="params.content" @on-enter="searchData" clearable="clearable"></Input>
        </Col>
        <Col span="3">
        <div class="my-label">日志类型</div>
        </Col>
        <Col span="7">
        <Select v-model="params.type">
          <Option v-for="item in logtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="4">
        <Button type="primary" @click="searchData">搜索</Button>
        </Col>
      </Row>
      <br>
      <Table :loading="loading" border size="small" :columns="columns" highlight-row :data="listData"></Table>
      <div style="margin: 5px;padding:5px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" size="small" show-total show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Log from '@/api/logs'
import Moment from 'moment'

export default {
  data() {
    return {
      loading: true,
      sendDate: '',
      params: {
        limit: 10,
        page: 1,
        type: '',
        content: ''
      },
      logtype: [
        { value: '', label: '(无)' },
        { value: '登陆', label: '登陆' },
        { value: '创建', label: '创建' },
        { value: '修改', label: '修改' },
        { value: '删除', label: '删除' },
        { value: '绑定', label: '绑定' },
        { value: '解除绑定', label: '解除绑定' },
        { value: '发布', label: '发布' },
        { value: '同意', label: '同意' },
        { value: '拒绝', label: '拒绝' }
      ],
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
          title: '操作者',
          align: 'center',
          render: (h, params) => {
            return params.row.author.name
          }
        },
        {
          title: '内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '时间',
          align: 'center',
          render: (h, params) => {
            return Moment(params.row.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ]
    }
  },
  created() {
    this._getLogList(this.params)
  },
  methods: {
    _getLogList: async function(params) {
      this.loading = true
      const res = await Log.getLogList(params)
      this.listData = res.data
      this.total = res.count
      this.loading = false
    },
    pageChangeRender: function(page) {
      this.params.page = page
      this._getLogList(this.params)
    },
    limitChangeRender: function(limit) {
      this.params.limit = limit
      this._getLogList(this.params)
    },
    searchData: function() {
      this._getLogList(this.params)
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
