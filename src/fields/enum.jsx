import React from 'react'
import { Select} from 'antd'
import Pop from './pop'
const Option = Select.Option;


class EnumField extends React.Component {
	static propTypes = {
    onChange: React.PropTypes.func.isRequired,
		name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    allowedValues: React.PropTypes.array.isRequired,
    doc: React.PropTypes.string,
  }

	onChange(e) {
		return this.props.onChange(e.target.value)
	}

	render() {
     const content = (
			<div>
				<p>Content</p>
				<p>Content</p>
			</div>
			);
    
		
    const defaultValue  = this.props.value||null;
		

		const options = this.props.allowedValues.map(val => {
			return <Option key={val} value={val}>{val}</Option>
		})

		const input = (<Select 
				defaultValue={defaultValue}
				onChange={this.onChange.bind(this)}
			>
				{options}
			</Select>)

		return <Pop
		 name={this.props.name}
		 content={content}
		 input={input}
		/>



	}
}

export default EnumField
