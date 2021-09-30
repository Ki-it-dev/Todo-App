import html from "../library/core.js";
import { connect } from "../library/store.js"
function footer({ todos, filter, filters }) {
  return html`
    <footer>
      <div class="todosCount">
        <p>
          <span>${todos.filter(filters.active).length}</span>
          items left
        </p>
      </div>
      <div class="filter">
        <ul>
          ${Object.keys(filters).map(type => html`
            <li>
              <span 
                class="${filter === type && 'selected'}"
                onclick="dispatch('switchFilter','${type}')"
              >
                ${type[0].toUpperCase() + type.slice(1)}
              </span>
            </li>
          `)}
        </ul>
      </div>
      ${todos.filter(filters.completed).length > 0 && html `
        <div 
          class="clearCompleted"
          onclick="dispatch('clearCompleted')"
        >
          <p>Clear Completed</p>
        </div>
      `}
    </footer>
    `
}

export default connect()(footer)