import { createStore } from "vuex";
import { todosModule } from "./modules/todosModule";
import { authModule } from "./modules/authModule";
import { currentTodoModule} from "./modules/currentTodoModule";

export const store = createStore({
    modules:{currentTodoModule:currentTodoModule,todosModule:todosModule,authModule}
})
       