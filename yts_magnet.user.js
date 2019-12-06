// ==UserScript==
// @name         YTS Magnet
// @namespace    yts_magnet
// @description  Add magnet links to yts
// @version      1.0
// @date         2019-12-05
// @include      https://yts.lt/movie/*
// @downloadURL  https://raw.githubusercontent.com/namiman/yts_magnet/master/yts_magnet.user.js
// @updateURL    https://raw.githubusercontent.com/namiman/yts_magnet/master/yts_magnet.meta.js
// @require      https://code.jquery.com/jquery-3.4.1.slim.min.js
// @grant        none
// ==/UserScript==

function getHashFromDownloadUrl( url ) {
	return url.split( "/" ).pop();
}
function createMagnetLink( hash, title = "" ) {
	const template = "magnet:?xt=urn:btih:{{HASH}}&dn={{TITLE}}";
	return template.replace( "{{HASH}}", hash ).replace( "{{TITLE}}", title );
}
var parent = $( ".bottom-info" ).find( "> p" ).last();
parent.append( `<div style="margin-top: 10px;"></div>` );
parent.find( ">a" ).each( function(){
	const el = $(this);
	const new_el = el.clone( true );
	const title = $( "#movie-info" ).find( "> div" ).first().find( "> h1" ).first().text();
	new_el.attr( "href", createMagnetLink( getHashFromDownloadUrl( el.attr( "href" ) ), encodeURIComponent( title ) ) )
  			.addClass( "magnet-download" );
	parent.append( new_el )
});
