//TODO
//add monster custom icon options
//combine wall tools
//combine shops into single tool
//complicate villagers
var rows = 6;
var cols = 6;
var items = [];
var scenes = {};
var selectedPos = null;
var currentItem = 'empty';
// Treasure configuration
var treasureKind = 'gold';
var treasureValue = 25;
// Potion configuration
var potionHeal = 3;
// Villager configuration (custom spoken text + optional reward)
var villagerText = '';
var villagerKind = 'gold';
var villagerValue = 10;
// Custom wall display name (editable in UI)
var customWallName = '';
// Monster library (persisted to localStorage)
var monsterLibrary = {};
var shopLibrary = {};
var selectedMonsterIndex = -1;
var editingMonster = "";
var activeCell;
var selectedShopIndex = -1;
var editingShop = "";

//load level set
LEVELS = getLevels();

myKeys = Object.keys(LEVELS);
levelList = document.getElementById("levelSelect");
nextLevelList = document.getElementById("nextLevelSelect");
stairList = document.getElementById("stairLevelSelect");
keyList = document.getElementById("keyLevelSelect");
currentId="";



function initLevelSet(){
	for(i = 0; i < myKeys.length; i++){
		
		addOption(levelList, myKeys[i],  myKeys[i]);
		addOption(nextLevelList, myKeys[i],  myKeys[i]);
		addOption(keyList, myKeys[i],  myKeys[i]);
		addOption(stairList, myKeys[i],  myKeys[i]);
		myItems = LEVELS[myKeys[i]].items;
		//update level items from previous versions
		for (let o = 0; o < myItems.length; o++){
			item = myItems[o]
			if (item.type == "custom_wall"){
				item.type = "wall";
			}	
			else if(item.type == "weapon_shop"){
				//Welcome to the weapon shop! Press Space to upgrade your strength 2 points for 18 gold.
				item.type = "shop";
				var myMeta = {name: "weapon shop", value: 2, kind: "power", cost: 18 , currency: "gold", icon: "weapon_shop"}
				item.meta = myMeta;
			}
			else if(item.type == "armor_shop"){
				//Welcome to the armor shop! Press Space to upgrade your defense 1 points for 14 gold.
				item.type = "shop";
				var myMeta = {name: "armor shop", value: 1, kind: "defense", cost: 14 , currency: "gold", icon: "armor_shop"}
				item.meta = myMeta;
				
			}
			else if(item.type == "inn"){
				//Welcome to the inn! Press Space to rest and heal 8 points for 10 gold.
				item.type = "shop";
				var myMeta = {name: "inn", value: 8, kind: "life", cost: 10 , currency: "gold", icon: "inn"}
				item.meta = myMeta;
			}
			
		}
		
		//get all monsters
		for(u = 0; u < myItems.length; u++){
			if (myItems[u].type == "monster"){
				monsterName = myItems[u].meta.name;
				if (!monsterExists(monsterName)){
					var mon = {name: monsterName};
					monsterLibrary[monsterName] = mon;
					monsterLibrary[monsterName].meta = myItems[u].meta;
				}
				myItems[u].meta = monsterLibrary[monsterName].meta;
			}
			else if (myItems[u].type == "shop"){
				shopName = myItems[u].meta.name;
				if (!shopExists(shopName)){
					var shop = {name: shopName};
					shopLibrary[shopName] = shop;
					shopLibrary[shopName].meta = myItems[u].meta;
				}
				myItems[u].meta = shopLibrary[shopName].meta;
			}
		}
		
	}
	sortLevelList();
}

monIconSelect = document.getElementById("monIcon")
wallIconSelect = document.getElementById("wallIcon")
shopIconSelect = document.getElementById("shopIcon")

function initCustomIcons(){
	try{
		newIcons = getIcons()
		iconNames = Object.keys(newIcons);
		for(icon of iconNames){
		itemIcons[icon] = newIcons[icon];
		customIcons[icon] = newIcons[icon];
	}}
	catch(e){console.log(e)}
	myIcons = Object.keys(itemIcons);
	for(icon of myIcons){
		if(icon != "monster"){
			addOption(monIconSelect, icon, icon)}
		if(icon != "wall"){
			addOption(wallIconSelect, icon, icon)
		}
		if(icon != "villager"){
			addOption(shopIconSelect, icon, icon)
		}
	}
	updateMonIcon()
	updateWallIcon()
	updateShopIcon()
}

monIconDisplay = document.getElementById("monIconDisplay")
monAddIcon = document.getElementById("monAddIcon")
wallIconDisplay = document.getElementById("wallIconDisplay")
wallAddIcon = document.getElementById("wallAddIcon")
shopIconDisplay = document.getElementById("shopIconDisplay")
shopAddIcon = document.getElementById("shopAddIcon")


function updateMonIcon(){
	myIcon = monIconSelect.value
	monIconDisplay.innerHTML = itemIcons[myIcon];	
	if(currentId.length > 0){
		refreshCells();
	}
}


function updateShopIcon(){
	myIcon = shopIconSelect.value
	shopIconDisplay.innerHTML = itemIcons[myIcon];	
	if(currentId.length > 0){
		refreshCells();
	}
}

function updateWallIcon(){
	myIcon = wallIconSelect.value
	wallIconDisplay.innerHTML = itemIcons[myIcon];

	var existingIdx = getItemIndex(selectedPos);
	myWall = items[existingIdx];
	
	if(myWall){
		if(myWall.meta){
			myWall.meta.icon = myIcon;
			}
		else{
			var wallMeta = {icon: myIcon}
			myWall.meta = wallMeta;
			}
	}
	if(currentId.length > 0){
		refreshCells();
	}
}

function addMonIcon(){
	const reader = new FileReader();
	let fileName = monAddIcon.files[0].name.split(".")[0].split("-")[0]
	
	reader.addEventListener("load", () => {
    // this will then display a text file
		newIcon(reader.result, fileName);
	});
	reader.readAsText(monAddIcon.files[0]);
}

function addWallIcon(){
	
	const reader = new FileReader();
	let fileName = wallAddIcon.files[0].name.split(".")[0].split("-")[0]
	
	reader.addEventListener("load", () => {
    // this will then display a text file
		newIcon(reader.result, fileName);
	});
	reader.readAsText(wallAddIcon.files[0]);
	
}


function newIcon(content, name){
	monIconDisplay.innerHTML = content;
	myVector = monIconDisplay.children[0];
	
	myParts = myVector.children;
		for (part of myParts){
			if(part.tagName == "defs"){
				part.remove();
			}	
		}
	vectorStyler(myParts)
	itemIcons[name] = myVector.outerHTML;
	customIcons[name] = myVector.outerHTML;
	addOption(monIconSelect, name, name)
	addOption(wallIconSelect, name, name)
	monIconSelect.value = name;
	wallIconSelect.value = name;
	updateWallIcon()
}
	
function vectorStyler(myParts){
	for (part of myParts){
		// fill="none" stroke="currentColor" stroke-width="4"
		part.setAttribute("fill", "none");
		part.setAttribute("stroke", "currentColor");
		part.setAttribute("stroke-width", "4");
		part.removeAttribute("class")
		if(part.children){vectorStyler(part.children)}
	}

	
}
	




function updateID(){
	newId = document.getElementById('inputLevelId').value
	LEVELS[currentId].id = newId;
	LEVELS[newId] = LEVELS[currentId]
	delete LEVELS[currentId];
	//update select lists
	
	myLevels = document.getElementById("levelSelect").children;
	myNextLevels = document.getElementById("nextLevelSelect").children;
	myKeyLevels = document.getElementById("keyLevelSelect").children;
	myStairLevels = document.getElementById("stairLevelSelect").children;
	
	updateOption(myLevels, currentId, newId, newId)
	updateOption(myNextLevels, currentId, newId, newId)
	updateOption(myKeyLevels, currentId, newId, newId)
	updateOption(myStairLevels, currentId, newId, newId)

	//update next-levels
	myKeys = Object.keys(LEVELS)
	for (l = 0; l < myKeys.length; l++){
		if(LEVELS[myKeys[l]].nextLevelId == currentId){
			LEVELS[myKeys[l]].nextLevelId = newId;
			l = myKeys.length;
		}
	}
	currentId = newId;
	}

function updateOption(myList, oldValue, newValue, newText){
	for (let l = 0; l < myList.length; l++){
		if(myList[l].getAttribute("value") == oldValue){
			myList[l].setAttribute("value", newValue);
			myList[l].textContent = newText;
			l = myList.length;
		}
	}

}

function sortLevelList(){
	//TODO
	let myLevels = {}
	let levelNames = []
	let levelList = document.getElementById("levelSelect");
	let listItems = document.getElementById("levelSelect").children;
	for (l = 0; l < listItems.length; l++){
		levelName = listItems[l].getAttribute("value")
		myLevels[levelName] = listItems[l];
		if(LEVELS[levelName].nextLevelId != "null"){
			levelNames.push(listItems[l].getAttribute("value"))
		};
	}
	let myKeys = Object.keys(LEVELS)
	for (l = 0; l < myKeys.length; l++){
		myNext = LEVELS[myKeys[l]].nextLevelId;
		if (levelNames.includes(myNext)){
			levelNames.splice(levelNames.indexOf(myNext), 1);
		}
	}
	for(thisLevel of levelNames){
		if(LEVELS[thisLevel].nextLevelId == "null"){
			levelNames.splice(levelNames.indexOf(thisLevel), 1);
		}
	}
	let firstLevel = levelNames[0];
	let nextLevel = firstLevel;
	
	while (nextLevel != "null"){
		levelList.append(myLevels[nextLevel]);
		nextLevel = LEVELS[nextLevel].nextLevelId;
		
	}
	while (levelList.children[0].getAttribute("value") != firstLevel){
		levelList.append(levelList.children[0]);
		
	}
}
	


function updateNext(){
	newNext = document.getElementById('nextLevelSelect').value
	LEVELS[currentId].nextLevelId = newNext;
}

function monsterExists(monsterName){
	monsters = Object.keys(monsterLibrary);
	if(monsters.includes(monsterName)){
			return true;
	}
	return false;
}

function shopExists(shopName){
	shops = Object.keys(shopLibrary);
	if(shops.includes(shopName)){
			return true;
	}
	return false;
}

function levelNew(){
	newId = "newLevel"
	LEVELS[newId] = {};
	LEVELS[newId].id = newId
	LEVELS[newId].rows = 6
	LEVELS[newId].cols = 6
	
	myList = document.getElementById("levelSelect");
	myOtherList = document.getElementById("nextLevelSelect");
	addOption(myList, newId, newId);
	addOption(myOtherList, newId, newId);
	addOption(stairLevelSelect, newId, newId);
	addOption(keyLevelSelect, newId, newId);
	myKeys = Object.keys(LEVELS);

}

function levelCopy(){
	newId = currentId + "copy"
	LEVELS[newId] = structuredClone(LEVELS[currentId])
	LEVELS[newId].id = newId
	addOption(document.getElementById("levelSelect"), newId, newId);
	addOption(document.getElementById("nextLevelSelect"), newId, newId);
	addOption(document.getElementById("stairLevelSelect"), newId, newId);
	addOption(document.getElementById("keyLevelSelect"), newId, newId);
	
	myKeys = Object.keys(LEVELS);
	
}

function addOption(myList, myValue, myText){
	let myOption = document.createElement("option");
	myOption.textContent = myText;
	myOption.setAttribute("value", myValue);
	myList.appendChild(myOption);
}
function levelDelete(){
	deleteMe = document.getElementById('levelSelect').value;
	myLevels = document.getElementById("levelSelect").children;
	myNextLevels = document.getElementById("nextLevelSelect");
	deleteOption(myLevels, currentId)
	deleteOption(myNextLevels, currentId)
	deleteOption(keyLevelSelect, currentId)
	deleteOption(stairLevelSelect, currentId)
	delete LEVELS[deleteMe]
	
}

function deleteOption(myList, myValue){
	for (let l = 0; l < myList.length; l++){
		if(myList[l].getAttribute("value") == myValue){
			myList[l].remove();
			l = myLevels.length;
	}}
}

function updateStairCellList(){
	//clear the cell list First
	stairCellSelect.innerHTML = "";
	targetLevel = stairLevelSelect.value
	if (targetLevel == "null") {stairLevelSelect.value = currentId; targetLevel = currentId;}
	myRows = LEVELS[targetLevel].rows
	myCols = LEVELS[targetLevel].cols
	for (let c = 0; c < (myCols); c++){
		for (let r = 1; r < (parseInt(myRows) + 1); r++){
			//String.fromCharCode(65 + col)
			var newPos = String.fromCharCode(65 + c) + r;
			newOption = document.createElement("option");
			newOption.textContent = newPos
			newOption.setAttribute("value", newPos);
			stairCellSelect.appendChild(newOption);	
		}
		
	}
	
}

function updateWallName(){
	
	var existingIdx = getItemIndex(selectedPos);
	newName =  customWallNameEl.value;
	myWall = items[existingIdx]
	if(myWall.meta){
		myWall.meta.name = newName;
		}
	else{
		var wallMeta = {name: newName}
		myWall.meta = wallMeta;
		}
	
}

function changeLevel(){
	loadLevel(LEVELS[document.getElementById('levelSelect').value])
}

function loadLevel(level){
	//variables
	document.getElementById('inputRows').value = level.rows
	document.getElementById('inputCols').value = level.cols
	document.getElementById('inputLevelId').value = level.id;
	currentId = level.id;
	document.getElementById('nextLevelSelect').value = level.nextLevelId;
	document.getElementById('btnCreateGrid').click();
	//arrays
	for (i = 0; i < level.items.length; i++) {
		items.push(level.items[i])
	}
	scenes = level.scenes
	document.getElementById('btnSelect').click();
	document.getElementById('cell_A1').click();
}

function saveLevel(){
	LEVELS[currentId].rows = document.getElementById('inputRows').value
	LEVELS[currentId].cols = document.getElementById('inputCols').value
	LEVELS[currentId].nextLevelId = document.getElementById('nextLevelSelect').value
	LEVELS[currentId].scenes = scenes
	LEVELS[currentId].items = items
}
function saveSet(){
	jsContent = "function getLevels(){ \nlet LEVELS = "
	jsContent += JSON.stringify(LEVELS);	
	jsContent += ";\nreturn LEVELS; } \n"
	jsContent += "function getIcons(){ \nlet myIcons = "
	jsContent += JSON.stringify(customIcons);	
	jsContent += ";\nreturn myIcons; }"
	
	var blob = new Blob([jsContent], { type: 'charset=utf-8' });
	var link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'levels.js';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function selectMonster(monsterName){
	if (monsterName.length > 0){
	monsterClass(monsterName);
	editingMonster = monsterName;
	m = monsterLibrary[monsterName].meta;
	monsterNameEl.value = m.name || '';
	monsterHPEl.value = m.hp || 6;
	monsterATKEl.value = m.atk || 2;
	monsterDefEl.value = m.def || 0;
	document.getElementById('monsterDesc1').value = (m.descriptions && m.descriptions[0]) || '';
	document.getElementById('monsterDesc2').value = (m.descriptions && m.descriptions[1]) || '';
	document.getElementById('monsterDesc3').value = (m.descriptions && m.descriptions[2]) || '';
	monsterRewDescEl.value = m.rDesc || "";
	monsterRewKindEl.value  = m.rKind || "gold";
	monsterRewValueEl.value  = m.rVal || 5;
	monSound.value = m.sound || "growling";
	monIconSelect.value = m.icon || "monster";
	updateMonIcon();
	btnAddMonster.textContent = 'Save Monster';
	var cancel = document.getElementById('btnCancelEdit'); 
	if(cancel) cancel.style.display='inline-block';
	var message = "monster " + monsterName + " selected.";
	document.getElementById('gridAnnouncer').textContent = message;}
}

function monsterClass(name){
	monsterRows = monsterListEl.getElementsByTagName("tr");
	for (let i = 0; i < monsterRows.length; i++) {
		if(monsterRows[i].getAttribute("m") == name){
			monsterRows[i].setAttribute("class","selected");
			monsterRows[i].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
		}
		else{
			monsterRows[i].setAttribute("class","");
		}
		
	}
}

function shopClass(name){
	shopRows = shopListEl.getElementsByTagName("tr");
	for (let i = 0; i < shopRows.length; i++) {
		if(shopRows[i].getAttribute("m") == name){
			shopRows[i].setAttribute("class","selected");
			shopRows[i].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
		}
		else{
			shopRows[i].setAttribute("class","");
		}
		
	}
}

function treasureUpdate(){
	 if(currentItem == 'select'){
		 //editing an existing treasure Cell
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		items[existingIdx].meta.kind = treasureKindEl.value;
		items[existingIdx].meta.value = treasureValueEl.value;				 
	 }
	 refreshCells()
	 
 }
 
function keyUpdate(){
	 if(currentItem == 'select'){
		 //editing an existing treasure Cell
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		items[existingIdx].meta.level = keyLevelSelect.value;
	 }
	
} 
 
function stairUpdate(){
	 if(currentItem == 'select'){
		 //editing an existing treasure Cell
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		items[existingIdx].meta.level = stairLevelSelect.value;
		items[existingIdx].meta.cell = stairCellSelect.value;				 
	 }
	 updateStairCellList();
 }


function villagerUpdate(){
	 if(currentItem == 'select'){
		 //editing an existing villager Cell
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		myVillager = items[existingIdx].meta;
		myVillager.text = villagerTextEl.value;
		myVillager.kind = villagerKindEl.value;
		myVillager.value = villagerValueEl.value;
	 }			 
	 
 }

function monsterUpdate(name, hp, atk, def, rKind, rVal, rDesc, descriptions){
	if(currentItem == 'select'){
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		myMonster = items[existingIdx].meta;
		myMonster.name = name;
		myMonster.hp = hp;
		myMonster.atk = atk;
		myMonster.def = def;
		myMonster.rVal= rVal;
		myMonster.rKind = rKind;
		myMonster.rDesc = rDesc;
		myMonster.descriptions = descriptions;	
	 }
}

function shopUpdate(name, kind, value, cost, currency, icon){
	if(currentItem == 'select'){
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		myShop = items[existingIdx].meta;
		myShop.name = name;
		myShop.kind = kind;
		myShop.value = value;
		myShop.cost = cost;
		myShop.currency = currency;
		myShop.icon = icon;
	}
	
}

function getItemIndex(pos){
		for (var i = 0; i < items.length; i++) {
			if (items[i].pos === pos) {
				return(i);
			}
		}
		return(-1)
}
function loadMonsterLibrary() {
//            try {
//                var raw = localStorage.getItem('monsterLibrary');
//                if (raw) {
//                    var parsed = JSON.parse(raw);
//                    if (Array.isArray(parsed)) monsterLibrary = parsed;
//                }
//                var sel = localStorage.getItem('selectedMonsterIndex');
//                if (sel !== null) selectedMonsterIndex = parseInt(sel, 10);
//            } catch (e) {
//                console.warn('Failed to load monster library from storage', e);
//            }
}

function saveMonsterLibrary() {
	try {
		localStorage.setItem('monsterLibrary', JSON.stringify(monsterLibrary || []));
		localStorage.setItem('selectedMonsterIndex', String(selectedMonsterIndex));
	} catch (e) {
		console.warn('Failed to save monster library to storage', e);
	}
}

var symbols = {
	empty: '',
	wall: 'W',
	monster: 'M',
	treasure: 'T',
	key: 'K',
	door: 'D',
	exit: 'X',
	potion: 'P',
	void: 'V',
	shop: 'S',
	armor_shop: 'A',
	inn: 'N',
	villager: 'L',
	stairs: 'U'
};

// SVG icons for each item type
var customIcons = {}
var itemIcons = {
	wall: '<svg viewBox="0 0 88.19 88.19" style="width: 100%; height: 100%; display: block;"><rect x="1" y="1" width="86.19" height="86.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1" y1="65.64" x2="87.19" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1" y1="44.09" x2="87.19" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1" y1="22.55" x2="87.19" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="33.93" y1="1" x2="33.93" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="64.74" y1="1" x2="64.74" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="12.59" y1="22.55" x2="12.59" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="44.69" y1="22.55" x2="44.69" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="79.26" y1="22.55" x2="79.26" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="19.41" y1="44.09" x2="19.41" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="53.48" y1="44.09" x2="53.48" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="71.85" y1="65.64" x2="71.85" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="30.07" y1="65.64" x2="30.07" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M21.73,23.25c.57,2.12,3.27,3.14,3.81,5.27.37,1.46-.38,3.19.48,4.43.32.46.81.76,1.25,1.11,1.38,1.07,2.38,2.64,2.75,4.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M70.94,51.36c.69-2.36,2.19-4.47,4.18-5.9.55.04.73.08,1.27.13.44.04.88.07,1.31-.03s.84-.36,1.01-.76" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M47.63,87.2c-.55-2.12-1.3-4.18-2.24-6.16" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M73.03,1.7c.92,2.16,2.6,4.86,3.51,7.02" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M12.4,1.37c.52,2.3-.47,5.69-2.26,7.23" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M10.89,5.91l3.37,2.03c.17.69.68,1.3,1.33,1.59" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/></svg>',
				monster: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' +
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
				treasure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' +

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
				exit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"><rect x="15.8" y="3.2" width="56.7" height="81.8"/><path d="M30 44 L58 44" stroke-width="6" stroke-linecap="round"/></g></svg>',
				key: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' +
							 '<path d="M31,15.9c-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6,6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7Z" fill="none"/>' +
							 '<path d="M85,69.1L34,26.9c2-3.2,3.3-6.5,3.9-9.7,1-5.4-.1-9.8-3.3-12.4-1.9-1.5-4.1-2.3-6.7-2.3-5.8,0-12.8,3.9-18.6,10.9C1.1,23.4-.5,34.8,5.6,39.9c1.9,1.5,4.1,2.3,6.7,2.3,4.6,0,10-2.5,14.9-7l38.6,31.9-6.1,7.4c-.5.6-.4,1.4.2,1.9l1.7,1.4c.6.5,1.4.4,1.9-.2l6.1-7.4,6.6,5.5-6.1,7.4c-.4.5-.4,1.3.2,1.8l1.3,1.1c.5.4,1.3.4,1.8-.2l11.9-14.4c.6-.7.5-1.7-.2-2.2ZM14.7,17.9c6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6Z"' +
							 ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +
						 '</svg>',
				potion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' +
								 '<path d="M68.2,65c0,10.8-10.8,19.5-24.1,19.5s-24.1-8.7-24.1-19.5c0-8.7,7-16.1,16.7-18.6V5.7h14.8v40.8c9.7,2.5,16.7,9.9,16.7,18.6Z"' +
									 ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +
								 '<path d="M44.1,5.7c-5.1,0-9.2-.5-9.2-1s4.1-1,9.2-1,9.2.5,9.2,1-4.1,1-9.2,1Z"' +
									 ' fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' +
							 '</svg>',
				weapon_shop: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width:100%;height:100%;display:block;" aria-hidden="true" focusable="false">' +
												'<g stroke="currentColor" stroke-miterlimit="10" stroke-width="4" fill="none">' +
													'<path d="M20 68 L68 20"/>' +
													'<path d="M54 14 L70 30 L56 44"/>' +
												'</g>' +
											'</svg>',
				armor_shop: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width:100%;height:100%;display:block;" aria-hidden="true" focusable="false">' +
												'<g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10">' +
													'<path d="M44 6 L20 18 L20 42 C20 62 44 74 44 74 C44 74 68 62 68 42 L68 18 Z"/>' +
												'</g>' +
											'</svg>',
				inn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width:100%;height:100%;display:block;" aria-hidden="true" focusable="false">' +
												'<g stroke="currentColor" stroke-miterlimit="10" stroke-width="6" fill="none">' +
													'<line x1="44.1" y1="20" x2="44.1" y2="68.2" />' +
													'<line x1="20" y1="44.1" x2="68.2" y2="44.1" />' +
												'</g>' +
											'</svg>',
				villager: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width:100%;height:100%;display:block;" aria-hidden="true" focusable="false">' +
										'<g stroke="currentColor" stroke-miterlimit="10" stroke-width="3" fill="currentColor">' +
											'<circle cx="44" cy="28" r="10"/>' +
											'<path d="M24 66 C24 54 64 54 64 66 C64 74 44 80 44 80 C44 80 24 74 24 66 Z"/>' +
										'</g>' +
									'</svg>',
				void: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' +
							'<circle cx="44.1" cy="44.1" r="30" fill="none" stroke="currentColor" stroke-width="4" />' +
							'<circle cx="44.1" cy="44.1" r="12" fill="none" stroke="currentColor" stroke-width="4" />' +
						'</svg>',
				stairs: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline class="cls-1" fill="none" stroke="currentColor" stroke-width="4" points="88.1 24 68 24 68 40 52 40 52 56 36 56 36 72 18 72 18 88.1"/> </svg>',
				stairsD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline class="cls-1" fill="none" stroke="currentColor" stroke-width="4" points=".2 24 20.3 24 20.3 40 36.3 40 36.3 56 52.3 56 52.3 72 70.3 72 70.3 88.1"/> </svg>'
				
};

// Alias the regular wall icon for custom walls so creators can reuse the same art
itemIcons.custom_wall = itemIcons.wall;

function makeGrid() {
	var grid = document.getElementById('grid');
	grid.innerHTML = '';
	grid.style.gridTemplateColumns = 'repeat(' + cols + ', 50px)';
	//make the grid
	//header row (A B C)
	var row = document.createElement("thead");
	let cell = 	document.createElement("th");
	cell.setAttribute("scope","col");
	cell.textContent = 0;
	row.appendChild(cell)
	for (var c = 0; c < cols; c++) {
		let cell = 	document.createElement("th");
		cell.textContent = String.fromCharCode(65 + c);
		row.appendChild(cell)
	}
	grid.appendChild(row)
	for (var r = 0; r < rows; r++) {
		row = document.createElement("tr");
		let cell = 	document.createElement("th");
		cell.setAttribute("scope","row");
		cell.textContent = (r+1);
		row.appendChild(cell)
		for (var c = 0; c < cols; c++) {
			let title = ""
			var pos = String.fromCharCode(65 + c) + (r + 1);
			let cell = document.createElement('td');
			cell.className = 'cell';
			cell.id = 'cell_' + pos;
			cell.dataset.pos = pos;
			title += pos
			cell.dataset.row = r;
			cell.dataset.col = c;
			cell.textContent = '';
			cell.tabIndex = 0
			cell.style.cursor = 'pointer';
			//cell.setAttribute('role', 'button');
			cell.title = title;	
			row.appendChild(cell);
		}
		grid.appendChild(row)
	}
}

function addIcon(){
	
	
}

function refreshCells() {
	var allCells = document.querySelectorAll('.cell');
	for (var i = 0; i < allCells.length; i++) {
		var cell = allCells[i];
		var pos = cell.dataset.pos;
		var found = null;
		for (var j = 0; j < items.length; j++) {
			if (items[j].pos === pos) {
				found = items[j];
				break;
			}
		}
		cell.innerHTML = '';
		if (found) {
			let type = found.type;
			try{
			if(found.meta.icon){
				type = found.meta.icon
			}}
			catch(e){}
			if (itemIcons[type]) {
				// Display SVG icon
				cell.innerHTML = itemIcons[type];
				// If treasure has meta, expose it via aria-label
						if (found.type === 'treasure' && found.meta) {
							var label = pos + " " +   'Treasure: ' + found.meta.kind + ' ' + found.meta.value;
						   
							cell.title = label;
						} else if (found.type === 'potion' && found.meta) {
							var label = pos + " " +  'Potion: restores ' + (found.meta.heal || potionHeal) + ' life';
						  
							 cell.title = label;
						} else if (found.type === 'villager' && found.meta) {
							var label = pos + " " +  'Villager: ' + (found.meta.text || '');
						   
							cell.title = label;
						} else if (found.type === 'custom_wall') {
							var label = pos + " " +  (found.meta && found.meta.name) ? found.meta.name : 'Wall';
							 cell.title = label;
			} else {
							label = pos + " " + found.type;
							 cell.title = label;
						}
			} else {
				cell.textContent = symbols[found.type] || '';

			}
		} else {
			cell.textContent = '';
		}
	}
	saveLevel()
}

function getItemNameForAnnouncement(itemType) {
	var itemNames = {
		empty: 'empty',
		wall: 'wall',
		monster: 'monster',
		treasure: 'treasure',
		key: 'key',
		door: 'door',
		potion: 'potion',
		eraser: 'eraser',
		void: 'void',
		stairs: 'stairs'
	};
	
	itemNames.villager = 'villager';
	return itemNames[itemType] || itemType;
}

function announceCell(pos) {
	var found = null;
	for (var j = 0; j < items.length; j++) {
		if (items[j].pos === pos) {
			found = items[j];
			break;
		}
	}
	var announcement = 'Cell ' + pos;
	if (found) {
		//announcement += ' Contains: ' + getItemNameForAnnouncement(found.type);
		announcement += '. Contains ' + found.type  ;
		if (found.type == "stairs") {announcement += " to "}
		if (found.meta){
			metadata = Object.keys(found.meta)
			for(let m = 0; m < metadata.length; m++){
				announcement += ", " + metadata[m] + " " +  found.meta[metadata[m]]
			}
		}
	} else {
		announcement += '. Empty';
	}
//            announcement += '. Selected item type: ' + getItemNameForAnnouncement(currentItem) + '.';

	document.getElementById('gridAnnouncer').textContent = announcement;
}

function focusCellByPosition(pos) {
	var cell = document.getElementById('cell_' + pos);
	if (cell) {
		//cell.tabIndex = 0;
		cell.focus();
		announceCell(pos);
	}
}

function enterGridMode(startPos) {
	startPos = startPos || 'A1';
	focusCellByPosition(startPos);
	document.getElementById('gridAnnouncer').textContent = 'Entered grid mode at cell ' + startPos + '. Use arrow keys to navigate. Press Enter to place ' + getItemNameForAnnouncement(currentItem) + '.';
}

document.getElementById('btnCreateGrid').onclick = function() {
	rows = parseInt(document.getElementById('inputRows').value);
	cols = parseInt(document.getElementById('inputCols').value);
	items = [];
	scenes = {};
	selectedPos = null;
	makeGrid();
	setupGridKeyboard();
};

var itemButtons = document.querySelectorAll('.item-btn');
for (var i = 0; i < itemButtons.length; i++) {
	itemButtons[i].onclick = function() {
		for (var j = 0; j < itemButtons.length; j++) {
			itemButtons[j].classList.remove('active');
			itemButtons[j].setAttribute('aria-pressed', 'false');
		}
		this.classList.add('active');
		this.setAttribute('aria-pressed', 'true');
		currentItem = this.dataset.item;
	};

	itemButtons[i].addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			// Activate the button
			for (var j = 0; j < itemButtons.length; j++) {
				itemButtons[j].classList.remove('active');
				itemButtons[j].setAttribute('aria-pressed', 'false');
			}
			this.classList.add('active');
			this.setAttribute('aria-pressed', 'true');
			currentItem = this.dataset.item;
			// Enter grid mode
			enterGridMode('A1');
		}
	});
}

// Show/hide treasure config when treasure is selected
var treasureConfigEl = document.getElementById('treasureConfig');
var treasureKindEl = document.getElementById('treasureKind');
var treasureValueEl = document.getElementById('treasureValue');
var stairConfigEl = document.getElementById('stairConfig');
var keyConfigEl = document.getElementById('keyConfig');
var stairLevelSelect = document.getElementById('stairLevelSelect');
var stairCellSelect = document.getElementById('stairCellSelect');
var shopConfigEl = document.getElementById('shopConfig');
var shopKindEl = document.getElementById('shopKind');
var shopNameEl = document.getElementById('shopName');
var shopValueEl = document.getElementById('shopValue');
var shopCurrencyEl = document.getElementById('shopCurrency');
var shopCostEl = document.getElementById('shopCost');


function updateTreasureUI() {
	var message = "";
	
	if (currentItem === 'treasure') {
		treasureConfigEl.style.display = 'block';
		message = "Treasure properties expanded";
		treasureConfigEl.focus;
	} else {
		treasureConfigEl.style.display = 'none';
	}
	
	if (currentItem === 'shop') {
		shopConfigEl.style.display = 'block';
		message = "shop properties expanded";
		shopConfigEl.focus;
	} else {
		shopConfigEl.style.display = 'none';
	}
	
	if (currentItem == 'stairs') {
		stairConfigEl.style.display = 'block';
		updateStairCellList();
		message = "Stairs properties expanded";
	} else {
		stairConfigEl.style.display = 'none';
	}
	if (currentItem == 'key') {
		keyConfigEl.style.display = 'block';
		message = "Key properties expanded";
	} else {
		keyConfigEl.style.display = 'none';
	}

	if (currentItem == 'villager') {
		message = "villager properties expanded";
	}
	if (currentItem == 'custom_wall') {
		message = "custom wall properties expanded";
	}
	if (currentItem == 'monster') {
		message = "monster properties expanded";
	}	
	if (currentItem == 'wall') {
		message = "wall properties expanded";
	}
	
	// show/hide potion config
	if (potionConfigEl) potionConfigEl.style.display = (currentItem === 'potion') ? 'block' : 'none';

	// show/hide villager config
	var villagerConfigEl = document.getElementById('villagerConfig');
	if (villagerConfigEl) villagerConfigEl.style.display = (currentItem === 'villager') ? 'block' : 'none';
	// show/hide custom wall config
	var customWallConfigEl = document.getElementById('customWallConfig');
	if (customWallConfigEl) customWallConfigEl.style.display = (currentItem === 'wall') ? 'block' : 'none';
	var monsterContainer = document.getElementById('monsterLibraryContainer');
	if (monsterContainer) {
		monsterContainer.style.display = (currentItem === 'monster') ? 'block' : 'none';
	}
	if (message != ""){document.getElementById('gridAnnouncer').textContent = message;}
}

// Initialize listeners on the buttons to toggle treasure UI
for (var i = 0; i < itemButtons.length; i++) {
	itemButtons[i].addEventListener('click', function() {
		currentItem = this.dataset.item;
		updateTreasureUI();
	});
}

// Quick key mapping: press the letter shown in the button to switch item types
// Ignores input fields and contenteditable areas so typing isn't intercepted.
(function(){
	var keyMap = {
		'w': 'wall',
		'm': 'monster',
		't': 'treasure',
		'k': 'key',
		'd': 'door',
		'x': 'exit',
			'p': 'potion',
			'v': 'void',
			's': 'shop',
			'a': 'armor_shop',
			'n': 'inn',
			'l': 'villager',
			'e': 'eraser',
			'i': 'select',
			'u': 'stairs',
			'h': 'help'
	};

	function isEditing() {
		var ae = document.activeElement;
		if (!ae) return false;
		var tag = ae.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
		if (ae.isContentEditable) return true;
		return false;
	}

	window.addEventListener('keydown', function(e){
		if (isEditing()) return; // don't intercept typing in fields
		if (!e.key || e.key.length !== 1) return;
		var k = e.key.toLowerCase();
		if (!keyMap[k]) return;
		var item = keyMap[k];
		if (item == "help"){
			announcement = "keyboard shortcut list: "
			keys = Object.keys(keyMap);
			for(let i = 0; i < keys.length; i++){
				announcement +=  keyMap[keys[i]] + " " + keys[i] + ", ";
			}
			document.getElementById('gridAnnouncer').textContent = announcement;
		}
		else{
		var btn = document.querySelector('.item-btn[data-item="' + item + '"]');
		if (btn) {
			e.preventDefault();
			btn.click();
			// move focus to the button so keyboard users get feedback
			//btn.focus();
		}}
	});
})();

treasureKindEl.addEventListener('change', function() {
	treasureKind = this.value;
	// Apply sensible defaults per treasure kind
	if (treasureKind === 'gold') treasureValue = 25;
	else if (treasureKind === 'power') treasureValue = 2;
	else if (treasureKind === 'defense') treasureValue = 1;
	treasureValueEl.value = treasureValue;
});
treasureValueEl.addEventListener('change', function() { treasureValue = parseInt(this.value) || 0; });
// Potion UI wiring
var potionConfigEl = document.getElementById('potionConfig');
var potionHealEl = document.getElementById('potionHeal');
if (potionHealEl) {
	potionHealEl.addEventListener('change', function() { potionHeal = parseInt(this.value) || 0; });
	potionHealEl.value = potionHeal;
}
// Villager UI wiring
var villagerConfigEl = document.getElementById('villagerConfig');
var villagerTextEl = document.getElementById('villagerText');
var villagerKindEl = document.getElementById('villagerKind');
var villagerValueEl = document.getElementById('villagerValue');
if (villagerTextEl) {
	villagerTextEl.addEventListener('change', function() { villagerText = this.value || ''; });
	villagerTextEl.value = villagerText;
}
if (villagerKindEl) {
	villagerKindEl.addEventListener('change', function() {
		villagerKind = this.value || 'gold';
		// Apply sensible defaults per villager reward kind
		if (villagerKind === 'gold') villagerValue = 10;
		else if (villagerKind === 'power') villagerValue = 1;
		else if (villagerKind === 'defense') villagerValue = 1;
		if (villagerValueEl) villagerValueEl.value = villagerValue;
	});
	villagerKindEl.value = villagerKind;
}
if (villagerValueEl) {
	villagerValueEl.addEventListener('change', function() { villagerValue = parseInt(this.value) || 0; });
	villagerValueEl.value = villagerValue;
}
// Sync initial values
treasureKindEl.value = treasureKind;
treasureValueEl.value = treasureValue;
updateTreasureUI();

// Custom wall UI wiring
var customWallNameEl = document.getElementById('customWallName');
if (customWallNameEl) {
	customWallNameEl.addEventListener('change', function() { customWallName = this.value || ''; });
	customWallNameEl.value = customWallName;
}

// Monster library handling
var monsterNameEl = document.getElementById('monsterName');
var monsterHPEl = document.getElementById('monsterHP');
var monsterATKEl = document.getElementById('monsterATK');
var monsterDefEl = document.getElementById('monsterDEF');
var monsterRewKindEl = document.getElementById('monRewKind');
var monsterRewValueEl = document.getElementById('monRewValue');
var monsterRewDescEl = document.getElementById('monRewDesc');
var monsterListEl = document.getElementById('monsterList');
var monsterSoundEl = document.getElementById('monSound');
var btnAddMonster = document.getElementById('btnAddMonster');
var btnAddShop = document.getElementById('btnAddShop');

var shopListEl = document.getElementById('shopList');

function renderMonsterLibrary(){
	monsterListEl.innerHTML = '';
	//TODO monster library DRAW
	monsters = Object.keys(monsterLibrary)
	//createheader row
	if(monsters.length > 0){
	var row = document.createElement("thead")
	metaKeys = Object.keys(monsterLibrary[monsters[0]].meta);
	for (let i = 0; i < metaKeys.length; i++){
		var cell = document.createElement("th");
		cell.innerText = metaKeys[i]
		cell.setAttribute("scope","col");
		row.appendChild(cell);
	}
	monsterListEl.appendChild(row);
	var body = document.createElement("tbody");
	//create other rows
	for (let m = 0; m < monsters.length; m++){
		var row = document.createElement("tr")
		monsterListEl.appendChild(row);
		var cell = document.createElement("th");
		cell.setAttribute("scope","row");
		cell.innerText = monsterLibrary[monsters[m]].meta[metaKeys[0]];
		row.appendChild(cell);
		for (let i = 1; i < metaKeys.length; i++){
			var cell = document.createElement("td");
		if(Array.isArray(monsterLibrary[monsters[m]].meta[metaKeys[i]])){
			//make a list!
			var descs = monsterLibrary[monsters[m]].meta[metaKeys[i]];
			var list = document.createElement("ul");
			for (let d = 0; d < descs.length; d++){
				var litem = document.createElement("li");
				litem.innerText = descs[d]
				list.appendChild(litem);
			}
			cell.appendChild(list)
		}
		else{
			cell.innerHTML = monsterLibrary[monsters[m]].meta[metaKeys[i]]
		}
			row.appendChild(cell);
		}
		body.appendChild(row);
		row.setAttribute("m", monsters[m]);
		row.setAttribute('onclick', "selectMonster(\"" + monsters[m] + "\")");
		
	}
	monsterListEl.appendChild(body);
	}
	selectMonster(editingMonster);
}


function renderShopLibrary(){
	shopListEl.innerHTML = '';
	//TODO shop library DRAW
	shops = Object.keys(shopLibrary)
	//createheader row
	if(shops.length > 0){
	var row = document.createElement("thead")
	metaKeys = Object.keys(shopLibrary[shops[0]].meta);
	for (let i = 0; i < metaKeys.length; i++){
		var cell = document.createElement("th");
		cell.innerText = metaKeys[i]
		cell.setAttribute("scope","col");
		row.appendChild(cell);
	}
	shopListEl.appendChild(row);
	var body = document.createElement("tbody");
	//create other rows
	for (let m = 0; m < shops.length; m++){
		var row = document.createElement("tr")
		shopListEl.appendChild(row);
		var cell = document.createElement("th");
		cell.setAttribute("scope","row");
		cell.innerText = shopLibrary[shops[m]].meta[metaKeys[0]];
		row.appendChild(cell);
		for (let i = 1; i < metaKeys.length; i++){
			var cell = document.createElement("td");
		if(Array.isArray(shopLibrary[shops[m]].meta[metaKeys[i]])){
			//make a list!
			var descs = shopLibrary[shops[m]].meta[metaKeys[i]];
			var list = document.createElement("ul");
			for (let d = 0; d < descs.length; d++){
				var litem = document.createElement("li");
				litem.innerText = descs[d]
				list.appendChild(litem);
			}
			cell.appendChild(list)
		}
		else{
			cell.innerHTML = shopLibrary[shops[m]].meta[metaKeys[i]]
		}
			row.appendChild(cell);
		}
		body.appendChild(row);
		row.setAttribute("m", shops[m]);
		row.setAttribute('onclick', "selectShop(\"" + shops[m] + "\")");
		
	}
	shopListEl.appendChild(body);
	}
	selectShop(editingShop);
}

function selectShop(shopName){
	if (shopName.length > 0){
		shopClass(shopName);
		editingShop = shopName;
		shop = shopLibrary[shopName].meta;
		shopNameEl.value = shop.name || 'shop';
		shopKindEl.value = shop.kind || 'defense';
		console.log(shop.kind);
		shopValueEl.value = shop.value || 1;
		shopCostEl.value = shop.cost || 14;
		shopCurrencyEl.value = shop.currency || 'gold';
		shopIconSelect.value = shop.icon || 'villager';
		updateShopIcon();
		btnAddShop.textContent = 'Save Shop';
		var cancel = document.getElementById('btnCancelShop'); 
		if(cancel) cancel.style.display='inline-block';
		var message = "shop " + shopName + " selected.";
		document.getElementById('gridAnnouncer').textContent = message;
	}	
}



btnAddMonster.addEventListener('click', function(){
	var name = monsterNameEl.value.trim() || 'Monster';
	var hp = parseInt(monsterHPEl.value) || 6;
	var atk = parseInt(monsterATKEl.value) || 2;
	var def = parseInt(monsterDefEl.value) || 0;
	var d1 = (document.getElementById('monsterDesc1')||{value:''}).value.trim();
	var d2 = (document.getElementById('monsterDesc2')||{value:''}).value.trim();
	var d3 = (document.getElementById('monsterDesc3')||{value:''}).value.trim();
	var descriptions = [];
	var rKind = monsterRewKindEl.value
	var rValue = monsterRewValueEl.value
	var rDesc = monsterRewDescEl.value
	var icon = monIconSelect.value;
	var sound = monSound.value;
	if (d1) descriptions.push(d1);
	if (d2) descriptions.push(d2);
	if (d3) descriptions.push(d3);
	if (editingMonster.length > 0) {
		// Save edits to existing monster
		var m = monsterLibrary[editingMonster];
		mm = m.meta;
		mm.name = name; mm.hp = hp; mm.atk = atk; mm.def = def; mm.descriptions = descriptions;
		mm.rKind = rKind; mm.rVal = rValue; mm.rDesc = rDesc;
		mm.sound = sound;
		mm.icon = icon;
		btnAddMonster.textContent = 'Add Monster';
		var cancel = document.getElementById('btnCancelEdit'); if(cancel) cancel.style.display='none';
	} else {
		//adding new monster to the library
		//monsterLibrary.push({name:name, hp:hp, atk:atk, def:def, rKind: rKind, rVal: rValue, rDesc: rDesc, descriptions: descriptions});
		var mon = {name: name};
		monsterLibrary[name] = mon;
		monsterLibrary[name].meta = {name:name, hp:hp, atk:atk, def:def, rKind: rKind, rVal: rValue, rDesc: rDesc, descriptions: descriptions};
		selectMonster(name);
	}
	if (currentItem == "select"){
		monsterUpdate(name, hp, atk, def, rKind, rValue, rDesc, descriptions);
	}
	monsterNameEl.value = '';
	document.getElementById('monsterDesc1').value = '';
	document.getElementById('monsterDesc2').value = '';
	document.getElementById('monsterDesc3').value = '';
	saveMonsterLibrary();
	renderMonsterLibrary();
});

// Load persisted library, or initialize with one default if empty
loadMonsterLibrary();
if(monsterLibrary.length===0){ monsterLibrary.push({name:'Grunt', hp:6, atk:2, def:0}); saveMonsterLibrary(); }
renderMonsterLibrary();

// Cancel edit button behavior
var btnCancelEdit = document.getElementById('btnCancelEdit');
if (btnCancelEdit) {
	btnCancelEdit.addEventListener('click', function(){
		editingMonster = "";
		btnAddMonster.textContent = 'Add Monster';
		btnCancelEdit.style.display = 'none';
		monsterNameEl.value = '';
		monsterHPEl.value = 6;
		monsterATKEl.value = 2;
		monsterDefEl.value = 0;
		monsterRewDescEl.value = '';
		monsterRewKindEl.value = "Gold";
		monsterRewValueEl.value = 25;
		monsterClass("");
		monIconSelect.value = "monster"
		monSound.value = "growling"
		updateMonIcon();
		document.getElementById('monsterDesc1').value = '';
		document.getElementById('monsterDesc2').value = '';
		document.getElementById('monsterDesc3').value = '';
	});
}

var btnCancelShop = document.getElementById('btnCancelShop');

if (btnCancelShop) {
	btnCancelShop.addEventListener('click', function(){
		editingShop = "";
		btnAddShop.textContent = 'Add Shop';
		btnCancelShop.style.display = 'none';
		shopNameEl.value = '';
		shopKindEl.value = "defense";
		shopValueEl.value = 0;
		shopCostEl.value = 0;
		shopIconSelect.value = "villager";
		shopCurrencyEl.value = "gold";
		updateShopIcon();
	});
}

btnCancelEdit.style.display = 'none';
btnCancelShop.style.display = 'none';

btnAddShop.addEventListener('click', function(){
	var name = shopNameEl.value.trim() || 'Shop';
	var kind = shopKindEl.value;
	var value = shopValueEl.value;
	var cost = shopCostEl.value;
	var currency = shopCurrencyEl.value;
	var icon = shopIconSelect.value;
	if (editingShop.length > 0) {
		// Save edits to existing shop
		var shop = shopLibrary[editingShop];
		shopMeta = shop.meta;
		shopMeta.name = name; 
		shopMeta.kind = kind;
		shopMeta.value = value;
		shopMeta.cost = cost;
		shopMeta.currency = currency;
		shopMeta.icon = icon;
		btnAddShop.textContent = 'Add Shop';
		var cancel = document.getElementById('btnCancelShop'); if(cancel) cancel.style.display='none';
	} else {
		//adding new shop to the library
		//shopLibrary.push({name:name, hp:hp, atk:atk, def:def, rKind: rKind, rVal: rValue, rDesc: rDesc, descriptions: descriptions});
		var shop = {name: name};
		shopLibrary[name] = shop;
		shopLibrary[name].meta = {name:name, kind: kind, value: value, cost: cost, currency: currency, icon: icon };
		selectShop(name);
	}
	if (currentItem == "select"){
		shopUpdate(name, kind, value, cost, currency, icon);
	}
	shopNameEl.value = 'shop';
	
	renderShopLibrary();
});



// Handle grid keyboard navigation
function setupGridKeyboard() {
	var allCells = document.querySelectorAll('.cell');
	for (var i = 0; i < allCells.length; i++) {
		allCells[i].addEventListener('keydown', function(e) {
			var pos = this.dataset.pos;
			var row = parseInt(this.dataset.row);
			var col = parseInt(this.dataset.col);
			var newRow = row;
			var newCol = col;
			var handled = false;

			if (e.key === 'ArrowUp') {
				e.preventDefault();
				newRow = Math.max(0, row - 1);
				handled = true;
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				newRow = Math.min(rows - 1, row + 1);
				handled = true;
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				newCol = Math.max(0, col - 1);
				handled = true;
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				newCol = Math.min(cols - 1, col + 1);
				handled = true;
			} else if (e.key === 'Enter') {
				e.preventDefault();
				// Place item on current cell
				var existingIdx = -1;
				for (var k = 0; k < items.length; k++) {
					if (items[k].pos === pos) {
						existingIdx = k;
						break;
					}
				}

				if (currentItem === 'empty' || currentItem === 'eraser') {
					if (existingIdx >= 0) {
						items.splice(existingIdx, 1);
					}
				} else if (currentItem === 'treasure') {
					var treasureObj = {type: 'treasure', pos: pos, meta: {kind: treasureKind, value: treasureValue}};
					if (existingIdx >= 0) {
						items[existingIdx] = treasureObj;
					} else {
						items.push(treasureObj);
					}
				 }  else if (currentItem === 'key') {
					var keyObj = {type: 'key', pos: pos, meta: {level: document.getElementById("keyLevelSelect").value}};
					
					if (existingIdx >= 0) {
						items[existingIdx] = keyObj;
					} else {
						items.push(keyObj);
					}

					
				} else if (currentItem === 'monster') {
					var monsterMeta = null;
					if (selectedMonster.length > "" && monsterLibrary[selectedMonster]) {
						monsterMeta = monsterLibrary[selectedMonster].meta;
						
					}
					var monsterObj = {type: 'monster', pos: pos};
					if (monsterMeta) monsterObj.meta = monsterMeta;
					if (existingIdx >= 0) {
						items[existingIdx] = monsterObj;
					} else {
						items.push(monsterObj);
					}
				} else if (currentItem === 'potion') {
					var potionObj = {type: 'potion', pos: pos, meta: {heal: potionHeal}};
					if (existingIdx >= 0) {
						items[existingIdx] = potionObj;
					} else {
						items.push(potionObj);
					}
				} else if (currentItem === 'villager') {
					var villagerObj = {type: 'villager', pos: pos, meta: {text: villagerText, kind: villagerKind, value: villagerValue}};
					if (existingIdx >= 0) {
						items[existingIdx] = villagerObj;
					} else {
						items.push(villagerObj);
					}
				} else if (currentItem === 'custom_wall') {
					var cwObj = {type: 'custom_wall', pos: pos, meta: {name: customWallName}};
					if (existingIdx >= 0) {
						items[existingIdx] = cwObj;
					} else {
						items.push(cwObj);
					}
				} else if (currentItem === 'select') {
					this.click();
				}
				else {
					if (existingIdx >= 0) {
						items[existingIdx].type = currentItem;
						if (items[existingIdx].meta) delete items[existingIdx].meta;
					} else {
						items.push({type: currentItem, pos: pos});
					}
				}

				refreshCells();
				if (currentItem != 'select'){
				var message = 'Placed ' + getItemNameForAnnouncement(currentItem) + ' on cell ' + pos + '.';
				document.getElementById('gridAnnouncer').textContent = message;}
				else{
					var message = "Cell selected. ";
					document.getElementById('gridAnnouncer').textContent = message;}
				
				return;
			}	

			if (handled && (newRow !== row || newCol !== col)) {
				var newPos = String.fromCharCode(65 + newCol) + (newRow + 1);
				focusCellByPosition(newPos);
			}
		});
	}
}

document.getElementById('grid').onclick = function(e) {
	updateTreasureUI()
	// Support clicks on inner SVG/content by finding the nearest .cell ancestor.
	var targetCell = (e.target && e.target.closest) ? e.target.closest('.cell') : null;
	if (!targetCell) return;
	var cell = targetCell;
	
		var allCells = document.querySelectorAll('.cell');
		for (var i = 0; i < allCells.length; i++) {
			allCells[i].classList.remove('selected');
		}
		cell.classList.add('selected');

		var pos = cell.dataset.pos;
		selectedPos = pos;
		document.getElementById('inputDesc').value = scenes[pos] || '';
		
		var existingIdx = getItemIndex(pos);
		
		if (currentItem === 'empty') {
			if (existingIdx >= 0) {
				items.splice(existingIdx, 1);
			}
		} else if (currentItem === 'treasure') {
			var treasureObj = {type: 'treasure', pos: pos, meta: {kind: treasureKind, value: treasureValue}};
			if (existingIdx >= 0) {
				items[existingIdx] = treasureObj;
			} else {
				items.push(treasureObj);
			}
		} else if (currentItem === 'stairs') {
			var stairsObj = {type: 'stairs', pos: pos, meta: {level: stairLevelSelect.value, cell: stairCellSelect.value}};
			if (existingIdx >= 0) {
				items[existingIdx] = stairsObj;
			} else {
				items.push(stairsObj);
			}
		} else if (currentItem === 'monster') {
			var monsterMeta = null;
			if (editingMonster.length >0 && monsterLibrary[editingMonster]) {
				monsterMeta = monsterLibrary[editingMonster].meta;
				if (m.descriptions && m.descriptions.length) monsterMeta.descriptions = m.descriptions.slice();
			}
			var monsterObj = {type: 'monster', pos: pos};
			if (monsterMeta) monsterObj.meta = monsterMeta;
			if (existingIdx >= 0) {
				items[existingIdx] = monsterObj;
			} else {
				items.push(monsterObj);
			}
			
			
		} else if (currentItem === 'potion') {
			var potionObj = {type: 'potion', pos: pos, meta: {heal: potionHeal}};
			if (existingIdx >= 0) {
				items[existingIdx] = potionObj;
			} else {
				items.push(potionObj);
			}
		} else if (currentItem === 'villager') {
			var villagerObj = {type: 'villager', pos: pos, meta: {text: villagerText, kind: villagerKind, value: villagerValue}};
			if (existingIdx >= 0) {
				items[existingIdx] = villagerObj;
			} else {
				items.push(villagerObj);
			}
		} else if (currentItem === 'wall') {
			var cwObj = {type: 'wall', pos: pos, meta: {name: customWallNameEl.value, icon: wallIconSelect.value}};
			if (existingIdx >= 0) {
				items[existingIdx] = cwObj;
			} else {
				items.push(cwObj);
			}
			
		} else if (currentItem === 'eraser') {
			if (existingIdx >= 0) {
				items.splice(existingIdx, 1);
			}
		} else if (currentItem == 'select'){
			activeCell = cell
			if(items[existingIdx]){
				type = items[existingIdx].type;
				//TODO
				message = ""
				if (type == "treasure"){
					treasureConfigEl.style.display = 'block'; 
					message = type + " properties expanded."
					
					treasureKindEl.value = items[existingIdx].meta.kind;
					//treasureKindEl.focus();
					treasureValueEl.value = items[existingIdx].meta.value;
				}
				else if(type == "shop"){
					shopConfigEl.style.display = 'block'; 
					message = type + " properties expanded."
					shopNameEl.value = items[existingIdx].meta.name;
					shopKindEl.value = items[existingIdx].meta.kind;
					shopValueEl.value = items[existingIdx].meta.value;
					shopCurrencyEl.value = items[existingIdx].meta.currency;
					shopIconSelect.value = items[existingIdx].meta.icon;
					updateShopIcon();
				}
				else if (type == "monster"){
					myMonster = items[existingIdx].meta;
					message = type + " properties expanded."
					//descCount = (myMonster.descriptions && myMonster.descriptions.length) ? myMonster.descriptions.length : 0
					//myDesc = myMonster.name + ' (HP:' + (myMonster.hp||0) + ' ATK:' + (myMonster.atk||0) + ' DEF:' + (myMonster.def||0) + ')' + (descCount>0 ? ' ['+descCount+' desc]' : '');
					monsterContainer = document.getElementById('monsterLibraryContainer');
					monsterContainer.style.display = 'block'; 
					monsters = monsterListEl.children
					selectMonster(myMonster.name)
					document.getElementById("monsterName").focus();
				}
				else if (type == "villager"){
					message = type + " properties expanded."
					villagerConfigEl = document.getElementById('villagerConfig');
					villagerConfigEl.style.display = 'block'; 
					myVillager = items[existingIdx].meta
					villagerTextEl.value = myVillager.text
					villagerKindEl.value =  myVillager.kind
					villagerValueEl.value = myVillager.value
					villagerTextEl.focus();
				}

				else if (type == "stairs"){
					message = type + " properties expanded."
					stairsConfigEl = document.getElementById('stairConfig');
					stairsConfigEl.style.display = 'block'; 
					mystairs = items[existingIdx].meta
					stairLevelSelect.value = mystairs.level
					stairCellSelect.value =  mystairs.cell
					stairLevelSelect.focus();
				}
				else if (type == "key"){
					message = type + " properties expanded."
					keyConfigEl = document.getElementById('keyConfig');
					keyConfigEl.style.display = 'block'; 
					if (items[existingIdx].meta){
						mykey = items[existingIdx].meta
						keyLevelSelect.value = mykey.level								
					}
					else {
						mypos = items[existingIdx].pos
						keyLevelSelect.value = currentId;
						var keyObj = {type: 'key', pos: pos, meta: {level: currentId}};
						items[existingIdx] = keyObj;
					keyLevelSelect.focus();}
				}
				else if (type == "wall"){
					wallName = document.getElementById("customWallName");
					message = type + " properties expanded."
					wallConfigEl = document.getElementById('customWallConfig');
					wallConfigEl.style.display = 'block'; 
					wallName.value = ""; 
					wallIconSelect.value="wall";
					if (items[existingIdx].meta){
						if(items[existingIdx].meta.name){wallName.value = items[existingIdx].meta.name;}
						if(items[existingIdx].meta.icon){wallIconSelect.value = items[existingIdx].meta.icon;}
					}
					updateWallIcon();
				}
				else{updateTreasureUI()}
				if (message != ""){document.getElementById('gridAnnouncer').textContent = message;}
		}}
		else {
			if (existingIdx >= 0) {
				items[existingIdx].type = currentItem;
				if (items[existingIdx].meta) delete items[existingIdx].meta;
			} else {
				items.push({type: currentItem, pos: pos});
			}
		}

		refreshCells();
	};
	

document.getElementById('btnSetDesc').onclick = function() {
	if (selectedPos) {
		var desc = document.getElementById('inputDesc').value;
		if (desc.trim()) {
			scenes[selectedPos] = desc;
		} else {
			delete scenes[selectedPos];
		}
	}
};



document.getElementById('btnGenerateSVG').onclick = function() {
	// 0.7 inches = 0.7 * 96 pixels (at 96 DPI)
	var cellSize = 0.7 * 96; // approximately 67.2 pixels
	var gridWidth = cols * cellSize;
	var gridHeight = rows * cellSize;
	var iconSize = cellSize * 0.8; // Icons take up 80% of cell

	// Start SVG
	var svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
	svgContent += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + gridWidth + ' ' + gridHeight + '" width="' + gridWidth + 'px" height="' + gridHeight + 'px">\n';
	
	// White background
	svgContent += '  <rect width="' + gridWidth + '" height="' + gridHeight + '" fill="white"/>\n';

	// Draw grid
	svgContent += '  <!-- Grid lines -->\n';
	for (var r = 0; r <= rows; r++) {
		var y = r * cellSize;
		svgContent += '  <line x1="0" y1="' + y + '" x2="' + gridWidth + '" y2="' + y + '" stroke="black" stroke-width="1"/>\n';
	}
	for (var c = 0; c <= cols; c++) {
		var x = c * cellSize;
		svgContent += '  <line x1="' + x + '" y1="0" x2="' + x + '" y2="' + gridHeight + '" stroke="black" stroke-width="1"/>\n';
	}

	// Draw items
	svgContent += '  <!-- Items -->\n';
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var pos = item.pos;
		var col = pos.charCodeAt(0) - 65;
		var row = parseInt(pos.substring(1)) - 1;
		
		var x = col * cellSize + (cellSize - iconSize) / 2;
		var y = row * cellSize + (cellSize - iconSize) / 2;

		// Extract SVG content from itemIcons and scale according to its viewBox
		var iconSvg = itemIcons[item.type];
		if (iconSvg) {
			var svgMatch = iconSvg.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/);
			if (svgMatch) {
				var svgAttrs = svgMatch[1] || '';
				var iconContent = svgMatch[2] || '';
				var sourceSize = 24;
				var vbMatch = svgAttrs.match(/viewBox="([^"]+)"/i);
				if (vbMatch) {
					var parts = vbMatch[1].trim().split(/\s+/);
					if (parts.length >= 4) {
						var w = Number(parts[2]) || 0;
						var h = Number(parts[3]) || 0;
						sourceSize = Math.max(w || 0, h || 0) || sourceSize;
					}
				} else if (iconSvg.indexOf('88') !== -1) {
					sourceSize = 88.19;
				}
				var scale = iconSize / sourceSize;
				svgContent += '  <g transform="translate(' + x + ', ' + y + ') scale(' + scale + ')">\n';
				svgContent += '    ' + iconContent + '\n';
				svgContent += '  </g>\n';
			}
		}
	}

	svgContent += '</svg>';

	// Create blob and download
	var blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
	var link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'level_map.svg';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

document.getElementById('btnGenerateWallsSVG').onclick = function() {
	// Export SVG containing only wall items
	var cellSize = 0.7 * 96;
	var gridWidth = cols * cellSize;
	var gridHeight = rows * cellSize;
	var iconSize = cellSize * 0.8;

	var svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
	svgContent += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + gridWidth + ' ' + gridHeight + '" width="' + gridWidth + 'px" height="' + gridHeight + 'px">\n';
	svgContent += '  <rect width="' + gridWidth + '" height="' + gridHeight + '" fill="white"/>\n';

	// Grid lines
	for (var r = 0; r <= rows; r++) {
		var y = r * cellSize;
		svgContent += '  <line x1="0" y1="' + y + '" x2="' + gridWidth + '" y2="' + y + '" stroke="black" stroke-width="1"/>\n';
	}
	for (var c = 0; c <= cols; c++) {
		var x = c * cellSize;
		svgContent += '  <line x1="' + x + '" y1="0" x2="' + x + '" y2="' + gridHeight + '" stroke="black" stroke-width="1"/>\n';
	}

	// Only draw walls (include custom_wall aliases)
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.type !== 'wall' && item.type !== 'custom_wall') continue;
		var pos = item.pos;
		var col = pos.charCodeAt(0) - 65;
		var row = parseInt(pos.substring(1)) - 1;
		var x = col * cellSize + (cellSize - iconSize) / 2;
		var y = row * cellSize + (cellSize - iconSize) / 2;

		var iconSvg = itemIcons[item.type];
		if (iconSvg) {
			var svgMatch = iconSvg.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/);
			if (svgMatch) {
				var svgAttrs = svgMatch[1] || '';
				var iconContent = svgMatch[2] || '';
				var sourceSize = 24;
				var vbMatch = svgAttrs.match(/viewBox="([^"]+)"/i);
				if (vbMatch) {
					var parts = vbMatch[1].trim().split(/\s+/);
					if (parts.length >= 4) {
						var w = Number(parts[2]) || 0;
						var h = Number(parts[3]) || 0;
						sourceSize = Math.max(w || 0, h || 0) || sourceSize;
					}
				} else if (iconSvg.indexOf('88') !== -1) {
					sourceSize = 88.19;
				}
				var scale = iconSize / sourceSize;
				svgContent += '  <g transform="translate(' + x + ', ' + y + ') scale(' + scale + ')">\n';
				svgContent += '    ' + iconContent + '\n';
				svgContent += '  </g>\n';
			}
		}
	}

	svgContent += '</svg>';

	var blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
	var link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'level_map_walls.svg';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

makeGrid();
setupGridKeyboard();


// Importer: allow loading a previously generated level HTML into the creator
(function(){
	var importFileEl = document.getElementById('importFile');
	var importBtn = document.getElementById('btnImportHTML');
	if(!importFileEl || !importBtn) return;

	function showMessage(msg){
		// Use alert for now; could be replaced with in-UI notification
		try { alert(msg); } catch(e){ console.log(msg); }
	}

	function importLevelFromHtmlText(text){


	}

	importBtn.addEventListener('click', function(){ importFileEl.click(); });
	importFileEl.addEventListener('change', function(){
		var f = importFileEl.files && importFileEl.files[0];
		if(!f) return;
		var reader = new FileReader();
		reader.onload = function(evt){
			try { importLevelFromHtmlText(String(evt.target.result || '')); } catch(err){ showMessage('Import failed: ' + err.message); }
		};
		reader.onerror = function(){ showMessage('Failed to read file'); };
		reader.readAsText(f, 'utf-8');
		importFileEl.value = '';
	});
})();

// Export monsters CSV
(function(){
	var btn = document.getElementById('btnExportMonsters');
	if(!btn) return;
	function csvEscapeField(s){ if (s==null) s=''; s = String(s); if (s.indexOf('"')!==-1 || s.indexOf(',')!==-1 || s.indexOf('\n')!==-1) return '"' + s.replace(/"/g,'""') + '"'; return s; }
	btn.addEventListener('click', function(){
		try {
			var rowsArr = [];
			rowsArr.push(['name','hp','atk','def','descriptions']);
			for (var i=0;i<monsterLibrary.length;i++){
				var m = monsterLibrary[i] || {};
				var desc = (m.descriptions && m.descriptions.length) ? m.descriptions.join(' | ') : '';
				rowsArr.push([m.name||'', String(m.hp||''), String(m.atk||''), String(m.def||''), desc]);
			}
			var csv = rowsArr.map(function(r){ return r.map(csvEscapeField).join(','); }).join('\r\n');
			var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
			var link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'monsters.csv';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (e) { try{ alert('Export failed: '+e.message); }catch(_){ console.error(e); } }
	});
})();

// Import monsters from CSV (append-only)
(function(){
	var importInput = document.getElementById('importMonstersFile');
	var importBtn = document.getElementById('btnImportMonsters');
	if(!importInput || !importBtn) return;

	function parseCsv(text){
		// Simple CSV parser: split lines, handle quoted fields
		var rows = [];
		var lines = text.split(/\r?\n/);
		for(var i=0;i<lines.length;i++){
			var line = lines[i].trim();
			if(!line) continue;
			var cols = [];
			var cur = '';
			var inQuotes = false;
			for(var j=0;j<line.length;j++){
				var ch = line[j];
				if(inQuotes){
					if(ch==='"'){
						if(line[j+1]==='"'){ cur += '"'; j++; } else { inQuotes=false; }
					} else { cur += ch; }
				} else {
					if(ch==='"'){ inQuotes=true; }
					else if(ch===','){ cols.push(cur); cur=''; }
					else { cur += ch; }
				}
			}
			cols.push(cur);
			rows.push(cols);
		}
		return rows;
	}
	
	importBtn.addEventListener('click', function(){ importInput.click(); });
	importInput.addEventListener('change', function(){
		var f = importInput.files && importInput.files[0];
		if(!f) return;
		var reader = new FileReader();
		reader.onload = function(evt){
			try {
				var txt = String(evt.target.result || '');
				var data = parseCsv(txt);
				if(!data || data.length===0){ alert('No data found in CSV'); return; }
				// First row assumed header; find columns indices
				var header = data[0].map(function(h){ return String(h||'').toLowerCase().trim(); });
				var idxName = header.indexOf('name');
				var idxHp = header.indexOf('hp');
				var idxAtk = header.indexOf('atk');
				var idxDef = header.indexOf('def');
				var idxDesc = header.indexOf('descriptions');
				if(idxName===-1){ alert('CSV missing "name" column'); return; }
				var added = 0;
				for(var r=1;r<data.length;r++){
					var row = data[r]; if(!row || row.length===0) continue;
					var name = row[idxName] || '';
					if(!name || !name.trim()) continue;
					var hp = idxHp===-1 ? 6 : Number(row[idxHp]) || 6;
					var atk = idxAtk===-1 ? 2 : Number(row[idxAtk]) || 2;
					var def = idxDef===-1 ? 0 : Number(row[idxDef]) || 0;
					var desc = '';
					if(idxDesc!==-1) desc = row[idxDesc] || '';
					var descriptions = desc ? String(desc).split(/\s*\|\s*/) : [];
					monsterLibrary.push({ name: String(name), hp: hp, atk: atk, def: def, descriptions: descriptions });
					added++;
				}
				if(added>0){ saveMonsterLibrary(); renderMonsterLibrary(); alert('Imported '+added+' monsters.'); }
				else alert('No valid monsters found to import.');
			} catch(e){ alert('Import failed: '+e.message); }
		};
		reader.onerror = function(){ alert('Failed to read file'); };
		reader.readAsText(f, 'utf-8');
		importInput.value = '';
	});
})();


myOption = document.createElement("option");
myOption.textContent = "Finish"
myOption.setAttribute("value", null);
nextLevelList.appendChild(myOption);


initCustomIcons()


initLevelSet();
renderMonsterLibrary()
renderShopLibrary()
//load level one
loadLevel(LEVELS[myKeys[0]])