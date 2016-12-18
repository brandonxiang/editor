import React from 'react'
import MapboxGl from 'mapbox-gl';
import { fullHeight } from './theme.js'
import style from './style.js'
import Immutable from 'immutable'
import validateColor from 'mapbox-gl-style-spec/lib/validate/validate_color'
import NavigationControl from './fields/navigationControl.js'

export class Map extends React.Component {
	static propTypes = {
		mapStyle: React.PropTypes.instanceOf(Immutable.Map).isRequired,
		accessToken: React.PropTypes.string,
	}

    constructor(props){
		super(props)
		
        const zoom = 9
		const lat = 40
		const lng = -74.50
		const pitch = 0
		const bearing = 0

		this.state = {
			zoom:zoom,
			lat:lat,
			lng:lng,
			pitch: pitch,
			bearing: bearing
		}
	}


	componentWillReceiveProps(nextProps) {
		const tokenChanged = nextProps.accessToken !== MapboxGl.accessToken

		// If the id has changed a new style has been uplaoded and
		// it is safer to do a full new render
		// TODO: might already be handled in diff algorithm?
		const mapIdChanged = this.props.mapStyle.get('id') !== nextProps.mapStyle.get('id')

		if(mapIdChanged || tokenChanged) {
			this.state.map.setStyle(style.toJSON(nextProps.mapStyle))
			return
		}

		// TODO: If there is no map yet we need to apply the changes later?
		if(this.state.map) {
			style.diffStyles(this.props.mapStyle, nextProps.mapStyle).forEach(change => {

				//TODO: Invalid outline color can cause map to freeze?
				if(change.command === "setPaintProperty" && change.args[1] === "fill-outline-color" ) {
					const value = change.args[2]
					if(validateColor({value}).length > 0) {
						return
					}
				}

				console.log(change.command, ...change.args)
				this.state.map[change.command].apply(this.state.map, change.args);
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		//TODO: If we enable this React mixin for immutable comparison we can remove this?
		return nextProps.mapStyle !== this.props.mapStyle
	}

	componentDidMount() {
		MapboxGl.accessToken = this.props.accessToken

		const map = new MapboxGl.Map({
			container: this.container,
			style: style.toJSON(this.props.mapStyle),
			center: [this.state.lng, this.state.lat], // starting position
            zoom: this.state.zoom // starting zoom
		});

		map.on("style.load", (...args) => {
			this.setState({ map });
		});

		var self = this

		map.on("moveend",function(){
			var lat = parseFloat(map.getCenter().lat.toFixed(5))
			var lng = parseFloat(map.getCenter().lng.toFixed(5))

			self.setState({lat: lat});
			self.setState({lng: lng});
		})

	    map.on("zoomend",function(){
			var zoom = parseFloat(map.getZoom().toFixed(2));
			self.setState({zoom: zoom}) ;
		})
		
		map.on("pitch",function(){
			var pitch = parseFloat(map.getPitch().toFixed(2)) ;
			self.setState({pitch:pitch})
		})

		map.on("rotateend",function(){
			var bearing = parseFloat(map.getBearing().toFixed(2))
			self.setState({bearing:bearing})
		})
	}
	
    zoomIn(){
		this.map.zoomIn()
	}

	zoomOut(){
		this.map.zoomOut()
	}

	onLatChange(lat){
		this.setState({lat:lat})
		this.map.flyTo({center:[this.state.lng,lat],zoom:this.state.zoom})

	}

	onLngChange(lng){
		this.setState({lng:lng})
		this.map.flyTo({center:[lng,this.state.lat],zoom:this.state.zoom})
	}

	onZoomChange(lat){
		this.setState({zoom:zoom})
		this.map.flyTo({center:[this.state.lng,this.state.lat],zoom:zoom})
	}

   

	render() {
		// console.log(this.state.lat)
			return <div
				ref={x => this.container = x}
				style={{
					...fullHeight,
					width: "100%",
				}}>
				<NavigationControl 
				zoomIn={this.zoomIn.bind(this)}
				zoomOut={this.zoomOut.bind(this)}
				lat={this.state.lat} 
				lng={this.state.lng} 
				zoom={this.state.zoom}
				pitch={this.state.pitch}
				bearing={this.state.bearing}
				map={this.state.map}
				onLatChange={this.onLatChange.bind(this)}
				onLngChange={this.onLngChange.bind(this)}
				onZoomChange={this.onZoomChange.bind(this)}
				/>
				</div>
	}
}
