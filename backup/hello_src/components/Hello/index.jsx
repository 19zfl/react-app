import {Component} from "react";
import hello from './index.module.css'

export default class Index extends Component {
    render() {
        return (
            <div>
                <h3 className={hello.title}>Hello React!</h3>
            </div>
        )
    }
}