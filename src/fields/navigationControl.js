import React, {Component} from 'react'
import {Button, Icon,InputNumber, Row, Col} from 'antd'

export default class NavigationControl extends Component{

  static propTypes ={
    zoom:React.PropTypes.number,
    lat:React.PropTypes.number,
    lng:React.PropTypes.number,
    pitch:React.PropTypes.number,
    bearing:React.PropTypes.number
  }


  static defaultProps = {
      zoom: 9,
      lat: 22,
      lng: 114,
      bearing: 10,
      pitch: 10
  }

//   onLatChange(e){
//     //   console.log(e)
//       console.log(this.props.map)
//        this.props.map.flyTo({center:[this.state.lng,lat],zoom:this.state.zoom})
//   }

//   onLngChange(){

//   }

//   onZoomChange(){

//   }

    render(){
        console.log()

        const outblock = {
            position:"fixed",
            top:0,
            right:0,
            zIndex:5000
        }
        

        return <div
            style={{
                position:"fixed",
                top:0,
                right:0,
                zIndex:5000,
                padding:"5px",
                backgroundColor:"rgba(200, 200, 200, 0.5)",
                borderRadius:"3px"
            }}>
            <div>
            <Button type="primary" icon="plus" onClick={this.props.zoomIn}/>
            <Button type="primary" icon="minus" onClick={this.props.zoomOut}/>
            </div>
            <Row>
            <Col span={8}>
            <div>Zoom</div>
            <InputNumber value={this.props.zoom} />
            </Col>
            <Col span={8}>
            <div>Bearing</div>
            <InputNumber value={this.props.bearing}/>
            </Col>
            <Col span={8}>
            <div>Pitch</div>
            <InputNumber value={this.props.pitch} />
            </Col>
            </Row>
            <Row>
            <Col span={8}>
            <div>Latitude</div>
            <InputNumber value={this.props.lat}/>
            </Col>
            <Col span={8}>
            <div>Longitude</div>
            <InputNumber value={this.props.lng} />
            </Col>
            </Row>
        </div>
    }
}
