import React from 'react'
import inputStyle from './input.js'
import { Popover,InputNumber,Form } from 'antd'
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
    
    validatePrimeNumber = (number) =>{
	if (number<= this.props.max && number>= this.props.min) {
		return {
		validateStatus: 'success',
		errorMsg: null,
		};
	}
	return {
		validateStatus: 'error',
		errorMsg: 'The opacity is between 0 and 1!',
	};
	}

    handleNumberChange = (value) =>{
		this.setState({
			number:{
				...validatePrimeNumber(value),
				value,
			},
		});
	}

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

		const formItemLayout = {
			labelCol: { span: 10 },
			wrapperCol: { span: 12 },
		};
        const number = this.state.number;
		const tips = '';

		return <Form horizontal>
		 <FormItem
		 {...formItemLayout}
		 label={this.props.name}
		 validateStatus={number.validateStatus}
		 help={number.errorMsg||null}
		 >
			<Popover placement="right" content={content} title="Title" trigger="click">
			<InputNumber
				min={this.props.min} 
				max={this.props.max}
				defaultValue={this.props.value}
				step={0.1}
				name={this.props.name}
				placeholder={this.props.default}
				onChange={this.handleNumberChange.bind(this)}
			/>
			</Popover>
			</FormItem>
		</Form>
	}
}

export default NumberField