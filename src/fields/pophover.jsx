import React from 'react'
import { Popover } from 'antd'

class PopHover extends React.Component{
    static propTypes ={
    }

    render (){
         const content = (
			<div>
				<p>Content</p>
				<p>Content</p>
			</div>
			);
        return <Popover content={content} title="Title" trigger="click">
           {this.props.input}
        </Popover>
    }
}

export default PopHover;