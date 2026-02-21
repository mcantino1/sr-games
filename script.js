

/*
  NOTE: Fix for ReferenceError: MAX_SIZE is not defined
  - MAX_SIZE is defined early and used for grid scaling and clamping.
*/

/* ---------------- Constants / Game State ---------------- */
const MAX_SIZE = 12; // maximum grid size used for consistent scaling
const MAX_LIFE = 100; // global maximum life cap for players
var baseLife = 20;
var root = document.querySelector(':root')
// Audio setup for footstep sounds
let footstepAudio = null;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
var levels;

var effectToggle = document.getElementById("effectToggle");
var tonesToggle = document.getElementById("toneToggle");
var speechBox = document.getElementById("speechToggle");
var voiceBox = document.getElementById("voiceSelector");
var speedBox = document.getElementById("voiceSpeed");
var pitchBox = document.getElementById("voicePitch");
var volBox = document.getElementById("voiceVol");
var speedBoxEffect = document.getElementById("effectSpeed");
var pitchBoxEffect = document.getElementById("effectPitch");
var volBoxEffect = document.getElementById("effectVol");
var speedBoxTone = document.getElementById("toneSpeed");
var pitchBoxTone = document.getElementById("tonePitch");
var volBoxTone = document.getElementById("toneVol");







var voiceSpeed = speedBox.value * 0.2;
var voicePitch = pitchBox.value * 0.2;
var voiceVol = volBox.value * 0.1;




function initCheckbox(vari, cook, box){
	myCook = getCookie(cook);
	if (myCook == "true"){
		box.checked = true;
		return true;
	}
	else if (myCook == "false"){
		box.checked = false;
		return false;
	}
	return vari;
}

function initSetting(cook, field){
	myCook = getCookie(cook);
	if (myCook != ''){
		field.value = myCook;
	}
}

function initCSS(varName){
	thisVar = "--" + varName;
	myCook = getCookie(thisVar)
	if (myCook != ''){
		root.style.setProperty(thisVar, myCook);
	}
}

 function initGame(){
	 gameName = document.getElementsByTagName("H1")[0].children[0];
	try{
	gameName.innerHTML = getName();
	document.getElementsByTagName("title")[0].innerHTML = getName();
	}catch(e){console.log("Name not defined in game files")}

	 LEVELS = getLevels();
	 getLevelIcons();
	 levels = []
	 myKeys = Object.keys(LEVELS);
	 
	 //level = JSON.parse(JSON.stringify(LEVELS[id]));
	 for (let k = 0; k < myKeys.length; k ++){
		 levels[myKeys[k]] = JSON.parse(JSON.stringify(LEVELS[myKeys[k]]));
		 levels[myKeys[k]].foundKey = false;
	 }
	 try {
	  window.__campaignStartup = true;
	  loadLevel(myKeys[0]);
	} catch (e) {
	  console.error('Failed to start campaign level:', e);
	  document.getElementById('currentText').textContent = 'Failed to start campaign.';
	}
	 
 }
 
 function getLevelIcons(){
	
	try{
		newIcons = getIcons()
		iconNames = Object.keys(newIcons);
		for(icon of iconNames){
			ICONS[icon] = newIcons[icon];
	}}
	catch(e){console.log(e)}
 }
 
 
var wallPhrases = ["The wall is gross. Your hands are sticky. ", "The wall tastes delicious! ", "Wall, my old friend! ", "A wall blocks your way. ", "The wall sneaks up on you.", "The wall squeaks when you touch it. Strange.", "The wall smells wet and soupy."]
var wallCount = 0;


				

var toneVol = volBoxTone.value;
//pitch adjust
// 5 = 1
// 10 = 10
// 1 = 0.1
var tonePitch = pitchBoxTone.value * 0.2;
var soundEnd = 0;
var currentSound = "";

var toneLength = 0.5 / speedBoxTone.value;
var toneOscillator = audioContext.createOscillator();

function playTones(dirs){
	const now = Math.max(audioContext.currentTime, soundEnd);
	
	try{toneOscillator.stop(audioContext.currentTime);}
	catch(e){}
	toneOscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();
	toneOscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	toneOscillator.type = 'sine';
	
	let dur = toneLength * 4;

	freq = 100 * tonePitch;
	fStep = 100;
	
	for (let i = 0; i < dirs.length; i++){		
		toneOscillator.frequency.setValueAtTime(freq + (fStep * i), now + (toneLength * i));
		if (dirs[i] == true){gainNode.gain.setValueAtTime(toneVol,  now + (toneLength * i));}
		else{gainNode.gain.setValueAtTime(0,  now + (toneLength * i));}
	}
	toneOscillator.start(now);
	toneOscillator.stop(now + dur);	

	
}

// 5 = 1
// 1 = +
// 10 = 0.25

var soundSpeed = 5 / speedBoxEffect.value;
var volume = volBoxEffect.value * 2;
var effectPitch = pitchBoxEffect.value * 0.2;

function playSound(name){
	if (!soundBank[name] || soundEffects == false){return;}
	mySound = soundBank[name];
	const now = audioContext.currentTime;  
	if(now < soundEnd && currentSound != "step"){return;}
	currentSound = name;
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	oscillator.type = mySound.type;
	var dur = (mySound.dur * soundSpeed);
	soundEnd = now + dur
	oscillator.frequency.setValueAtTime((mySound.frequency * effectPitch), now);
	gainNode.gain.setValueAtTime(0, now);
	myNodes = mySound.nodes;
	for (let n = 0; n < myNodes.length; n++){
		if(myNodes[n].type == "frequency"){
			oscillator.frequency.linearRampToValueAtTime((myNodes[n].value * effectPitch), now + (dur * myNodes[n].time));
		}
		else { //gain
			gainNode.gain.linearRampToValueAtTime((myNodes[n].value * volume), now + (dur * myNodes[n].time));
		}
	}
	oscillator.start(now);
	oscillator.stop(soundEnd);
	
	if (mySound.layers > 1)
	{
		nodes = mySound.layers + 1
		for(let s = 2; s < nodes; s++){
			const oscillatorB = audioContext.createOscillator();
			const gainNodeB = audioContext.createGain();
			oscillatorB.connect(gainNodeB);
			gainNodeB.connect(audioContext.destination);
			oscillatorB.type = mySound.type;
			oscillatorB.frequency.setValueAtTime(mySound.frequency, now);
			gainNodeB.gain.setValueAtTime(0, now);
			
			myNodes = mySound["nodes" + s];
			
			 for (let n = 0; n < myNodes.length; n++){
				if(myNodes[n].type == "frequency"){
					oscillatorB.frequency.linearRampToValueAtTime(myNodes[n].value, now + (dur * myNodes[n].time));
				}
				else { //gain
					gainNodeB.gain.linearRampToValueAtTime((myNodes[n].value * volume), now + (dur * myNodes[n].time));
					
				}
			}
			oscillatorB.start(now);
			oscillatorB.stop(soundEnd);			
		}		
	}
}

var soundBank = {"step": {"dur": 0.1, "type": "sine", "frequency": 15, "layers": 1, "nodes": [{"type": "frequency", "value": 15, "time": 0}, {"type": "frequency", "value": 30, "time": 0.5}, {"type": "frequency", "value": 10, "time": 1}, {"type": "gain", "value": 1, "time": 0.01}, {"type": "gain", "value": 0.01, "time": 0.31}, {"type": "gain", "value": 1, "time": 0.35}, {"type": "gain", "value": 0.01, "time": 0.65}, {"type": "gain", "value": 1, "time": 0.69}, {"type": "gain", "value": 0.01, "time": 0.99}]},
				"wall": {"dur": 0.05, "type": "sine", "frequency": 120, "layers": 1, "nodes": [{"type": "frequency", "value": 60, "time": 1}, {"type": "gain", "value": 1, "time": 0.25}, {"type": "gain", "value": 0.01, "time": 0.99}]},
				"key": {"dur": 0.4, "type": "sine", "frequency": 400, "layers": 1, "nodes": [{"type": "frequency", "value": 650, "time": 1}, {"type": "gain", "value": 0.5, "time": 0.01}, {"type": "gain", "value": 0.01, "time": 0.31}, {"type": "gain", "value": 0.5, "time": 0.35}, {"type": "gain", "value": 0.01, "time": 0.65}, {"type": "gain", "value": 0.5, "time": 0.69}, {"type": "gain", "value": 0.01, "time": 0.99}]},
				"door": {"dur": 0.5, "type": "sawtooth", "frequency": 50, "layers": 1, "nodes": [{"type": "frequency", "value": 10, "time": 1}, {"type": "gain", "value": 1, "time": 0.01}, {"type": "gain", "value": 0.3, "time": 0.9}, {"type": "gain", "value": 0.01, "time": 1}] },
				"get": {"dur": 0.15, "type": "sine", "frequency": 100, "layers": 1, "nodes": [{"type": "frequency", "value": 150, "time": 0.15}, {"type": "frequency", "value": 200, "time": 0.3}, {"type": "frequency", "value": 150, "time": 0.6}, {"type": "frequency", "value": 200, "time": 0.75}, {"type": "frequency", "value": 100, "time": 1}, {"type": "gain", "value": 1, "time": 0.01}, {"type": "gain", "value": 0.01, "time": 0.3}, {"type": "gain", "value": 1, "time": 0.75}, {"type": "gain", "value": 0.01, "time": 1}]},
				"drink": {"dur": 0.1, "type": "sine", "frequency": 100, "layers": 1, "nodes": [{"type": "frequency", "value": 50, "time": 0.5}, {"type": "frequency", "value": 200, "time": 1}, {"type": "gain", "value": 1, "time": 0.01}, {"type": "gain", "value": 0.01, "time": 1}]},
				"fall": {"dur": 1, "type": "sine", "frequency": 800, "layers": 1, "nodes": [{"type": "frequency", "value": 300, "time": 1}, {"type": "gain", "value": 1, "time": 0.01}, {"type": "gain", "value": .01, "time": 1}]},
				"growl": {"layers": 2, "dur": 0.5, "type": "triangle", "frequency": 50, "nodes": [{"type": "frequency", "value": 40, "time": 1}, {"type": "gain", "value": 1, "time": 0.01}, {"type": "gain", "value": 0.25, "time": 0.5}, {"type": "gain", "value": 0.01, "time": 1}], "nodes2": [{"type": "frequency", "value": 50, "time": 0}, {"type": "frequency", "value": 100, "time": 1}, {"type": "gain", "value": 1 , "time": 0 }, {"type": "gain", "value": 0.01 , "time": 0.083 }, {"type": "gain", "value": 1 , "time": 0.084 }, {"type": "gain", "value": 0.01 , "time": 0.166 }, {"type": "gain", "value": 1 , "time": 0.167 }, {"type": "gain", "value": 0.01 , "time": 0.25 }, {"type": "gain", "value": 1 , "time": 0.251 }, {"type": "gain", "value": 0.01 , "time": 0.333 }, {"type": "gain", "value": 1 , "time": 0.334 }, {"type": "gain", "value": 0.01 , "time": 0.416 }, {"type": "gain", "value": 1 , "time": 0.417 }, {"type": "gain", "value": 0.01 , "time": 0.5 }]},
				"slay": {"layers": 2, "dur": 0.5, "type": "triangle", "frequency": 200, "nodes": [{"type": "frequency", "value": 40, "time": 1}, {"type": "gain", "value": 0.5, "time": 0.01}, {"type": "gain", "value": 1, "time": 0.5},  {"type": "gain", "value": 0.01, "time":1}], "nodes2": [{"type": "frequency", "value": 50, "time": 0}, {"type": "frequency", "value": 100, "time": 1}, {"type": "gain", "value": 1 , "time": 0 }, {"type": "gain", "value": 0.01 , "time": 0.083 }, {"type": "gain", "value": 1 , "time": 0.084 }, {"type": "gain", "value": 0.01 , "time": 0.166 }, {"type": "gain", "value": 1 , "time": 0.167 }, {"type": "gain", "value": 0.01 , "time": 0.25 }, {"type": "gain", "value": 1 , "time": 0.251 }, {"type": "gain", "value": 0.01 , "time": 0.333 }, {"type": "gain", "value": 1 , "time": 0.334 }, {"type": "gain", "value": 0.01 , "time": 0.416 }, {"type": "gain", "value": 1 , "time": 0.417 }, {"type": "gain", "value": 0.01 , "time": 0.5 }] }
				};
				
  




let currentLevelId = "level1";
let level = null;
let player = { row: 0, col: 0 };
let visited = new Set();
let revealedByBump = new Set();
// Revealed tiles around the player (fog-of-war neighbors)
let revealedNeighbors = new Set();
// Tracks discovered special icons even after the item is collected/removed.
// Map of pos -> type ("key" | "treasure" | "monster").
let revealedSpecial = new Map();
let completed = false;
let stats = { life: baseLife, strength: 2, defense: 0, gold: 0, key: false };
let discoveryLog = [];

// Monsters are tracked separately so they can have HP and be defeated.
// Keyed by position string like "D3".
let monsters = new Map(); // pos -> { hp, attack }

/* ---------------- SVG ICONS ---------------- */
function svgWrap(inner) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${inner}</svg>`;
}
var ICONS = {
  player: 
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' +
    '<defs><style>.cls-1{fill:currentColor}.cls-1,.cls-2{stroke:currentColor;stroke-miterlimit:10;stroke-width:4px}.cls-2{fill:none}</style></defs>' +
    '<g><g id="Layer_1"><rect class="cls-2" x="32.6" y="38.8" width="2.4" height="31.2" transform="translate(-28.5 39.8) rotate(-45)"/>' +
    '<path class="cls-1" d="M16.7,81.5c-2.8,2.8-7.2,2.8-10,0-2.8-2.8-2.8-7.2,0-10,1.7-1.7,3.9-2.3,6.1-2l14.2-14.2,5.9,5.9-14.2,14.2c.3,2.1-.3,4.4-2,6.1Z"/>' +
    '<polygon class="cls-2" points="79.2 18.2 42.3 55.1 33.1 45.8 70 9 83.6 4.6 79.2 18.2"/>' +
    '<path class="cls-2" d="M44.8-.6"/>' +
    '</g></g></svg>'
  ,
  wall:  `<svg viewBox="0 0 88.19 88.19" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width="86.19" height="86.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="1" y1="65.64" x2="87.19" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="1" y1="44.09" x2="87.19" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="1" y1="22.55" x2="87.19" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="33.93" y1="1" x2="33.93" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="64.74" y1="1" x2="64.74" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="12.59" y1="22.55" x2="12.59" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="44.69" y1="22.55" x2="44.69" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="79.26" y1="22.55" x2="79.26" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="19.41" y1="44.09" x2="19.41" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="53.48" y1="44.09" x2="53.48" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="71.85" y1="65.64" x2="71.85" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <line x1="30.07" y1="65.64" x2="30.07" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <path d="M21.73,23.25c.57,2.12,3.27,3.14,3.81,5.27.37,1.46-.38,3.19.48,4.43.32.46.81.76,1.25,1.11,1.38,1.07,2.38,2.64,2.75,4.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <path d="M70.94,51.36c.69-2.36,2.19-4.47,4.18-5.9.55.04.73.08,1.27.13.44.04.88.07,1.31-.03s.84-.36,1.01-.76" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <path d="M47.63,87.2c-.55-2.12-1.3-4.18-2.24-6.16" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <path d="M73.03,1.7c.92,2.16,2.6,4.86,3.51,7.02" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <path d="M12.4,1.37c.52,2.3-.47,5.69-2.26,7.23" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
    <path d="M10.89,5.91l3.37,2.03c.17.69.68,1.3,1.33,1.59" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/>
  </svg>`,
  monster: 
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' +
    '<g stroke="currentColor" stroke-miterlimit="10" stroke-width="4" fill="none">' +
      '<path d="M77.9,37.4c0,11.5-5.7,21.7-14.5,27.8v18.2H24.8v-18.2c-8.8-6.1-14.5-16.3-14.5-27.8C10.3,18.7,25.4,3.6,44.1,3.6s33.8,15.1,33.8,33.8Z"/>' +
      '<polyline points="63.4 72.9 63.4 83.4 24.8 83.4 24.8 72.9"/>' +
      '<line x1="53.8" y1="72.9" x2="53.8" y2="83.4"/>' +
      '<line x1="44.1" y1="72.9" x2="44.1" y2="83.4"/>' +
      '<line x1="34.4" y1="72.9" x2="34.4" y2="83.4"/>' +
    '</g>' +
    '<g fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="4">' +
      '<path d="M25.9,31.9c0-2.4,2.1-5.3,4.3-4.3s3.1,2.2,4.3,4.3-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3Z"/>' +
      '<path d="M62.3,31.9c0-2.4-2.1-5.3-4.3-4.3s-3.1,2.2-4.3,4.3,1.9,4.3,4.3,4.3,4.3-1.9,4.3-4.3Z"/>' +
      '<path d="M42.7,43.5l-1.5,2.6c-.6,1.1.2,2.5,1.4,2.5h3c1.3,0,2-1.4,1.4-2.5l-1.5-2.6c-.6-1.1-2.2-1.1-2.8,0Z"/>' +
    '</g>' +
    '</svg>',
  treasure: 
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' +

      '<path d="M52,34.7c-.5.9-1.3,1.3-2.3,2.1l4.1,11.4h-19.6,0c0,0,4.1-11.4,4.1-11.4-.7-.6-1.3-1.3-1.8-2.1H3.5v46.1h81.2v-46.1h-32.7Z"' +
        ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +

      '<path d="M44,21.3c4.9,0,8.8,3.9,8.8,8.8s0,1.6-.1,2.2h31.9v-9.9c0-8.3-6.7-15-15-15H18.5c-8.3,0-15,6.7-15,15v9.9h32c-.2-.7-.3-1.4-.3-2.2,0-4.9,3.9-8.8,8.8-8.8Z"' +
        ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +

    '</svg>',
  door: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' +
							 '<g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10">' +
								 '<rect x="15.8" y="3.2" width="56.7" height="81.8"/>' +
								 '<circle cx="62.1" cy="46.9" r="4.6"/>' +
							 '</g>' +
						 '</svg>',
  key:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' +
      '<path d="M31,15.9c-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6,6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7Z" fill="none"/>' +
      '<path d="M85,69.1L34,26.9c2-3.2,3.3-6.5,3.9-9.7,1-5.4-.1-9.8-3.3-12.4-1.9-1.5-4.1-2.3-6.7-2.3-5.8,0-12.8,3.9-18.6,10.9C1.1,23.4-.5,34.8,5.6,39.9c1.9,1.5,4.1,2.3,6.7,2.3,4.6,0,10-2.5,14.9-7l38.6,31.9-6.1,7.4c-.5.6-.4,1.4.2,1.9l1.7,1.4c.6.5,1.4.4,1.9-.2l6.1-7.4,6.6,5.5-6.1,7.4c-.4.5-.4,1.3.2,1.8l1.3,1.1c.5.4,1.3.4,1.8-.2l11.9-14.4c.6-.7.5-1.7-.2-2.2ZM14.7,17.9c6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6Z"' +
        ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +
    '</svg>',
  
  potion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' +
      '<path d="M68.2,65c0,10.8-10.8,19.5-24.1,19.5s-24.1-8.7-24.1-19.5c0-8.7,7-16.1,16.7-18.6V5.7h14.8v40.8c9.7,2.5,16.7,9.9,16.7,18.6Z"' +
        ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +
      '<path d="M44.1,5.7c-5.1,0-9.2-.5-9.2-1s4.1-1,9.2-1,9.2.5,9.2,1-4.1,1-9.2,1Z"' +
        ' fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +
    '</svg>',
	weapon:"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n  \n  <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236)  -->\n  <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n    <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n      <path d=\"M49.8,21.7c-13.7,15.8-27.5,31.6-41.2,47.4-.4.5-.8,1.1-1,1.7-.4,1.4,0,2.4,1.4,3.2.9.5,2.2.3,3.1-.6.2-.2.4-.4.6-.6,13.8-15.8,27.5-31.7,41.3-47.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n      <path d=\"M76.9,36.4c-3.5,5.4-8,9.5-13.7,12.4-5,2.6-10.4,3.6-16.1,1.8.6-.6,1.2-1.2,1.8-1.7,2.8-2.4,5.3-5,7.3-8.1,1.7-2.7,3.2-5.5,3.1-8.8v-.7c-.4-2.4-1.7-4.3-3.6-5.7l5-6c.4-.2.8-.2,1.5,0,3.9,1.2,7.8,1.3,11.2-1.5,1.4-1.2,2.5-2.8,3.7-4.2,0,0,0,0,0,0,0,0,0,0,.2,0,1.1,1.8,2,3.8,2.5,5.8,1.4,6,.4,11.5-2.9,16.7h0Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n      <path d=\"M55.7,25.5c1.9,1.4,3.2,3.3,3.6,5.7v.7c.2,3.4-1.3,6.2-3,8.8-2,3.1-4.5,5.7-7.3,8.1-.6.5-1.1,1.1-1.8,1.7,5.7,1.8,11.1.8,16.1-1.8,5.6-2.9,10.2-7.1,13.7-12.4,3.3-5.2,4.3-10.7,2.9-16.7-.5-2.1-1.3-4-2.5-5.8,0,0-.1,0-.2,0s0,0,0,0c-1.2,1.4-2.3,3-3.7,4.2-3.4,2.8-7.3,2.8-11.2,1.5-.7-.2-1.1-.2-1.5,0-.3.1-.5.3-.8.6-1.6,1.9-3.3,3.8-5,5.7l-5.8-5,6.3-7.3c1.7,1.5,3.3,2.9,4.9,4.3.4.3.8.6.5,1.3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n      <circle id=\"Filll\" cx=\"55.4\" cy=\"19.7\" r=\"3.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></circle>\n      <path id=\"Filll-2\" data-name=\"Filll\" d=\"M55.4,13.7c3.3,0,6,2.7,6,6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n    </g>\n  </g>\n</svg>",
	armor:	"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n  \n  <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236)  -->\n  <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n    <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n      <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n        <g id=\"Fills\" style='opacity: 0.5;' stroke='none' fill='currentColor'>\n          <path d=\"M20,29.2c0,3.2,0,6.4.6,9.5.2,1.1.4,2.2.6,3.3h22.9V15.2h0c-.4,0-.8,0-1.2,0-3.2.9-6.3,1.7-9.5,2.6-3.8,1.1-7.5,2.2-11.3,3.3-.8.2-1.2.7-1.4,1.5-.4,2.1-.7,4.3-.7,6.5h0Z\"></path>\n          <path d=\"M44.1,71.5h0c.3.1.5,0,.8,0,1-.5,2.1-.9,3-1.5,4.2-2.5,7.7-5.8,10.7-9.6,3.6-4.6,6.2-9.8,7.7-15.5.3-.9.5-1.9.7-2.8h-22.9v29.5h0Z\"></path>\n        </g>\n        <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n          <path d=\"M44.1,15.2c.8-.3,1.6.1,2.4.3,4.3,1.2,8.6,2.5,12.9,3.8,2.2.6,4.5,1.2,6.7,1.8.8.2,1.3.9,1.4,1.6.2,1.5.4,3.1.5,4.7.1,2.1.2,4.2.1,6.3,0,1.5-.3,3-.5,4.5-.1,1.2-.4,2.5-.6,3.7-.2.9-.4,1.9-.7,2.8-1.5,5.7-4.1,10.8-7.7,15.5-3,3.8-6.5,7.1-10.7,9.6-1,.6-2,1-3,1.5-.3.1-.5.2-.8.2s-.7-.1-1.1-.3c-3.3-1.5-6.1-3.5-8.7-5.9-3.4-3.1-6.2-6.7-8.4-10.6-1.9-3.4-3.3-6.9-4.2-10.7-.2-.7-.3-1.4-.4-2.1-.2-1.1-.4-2.2-.6-3.3-.6-3.2-.6-6.3-.6-9.5,0-2.2.3-4.4.7-6.5.2-.8.6-1.3,1.4-1.5,3.8-1.1,7.5-2.2,11.3-3.3,3.1-.9,6.3-1.8,9.5-2.6.4-.1.8,0,1.2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n          <path d=\"M44.1,15.3v56.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n          <path d=\"M45,7.6c1.4.4,2.7.8,4.1,1.2,2.4.7,4.9,1.4,7.3,2.1,2.8.8,5.6,1.6,8.4,2.4,2.2.6,4.4,1.3,6.6,1.9.8.2,1.6.3,2.2,1,.6.7.6,1.6.7,2.4.3,1.8.6,3.7.6,5.6.1,1.9,0,3.9,0,5.8s0,.6,0,.9c-.1,1.6-.2,3.2-.4,4.7-.2,1.6-.3,3.3-.7,4.9-.5,2.3-1.1,4.6-1.7,6.9-.7,2.8-1.7,5.4-3,8-1.4,2.8-3,5.6-4.8,8.2-2.6,3.6-5.5,6.9-8.8,9.8-2.9,2.6-6.1,4.7-9.6,6.4-.2.1-.4.2-.7.3-.9.5-1.8.4-2.8,0-3.6-1.7-6.8-3.8-9.8-6.4-2.6-2.2-4.9-4.5-7-7.2-2.4-3-4.5-6.3-6.3-9.7-1.9-3.8-3.4-7.7-4.4-11.8-.4-1.7-.8-3.4-1.2-5.1-.3-1.3-.4-2.6-.5-3.9-.4-3.1-.6-6.3-.5-9.5,0-1.5,0-3,.3-4.5.2-1.7.5-3.4.8-5.1.2-1,.9-1.5,1.8-1.8,1.7-.5,3.5-1,5.2-1.5,2.7-.8,5.5-1.6,8.2-2.4,3.2-.9,6.3-1.8,9.5-2.7,1.4-.4,2.9-.9,4.3-1.2.6-.1,1.4,0,2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n          <polyline points=\"66.9 42 44.1 42 21.2 42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></polyline>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>",
	inn: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 62.55 56.26\">\n  <path style=\" scale: 0.9; transform: translate(4px, 4px);\" d=\"M55.07,34.69c-6.57,8.54-15.36,15.02-23.79,21.57-8.44-6.55-17.23-13.03-23.8-21.57C1.5,26.92-3.44,15.54,3.11,6.55,10.06-2.99,24.82-1.93,30.27,8.54c.36.7.59,1.57.94,2.24l.07.14.07-.14c.34-.67.57-1.54.94-2.24,5.45-10.47,20.21-11.53,27.15-1.99,6.56,8.99,1.62,20.37-4.37,28.14Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n</svg>",
	villager: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 88 88\">\n  \n  <path style=\" scale: 0.9; transform: translate(4px, 4px);\" id=\"path966\" d=\"M69.79,80.5c-2.54-25.58-6.66-33.2-13.41-37.4-6.8-.3-15.35,0-23.63,0-7.33,3.9-11.78,11.65-14.55,37.4h51.59Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n  <path id=\"path710\" d=\"M59.43,22.93c0,8.52-6.91,15.43-15.43,15.43s-15.43-6.91-15.43-15.43,6.91-15.43,15.43-15.43,15.43,6.91,15.43,15.43Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n  <line x1=\"60.48\" y1=\"80.5\" x2=\"56.9\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n  <line x1=\"27.61\" y1=\"80.5\" x2=\"31.34\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n</svg>",
	void: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88.2 88.2\">\n  \n  <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236)  -->\n  <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n    <g id=\"Layer_1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n      <path d=\"M86.4,54.4c.9-2.3.6-4.8.3-7.3-1-7.2-2-14.4-3-21.5-.3-2.5-.7-5-2.3-7-2.6-3.2-7.9-3.8-9.7-7.6-.8-1.7-.8-3.7-1.7-5.3-.9-1.5-2.4-2.4-4-3.2-2-1-4.2-1.9-6.4-1.8-3.1.2-5.9,2.3-9,2.6-3,.3-5.8-1.1-8.6-2s-6.3-1.3-8.5.7c-.9.8-1.5,2-2.5,2.9-2.2,2-5.5,1.9-8.4,1.9-4.7,0-9.9.7-13.3,4-3.1,3-4,7.5-4.2,11.8s.4,8.6-.3,12.8c-.6,3.5-1.9,6.8-2.8,10.3s-1.2,7.2.2,10.5c1.6,3.5,5,5.9,6.7,9.3,1.8,3.6,1.5,7.9,3,11.5,2.2,5,8.1,8,13.4,6.9,2.8-.6,5.7-2.2,8.4-1.2,1.9.7,3.1,2.6,4.8,3.7,3.2,2.1,7.5.9,11-.7s7-3.8,10.8-3.5c2.1.2,4.1,1.1,6.3,1.1,2.6,0,5.2-1.3,6.6-3.5,1.5-2.4,1.9-5.2,3.5-7.6s2.9-3.3,3.6-5.6.7-3.6,1.5-5.3c1.2-2.5,3.5-4.3,4.6-6.9Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n      <path d=\"M12.1,52.5c-.8-2.5,1-5.1,1.2-7.6.6-3.8-.7-7.9-2.4-11.1-.5-1-1-2.1-1-3.1.3-3.2,4.5-3.7,6.7-5.2,2.9-1.5,5.8-4,7.9-6.7,1.6-1.8,2.7-4.3,5.1-5,2.9-.7,5.8-.2,8.7-.2,6,.4,12.6-1.3,18.2-2.7,2-.4,5.1-1.1,6.7,0,2,2.1,2.5,5.9,3.4,8.6.8,3.3,3.8,7.7,7,10.5,1.4,1.4,1.8,3,1.6,4.9-.2,3,.1,6.8,1.5,9.9.7,2.4,3.1,4.4,3.2,7-.6,2.5-4.1,3.9-5.5,6.1-1.7,2.2-2.7,4.5-3.3,6.6-.5,1.5-1.2,3.1-2.5,4.1-3.9,2.1-8.6,3.5-14.4,5.9-3.4,1.2-5.3,2.7-8.6,2.9-2.9-.2-6.6-2.2-10-2.3-4.4,0-8.3-1.8-12.8-2.8-2.2-.6-2.4-2.8-2.7-4.7-.6-3.2-2.1-6.5-3.8-9-1.3-2.1-3.3-3.7-4.2-6v-.2Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n      <path d=\"M28.9,60.3c-.6-.7-1-1.6-1.4-2.5-1.2-2.8-2.8-5.3-4.9-7.6-1.2-1.3-2.9-2.6-2.2-4.6,1.1-3,2.3-6,2.8-9.2.4-4.7,1.7-5.3,5.4-7.3,4.7-2.8,8.8-6.5,12.1-9.9.9-.9,2-1.3,3.2-.6,3.4,2.6,7.5,4.8,11.4,5.9,1.5.4,2.8,1.2,3.7,2.5,1.8,2.5,4.2,5.3,6.7,7.2,1.6,1.1,2.1,2.9,1.9,4.8-.1,2.3,0,4.7.3,6.6.3,1.5.3,3.1-.6,4.5-2,2.8-4.1,5.5-6.2,8.5-1.5,2.1-2.8,4.4-5.5,5-4,.9-7.4,3.4-11.3,4.4-1.6.4-3.1-.2-4.2-1.2-2.7-2.1-5.9-3.9-9.1-5.2-.7-.3-1.4-.7-1.9-1.2h-.1Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n    </g>\n  </g>\n</svg>",
	stairs: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline  fill="none" stroke="currentColor" stroke-width="4" points="88.1 24 68 24 68 40 52 40 52 56 36 56 36 72 18 72 18 88.1"/> </svg>',
	stairsD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points=".2 24 20.3 24 20.3 40 36.3 40 36.3 56 52.3 56 52.3 72 70.3 72 70.3 88.1"/> </svg>'
				
};

/* ---------------- DEMO LEVELS ---------------- */
let LEVELS = {
  level1: {
    id: "level1",
    rows: 6,
    cols: 6,
    items: [
      {type:"wall", pos:"B1"},
      {type:"wall", pos:"B2"},
      {type:"wall", pos:"B3"},
      {type:"monster", pos:"D3"},
      {type:"treasure", pos:"C4"},
      {type:"potion", pos:"E2"},
      {type:"key", pos:"C5"},
      {type:"void", pos:"E4"},
      {type:"door", pos:"F6"}
    ],
    scenes: {
      "A1":"A quiet entryway. The air is still. ",
      "D3":"A low growl echoes in the dark. "
    },
    nextLevelId: "level2"
  },
  level2: {
    id: "level2",
    rows: 12,
    cols: 12,
    items: [
      {type:"wall", pos:"C2"},
      {type:"wall", pos:"C3"},
      {type:"wall", pos:"C4"},
      {type:"wall", pos:"C5"},
      {type:"wall", pos:"C6"},
      {type:"monster", pos:"E5"},
      {type:"treasure", pos:"H8"},
      {type:"key", pos:"B5"},
      {type:"door", pos:"L12"}
    ],
    scenes: { "A1":"A much larger maze. The air feels heavier. " },
    nextLevelId: null
  }
};

/* ---------------- Helpers / DOM ---------------- */
function toPos(r,c){ return String.fromCharCode(65+c) + (r+1); }
function inBounds(r,c,l){ return r>=0 && c>=0 && r<l.rows && c<l.cols; }

const mapEl = document.getElementById("map");
const posText = document.getElementById("posText");
const currentText = document.getElementById("currentText");
const logArea = document.getElementById("logArea");
const logList = document.getElementById("logList");
const toggleLogBtn = document.getElementById("toggleLogBtn");

const lifeText = document.getElementById("lifeText");
const strText = document.getElementById("strText");
const defText = document.getElementById("defText");
const goldText = document.getElementById("goldText");
const keyText = document.getElementById("keyText");

const restartBtn = document.getElementById("restartBtn");
const continueBtn = document.getElementById("continueBtn");

const guideBtn = document.getElementById("guideBtn");
const guideDialog = document.getElementById("guideDialog");
const closeGuideBtn = document.getElementById("closeGuideBtn");

const live = document.getElementById("live");
const darkModeBtn = document.getElementById("darkModeBtn");
const gameEl = document.getElementById("game");

// Speech queue so messages don't overwrite each other before screen readers speak them.
let speechQueue = Promise.resolve();

function announce(msg){
    live.innerHTML = "";
	msg = trimText(msg)
      live.innerHTML = msg;
	  if (speechOn){speechSay(live.textContent)}   
}

function announceSequence(msgs){
  const clean = msgs.filter(Boolean).map(m => String(m).trim()).filter(m => m.length);
  for (const m of clean) announce(m);
}

/* ---------------- Level indexing ---------------- */
function itemsAt(pos){ return level.items.filter(it => it.pos === pos); }
function hasWall(pos){ return itemsAt(pos).some(it => (it.type === "wall" || it.type === "bush" || it.type === "flower" || it.type === "custom_wall")); }
function hasDoor(pos){ return itemsAt(pos).some(it => it.type === "door"); }
function hasExit(pos){ return itemsAt(pos).some(it => it.type === "exit"); }
function hasOpenExit(pos){ return itemsAt(pos).some(it => it.type === "exit_open"); }
function hasKey(pos){ return itemsAt(pos).some(it => it.type === "key"); }
function hasEnd(pos){ return itemsAt(pos).some(it => it.type === "gameEnd"); }
function hasStairs(pos){ return itemsAt(pos).some(it => it.type === "stairs"); }
function hasTreasure(pos){ return itemsAt(pos).some(it => it.type === "treasure"); }
function hasPotion(pos){ return itemsAt(pos).some(it => it.type === "potion"); }
function hasVoid(pos){ return itemsAt(pos).some(it => it.type === "void"); }
function hasMonster(pos){ return itemsAt(pos).some(it => it.type === "monster"); }
function hasWeaponShop(pos){ return itemsAt(pos).some(it => it.type === "weapon_shop"); }
function hasShop(pos){ return itemsAt(pos).some(it => it.type === "shop"); }
function hasArmorShop(pos){ return itemsAt(pos).some(it => it.type === "armor_shop"); }
function hasInn(pos){ return itemsAt(pos).some(it => it.type === "inn"); }
function hasVillager(pos){ return itemsAt(pos).some(it => it.type === "villager"); }
function getMonster(pos){ return monsters.get(pos) || null; }
function initMonsters(){
  monsters = new Map();
  for (const it of level.items) {
    if (it.type === "monster") {
      // Use metadata from the level creator when available, otherwise fall back to defaults
      let hp = 6;
      let attack = 2;
      let def = 0;
      let name = 'monster';
	  let rD = "";
	  let rV = 5;
	  let rK = "gold";
	  
      if (it.meta) {
        if (typeof it.meta.hp !== 'undefined') hp = Number(it.meta.hp) || hp;
        if (typeof it.meta.atk !== 'undefined') attack = Number(it.meta.atk) || attack;
        if (typeof it.meta.def !== 'undefined') def = Number(it.meta.def) || def;
        if (typeof it.meta.name !== 'undefined') name = String(it.meta.name) || name;
		if (typeof it.meta.rDesc !== 'undefined') rD = String(it.meta.rDesc) || rD;
		if (typeof it.meta.rVal !== 'undefined') rV = Number(it.meta.rVal) || rV;
		if (typeof it.meta.rKind !== 'undefined') rK = String(it.meta.rKind) || rK;
      }
      var descs = [];
      if (it.meta && Array.isArray(it.meta.descriptions)) descs = it.meta.descriptions.slice();
		monsters.set(it.pos, { hp: hp, attack: attack, defense: def, name: name, rDesc: rD, rKind: rK, rVal: rV, descriptions: descs, nextDescIndex: 0 });
    }
  }
}

function removeMonster(pos){
  monsters.delete(pos);
  removeItem("monster", pos);
} 

function removeItem(type,pos){
  level.items = level.items.filter(it => !(it.type === type && it.pos === pos));
}

function posToRC(pos) {
  const col = pos.charCodeAt(0) - 65;
  const row = parseInt(pos.slice(1), 10) - 1;
  return { row, col };
}

function revealNeighbors(pos) {
  const p = posToRC(pos);
  for (const d of DIRS) {
    const r = p.row + d.dr;
    const c = p.col + d.dc;
    if (!inBounds(r, c, level)) continue;
    const npos = toPos(r, c);
    // If it's a wall, reveal via bump set so wall rendering rules apply.
    if (hasWall(npos)) {
      revealedByBump.add(npos);
      continue;
    }
    // Reveal the neighbor tile so it becomes visible on the map.
    revealedNeighbors.add(npos);
    // If neighbor contains a special icon, mark it discovered so its icon shows.
    if (hasKey(npos)) revealedSpecial.set(npos, "key");
    else if (hasTreasure(npos)) revealedSpecial.set(npos, "treasure");
	else if (hasStairs(npos)) revealedSpecial.set(npos, "stairs");
    else if (hasMonster(npos)) revealedSpecial.set(npos, "monster");
    else if (hasVoid(npos)) revealedSpecial.set(npos, "void");
    else if (hasPotion(npos)) revealedSpecial.set(npos, "potion");
    else if (hasVillager(npos)) revealedSpecial.set(npos, "villager");
    else if (hasWeaponShop(npos)) revealedSpecial.set(npos, "weapon_shop");
	else if (hasShop(npos)) revealedSpecial.set(npos, "shop");
    else if (hasArmorShop(npos)) revealedSpecial.set(npos, "armor_shop");
    else if (hasInn(npos)) revealedSpecial.set(npos, "inn");
    else if (hasExit(npos)) revealedSpecial.set(npos, "exit");
  }
}

function revealMap(){
	revealed = []
	for (let r = 0; r < level.rows; r++){
		for (let c = 0; c < level.cols; c++){
    
	let pos = toPos(r, c);
	if (visited.has(pos) || revealedByBump.has(pos) || revealedSpecial.has(pos) || revealedNeighbors.has(pos)){continue;}
    // If it's a wall, reveal via bump set so wall rendering rules apply.
    if (hasWall(pos)) {revealedByBump.add(pos); continue;}
    // Reveal the neighbor tile so it becomes visible on the map.
    revealedNeighbors.add(pos);
    // If neighbor contains a special icon, mark it discovered so its icon shows.
    if (hasKey(pos)) revealedSpecial.set(pos, "key");
    else if (hasTreasure(pos)){ revealedSpecial.set(pos, "treasure");}
	else if (hasStairs(pos)){ revealedSpecial.set(pos, "stairs")}
    else if (hasMonster(pos)){ revealedSpecial.set(pos, "monster")}
    else if (hasVoid(pos)) {revealedSpecial.set(pos, "void")}
    else if (hasPotion(pos)) {revealedSpecial.set(pos, "potion")}
    else if (hasVillager(pos)) {revealedSpecial.set(pos, "villager")}
    else if (hasWeaponShop(pos)) {revealedSpecial.set(pos, "weapon_shop")}
	else if (hasShop(pos)) {revealedSpecial.set(pos, "shop")}
    else if (hasArmorShop(pos)) {revealedSpecial.set(pos, "armor_shop")}
    else if (hasInn(pos)) {revealedSpecial.set(pos, "inn")}
    else if (hasExit(pos)) {revealedSpecial.set(pos, "exit")}
	if(revealedSpecial.has(pos)){ revealed.push(revealedSpecial.get(pos) + " at " + pos) }
	
	}}
	if (revealed.length > 0){
	return ("\nRevealed " + revealed.join(", " ) + ". ")}
	else {return "";}
}

function mapTouch(pos){
	
	//if touched spot is one spot away, go straight to tryMove
	
	tcol = posToRC(pos).col
	trow = posToRC(pos).row
	
	player.row
	player.col
	dcol = parseInt(tcol) - parseInt(player.col)
	drow = parseInt(trow) - parseInt(player.row)
	let distance = (Math.abs(player.col - tcol) + Math.abs(player.row - trow))
	
	if(distance == 0){
		//clicked current cell - activate thing at location
		activateCell(pos)
		  if (completed) {
			if (level.nextLevelId != 'null' && level.nextLevelId != null) {
			  preserveStatsOnNextLoad = true;
			  loadLevel(level.nextLevelId);
			} else {
				speechSynthesis.cancel();
				announce("You have completed the final level. Congratulations!");
			}
			}
	}
	else if(distance == 1){
		//cell is adjacent, try to move to it
		tryMove(drow, dcol);
	}
	else {
		//cell is more than one cell away and is revealed
		//function tryMove(dr, dc)
		let dr = 0;
		let dc = 0;
		let move = true;
		
		max = 5;
		steps = 0
		while(move){
			move = false;
			startRow = player.row
			startCol = player.col		
			dcol = parseInt(tcol) - parseInt(player.col)
			drow = parseInt(trow) - parseInt(player.row)	
			
			dr = 0;
			dc = 0;
			if(drow < 0) {dr = -1}
			else if (drow > 0){dr = 1}
			if(dcol < 0) {dc = -1}
			else if (dcol > 0){dc = 1}

			rwall = hasWall(toPos(player.row + dr, player.col)) || hasMonster(toPos(player.row + dr, player.col)) || hasVoid(toPos(player.row + dr, player.col)) || hasDoor(toPos(player.row + dr, player.col))
			cwall = hasWall(toPos(player.row, player.col + dc)) || hasMonster(toPos(player.row, player.col + dc)) || hasVoid(toPos(player.row, player.col + dc)) || hasDoor(toPos(player.row, player.col + dc))
			
			if (rwall || cwall){
				
				if (rwall){
					
					tryMove(0, dc)
				}
				else{
					
					tryMove(dr, 0)
				}
			}
			else{
				if (Math.abs(drow) > Math.abs(dcol)){
					//try to move vertically

					if(drow < 0){tryMove(-1, 0)}
					else{tryMove(1, 0)}
				}
				else{
					//try to move horizontally

					if(dcol < 0){tryMove(0, -1)}
					else{tryMove(0, 1)}
				}
			
		}
		steps ++;
		if (startRow != player.row || startCol != player.col){ 
			distance = (Math.abs(player.col - tcol) + Math.abs(player.row - trow))
			if (steps < max && distance > 0){
				move = true
		}
		}}
		
	}
		
}

/* ---------------- Rendering ---------------- */
function renderMap() {
  mapEl.innerHTML = "";
  mapEl.style.gridTemplateColumns = `repeat(${level.cols}, 1fr)`;
  mapEl.style.gridTemplateRows    = `repeat(${level.rows}, 1fr)`;
  let focusSquare;
  
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const pos = toPos(r, c);
      const el = document.createElement("div");
      el.className = "cell";

      const isVisited = visited.has(pos);
      const isRevealedWall = revealedByBump.has(pos) && hasWall(pos);
      const isRevealedSpecial = revealedSpecial.has(pos);
      const show = isVisited || isRevealedWall || isRevealedSpecial || revealedNeighbors.has(pos);
      el.classList.add(show ? "visited" : "unknown");
	  el.setAttribute("onclick", "mapTouch('" + pos + "\')")
      if (show) {
        const items = itemsAt(pos);
		item = items[0]
		
        if (items.some(i => i.type === "wall" || i.type === "bush" || i.type === "flower" || i.type === "custom_wall")) {
          el.classList.add("wall");
          el.innerHTML = ICONS.wall;
        } else if (items.some(i => i.type === "door")) {
          el.innerHTML = ICONS.door;
        } else if (items.some(i => i.type === "key")) {
          el.innerHTML = ICONS.key;
        } else if (items.some(i => i.type === "monster")) {
          el.innerHTML = ICONS.monster;
        } else if (items.some(i => i.type === "treasure")) {
          el.innerHTML = ICONS.treasure;
        } else if (items.some(i => i.type === "stairs")) {
          el.innerHTML = ICONS.stairs;
        } else if (items.some(i => i.type === "potion")) {
          el.innerHTML = ICONS.potion;
        } else if (items.some(i => i.type === "exit")) {
          el.innerHTML = ICONS.exit ? ICONS.exit : ICONS.door;
        } else if (items.some(i => i.type === "exit_open")) {
          el.innerHTML = ICONS.door;
        } else if (items.some(i => i.type === "void")) {
          el.innerHTML = ICONS.void;
        } else if (items.some(i => i.type === "weapon_shop")) {
          el.innerHTML = ICONS.weapon;
        } else if (items.some(i => i.type === "armor_shop")) {
          el.innerHTML = ICONS.armor;
        } else if (items.some(i => i.type === "inn")) {
          el.innerHTML = ICONS.inn;
        } else if (items.some(i => i.type === "villager")) {
          el.innerHTML = ICONS.villager;
        } else if (revealedSpecial.has(pos)) {
          const t = revealedSpecial.get(pos);
          if (t === "key") el.innerHTML = ICONS.key;
          else if (t === "treasure") el.innerHTML = ICONS.treasure;
		  else if (t === "stairs") el.innerHTML = ICONS.stairs;
          else if (t === "monster") el.innerHTML = ICONS.monster;
          else if (t === "void") el.innerHTML = ICONS.void;
          else if (t === "weapon_shop") el.innerHTML = ICONS.weapon;
          else if (t === "armor_shop") el.innerHTML = ICONS.armor;
          else if (t === "inn") el.innerHTML = ICONS.inn;
          else if (t === "exit") el.innerHTML = ICONS.exit ? ICONS.exit : ICONS.door;
          else if (t === "villager") el.innerHTML = ICONS.villager;
        } else if (level.scenes[pos]) {
          el.innerHTML = `<span aria-hidden="true">•</span>`;
        }
		if(item){if(item.meta){if(item.meta.icon){el.innerHTML = ICONS[item.meta.icon]}}}
      }

      if (player.row === r && player.col === c) {
        el.classList.add("player");
        el.innerHTML = ICONS.player;
		focusSquare = el;
      }

      mapEl.appendChild(el);
    }
  }

  focusSquare.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

/* ---------------- UI ---------------- */
function updateStatsUI(){
  lifeText.textContent = stats.life;
  strText.textContent = stats.strength;
  defText.textContent = stats.defense;
  goldText.textContent = stats.gold;
  keyText.textContent = stats.key ? "Yes" : "No";
}


function updateUI(){
  posText.textContent = toPos(player.row, player.col) + " " + currentLevelId;
  locStat = document.getElementById("locText");
  updateStatsUI();
  renderMap();
}

/* ---------------- Rewards / auto-actions ---------------- */
function rollTreasureReward(meta) {
  if (meta && meta.kind === 'empty') return "The chest is empty. ";
  // If metadata provided, honor it explicitly.
  if (meta && meta.kind) {
    const k = meta.kind;
    const v = Number(meta.value) || 0;
    if (k === 'gold') {
      stats.gold += v;
      return `You collect ${v} gold. `;
    }
    if (k === 'strength') {
      stats.strength += v;
      return `You gain a strength upgrade. Strength increased by ${v}. `;
    }
    if (k === 'defense') {
      stats.defense += v;
      return `You gain a defense upgrade. Defense increased by ${v}. `;
    }
  }
  // Fallback to old random behavior
  const roll = Math.random();
  if (roll < 0.65) {
    const amount = Math.floor(10 + Math.random() * 41); // 10–50
    stats.gold += amount;
    return `You collect ${amount} gold. `;
  }
  if (roll < 0.85) {
    stats.strength += 1;
    return `You gain a strength upgrade. Strength increased by 1. `;
  }
  stats.defense += 1;
  return `You gain a defense upgrade. Defense increased by 1. `;
}

function consumePotion() {
	playSound("drink");
  // Determine heal amount from a potion on the player's current square, if any.
  const pos = toPos(player.row, player.col);
  const potionItem = itemsAt(pos).find(it => it.type === 'potion');
  const healAmount = potionItem && potionItem.meta && typeof potionItem.meta.heal === 'number' ? potionItem.meta.heal : 3;
  const before = stats.life;
  stats.life = Math.min(MAX_LIFE, stats.life + healAmount);
  const gained = stats.life - before;
 
  return gained > 0 ? `You recover ${gained} life. ` : `You already feel fine. `;
}

/* ---------------- Adjacent N/S/E/W report ---------------- */
const DIRS = [
  {name:"north", dr:-1, dc: 0},
  {name:"south", dr: 1, dc: 0},
  {name:"west",  dr: 0, dc:-1},
  {name:"east",  dr: 0, dc: 1},
];

function isBlocked(r, c) {
  // Treat edge like wall
  if (!inBounds(r, c, level)) return true;
  const pos = toPos(r, c);
  // Walls and living monsters block movement and are treated as blocked paths.
  // Doors block movement unless the player has a key; with a key the player may step
  // into the door square to unlock/enter it.
  if (hasDoor(pos) && !stats.key) return true;
  return hasWall(pos) || hasMonster(pos);
}

function contentsAt(r, c) {
  // Returns a single "sensory cue" label for the square (N/S/E/W) based on contents.
  //cue priority 1 (highet) to 5 (lowest)
  // Cues in priority order:
  // - door => "You see the exit"	1 
  // - void => "mysterious fog"		2
  // - key => "faint glow"			4
  // - monster => "growling sound"	3
  // - treasure => "hidden passage" 4 (stair, shop)
  // walls: 5
  // Everything else returns null (no cue).
 
  if (!inBounds(r, c, level)) return null;
  const pos = toPos(r, c);
  // If a custom wall is present, prefer its configured name as the sensory cue.
  const items = itemsAt(pos);
  const customWall = items.find(i => i.type === 'custom_wall');
if (customWall) {
    if (customWall.meta && customWall.meta.name) return [String(customWall.meta.name), 5] ;
    return ['wall', 5];
  }

  if (hasWall(pos)){
	  if(items[0].meta && items[0].meta.name){
		  return [items[0].meta.name, 5];
	  } else{
		return null;
	  }
	}
  if (items.some(i=>i.type==="door")) return ["You see the exit", 1];
  if (items.some(i=>i.type==="exit")) return ["You see the exit", 1];
  if (items.some(i=>i.type==="void")) return ["mysterious fog", 2];
  if (items.some(i=>i.type==="weapon_shop")) return ["weapon shop", 4];
    if (items.some(i=>i.type==="shop")){ return [items[0].meta.name, 4]};
  if (items.some(i=>i.type==="armor_shop")) return ["armor shop", 4];
  if (items.some(i=>i.type==="inn")) return ["Inn", 4];
  if (items.some(i=>i.type==="villager")) return ["Villager", 4];
  if (items.some(i=>i.type==="key")) return ["faint glow", 4];
  if (items.some(i=>i.type==="monster")) {
	  playSound("growl");
	  var monSound = "growling"
		if(items[0].meta){if(items[0].meta.sound){monSound = items[0].meta.sound}};
	  return [monSound + " sound", 3];}
  if (items.some(i=>i.type==="potion")) return ["small pouch", 4];
  if (items.some(i=>i.type==="treasure")) return ["hidden passage", 4];
	if (items.some(i=>i.type==="stairs")) return ["stairs", 4];
  return null;
}


function groupedSurroundingsText() {
  // Convention requested:
  // "open path: north, south. blocked path: east. growling sound: west"
  // IMPORTANT: Each direction (north/south/east/west) can only appear ONCE.
  // So if a cue exists in a direction, that direction is NOT listed under open/blocked.

  const openDirs = [];
  const blockedDirs = [];

  // cue -> [dirs]
  const cueDirs = new Map();

  for (const d of DIRS) {
    const r = player.row + d.dr;
    const c = player.col + d.dc;

    // Determine cue FIRST so the direction is only used once.
    // Monsters are blocked for movement, but should be reported via cue (growling sound),
    // not under blocked path.
    const cue = contentsAt(r, c);
    if (cue) {
		
      if (!cueDirs.has(cue[1])) {
		// no cues at that priority level yet
		//target structure {id, obj{directions: [west east etc]}}
		myCue = cue[0]
		myDirs = []
		myDirs.push(d.name);
		dirObj = {dirs: myDirs};
		cueObj = {};
		cueObj[myCue] = dirObj;
		cueDirs.set(cue[1], cueObj);
	  }
	  else{
		  //this priority level exists; does this cue
		  if(cueDirs.get(cue[1])[cue[0]]){
			  //repeated cue, add direction
			  
			  let myCue = cue[0]
			  let cueObj = cueDirs.get(cue[1]);
			  let myDirs = cueObj[myCue].dirs;
			  
			  myDirs.push(d.name);
			  let dirObj = {dirs: myDirs};
			  cueObj[myCue] = dirObj;
			  cueDirs.set(cue[1], cueObj);
			}
		  else{ //this priority level exists but the cue doesn't
			myCue = cue[0]
			myDirs = []
			myDirs.push(d.name);
			dirObj = {dirs: myDirs};
			cueObj = cueDirs.get(cue[1]);
			cueObj[myCue] = dirObj;
			cueDirs.set(cue[1], cueObj);
		  }
		 
	  }
      continue;
    }

    if (isBlocked(r, c)) {
      blockedDirs.push(d.name);
    } else {
      openDirs.push(d.name);
    }
  }
  const parts = [];

  // Add cue lines FIRST in priority order: door, void, key, monster, potion, treasure
  // Include Inn so it's described when adjacent. We'll insert 'Inn' after armor shop.
  //TODO: FIX THIS
  // I think the exit and the void are the highest priorities, followed by monsters, then I don’t really care
  // Basically, if anything of interest is nearby, it should be read before open path.
	for (let p = 1; p < 5; p++){
		
		myCues = cueDirs.get(p)
		if (myCues){
			cueKeys = Object.keys(myCues)
			for (key of cueKeys){
				
				dirSt = myCues[key].dirs.join(", ");
				parts.push(key + ": " + dirSt);
				
			}
		}
	}

  // Then add open paths
 
  toneDirs = [false, false, false, false];
  
  if (openDirs.length){
	parts.push(`Path: ${openDirs.join(", ")}. `)
	if(tonesOn == true){
		if(!blockedDirs.includes("north")){toneDirs[0] = true;}
		if(!blockedDirs.includes("east")){toneDirs[1] = true;}
		if(!blockedDirs.includes("south")){toneDirs[2] = true;}
		if(!blockedDirs.includes("west")){toneDirs[3] = true;}
		playTones(toneDirs);
  }}

	p = 5
	myCues = cueDirs.get(p)
		if (myCues){
			cueKeys = Object.keys(myCues)
			for (key of cueKeys){
				
				dirSt = myCues[key].dirs.join(", ");
				parts.push(key + ": " + dirSt);
				
			}
		}

  // Then add blocked paths
  if (blockedDirs.length) parts.push(`Wall: ${blockedDirs.join(", ")}. `);

  return parts.join("<br>");
}

// Like groupedSurroundingsText but for an arbitrary cell `pos` instead of player.
function groupedSurroundingsTextAt(pos) {
  const p = posToRC(pos);
  const openDirs = [];
  const blockedDirs = [];
  const cueDirs = new Map();

  for (const d of DIRS) {
    const r = p.row + d.dr;
    const c = p.col + d.dc;
    const cue = contentsAt(r, c);
    if (cue) {
      if (!cueDirs.has(cue)) cueDirs.set(cue, []);
      cueDirs.get(cue).push(d.name);
      continue;
    }
    if (isBlocked(r, c)) blockedDirs.push(d.name);
    else openDirs.push(d.name);
  }

  const parts = [];
  // Include Inn so it's described when adjacent
  const cueOrderWithInn = ["you see the exit", "mysterious fog", "faint glow", "weapon shop", "armor shop", "Inn", "Villager", "growling sound", "small pouch", "hidden passage"];
  for (const cue of cueOrderWithInn) {
    const dirs = cueDirs.get(cue);
    if (dirs && dirs.length) parts.push(`${cue}: ${dirs.join(", ")}. `);
  }
  // Then add open paths
  if (openDirs.length) parts.push(`Path: ${openDirs.join(", ")}. `);

  // Any remaining cues (e.g. custom wall names) that weren't in `cueOrder`:
  for (const [cue, dirs] of cueDirs.entries()) {
    if (cueOrderWithInn.indexOf(cue) === -1) {
      parts.push(`${cue}: ${dirs.join(", ")}. `);
    }
  }

  if (blockedDirs.length) parts.push(`Wall: ${blockedDirs.join(", ")}. `);
  return parts.join("<br>");
}

function trimText(myMessage){
	
   //remove leading line breaks	
	
   while(myMessage.substring(0,4) == "<br>")
   { myMessage = myMessage.substring(4)}
   //remove double line breaks
	while(myMessage.includes("<br><br>"))
   {myMessage = myMessage.replace("<br><br>", "<br>")}
	while(myMessage.includes(".<br>"))
   {myMessage = myMessage.replace(".<br>", ". <br>")}

	return myMessage
}

function describePos(pos) {
  const parts = [];
  const rd = roomDescription(pos);
  if (rd) parts.push(rd);
  const here = hereSummary(pos);
  if (here) parts.push(here);
  const surroundings = groupedSurroundingsTextAt(pos);
  if (surroundings) parts.push(surroundings);
  return parts.join("<br>");
}



/* ---------------- Room narration ---------------- */
function roomDescription(pos) {
  return level.scenes[pos] || "";
}

function hereSummary(pos) {
  const items = itemsAt(pos);
  
  // Priority order: door, void, key, monster, treasure, potion
  if (items.some(i=>i.type==="exit")) return "An exit is here. ";
  if (items.some(i=>i.type==="door")) return "A door is here. ";
  if (items.some(i=>i.type==="void")) return "A swirling void is here. ";
  if (items.some(i=>i.type==="key")) return "A key is here. ";
  if (items.some(i=>i.type==="monster")) return "A monster is here. ";
  if (items.some(i=>i.type==="treasure")) return "A treasure chest is here. ";
  if (items.some(i=>i.type==="potion")) return "A potion is here. ";
  if (items.some(i=>i.type==="weapon_shop")) return "A weapon shop is here. ";
  if (items.some(i=>i.type==="armor_shop")) return "An armor shop is here. ";
  if (items.some(i=>i.type==="villager")) return "A villager is here. ";
  
  // If no items, just return empty string - let groupedSurroundingsText handle 
  // describing open paths and blocked paths
  return "";
}


function describeCurrentLocation() {
  const pos = toPos(player.row, player.col);
  const parts = [];
  parts.push(roomDescription(pos));

  const here = hereSummary(pos);
  if (here) parts.push(here);

  parts.push(groupedSurroundingsText());
  return parts.join("<br>");
}

/* ---------------- Discovery + entering a cell ---------------- */

function enterCell(prefix) {
  const pos = toPos(player.row, player.col);
  const firstVisit = !visited.has(pos);
  visited.add(pos);

  // Reveal adjacent N/S/E/W tiles when entering a cell (fog of war).
  revealNeighbors(pos);

  // If the page set a campaign startup flag, do a minimal announcement sequence:
  // 1) "Welcome to Super Dungeon"
  // 2) the level's A1 scene text (if any)
  // This avoids the full surroundings/reporting on first load.
  try {
    if (window.__campaignStartup) {
      // Build the same description used elsewhere (room + here summary + surroundings)
      let fullText = describeCurrentLocation();
      updateUI();
      // Announce title then full location description (includes surroundings)
      //announce("Welcome to Super Dungeon");
      // Show the full description in the UI and log it
      if (fullText) {
		 fullText = trimText(fullText)
		 myText = document.getElementById('currentText')
        myText.innerHTML = fullText;
		if (speechOn){speechSay(myText.textContent)}
        
      }
      // Mark startup handled and record discovery if first visit
      window.__campaignStartup = false;
      
      return;
    }
  } catch (e) {
    // If anything goes wrong, fall back to normal behavior.
    console.error('Startup announcement failed', e);
  }

  // Build room text up front (used for log + announcements)
  const text = describeCurrentLocation();
  // Auto actions (announce discoveries)
  const discoveryMsgs = [];

	//did you take the stairs?
	if (tookStairs.bool == true){
		if (tookStairs.level != null){
			//You take the stairs to E5
			discoveryMsgs.push("You take the stairs to " + tookStairs.cell + " of " + tookStairs.level + ".\n")
		}
		else{
			discoveryMsgs.push("You take the stairs to " + tookStairs.cell + ".\n")
		}
		tookStairs.level = null;
		tookStairs.cell = null;
		tookStairs.bool = false;
	}
	//Did you die?
	if (defeat == true){
		discoveryMsgs.push("You have died. Reloading " + currentLevelId + "... \n")
		discoveryMsgs.push("You are back in cell " + pos + ".\n")
		defeat = false;
	}



  if (hasKey(pos) && !stats.key) {
	  let keyLevel;
	if (itemsAt(pos)[0].meta){keyLevel = itemsAt(pos)[0].meta.level;}
		else {keyLevel = currentLevelId}
	levels[keyLevel].foundKey = true;
	stats.key = true;
    removeItem("key", pos);
    revealedSpecial.delete(pos);
	updateUI();	
    discoveryMsgs.push("You found a key. ");
  }

  if (hasTreasure(pos)) {
    revealedSpecial.delete(pos);
    // Capture treasure metadata if present before removing the item
    const treasureItem = itemsAt(pos).find(it => it.type === "treasure");
    const meta = treasureItem && treasureItem.meta ? treasureItem.meta : null;
    removeItem("treasure", pos);
    const reward = rollTreasureReward(meta);
    discoveryMsgs.push("You found a treasure chest. ");
    if (reward) discoveryMsgs.push(reward);
  }

  if (hasVillager(pos)) {
    // Treat villager like a (guaranteed) reward source: reveal, speak custom text,
    // then immediately apply the reward and announce it.
    revealedSpecial.delete(pos);

    const villagerItem = itemsAt(pos).find(it => it.type === "villager");
    const meta = villagerItem && villagerItem.meta ? villagerItem.meta : null;
    // Remove the villager so it cannot be re-triggered.
    removeItem("villager", pos);

    // First, speak the villager's custom text (if any).
    if (meta && meta.text) discoveryMsgs.push(String(meta.text));

    // Then apply the reward. If metadata specifies kind/value, honor it
    // with a clean "The villager gives you ... " phrasing. Otherwise fall
    // back to the existing treasure-roll behavior and try to reformat its
    // message into a villager phrasing.
    if (meta && meta.kind) {
      const kind = String(meta.kind);
      const val = Number(meta.value) || 0;
      if (kind === 'gold') {
        stats.gold = (stats.gold || 0) + val;
        discoveryMsgs.push(`The villager gives you ${val} gold. `);
      } else if (kind === 'strength') {
        stats.strength = (stats.strength || 0) + val;
        discoveryMsgs.push(`The villager gives you a strength upgrade. Strength increased by ${val}. `);
      } else if (kind === 'defense') {
        stats.defense = (stats.defense || 0) + val;
        discoveryMsgs.push(`The villager gives you a defense upgrade. Defense increased by ${val}. `);
      } else {
        // Unknown kind: fall back to treasure helper and try to format.
        const raw = rollTreasureReward(meta) || '';
        const mGold = raw.match(/You collect (\d+) gold\./);
        if (mGold) discoveryMsgs.push(`The villager gives you ${mGold[1]} gold. `);
        else if (/You gain a strength upgrade/.test(raw)) {
          const m = raw.match(/Strength increased by (\d+)/);
          discoveryMsgs.push(m ? `The villager gives you a strength upgrade. Strength increased by ${m[1]}. ` : `The villager gives you a strength upgrade. `);
        } else if (/You gain a defense upgrade/.test(raw)) {
          const m = raw.match(/Defense increased by (\d+)/);
          discoveryMsgs.push(m ? `The villager gives you a defense upgrade. Defense increased by ${m[1]}. ` : `The villager gives you a defense upgrade. `);
        } else {
          discoveryMsgs.push(raw);
        }
      }
    } else {
      // If metadata exists but lacks a kind (likely older levels or click-placed villagers),
      // treat a numeric `value` as gold for compatibility.
      if (meta && typeof meta.value !== 'undefined') {
        const val = Number(meta.value) || 0;
        stats.gold = (stats.gold || 0) + val;
        discoveryMsgs.push(`The villager gives you ${val} gold. `);
      } else {
        // No explicit metadata: roll a treasure reward and rephrase it.
        const raw = rollTreasureReward(null) || '';
        const mGold = raw.match(/You collect (\d+) gold\./);
        if (mGold) discoveryMsgs.push(`The villager gives you ${mGold[1]} gold. `);
        else if (/You gain a strength upgrade/.test(raw)) {
          const m = raw.match(/Strength increased by (\d+)/);
          discoveryMsgs.push(m ? `The villager gives you a strength upgrade. Strength increased by ${m[1]}. ` : `The villager gives you a strength upgrade. `);
        } else if (/You gain a defense upgrade/.test(raw)) {
          const m = raw.match(/Defense increased by (\d+)/);
          discoveryMsgs.push(m ? `The villager gives you a defense upgrade. Defense increased by ${m[1]}. ` : `The villager gives you a defense upgrade. `);
        } else {
          discoveryMsgs.push(raw);
        }
      }
    }
  }

  if (hasPotion(pos)) {
    // Do NOT auto-consume potions. Prompt the player and leave the potion until they Press <kbd>Space</kbd>.
    revealedSpecial.set(pos, "potion");
	activateCell(pos);
    //discoveryMsgs.push("A potion is here. Press <kbd>Space</kbd> to drink. ");
  }
  
  if (hasStairs(pos)) {

    revealedSpecial.set(pos, "stairs");
    discoveryMsgs.push("A staircase is here. Press <kbd>Space</kbd> to take them. ");
  }
	if (hasShop(pos)){
		revealedSpecial.set(pos, "shop");
		shop = itemsAt(pos)[0].meta
		discoveryMsgs.push("Welcome to the " + shop.name + "! Press <kbd>Space</kbd> to gain " + shop.value + " " + shop.kind + " for " + shop.cost + " " + shop.currency + ".");
	}

  if (hasWeaponShop(pos)) {
    // Do NOT auto-purchase. Prompt the player and leave the shop available until they Press <kbd>Space</kbd>.
    revealedSpecial.set(pos, "weapon_shop");
    discoveryMsgs.push("Welcome to the weapon shop! Press <kbd>Space</kbd> to upgrade your strength 2 points for 18 gold. ");
  }

  if (hasArmorShop(pos)) {
    // Do NOT auto-purchase. Prompt the player and leave the shop available until they Press <kbd>Space</kbd>.
    revealedSpecial.set(pos, "armor_shop");
    discoveryMsgs.push("Welcome to the armor shop! Press <kbd>Space</kbd> to upgrade your defense 1 points for 14 gold. ");
  }

  if (hasInn(pos)) {
    // Do NOT auto-purchase. Prompt the player and leave the inn available until they Press <kbd>Space</kbd>.
    revealedSpecial.set(pos, "inn");
    discoveryMsgs.push("Welcome to the inn! Press <kbd>Space</kbd> to rest and heal 8 points for 10 gold. ");
  }

  if (hasExit(pos)) {
    // Prompt the player to open the exit with Space (does not require a key).
    revealedSpecial.set(pos, "exit");
    discoveryMsgs.push("An exit is here. Press <kbd>Space</kbd> to open. ");
  }

  if (hasOpenExit(pos)) {
    // Open exit acts like an immediate finish when stepped onto.
    completed = true;
    continueBtn.hidden = true;
    discoveryMsgs.push("You found the exit. press <kbd>enter</kbd> to continue. ");
  }

  if (hasDoor(pos)) {
    // If the player steps onto a door tile and has a key, unlock and mark completed.
    if (stats.key) {
      // consume the key and complete the level (player stands on the door square)
      //	stats.key = false;
      completed = true;
      discoveryMsgs.push("You unlock and open the door. press <kbd>enter</kbd> to continue. ");
	  discoveryMsgs.push(revealMap());
    } else {
      // No key: inform the player and treat as a blocked/bumped tile in messages.
      discoveryMsgs.push("A locked door is here. You need a key to open it. ");
    }
  }

  // The Void: stepping into it immediately restarts the level and returns you to A1.
  if (hasVoid(pos)) {
    var voidMsg = "You've fallen into the void. Game restarts. ";
	voidMsg = trimText(voidMsg)
    announce(voidMsg);
    
	// announce(voidMsg);
    // Preserve most stats across the restart, but reset the key flag.
    const preserved = { life: stats.life, strength: stats.strength, defense: stats.defense, gold: stats.gold };
	//reload level from file
    levels[currentLevelId] = JSON.parse(JSON.stringify(LEVELS[currentLevelId]));
	levels[currentLevelId].foundKey = false;
    loadLevel(currentLevelId);
    stats.life = preserved.life;
    stats.strength = preserved.strength;
    stats.defense = preserved.defense;
    stats.gold = preserved.gold;
    stats.key = false;
    // Mark all treasures in the reloaded level as empty so players can't farm them by falling into the void.
    for (const it of level.items) {
      if (it.type === 'treasure') {
        it.meta = it.meta || {};
        it.meta.kind = 'empty';
        delete it.meta.value;
      }
	  else if (it.type === 'potion') {it.pos = "A0"}
    }
    updateUI();
    return;
  }

  // Update visuals/stats before speaking
  updateUI();

  // Build spoken sequence. If a prefix (combat text) was provided, include it first.
  var spoken = [];
  // Prepare final text by removing redundant "A ... is here. " sentences when
  // discovery messages already describe the item (prevents duplicates).
  var finalText = String(text || '');
  const discAll = discoveryMsgs.join(' ').toLowerCase();
  const redundantPatterns = [
    { key: 'potion', re: /A potion is here\.\s*/i },
    { key: 'treasure', re: /A treasure chest is here\.\s*/i },
    { key: 'villager', re: /A villager is here\.\s*/i },
    { key: 'weapon shop', re: /A weapon shop is here\.\s*/i },
    { key: 'armor shop', re: /An armor shop is here\.\s*/i },
    { key: 'key', re: /A key is here\.\s*/i },
    { key: 'door', re: /A door is here\.\s*/i },
    { key: 'exit', re: /An exit is here\.\s*/i }
  ];

  for (const p of redundantPatterns) {
    if (discAll.indexOf(p.key) !== -1) {
      finalText = finalText.replace(p.re, '');
    }
  }

  // Also strip the 'Inn: ...' surroundings cue if we already pushed an inn discovery message.
  if (discoveryMsgs.some(m => /inn/i.test(m))) {
    finalText = finalText.replace(/Inn:\s*[^.]*\.\s*/i, '');
  }

  if (prefix) spoken.push(prefix);
  if (discoveryMsgs.length) spoken.push(discoveryMsgs.join(" "));
  spoken.push(finalText);

  // Show the full spoken text in the Current location area and log it.
  let fullSpoken = spoken.join(' ');
  fullSpoken = trimText(fullSpoken)
  currentText.innerHTML = fullSpoken;
  if (speechOn){speechSay(currentText.textContent)}
  
  

  // Announce everything in order.
//  announceSequence(spoken);

  

  updateUI();
}
var defeat = false;
/* ---------------- Movement ---------------- */
function tryMove(dr, dc) {
	speechSynthesis.cancel();
	if(live.innerHTML != ""){announce("");}
 
  const nr = player.row + dr;
  const nc = player.col + dc;

  // Edge treated like wall
  if (!inBounds(nr, nc, level)) {
	wallCount += 1;
	if (wallCount > 10){
		max = wallPhrases.length
		var i = Math.floor(Math.random() * max);
		myPhrase = wallPhrases[i];
		myPhrase = myPhrase[0].toUpperCase() + myPhrase.substring(1);
		announce(wallPhrases[i]);
	}
	else {
		announce("A wall blocks your way. ");
	}
	playSound("wall");
    return;
  }

  const nextPos = toPos(nr, nc);

   if(hasEnd(nextPos)){
	   announce("You win!");
   }


  // Prevent stepping onto a locked door tile even if other checks miss it.
  if (hasDoor(nextPos) && !stats.key) {
    // Reveal the door so the player knows where it is and block movement.
    revealedByBump.add(nextPos);
    // Tell the player a key is required, then repeat the player's current location info.
    const currentDesc = describeCurrentLocation();
    announce("Key required. ");
    renderMap();
    return;
  }
 

  // Wall bump
  if (hasWall(nextPos)) {
	  wallName = "wall"
    revealedByBump.add(nextPos);
	wall = itemsAt(nextPos)[0]
	wallCount += 1;
	
	if(wall.meta && wall.meta.name && wall.meta.name.length > 0){ wallName = wall.meta.name}
	if(wallName.substr(wallName.length - 1) == "s"){
		announce("Some " + wallName + " blocks your way. ");
	}
	else{
		if(wallCount > 10){
			max = wallPhrases.length
			var i = Math.floor(Math.random() * max);
			myPhrase = wallPhrases[i].replace("wall", wallName).replace("Wall", wallName);
			myPhrase = myPhrase[0].toUpperCase() + myPhrase.substring(1);
			announce(myPhrase);
		}
		else{
		announce("A " + wallName + " blocks your way. ");}
	}
    playSound("wall");
    renderMap();
    return;
  }

  // Monster encounter: acts like a blocked path until defeated.
  if (hasMonster(nextPos)) {
    // Reveal monster icon as soon as the player first engages it.
    // Also mark the monster square as "known" (visited) so it renders as discovered.
    revealedSpecial.set(nextPos, "monster");
    visited.add(nextPos);
    // Re-render immediately so the icon appears even though the player hasn't moved.
    renderMap();
    const m = getMonster(nextPos);
    if (!m) {
      // Safety fallback: if item exists but monster state is missing, re-init.
      initMonsters();
    }
    const monster = getMonster(nextPos);

    // Player attacks first. Account for monster defense and include the monster's name.
    const monsterDef = monster.defense || 0;
    const monsterName = monster.name || 'the monster';

    // Cycle and read a description for this attack if available
    var attackDesc = null;
    if (monster.descriptions && monster.descriptions.length) {
      var idx = typeof monster.nextDescIndex === 'number' ? monster.nextDescIndex : 0;
      attackDesc = monster.descriptions[idx];
      monster.nextDescIndex = (idx + 1) % monster.descriptions.length;
    }

    let playerDamage = Math.max(0, stats.strength - monsterDef);
    let msg = '';
    // Track whether this attack was a critical (player-only)
    let isCrit = false;
    // Miss chance: 5% for both player and monster.
    const playerMiss = Math.random() < 0.05;
    if (playerMiss) {
      msg = `Your attack misses. `;
    } else {
      if (playerDamage <= 0) {
        msg = `Your attack couldn't penetrate ${monsterName}'s defense. `;
      } else {
        // Player-only critical hit: 8% chance to deal 50% more damage
        isCrit = Math.random() < 0.08;
        let appliedDamage = playerDamage;
        if (isCrit) appliedDamage = Math.round(playerDamage * 1.5);
        monster.hp -= appliedDamage;
        msg = `You attack ${monsterName} for ${appliedDamage}. `;
      }
    }

    if (monster.hp > 0) {
      // Monster attacks back.
      const raw = monster.attack || 0;
      // Miss chance: 5% for both player and monster.
      const monsterMiss = Math.random() < 0.05;
      if (monsterMiss) {
        msg += `${monsterName} misses. `;
      } else {
        const monsterDamage = Math.max(0, raw - stats.defense);
        stats.life -= monsterDamage;
        msg += `${monsterName} attacks you for ${monsterDamage}. `;
      }
      msg += `Your life: ${Math.max(0, stats.life)}. ${monsterName} life: ${Math.max(0, monster.hp)}. `;

      // If player dies, reset level.
      if (stats.life <= 0) {
		playSound("fall");
        const curPos = toPos(player.row, player.col);

        //announce(msg);
        // Reset life to default and remove any held key, but preserve other stats.
        stats.life = baseLife;
		defeat = true;
        stats.key = levels[currentLevelId].foundKey;
        // Tell loadLevel to preserve the current stats object when reloading.
        preserveStatsOnNextLoad = true;
        loadLevel(currentLevelId);
        return;
      }

      // After combat, when the monster survives, report the combat
      // results and also include surrounding-tile information so the
      // player can decide whether to move. Do NOT include the full
      // room description or explicit "You are in ... " text to reduce
      // clutter; only the surroundings cue is appended.
      const full = msg; // combat message only
      const surroundings = groupedSurroundingsText();
      // Build spoken sequence with the monster description first (if available).
      const spokenSeq = [];
      if (attackDesc) spokenSeq.push(attackDesc);
      if (isCrit) spokenSeq.push("Critical hit!");
      // Append the combat message and then the surroundings cue (if any).
      spokenSeq.push(full);
      if (surroundings) spokenSeq.push(surroundings);

      const curPos = toPos(player.row, player.col);
      // Ensure the monster description and surroundings also appear in the
      // Current location text so it is available to screenreader and
      // deaf-blind users.
      let displayFull = (attackDesc ? attackDesc + ' ' : '') + full + (surroundings ? ' ' + surroundings : '');
      displayFull = trimText(displayFull)
	  currentText.innerHTML = displayFull;
	  if (speechOn){speechSay(currentText.textContent)}
      
      updateUI();
      //announceSequence(spokenSeq);
      return;
    }

    // Monster defeated
	playSound("slay");
	//get rewards
    removeMonster(nextPos);
    // Once defeated, the monster icon should disappear from the map.
    revealedSpecial.delete(nextPos);
    // Append concise defeat notice immediately after the attack message.
    msg += `${monsterName} is defeated. `;
	//get rewards
	if (monster.rDesc != "") {
		msg += monster.rDesc 
	}
	if (monster.rVal > 0){
		msg += " You gain " + monster.rVal + " " + monster.rKind + ". "
		stats[monster.rKind] += monster.rVal;
		
	}
	
    // Do NOT move the player — they remain in their current square after
    // defeating the monster. Include the player's current position in the
    // defeat message so they stay oriented.
    const posNow = toPos(player.row, player.col);
    // Compose a prefix that ensures the monster description (if any)
    // is spoken first, followed by a critical notice when appropriate.
    const prefix = (attackDesc ? attackDesc + ' ' : '') + (isCrit ? 'Critical hit! ' : '') + msg + ` You are in ${posNow}. `;
    enterCell(prefix);
    return;
  }
//hasKey(pos)
	if(hasKey(nextPos)){playSound("key");}
	else if(hasDoor(nextPos)){playSound("door");}
	else if(hasWeaponShop(nextPos)){playSound("door");}
	else if(hasArmorShop(nextPos)){playSound("door");}
	else if(hasInn(nextPos)){playSound("door");}
	else if(hasVoid(nextPos)){playSound("fall");}
	else if(hasPotion(nextPos)){playSound("drink")}
	else if(hasTreasure(nextPos)){playSound("get")}
	else if(hasVillager(nextPos)){playSound("get")}
	else{playSound("step");}
  // Normal movement
  player.row = nr;
  player.col = nc;
  enterCell();
}

function speakStatus() {
  speechSynthesis.cancel();
  const pos = toPos(player.row, player.col);
  myItems = document.getElementById("statsList").children;
  myStuff = ""
  for(let i = 0; i < myItems.length; i++){
	  myStuff += myItems[i].innerText + ", <br>";
  }
  announce(myStuff)
  
  
}
function speakLoc() {
	speechSynthesis.cancel();
	announce(toPos(player.row, player.col) + " " + currentLevelId  );	
	
}

var tookStairs = {bool: false, level: null, cell: null}

function activateCell(pos){
    if (hasPotion(pos)) {
      // consume potion and remove its icon
      const potionMsg = consumePotion();
      removeItem('potion', pos);
      revealedSpecial.delete(pos);
      updateUI();
      // Announce result and repeating location description
      announce("You drink the potion. " + potionMsg);
    }
		if(completed == true && (hasExit(pos) || hasDoor(pos))){
		if (level.nextLevelId != 'null' && level.nextLevelId != null) {
		  preserveStatsOnNextLoad = true;
		  loadLevel(level.nextLevelId);
		} else{
			speechSynthesis.cancel();
			announce("You have completed the final level. Congratulations!");
		}
		return;		
	}
	if (hasStairs(pos)) {
		//take stairs
		preserveStatsOnNextLoad = true;
		targetLevel = itemsAt(pos)[0].meta.level;
		targetCell = itemsAt(pos)[0].meta.cell;
		tookStairs.bool = true;
		if (targetLevel != currentLevelId){	tookStairs.level = targetLevel;}
		tookStairs.cell = targetCell;
		
	if (targetLevel == currentLevelId){
		player.col = targetCell.charCodeAt(0) - 65;
		player.row = targetCell.substring(1) - 1;
		enterCell();
	}
	else{
		loadLevel(targetLevel, targetCell);
	} }
	else if (hasShop(pos)){
		shop = itemsAt(pos)[0].meta;
		
		if (stats[shop.currency] >= shop.cost){
			if(shop.kind == "life"){
				stats[shop.currency] -= shop.cost;
				let before = stats.life;
				stats.life = Math.min(MAX_LIFE, stats.life + shop.value);
				let gained = stats.life - before;
				announce("You lose " + shop.cost  + " " + shop.currency + " and gain " + gained + " " + shop.kind + ".");	
			}
			
			else {
				stats[shop.currency] -= shop.cost;
				stats[shop.kind] = parseInt(stats[shop.kind]) + parseInt(shop.value);
				
			announce("You lose " + shop.cost  + " " + shop.currency + " and gain " + shop.value + " " + shop.kind + ".");	
			}
			
			
		}
		else {
			announce("You don't have enough " + shop.currency + ".");
		}
		updateUI();
	}
    else if (hasWeaponShop(pos)) {
      // Attempt to purchase strength upgrade: cost 18 gold, +2 strength
      const cost = 18;
      if (stats.gold >= cost) {
        stats.gold -= cost;
        stats.strength += 2;
        updateUI();
        announce(`You upgrade your strength by 2. You spent ${cost} gold. `);
      } else {
        announce(`You need ${cost} gold to buy an upgrade. `);
      }
    }
    else if (hasArmorShop(pos)) {
      // Attempt to purchase defense upgrade: cost 14 gold, +1 defense
      const cost = 14;
      if (stats.gold >= cost) {
        stats.gold -= cost;
        stats.defense += 1;
        updateUI();
        announce(`You upgrade your defense by 1. You spent ${cost} gold. `);
      } else {
        announce(`You need ${cost} gold to buy an upgrade. `);
      }
    }
    else if (hasInn(pos)) {
        const cost = 10;
        const heal = 8;
        if (stats.gold >= cost) {
          stats.gold -= cost;
          const before = stats.life;
          stats.life = Math.min(MAX_LIFE, stats.life + heal);
          const gained = stats.life - before;
          updateUI();
          if (gained > 0) announce(`You rest at the inn and recover ${gained} life. You spent ${cost} gold. `);
          else announce(`You rest at the inn but you were already at full health. You spent ${cost} gold. `);
        } else {
          announce(`You need ${cost} gold to rest at the inn. `);
        }
    }
    else if (hasExit(pos)) {
      // Pressing Space on an Exit marks the stage complete (like a door).
      completed = true;
	 
      
      // Announce completion but do not immediately load next level; Enter will advance.
      announce("You exit and return to the dungeon. <br> press <kbd>enter</kbd> to continue. " + revealMap());
	  updateUI();
      return;
    }
    else {
      // If no in-place action matched, check for adjacent exits to open with Space
      for (const d of DIRS) {
        const nr = player.row + d.dr;
        const nc = player.col + d.dc;
        if (!inBounds(nr, nc, level)) continue;
        const npos = toPos(nr, nc);
        // First handle existing exit tiles (unchanged behavior)
        if (hasExit(npos)) {
          // Open the exit (convert to an opened exit so player can move in)
          for (let i = 0; i < level.items.length; i++) {
            if (level.items[i].pos === npos && level.items[i].type === 'exit') {
              level.items[i].type = 'exit_open';
              break;
            }
          }
          revealedSpecial.set(npos, 'exit');
          updateUI();
          announce(`You open the exit. `);
          return;
        }
        // Doors are not opened with Space here; Space only opens `exit` tiles.
      }
    }
}	

function speakMapContents(){
	speechSynthesis.cancel();
	//tell user about currently visible map contents
	let myText = "";
	
	for (key of revealedSpecial){
		if(myText.length > 0){myText += ", \n"}
		if(key[1] == "shop"){
			
			 myText += String(key[0]) + " " + itemsAt(key[0])[0].meta.name;
			
		}
		else{ 
		myText += String(key).replace(",", " ").replace("_", " ")}
	}
	announce(myText)
}

function  speakLocDesc(){
	speechSynthesis.cancel();
	//rewrite the current location description so it announces again. 
	let myText = currentText.innerHTML;
	currentText.innerHTML = "";
	currentText.innerHTML = myText;
	if (speechOn){speechSay(currentText.textContent)}
}

const settings = document.getElementById("settings");

function toggleSettings(){
	if (settings.classList.contains("enabled")) {
		settings.classList.remove("enabled")
	}
	else{settings.classList.add("enabled")}
}
/* ---------------- Controls ---------------- */

//WASD shortcuts
//W - Where are the things
//A - AAAAAAAH (I don't know what to use this one for)
//S - Status
//D - Describe current location

// Re-read location description
// List visible objects
gameEl.addEventListener("keydown", (e) => {
  // Press S to hear current location + full stats.
  if (e.key === "s" || e.key === "S") {
    e.preventDefault();
    speakStatus();
    return;
  }
  if (e.key === "w" || e.key === "W") {
    e.preventDefault();
    speakMapContents();
    return;
  }

    if (e.key === "d" || e.key === "D") {
    e.preventDefault();
    speakLocDesc();
    return;
  }
  
    if (e.key === "a" || e.key === "A") {
    e.preventDefault();
    speakLoc();
    return;
  }

  
  // Spacebar: drink potion if present on current square
if (e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space' || e.code == "Enter" || e.key == "Enter" || e.code == "NumpadEnter") {
    e.preventDefault();
    const pos = toPos(player.row, player.col);
	activateCell(pos);
    return;
  }


  if (e.key.startsWith("Arrow")) e.preventDefault();

  if (e.key === "ArrowUp") tryMove(-1, 0);
  if (e.key === "ArrowDown") tryMove(1, 0);
  if (e.key === "ArrowLeft") tryMove(0, -1);
  if (e.key === "ArrowRight") tryMove(0, 1);
});




/* ---------------- Load level ---------------- */
let preserveStatsOnNextLoad = false;



function loadLevel(id, cell = "A1") {
  
  speechSynthesis.cancel();
  level = levels[id];
  currentLevelId = id;
  stats.key = level.foundKey;
  // If the level creator saved an opening description in localStorage, prefer a per-level value.
  try {
    var perKey = 'creatorOpeningDesc_' + id;
    var creatorOpening = null;
    try { creatorOpening = localStorage.getItem(perKey); } catch (e2) { creatorOpening = null; }
    if (creatorOpening && creatorOpening.length) {
      level.scenes = level.scenes || {};
      level.scenes['A1'] = creatorOpening;
    }
  } catch (e) { /* ignore storage errors */ }
  //player = { row: 0, col: 0 };
  player.col = cell.charCodeAt(0) - 65;
  player.row = cell.substring(1) - 1;
  visited = new Set();
  revealedByBump = new Set();
  revealedSpecial = new Map();
  revealedNeighbors = new Set();
  completed = false;
  // Only reset stats if not preserving from previous level
  if (!preserveStatsOnNextLoad) {
    stats = { life: baseLife, strength: 2, defense: 0, gold: 0, key: false };
  }
  preserveStatsOnNextLoad = false;
  discoveryLog = [];
  
  initMonsters();
  
  updateUI();
  
  enterCell();
  gameEl.focus();
}

function speechSay(message) {
	let utterance = new SpeechSynthesisUtterance(message);
	mySelect = document.getElementById("voiceSelector")
	myVoice = voices[mySelect.selectedIndex];
	utterance.voice = myVoice
	utterance.pitch = voicePitch;
	utterance.rate = voiceSpeed;
	utterance.volume = voiceVol;
	speechSynthesis.speak(utterance);
	
	
}

function updateVoice(){
	speechSynthesis.cancel();
	setCookie("voiceBox", voiceBox.value);
	let msg = voiceBox.value;
	speechSay(msg);
}

function updateSpeed(){
	speechSynthesis.cancel();
	setCookie("speedBox", speedBox.value);
	voiceSpeed = speedBox.value  * 0.2;
	let msg = "Speed " + speedBox.value
	speechSay(msg)
}
function updatePitch(){
	speechSynthesis.cancel();
	setCookie("pitchBox", pitchBox.value);
	voicePitch = (pitchBox.value/10) * 2;
	let msg = "Pitch " + pitchBox.value
	speechSay(msg)
}

function updateVol(){
	speechSynthesis.cancel();
	setCookie("volBox", volBox.value);
	voiceVol = volBox.value * 0.1;
	let msg = "Volume " + volBox.value
	speechSay(msg)
}

function updateTone(){
	setCookie("volBoxTone", volBoxTone.value);
	toneVol = volBoxTone.value;
	setCookie("speedBoxTone", speedBoxTone.value);
	toneLength = 0.5 / speedBoxTone.value;
	setCookie("pitchBoxTone", pitchBoxTone.value);
	tonePitch = pitchBoxTone.value * 0.2;
	playTones([true, true, true, true]);
	
}
function updateEffect(){
	setCookie("volBoxEffect", volBoxEffect.value);
	setCookie("speedBoxEffect", speedBoxEffect.value);
	setCookie("pitchBoxEffect", pitchBoxEffect.value);
	soundSpeed = 5 / speedBoxEffect.value;
	volume = volBoxEffect.value * 2;
	effectPitch = pitchBoxEffect.value * 0.2;
	soundNames = Object.keys(soundBank);
	mySound = soundNames[Math.floor(Math.random() * soundNames.length)]
	playSound(mySound);	
}

//TODO: setting colors
var namedColors = ["#FFFFFF", "#000000", "#696969", "#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#DCDCDC", "#F5F5F5", "#BC8F8F", "#CD5C5C", "#A52A2A", "#B22222", "#F08080", "#800000", "#8B0000", "#FF0000", "#FFFAFA", "#FFE4E1", "#FA8072", "#FF6347", "#E9967A", "#FF7F50", "#FF4500", "#FFA07A", "#A0522D", "#FFF5EE", "#D2691E", "#8B4513", "#F4A460", "#FFDAB9", "#CD853F", "#FAF0E6", "#FFE4C4", "#FF8C00", "#DEB887", "#FAEBD7", "#D2B48C", "#FFDEAD", "#FFEBCD", "#FFEFD5", "#FFE4B5", "#FFA500", "#F5DEB3", "#FDF5E6", "#FFFAF0", "#B8860B", "#DAA520", "#FFF8DC", "#FFD700", "#FFFACD", "#F0E68C", "#EEE8AA", "#BDB76B", "#F5F5DC", "#FAFAD2", "#808000", "#FFFF00", "#FFFFE0", "#FFFFF0", "#6B8E23", "#9ACD32", "#556B2F", "#ADFF2F", "#7FFF00", "#7CFC00", "#8FBC8F", "#228B22", "#32CD32", "#90EE90", "#98FB98", "#006400", "#008000", "#00FF00", "#F0FFF0", "#2E8B57", "#3CB371", "#00FF7F", "#F5FFFA", "#00FA9A", "#66CDAA", "#7FFFD4", "#40E0D0", "#20B2AA", "#48D1CC", "#2F4F4F", "#AFEEEE", "#008080", "#008B8B", "#00FFFF", "#E0FFFF", "#F0FFFF", "#00CED1", "#5F9EA0", "#B0E0E6", "#ADD8E6", "#00BFFF", "#87CEEB", "#87CEFA", "#4682B4", "#F0F8FF", "#1E90FF", "#708090", "#778899", "#B0C4DE", "#6495ED", "#4169E1", "#191970", "#E6E6FA", "#000080", "#00008B", "#0000CD", "#0000FF", "#F8F8FF", "#6A5ACD", "#483D8B", "#7B68EE", "#9370DB", "#663399", "#8A2BE2", "#4B0082", "#9932CC", "#9400D3", "#BA55D3", "#D8BFD8", "#DDA0DD", "#EE82EE", "#800080", "#8B008B", "#FF00FF", "#DA70D6", "#C71585", "#FF1493", "#FF69B4", "#FFF0F5", "#DB7093", "#DC143C", "#FFC0CB", "#FFB6C1"]

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}



function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function luminance(r, g, b) {
  var a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(hex1, hex2) {
  colorA = hexToRgb(hex1);
  colorB = hexToRgb(hex2);
  var lum1 = luminance(colorA.r, colorA.g, colorA.b);
  var lum2 = luminance(colorB.r, colorB.g, colorB.b);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}


function showName(wedge){
	//id="colP"
	myP = document.getElementById("colP")
	myP.innerHTML = wedge.getAttribute("title")
}
function resetColP(){
	myP = document.getElementById("colP")
	myP.innerHTML = "Color Picker"
	
}
var colorPie = document.getElementById("colorPie");

function colPicker(wedge){
	clearPicker();
	showName(wedge)
	myVar = wedge.getAttribute("variable");
	colorVar = myVar;
	let myHighVar = wedge.getAttribute("conhigh");
	//console.log(myHighVar);
	let myMidVar = wedge.getAttribute("conmid");
	//console.log(myMidVar);
	let myHex = getComputedStyle(root).getPropertyValue(myVar);
	let myMid = getComputedStyle(root).getPropertyValue(myMidVar);
	let myHigh = null;
	let myStroke = myMid;
	if(myHighVar){myHigh = getComputedStyle(root).getPropertyValue(myHighVar); myStroke = myHigh;}
	//console.log(myHigh);
	//console.log(myMid);
	//console.log("---")
	var myColors = []
	for(color of namedColors){		
		let keepMe = true;
		if (myHigh){
			if(contrast(myHigh, color) < 4.5){keepMe = false}
		}
		if(contrast(myMid, color) < 3){keepMe = false}
		if(keepMe == true){myColors.push(color);}
	
	}
	colorPie.classList.add("enabled")
	
	if (myColors.length < 12){
	for(c = 0; c < myColors.length; c++){
		addColor(myColors[c], myStroke);
	}}
	else{
		//now it gets wacky
		//myRange["stop1"] stop2 stop3 colors
		let colPer = Math.ceil(myColors.length / 12);
		let rangeCnt = Math.ceil(myColors.length / colPer);
		
		myRanges = []
		for(let r = 0; r < rangeCnt; r++){
			myRanges.push([])
		}
		for(let c = 0; c < myColors.length; c ++){
			range = Math.floor(c / colPer);
			myRanges[range].push(myColors[c]);
		}
		
		for(range of myRanges){
			//console.log(range);
			colorA = range[0];
			colorB = range[range.length - 1];
			colorC = range[Math.round(range.length/2)];
			let myRange = {"stop1": colorA, "stop2": colorB, "stop3": colorC, "colors": range}
			//console.log(myRange);
			addGradient(myRange);
			
		}
		
	}
}

var colorVar = ""


//var r = document.querySelector(':root');
//r.style.setProperty(myVar, newCol);
//newrgb = hexToRgb(newCol)
//myrgb = [newrgb.r, newrgb.g, newrgb.b].join(", ")
//r.style.setProperty(myVar + "R", myrgb);



function pickColor(wedge){
	myColor = wedge.getAttribute("title").split(" ")[0];
	//console.log(colorVar);
	//console.log(myColor);
	root.style.setProperty(colorVar, myColor);
	
	newrgb = hexToRgb(myColor)
	myrgb = [newrgb.r, newrgb.g, newrgb.b].join(", ")
	root.style.setProperty(colorVar + "R", myrgb);
	setCookie(colorVar, myColor);
	setCookie(colorVar + "R", myrgb);
}

function pickGradient(wedge){
	myColors = wedge.getAttribute("colors").split(",");
	//console.log(myColors);
	clearPicker();
	//colorVar 
	oColor =  getComputedStyle(root).getPropertyValue(colorVar);
	myRGB = hexToRgb(oColor)
	myLum = luminance(myRGB.r, myRGB.g, myRGB.b);
	myStroke = "#000000"
	if(myLum < 0.5){myStroke = "#ffffff"}
	for(c = 0; c < myColors.length; c++){
		addColor(myColors[c], myStroke);
	}
	
}
// Note: pages should call `loadLevel(...)` themselves. The automatic
// `loadLevel("level1")` call was removed so host pages (like the
// single-file campaign) can control startup and avoid using the demo
// LEVELS bundled inside this runtime.

var spSettings = document.getElementById("spSettings");
var toneSettings = document.getElementById("toneSettings");
var effectSettings = document.getElementById("effectSettings");


function toggleSpeech(){
	if (speechOn){speechOn = false; setCookie("speechOn", false); spSettings.classList.remove("enabled")}
	else {
		speechOn = true;
		setCookie("speechOn", true);
		spSettings.classList.add("enabled")
	speechSay("Speech on.")
}
}


function toggleEffect(){
	if (soundEffects == true){
		soundEffects = false;
		effectSettings.classList.remove("enabled")
		}
	else{
		soundEffects = true
		effectSettings.classList.add("enabled")
		//play random sound effect
		soundNames = Object.keys(soundBank);
		mySound = soundNames[Math.floor(Math.random() * soundNames.length)]
		playSound(mySound);
		}
	 setCookie("soundEffects", soundEffects)
}

function toggleTone(){
	
	if (tonesOn == true){
		tonesOn = false;
		toneSettings.classList.remove("enabled")
		}
	else{
		tonesOn = true; 
		playTones([true, true, true, true]);
		toneSettings.classList.add("enabled")
		}
	 setCookie("tonesOn", tonesOn)	
}



const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("select");

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for (const voice of voices) {
	  //TODO - LOCALIZATION
	if (voice.lang.substring(0,2) == "en") {
    const option = document.createElement("option");
    option.textContent = (`${voice.name}`).split("-")[0].split("(")[0];
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  }}
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}



function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays = 30) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";";
  
}

function clearPicker(){
	var allFills = document.getElementById("fillsGroup").children;
	//Loop to remove all fills from fillsGroup
	while (allFills.length > 0){
		allFills[0].remove();
	}
	var allGradients = document.getElementsByTagName("linearGradient");
	while (allGradients.length > 0){
		allGradients[0].remove();
	}
	pieText.innerHTML = "choose"
}

var pieText = document.getElementById("pieText")

function pieName(wedge){
	pieText.innerHTML = wedge.getAttribute("title")
	
	var myPaths = wedge.parentElement.children;
	for (var i = 0; i < myPaths.length; i++) { 
		myPaths[i].setAttribute("transform", "");
	}

	wedge.setAttribute("transform", "translate(" + wedge.getAttribute("movex") + " " + wedge.getAttribute("movey") + ")");
	
}


function addColor(myColor, myLine){
	var fillsGroup = document.getElementById("fillsGroup");
	//Add a new path for the new color
	var myPath = document.createElement("path");
	myPath.setAttribute("style", "fill: " + myColor + "; stroke: " + myLine);
	var colorName = ntc.name(myColor)[1];
	myPath.setAttribute("title", myColor + " " + colorName);
	myPath.setAttribute("tabindex", "0");
	myPath.setAttribute("onmouseover", "pieName(this)");
	myPath.setAttribute("onfocus", "pieName(this)");
	myPath.setAttribute("focusable", "true");
	myPath.setAttribute("onclick", "pickColor(this)");
	myPath.setAttribute("onkeypress", "pickColor(this)");
	fillsGroup.appendChild(myPath);
	//redraw all paths as equal pie slices
	var myPaths = fillsGroup.children;
	var myAngle = Math.min(120, 360/myPaths.length);
	let thisAng = 0;
	for (var i = 0; i < myPaths.length; i++) {
		let startX = 100 * Math.sin(thisAng * (Math.PI / 180)) + 125;
		let startY = -(100 * Math.cos(thisAng * (Math.PI / 180))) + 125;
		let endX = 100 * Math.sin((thisAng + myAngle) * (Math.PI / 180)) + 125;
		let endY = -(100 * Math.cos((thisAng + myAngle) * (Math.PI / 180))) + 125;
		var myD = "M 125 125 L " + startX + " " + startY + " A 100 100 0 0,1 " + endX + " " + endY + " Z";
		myPaths[i].setAttribute("d", myD);
		myPaths[i].setAttribute("movex", 10 * Math.sin((thisAng + (0.5 * myAngle)) * (Math.PI / 180)));
		myPaths[i].setAttribute("movey", -(10 * Math.cos((thisAng + (0.5 * myAngle)) * (Math.PI / 180))));
		thisAng += myAngle;	
	}
	//Force redraw so the new slices show up
	fillsGroup.innerHTML = fillsGroup.innerHTML;
	//Reset input and error message space
}


var gradKey = 0

function addGradient(myRange){
	defs = document.getElementById("pieDefs");
	var svgns = 'http://www.w3.org/2000/svg';
	var gradient = document.createElementNS(svgns, 'linearGradient');
	// Parses an array of stop information and appends <stop> elements to the <linearGradient>
	let name1 = ntc.name(myRange["stop1"])[1];
	let name2 = ntc.name(myRange["stop2"])[1];
	let name3 = ntc.name(myRange["stop3"])[1];
	var colorNames = name1;
	if(name1 != name2){colorNames += ", " + name2}
	if(name2 != name3){colorNames += ", " + name3}
	var stop = document.createElementNS(svgns, 'stop');
	stop.setAttribute('offset', "0.2");
	stop.setAttribute('stop-color', myRange["stop1"]);
	gradient.appendChild(stop);
	
	stop = document.createElementNS(svgns, 'stop');
	stop.setAttribute('offset', "0.6");
	stop.setAttribute('stop-color', myRange["stop2"]);
	gradient.appendChild(stop);

	stop = document.createElementNS(svgns, 'stop');
	stop.setAttribute('offset', "1");
	stop.setAttribute('stop-color', myRange["stop3"]);
	gradient.appendChild(stop);

	var gradName = 'Gradient' + gradKey;
	gradKey += 1;
	gradient.id = gradName;
	gradient.setAttribute('x1', '125');
	gradient.setAttribute('y1', '125');
	//TODO: gradient endpoint Math
	gradient.setAttribute('x2', '0');
	gradient.setAttribute('y2', '0');
	gradient.setAttribute("gradientUnits", "userSpaceOnUse");
	defs.appendChild(gradient);
	
	var fillsGroup = document.getElementById("fillsGroup");
	//Add a new path for the new color
	var myPath = document.createElement("path");
	myPath.style= "fill: url(#" + gradName + ")";
	myPath.setAttribute("title", colorNames);

	//tabindex="0" onkeypress="displayDescription(this)" onclick="displayDescription(this), focus()" focusable="true"
	myPath.setAttribute("onmouseover", "pieName(this)");
	myPath.setAttribute("onfocus", "pieName(this)");
	myPath.setAttribute("onclick", "pickGradient(this)");
	myPath.setAttribute("onkeypress", "pickGradient(this)");
	myPath.setAttribute("tabindex", "0");
	myPath.setAttribute("focusable", "true");
	myPath.setAttribute("colors", myRange["colors"]);
	
	fillsGroup.appendChild(myPath);
	//redraw all paths as equal pie slices
	var myPaths = fillsGroup.children;
	var myAngle = Math.min(120, 360/myPaths.length);
	let thisAng = 0;
	for (var i = 0; i < myPaths.length; i++) {
		let startX = 100 * Math.sin(thisAng * (Math.PI / 180)) + 125;
		let startY = -(100 * Math.cos(thisAng * (Math.PI / 180))) + 125;
		let endX = 100 * Math.sin((thisAng + myAngle) * (Math.PI / 180)) + 125;
		let endY = -(100 * Math.cos((thisAng + myAngle) * (Math.PI / 180))) + 125;
		var myD = "M 125 125 L " + startX + " " + startY + " A 100 100 0 0,1 " + endX + " " + endY + " Z";
		try{
			let gradx =  100 * Math.sin((thisAng + (myAngle/2)) * (Math.PI / 180)) + 125;
			let grady =  -(100 * Math.cos((thisAng + (myAngle/2)) * (Math.PI / 180))) + 125;
			var myGradient = document.getElementById(myPaths[i].getAttribute("style").split("#")[1].split('"')[0])
			myGradient.setAttribute('x2', gradx);
			myGradient.setAttribute('y2', grady);}
		catch{console.log("Not a gradient?"); console.log(myPaths[i]);}
		myPaths[i].setAttribute("d", myD);
		myPaths[i].setAttribute("movex", 10 * Math.sin((thisAng + (0.5 * myAngle)) * (Math.PI / 180)));
		myPaths[i].setAttribute("movey", -(10 * Math.cos((thisAng + (0.5 * myAngle)) * (Math.PI / 180))));
		thisAng += myAngle;
	}
	//Force redraw so the new slices show up
	fillsGroup.innerHTML = fillsGroup.innerHTML;
	
	
}


//user settings
var speechOn = false;
speechOn = initCheckbox(speechOn, "speechOn", speechBox);
if(speechOn){spSettings.classList.add("enabled")}

var soundEffects = true;
soundEffects = initCheckbox(soundEffects, "soundEffects", effectToggle);

var tonesOn = false;
tonesOn = initCheckbox(tonesOn, "tonesOn", tonesToggle);

initSetting("speedBox", speedBox);
initSetting("pitchBox", pitchBox);
initSetting("voiceBox", voiceBox);
initSetting("volBox", volBox);
initSetting("speedBoxEffect", speedBoxEffect);
initSetting("pitchBoxEffect", pitchBoxEffect);
initSetting("volBoxEffect", volBoxEffect);
initSetting("speedBoxTone", speedBoxTone);
initSetting("pitchBoxTone", pitchBoxTone);	
initSetting("volBoxTone", volBoxTone);



initCSS("colDark");
initCSS("colLight");
initCSS("colEmDark");
initCSS("colEmLight");
initCSS("colDarkR");
initCSS("colLightR");
initCSS("colEmDarkR");
initCSS("colEmLightR");