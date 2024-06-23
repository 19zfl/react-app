import { Component } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import News from "./News";
import Message from "./Message";
import CustomNavLink from "../../components/CustomNavLink";

export default class Home extends Component {
    render() {
        return (
            <div className="col-xs-6">
                <div className="panel">
                    <div className="panel-body">
                        <div>
                            <h2>Home组件内容</h2>
                            <div>
                                <ul className="nav nav-tabs">
                                    <li>
                                        <CustomNavLink to='/home/news'>News</CustomNavLink>
                                    </li>
                                    <li>
                                        <CustomNavLink to='/home/message'>Message</CustomNavLink>
                                    </li>
                                </ul>
                                {/*注册路由*/}
                                <Switch>
                                    <Route path='/home/news' component={News}/>
                                    <Route path='/home/message' component={Message}/>
                                    <Redirect to='/home/news' />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}