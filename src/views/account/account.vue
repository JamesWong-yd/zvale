<template>
  <div>
    <Row :gutter="16">
      <Col span="16">
      <Card :bordered="false">
        <p slot="title">用户列表</p>
        <account-table></account-table>
      </Card>
      </Col>
      <Col span="8">
      <Card :bordered="false">
        <p slot="title">用户详情</p>

      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
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

