import { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home"; // Home是路由组件
import About from "./pages/About"; // About是路由组件
import Header from './components/Header' // Header是一般组件
import CustomNavLink from "./components/CustomNavLink";

export default class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <Header/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/*原生html中，靠a标签跳转不同的页面*/}
                            {/*<a className="list-group-item active" href="./About.html">About</a>
                            <a className="list-group-item" href="./Home.html">Home</a>*/}
                            {/*在React中这个靠路由链接实现切换组件---编写路由链接*/}
                            <CustomNavLink replace to='/home'>Home</CustomNavLink>
                            <CustomNavLink replace to='/about/a/b'>About</CustomNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/about" component={About} />
                                    <Redirect to='/about' />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}