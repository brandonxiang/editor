import React from 'react'
import Pop from './pop'
import { Input } from 'antd';

/*** Number fields with support for min, max and units and documentation*/
export default class StringField extends React.Component {
static propTypes = {
    onChange: React.PropTypes.func.isRequired,
		name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    default: React.PropTypes.number,
    doc: React.PropTypes.string,
  }

	onChange(e) {
		const value = e.target.value
		return this.props.onChange(value === "" ? null: value)
	}

render() {
  const content =(<div>
				<p>Content</p>
				<p>Content</p>
			</div>)

  const input = (<Input
				name={this.props.name}
				placeholder={this.props.default}
				value={this.props.value ? this.props.value : ""}
				onChange={this.onChange.bind(this)}
			/>)

	return <Pop
		 name={this.props.name}
		 content={content}
		 input={input}
		 tips={this.props.doc}
		/>
	}
}
