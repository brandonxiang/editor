import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderNum extends React.Component{
  static defaultProps = {
    min:1,
    max:10
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
       <Col span={16}>
          <InputNumber style={{width:'100%'}} min={this.props.min} max={this.props.max} step={this.props.step}
            value={this.state.inputValue} onChange={this.onChange.bind(this)}
          />
        </Col>

        <Col span={8} offset={0}>
          <Slider min={this.props.min} max={this.props.max} onChange={this.onChange.bind(this)} value={this.state.inputValue} />
        </Col>
      </Row>
    );
  }
}

export default SliderNum;