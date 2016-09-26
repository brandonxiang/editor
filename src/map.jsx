import React from 'react'
import ol from 'openlayers'
import olms from 'ol-mapbox-gl-style'
import { fullHeight } from './theme.js'
import style from './style.js'
import Immutable from 'immutable'
import validateColor from 'mapbox-gl-style-spec/lib/validate/validate_color'

export class Map extends React.Component {
	static propTypes = {
		mapStyle: React.PropTypes.instanceOf(Immutable.Map).isRequired,
		accessToken: React.PropTypes.string,
	}

	constructor(props) {
		super(props)

		const tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 22})
		this.resolutions = tilegrid.getResolutions()
		this.layer = new ol.layer.VectorTile({
			source: new ol.source.VectorTile({
				attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
					'© <a href="http://www.openstreetmap.org/copyright">' +
					'OpenStreetMap contributors</a>',
				format: new ol.format.MVT(),
				tileGrid: tilegrid,
				tilePixelRatio: 8,
				url: 'http://osm2vectortiles-0.tileserver.com/v2/{z}/{x}/{y}.pbf'
			})
		})
	}

	componentWillReceiveProps(nextProps) {
		const jsonStyle = style.toJSON(nextProps.mapStyle)
		const styleFunc = olms.getStyleFunction(jsonStyle, 'mapbox', this.resolutions)
		this.layer.setStyle(styleFunc)
		this.state.map.render()
	}

	shouldComponentUpdate(nextProps, nextState) {
		//TODO: If we enable this React mixin for immutable comparison we can remove this?
		return nextProps.mapStyle !== this.props.mapStyle
	}

	componentDidMount() {
		const styleFunc = olms.getStyleFunction(style.toJSON(this.props.mapStyle), 'mapbox', this.resolutions)
		this.layer.setStyle(styleFunc)

		const map = new ol.Map({
			target: this.container,
			layers: [this.layer],
			view: new ol.View({
				center: [949282, 6002552],
				zoom: 4
			})
		})
		this.setState({ map });
	}

	render() {
			return <div
				ref={x => this.container = x}
				style={{
					...fullHeight,
					width: "100%",
				}}></div>
	}
}
