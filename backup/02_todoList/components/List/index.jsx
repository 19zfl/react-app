import {Component} from "react";
import {PropTypes} from "prop-types";
import Item from "../Item";
import './index.css';

export default class List extends Component {
    // 对props进行限制
    static propTypes = {
        todos: PropTypes.array.isRequired,
        updateToDo: PropTypes.func.isRequired,
        deleteToDo: PropTypes.func.isRequired,
    }
    render() {
        const {todos, updateToDo, deleteToDo} = this.props;
        return (
            <ul className="todo-main">
                {
                    todos.map(todo => (
                        <Item key={todo.id} {...todo} updateToDo={updateToDo} deleteToDo={deleteToDo} />
                    ))
                }
            </ul>
        )
    }
}