import {Component} from "react";
import {PropTypes} from "prop-types";

export default class Footer extends Component {
    static propTypes = {
        todos:PropTypes.array,
        checkAllToDo: PropTypes.func.isRequired,
        clearCompletedToDos: PropTypes.func.isRequired,

    }
    handleCheckAll = (event) => {
        this.props.checkAllToDo(event.target.checked)
    }
    handleClearToDos = () => {
        this.props.clearCompletedToDos()
    }
    render() {
        // 总数
        const total = this.props.todos.length
        // 已完成个数
        const completedCount
            = this.props.todos.reduce((pre, current) => {
                return pre + (current.completed ? 1 : 0)
            }, 0)
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={total == completedCount && total !== 0 ? true : false} onChange={(e) => this.setState({todos: e.target.checked})}/>
                </label>
                <span>
                    <span>已完成{completedCount}</span>/全部{total}
                </span>
                <button onClick={this.handleClearToDos} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}