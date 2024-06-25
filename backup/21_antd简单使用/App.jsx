import { Component } from "react";
import {Button, DatePicker, Dropdown, Space} from 'antd';
import {YoutubeFilled, AppleFilled, GithubFilled, SearchOutlined, DownOutlined} from '@ant-design/icons';
const { RangePicker } = DatePicker;

const items = [
    {
        label: 'right key : 1st menu item',
        key: '1',
    },
    {
        label: 'right key : 2nd menu item',
        key: '2',
    },
    {
        label: 'right key : 3rd menu item',
        key: '3',
    },
]
export default class App extends Component {
    onChange = (date, dateString) => {
        console.log(date, dateString)
    }
    onChangeRange = (start, end) => {
        console.log(start)
        console.log(end)
    }
    render() {
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <div style={{padding: "20px", border: "solid 1px"}}>
                    <h2>原生button</h2>
                    <button>按钮</button>
                </div>
                <div style={{padding: "20px", border: "solid 1px"}}>
                    <h2>antd-button</h2>
                    <Button type="primary">Primary Button</Button>
                    <Button type="link">Link Button</Button>
                    <Button type="default">Default Button</Button>
                </div>
                <div style={{padding: "20px", border: "solid 1px"}}>
                    <h2>antd-icon</h2>
                    <YoutubeFilled/>
                    <GithubFilled/>
                    <AppleFilled/>
                </div>
                <div style={{padding: "20px", border: "solid 1px"}}>
                    <h2>antd-button-icon</h2>
                    <Button type="primary" icon={<SearchOutlined/>}>
                        Search
                    </Button>
                </div>
                <div style={{padding: "20px", border: "solid 1px"}}>
                    <h2>antd-datePicker</h2>
                    <DatePicker onChange={this.onChange}/>
                    <RangePicker onChange={this.onChangeRange}/>
                </div>
                <div style={{padding: "20px", border: "solid 1px"}}>
                    <h2>antd-dropDown</h2>
                    <Dropdown menu={{ items }} trigger={['contextMenu']}>
                        <div
                            style={{
                                color: "#939393",
                                background: "#e3e3e3e3",
                                height: 200,
                                textAlign: 'center',
                                lineHeight: '200px',
                            }}
                        >Right Click on here
                        </div>
                    </Dropdown>
                </div>
            </div>
        )
    }
}