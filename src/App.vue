<template>
  <div id="app">
    <header class="header">
      <div class="logo">
        <img alt="Vue logo" src="./assets/logo.png" />
        <span class="title">Vue-Element-Run</span>
      </div>
      <ul class="nav">
        <li>
          <a class="nav-link contribute" @click="run">
            <!-- <i class="icon iconfont icon-kuaisuyunxing01"></i>  -->
            运行</a>
        </li>
      </ul>
    </header>
    <div class="main">
      <div class="item">
        <Editor :code.sync="codeStr"></Editor>
      </div>
      <div class="item">
        <Preview :codeStr="codeStr" ref="previewComp"></Preview>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import './assets/style/reset.css';
export default {
  name: 'app',
  components: {Editor, Preview},
  data(){
    return {
      codeStr: `<template>
  <div>
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello, Vue!'
      }
    },
    methods: {
    }
  }
<\/script>
  
<style>
  div{
    color: red;
  }
</style>
`,
    }
  },
  methods: {
    run(){
      this.$refs.previewComp.run()
    }
  },
  mounted(){
    this.run()
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  .header {
    top: 0;
    left: 0;
    /*width: 100%;*/
    height: 40px;
    background-color: #fff;
    z-index: 9;
    box-shadow: 0 0 2px rgba(0,0,0,0.25);
    padding: 5px 20px;
    position: relative;
    .logo {
      display: inline-block;
      font-size: 18px;
      line-height: 40px;
      color: #2c3e50;
      font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
      font-weight: 500;
      img {
        vertical-align: middle;
        margin-right: 6px;
        width: 30px;
        height: 30px;
      }
    }
    .nav {
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: absolute;
      left: 250px;
      top: 10px;
      height: 40px;
      line-height: 30px;
      li {
        display: inline-block;
        position: relative;
        margin: 0 0.6em;
        .nav-link{
          padding-bottom: 3px;
          white-space: nowrap;
          font-size: 15px;
          cursor: pointer;
          
          &:hover {
            color: #0086b3;
          }
        }
        .contribute {
          margin-left: 10px;
          width: 60px;
          height: 30px;
          line-height: 30px;
          display: block;
          text-align: center;
          border: 1px solid green;
          border-radius: 10px;
          font-size: 16px;
          padding: 0;
        }
      }
    }
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 10px;
    position: relative;
    div.item {
      min-width: 300px;
      flex-grow: 1;
      padding: 5px 10px;
      overflow: scroll;
      @media (min-width: 600px){
        max-width: calc(50% - 10px);
        height: calc(100vh - 80px);
        &:not(:last-of-type) {
          border-right: 1px solid #e9e9e9;
        }
      }
      @media (max-width: 600px){
        &:not(:last-of-type) {
          border-bottom: 1px solid #e9e9e9;
        }
        &:last-of-type {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
