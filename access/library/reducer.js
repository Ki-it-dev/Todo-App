import storages from "../util/storage.js"

const init = {
    todos: storages.get(),
    filter: 'all',
    filters:{
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed,
    },
    editIndex: null,
    theme:{
        light: 1,
        dark: 2,
    }
}
//Theme
var theme = 1;
const body = document.querySelector('body')
const bgImageTop = document.querySelector('.bgImgHeader')

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
    },
    switchTheme(){
        theme++;
        switch(theme){
            case 2:
                body.classList.add('darkTheme');
                document.querySelector('.themeIcon').classList.add('dark');
                bgImageTop.style.background = 'url(./images/bg-desktop-dark.jpg)';
            break;
            
            case 3:
                theme = 1;
                body.classList.remove('darkTheme');
                document.querySelector('.themeIcon').classList.remove('dark');
                bgImageTop.style.background = 'url(./images/bg-desktop-light.jpg)';
            break;
        }
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state,...args)
    return state;
}