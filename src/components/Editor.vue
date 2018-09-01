<template>
  <codemirror
      :value="code"
      :options="cmOptions"
      @input="onCmCodeChange"
  ></codemirror>
</template>
<script >

// const {codemirror} = require('vue-codemirror');
import {codemirror} from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
export default {
	name: 'Editor',
	components: {codemirror},
  props: {
    code: String
  },
  data(){
		return {
			cmOptions: {
				// codemirror options
				tabSize: 2,
				mode: 'htmlmixed',
				// theme: 'base16-dark',
				lineNumbers: true,
				line: true,
				// more codemirror options, 更多 codemirror 的高级配置...
			},
			
		}
  },
  methods: {
		onCmCodeChange(val){
				this.$emit('update:code', val)
		}
  }
}
</script>
<style lang="less">
.vue-codemirror {
  position: relative;
  height: 100%;
}
.CodeMirror {
  /*border: 1px solid #eee;*/
  height: 100%;
}
.CodeMirror-scroll {
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>