import storages from "../util/storage.js"

const init = {
    todos: storages.get(),
    filter: 'all',
    filters:{
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null
}

const actions = {
    add({todos},title){
        if(title){
            let id = todos.length
            todos.push({id,title,completed:false})
            storages.set(todos)
        }
    },
    toggle({todos},index){
        const todo = todos[index]
        todo.completed = !todo.completed
        storages.set(todos)
    },
    toggleAll({todos},completed){
        todos.forEach(todo => todo.completed = completed)
        storages.set(todos)
    },
    delete({todos},index){
        todos.splice(index,1)
        storages.set(todos)
    },
    switchFilter(state,filter){
        state.filter = filter
    },
    clearCompleted(state){
        state.todos = state.todos.filter(state.filters.active)
        storages.set(state.todos)
    },
    startEdit(state,index){
        state.editIndex = index
    },
    saveNewTodo(state,title){
        if(state.editIndex !== null){
            if(title){
                state.todos[state.editIndex].title = title
                state.editIndex = null
            }else{
                this.delete(state,state.editIndex)
            }
            storages.set(state.todos)
        }
    },
    cancelEdit(state){
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state,...args)
    return state;
}