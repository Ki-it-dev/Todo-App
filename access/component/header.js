import html from "../library/core.js";
import { connect } from "../library/store.js"

function header({todos,filters}) {
    return html`
        <header>
          <div class="flexSpaceBetween">
            <h1 class="titleHeader">todo</h1>
            <div class="themeIcon"></div>
          </div>
          <div class="todoMain">
            <input 
              type="checkbox"    
              class="toggle-all" 
              id="toggle-all" 
              hidden
              onchange="dispatch('toggleAll',this.checked)"
              ${todos.every(filters.completed) && 'checked'}
            >
            <label for="toggle-all"></label>
            <input type="text" 
              class="newTodo" 
              placeholder="Create a new todo..." 
              autofocus
              onkeyup="event.keyCode === 13 && dispatch('add',this.value.trim())"
            >
          </div>
        </header>
    `
}

export default connect()(header)