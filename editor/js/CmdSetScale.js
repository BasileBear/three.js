/**
 * @author dforrer / https://github.com/dforrer
 */

/**
 * @param object THREE.Object3D
 * @param newScale THREE.Vector3
 * @param optionalOldScale THREE.Vector3
 * @constructor
 */

CmdSetScale = function ( object, newScale, optionalOldScale ) {

	Cmd.call( this );

	this.type = 'CmdSetScale';
	this.name = 'Set Scale';
	this.updatable = true;

	this.object = object;

	if ( object !== undefined && newScale !== undefined ) {

		this.oldScale = object.scale.clone();
		this.newScale = newScale.clone();

	}

	if ( optionalOldScale !== undefined ) {

		this.oldScale = optionalOldScale.clone();

	}

};

CmdSetScale.prototype = {

	execute: function () {

		this.object.scale.copy( this.newScale );
		this.object.updateMatrixWorld( true );
		this.editor.signals.objectChanged.dispatch( this.object );

	},

	undo: function () {

		this.object.scale.copy( this.oldScale );
		this.object.updateMatrixWorld( true );
		this.editor.signals.objectChanged.dispatch( this.object );

	},

	update: function ( command ) {

		this.newScale.copy( command.newScale );

	},

	toJSON: function () {

		var output = Cmd.prototype.toJSON.call( this );

		output.objectUuid = this.object.uuid;
		output.oldScale = this.oldScale.toArray();
		output.newScale = this.newScale.toArray();

		return output;

	},

	fromJSON: function ( json ) {

		Cmd.prototype.fromJSON.call( this, json );

		this.object = this.editor.objectByUuid( json.objectUuid );
		this.oldScale = new THREE.Vector3().fromArray( json.oldScale );
		this.newScale = new THREE.Vector3().fromArray( json.newScale );

	}

};