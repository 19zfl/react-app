import {Component} from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
import './App.css'

export default class App extends Component {
    // 初始化状态
    state = {
        todos: [
            {id: "001", title: "买洗漱用品", completed: true},
            {id: "002", title: "逛街", completed: false},
            {id: "003", title: "买药", completed: false},
            {id: "004", title: "学React", completed: true},
        ]
    }
    // 保存todo的回调
    saveToDo = (newToDo) => {
        const newToDos = [newToDo, ...this.state.todos];
        this.setState({todos: newToDos})
    }
    // 更新todos的回调
    updateToDo = (id, completed) => {
        const {todos} = this.state;
        const newToDos = todos.map((todo) => {
            if (todo.id === id) {
                return {...todo, completed};
            } else {
                return todo
            }
        })
        this.setState({todos:newToDos})
    }
    // 删除todo的回调
    deleteToDo = (id) => {
        // const newToDos = [];
        // this.state.todos.map((todo) => {
        //     if (todo.id != id) {
        //         newToDos.push(todo)
        //     }
        // })
        const newToDos = this.state.todos.filter((todo) => {
            return todo.id !== id;
        })
        this.setState({todos:newToDos})
    }
    render() {
        const {todos} = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header saveToDo={this.saveToDo} />
                    <List todos={todos} updateToDo={this.updateToDo} deleteToDo={this.deleteToDo}/>
                    <Footer/>
                </div>
            </div>
        )
    }
}