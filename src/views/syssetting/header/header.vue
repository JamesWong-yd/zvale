<template>
  <div>
    <Card :bordered="false" dis-hover>
      <p slot="title">头部模型</p>
      <div @click="addHeaderModel" class="zvale-header-box" style="border:1px dashed #666;margin-bottom:20px">
        <Icon class="zvale-header-add" type="plus"></Icon>
      </div>
      <ul>
        <li v-for="(item, index) in headerInfo" :key="index" class="zvale-header-item">
          <h3>{{item.name}}</h3>
          <p>{{item.description}}</p>
          <div :is="item.type" :headerInfo="item" class="zvale-header-box">
          </div>
        </li>
      </ul>
      <Page :total="100" show-total></Page>
      <Spin size="large" fix v-if="formspinShow"></Spin>
      <Modal v-model="addModal"
             :mask-closable="false"
             :styles="{width:'90%',top: '20px'}"
             :closable="false"
             title="创建头部模型">
        <div v-if="addModal" :is="addModel"></div>
        <div slot="footer">
          <Button  type="primary" @click="addModalOk" size="large">关闭</Button>
        </div>
      </Modal>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formspinShow: true,
      addModal: false,
      addModel: 'addIndex',
      headerInfo: [
        {
          name: 'this is title',
          description:
            'I dont know what i said ,but i know here is description.',
          type: 'header-normal',
          background: '#ccc',
          logoType: 'text',
          logoContent: '666',
          color: '#fff',
          activeNavType: 'background', // border \ text \ background
          activeNavColor: '#896',
          activeNavOtherColor: '#aca'
        },
        {
          name: 'this is title',
          description:
            'I dont know what i said ,but i know here is description.',
          type: 'header-normal',
          background: '#fc1',
          logoType: 'text',
          logoContent: '666',
          color: '#fff',
          activeNavType: 'border', // border \ text \ background
          activeNavColor: 'red',
          activeNavOtherColor: '#dac'
        },
        {
          name: 'this is title',
          description:
            'I dont know what i said ,but i know here is description.',
          type: 'header-normal',
          background: '#ccc',
          logoType: 'text',
          logoContent: '23123',
          color: '#fff',
          activeNavType: 'text', // border \ text \ background
          activeNavColor: 'red',
          activeNavOtherColor: '#dac'
        }
      ]
    }
  },
  created() {
    this.formspinShow = false
  },
  methods: {
    addHeaderModel() {
      this.addModal = true
    },
    addModalOk() {
      this.addModal = false
    }
  },
  components: {
    'addIndex': resolve => {
      require(['./components/index.vue'], resolve)
    },
    'header-normal': resolve => {
      require(['../header/components/normal.vue'], resolve)
    }
  }
}
</script>

<style scoped>
.zvale-header-box {
  width: 100%;
  height: 60px;
  background: #ccc;
  text-align: center;
  cursor: pointer;
}
.zvale-header-add {
  margin-top: 5px;
  color: #fff;
  font-size: 50px;
  text-align: center;
}
.zvale-header-item:first-child {
  border-top: 1px solid #ccc;
}
.zvale-header-item {
  position: relative;
  padding: 10px 0;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;
}
.zvale-header-item p {
  color: #888;
}
</style>
