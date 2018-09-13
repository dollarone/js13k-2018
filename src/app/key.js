"use strict"

class Key {
	constructor() {
		this.isDown = this.isDown.bind(this)
		this.onKeydown = this.onKeydown.bind(this)
		this.onKeyup = this.onKeyup.bind(this)
		this.pressed = {}
		this.LEFT = 37
		this.UP = 38
		this.RIGHT = 39
		this.DOWN = 40
		this.Z = 90
		this.X = 88
		this.step = 0
		this.lastPress = -1

		this.pressed[this.LEFT] = 0
		this.pressed[this.UP] = 0
		this.pressed[this.RIGHT] = 0
		this.pressed[this.DOWN] = 0
		this.pressed[this.Z] = 0
		this.pressed[this.X] = 0
	}

	isDown(keyCode) {
		return this.pressed[keyCode]
	}

	onKeydown(event) {
	
		this.pressed[event.keyCode] = true
	}

	onKeyup(event) {
		this.pressed[event.keyCode]=false
	}

	update(step) {
		this.step=step
		for(var keyCode in this.pressed) {
			this.pressed[keyCode]=false
		}
	}
}

export default Key