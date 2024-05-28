import {Component} from "react";
import Search from "./components/Search";
import List from "./components/List";

export default class App extends Component {

    state = {
        users: [],
        isLoading: false,
        isFirst: true,
        err: ''
    }

    updateState = (stateObj) => {
        this.setState(stateObj);
    }

    render() {
        return (
            <div className="container">
                <Search updateState={this.updateState}/>
                <List {...this.state}/>
            </div>
        )
    }
}