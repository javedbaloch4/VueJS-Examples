let Preview = {
	props: [
		'text'
	],
	template: `
		<div class="editor__preview" v-html="markdownText"></div>
	`,

	computed: {
		markdownText() {

			return marked(this.text, {sentize: true})

		}
	}
}

let Editor = {

	components: {
		'preview': Preview
	},

	data( ){

		return {
			text: ''
		}
	},

	template: `
		<div class="editor">
			<textarea cols="30" rows="10" class="editor__input" v-model="text"></textarea>
			<preview :text="text"></preview>
		</div>
	`
}

let app = new Vue({

	el: "#app",
	components: {
		'editor': Editor
	}
});