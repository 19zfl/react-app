import { Component } from "react";
import { Button } from 'antd';

export default class App extends Component {
    render() {
        return (
            <div>
                App...
                <button>按钮</button>
                <Button type="primary">Primary Button</Button>
            </div>
        )
    }
}