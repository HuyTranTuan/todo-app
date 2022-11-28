import React, {} from "react"
import TodoApp from "./component/Page/TodoApp/TodoApp";

import "./App.scss";
import 'antd/dist/antd.min.css'



const App = (props) =>{
  
  return (
    <div className="container">
      <TodoApp/>
    </div>
  );
}

export default App;

