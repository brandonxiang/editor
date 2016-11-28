import React from 'react'
import NumberField from './number'
import EnumField from './enum'
import ColorField from './color'
import StringField from './string'


class array extends React.Component{


   

    render() {
      switch(this.props.fieldSpec.value) {
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