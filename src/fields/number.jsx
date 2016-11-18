import React from 'react'
import inputStyle from './input.js'

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
    doc: React.PropTypes.string,
  }

	onChange(e) {
		const value = parseFloat(e.target.value)
		/*TODO: we can do range validation already here?
		if(this.props.min && value < this.props.min) return
		if(this.props.max && value > this.props.max) return
		*/
		this.props.onChange(value)
	}

	render() {
		return <div style={inputStyle.property}>
			<label style={inputStyle.label}>{this.props.name}</label>
			<input
				style={inputStyle.input}
				type="number"
				name={this.props.name}
				placeholder={this.props.default}
				value={this.props.value}
				onChange={this.onChange.bind(this)}
			/>
		</div>
	}
}

export default NumberField