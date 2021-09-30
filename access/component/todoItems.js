import html from "../library/core.js";
import { connect } from "../library/store.js"

function todoItems({todo,index,editIndex}) {
  return html`
  <li class="${editIndex === index && 'editing'}">
    <div class="view">
      <input 
        type="checkbox" 
        id="toggle-${todo.id}" 
        class="toggle" 
        hidden 
        ${todo.completed && 'checked'}
        onchange="dispatch('toggle',${index})"
      >
      <label 
        class="${todo.completed && 'completed'}"       for="toggle-${todo.id}"
        ondblclick="dispatch('startEdit',${index})"
      >
        ${todo.title}
      </label>
      <button class="delele" onclick="dispatch('delete',${index})" >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path fill="#494C6B" fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
        </svg>
      </button>
    </div>
    <input 
      class="edit" type="text" 
      value="${todo.title}" 
      onkeyup="event.keyCode === 13 && dispatch('saveNewTodo',this.value.trim()) || event.keyCode === 27 && dispatch('cancelEdit')"
      onblur="dispatch('saveNewTodo',this.value.trim())"
      autofocus
    >
  </li>
  `
}

export default connect()(todoItems)