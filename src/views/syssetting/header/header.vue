<template>
  <div>
    <Card :bordered="false" dis-hover>
      <p slot="title">头部模型</p>
      <div class="zvale-header-box" style="border:1px dashed #666;margin-bottom:20px">
        <Icon class="zvale-header-add" type="plus"></Icon>
      </div>
      <ul>
        <li v-for="(item, index) in headerInfo" :key="index" class="zvale-header-item">
          <h3>标题</h3>
          <p>这是描述描述啊</p>
          <div :is="item.type" :headerInfo="item" class="zvale-header-box">
          </div>
        </li>
      </ul>
      <Page :total="100" show-total></Page>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerInfo: [
        {
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
  components: {
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
.zvale-header-item:first-child{
  border-top: 1px solid #ccc;
}
.zvale-header-item {
  position: relative;
  padding: 10px 0;
  margin: 5px 0 ;
  border-bottom: 1px solid #ccc; 
}
.zvale-header-item p {
  color: #888
}
</style>
