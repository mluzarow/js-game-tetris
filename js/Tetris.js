class Tetris {
	constructor () {
		// Get elements
		let $e = document.getElementsByClassName ("data");
		
		this._$score = $e[0];
		this._$level = $e[1];
		this._$lines = $e[2];
		this._$nextPiece = $e[3];
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
