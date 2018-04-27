<template>
  <div>
    <Card :bordered="false" dis-hover>
      <p slot="title">尾部模型</p>
      <div @click="addHeaderModel" class="zvale-footer-box" style="border:1px dashed #666;margin-bottom:20px">
        <Icon class="zvale-footer-add" type="plus"></Icon>
      </div>
      <ul>
        <li v-for="(item, index) in footerInfo" :key="index" class="zvale-footer-item">
          <h3>{{item.name}}</h3>
          <p>{{item.description}}</p>
          <div :is="item.type" :footerInfo="item" class="zvale-footer-box">
          </div>
        </li>
      </ul>
      <Page :total="footermodelLength" @on-change="changePage" :page-size="limit" show-total></Page>
      <Spin size="large" fix v-if="formspinShow"></Spin>
      <Modal v-model="addModal" :mask-closable="false" :styles="{width:'90%',top: '20px'}" :closable="false" title="创建尾部模型">
        <div v-if="addModal" :is="addModel"></div>
        <div slot="footer">
          <Button type="primary" @click="addModalOk" size="large">关闭</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
import { getFooterModelList } from '@/api/syssetting'
export default {
  name: 'websetting_footer',
  data() {
    return {
      footermodelLength: 0,
      limit: 5,
      formspinShow: true,
      addModal: false,
      addModel: 'addIndex',
      footerInfo: []
    }
  },
  created() {
    this._getFooterModelList()
  },
  methods: {
    _getFooterModelList: async function(page) {
      this.formspinShow = true
      page = page || 1
      const res = await getFooterModelList({ page: page })
      if (res.status) {
        this.formspinShow = false
        this.footerInfo = res.data
        this.footermodelLength = res.count
      }
    },
    changePage(page) {
      this._getFooterModelList(page)
    },
    addHeaderModel() {
      this.addModal = true
    },
    addModalOk() {
      this._getFooterModelList(1)
      this.addModal = false
    }
  },
  components: {
    addIndex: resolve => {
      require(['./components/index.vue'], resolve)
    },
    'footer-normal': resolve => {
      require(['./components/normal.vue'], resolve)
    }
  }
}
</script>

<style scoped>
.zvale-footer-box {
  width: 100%;
  height: 60px;
  background: #ccc;
  text-align: center;
  cursor: pointer;
}
.zvale-footer-add {
  margin-top: 5px;
  color: #fff;
  font-size: 50px;
  text-align: center;
}
.zvale-footer-item:first-child {
  border-top: 1px solid #ccc;
}
.zvale-footer-item {
  position: relative;
  padding: 10px 0;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;
}
.zvale-footer-item p {
  color: #888;
}
</style>
