"use strict"

import Key from './key.js'
class Main {
	constructor(key, sound) {
		//this.song1_sound = document.getElementById("song1")

		this.canvas = document.getElementById('a')
		this.context = this.canvas.getContext('2d')

		this.clear_sound = sound

		this.step = 0
		//this.startDate = new Date();
		this.update = this.update.bind(this)
		this.render = this.render.bind(this)
		this.startGame = this.startGame.bind(this)
		this.levelUp = this.levelUp.bind(this)
		this.storeBlock = this.storeBlock.bind(this)
		this.newBlock = this.newBlock.bind(this)
		this.notBlocked = this.notBlocked.bind(this)
		this.canMoveRight = this.canMoveRight.bind(this)
		this.canMoveLeft = this.canMoveLeft.bind(this)
		this.remove = this.remove.bind(this)
		this.pushDown = this.pushDown.bind(this)
		this.resolve = this.resolve.bind(this)
		this.resolveFrom = this.resolveFrom.bind(this)
		this.gameStarted = true
		this.score = 0

		this.removeCountdown = 0

		this.grid=[]
		this.gridTest=[]
		this.gridSpines=[]
		this.gridWidth=15
		this.gridHeight=30
		this.colours=[]
		this.colours[0] = "#000000"
		this.colours[1] = "#aa0000"
		this.colours[2] = "#00aa00"
		this.colours[3] = "#0000aa"
		this.colours[4] = "#aaaa00"
		this.colours[5] = "#00aaaa"
		this.colours[6] = "#aaaaaa"

		this.key=key

		for(let x=0; x<this.gridWidth; x++) {
			this.grid[x]=[]
			this.gridSpines[x]=[]
			this.gridTest[x]=[]
			for(let y=0; y<this.gridHeight; y++) {
				this.grid[x][y]=0
				this.gridSpines[x][y]=0
				this.gridTest[x][y]=0
			}
		}
		this.fontSize = 1
		this.gameover=false
		this.newBlock()
//		this.blockX=11
//		this.blockY=-3
		this.dropSpeed = 20

		this.score=0
		this.level=1
	}

	newBlock() {
		this.blockX=11
		this.blockY=-3
		this.block=[]
		var spineCol = Math.floor((Math.random() * 5) +1)
		for(let x=0; x<3; x++) {
			this.block[x]=[]
			for(let y=0; y<3; y++) {
				var col = Math.floor((Math.random() * 6))
				if (col == spineCol) {
					this.block[x][y]=(col+1)%6
				}
				else {
					this.block[x][y]=col
				}
			}
		}
		this.block[1][0]=spineCol
		this.block[1][1]=spineCol
		this.block[1][2]=spineCol
		this.block[0][1]=spineCol
		this.block[2][1]=spineCol		
	}

	resolve() {
		for(let x=0; x<3; x++) {
			for(let y=0; y<3; y++) {
				this.resolveFrom(x, y)
			}
		}		
	}

	// resolve: 
	// -1 not checked
	// 0 empty
	// 1 right colour, checked for neighbours
	// http://sb.bitsnbites.eu/?data=U0JveAwC7dwxS8NQEMDxu7wkagdxUXAQg06uzjo6uvkRHAulWLCb2aTwBqHEhhKITn4FwdHJ1S_i4l6TtIUSa6Ug0gf_X7lc8kjg7g1ZjrS3LbIuUaD7seh9Z0Mk3DkQkTOjGjxJdB7uhqqeZ0qJpJLmmSRplkuVh1lSHvPHPO3LQFbcTP09yZNktv7Mifp7RfQneVB0Y4sYSiZ31RoAAAAAAAAAAACWNOqojLqiN354OF7xNqURlSfqGeMXP2OrdSt28kz9etUtqt9a61D9dk4_1rH9t9_6AQAAAAAAAAAA-H92HCd-o_yS7CUQ_biVqBls-Tr-jsyY6W2Lsgttfs9uDGrsLwEAAAAAAAAAAIAlPcRahOi7v3Yk5axMvZFIdBpE1d8tVmbvrw9lXBnSxLV6XRvyAQAAAAAAAAAA4O94l7GYt7g8DfeKw6uv5vj5-rMfXoTqqeebwDft2kNtx5r8qf5WEU2H6p_mq0nuOLb_8-pvOVj_dN-7vD8AAAAAAAAAAHDWFw



	resolveFrom(x,y) {
		for(let x1=0; x1<this.gridWidth; x1++) {
			for(let y1=0; y1<this.gridHeight; y1++) {
				this.gridTest[x1][y1]=0
			}
		}
		if (this.blockX+x >= this.gridWidth) return
		if (this.blockX+x < 0) return
		if (this.blockY+y >= this.gridHeight) return
		if (this.blockY+y < 0) return
		var testCol = this.grid[this.blockX+x][this.blockY+y]
		if (testCol==0) return

		var testList = []
		var hits = 0

		testList.push({x:this.blockX+x, y:this.blockY+y})

		var testObj = testList.pop()
		while(testObj != undefined) {
			hits++

			this.gridTest[testObj.x][testObj.y] = 1

			if (testObj.x-1>0 && testCol == this.grid[testObj.x-1][testObj.y] && this.gridTest[testObj.x-1][testObj.y]!=1) {
				testList.push({x:testObj.x-1, y:testObj.y})
			}
			if (testObj.x+1<this.gridWidth && testCol == this.grid[testObj.x+1][testObj.y] && this.gridTest[testObj.x+1][testObj.y]!=1) {
				testList.push({x:testObj.x+1, y:testObj.y})
			}
			if (testObj.y-1>0 && testCol == this.grid[testObj.x][testObj.y-1] && this.gridTest[testObj.x][testObj.y-1]!=1) {
				testList.push({x:testObj.x, y:testObj.y-1})
			}
			if (testObj.y+1<this.gridHeight && testCol == this.grid[testObj.x][testObj.y+1] && this.gridTest[testObj.x][testObj.y+1]!=1) {
				testList.push({x:testObj.x, y:testObj.y+1})
			}
			testObj = testList.pop()
		}
		if (hits>5) {
			this.score+=hits*hits
			if (this.score%((this.level+this.level)*100)==0) {
				this.levelUp()
			}

			for(let x=0; x<this.gridWidth; x++) {
				for(let y=0; y<this.gridHeight; y++) {
					if (this.gridTest[x][y]==1) {
						this.grid[x][y] = 6
						this.removeCountdown = 10
						this.gridTest[x][y] = 0 // always leave it empty
					}
				}
			}
			this.oldBlockX=this.blockX
			this.oldBlockY=this.blockY
		}
	}

	remove() {
//		this.clear_sound.play()
		for(let x=0; x<this.gridWidth; x++) {
			for(let y=0; y<this.gridHeight; y++) {
				if (this.grid[x][y]==6) {
					this.grid[x][y] = 0
					this.gridSpines[x][y]=0
				}
			}
		}
		for(let x=0; x<3; x++) {
			for(let y=0; y<3; y++) {
	//			this.resolveFrom(this.oldBlockX+x,this.oldBlockY+y)
			}
		}
	}
	pushDown() {
		var goDown=true
		while (goDown) {
			goDown=false
		for(let y1=this.gridHeight; y1>=0; y1--) {
			
			for(let x=0; x<this.gridWidth; x++) {
				var lastY=y1
				var check = false
				for(let y=y1; y<this.gridHeight-1; y++) {
					if (this.gridSpines[x][y]==1 && this.grid[x][y+1]==0) {

						this.grid[x][y+1] = this.grid[x][y]
						this.grid[x][y] = 0
						this.gridSpines[x][y+1] =1
						this.gridSpines[x][y] = 0
						//goDown = true
						lastY=y+1
						check=true
					}

				}
				if (check) {
					this.resolveFrom(x,lastY)
					goDown=true
				}
				
				lastY=y1
				check=false
				for(let y=y1; y<this.gridHeight-1; y++) {

					if (this.gridSpines[x][y]==4 && this.grid[x][y+1]==0) {//}
//						&& this.grid[x][x-1]==0) {

						this.grid[x][y+1] = this.grid[x][y]
						this.grid[x][y] = 0
						this.gridSpines[x][y+1] = 4
						this.gridSpines[x][y] = 0
						//goDown = true
						lastY=y+1
						check=true
//						this.resolveFrom(x,y+1)
					}
				}
				if (check) {
					this.resolveFrom(x,lastY)
					goDown=true
				}

			}
			for(let x=1; x<this.gridWidth-1; x++) {
				var lastY=y1
				var check = false
				for(let y=y1; y<this.gridHeight-1; y++) {

					if (this.gridSpines[x][y]==6) { //2?
						if (this.gridSpines[x-1][y]==0 && this.gridSpines[x+1][y]==0) {

							if (this.grid[x-1][y-1]==0 && this.grid[x+1][y-1]==0 && this.grid[x][y+1]==0) {

								this.grid[x-1][y-1] = this.grid[x-1][y-2]
								this.grid[x+1][y-1] = this.grid[x+1][y-2]
								this.grid[x][y+1] = this.grid[x][y-2]

								this.gridSpines[x-1][y-1] = this.gridSpines[x-1][y-2]
								this.gridSpines[x+1][y-1] = this.gridSpines[x+1][y-2]
								this.gridSpines[x][y+1] = this.gridSpines[x][y-2]

								this.grid[x-1][y-2] = 0
								this.grid[x+1][y-2] = 0
								this.grid[x][y-2] = 0

								this.gridSpines[x-1][y-2] = 0
								this.gridSpines[x+1][y-2] = 0
								this.gridSpines[x][y-2] = 0

								//	goDown = true
								check=true
								lastY=y+1
							}
						} 
						else if (this.gridSpines[x-1][y]==0) {

							if (this.grid[x-1][y-1]==0 && this.grid[x+1][y]==0 && this.grid[x][y+1]==0) {

								this.grid[x-1][y-1] = this.grid[x-1][y-2]
								this.grid[x+1][y] = this.grid[x+1][y-1]
								this.grid[x][y+1] = this.grid[x][y-2]

								this.gridSpines[x-1][y-1] = this.gridSpines[x-1][y-2]
								this.gridSpines[x+1][y] = this.gridSpines[x+1][y-1]
								this.gridSpines[x][y+1] = this.gridSpines[x][y-2]

								this.grid[x-1][y-2] = 0
								this.grid[x+1][y-1] = 0
								this.grid[x][y-2] = 0

								this.gridSpines[x-1][y-2] = 0
								this.gridSpines[x+1][y-1] = 0
								this.gridSpines[x][y-2] = 0

								//	goDown = true
								check=true
								lastY=y+1
							}						} 
						else if (this.gridSpines[x+1][y]==0) {

							if (this.grid[x-1][y]==0 && this.grid[x+1][y-1]==0 && this.grid[x][y+1]==0) {

								this.grid[x-1][y] = this.grid[x-1][y-1]
								this.grid[x+1][y-1] = this.grid[x+1][y-2]
								this.grid[x][y+1] = this.grid[x][y-2]

								this.gridSpines[x-1][y] = this.gridSpines[x-1][y-1]
								this.gridSpines[x+1][y-1] = this.gridSpines[x+1][y-2]
								this.gridSpines[x][y+1] = this.gridSpines[x][y-2]

								this.grid[x-1][y-1] = 0
								this.grid[x+1][y-2] = 0
								this.grid[x][y-2] = 0

								this.gridSpines[x-1][y-1] = 0
								this.gridSpines[x+1][y-2] = 0
								this.gridSpines[x][y-2] = 0

								//	goDown = true
								check=true
								lastY=y+1
							}						}
						else {
							if (this.grid[x-1][y]==0 && this.grid[x+1][y]==0 && this.grid[x][y+1]==0) {

								this.grid[x-1][y] = this.grid[x-1][y-1]
								this.grid[x+1][y] = this.grid[x+1][y-1]
								this.grid[x][y+1] = this.grid[x][y-2]

								this.gridSpines[x-1][y] = this.gridSpines[x-1][y-1]
								this.gridSpines[x+1][y] = this.gridSpines[x+1][y-1]
								this.gridSpines[x][y+1] = this.gridSpines[x][y-2]

								this.grid[x-1][y-1] = 0
								this.grid[x+1][y-1] = 0
								this.grid[x][y-2] = 0

								this.gridSpines[x-1][y-1] = 0
								this.gridSpines[x+1][y-1] = 0
								this.gridSpines[x][y-2] = 0

								//	goDown = true
								check=true
								lastY=y+1
							}
						}
					}
				}
				if (check) {
					this.resolveFrom(x,lastY)
					this.resolveFrom(x-1,lastY-1)
					this.resolveFrom(x+1,lastY-1)
					goDown=true
				}

			}
		}
		}
	}		
	
	// spines
	// 0 is empty
	// 1 is block
	// 2 is spine
	// 3 is spine but not central
	storeBlock() {
		for(let x=0; x<3; x++) {
			for(let y=0; y<3; y++) {
				if (this.block[x][y]>0) {
					this.grid[this.blockX+x][this.blockY+y] = this.block[x][y]

					if (y==1 || x==1) {
						this.gridSpines[this.blockX+x][this.blockY+y] = 3 
					}
					else if (this.grid[this.blockX+x][this.blockY+y]==0) {
						//this.gridSpines[this.blockX+x][this.blockY+y] = 0
					}
					else {
						if (y==2) {
							this.gridSpines[this.blockX+x][this.blockY+y] = 4
						}
						else {
							this.gridSpines[this.blockX+x][this.blockY+y] = 1
						}
					}
				}
			}
		}
		this.gridSpines[this.blockX+1][this.blockY+2] = 2 
	}
	notBlocked() {
		if (this.block[0][2]==0) {
			if (this.grid[this.blockX][this.blockY+2] > 0) {
				return false
			}
		}
		else if (this.grid[this.blockX][this.blockY+3] > 0) {
			return false

		}
		if (this.block[2][2]==0) {
			if (this.grid[this.blockX+2][this.blockY+2] > 0) {
				return false
			}
		}
		else if (this.grid[this.blockX+2][this.blockY+3] > 0) {
			return false

		}
		//for(let x=0; x<3; x++) {
			if (this.grid[this.blockX+1][this.blockY+3] > 0) {
				return false
			}
		//}
		return true
	}

	canMoveRight() {
		for(let y=0; y<3; y++) {
			if (this.grid[this.blockX+3][this.blockY+y] > 0) {
				return false
			}
		}
		return true
	}
	canMoveLeft() {
		for(let y=0; y<3; y++) {
			if (this.grid[this.blockX-1][this.blockY+y] > 0) {
				return false
			}
		}
		return true
	}

	rotate(clockwise) {
		this.rotated_block=[]
		for(let x=0; x<3; x++) {
			this.rotated_block[x]=[]
			for(let y=0; y<3; y++) {
				this.rotated_block[x][y]=this.block[x][y]
			}
		}
		var tempValue = 0
		if (clockwise) {
			this.rotated_block[0][0] = this.block[0][2]
			this.rotated_block[2][0] = this.block[0][0]
			this.rotated_block[2][2] = this.block[2][0]
			this.rotated_block[0][2] = this.block[2][2]
		}
		else {
			this.rotated_block[0][0] = this.block[2][0]
			this.rotated_block[2][0] = this.block[2][2]
			this.rotated_block[2][2] = this.block[0][2]
			this.rotated_block[0][2] = this.block[0][0]
		}

		this.block=this.rotated_block
	}
	update() {	
		this.step = this.step + 1
		this.pushDown()
		if (this.gameStarted == false) {
		}
		else if (this.gameover == false) {
			if (this.removeCountdown > 1) {
				this.removeCountdown-=1
			}
			if (this.removeCountdown === 1) {
				this.remove()
				this.pushDown()
				this.removeCountdown=0
			}
			if (this.key.isDown(this.key.UP) || this.key.isDown(this.key.DOWN) || this.step%this.dropSpeed==0) {
				var toBeLanded = this.key.isDown(this.key.UP)
				do {
					this.blockY+=1
					if (this.blockY<this.gridHeight-3 && this.notBlocked()) {
						//this.blockY+=1
					}
					else {
						//this.blockY-=1
						if (this.blockY<1) {
							this.gameover=true
						}
						else {
							this.storeBlock()
							this.resolve()
							this.newBlock()
						}
						toBeLanded=false
					}
				}
				while(toBeLanded)
			}

			//keys
			if (this.key.isDown(this.key.LEFT)) {
				if (this.blockX>0 && this.canMoveLeft()) {
					this.blockX-=1
				}
			}
			if (this.key.isDown(this.key.RIGHT)) {
				if (this.blockX<this.gridWidth-3  && this.canMoveRight()) {
					this.blockX+=1
				}
			}
			if (this.key.isDown(this.key.Z)) {
				this.rotate(false)
			}
			if (this.key.isDown(this.key.X)) {
				this.rotate(true)
			}

		}
		else {
			//gameover
		}
	

		if (this.gameover && this.fontSize < 36) {
			this.fontSize += 1
		}

		// check clear:
		// for each placed unit, (or moved, when they move down),
		// mark it for checking (separate grid?)
		// then run through all the marked ones and:
		// try spreading out to the west (then east, north, south)
		// stop if no path or if you are back at square 1 - keep a count of number of matches
		// if > 5 

		// maybe better to just check the whole grid

		// on clear, check each column top-down and move any piece down if there's a space
		// move by 1 block, not 1 pixel

		// 

		this.key.update(this.step)

	}

	render() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.rectFill(76,0, this.canvas.width, this.canvas.height, this.colours[0])
		this.rectFill(0,146, this.canvas.width, this.canvas.height, this.colours[0])

//		this.context.font = "30px Verdana"

///		this.context.strokeStyle = "magenta"
//		this.context.strokeText("start", 464, 940)

		

		//cols = ["red","green"]

		for (let x=0; x<this.gridWidth; x++) {
			for (let y=0; y<this.gridHeight; y++) {

				this.rectFill(1+x*5, 1+((y-1)*5), 4, 4, this.colours[this.grid[x][y]])
		//	this.context.font = "5px Arial"
		//	this.context.strokeStyle = "#aaaaaa"
		//		this.context.strokeText(this.gridSpines[x][y], 1+x*5, 1+y*5)
			}
		}
		for (let x=0; x<3; x++) {
			for (let y=0; y<3; y++) {
				this.rectFill(1+(x+this.blockX)*5, 1+(y+this.blockY)*5, 4, 4, this.colours[this.block[x][y]])
			}
		}
		if (this.gameover) {
			this.context.font = this.fontSize + "px Verdana"
			this.context.strokeStyle = "#aaaaaa";
			this.context.strokeText("game over", 92 - this.fontSize*2.5, 100);
		}
		this.context.font = "16px Verdana"
		this.context.strokeStyle = "#aaaaaa";
		this.context.strokeText("Level:  " + this.level, 80, 50)

//		this.context.strokeStyle = "#000000"
		this.context.strokeText("Score:  " + this.score, 80, 70)

	}

	startGame() {

		this.gameStarted = true
		this.step = 0
		this.fontSize = 1
		this.level = 1

	}

	levelUp() {
		this.level++
		if (this.level > 20) {
			this.level = 20
			this.dropSpeed = 22 - this.level
		}
	}

    rectFill(x, y, w, h, col) {
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        this.context.fillStyle = col;
        this.context.fill();
    }	
}

export default Main