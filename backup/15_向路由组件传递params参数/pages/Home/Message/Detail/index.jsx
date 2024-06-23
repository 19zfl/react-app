import {Component} from "react";

const dataDetail = [
    {id:'01', content:'hello msg1!'},
    {id:'02', content:'hello msg2!'},
    {id:'03', content:'hello msg3!'}
]
export default class Detail extends Component {
    render() {
        const {id, title} = this.props.match.params
        const findData = dataDetail.find((obj) => {
            return obj.id === id
        })
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findData.content}</li>
            </ul>
        )
    }
}