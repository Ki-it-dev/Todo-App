import html from "../library/core.js";
import {connect} from "../library/store.js"

import todoItems from "./todoItems.js"

function todoLists({todos,filter,filters}) {
  return html`
  <section class="content">
    <ul class="todoLists">
      ${todos
        .filter(filters[filter])
        .map((todo,index) => todoItems({todo,index}))
      }
    </ul>
  </section>
  `
}

export default connect()(todoLists)