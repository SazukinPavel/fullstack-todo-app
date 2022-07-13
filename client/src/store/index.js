import { createStore } from "vuex";
import { todosModule } from "./modules/todosModule";
import { currentTodoModule} from "./modules/currentTodoModule";

export const store = createStore({
    modules:{currentTodoModule:currentTodoModule,todosModule:todosModule}
})
       