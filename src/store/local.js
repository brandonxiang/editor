const storagePrefix = "maputnik"
const stylePrefix = "style"
const latestKey = [storagePrefix, 'latest_style'].join(':')
}

// Calculate key that identifies the style with a version
function toKey(styleId, revision) {
	return [storagePrefix, stylePrefix, styleId, revision].join(":")
}

function isKey(key) {
	const parts = key.split(":")
	return parts.length == 3 && parts[0] === storagePrefix && parts[1] === stylePrefix
}

// Load style id from key
function fromKey(key) {
	if(!isStyleKey(key)) {
		throw "Key is not a valid style key"
	}

	const parts = key.split(":")
	const styleId = parts[2]
	const revision = parseInt(parts[3])
	return [styleId, revision]
}

function currentRevision(styleId) {
	const revisionKey = [storagePrefix, styleId, 'revision'].join(':')
	return parseInt(window.localStorage.getItem(revisionKey))
}


// Return style ids and dates of all styles stored in local storage
function loadStoredStyleIds() {
	const styleIds = []
	for (let i = 0; i < window.localStorage.length; i++) {
			const key = window.localStorage.key(i)
			if(isStyleKey(key)) {
				styleIds.push(fromKey(key)[0])
			}
	}
	return styleIds
}

// Manages many possible styles that are stored in the local storage
// and keeps track of the current one
export class LocalStyleStore {
	// Tile store will load all items from local storage and
	// assume they do not change will working on it
	constructor() {
		this.styleIds = loadStoredStyleIds()
	}

	// Find current active style
	current() {
		if(this.styleIds.length === 0) return emptyStyle

		const styleId = window.localStorage.getItem(latestKey)
		return styleId
	}

	// Save current style replacing previous version
	add(styleId) {

		window.localStorage.setItem(key, JSON.stringify(style.toJSON(mapStyle)))
		window.localStorage.setItem(storageKeys.latest, mapStyle.get('id'))
		return mapStyle
	}
}

// Store map revision in local storage together with
// a pointer record marking the current revision
export class LocalRevisionStorage {
	// Save a style as new revision
	save(mapStyle) {
		let latestRevision = parseInt(window.localStorage.getItem(latestRevisionKey(mapStyle.id)))
		if(isNaN(latestRevision)) {
			latestRevision = -1
		}

		window.localStorage.setItem(revisionKey, latestRevision)
		window.localStorage.setItem(toKey(mapStyle.id, latestRevision + 1), JSON.stringify(mapStyle))
	}

	// Load current revision of a style
	current(styleId) {
		const revision = currentRevision(styleId)
		if(isNaN(revision)) return null

		window.localStorage.getItem(toKey(styleId, revision))
	}

	// Roll back one revision and return the style
	rollback(styleId) {
		const revision = currentRevision(styleId)
		if(revision == 0) {
			return JSON.parse(window.localStorage.getItem(toKey(styleId, revision)))
		}
		window.localStorage.removeItem(toKey(styleId, revision))
		window.localStorage.setItem(revisionKey, revision - 1)
		return JSON.parse(window.localStorage.getItem(toKey(styleId, revision - 1)))
	}
}
