class Tetris {
	constructor () {
		// Get elements
		let $e = document.getElementsByClassName ("data");
		
		this._score = new Score ($e[0], 0);
		this._level = new Level ($e[1], 1);
		this._$lines = new Lines ($e[2], 0);
		this._$nextPiece = new NextPiece ($e[3]);
		this._$board = document.getElementById ("board");
		
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
		
		this.update (this._templates["blank"]);
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
			{
				name: "I",
				data: [
					[false, false, false, false, false],
					[true, true, true, true, true]
				]
			},
			{
				name: "O",
				data: [
					[false, false, true, true, false],
					[false, false, true, true, false]
				]
			},
			{
				name: "T",
				data: [
					[false, false, true, false, false],
					[false, true, true, true, false]
				]
			},
			{
				name: "S",
				data: [
					[false, false, true, true, false],
					[false, true, true, false, false]
				]
			},
			{
				name: "Z",
				data: [
					[false, true, true, false, false],
					[false, false, true, true, false]
				]
			},
			{
				name: "J",
				data: [
					[false, true, false, false, false],
					[false, true, true, true, false]
				]
			},
			{
				name: "L",
				data: [
					[false, false, false, true, false],
					[false, true, true, true, false]
				]
			},
			{
				name: "blank",
				data: [
					[false, false, false, false, false],
					[false, false, false, false, false]
				]
			}
		];
	}
}
