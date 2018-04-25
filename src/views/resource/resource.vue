<template>
  <div>
    <Card :bordered="false">
      <p slot="title">日志审计模块</p>
      <Row :gutter="20">
        <Col span="3">
        <div class="my-label">原文件名</div>
        </Col>
        <Col span="7">
        <Input v-model="params.originalname" @on-enter="searchData" clearable="clearable"></Input>
        </Col>
        <Col span="3">
        <div class="my-label">文件类型</div>
        </Col>
        <Col span="7">
        <Select v-model="params.mimetype">
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
import Resource from '@/api/resource'
import Moment from 'moment'

export default {
  data() {
    return {
      loading: true,
      sendDate: '',
      params: {
        limit: 10,
        page: 1,
        mimetype: '',
        originalname: ''
      },
      logtype: [
        { value: '', label: '(无)' },
        { value: 'png', label: 'png' },
        { value: 'jpg', label: 'jpg' },
        { value: 'jpeg', label: 'jpeg' }
      ],
      total: 0,
      listData: [],
      columns: [
        {
          title: '文件名',
          key: 'filename',
          align: 'center'
        },
        {
          title: '原文件名',
          key: 'originalname',
          align: 'center'
        },
        {
          title: '类型',
          key: 'mimetype',
          align: 'center'
        },
        {
          title: '大小',
          key: 'size',
          align: 'center'
        },
        {
          title: '资源路径',
          key: 'path',
          align: 'center'
        },
        {
          title: '上传者',
          align: 'center',
          render: (h, params) => {
            return params.row.author.name
          }
        },
        {
          title: '上传时间',
          align: 'center',
          render: (h, params) => {
            return Moment(params.row.createTime).format('YYYY-MM-DD HH:mm:ss')
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
                      self.removeMessage(params.row)
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
    this._getResource(this.params)
  },
  methods: {
    _getResource: async function(params) {
      this.loading = true
      const res = await Resource.getResource(params)
      this.listData = res.data
      this.total = res.count
      this.loading = false
    },
    pageChangeRender: function(page) {
      this.params.page = page
      this._getResource(this.params)
    },
    limitChangeRender: function(limit) {
      this.params.limit = limit
      this._getResource(this.params)
    },
    searchData: function() {
      this._getResource(this.params)
    },
    removeMessage: async function(req) {
      const res = await Resource.deleteResource(req._id)
      if (res.status) {
        this.$Message.success('删除成功')
        this._getResource(this.params)
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
