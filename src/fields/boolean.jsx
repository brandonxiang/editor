import React from 'react'
import { Switch } from 'antd'
import Pop from './pop'

function onChange(checked) {
    console.log('switch to ${checked}');
}

class BooleanField extends React.Component{
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        default: React.PropTypes.number,
        doc: React.PropTypes.string,
   }

    render() {
          const content = (
			<div>
				<p>Content</p>
				<p>Content</p>
			</div>
			);

         const input = <Switch defaultChecked={false} onChange={onChange} />
     
         return <Pop
             name={this.props.name}
             content={content}
             input = {input}
             />
    }
}

export default BooleanField