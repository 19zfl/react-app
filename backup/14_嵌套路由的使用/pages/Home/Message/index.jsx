import {Component} from "react";

export default class Message extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <a href="/message1">message1</a>&nbsp;&nbsp;
                    </li>
                    <li>
                        <a href="/message2">message2</a>&nbsp;&nbsp;
                    </li>
                    <li>
                        <a href="/message3">message3</a>&nbsp;&nbsp;
                    </li>
                </ul>
            </div>
        )
    }
}