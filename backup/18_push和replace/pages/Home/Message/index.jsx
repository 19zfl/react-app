import {Component} from "react";
import {Link, Route} from "react-router-dom";
import Detail from "./Detail";

export default class Message extends Component {
    state = {
        msgInfo : [
            {id:'01', title:'message1'},
            {id:'02', title:'message2'},
            {id:'03', title:'message3'}
        ]
    }
    render() {
        const {msgInfo} = this.state
        return (
            <div>
                <ul>
                    {
                        msgInfo.map((msg) => {
                            return (
                                <li key={msg.id}>
                                    {/*  向路由组件中传递params参数  */}
                                    {/*<Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>*/}

                                    {/*  向路由组件中传递search参数  */}
                                    {/*<Link to={`/home/message/detail/?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link>*/}

                                    {/*  向路由组件中传递state参数  */}
                                    <Link replace to={{pathname:'/home/message/detail', state:{id:msg.id, title:msg.title}}}>{msg.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr/>
                {/*  声明接收params参数  */}
                {/*<Route path="/home/message/detail/:id/:title" component={Detail}/>  */}

                {/*  search参数无需接收,正常注册路由即可  */}
                {/*<Route path="/home/message/detail" component={Detail}/>*/}

                {/*  state参数无需接收,正常注册路由即可 */}
                <Route path="/home/message/detail" component={Detail}/>
            </div>
        )
    }
}