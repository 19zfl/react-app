import {Component} from "react";
import welcome from './index.module.css'

export default class Index extends Component {
    render() {
        return (
            <div>
                <h2 className={welcome.demo}>Welcome</h2>
            </div>
        )
    }
}