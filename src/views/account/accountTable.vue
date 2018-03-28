<template>
  <div>
    <Table :loading="loading" border size="small" :columns="columns" highlight-row @on-current-change="rowData" :data="listData"></Table>
    <div style="margin: 5px;padding:5px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" size="small" show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import account from '@/api/account'

export default {
  props: ['tableData'],
  data() {
    return {
      loading: true,
      params: {
        search: '',
        limit: 10,
        page: 1
      },
      total: 0,
      search: '',
      columns: [
        {
          title: '账号',
          key: 'firstName',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'lastName',
          align: 'center'
        },
        {
          title: '状态',
          key: 'email',
          align: 'center'
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
      const res = await account.getAccountList({
        search: params.search || '',
        limit: params.limit || 10,
        page: params.page || 1
      })
      self.listData = res.data
      self.total = res.count
      self.loading = false
    },
    pageChangeRender: function(page) {
      this.params.page = page
      this._getAccountList(this, this.params)
    },
    limitChangeRender: function(limit) {
      this.params.limit = limit
      this._getAccountList(this, this.params)
    },
    reloadRender: function (){
      this.search = '';
      this._getAccountList(this, this.params)
    },
    rowData: function(res) {
      this.$emit('selectData',res)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

