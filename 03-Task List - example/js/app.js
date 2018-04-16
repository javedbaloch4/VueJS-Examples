let bus = new Vue();	

let Task = {

	props: [
		'task'
	],

	template: `

		<div class="task" :class="{ 'task--done': task.done }">

			{{ task.body }}

			<a href="" @click.prevent="toggleDone(task.id)">Mark as {{ task.done ? 'not done' : 'done' }}</a>
			<a href="" @click.prevent="deleteTask(task.id)">Delete</a>

		</div>
	`,

	methods: {

		toggleDone(taskId) {

			bus.$emit('task:toggleDone', taskId);

		},

		deleteTask(taskId) {
			bus.$emit('task:deleteTask', taskId);
		}

	}
}

let TaskForm = {

	data() {
		return {
			body: null
		}
	},

	template: `
	
		<div class="task-form">
			<form @submit.prevent="addTask">
				<textarea  cols="30" rows="7" v-model.trim="body"></textarea>
				<br />
				<button>Add task</button>
			</form>
		</div>

	`,

	methods :{
		addTask() {
			if (!this.body) {
				return
			}

			bus.$emit('task:added', {
				id: Date.now(),
				body: this.body,
				done: false
			});

			this.body = null

		}	
	}
}

let Tasks = {

	components: {
		'task': Task,
		'task-form': TaskForm
	},

	data() {
		return {
			tasks: []
		}
	},

	template: `
		<div class="tasks">

			<template v-if="tasks.length">
				<task v-for="task in tasks" :key="task.id" :task="task"></task>
			</template>
			<span v-else>No tasks</span>

			<task-form></task-form>

		</div>

	`,

	methods: {
		toggleDone (taskId) {
			
			let task = this.tasks.find((task) => {
				return task.id === taskId
			})


			task.done = !task.done

		},

		deleteTask (taskId) {
			
			this.tasks = this.tasks.filter((task) => {
				return task.id !== taskId
			})

		},



	},

	mounted() {

		bus.$on('task:toggleDone', (taskId) => {
			this.toggleDone(taskId)
		});

		bus.$on('task:deleteTask', (taskId) => {
			this.deleteTask(taskId)
		});

		bus.$on('task:added', (task) => {
			this.tasks.push(task)
		});

	}
}

let app = new Vue({
 	el: '#app',
 	components: {
 		'tasks': Tasks
 	}
 });