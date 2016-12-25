import React from 'react'
import { Popover, InputNumber, Form } from 'antd'
import Pop from './pop'
const FormItem = Form.Item;
import SliderNum from './SliderNum'
import ZoomLevel from './ZoomLevel'
import Immutable from 'immutable'
import interpolator from 'interpolator.js'


/*** Number fields with support for min, max and units and documentation*/
export default class NumberField extends React.Component {
	static propTypes = {
		onChange: React.PropTypes.func.isRequired,
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.object,
		default: React.PropTypes.number,
		unit: React.PropTypes.string,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		doc: React.PropTypes.string
	}

	constructor(props) {

		super(props)
		if(typeof(this.props.value)==="number"){
			this.state = {
				value: this.props.value,
				base: undefined,
				stops: undefined
			}
		}else if(typeof(this.props.value)==="object"){
			const zoom = 9
			const val = Immutable.Map(this.props.value).toJS()
			var data =[]
			for(var i in val.stops){
			    var stop = val.stops[i]
				data.push({x:stop[0],y:stop[1]})
			}
			var value = interpolator(data,zoom,val.base)
            
			this.state = {
				value: value,
				base: val.base,
				stops: val.stops	
			}
		}else{
			this.state={}
		}
		
	}


	onChange(e) {
		const value = parseFloat(e.target.value)
		/*TODO: we can do range validation already here?

		*/
		if (this.props.min && value < this.props.min) return this.props.onChange(this.props.min);
		if (this.props.max && value > this.props.max) return this.props.onChange(this.props.max);
		this.props.onChange(value)
	}

	onZoomLevelChange(data){
		const zoom = 9
		var value = interpolator(data,zoom,this.state.base)
		console.log(value)
		this.setValue({value:value});
		this.props.onChange(value)
	}

	render() {
		const content = <ZoomLevel
		 stops={this.state.stops} 
		 min={this.props.min}
		 max={this.props.max}
		 onChange={this.onZoomLevelChange.bind(this)}/>

		const input = (<InputNumber
			min={this.props.min}
			max={this.props.max}
			defaultValue={this.state.value}
			step={0.1}
			name={this.props.name}
			placeholder={this.props.default}
			onChange={this.onChange.bind(this) }
			/>)
		return <Pop
			name={this.props.name}
			content={content}
			input={input}
			tips={this.props.doc}
			/>
	}
}
