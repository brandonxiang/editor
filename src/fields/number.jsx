import React from 'react'
import { Popover,InputNumber,Form } from 'antd'
import Pop from './pop'
const FormItem = Form.Item;




/*** Number fields with support for min, max and units and documentation*/
class NumberField extends React.Component {
	static propTypes = {
		onChange: React.PropTypes.func.isRequired,
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.number,
		default: React.PropTypes.number,
		unit: React.PropTypes.string,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		doc: React.PropTypes.string
	}
    
	state = {
		number: {
		value: this.props.value,
		},
	};

	onChange(e) {
		const value = parseFloat(e.target.value)
		/*TODO: we can do range validation already here?

		*/
		if(this.props.min && value < this.props.min) return this.props.onChange(this.props.min);
		if(this.props.max && value > this.props.max) return this.props.onChange(this.props.max);
		this.props.onChange(value)
	}

	render() {
         const content = (
			<div>
				<p>Content</p>
				<p>Content</p>
			</div>
			);

        const number = this.state.number;

         
		const input = (<InputNumber
				min={this.props.min} 
				max={this.props.max}
				defaultValue={this.props.value}
				step={0.1}
				name={this.props.name}
				placeholder={this.props.default}
				onChange={this.onChange.bind(this)}
			/>)
		return <Pop
		 name={this.props.name}
		 content={content}
		 input={input}
		/>
	}
}

export default NumberField