import html from "../library/core.js";
import { connect } from "../library/store.js";

import header from "./header.js";
import todoLists from "./todoLists.js"
import footer from "./footer.js"

function App({todos}) {
  return html`
    <div class="boardMain">
      ${header()}
      ${todos.length > 0 && todoLists()}
      ${todos.length > 0 && footer()}
    </div>
    `
}

export default connect()(App)