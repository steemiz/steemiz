export var getRegExp = {
	typeString: (fr=1, to=255) => {
		return new RegExp(`^(?=.{${fr},${to}}$).*$`, 'iu')
	},
	typeEmail: (require = true) => {
		if(!require) return /^(?=.{0,255}$)([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/i
		return /^(?=.{1,255}$)([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/i // not null
	},
	typeNumber: (require = true) => {
		if(!require) return /^(?=.{0,30}$)\d*$/i
		return /^\d{1,30}$/i // not null
	},
	typeFloat: (require = true) => {
		if(!require) return /^(?=.{0,30}$)\d*(\.\d+)?$/i
		return /^(?=.{1,30}$)\d*(\.\d+)?$/i // not null
	}
}