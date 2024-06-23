import {Component} from "react";
// import qs from 'querystringify'

const dataDetail = [
    {id:'01', content:'hello msg1!'},
    {id:'02', content:'hello msg2!'},
    {id:'03', content:'hello msg3!'}
]
export default class Detail extends Component {
    render() {
        console.log(this.props)

        // 接收params参数
        // const {id, title} = this.props.match.params

        // 接收search参数
        // const {search} = this.props.location
        // const {id, title} = qs.parse(search.slice(1))

        // 接收state参数
        const {id, title} = this.props.location.state || {}

        const findData = dataDetail.find((obj) => {
            return obj.id === id
        }) || {}
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findData.content}</li>
            </ul>
        )
    }
}