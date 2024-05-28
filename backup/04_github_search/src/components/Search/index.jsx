import {Component} from "react";
import axios from "axios";

export default class Search extends Component {
    search = () => {
        axios.get("/api/users").then(
            res => {
                this.props.saveUsers(res.data);
            },
            err => {
                console.log(err)
            }
        )
    }
    searchGithub = () => {
        const {keyWordNode:{value}} = this
        this.props.updateState({isFirst:false, isLoading:true})
        axios.get(`https://api.github.com/search/users?q=${value}`).then(
            res => {
                this.props.updateState({isLoading:false, users:res.data.items});
            },
            error => {
                this.props.updateState({isLoading:false, err:error.message})
            }
        )
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索Github用户</h3>
                <div>
                    <input ref={c => this.keyWordNode = c} type="text" placeholder="输入你要搜索的关键字"/>&nbsp;
                    <button onClick={this.searchGithub}>搜索</button>
                </div>
            </section>
        )
    }
}