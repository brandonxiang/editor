import React from 'react'
import { ChromePicker } from 'react-color'
import {Popover, Input} from 'antd'
import Pop from './pop.jsx'


/*** Number fields with support for min, max and units and documentation*/
class ColorField extends React.Component {
    state = {
	   displayColorPicker: false,
	   value:this.props.value
    }

	constructor(props) {
		super(props);

	}

	handleChange = (color) => {
		this.setState({value:color.hex})

	    // var value = color.hex
		// return this.props.onChange(value === "" ? null : value)

	};

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker })
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false })
	};

	static propTypes = {
        onChange: React.PropTypes.func.isRequired,
		name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        default: React.PropTypes.number,
        doc: React.PropTypes.string,
  }

	onChange(e) {
		console.log(e)
		const value = e.target.value
		return this.props.onChange(value === "" ? null : value)
	}

	render() {
		const content = (
			<ChromePicker color={ this.state.value } onChange={ this.handleChange }/ >
		);
		const input =(<Input
				name={this.props.name}
				placeholder={this.props.default}
				value={this.state.value}
				 onChange={this.onChange.bind(this) }
				onClick ={ this.handleClick }
				/>);
		const popover = {
			position: 'absolute',
			zIndex: '2',
		}
		const cover = {
			position: 'fixed',
			top: '0px',
			right: '0px',
			bottom: '0px',
			left: '0px',
		}
		return <Pop 
		name={this.props.name}
		content={content}
		input={input}
		/>
		
	}
}

export default ColorField
