import {Component} from "react";
import './index.css'

export default class Item extends Component {
    state = {
        mouse : false
    }
    // 鼠标移入移出事件的回调
    handleMouse = (flag) => {
        return()=>{
            this.setState({mouse:flag})
        }
    }
    // 点击checkbox事件的回调
    handleCheck = (id) => {
        return(event) => {
            this.props.updateToDo(id, event.target.checked)
        }
    }
    // 删除todo的回调
    handleDelete = (id) => {
        if (window.confirm('确认删除吗？')) {
            this.props.deleteToDo(id)
        }
    }
    render() {
        const {id, title, completed} = this.props
        const {mouse} = this.state
        return (
            <li
                style={{backgroundColor:mouse?'#ddd':'white'}}
                onMouseEnter={this.handleMouse(true)}
                onMouseLeave={this.handleMouse(false)}
            >
                <label>
                    <input
                        type="checkbox"
                        defaultChecked={completed}
                        onChange={this.handleCheck(id)}
                    />
                    <span>{title}</span>
                </label>
                <button
                    className="btn btn-danger"
                    style={{display:mouse?'block':'none'}}
                    onClick={() => this.handleDelete(id)}
                >删除</button>
            </li>
        )
    }
}