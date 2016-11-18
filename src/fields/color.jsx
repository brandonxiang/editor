import React from 'react'
import inputStyle from './input.js'
import { ChromePicker } from 'react-color'

/*** Number fields with support for min, max and units and documentation*/
class ColorField extends React.Component {
  state = {
	   displayColorPicker: false,

		value:'#e21341'
  }

	constructor(props) {
		super(props);

	}

	handleChange = (color) => {
		 this.setState({value:color.hex})
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
		const value = e.target.value
		return this.props.onChange(value === "" ? null : value)
	}

	render() {
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
		return <div style={inputStyle.property}>
			<label style={inputStyle.label}>{this.props.name}</label>
			<input
				style={inputStyle.input}
				name={this.props.name}
				placeholder={this.props.default}
				value={this.state.value}
				onChange={this.onChange.bind(this) }
				onClick ={ this.handleClick }
				/>
			{this.state.displayColorPicker ? < div style = { popover } >
        < div style = { cover }
					onClick = { this.handleClose }/>
				< ChromePicker color={ this.state.value } onChange={ this.handleChange }/ >
        < /div>: null }
			</div>
	}
}

export default ColorField
