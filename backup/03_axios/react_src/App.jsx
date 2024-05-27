import {Component} from "react";
import axios from "axios";

export default class App extends Component {
    getStuList=()=>{
        axios.get("http://localhost:3000/api1/students").then(
            res => {
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }
    getCarList=()=>{
        axios.get("http://localhost:3000/api2/cars").then(
            res => {
                console.log(res)
            },
            error => {
                console.log(error)
            }
        )
    }
    render() {
        return (
            <div>
                <button onClick={this.getStuList}>请求学生数据</button>
                <button onClick={this.getCarList}>请求汽车数据</button>
            </div>
        )
    }
}