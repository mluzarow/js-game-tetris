class Tetris {
	constructor () {
		// Get elements
		let $e = document.getElementsByClassName ("data");
		
		this._score = new Score ($e[0], 0);
		this._level = new Level ($e[1], 1);
		this._$lines = new Lines ($e[2], 0);
		this._$nextPiece = new NextPiece ($e[3]);
		this._$board = document.getElementById ("board");
		this._board = Array (20).fill (Array (10).fill (0));
		
		this._pieceFalling = false;
		this._timeDiff = 120;
		this._curTime = 0;
		
		// Build node
		let $node = document.createElement("div");
		$node.classList = "node";
		
		let $sideNode = document.createElement("div");
		$sideNode.classList = "node side";
		
		// Build line
		let $line = document.createElement ("div");
		$line.classList = "line";
		
		$line.appendChild ($sideNode.cloneNode ());
		for (let i = 0; i < 10; i++) {
			$line.appendChild($node.cloneNode ());
		}
		$line.appendChild ($sideNode.cloneNode ());
		
		// Build board
		for (let i = 0; i < 20; i++) {
			this._$board.appendChild ($line.cloneNode (true));
		}
		
		// Set up keyboard key handler
		this._$board.addEventListener ("keyup", this._handlerKeyUp);
		
		// Start game loop
		setInterval (this._gameLoop.bind (this), 1000 / 60);
	}
	
	_gameLoop () {
		if (++this._curTime < this._timeDiff) {
			return;
		}
		
		this._curTime = 0;
		
		if (this._pieceFalling === false) {
			// Place the next piece
			this._newPiece ();
		}
		
		if (this._currentLine === 19) {
			// This is the bottom so just let it sit
			this._solidify ();
		}
		
		let currentLine = this._boad[this._currentLine];
		let nextLine
		
		console.log ("update!");
	}
	
	_generateNextPiece () {
		let nextPiece = Math.floor (Math.random () * 7 + 1);
		
		this._$nextPiece.innerHTML = '';
		this._$nextPiece.appendChild (this._$nextPiece.getPiece ();
	}
	
	_handlerKeyUp (e) {
		if (this._pieceFalling === false) {
			// Don't do anything if there is no active piece
			return;
		}
		
		switch (e.code) {
			case "ArrowUp":    return this._moveSpin ();
			case "ArrowRight": return this._moveRight ();
			case "ArrowDown":  return this._moveDown ();
			case "ArrowLeft":  return this._moveLeft ();
		}
	}
	
	_moveDown () {
		
	}
	
	_moveLeft () {
		
	}
	
	_moveRight () {
		
	}
	
	_moveSpin () {
		
	}
	
	_solidify () {
		for (let i = 0; i < this._board.length; i++) {
			for (let j = 0; j < this._board[i].length; j++) {
				if (this._board[i][j] === 2) {
					this._board[i][j] = 1;
					this._$board[i][j].classList = "node inactive";
				}
			}
		}
	}
}

class DataItem {
	constructor ($element, data) {
		this._$element = $element;
		this._data = data;
		this._update ();
	}
	
	_update () {
		if (typeof this._data === "number") {
			this._$element.innerHTML = this._data;
		} else {
			this._$element.innerHTML = '';
			this._$element.appendChild (this._data);
		}
	}
}

class Score extends DataItem {
	constructor ($element, data) {
		super ($element, data);
	}
	
	update (score) {
		this._data += score;
		super._update ();
	}
}

class Level extends DataItem {
	constructor ($element, data) {
		super ($element, data);
	}
	
	update () {
		this._data += 1;
		super._update ();
	}
}

class Lines extends DataItem {
	constructor ($element, data) {
		super ($element, data);
	}
	
	update (lines) {
		this._data += lines;
		super._update ();
	}
}

class NextPiece extends DataItem {
	constructor ($element) {
		super ($element, 0);
		
		this._templates = this._buildTemplates (this._getTemplateData ())
		
		this.update (this._templates[0]);
	}
	
	update ($element) {
		this._data = $element;
		super._update();
	}
	
	_buildTemplates (templateData) {
		let templates = {};
		
		// Build elements
		let $node = document.createElement ("div");
		$node.classList = "node";
		let $nodeColor = document.createElement ("div");
		$nodeColor.classList = "node color";
		
		let $line = document.createElement ("div");
		$line.classList = "line";
		
		let $template = document.createElement ("div");
		
		// Build template element collections from template data
		templateData.forEach (template => {
			let $newTemplate = $template.cloneNode ();
			
			template.data.forEach (lineData => {
				let $newLine = $line.cloneNode ();
				
				lineData.forEach (node => {
					if (node === false) {
						$newLine.appendChild ($node.cloneNode ());
					} else {
						$newLine.appendChild ($nodeColor.cloneNode ());
					}
				})
				
				// Add line to current template
				$newTemplate.appendChild ($newLine);
			});
			
			// Add to dictionary
			templates[template.name] = $newTemplate;
		});
		
		return templates;
	}
	
	_getTemplateData () {
		return [
			{ // I
				name: 1,
				data: [
					[false, false, false, false, false],
					[true, true, true, true, true]
				]
			},
			{ // O
				name: 2,
				data: [
					[false, false, true, true, false],
					[false, false, true, true, false]
				]
			},
			{ // T
				name: 3,
				data: [
					[false, false, true, false, false],
					[false, true, true, true, false]
				]
			},
			{ // S
				name: 4,
				data: [
					[false, false, true, true, false],
					[false, true, true, false, false]
				]
			},
			{ // Z
				name: 5,
				data: [
					[false, true, true, false, false],
					[false, false, true, true, false]
				]
			},
			{ // J
				name: 6,
				data: [
					[false, true, false, false, false],
					[false, true, true, true, false]
				]
			},
			{ // L
				name: 7,
				data: [
					[false, false, false, true, false],
					[false, true, true, true, false]
				]
			},
			{ // Blank
				name: 0,
				data: [
					[false, false, false, false, false],
					[false, false, false, false, false]
				]
			}
		];
	}
}
