import { Component } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default class CustomNavLink extends Component {
    render() {
        return (
            <NavLink activeClassName='customLight' className="list-group-item" {...this.props}/>
        )
    }
}