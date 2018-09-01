<template>
  <div>
    <div ref="preview" class="preview">
      <pre class="err-msg">{{errMsg}}</pre>
    </div>
		<div>
			<component :is="componentName"></component>
		</div>
  </div>
</template>

<script >
let divId= `demo-preview-` + new Date().getTime()
const V = require('vue/dist/vue');
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import demo from './demo.vue'
export default {
	name: 'Preview',
	components: {demo},
  props: {
    codeStr: String
  },
  data(){
		return{
				tpl: '',
				js: '',
				style: '',
				component: null,
				errMsg: '',
				componentName: 'demo',
		}
	},
	methods: {
		run() {
			divId = this.cname()
			this.destoryPreview();
			this.renderPreview();
		},
		getTagTpl(tpl, tag){
			const reg = new RegExp('<' + tag + '[^>]*>');
			const regRes = tpl.match(reg);
			let res = '';
			return regRes
				? (res = regRes[0], tpl.slice(tpl.indexOf(res) + res.length, tpl.lastIndexOf(`</${tag}>`)))
				: res;
		},
		splitCodeStr(){
			this.tpl = `<div id="${divId}">${this.getTagTpl(this.codeStr, 'template')}</div>`;
      this.js = this.getTagTpl(this.codeStr, 'script').replace(/export default/, `return `);
      this.style = this.getTagTpl(this.codeStr, 'style');
		},
		cname(){
			return `demo-preview-` + new Date().getTime()
		},
		renderPreview() {
			try {
				this.splitCodeStr();
				if (this.tpl === '' || this.js === '') {
					return;
				}
				let e = new Function(this.js)();
				e.template = this.tpl
				let ext = V.extend(e);
				ext.use(ElementUI)


				// 使用全局组件的方式
				this.$newComponent(divId, ext)
				this.componentName = divId

				// 使用创建dom的方式
				// this.component = new ext().$mount()
				// this.$refs.preview.appendChild(this.component.$el)
				if ('' !== this.style) {
					this.style = this.style
						.replace(/[\r\n]/g, ' ').replace(/\s+/g, ' ')
						// .replace(/^(?:\s*)([^}|{])*(?={)/, ($1) => '#' + divId + ' ' + $1)
						// .replace(/(?<=[}|,])([^}|{])*(?={)/g, ($1) => '#' + divId + ' ' + $1)
						.replace(/^(\s*)([^}|{]*)({)/, `#${divId} $2 $3`)
						.replace(/([}|,])([^}|{]*)({)/g, `$1 #${divId} $2 $3`)
					const styleEle = document.createElement('style');
					styleEle.type = 'text/css';
					styleEle.id = 'preview-style';
					styleEle.innerHTML = this.style;
					document.getElementsByTagName('head')[0].appendChild(styleEle);
				}
			} catch (ex) {
					console.log(ex.message)
					let head = `[Vue warn]: Error in render: "`;
					let tail = `(found in <Root>)`;
					let msg = ex.message;
					let start = msg.indexOf(head) > -1? msg.indexOf(head) + length : 0;
					let end = msg.indexOf(tail) > -1? msg.indexOf(tail) : msg.length;
					this.errMsg = msg.slice(start, end);
					console.log(this.errMsg)
			}
		},
		destoryPreview() {
			// const styleEle = document.getElementById('preview-style');
			this.errMsg = ''
			// styleEle && styleEle.parentNode.removeChild(styleEle);
			// if (this.component !== null) {
			// 		this.$refs.preview.removeChild(this.component.$el);
			// 		this.component.$destroy();
			// 		this.component = null;
			// }
		}
	}
}
</script>

<style scoped lang="less">
  .err-msg {
    color: red;
    white-space: pre-wrap;
  }
</style>