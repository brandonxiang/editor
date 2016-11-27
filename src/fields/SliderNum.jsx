import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderNum extends React.Component{
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

  static defaultProps = {
    min:1,
    max:10,
    step:0.1
  }


  constructor(props) {
    super(props)
    this.state = {
      inputValue: 1,
    }
}

  onChange(value) {
    this.setState({
      inputValue: value,
    });
  }

  render() {
    return (
      <Row>
       <Col span={4}>
          <InputNumber min={this.props.min} max={this.props.max} step={this.props.step} 
            value={this.state.inputValue} onChange={this.onChange.bind(this)}
          />
        </Col>
        <Col span={2}>
          <Slider min={this.props.min} max={this.props.max} onChange={this.onChange.bind(this)} value={this.state.inputValue} />
        </Col>
      </Row>
    );
  }
}

export default SliderNum;