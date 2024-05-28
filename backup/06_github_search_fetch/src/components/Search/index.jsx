import {Component, useLayoutEffect} from "react";
import PubSub from 'pubsub-js'
import axios from "axios";

export default class Search extends Component {
    searchGithub = async() => {
        // 获取用户的输入（连续解构赋值+重命名）
        // const {value} = this.keyWordNode
        const {keyWordNode:{value}} = this
        // 更新状态，开启加载展示
        PubSub.publish('list', ({isFirst:false, isLoading:true}))
        // 发送网络请求--axios发送
        /*axios.get(`https://api.github.com/search/users?q=${value}`).then(
            res => {
                // 更新状态，关闭加载展示，保存响应数据
                PubSub.publish('list', {isLoading:false, users:res.data.items})
            },
            error => {
                // 更新状态，关闭加载展示，保存错误信息
                PubSub.publish('list', {isLoading:false, err:error.message})
            }
        )*/
        // 发送网络请求--fetch发送
        // 未优化的版本:需要删除async关键字
        /*fetch('/api/users').then((res) => {
            return res.json()
        }).then((res => {
            PubSub.publish('list', {isLoading:false, users:res})
        })).catch((err) => {
            PubSub.publish('list', {isLoading:false, err:err.message})
        })*/
        // 优化的版本:使用了async关键字
        try {
            const res = await fetch('/api/users')
            const data = await res.json()
            PubSub.publish('list', {isLoading:false, users:data})
        } catch (error) {
            PubSub.publish('list', {isLoading:false, err:error.message})
        }
        
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