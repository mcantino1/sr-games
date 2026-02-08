//translation currently only checks for capitals and numbers because that's all we're using
//no abbreviations
//if you use more than one number in a name, this will need to be updated

var levels = getLevels();
var name = getName();
var myBook = document.getElementById("bookContent")
var head = translate(name);
artof = ",>t (";

icons = { player: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<defs><style>.cls-1{fill:currentColor}.cls-1,.cls-2{stroke:currentColor;stroke-miterlimit:10;stroke-width:4px}.cls-2{fill:none}</style></defs>' + '<g><g id="Layer_1"><rect class="cls-2" x="32.6" y="38.8" width="2.4" height="31.2" transform="translate(-28.5 39.8) rotate(-45)"/>' + '<path class="cls-1" d="M16.7,81.5c-2.8,2.8-7.2,2.8-10,0-2.8-2.8-2.8-7.2,0-10,1.7-1.7,3.9-2.3,6.1-2l14.2-14.2,5.9,5.9-14.2,14.2c.3,2.1-.3,4.4-2,6.1Z"/>' + '<polygon class="cls-2" points="79.2 18.2 42.3 55.1 33.1 45.8 70 9 83.6 4.6 79.2 18.2"/>' + '<path class="cls-2" d="M44.8-.6"/>' + '</g></g></svg>' , 
	wall: `<svg viewBox="0 0 88.19 88.19" aria-hidden="true" focusable="false"> <rect x="1" y="1" width="86.19" height="86.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="65.64" x2="87.19" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="44.09" x2="87.19" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="22.55" x2="87.19" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="33.93" y1="1" x2="33.93" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="64.74" y1="1" x2="64.74" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="12.59" y1="22.55" x2="12.59" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="44.69" y1="22.55" x2="44.69" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="79.26" y1="22.55" x2="79.26" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="19.41" y1="44.09" x2="19.41" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="53.48" y1="44.09" x2="53.48" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="71.85" y1="65.64" x2="71.85" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="30.07" y1="65.64" x2="30.07" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M21.73,23.25c.57,2.12,3.27,3.14,3.81,5.27.37,1.46-.38,3.19.48,4.43.32.46.81.76,1.25,1.11,1.38,1.07,2.38,2.64,2.75,4.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M70.94,51.36c.69-2.36,2.19-4.47,4.18-5.9.55.04.73.08,1.27.13.44.04.88.07,1.31-.03s.84-.36,1.01-.76" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M47.63,87.2c-.55-2.12-1.3-4.18-2.24-6.16" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M73.03,1.7c.92,2.16,2.6,4.86,3.51,7.02" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M12.4,1.37c.52,2.3-.47,5.69-2.26,7.23" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M10.89,5.91l3.37,2.03c.17.69.68,1.3,1.33,1.59" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> </svg>`, 
	monster: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<g stroke="currentColor" stroke-miterlimit="10" stroke-width="4" fill="none">' + '<path d="M77.9,37.4c0,11.5-5.7,21.7-14.5,27.8v18.2H24.8v-18.2c-8.8-6.1-14.5-16.3-14.5-27.8C10.3,18.7,25.4,3.6,44.1,3.6s33.8,15.1,33.8,33.8Z"/>' + '<polyline points="63.4 72.9 63.4 83.4 24.8 83.4 24.8 72.9"/>' + '<line x1="53.8" y1="72.9" x2="53.8" y2="83.4"/>' + '<line x1="44.1" y1="72.9" x2="44.1" y2="83.4"/>' + '<line x1="34.4" y1="72.9" x2="34.4" y2="83.4"/>' + '</g>' + '<g fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="4">' + '<path d="M25.9,31.9c0-2.4,2.1-5.3,4.3-4.3s3.1,2.2,4.3,4.3-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3Z"/>' + '<path d="M62.3,31.9c0-2.4-2.1-5.3-4.3-4.3s-3.1,2.2-4.3,4.3,1.9,4.3,4.3,4.3,4.3-1.9,4.3-4.3Z"/>' + '<path d="M42.7,43.5l-1.5,2.6c-.6,1.1.2,2.5,1.4,2.5h3c1.3,0,2-1.4,1.4-2.5l-1.5-2.6c-.6-1.1-2.2-1.1-2.8,0Z"/>' + '</g>' + '</svg>', 
	treasure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M52,34.7c-.5.9-1.3,1.3-2.3,2.1l4.1,11.4h-19.6,0c0,0,4.1-11.4,4.1-11.4-.7-.6-1.3-1.3-1.8-2.1H3.5v46.1h81.2v-46.1h-32.7Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '<path d="M44,21.3c4.9,0,8.8,3.9,8.8,8.8s0,1.6-.1,2.2h31.9v-9.9c0-8.3-6.7-15-15-15H18.5c-8.3,0-15,6.7-15,15v9.9h32c-.2-.7-.3-1.4-.3-2.2,0-4.9,3.9-8.8,8.8-8.8Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', 
	door: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2"  aria-hidden="true" focusable="false">' + '<g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10">' + '<rect x="15.8" y="3.2" width="56.7" height="81.8"/>' + '<circle cx="62.1" cy="46.9" r="4.6"/>' + '</g>' + '</svg>', 
	key: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M31,15.9c-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6,6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7Z" fill="none"/>' + '<path d="M85,69.1L34,26.9c2-3.2,3.3-6.5,3.9-9.7,1-5.4-.1-9.8-3.3-12.4-1.9-1.5-4.1-2.3-6.7-2.3-5.8,0-12.8,3.9-18.6,10.9C1.1,23.4-.5,34.8,5.6,39.9c1.9,1.5,4.1,2.3,6.7,2.3,4.6,0,10-2.5,14.9-7l38.6,31.9-6.1,7.4c-.5.6-.4,1.4.2,1.9l1.7,1.4c.6.5,1.4.4,1.9-.2l6.1-7.4,6.6,5.5-6.1,7.4c-.4.5-.4,1.3.2,1.8l1.3,1.1c.5.4,1.3.4,1.8-.2l11.9-14.4c.6-.7.5-1.7-.2-2.2ZM14.7,17.9c6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', 
	potion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M68.2,65c0,10.8-10.8,19.5-24.1,19.5s-24.1-8.7-24.1-19.5c0-8.7,7-16.1,16.7-18.6V5.7h14.8v40.8c9.7,2.5,16.7,9.9,16.7,18.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '<path d="M44.1,5.7c-5.1,0-9.2-.5-9.2-1s4.1-1,9.2-1,9.2.5,9.2,1-4.1,1-9.2,1Z"' + ' fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', 
	weapon:"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M49.8,21.7c-13.7,15.8-27.5,31.6-41.2,47.4-.4.5-.8,1.1-1,1.7-.4,1.4,0,2.4,1.4,3.2.9.5,2.2.3,3.1-.6.2-.2.4-.4.6-.6,13.8-15.8,27.5-31.7,41.3-47.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M76.9,36.4c-3.5,5.4-8,9.5-13.7,12.4-5,2.6-10.4,3.6-16.1,1.8.6-.6,1.2-1.2,1.8-1.7,2.8-2.4,5.3-5,7.3-8.1,1.7-2.7,3.2-5.5,3.1-8.8v-.7c-.4-2.4-1.7-4.3-3.6-5.7l5-6c.4-.2.8-.2,1.5,0,3.9,1.2,7.8,1.3,11.2-1.5,1.4-1.2,2.5-2.8,3.7-4.2,0,0,0,0,0,0,0,0,0,0,.2,0,1.1,1.8,2,3.8,2.5,5.8,1.4,6,.4,11.5-2.9,16.7h0Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M55.7,25.5c1.9,1.4,3.2,3.3,3.6,5.7v.7c.2,3.4-1.3,6.2-3,8.8-2,3.1-4.5,5.7-7.3,8.1-.6.5-1.1,1.1-1.8,1.7,5.7,1.8,11.1.8,16.1-1.8,5.6-2.9,10.2-7.1,13.7-12.4,3.3-5.2,4.3-10.7,2.9-16.7-.5-2.1-1.3-4-2.5-5.8,0,0-.1,0-.2,0s0,0,0,0c-1.2,1.4-2.3,3-3.7,4.2-3.4,2.8-7.3,2.8-11.2,1.5-.7-.2-1.1-.2-1.5,0-.3.1-.5.3-.8.6-1.6,1.9-3.3,3.8-5,5.7l-5.8-5,6.3-7.3c1.7,1.5,3.3,2.9,4.9,4.3.4.3.8.6.5,1.3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <circle id=\"Filll\" cx=\"55.4\" cy=\"19.7\" r=\"3.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></circle>\n <path id=\"Filll-2\" data-name=\"Filll\" d=\"M55.4,13.7c3.3,0,6,2.7,6,6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", 
	armor: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Fills\" style='opacity: 0.5;' stroke='none' fill='currentColor'>\n <path d=\"M20,29.2c0,3.2,0,6.4.6,9.5.2,1.1.4,2.2.6,3.3h22.9V15.2h0c-.4,0-.8,0-1.2,0-3.2.9-6.3,1.7-9.5,2.6-3.8,1.1-7.5,2.2-11.3,3.3-.8.2-1.2.7-1.4,1.5-.4,2.1-.7,4.3-.7,6.5h0Z\"></path>\n <path d=\"M44.1,71.5h0c.3.1.5,0,.8,0,1-.5,2.1-.9,3-1.5,4.2-2.5,7.7-5.8,10.7-9.6,3.6-4.6,6.2-9.8,7.7-15.5.3-.9.5-1.9.7-2.8h-22.9v29.5h0Z\"></path>\n </g>\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M44.1,15.2c.8-.3,1.6.1,2.4.3,4.3,1.2,8.6,2.5,12.9,3.8,2.2.6,4.5,1.2,6.7,1.8.8.2,1.3.9,1.4,1.6.2,1.5.4,3.1.5,4.7.1,2.1.2,4.2.1,6.3,0,1.5-.3,3-.5,4.5-.1,1.2-.4,2.5-.6,3.7-.2.9-.4,1.9-.7,2.8-1.5,5.7-4.1,10.8-7.7,15.5-3,3.8-6.5,7.1-10.7,9.6-1,.6-2,1-3,1.5-.3.1-.5.2-.8.2s-.7-.1-1.1-.3c-3.3-1.5-6.1-3.5-8.7-5.9-3.4-3.1-6.2-6.7-8.4-10.6-1.9-3.4-3.3-6.9-4.2-10.7-.2-.7-.3-1.4-.4-2.1-.2-1.1-.4-2.2-.6-3.3-.6-3.2-.6-6.3-.6-9.5,0-2.2.3-4.4.7-6.5.2-.8.6-1.3,1.4-1.5,3.8-1.1,7.5-2.2,11.3-3.3,3.1-.9,6.3-1.8,9.5-2.6.4-.1.8,0,1.2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M44.1,15.3v56.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M45,7.6c1.4.4,2.7.8,4.1,1.2,2.4.7,4.9,1.4,7.3,2.1,2.8.8,5.6,1.6,8.4,2.4,2.2.6,4.4,1.3,6.6,1.9.8.2,1.6.3,2.2,1,.6.7.6,1.6.7,2.4.3,1.8.6,3.7.6,5.6.1,1.9,0,3.9,0,5.8s0,.6,0,.9c-.1,1.6-.2,3.2-.4,4.7-.2,1.6-.3,3.3-.7,4.9-.5,2.3-1.1,4.6-1.7,6.9-.7,2.8-1.7,5.4-3,8-1.4,2.8-3,5.6-4.8,8.2-2.6,3.6-5.5,6.9-8.8,9.8-2.9,2.6-6.1,4.7-9.6,6.4-.2.1-.4.2-.7.3-.9.5-1.8.4-2.8,0-3.6-1.7-6.8-3.8-9.8-6.4-2.6-2.2-4.9-4.5-7-7.2-2.4-3-4.5-6.3-6.3-9.7-1.9-3.8-3.4-7.7-4.4-11.8-.4-1.7-.8-3.4-1.2-5.1-.3-1.3-.4-2.6-.5-3.9-.4-3.1-.6-6.3-.5-9.5,0-1.5,0-3,.3-4.5.2-1.7.5-3.4.8-5.1.2-1,.9-1.5,1.8-1.8,1.7-.5,3.5-1,5.2-1.5,2.7-.8,5.5-1.6,8.2-2.4,3.2-.9,6.3-1.8,9.5-2.7,1.4-.4,2.9-.9,4.3-1.2.6-.1,1.4,0,2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <polyline points=\"66.9 42 44.1 42 21.2 42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></polyline>\n </g>\n </g>\n </g>\n </g>\n</svg>", 
	inn: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 62.55 56.26\">\n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" d=\"M55.07,34.69c-6.57,8.54-15.36,15.02-23.79,21.57-8.44-6.55-17.23-13.03-23.8-21.57C1.5,26.92-3.44,15.54,3.11,6.55,10.06-2.99,24.82-1.93,30.27,8.54c.36.7.59,1.57.94,2.24l.07.14.07-.14c.34-.67.57-1.54.94-2.24,5.45-10.47,20.21-11.53,27.15-1.99,6.56,8.99,1.62,20.37-4.37,28.14Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n</svg>", 
	villager: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 88 88\">\n \n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" id=\"path966\" d=\"M69.79,80.5c-2.54-25.58-6.66-33.2-13.41-37.4-6.8-.3-15.35,0-23.63,0-7.33,3.9-11.78,11.65-14.55,37.4h51.59Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path id=\"path710\" d=\"M59.43,22.93c0,8.52-6.91,15.43-15.43,15.43s-15.43-6.91-15.43-15.43,6.91-15.43,15.43-15.43,15.43,6.91,15.43,15.43Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <line x1=\"60.48\" y1=\"80.5\" x2=\"56.9\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n <line x1=\"27.61\" y1=\"80.5\" x2=\"31.34\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n</svg>", 
	void: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88.2 88.2\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M86.4,54.4c.9-2.3.6-4.8.3-7.3-1-7.2-2-14.4-3-21.5-.3-2.5-.7-5-2.3-7-2.6-3.2-7.9-3.8-9.7-7.6-.8-1.7-.8-3.7-1.7-5.3-.9-1.5-2.4-2.4-4-3.2-2-1-4.2-1.9-6.4-1.8-3.1.2-5.9,2.3-9,2.6-3,.3-5.8-1.1-8.6-2s-6.3-1.3-8.5.7c-.9.8-1.5,2-2.5,2.9-2.2,2-5.5,1.9-8.4,1.9-4.7,0-9.9.7-13.3,4-3.1,3-4,7.5-4.2,11.8s.4,8.6-.3,12.8c-.6,3.5-1.9,6.8-2.8,10.3s-1.2,7.2.2,10.5c1.6,3.5,5,5.9,6.7,9.3,1.8,3.6,1.5,7.9,3,11.5,2.2,5,8.1,8,13.4,6.9,2.8-.6,5.7-2.2,8.4-1.2,1.9.7,3.1,2.6,4.8,3.7,3.2,2.1,7.5.9,11-.7s7-3.8,10.8-3.5c2.1.2,4.1,1.1,6.3,1.1,2.6,0,5.2-1.3,6.6-3.5,1.5-2.4,1.9-5.2,3.5-7.6s2.9-3.3,3.6-5.6.7-3.6,1.5-5.3c1.2-2.5,3.5-4.3,4.6-6.9Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M12.1,52.5c-.8-2.5,1-5.1,1.2-7.6.6-3.8-.7-7.9-2.4-11.1-.5-1-1-2.1-1-3.1.3-3.2,4.5-3.7,6.7-5.2,2.9-1.5,5.8-4,7.9-6.7,1.6-1.8,2.7-4.3,5.1-5,2.9-.7,5.8-.2,8.7-.2,6,.4,12.6-1.3,18.2-2.7,2-.4,5.1-1.1,6.7,0,2,2.1,2.5,5.9,3.4,8.6.8,3.3,3.8,7.7,7,10.5,1.4,1.4,1.8,3,1.6,4.9-.2,3,.1,6.8,1.5,9.9.7,2.4,3.1,4.4,3.2,7-.6,2.5-4.1,3.9-5.5,6.1-1.7,2.2-2.7,4.5-3.3,6.6-.5,1.5-1.2,3.1-2.5,4.1-3.9,2.1-8.6,3.5-14.4,5.9-3.4,1.2-5.3,2.7-8.6,2.9-2.9-.2-6.6-2.2-10-2.3-4.4,0-8.3-1.8-12.8-2.8-2.2-.6-2.4-2.8-2.7-4.7-.6-3.2-2.1-6.5-3.8-9-1.3-2.1-3.3-3.7-4.2-6v-.2Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M28.9,60.3c-.6-.7-1-1.6-1.4-2.5-1.2-2.8-2.8-5.3-4.9-7.6-1.2-1.3-2.9-2.6-2.2-4.6,1.1-3,2.3-6,2.8-9.2.4-4.7,1.7-5.3,5.4-7.3,4.7-2.8,8.8-6.5,12.1-9.9.9-.9,2-1.3,3.2-.6,3.4,2.6,7.5,4.8,11.4,5.9,1.5.4,2.8,1.2,3.7,2.5,1.8,2.5,4.2,5.3,6.7,7.2,1.6,1.1,2.1,2.9,1.9,4.8-.1,2.3,0,4.7.3,6.6.3,1.5.3,3.1-.6,4.5-2,2.8-4.1,5.5-6.2,8.5-1.5,2.1-2.8,4.4-5.5,5-4,.9-7.4,3.4-11.3,4.4-1.6.4-3.1-.2-4.2-1.2-2.7-2.1-5.9-3.9-9.1-5.2-.7-.3-1.4-.7-1.9-1.2h-.1Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", 
	stairs: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2"  aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points="88.1 24 68 24 68 40 52 40 52 56 36 56 36 72 18 72 18 88.1"/> </svg>', 
	stairsD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points=".2 24 20.3 24 20.3 40 36.3 40 36.3 56 52.3 56 52.3 72 70.3 72 70.3 88.1"/> </svg>' }


try{
	newIcons = getIcons()
	iconNames = Object.keys(newIcons);
	for(icon of iconNames){
		icons[icon] = newIcons[icon];
}}
catch(e){console.log(e)}

levelNames = Object.keys(levels);

for(levName of levelNames){
	newPage = document.createElement("div");
	newPage.setAttribute("class", "page");
	newPage.setAttribute("id", levName);
	newHeader = document.createElement("p");
	newHeader.setAttribute("class", "header");
	newName = document.createElement("p");
	newName.innerHTML = translate(levName)
	newHeader.innerHTML = head;
	
	newTable = makeTable(levels[levName])
	
	newPage.appendChild(newHeader);
	newPage.appendChild(newName);
	newPage.appendChild(newTable);
	myBook.appendChild(newPage);
	
}


//art page
newPage = document.createElement("div");
newPage.setAttribute("class", "page");
newPage.setAttribute("id", "art");
newHeader = document.createElement("p");
newHeader.setAttribute("class", "header");
newHeader.innerHTML = head;
newName = document.createElement("p");
newName.innerText = artof + " " + head;	
newPage.appendChild(newHeader);
newPage.appendChild(newName);

var iconGrid = document.createElement("div");
iconGrid.setAttribute("class", "iconGrid");
iconKeys = Object.keys(icons);
for( let i = 0; i < iconKeys.length; i++){
	var newCell = document.createElement("div");
	var newName = document.createElement("p");
	newName.innerHTML = iconKeys[i];
	newCell.appendChild(newName);
	newCell.innerHTML += icons[iconKeys[i]];
	iconGrid.appendChild(newCell);
	
}

newPage.appendChild(iconGrid);
myBook.appendChild(newPage);

function makeTable(level){
	myThings = getThings(level.items);
	var table = document.createElement("table");
	rows = level.rows;
	cols = level.cols;
	//make header row
	var header = document.createElement("thead");
	//starting with an empty cell
	header.appendChild(document.createElement("TH"));
	for(let c = 0; c < cols; c++){
		let myCell = document.createElement("TH");
		myCell.textContent = "," + String.fromCharCode(c+65);
		header.appendChild(myCell);
	}
	table.appendChild(header);
	for (let r = 0; r < rows; r++){
		var myRow = document.createElement("tr");
		var myHead = document.createElement("th");
		myHead.textContent = "#" + numFix(String(r + 1));
		myRow.appendChild(myHead);
		for(let c = 0; c < cols; c++){
			var myCell = document.createElement("td");
				if(myThings[getPOS(r, c)]){
					if (myThings[getPOS(r, c)].type == "wall"){
						myCell.innerHTML = icons.wall;
					}
					else if (myThings[getPOS(r, c)].type == "stairs"){
						myCell.innerHTML = icons.stairs;
					}
				}
			myRow.appendChild(myCell);
		}
		table.appendChild(myRow);
	}
	return table
}

function getPOS(r, c){
	c = String.fromCharCode(c+65).toUpperCase();
	r = r + 1
	return (c+r)
}

function getThings(items){
	things = {}
	for(let i = 0; i < items.length; i++){
		newThing = {type: items[i].type}
		if(items[i].meta){newThing.meta = items[i].meta}
		things[items[i].pos] = newThing;
	}
	
	return things;
	
}

function translate(english){
	//quick and dirty translator for nowsies
	//check for capital letters
	var translated = english.replace(/[A-Z]/g,  "," + "$&".toLowerCase());
	//check for numbers
	var translated = translated.replace(/[\d]+/g,  "#" +  "$&");
	if (translated.indexOf("#")) {
		numAt = translated.indexOf("#")
		translated = translated.substring(numAt + 1, -1) + numFix(translated.substring(numAt + 1));
		
	}
	return translated;
}

function numFix(digits){
	letters = ""
	for (num in digits){
		if(parseInt(digits[num]) == 0){
			letters += "j";
		}
		else if(parseInt(digits[num])){
			letters += String.fromCharCode(parseInt(digits[num]) + 64);
		}
		else{
			//no longer reading numbers!
			letters += ";"
			letters += digits.substring(num);
			return letters;
		}
	}
	return letters;
	
}

