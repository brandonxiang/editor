import React from 'react'
import Immutable from 'immutable'
import GlSpec from 'mapbox-gl-style-spec/reference/latest.min.js'
import NumberField from './number'
import EnumField from './enum'
import ColorField from './color'
import StringField from './string'

class SpecField extends React.Component {
	static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    fieldSpec: React.PropTypes.object.isRequired,
		value: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  }

	onValueChanged(property, value) {
		return this.props.onChange(property, value)
	}

	render() {
		switch(this.props.fieldSpec.type) {
			case 'number': return (
				<NumberField
					onChange={this.onValueChanged.bind(this, this.props.fieldName)}
					value={this.props.value}
					name={this.props.fieldName}
					default={this.props.fieldSpec.default}
					min={this.props.fieldSpec.min}
					max={this.props.fieldSpec.max}
					unit={this.props.fieldSpec.unit}
					doc={this.props.fieldSpec.doc}
				/>
			)
			case 'enum': return (
				<EnumField
					onChange={this.onValueChanged.bind(this, this.props.fieldName)}
					value={this.props.value}
					name={this.props.fieldName}
					allowedValues={this.props.fieldSpec.values}
					doc={this.props.fieldSpec.doc}
				/>
			)
			case 'string': return (
				<StringField
					onChange={this.onValueChanged.bind(this, this.props.fieldName)}
					value={this.props.value}
					name={this.props.fieldName}
					doc={this.props.fieldSpec.doc}
				/>
			)
			case 'color': return (
				<ColorField
					onChange={this.onValueChanged.bind(this, this.props.fieldName)}
					value={this.props.value}
					name={this.props.fieldName}
					doc={this.props.fieldSpec.doc}
				/>
			)
			default: return null
		}
	}
}

export class PropertyGroup extends React.Component {
	static propTypes = {
    onChange: React.PropTypes.func.isRequired,
		properties: React.PropTypes.instanceOf(Immutable.Map).isRequired,
		layerType: React.PropTypes.oneOf(['fill', 'background', 'line', 'symbol']).isRequired,
		groupType: React.PropTypes.oneOf(['paint', 'layout']).isRequired,
  }

	render() {
		const layerTypeSpec = GlSpec[this.props.groupType + "_" + this.props.layerType]
		const specFields = Object.keys(layerTypeSpec).map(propName => {
			const fieldSpec = layerTypeSpec[propName]
			const propValue = this.props.properties.get(propName)
			return <SpecField
				onChange={this.props.onChange}
				key={propName}
				value={propValue}
				fieldName={propName}
				fieldSpec={fieldSpec}
			/>
		})
		return <div>
			{specFields}
		</div>
	}
}
