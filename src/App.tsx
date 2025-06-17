import { BrowserRouter, Routes, Route } from "react-router";

import Todos from "./routes/todos";
import NewItem from "./routes/new-todo";
import { TodoContextProvider } from "./context/todo";

export default function App() {
  return (
    <TodoContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Todos />} />
          <Route path="/new" element={<NewItem />} />
        </Routes>
      </BrowserRouter>
    </TodoContextProvider>
  );
}
