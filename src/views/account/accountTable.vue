<template>
  <div>
    <Table :loading="loading" border size="small" :columns="columns" highlight-row @on-current-change="rowData" :data="data1"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" size="small" show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'

export default {
  props: ['tableData'],
  data() {
    return {
      loading: true,
      total: 0,
      columns: [
        {
          title: 'Name',
          key: 'firstName',
          align: 'center'
        },
        {
          title: 'Age',
          key: 'lastName',
          align: 'center'
        },
        {
          title: 'Address',
          key: 'email',
          align: 'center'
        }
      ],
      data1: []
    }
  },
  created() {
    util
      .ajax({
        method: 'get',
        url: '/users',
        params: {page:1,limit:10}
      })
      .then(res => {
        this.data1 = res.data.data
        this.total = res.data.count
        this.loading = false
      })
  },
  methods: {
    pageChangeRender: function(page) {
      console.log(page)
    },
    limitChangeRender: function(limit) {
      console.log(limit)
    },
    rowData: function(res) {
      console.log(res)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

