var fs = require( 'fs' );

require( 'http' )

.createServer(function ( req, res ){

	var newFile = fs.createWriteStream( 'readme_copy.md' ),
		fileBytes = req.headers[ 'content-length' ],
		uploadedBytes = 0,
		progress;

	req.pipe( newFile );

	req.on( 'data', function ( chunk ){
		uploadedBytes += chunk.length;
		progress = ( uploadedBytes / fileBytes ) * 100;

		res.write( 'progress: ' + parseInt( progress, 10 ) + ' %\n' );
	});

})

.listen( 8080, function (){
	console.log( 'Server listening on port 8080' );
});