//TODO

var metaMap = {};
var configMap = {}


var rows = 6;
var cols = 6;
var items = [];
var scenes = {};
var selectedPos = null;
var activeCell;
var currentItem = 'empty';
var currentGame = "";

var libraries = {};

var levelSelectors = [];
var iconSelectors = [];

var nameField = document.getElementById("gameName");

var LEVELS = {"level1":{"id":"level1","rows":2,"cols":2,"items":[{"type":"wall","pos":"B1"},{"type":"door","pos":"B2"},{"type":"key","pos":"A2"}],"scenes":{"A1":"You wake up in a small room."},"nextLevelId":"level2"}, 		"level2":{"id":"level2","rows":2,"cols":6,"items":[{"type":"wall","pos":"A2"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"D1"},{"type":"door","pos":"F2"},{"type":"key","pos":"F1"}],"scenes":{"A1":"You walk down the hall."},"nextLevelId":"level3"}, 		"level3":{"id":"level3","rows":4,"cols":4,"items":[{"type":"wall","pos":"B1"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"D1"},{"type":"key","pos":"D2"},{"type":"potion","pos":"C3"},{"type":"door","pos":"D4"},{"type":"treasure","pos":"B4","meta":{"kind":"power","value":2}},{"type":"monster","pos":"A4","meta":{"name":"Slime","hp":6,"atk":1,"def":0,"descriptions":["Squiggle, squiggle","Slurp, slurp","Oooooooze"]}}],"scenes":{"A1":"The door opens with a creak, but something feels off in this small room."},"nextLevelId":"level4"}, 		"level4":{"id":"level4","rows":6,"cols":6,"items":[{"type":"wall","pos":"A2"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"C2"},{"type":"wall","pos":"D2"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"F4"},{"type":"wall","pos":"E4"},{"type":"wall","pos":"D4"},{"type":"wall","pos":"B4"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"F6"},{"type":"door","pos":"F5"},{"type":"void","pos":"D6"},{"type":"key","pos":"C6"},{"type":"potion","pos":"B3"},{"type":"potion","pos":"F1"},{"type":"treasure","pos":"E3","meta":{"kind":"gold","value":25}},{"type":"monster","pos":"C3","meta":{"name":"Davey","hp":3,"atk":3,"def":1,"descriptions":["Whoa! Watch where you're going!","Ouch, dude! What's your deal?!","I'm leaving"]}},{"type":"monster","pos":"E1","meta":{"name":"Goblin","hp":6,"atk":2,"def":0,"descriptions":["The goblin sneers and draws his blade.","The goblin growls and leaps toward you.","The goblin winces."]}}],"scenes":{"A1":"You can't help but feel that more danger lies ahead. Be brave, adventurer!","B5":"You hope the exit is near, but it's hard to tell in the dim dungeon light."},"nextLevelId":"town1"}, 		"town1":{"id":"town1","rows":3,"cols":10,"items":[{"type":"custom_wall","pos":"B2","meta":{"name":"bush"}},{"type":"exit","pos":"J3"},{"type":"custom_wall","pos":"D2","meta":{"name":"bush"}},{"type":"custom_wall","pos":"H2","meta":{"name":"bush"}},{"type":"custom_wall","pos":"J2","meta":{"name":"bush"}},{"type":"custom_wall","pos":"C2","meta":{"name":"flowers"}},{"type":"custom_wall","pos":"I2","meta":{"name":"flowers"}},{"type":"custom_wall","pos":"F1","meta":{"name":"flowers"}},{"type":"armor_shop","pos":"G1"},{"type":"weapon_shop","pos":"E1"},{"type":"inn","pos":"F3"},{"type":"villager","pos":"J1","meta":{"text":"Take this to help you in the dungeon.","kind":"power","value":1}},{"type":"villager","pos":"G3","meta":{"text":"Your work in the dungeon is dangerous but important. Take this as a thank you for your work.","kind":"gold","value":10}}],"scenes":{"A1":"You step out of the dungeon into a quiet town.","C1":"It's a lovely day, and you're glad to get a break from the dark dungeon."},"nextLevelId":"level5"}, 		"level5":{"id":"level5","rows":6,"cols":6,"items":[{"type":"wall","pos":"C1"},{"type":"wall","pos":"C2"},{"type":"wall","pos":"A2"},{"type":"wall","pos":"A3"},{"type":"wall","pos":"B4"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"D4"},{"type":"wall","pos":"E3"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"F5"},{"type":"door","pos":"A4"},{"type":"key","pos":"A6"},{"type":"treasure","pos":"D6","meta":{"kind":"gold","value":25}},{"type":"potion","pos":"F6"},{"type":"monster","pos":"B3","meta":{"name":"Blob","hp":7,"atk":1,"def":0,"descriptions":["Squelch","The blob shifts moistily","Look out now!"]}},{"type":"monster","pos":"E1","meta":{"name":"Wolf","hp":9,"atk":3,"def":0,"descriptions":["The wold bares its teeth.","The wolf lunges forward.","The wolf issues a low growl."]}},{"type":"monster","pos":"C5","meta":{"name":"Cave bat","hp":7,"atk":3,"def":1,"descriptions":["The bat screeches","The bat dives toward you","Flap flap flap"]}}],"scenes":{"A1":"You worry about how long this may go on.","E4":"Your bones ache. If only you could find a potion."},"nextLevelId":"level6"}, 		"level6":{"id":"level6","rows":6,"cols":6,"items":[{"type":"wall","pos":"B1"},{"type":"wall","pos":"C2"},{"type":"wall","pos":"D4"},{"type":"wall","pos":"E3"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"A3"},{"type":"wall","pos":"F5"},{"type":"wall","pos":"F6"},{"type":"wall","pos":"E6"},{"type":"void","pos":"C1"},{"type":"door","pos":"F1"},{"type":"potion","pos":"D2"},{"type":"potion","pos":"A5"},{"type":"key","pos":"A6"},{"type":"wall","pos":"B5"},{"type":"treasure","pos":"C5","meta":{"kind":"gold","value":25}},{"type":"treasure","pos":"F3","meta":{"kind":"gold","value":25}},{"type":"monster","pos":"A4","meta":{"name":"Steve","hp":8,"atk":4,"def":0,"descriptions":["Hey! What's up?","What are you doing?!","Oh, man!"]}},{"type":"monster","pos":"D3","meta":{"name":"Mummy","hp":8,"atk":4,"def":1,"descriptions":["Mmmmuuuuuuummmmmmmyyyyyy","Grrrrrrr rrr rrrrrrr","Muuuuu uuuuuuuu uuuuuuummmmy"]}},{"type":"monster","pos":"F4","meta":{"name":"Zombie","hp":8,"atk":4,"def":2,"descriptions":["Zombieeeeeee","The zombie shuffles toward you","The zombie opens its mouth, but you don't want to look inside."]}}],"scenes":{"A1":"You steel yourself for what may come."},"nextLevelId":"town2"}, 		"town2":{"id":"town2","rows":7,"cols":5,"items":[{"type":"custom_wall","pos":"B2","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"B5","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"D5","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"D2","meta":{"name":"Flowers"}},{"type":"exit","pos":"E1"},{"type":"custom_wall","pos":"B7","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"D7","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"A7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"C7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"E7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B4","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"D3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"D4","meta":{"name":"Bushes"}},{"type":"inn","pos":"C5"},{"type":"weapon_shop","pos":"A6"},{"type":"armor_shop","pos":"E6"},{"type":"villager","pos":"E4","meta":{"text":"Be careful in the dungeons! Take this to help you prepare.","kind":"gold","value":20}}],"scenes":{"A1":"A quiet town offers a welcome respite.","C3":"What a lovely garden."},"nextLevelId":"level7"}, 		"level7":{"id":"level7","rows":6,"cols":6,"items":[{"type":"wall","pos":"D1"},{"type":"treasure","pos":"E1","meta":{"kind":"gold","value":25}},{"type":"door","pos":"F3"},{"type":"wall","pos":"B3"},{"type":"wall","pos":"B4"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"E3"},{"type":"wall","pos":"E4"},{"type":"wall","pos":"C6"},{"type":"key","pos":"A6"},{"type":"potion","pos":"B5"},{"type":"void","pos":"E6"},{"type":"monster","pos":"A5","meta":{"name":"Skeleton","hp":11,"atk":7,"def":2,"descriptions":["The skeleton's bones rattle as it raises a bone blade.","The bones are their money. So are the worms.","The pull your hair up, but not out, to get another chance at life."]}},{"type":"monster","pos":"F2","meta":{"name":"Skeleton","hp":11,"atk":7,"def":2,"descriptions":["The skeleton's bones rattle as it raises a bone blade.","The bones are their money. So are the worms.","The pull your hair up, but not out, to get another chance at life."]}},{"type":"monster","pos":"C3","meta":{"name":"Ogre","hp":12,"atk":8,"def":2,"descriptions":["A giant ogre appears from the shadows.","The ogre towers over you as it raises a massive club.","The ogre grumbles and charges forward."]}}],"scenes":{"A1":"You confidence soars, and you hope it is not misplaced."},"nextLevelId":"level8"}, 		"level8":{"id":"level8","rows":7,"cols":7,"items":[{"type":"wall","pos":"C2"},{"type":"wall","pos":"B3"},{"type":"wall","pos":"B5"},{"type":"wall","pos":"C6"},{"type":"wall","pos":"E6"},{"type":"wall","pos":"F5"},{"type":"wall","pos":"F3"},{"type":"wall","pos":"E2"},{"type":"treasure","pos":"D2","meta":{"kind":"gold","value":25}},{"type":"door","pos":"D4"},{"type":"treasure","pos":"D6","meta":{"kind":"gold","value":25}},{"type":"treasure","pos":"B4","meta":{"kind":"power","value":2}},{"type":"treasure","pos":"F4","meta":{"kind":"power","value":2}},{"type":"potion","pos":"G4"},{"type":"potion","pos":"D7"},{"type":"void","pos":"A5"},{"type":"key","pos":"F2"},{"type":"monster","pos":"C4","meta":{"name":"Ghoul","hp":12,"atk":8,"def":2,"descriptions":["Oooooo ooooo oooooooo ooooo ooooooooo.","The ghoul swoops spookily.","The ghoul disappears then reappears behind you."]}},{"type":"monster","pos":"E4","meta":{"name":"Ghoul","hp":12,"atk":8,"def":2,"descriptions":["Oooooo ooooo oooooooo ooooo ooooooooo.","The ghoul swoops spookily.","The ghoul disappears then reappears behind you."]}},{"type":"monster","pos":"D3","meta":{"name":"Werewolf","hp":12,"atk":7,"def":2,"descriptions":["You see a large wolf standing upright in tattered clothes.","The wolf dribbles its basketball toward you.","This wolf seemed nicer in the movies."]}},{"type":"monster","pos":"D5","meta":{"name":"Werewolf","hp":12,"atk":7,"def":2,"descriptions":["You see a large wolf standing upright in tattered clothes.","The wolf dribbles its basketball toward you.","This wolf seemed nicer in the movies."]}}],"scenes":{"A1":"You can sense the end is near, if you can just make it a bit further."},"nextLevelId":"town3"}, 		"town3":{"id":"town3","rows":9,"cols":7,"items":[{"type":"custom_wall","pos":"B2","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F2","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F8","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B8","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"C2","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"B4","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"E2","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"F4","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"F6","meta":{"name":"Flowers"}},{"type":"exit","pos":"A9"},{"type":"custom_wall","pos":"E8","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"C8","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"B6","meta":{"name":"Flowers"}},{"type":"armor_shop","pos":"C5"},{"type":"inn","pos":"D4"},{"type":"weapon_shop","pos":"E5"},{"type":"custom_wall","pos":"D5","meta":{"name":"Fountain"}},{"type":"villager","pos":"D7","meta":{"text":"Be strong, adventurer! Take this.","kind":"gold","value":15}},{"type":"villager","pos":"G9","meta":{"text":"Your curiosity can lead to danger in the dungeon. Stay safe, warrior!","kind":"defense","value":2}}],"scenes":{"A1":"Finally a new town. I can rest here a bit.","A5":"The beauty of the quiet town helps calm your nerves, but makes you dread the dungeon even more. ","G1":"Few people are around, but you see a villager in the distance."},"nextLevelId":"level9"}, 		"level9":{"id":"level9","rows":8,"cols":8,"items":[{"type":"wall","pos":"A2"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"C3"},{"type":"wall","pos":"D2"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"F2"},{"type":"wall","pos":"G2"},{"type":"wall","pos":"H4"},{"type":"wall","pos":"F4"},{"type":"wall","pos":"G5"},{"type":"wall","pos":"E4"},{"type":"wall","pos":"D5"},{"type":"wall","pos":"C5"},{"type":"wall","pos":"B5"},{"type":"wall","pos":"A7"},{"type":"wall","pos":"B7"},{"type":"wall","pos":"C7"},{"type":"wall","pos":"D7"},{"type":"wall","pos":"E7"},{"type":"wall","pos":"F7"},{"type":"wall","pos":"G7"},{"type":"potion","pos":"H8"},{"type":"potion","pos":"A3"},{"type":"treasure","pos":"C2","meta":{"kind":"defense","value":1}},{"type":"treasure","pos":"E5","meta":{"kind":"power","value":1}},{"type":"key","pos":"G4"},{"type":"void","pos":"H5"},{"type":"door","pos":"A8"},{"type":"monster","pos":"E1","meta":{"name":"Giant spider","hp":25,"atk":13,"def":6,"descriptions":["Numerous soft foot steps creep toward you.","The spiders fangs are much longer than you thought they might be.","The spider shoots a web toward you."]}},{"type":"monster","pos":"F5","meta":{"name":"Giant spider","hp":25,"atk":13,"def":6,"descriptions":["Numerous soft foot steps creep toward you.","The spiders fangs are much longer than you thought they might be.","The spider shoots a web toward you."]}},{"type":"monster","pos":"C4","meta":{"name":"Ghoul","hp":12,"atk":13,"def":2,"descriptions":["Oooooo ooooo oooooooo ooooo ooooooooo.","The ghoul swoops spookily.","The ghoul disappears then reappears behind you."]}},{"type":"monster","pos":"E8","meta":{"name":"Sorceress","hp":30,"atk":14,"def":6,"descriptions":["A bright ball of energy hovers in front of the sorceress.","The sorcerer shoots the ball toward you.","The sorceress floats above the ground with an eerie glow."]}}],"scenes":{"A1":"Your armor is damaged and your body is bruised, but you just need to keep moving."},"nextLevelId":"level10"}, 		"level10":{"id":"level10","rows":10,"cols":10,"items":[{"type":"wall","pos":"C2"},{"type":"wall","pos":"C3"},{"type":"wall","pos":"B3"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"D3"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"G1"},{"type":"potion","pos":"J2"},{"type":"potion","pos":"E3"},{"type":"wall","pos":"I2"},{"type":"wall","pos":"J3"},{"type":"wall","pos":"G3"},{"type":"wall","pos":"F4"},{"type":"wall","pos":"G4"},{"type":"wall","pos":"G5"},{"type":"wall","pos":"H4"},{"type":"wall","pos":"J5"},{"type":"wall","pos":"A6"},{"type":"wall","pos":"D6"},{"type":"wall","pos":"D7"},{"type":"wall","pos":"C7"},{"type":"wall","pos":"D8"},{"type":"wall","pos":"E7"},{"type":"wall","pos":"G8"},{"type":"wall","pos":"H7"},{"type":"wall","pos":"H8"},{"type":"wall","pos":"I8"},{"type":"wall","pos":"H9"},{"type":"wall","pos":"E10"},{"type":"wall","pos":"F10"},{"type":"wall","pos":"B9"},{"type":"void","pos":"C9"},{"type":"treasure","pos":"D10","meta":{"kind":"defense","value":2}},{"type":"potion","pos":"A8"},{"type":"potion","pos":"F7"},{"type":"potion","pos":"I4"},{"type":"key","pos":"J4"},{"type":"treasure","pos":"D2","meta":{"kind":"power","value":2}},{"type":"door","pos":"I9"},{"type":"monster","pos":"A4","meta":{"name":"Sorceress","hp":30,"atk":14,"def":6,"descriptions":["A bright ball of energy hovers in front of the sorceress.","The sorcerer shoots the ball toward you.","The sorceress floats above the ground with an eerie glow."]}},{"type":"monster","pos":"A10","meta":{"name":"Sorceress","hp":30,"atk":14,"def":6,"descriptions":["A bright ball of energy hovers in front of the sorceress.","The sorcerer shoots the ball toward you.","The sorceress floats above the ground with an eerie glow."]}},{"type":"monster","pos":"D5","meta":{"name":"Vampire Lord","hp":30,"atk":16,"def":7,"descriptions":["I vaunt to suck your blood!","1! 2! 3! strikes from the Vampire Lord.","The Vampire Lord hovers ominously."]}},{"type":"monster","pos":"F8","meta":{"name":"Vampire Lord","hp":30,"atk":16,"def":7,"descriptions":["I vaunt to suck your blood!","1! 2! 3! strikes from the Vampire Lord.","The Vampire Lord hovers ominously."]}},{"type":"monster","pos":"J8","meta":{"name":"Vampire Lord","hp":30,"atk":16,"def":7,"descriptions":["I vaunt to suck your blood!","1! 2! 3! strikes from the Vampire Lord.","The Vampire Lord hovers ominously."]}}],"scenes":{"A1":"You finally made it to the end. If you could just reach the exit.","F5":"This labyrinth can be infuriating, but you\u2019ve come too far to give up now."},"nextLevelId":null}}

var myKeys = Object.keys(LEVELS);
var levelList = document.getElementById("levelSelect");
var nextLevelList = document.getElementById("nextLevelSelect");
var stairList = document.getElementById("stairLevelSelect");
var keyList = document.getElementById("keyLevelSelect");
var currentId = "";
var myGames = {}

// Custom wall display name (editable in UI)
var customWallName = '';
var gameSelect = document.getElementById("gameSelect");
var root = document.querySelector(':root')
var statLife = document.getElementById("statLife");
var statStrength = document.getElementById("statStrength");
var statDefense = document.getElementById("statDefense");
var statGold = document.getElementById("statGold");
var baseOpacity = document.getElementById("baseOpacity");
var levelOpacity = document.getElementById("levelOpacity");
var symbols = { empty: '', wall: 'W', monster: 'M', treasure: 'T', key: 'K', door: 'D', potion: 'P', hazard: 'H', shop: 'S', armor_shop: 'A', inn: 'N', villager: 'L', stairs: 'U' };

// SVG icons for each item type
var customIcons = {}
var itemIcons = { wall: '<svg viewBox="0 0 88.19 88.19" style="width: 100%; height: 100%; display: block;"><rect x="1" y="1" width="86.19" height="86.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1" y1="65.64" x2="87.19" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1" y1="44.09" x2="87.19" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="1" y1="22.55" x2="87.19" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="33.93" y1="1" x2="33.93" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="64.74" y1="1" x2="64.74" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="12.59" y1="22.55" x2="12.59" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="44.69" y1="22.55" x2="44.69" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="79.26" y1="22.55" x2="79.26" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="19.41" y1="44.09" x2="19.41" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="53.48" y1="44.09" x2="53.48" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="71.85" y1="65.64" x2="71.85" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><line x1="30.07" y1="65.64" x2="30.07" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M21.73,23.25c.57,2.12,3.27,3.14,3.81,5.27.37,1.46-.38,3.19.48,4.43.32.46.81.76,1.25,1.11,1.38,1.07,2.38,2.64,2.75,4.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M70.94,51.36c.69-2.36,2.19-4.47,4.18-5.9.55.04.73.08,1.27.13.44.04.88.07,1.31-.03s.84-.36,1.01-.76" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M47.63,87.2c-.55-2.12-1.3-4.18-2.24-6.16" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M73.03,1.7c.92,2.16,2.6,4.86,3.51,7.02" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M12.4,1.37c.52,2.3-.47,5.69-2.26,7.23" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/><path d="M10.89,5.91l3.37,2.03c.17.69.68,1.3,1.33,1.59" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/></svg>', monster: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' + '<g stroke="currentColor" stroke-miterlimit="10" stroke-width="4" fill="none">' + '<path d="M77.9,37.4c0,11.5-5.7,21.7-14.5,27.8v18.2H24.8v-18.2c-8.8-6.1-14.5-16.3-14.5-27.8C10.3,18.7,25.4,3.6,44.1,3.6s33.8,15.1,33.8,33.8Z"/>' + '<polyline points="63.4 72.9 63.4 83.4 24.8 83.4 24.8 72.9"/>' + '<line x1="53.8" y1="72.9" x2="53.8" y2="83.4"/>' + '<line x1="44.1" y1="72.9" x2="44.1" y2="83.4"/>' + '<line x1="34.4" y1="72.9" x2="34.4" y2="83.4"/>' + '</g>' + '<g fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="4">' + '<path d="M25.9,31.9c0-2.4,2.1-5.3,4.3-4.3s3.1,2.2,4.3,4.3-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3Z"/>' + '<path d="M62.3,31.9c0-2.4-2.1-5.3-4.3-4.3s-3.1,2.2-4.3,4.3,1.9,4.3,4.3,4.3,4.3-1.9,4.3-4.3Z"/>' + '<path d="M42.7,43.5l-1.5,2.6c-.6,1.1.2,2.5,1.4,2.5h3c1.3,0,2-1.4,1.4-2.5l-1.5-2.6c-.6-1.1-2.2-1.1-2.8,0Z"/>' + '</g>' + '</svg>', treasure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' + '<path d="M52,34.7c-.5.9-1.3,1.3-2.3,2.1l4.1,11.4h-19.6,0c0,0,4.1-11.4,4.1-11.4-.7-.6-1.3-1.3-1.8-2.1H3.5v46.1h81.2v-46.1h-32.7Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '<path d="M44,21.3c4.9,0,8.8,3.9,8.8,8.8s0,1.6-.1,2.2h31.9v-9.9c0-8.3-6.7-15-15-15H18.5c-8.3,0-15,6.7-15,15v9.9h32c-.2-.7-.3-1.4-.3-2.2,0-4.9,3.9-8.8,8.8-8.8Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', door: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' + '<g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10">' + '<rect x="15.8" y="3.2" width="56.7" height="81.8"/>' + '<circle cx="62.1" cy="46.9" r="4.6"/>' + '</g>' + '</svg>', exit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"><rect x="15.8" y="3.2" width="56.7" height="81.8"/><path d="M30 44 L58 44" stroke-width="6" stroke-linecap="round"/></g></svg>', key: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' + '<path d="M31,15.9c-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6,6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7Z" fill="none"/>' + '<path d="M85,69.1L34,26.9c2-3.2,3.3-6.5,3.9-9.7,1-5.4-.1-9.8-3.3-12.4-1.9-1.5-4.1-2.3-6.7-2.3-5.8,0-12.8,3.9-18.6,10.9C1.1,23.4-.5,34.8,5.6,39.9c1.9,1.5,4.1,2.3,6.7,2.3,4.6,0,10-2.5,14.9-7l38.6,31.9-6.1,7.4c-.5.6-.4,1.4.2,1.9l1.7,1.4c.6.5,1.4.4,1.9-.2l6.1-7.4,6.6,5.5-6.1,7.4c-.4.5-.4,1.3.2,1.8l1.3,1.1c.5.4,1.3.4,1.8-.2l11.9-14.4c.6-.7.5-1.7-.2-2.2ZM14.7,17.9c6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', potion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' + '<path d="M68.2,65c0,10.8-10.8,19.5-24.1,19.5s-24.1-8.7-24.1-19.5c0-8.7,7-16.1,16.7-18.6V5.7h14.8v40.8c9.7,2.5,16.7,9.9,16.7,18.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '<path d="M44.1,5.7c-5.1,0-9.2-.5-9.2-1s4.1-1,9.2-1,9.2.5,9.2,1-4.1,1-9.2,1Z"' + ' fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', weapon:"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M49.8,21.7c-13.7,15.8-27.5,31.6-41.2,47.4-.4.5-.8,1.1-1,1.7-.4,1.4,0,2.4,1.4,3.2.9.5,2.2.3,3.1-.6.2-.2.4-.4.6-.6,13.8-15.8,27.5-31.7,41.3-47.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M76.9,36.4c-3.5,5.4-8,9.5-13.7,12.4-5,2.6-10.4,3.6-16.1,1.8.6-.6,1.2-1.2,1.8-1.7,2.8-2.4,5.3-5,7.3-8.1,1.7-2.7,3.2-5.5,3.1-8.8v-.7c-.4-2.4-1.7-4.3-3.6-5.7l5-6c.4-.2.8-.2,1.5,0,3.9,1.2,7.8,1.3,11.2-1.5,1.4-1.2,2.5-2.8,3.7-4.2,0,0,0,0,0,0,0,0,0,0,.2,0,1.1,1.8,2,3.8,2.5,5.8,1.4,6,.4,11.5-2.9,16.7h0Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M55.7,25.5c1.9,1.4,3.2,3.3,3.6,5.7v.7c.2,3.4-1.3,6.2-3,8.8-2,3.1-4.5,5.7-7.3,8.1-.6.5-1.1,1.1-1.8,1.7,5.7,1.8,11.1.8,16.1-1.8,5.6-2.9,10.2-7.1,13.7-12.4,3.3-5.2,4.3-10.7,2.9-16.7-.5-2.1-1.3-4-2.5-5.8,0,0-.1,0-.2,0s0,0,0,0c-1.2,1.4-2.3,3-3.7,4.2-3.4,2.8-7.3,2.8-11.2,1.5-.7-.2-1.1-.2-1.5,0-.3.1-.5.3-.8.6-1.6,1.9-3.3,3.8-5,5.7l-5.8-5,6.3-7.3c1.7,1.5,3.3,2.9,4.9,4.3.4.3.8.6.5,1.3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <circle id=\"Filll\" cx=\"55.4\" cy=\"19.7\" r=\"3.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></circle>\n <path id=\"Filll-2\" data-name=\"Filll\" d=\"M55.4,13.7c3.3,0,6,2.7,6,6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", armor: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Fills\" style='opacity: 0.5;' stroke='none' fill='currentColor'>\n <path d=\"M20,29.2c0,3.2,0,6.4.6,9.5.2,1.1.4,2.2.6,3.3h22.9V15.2h0c-.4,0-.8,0-1.2,0-3.2.9-6.3,1.7-9.5,2.6-3.8,1.1-7.5,2.2-11.3,3.3-.8.2-1.2.7-1.4,1.5-.4,2.1-.7,4.3-.7,6.5h0Z\"></path>\n <path d=\"M44.1,71.5h0c.3.1.5,0,.8,0,1-.5,2.1-.9,3-1.5,4.2-2.5,7.7-5.8,10.7-9.6,3.6-4.6,6.2-9.8,7.7-15.5.3-.9.5-1.9.7-2.8h-22.9v29.5h0Z\"></path>\n </g>\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M44.1,15.2c.8-.3,1.6.1,2.4.3,4.3,1.2,8.6,2.5,12.9,3.8,2.2.6,4.5,1.2,6.7,1.8.8.2,1.3.9,1.4,1.6.2,1.5.4,3.1.5,4.7.1,2.1.2,4.2.1,6.3,0,1.5-.3,3-.5,4.5-.1,1.2-.4,2.5-.6,3.7-.2.9-.4,1.9-.7,2.8-1.5,5.7-4.1,10.8-7.7,15.5-3,3.8-6.5,7.1-10.7,9.6-1,.6-2,1-3,1.5-.3.1-.5.2-.8.2s-.7-.1-1.1-.3c-3.3-1.5-6.1-3.5-8.7-5.9-3.4-3.1-6.2-6.7-8.4-10.6-1.9-3.4-3.3-6.9-4.2-10.7-.2-.7-.3-1.4-.4-2.1-.2-1.1-.4-2.2-.6-3.3-.6-3.2-.6-6.3-.6-9.5,0-2.2.3-4.4.7-6.5.2-.8.6-1.3,1.4-1.5,3.8-1.1,7.5-2.2,11.3-3.3,3.1-.9,6.3-1.8,9.5-2.6.4-.1.8,0,1.2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M44.1,15.3v56.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M45,7.6c1.4.4,2.7.8,4.1,1.2,2.4.7,4.9,1.4,7.3,2.1,2.8.8,5.6,1.6,8.4,2.4,2.2.6,4.4,1.3,6.6,1.9.8.2,1.6.3,2.2,1,.6.7.6,1.6.7,2.4.3,1.8.6,3.7.6,5.6.1,1.9,0,3.9,0,5.8s0,.6,0,.9c-.1,1.6-.2,3.2-.4,4.7-.2,1.6-.3,3.3-.7,4.9-.5,2.3-1.1,4.6-1.7,6.9-.7,2.8-1.7,5.4-3,8-1.4,2.8-3,5.6-4.8,8.2-2.6,3.6-5.5,6.9-8.8,9.8-2.9,2.6-6.1,4.7-9.6,6.4-.2.1-.4.2-.7.3-.9.5-1.8.4-2.8,0-3.6-1.7-6.8-3.8-9.8-6.4-2.6-2.2-4.9-4.5-7-7.2-2.4-3-4.5-6.3-6.3-9.7-1.9-3.8-3.4-7.7-4.4-11.8-.4-1.7-.8-3.4-1.2-5.1-.3-1.3-.4-2.6-.5-3.9-.4-3.1-.6-6.3-.5-9.5,0-1.5,0-3,.3-4.5.2-1.7.5-3.4.8-5.1.2-1,.9-1.5,1.8-1.8,1.7-.5,3.5-1,5.2-1.5,2.7-.8,5.5-1.6,8.2-2.4,3.2-.9,6.3-1.8,9.5-2.7,1.4-.4,2.9-.9,4.3-1.2.6-.1,1.4,0,2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <polyline points=\"66.9 42 44.1 42 21.2 42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></polyline>\n </g>\n </g>\n </g>\n </g>\n</svg>", inn: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 62.55 56.26\">\n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" d=\"M55.07,34.69c-6.57,8.54-15.36,15.02-23.79,21.57-8.44-6.55-17.23-13.03-23.8-21.57C1.5,26.92-3.44,15.54,3.11,6.55,10.06-2.99,24.82-1.93,30.27,8.54c.36.7.59,1.57.94,2.24l.07.14.07-.14c.34-.67.57-1.54.94-2.24,5.45-10.47,20.21-11.53,27.15-1.99,6.56,8.99,1.62,20.37-4.37,28.14Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n</svg>", villager: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 88 88\">\n \n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" id=\"path966\" d=\"M69.79,80.5c-2.54-25.58-6.66-33.2-13.41-37.4-6.8-.3-15.35,0-23.63,0-7.33,3.9-11.78,11.65-14.55,37.4h51.59Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path id=\"path710\" d=\"M59.43,22.93c0,8.52-6.91,15.43-15.43,15.43s-15.43-6.91-15.43-15.43,6.91-15.43,15.43-15.43,15.43,6.91,15.43,15.43Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <line x1=\"60.48\" y1=\"80.5\" x2=\"56.9\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n <line x1=\"27.61\" y1=\"80.5\" x2=\"31.34\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n</svg>", void: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88.2 88.2\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M86.4,54.4c.9-2.3.6-4.8.3-7.3-1-7.2-2-14.4-3-21.5-.3-2.5-.7-5-2.3-7-2.6-3.2-7.9-3.8-9.7-7.6-.8-1.7-.8-3.7-1.7-5.3-.9-1.5-2.4-2.4-4-3.2-2-1-4.2-1.9-6.4-1.8-3.1.2-5.9,2.3-9,2.6-3,.3-5.8-1.1-8.6-2s-6.3-1.3-8.5.7c-.9.8-1.5,2-2.5,2.9-2.2,2-5.5,1.9-8.4,1.9-4.7,0-9.9.7-13.3,4-3.1,3-4,7.5-4.2,11.8s.4,8.6-.3,12.8c-.6,3.5-1.9,6.8-2.8,10.3s-1.2,7.2.2,10.5c1.6,3.5,5,5.9,6.7,9.3,1.8,3.6,1.5,7.9,3,11.5,2.2,5,8.1,8,13.4,6.9,2.8-.6,5.7-2.2,8.4-1.2,1.9.7,3.1,2.6,4.8,3.7,3.2,2.1,7.5.9,11-.7s7-3.8,10.8-3.5c2.1.2,4.1,1.1,6.3,1.1,2.6,0,5.2-1.3,6.6-3.5,1.5-2.4,1.9-5.2,3.5-7.6s2.9-3.3,3.6-5.6.7-3.6,1.5-5.3c1.2-2.5,3.5-4.3,4.6-6.9Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M12.1,52.5c-.8-2.5,1-5.1,1.2-7.6.6-3.8-.7-7.9-2.4-11.1-.5-1-1-2.1-1-3.1.3-3.2,4.5-3.7,6.7-5.2,2.9-1.5,5.8-4,7.9-6.7,1.6-1.8,2.7-4.3,5.1-5,2.9-.7,5.8-.2,8.7-.2,6,.4,12.6-1.3,18.2-2.7,2-.4,5.1-1.1,6.7,0,2,2.1,2.5,5.9,3.4,8.6.8,3.3,3.8,7.7,7,10.5,1.4,1.4,1.8,3,1.6,4.9-.2,3,.1,6.8,1.5,9.9.7,2.4,3.1,4.4,3.2,7-.6,2.5-4.1,3.9-5.5,6.1-1.7,2.2-2.7,4.5-3.3,6.6-.5,1.5-1.2,3.1-2.5,4.1-3.9,2.1-8.6,3.5-14.4,5.9-3.4,1.2-5.3,2.7-8.6,2.9-2.9-.2-6.6-2.2-10-2.3-4.4,0-8.3-1.8-12.8-2.8-2.2-.6-2.4-2.8-2.7-4.7-.6-3.2-2.1-6.5-3.8-9-1.3-2.1-3.3-3.7-4.2-6v-.2Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M28.9,60.3c-.6-.7-1-1.6-1.4-2.5-1.2-2.8-2.8-5.3-4.9-7.6-1.2-1.3-2.9-2.6-2.2-4.6,1.1-3,2.3-6,2.8-9.2.4-4.7,1.7-5.3,5.4-7.3,4.7-2.8,8.8-6.5,12.1-9.9.9-.9,2-1.3,3.2-.6,3.4,2.6,7.5,4.8,11.4,5.9,1.5.4,2.8,1.2,3.7,2.5,1.8,2.5,4.2,5.3,6.7,7.2,1.6,1.1,2.1,2.9,1.9,4.8-.1,2.3,0,4.7.3,6.6.3,1.5.3,3.1-.6,4.5-2,2.8-4.1,5.5-6.2,8.5-1.5,2.1-2.8,4.4-5.5,5-4,.9-7.4,3.4-11.3,4.4-1.6.4-3.1-.2-4.2-1.2-2.7-2.1-5.9-3.9-9.1-5.2-.7-.3-1.4-.7-1.9-1.2h-.1Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", stairs: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline class="cls-1" fill="none" stroke="currentColor" stroke-width="4" points="88.1 24 68 24 68 40 52 40 52 56 36 56 36 72 18 72 18 88.1"/> </svg>', stairsD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline class="cls-1" fill="none" stroke="currentColor" stroke-width="4" points=".2 24 20.3 24 20.3 40 36.3 40 36.3 56 52.3 56 52.3 72 70.3 72 70.3 88.1"/> </svg>' };
itemIcons.custom_wall = itemIcons.wall;
itemIcons.gameEnd = itemIcons.door;


const audioContext = new (window.AudioContext || window.webkitAudioContext)();





const dataPath = "./data/game";


initForms();
var soundEnd = 0;

function playSound(name){
	var mySound;
	if(name === "xYzzY"){mySound = activeSound}
	else if (!soundBank[name]){return;}
	else{mySound = soundBank[name];}
	console.log(mySound);
	const now = audioContext.currentTime;  
	if(now < soundEnd && currentSound != "step"){return;}
	currentSound = name;
	const oscillator = audioContext.createOscillator();
	const gainNode = audioContext.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audioContext.destination);
	oscillator.type = mySound.type;
	var dur = (mySound.dur);
	soundEnd = now + dur
	oscillator.frequency.setValueAtTime((mySound.frequency ), now);
	gainNode.gain.setValueAtTime(0, now);
	myNodes = mySound.nodes;
	for (let n = 0; n < myNodes.length; n++){
		if(myNodes[n].type == "frequency"){
			oscillator.frequency.linearRampToValueAtTime((myNodes[n].value), now + (dur * myNodes[n].time));
		}
		else { //gain
			gainNode.gain.linearRampToValueAtTime((myNodes[n].value), now + (dur * myNodes[n].time));
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
					gainNodeB.gain.linearRampToValueAtTime((myNodes[n].value), now + (dur * myNodes[n].time));
					
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
				"slay": {"layers": 2, "dur": 0.5, "type": "triangle", "frequency": 200, "nodes": [{"type": "frequency", "value": 40, "time": 1}, {"type": "gain", "value": 0.5, "time": 0.01}, {"type": "gain", "value": 1, "time": 0.5},  {"type": "gain", "value": 0.01, "time":1}], "nodes2": [{"type": "frequency", "value": 50, "time": 0}, {"type": "frequency", "value": 100, "time": 1}, {"type": "gain", "value": 1 , "time": 0 }, {"type": "gain", "value": 0.01 , "time": 0.083 }, {"type": "gain", "value": 1 , "time": 0.084 }, {"type": "gain", "value": 0.01 , "time": 0.166 }, {"type": "gain", "value": 1 , "time": 0.167 }, {"type": "gain", "value": 0.01 , "time": 0.25 }, {"type": "gain", "value": 1 , "time": 0.251 }, {"type": "gain", "value": 0.01 , "time": 0.333 }, {"type": "gain", "value": 1 , "time": 0.334 }, {"type": "gain", "value": 0.01 , "time": 0.416 }, {"type": "gain", "value": 1 , "time": 0.417 }, {"type": "gain", "value": 0.01 , "time": 0.5 }] },
				"hiss": {"dur": 1, "type": "sawtooth", "frequency": 10, "layers": 1, "nodes": [{"type": "frequency", "value": 10, "time": 1},{"type": "gain", "value": 0.1, "time": 0.01},{"type": "gain", "value": 0.1, "time": 1}]}
};

//store names only
var customSounds = [];

function initSounds(){
	mySounds = Object.keys(soundBank);
	soundSelect = document.getElementById("soundSelect");
	for(sound of mySounds){
		var opt = document.createElement("option")
		opt.value = sound;
		opt.innerHTML = sound;
		soundSelect.appendChild(opt);
	}
}


var soundMaxes = {gain: 1, frequency: 1000, time: 1}
var soundGs = {}
var soundTs = {}
//<g id="freqG" class="frequency active"></g>
//<g id="gainG" class="gain" ></g>
soundTs.gain = document.getElementById("gainT");
soundTs.frequency = document.getElementById("freqT");
soundGs.gain = document.getElementById("gainG");
soundGs.frequency = document.getElementById("freqG");

function nodeTypeSelect(field){
	activeNode = "frequency";
	disableNode = "frequency";
	if(field.value == "frequency"){disableNode = "gain"}
	else{activeNode = "gain"}
	soundGs[disableNode].classList.remove("active");
	soundTs[disableNode].classList.remove("active");
	
	soundGs[activeNode].classList.add("active");
	soundTs[activeNode].classList.add("active");
	
}

activeSound = {};
soundName = document.getElementById("soundName")
soundDur = document.getElementById("soundDur")
soundType = document.getElementById("soundType")
soundLayer = document.getElementById("soundLayer")
soundNodes = [];


function selectSound(){
	
	soundSelect = document.getElementById("soundSelect");
	soundGs.gain = document.getElementById("gainG");
	soundGs.frequency = document.getElementById("freqG");
	soundName.value = soundSelect.value;
	
	playSound(soundSelect.value);
	
	mySound = soundBank[soundSelect.value];	
	
	activeSound = JSON.parse(JSON.stringify(mySound));
	activeSound.name = soundSelect.value;
	soundDur.value = activeSound.dur;
	soundType.value = activeSound.type;
	
	
	while(soundLayer.children.length < activeSound.layers){
		//not enough
		//<option value="1">layer 1</option>
		let myIndex = soundLayer.children.length + 1;
		let newOption = document.createElement("option");
		newOption.setAttribute("value", myIndex)
		newOption.innerHTML = "Layer " + myIndex;
		soundLayer.appendChild(newOption);
	}
	while(soundLayer.children.length > activeSound.layers){
		//Too Many Layers
		let myIndex = soundLayer.children.length - 1;
		soundLayer.children[myIndex].remove();
	}
		
	
	
	
	buildSoundVix(activeSound, 1)
}

function buildSoundVix(tables = true){
	layerIndex = soundLayer.value;
	vizBox = document.getElementById("soundVisualizer")
	if(tables){
		soundTs.frequency.innerHTML = "<thead><tr><th>Time</th><th>Value</th></tr></thead><tbody></tbody>";
		soundTs.gain.innerHTML = "<thead><tr><th>Time</th><th>Value</th></tr></thead><tbody></tbody>";	
	}
	soundGs.gain.innerHTML = "";
	soundGs.frequency.innerHTML = "";
	newCirc = document.createElement("circle");
	
	newCirc.setAttribute("cx",  0);
	newCirc.setAttribute("cy", 60 - (3 + ((activeSound.frequency / soundMaxes.frequency) * 50)));
	newCirc.setAttribute("r", 3);
	
	newCirc.setAttribute("value", activeSound.frequency);
	newCirc.setAttribute("class", "frequency");
	newCirc.setAttribute("type", "frequency");
	newCirc.setAttribute("time", 0);
	newCirc.setAttribute("init", true);
	newCirc.setAttribute("nodeIndex", 0);
	
	let circTitle = ["frequency", activeSound.frequency, "time", 0].join(" ")
	newCirc.setAttribute("title", circTitle);
	
	
	soundGs.frequency.appendChild(newCirc);
	
	if(tables){
		newRow = document.createElement("tr");
		newRow.setAttribute("nodeIndex", 0);
		newTh = document.createElement("th");
		newTd = document.createElement("td");
		
		newTh.innerHTML = 0;
		
		valueInput = document.createElement("input");
		valueInput.setAttribute("class", "spinbox")
		valueInput.setAttribute("type", "number")
		valueInput.setAttribute("min", 0.01)
		valueInput.setAttribute("max", soundMaxes["frequency"])
		valueInput.setAttribute("value", activeSound.frequency )
		valueInput.setAttribute("onChange", "updateNode(this)")
		valueInput.setAttribute("nodeIndex", 0);
		valueInput.setAttribute("nodeVariable", "value");
			
		
		
		newTd.appendChild(valueInput);
		
		newRow.appendChild(newTh);
		newRow.appendChild(newTd);
		soundTs.frequency.children[1].appendChild(newRow);
	}
	
	if(!tables){soundNodes[0].circle = newCirc}
	else{
		soundNodes.push({circle: newCirc, row: newRow})}
	
	if(layerIndex == 1){
		myNodes = activeSound.nodes;}
	else{myNodes = activeSound["nodes" + layerIndex]}
	nodeIndex = 1;
	if(!myNodes){
	
	vizBox.innerHTML = vizBox.innerHTML;
	soundGs.gain = document.getElementById("gainG");
	soundGs.frequency = document.getElementById("freqG");
	return;
		
	}
	for (node of myNodes){
		newCirc = document.createElement("circle");
		//time
		newCirc.setAttribute("cx",  node.time * 100 );
		//frequency
		newCirc.setAttribute("cy", 60 - (3 + ((node.value / soundMaxes[node.type]) * 50)));
		newCirc.setAttribute("r", 3);
		newCirc.setAttribute("value", node.value);
		newCirc.setAttribute("type", node.type);
		newCirc.setAttribute("time", node.time);
		newCirc.setAttribute("nodeIndex", nodeIndex);
		let circTitle = [node.type, node.value, "time", node.time].join(" ")
		newCirc.setAttribute("title", circTitle);
		soundGs[node.type].appendChild(newCirc);
		//also tables
		if(tables){
			newRow = document.createElement("tr");
			newRow.setAttribute("nodeIndex", nodeIndex);
			newTh = document.createElement("th");
	//		<input object="monster" meta="hp" class="spinbox" id="monsterHP" type="number" min="1" value="6"  />
			timeInput = document.createElement("input");
			timeInput.setAttribute("class", "spinbox")
			timeInput.setAttribute("type", "number")
			timeInput.setAttribute("min", 0.01)
			timeInput.setAttribute("step", 0.05)
			timeInput.setAttribute("max", 1)
			timeInput.setAttribute("value", node.time )
			timeInput.setAttribute("onChange", "updateNode(this)")
			timeInput.setAttribute("nodeIndex", nodeIndex);
			timeInput.setAttribute("nodeVariable", "time");
			
			newTd = document.createElement("td");
			valueInput = document.createElement("input");
			valueInput.setAttribute("class", "spinbox")
			valueInput.setAttribute("type", "number")
			valueInput.setAttribute("min", 0.01)
			valueInput.setAttribute("max", soundMaxes[node.type])
			valueInput.setAttribute("value",node.value )
			valueInput.setAttribute("onChange", "updateNode(this)")
			valueInput.setAttribute("nodeIndex", nodeIndex);
			valueInput.setAttribute("nodeVariable", "value");
			
			
			
			newTh.appendChild(timeInput);
			newTd.appendChild(valueInput);
			
			
			
			newRow.appendChild(newTh);
			newRow.appendChild(newTd);
			soundTs[node.type].children[1].appendChild(newRow);
		}
		
			if(!tables){soundNodes[nodeIndex].circle = newCirc}
	else{
		soundNodes.push({circle: newCirc, row: newRow})}

		
		nodeIndex += 1;
	}
	if(tables){ soundSortRows}
	vizBox.innerHTML = vizBox.innerHTML;
	soundGs.gain = document.getElementById("gainG");
	soundGs.frequency = document.getElementById("freqG");
	
}


function soundLayerAdd(){
	let myIndex = soundLayer.children.length + 1;
	let newOption = document.createElement("option");
	newOption.setAttribute("value", myIndex)
	newOption.innerHTML = "Layer " + myIndex;
	soundLayer.appendChild(newOption);
	activeSound[nodes + myIndex] = [];
}

function soundSave(){
	soundName = document.getElementById("soundName").value;
	activeSound.name = soundName;
	if(!customSounds.includes(soundName)){
		customSounds.push(soundName);
	}
	if(!soundBank[soundName]){
		soundSelect = document.getElementById("soundSelect");
		var opt = document.createElement("option")
		opt.value = soundName;
		opt.innerHTML = soundName;
		soundSelect.appendChild(opt);
	}
	soundBank[soundName] = JSON.parse(JSON.stringify(activeSound));
	delete soundbank[soundName].name;
}

function soundSortRows(field = document.activeElement){
	if(soundTs.frequency.classList.contains("active")){
		activeTable = soundTs.frequency.children[1];
	}
	else{
		activeTable = soundTs.gain.children[1];
	}

	rows = activeTable.children;

	for(i = 2; i < rows.length; i++){
	
		ta = rows[i-1].children[0].children[0].value;
		tb = rows[i].children[0].children[0].value;
		if(ta > tb){
			activeTable.appendChild(rows[i-1]);
			i = 0;
		}
	}
	field.focus();
}

function updateNode(field){
	layerIndex = soundLayer.value;
	if (layerIndex == 1){
		myNodes = activeSound.nodes;
	}
	else{
		myNodes = activeSound["nodes" + layerIndex]
	}
	myIndex = field.getAttribute("nodeIndex");
	myVariable = field.getAttribute("nodeVariable");
	if(myVariable == "time"){
		myNodes[myIndex - 1].time = field.value;
		soundSortRows(field);
	}
	else {
		//Value
		if(myIndex == 0){
			activeSound.frequency = field.value;
		}
		else{
			myNodes[myIndex - 1].value = field.value;
		}	
	}
	buildSoundVix(false);
	playSound("xYzzY");
}

function soundDurUpdate(field){
	activeSound.dur = parseFloat(field.value);
	playSound("xYzzY");
	
	
}

function soundNodeAdd(){
	layerIndex = soundLayer.value;
	if (layerIndex == 1){
		myNodes = activeSound.nodes;
	}
	else{
		myNodes = activeSound["nodes" + layerIndex]
	}
	nodeType = document.getElementById("soundPath").value
	let myNode = {"type": nodeType, "value": 1, "time": 1}
	myNodes.push(myNode);
	buildSoundVix()
}

function soundTypeSelect(field){
	activeSound.type = field.value;
	playSound("xYzzY");
}

function getFile(num){

	fetch(dataPath + num + ".json")
	.then(response => {
		if (!response.ok) {
			console.log(`HTTP error! Status: ${response.status}`);
		}
		return response.json();  
	})
	.then(data => {
		myGames["game" + num] = data; 
		addGame(num);
		getFile((parseInt(num) + 1).toString().padStart(2, '0'));
		})  
	.catch(error => {console.log("no more games"); backupDemo(num);}); 
}


function backupDemo(num){
//console.log("backupDemo");
//console.log(LEVELS);
//	(items);

	demoGame = {"title": "New Game", "levels": LEVELS};	
	myGames["game" + num] = demoGame;
	addGame(num)
	selectGame()
	
}

//<select id="gameSelect">
//<option value="gold">Gold</option>


function addGame(num){
//console.log("addGame");
//console.log(LEVELS);
//console.log(items);

	
	let gameId = "game" + num;
	let myOption = document.createElement("option");
	myOption.setAttribute("value", gameId);
	
	myOption.innerHTML = myGames[gameId]["title"];	
	gameSelect.appendChild(myOption)
	
}

getFile("01");

function clearLevelLists(){
	for (list of levelSelectors){
		clearList(list);
	}
	for (list of iconSelectors){
		clearList(list);
	}
	
}

function clearList(myList){
//console.log("clearList");
//console.log(LEVELS);
//console.log(items);

	while(myList.children.length > 0){
		myList.removeChild(myList.children[0]);
	}
}

function selectGame(){
//console.log("selectGame");
//console.log(LEVELS);
//console.log(items);

	if(currentGame != ""){
		//save current changes to loaded game
		
		myGames[currentGame]["levels"] = JSON.parse(JSON.stringify(LEVELS));
		myGames[currentGame]["myIcons"] = JSON.parse(JSON.stringify(customIcons));
		
		customStats = {}
		if(statLife.value != 10){		customStats["life"] = statLife.value}
		if(statStrength.value != 2){	customStats["strength"] = statStrength.value}
		if(statDefense.value != 0){		customStats["defense"] = statDefense.value}
		if(statGold.value != 0){		customStats["gold"] = statGold.value}
		if(Object.keys(customStats).length > 0){myGames[currentGame]["stats"] = customStats}
		if(baseOpacity.value != 100){	myGames[currentGame]["gridOpacity"] = baseOpacity.value;}
		LEVELS = {};
		
		//clear other data from the page!
		clearLevelLists();

		statLife.value = 10
		statStrength.value = 2
		statDefense.value = 0
		statGold.value = 0
		baseOpacity.value = 100;
		resetLibraries()
	}	

	currentGame = gameSelect.value;
	nameField.value = myGames[currentGame]["title"]

	initLevelSet();
	initCustomIcons()
	initCustomSounds()
	initCustomStats();
	renderLibraries();
	initSounds();
}

function resetLibraries(){
	myLibs = Object.keys(libraries)
	for(lib of myLibs){
		libraries[lib].lib = {};
	}
}

function initCustomStats(){
//console.log("initCustomStats");
//console.log(LEVELS);
//console.log(items);

	if(myGames[currentGame]["stats"]){
		if(myGames[currentGame]["stats"]["life"]){statLife.value = myGames[currentGame]["stats"]["life"]}
		if(myGames[currentGame]["stats"]["defense"]){statDefense.value = myGames[currentGame]["stats"]["defense"]}
		if(myGames[currentGame]["stats"]["gold"]){statGold.value = myGames[currentGame]["stats"]["gold"]}
		if(myGames[currentGame]["stats"]["strength"]){statStrength.value = myGames[currentGame]["stats"]["strength"]}
	}
	if(myGames[currentGame]["gridOpacity"]){baseOpacity.value = myGames[currentGame]["gridOpacity"]}
}

function addOptions(selectorList, myLevel){
	//levelSelectors
	for (list of selectorList){
		addOption(list, myLevel, myLevel)
	}
	
}

function initLevelSet(){
//console.log("initLevelSet");
//console.log(LEVELS);
//console.log(items);

	newLevels = myGames[currentGame]["levels"];
	myKeys = Object.keys(newLevels);
	for(i = 0; i < myKeys.length; i++){
		LEVELS[myKeys[i]] = newLevels[myKeys[i]];
		addOptions(levelSelectors, myKeys[i]);
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
				var myMeta = {name: "weapon shop", value: 1, kind: "strength", cost: 18 , currency: "gold", icon: "weapon"}
				item.meta = myMeta;
			}
			else if(item.type == "armor_shop"){
				//Welcome to the armor shop! Press Space to upgrade your defense 1 points for 14 gold.
				item.type = "shop";
				var myMeta = {name: "armor shop", value: 1, kind: "defense", cost: 14 , currency: "gold", icon: "armor"}
				item.meta = myMeta;				
			}
			else if(item.type == "inn"){
				//Welcome to the inn! Press Space to rest and heal 8 points for 10 gold.
				item.type = "shop";
				var myMeta = {name: "inn", value: 8, kind: "life", cost: 10 , currency: "gold", icon: "inn"}
				item.meta = myMeta;
			}
			else if(item.type == "void"){
				//Void
				//hazardLibrary["void"] =  {"name": "Void", "meta": { "name": "Void", "hint": "Mysterious fog", "text": "You  have fallen into a void.", "void": true, "icon": "void" } };
				item.type = "hazard"
				var myMeta = { "name": "Void", "hint": "Mysterious fog", "text": "You  have fallen into a void.", "void": true, "icon": "void" };
				item.meta = myMeta;
			}
		}
		
		//get all monsters
		libKeys = Object.keys(libraries);
		for(u = 0; u < myItems.length; u++){
			if(libKeys.includes(myItems[u].type)){
				//monster, shop, hazar, etc...
				myLibrary = libraries[myItems[u].type].lib;
				itemName = myItems[u].meta.name;
				if(!entryExists(myLibrary, itemName)){
					var newItem = {name: itemName};
					myLibrary[itemName] = newItem;
					myLibrary[itemName].meta = myItems[u].meta;
					myLibrary[itemName].refs = {}
				}
				if(!myLibrary[itemName].refs){
					myLibrary[itemName].refs = {}
				}
				if(!myLibrary[itemName].refs[myKeys[i]])
					{myLibrary[itemName].refs[myKeys[i]] = [myItems[u].pos]}
				else{
					myLibrary[itemName].refs[myKeys[i]].push(myItems[u].pos)}
			}
		}
		
	}
	sortLevelList();
	loadLevel(LEVELS[myKeys[0]])
}

monIconSelect = document.getElementById("monIcon")
wallIconSelect = document.getElementById("wallIcon")
shopIconSelect = document.getElementById("shopIcon")
hazardIconSelect = document.getElementById("hazardIcon")

function initCustomIcons(){
//console.log("initCustomIcons");
//console.log(LEVELS);
//console.log(items);

	if(myGames[currentGame] && myGames[currentGame]["myIcons"]){
		newIcons = myGames[currentGame]["myIcons"];
		iconNames = Object.keys(newIcons);
		for(icon of iconNames){
			itemIcons[icon] = newIcons[icon];
			customIcons[icon] = newIcons[icon];
		}
	}
	myIcons = Object.keys(itemIcons);
	for(icon of myIcons){
		addOptions(iconSelectors, icon)
	}
	updateIcons()
}

function initCustomSounds(){
	customSounds = [];
	if(myGames[currentGame] && myGames[currentGame]["mySounds"]){
		let newSounds = myGames[currentGame]["mySounds"];
		soundNames = Object.keys(newSounds);
		for(sound of soundNames){			
			if(!customSounds.includes(sound)){
				customSounds.push(sound);
			}
			soundBank[soundName] = JSON.parse(JSON.stringify(newSounds[sound]));
		}
	}
}


monIconDisplay = document.getElementById("monIconDisplay");
monAddIcon = document.getElementById("monAddIcon");
wallIconDisplay = document.getElementById("wallIconDisplay");
wallAddIcon = document.getElementById("wallAddIcon");
shopIconDisplay = document.getElementById("shopIconDisplay");
shopAddIcon = document.getElementById("shopAddIcon");

hazardAddIcon = document.getElementById('hazardAddIcon');

hazardIcon = document.getElementById('hazardIcon');
hazardIconDisplay = document.getElementById('hazardIconDisplay');
hazardList = document.getElementById('hazardList');

hazardName = document.getElementById('hazardName'); //void
hazardHint = document.getElementById('hazardHint'); //mysterious fog
hazardText = document.getElementById('hazardText'); //You have fallen into a void

hazardVoid = document.getElementById('hazardVoid'); //checkbox (void behavior
hazardStairs = document.getElementById('hazardStairs'); //checkbox (stairs behavior)
hazardStairsConfig = document.getElementById('hazardStairsConfig'); 
hazardKind = document.getElementById('hazardKind'); //select box
hazardValue = document.getElementById('hazardValue'); //numeric - positive or negative



function hazardStairToggle(){
//console.log("hazardStairToggle");
//console.log(LEVELS);
//console.log(items);

	if(hazardStairs.checked){
		hazardStairConfig.style = "";
	}
	else{
		hazardStairConfig.style = "display: none";
	}
}

function updateIcons(){
	//div="monIconDisplay"
	for (field of iconSelectors){
		document.getElementById(field.getAttribute("div")).innerHTML = itemIcons[field.value];
	}
	if(currentId.length > 0){
		refreshCells();
	}	
}

function updateMonIcon(){
//console.log("updateMonIcon");
//console.log(LEVELS);
//console.log(items);
	myIcon = monIconSelect.value
	monIconDisplay.innerHTML = itemIcons[myIcon];	
	if(currentId.length > 0){
		refreshCells();
	}
}


function updateShopIcon(){
//console.log("updateShopIcon");
//console.log(LEVELS);
//console.log(items);

	myIcon = shopIconSelect.value
	shopIconDisplay.innerHTML = itemIcons[myIcon];	
	if(currentId.length > 0){
		refreshCells();
	}
}

function updateHazardIcon(){
//console.log("updateHazardIcon");
//console.log(LEVELS);
//console.log(items);

	myIcon = hazardIconSelect.value
	hazardIconDisplay.innerHTML = itemIcons[myIcon];	
	if(currentId.length > 0){
		refreshCells();
	}
}

function updateWallIcon(){
//console.log("updateWallIcon");
//console.log(LEVELS);
//console.log(items);

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
//console.log("addMonIcon");
//console.log(LEVELS);
//console.log(items);

	const reader = new FileReader();
	let fileName = monAddIcon.files[0].name.split(".")[0].split("-")[0]
	
	reader.addEventListener("load", () => {
    // this will then display a text file
		newIcon(reader.result, fileName);
	});
	reader.readAsText(monAddIcon.files[0]);
}

function addShopIcon(){
//console.log("addShopIcon");
//console.log(LEVELS);
//console.log(items);

	const reader = new FileReader();
	let fileName = shopAddIcon.files[0].name.split(".")[0].split("-")[0]
	
	reader.addEventListener("load", () => {
    // this will then display a text file
		newIcon(reader.result, fileName);
	});
	reader.readAsText(shopAddIcon.files[0]);
}


function addHazardIcon(){
//console.log("addHazardIcon");
//console.log(LEVELS);
//console.log(items);

	const reader = new FileReader();
	let fileName = hazardAddIcon.files[0].name.split(".")[0].split("-")[0]
	
	reader.addEventListener("load", () => {
    // this will then display a text file
		newIcon(reader.result, fileName);
	});
	reader.readAsText(hazardAddIcon.files[0]);
}



function addWallIcon(){
//console.log("addWallIcon");
//console.log(LEVELS);
//console.log(items);

	
	const reader = new FileReader();
	let fileName = wallAddIcon.files[0].name.split(".")[0].split("-")[0]
	
	reader.addEventListener("load", () => {
    // this will then display a text file
		newIcon(reader.result, fileName);
	});
	reader.readAsText(wallAddIcon.files[0]);
	
}


function newIcon(content, name){
//console.log("newIcon");
//console.log(LEVELS);
//console.log(items);

	monIconDisplay.innerHTML = content;
	shopIconDisplay.innerHTML = content;
	wallIconDisplay.innerHTML = content;
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
	addOptions(iconSelectors, icon);
	updateIcons();
}
	
function vectorStyler(myParts){
//console.log("vectorStyler");
//console.log(LEVELS);
//console.log(items);

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
//console.log("updateID");
//console.log(LEVELS);
//console.log(items);

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
//console.log("updateOption");
//console.log(LEVELS);
//console.log(items);

	for (let l = 0; l < myList.length; l++){
		if(myList[l].getAttribute("value") == oldValue){
			myList[l].setAttribute("value", newValue);
			myList[l].textContent = newText;
			l = myList.length;
		}
	}

}

function sortLevelList(){
//console.log("sortLevelList");
//console.log(LEVELS);
//console.log(items);

	//TODO
	let myLevels = {}
	let levelNames = []
	let levelList = document.getElementById("levelSelect");
	let listItems = document.getElementById("levelSelect").children;
	for (l = 0; l < listItems.length; l++){
		levelName = listItems[l].getAttribute("value")
		myLevels[levelName] = listItems[l];
		if(LEVELS[levelName].nextLevelId != "null" && LEVELS[levelName].nextLevelId != null){
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
	
	while (nextLevel != "null" && nextLevel != null){
		levelList.append(myLevels[nextLevel]);
		nextLevel = LEVELS[nextLevel].nextLevelId;
		
	}
	if(levelList.children[1]){
	while (levelList.children[0].getAttribute("value") != firstLevel){
		levelList.append(levelList.children[0]);
	}
	}
}
	


function updateNext(){
//console.log("updateNext");
//console.log(LEVELS);
//console.log(items);

	newNext = document.getElementById('nextLevelSelect').value
	LEVELS[currentId].nextLevelId = newNext;
}

function entryExists(myLibrary, itemName){

	entries = Object.keys(myLibrary);
	if(entries.includes(itemName)){
			return true;
	}
	return false;
}



function levelNew(){
//console.log("levelNew");
//console.log(LEVELS);
//console.log(items);

	myList = document.getElementById("levelSelect");
	
	myNum = (myList.children.length + 1).toString().padStart(2, '0');
	newId = "level" + myNum
	LEVELS[newId] = {};
	LEVELS[newId].id = newId
	LEVELS[newId].rows = 6
	LEVELS[newId].cols = 6
	LEVELS[newId].items = [];
	LEVELS[newId].scenes = {};
	
	myOtherList = document.getElementById("nextLevelSelect");
	addOptions(levelSelectors, newId)
	myKeys = Object.keys(LEVELS);
	

}

function levelCopy(){
//console.log("levelCopy");
//console.log(LEVELS);
//console.log(items);

	newId = currentId + "copy"
	LEVELS[newId] = structuredClone(LEVELS[currentId])
	LEVELS[newId].id = newId
	addOptions(levelSelectors, newId)
	myKeys = Object.keys(LEVELS);
	
}

function optionMissing(myList, myValue){
//console.log("optionMissing");
//console.log(LEVELS);
//console.log(items);

	for(child of myList.children){
		if (child.value == myValue){
			return false;
		}
		
	}
	return true;
}

function addOption(myList, myValue, myText){
//console.log("addOption");
//console.log(LEVELS);
//console.log(items);

	if(optionMissing(myList,myValue)){
		let myOption = document.createElement("option");
		myOption.textContent = myText;
		myOption.setAttribute("value", myValue);
		myList.appendChild(myOption);
	}
	myList.value = myValue;
}

function levelDelete(){
//console.log("levelDelete");
//console.log(LEVELS);
//console.log(items);

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
//console.log("deleteOption");
//console.log(LEVELS);
//console.log(items);

	for (let l = 0; l < myList.length; l++){
		if(myList[l].getAttribute("value") == myValue){
			myList[l].remove();
			l = myLevels.length;
	}}
}

function updateCellList(levelField){
//console.log("updateStairCellList");
//console.log(LEVELS);
//console.log(items);
	cellSelect = document.getElementById(levelField.getAttribute("cellSelect"));
	//clear the cell list First
	cellSelect.innerHTML = "";
	targetLevel = levelField.value
	if (targetLevel == "null") {levelField.value = currentId; targetLevel = currentId;}
	myRows = LEVELS[targetLevel].rows
	myCols = LEVELS[targetLevel].cols
	for (let c = 0; c < (myCols); c++){
		for (let r = 1; r < (parseInt(myRows) + 1); r++){
			//String.fromCharCode(65 + col)
			var newPos = String.fromCharCode(65 + c) + r;
			newOption = document.createElement("option");
			newOption.textContent = newPos
			newOption.setAttribute("value", newPos);
			cellSelect.appendChild(newOption);	
		}
		
	}
	
}

function updateWallName(){
//console.log("updateWallName");
//console.log(LEVELS);
//console.log(items);

	
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
//console.log("changeLevel");
//console.log(LEVELS);
//console.log(items);

	console.log(document.getElementById('levelSelect').value)
	loadLevel(LEVELS[document.getElementById('levelSelect').value])
}

function loadLevel(level){
	console.log("loadLevel");

	//variables
	console.log(level)
	levelOpacity.value =  baseOpacity.value;
	document.getElementById('inputRows').value = level.rows
	document.getElementById('inputCols').value = level.cols
	document.getElementById('inputLevelId').value = level.id;
	currentId = level.id;
	document.getElementById('nextLevelSelect').value = level.nextLevelId;
	document.getElementById('btnCreateGrid').click();
	//arrays
	
	if(level.items){
	for (i = 0; i < level.items.length; i++) {
		items.push(level.items[i])
	}}
	console.log("wow")
	console.log(items);
	scenes = level.scenes
	document.getElementById('btnSelect').click();
	document.getElementById('cell_A1').click();
	
	if (LEVELS[currentId]["gridOpacity"]){levelOpacity.value =  LEVELS[currentId]["gridOpacity"]; }
	updateOpacity();
}

function saveLevel(){
//console.log("saveLevel");
//console.log(LEVELS);
//console.log(items);

	
	LEVELS[currentId].rows = document.getElementById('inputRows').value;
	LEVELS[currentId].cols = document.getElementById('inputCols').value;
	LEVELS[currentId].nextLevelId = document.getElementById('nextLevelSelect').value;
	LEVELS[currentId].scenes = scenes;
	LEVELS[currentId].items = items;
	if (levelOpacity.value != baseOpacity.value) {
		LEVELS[currentId]["gridOpacity"] = levelOpacity.value;
	}

}



function updateOpacity(){
//console.log("updateOpacity");
//console.log(LEVELS);
//console.log(items);	
	root.style.setProperty("--gridAlpha", (levelOpacity.value / 100));
}



function saveSet(){
//console.log("saveSet");
//console.log(LEVELS);
//console.log(items);

	
	//Save levels in listed order
	saveLevels = {};
	myList = levelList.children;
	for (let i = 0; i < myList.length; i++){
		thisName = myList[i].value;
		saveLevels[thisName] = LEVELS[thisName];
	}
	let myName = document.getElementById("gameName").value;
	let myGame = {"title": myName, "levels": saveLevels}
	
	//TODO - Only save used custom icons
	
	if(Object.keys(customIcons).length > 0){myGame["myIcons"] = customIcons}	
	if(customSounds.length > 0){
		myGame.customSounds = {};
		for(sound of customSounds){
			myGame.customSounds[sound] = soundBank[sound];
		}
		
	}
	
	customStats = {}
	if(statLife.value != 10){		customStats["life"] = statLife.value}
	if(statStrength.value != 2){	customStats["strength"] = statStrength.value}
	if(statDefense.value != 0){		customStats["defense"] = statDefense.value}
	if(statGold.value != 0){		customStats["gold"] = statGold.value}
	if(Object.keys(customStats).length > 0){myGame["stats"] = customStats}
	
	//Life: 10 Strength: 2 Defense: 0 Gold: 0
	jsContent = JSON.stringify(myGame);	
	var blob = new Blob([jsContent], { type: 'charset=utf-8' });
	var link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'game.json';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}


function selectLibItem(row){
	itemName = row.getAttribute("itemname");
	objectType = row.parentElement.parentElement.getAttribute("object");
	myLibrary = libraries[objectType]
	if (itemName.length > 0){		
		libSelectedClass(myLibrary.table, itemName);

		myLibrary.editing = itemName;
		myMeta = myLibrary.lib[itemName].meta

		myFields = metaMap[objectType];
		populateFromLibrary(myMeta, myFields);

		updateIcons();
		
		btnAdd = myLibrary.btnAdd;
		btnCancel = myLibrary.btnCancel;
		
		btnAdd.textContent = 'Save ' + objectType;
		
		if(btnCancel) btnCancel.style.display='inline-block';
		var message = objectType + " " + itemName + " selected.";
		document.getElementById('gridAnnouncer').textContent = message;
	}
}

function populateFromLibrary(m, myFields){
	arrayIndex = {};
	for(field of myFields){
		fieldMeta = field.getAttribute("meta");
		//console.log(fieldMeta)
		if(field.getAttribute("instance")){
			//instance only field, doens't load from library;
			//reset to default
			if(field.getAttribute("value")){field.value = field.getAttribute("value");}
			else {field.value = "";}
		}
		else if(field.getAttribute("type") == "checkbox"){
			//checkbox field
			field.checked = m[fieldMeta];
		}
		else if(field.getAttribute("array")){
			//Part of an array'd variable
			//uuuuuuuuh
			if (Object.keys(arrayIndex).includes(fieldMeta)){
				arrayIndex[fieldMeta] += 1;	
			}
			else{
			//	console.log("new array index")
				arrayIndex[fieldMeta] = 0;
			}
			if(m[fieldMeta] && m[fieldMeta][arrayIndex[fieldMeta]]){
					field.value = m[fieldMeta][arrayIndex[fieldMeta]]
				}
				else{field.value = ""}
		}
		else{
			//all other types
			if(m[fieldMeta]){

			//	console.log(m[fieldMeta])
				field.value = m[fieldMeta];
			}
			else{
				//no value for this meta
				//reset to default
				if(field.getAttribute("value")){field.value = field.getAttribute("value")}
				else {field.value = "";}
			}
			
		}
	}
	
}


function libSelectedClass(table, name){

	myRows = table.getElementsByTagName("tr");
	for (let i = 0; i < myRows.length; i++) {
		if(myRows[i].getAttribute("itemName") == name){
			myRows[i].setAttribute("class","selected");
			myRows[i].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
		}
		else{
			myRows[i].setAttribute("class","");
		}
	}
}


function getItemIndex(pos){
//console.log("getItemIndex");
//console.log(LEVELS);
//console.log(items);

		for (var i = 0; i < items.length; i++) {
			if (items[i].pos === pos) {
				return(i);
			}
		}
		return(-1)
}

// Alias the regular wall icon for custom walls so creators can reuse the same art

function makeGrid() {
//console.log("makeGrid");
//console.log(LEVELS);
//console.log(items);

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
//console.log("addIcon");
//console.log(LEVELS);
//console.log(items);
	
}

function refreshCells() {
//console.log("refreshCells");
//console.log(LEVELS);
//console.log(items);

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
						} else if (found.type === 'stairs') {
							var label = pos + " stairs to " + found.meta.cell + " of " + found.meta.level;
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
		    let scenesPos = Object.keys(scenes)
			for (var j = 0; j < scenesPos.length; j++) {
				if (scenesPos[j] === pos) {
					cell.textContent = '•';
					var label = pos + " "
					sceneText = scenes[scenesPos[j]];
					maxLength = 20
					if (sceneText.length < maxLength){label += sceneText}
					else{ label += sceneText.substring(0, maxLength) + "..."}
					cell.title = label;
					break;
				}
			}	
		
		}
	}
	
	
	saveLevel()
}

function getItemNameForAnnouncement(itemType) {
//console.log("getItemNameForAnnouncement");
//console.log(LEVELS);
//console.log(items);

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
		hazard: "hazard",
		stairs: 'stairs'
	};
	
	itemNames.villager = 'villager';
	return itemNames[itemType] || itemType;
}

function announceCell(pos) {
//console.log("announceCell");
//console.log(LEVELS);
//console.log(items);

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
//console.log("focusCellByPosition");
//console.log(LEVELS);
//console.log(items);

	var cell = document.getElementById('cell_' + pos);
	if (cell) {
		//cell.tabIndex = 0;
		cell.focus();
		announceCell(pos);
	}
}

function enterGridMode(startPos) {
//console.log("enterGridMode");
//console.log(LEVELS);
//console.log(items);

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


function arrayRemove(array, thing){
	index = array.indexOf(thing);
	if (index > -1) { // only splice array when item is found
		array.splice(index, 1); // 2nd parameter means remove one item only
	}
	return array;
	
}


function updateTreasureUI() {
	var message = "";
	myObjects = Object.keys(configMap)
	//console.log(myObjects);
	myObjects = arrayRemove(myObjects, "game");
	myObjects = arrayRemove(myObjects, "level");
	myObjects = arrayRemove(myObjects, "scene");
	
	for(object of myObjects){
		//console.log(object);
		if(currentItem === object){
			configMap[object].style.display = "block";
			message = currentItem + " properties expanded";
			metaMap[object][0].focus;
		}
		else{
			//console.log(configMap[object]);
			configMap[object].style.display = "none";
		}
	}
	if (message != ""){document.getElementById('gridAnnouncer').textContent = message; console.log(message)}
}

// Initialize listeners on the buttons to toggle treasure UI
for (var i = 0; i < itemButtons.length; i++) {
	itemButtons[i].addEventListener('click', function() {
		currentItem = this.dataset.item;
		if(metaMap[currentItem]){
		resetFields(metaMap[currentItem]);}
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
			'p': 'potion',
			'h': 'hazard',
			's': 'shop',
			'n': 'gameEnd',
			'l': 'villager',
			'e': 'eraser',
			'i': 'select',
			'u': 'stairs',
			'h': 'help'
	};

	function isEditing() {
//console.log("isEditing");
//console.log(LEVELS);
//console.log(items);

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


// Sync initial values

updateTreasureUI();

// Custom wall UI wiring


function renderLibraries(){
	
	//initiate default Items
	grunt = {"name": "Grunt", type: "monster", "meta": {"name": "Grunt", "hp": 6, "atk": 2, "def": 0}};
	avoid =  {"name": "Void", type: "hazard", "meta": { "name": "Void", "hint": "Mysterious fog", "text": "You  have fallen into a void.", "void": true, "icon": "void" } };
	armor =  { "name": "armor shop", type: "shop", "meta": { "name": "armor shop", "value": 1, "kind": "defense", "cost": 14, "currency": "gold", "icon": "armor" } }
	weapon 	=  { "name": "weapon shop", type: "shop", "meta": { "name": "weapon shop", "value": 1, "kind": "strength", "cost": 18, "currency": "gold", "icon": "weapon" } }
	inn = { "name": "inn", type: "shop", "meta": { "name": "inn", "value": 8, "kind": "life", "cost": 10, "currency": "gold", "icon": "inn" } } 
	defaults = [grunt, avoid, armor, weapon, inn]
	for (item of defaults){
		myLibrary = libraries[item.type].lib;
		itemName = item.name;
			if(!entryExists(myLibrary, itemName)){
				var newItem = {name: itemName};
				myLibrary[itemName] = newItem;
				myLibrary[itemName].meta = item.meta;
		}
	}
	
	libKeys = Object.keys(libraries);
	for (libKey of libKeys){
		myTable = libraries[libKey].table;
		myTable.innerHTML = '';
		
		entries = libraries[libKey].lib;
		names = Object.keys(entries);
		
		//createheader row
		var row = document.createElement("thead")
		metaKeys = Object.keys(entries[names[0]].meta)
		for (key of metaKeys){
			var cell = document.createElement("th");
			cell.innerText = key;
			cell.setAttribute("scope","col");
			row.appendChild(cell);
		}
		var cell = document.createElement("th");
		cell.innerText = "refs";
		cell.setAttribute("scope","col");
		row.appendChild(cell);
		
		myTable.appendChild(row);

		var body = document.createElement("tbody");
		//create other rows
		
		
		for (itemName of names){
			var row = document.createElement("tr")
			myTable.appendChild(row);
			var cell = document.createElement("th");
			cell.setAttribute("scope","row");
			cell.innerText = itemName;
			row.appendChild(cell);
			for (key of metaKeys){
				if(key != "name"){
				var cell = document.createElement("td");
				if (Array.isArray(entries[itemName].meta[key])){
					//make a list!
					var descs = entries[itemName].meta[key];
					var list = document.createElement("ul");
					for (let d = 0; d < descs.length; d++){
						var litem = document.createElement("li");
						litem.innerText = descs[d]
						list.appendChild(litem);
					}
					cell.appendChild(list)
				}
				else{
					cell.innerHTML = entries[itemName].meta[key];
				}
					row.appendChild(cell);
			}}
			//refs cell

			cell = document.createElement("td");
			cell.innerHTML = "none";
			refs = entries[itemName].refs;
				if(refs){
				cell.innerHTML = "";
				myLevels = Object.keys(refs);
				var myList = document.createElement("ul");
				for (level of myLevels){
					removeRefs = [];
					for(item of refs[level]){
						//confirm REF is still this object
						if(stillThere(level, item, itemName, libKey)){
							var myLi = document.createElement("li");
						
							myLi.innerHTML = level + " " + item.pos;
							myList.appendChild(myLi)
						}
						else{
							//remove this ref
						
							removeRefs.push(item);
						}
					}
					for (ref of removeRefs){
					
						refs[level] = arrayRemove(refs[level], ref)
					}
				}
				cell.appendChild(myList)
			}
			row.appendChild(cell);
			body.appendChild(row);
			row.setAttribute("itemName", itemName);
			row.setAttribute('onclick', "selectLibItem(this)");
		}
		
		myTable.appendChild(body);
		if(libraries[libKey].editing != ""){
			libSelectedClass(myTable, libraries[libKey].editing);
		}
	}
	
}




function resetFields(myFields){
	arrayIndex = {};
	for(field of myFields){

		if(field.getAttribute("type") == "checkbox"){
			//checkbox field
			field.checked = false;
		}
		else {
			field.value = field.getAttribute("value") || '';
		}
	}
	myObject = myFields[0].getAttribute("object");
	if(libraries[myObject]){
		libraries[myObject].editing = "";
	}
	updateIcons();
}

function stillThere(level, pos, itemName, objectType){
	there = false;
	myItems = LEVELS[level].items
	for(item of myItems){
		if(item.type == objectType && item.meta && item.meta.name == itemName && item.pos == pos){
			return true;
		}
	}
	return there;
}

function findObj(level, pos, itemName, objectType){

	myItems = LEVELS[level].items
	for(item of myItems){
		if(item.type == objectType && item.meta && item.meta.name == itemName && item.pos == pos){
			return item;
		}
	}
	return false;
}



function libraryFromFields(m, myFields){
	arrayIndex = {};
	for(field of myFields){
		fieldMeta = field.getAttribute("meta");
	
		if(field.getAttribute("instance")){
			//instance only field, doens't load from library;
			//Just skip	
		}
		else if(field.getAttribute("type") == "checkbox"){
			//checkbox field
			m[fieldMeta] = field.checked;
			field.checked = false;
		}
		else if(field.getAttribute("array")){
			//Part of an array'd variable
			//uuuuuuuuh
			if (Object.keys(arrayIndex).includes(fieldMeta)){
				arrayIndex[fieldMeta] += 1;
			}
			else{
			
				arrayIndex[fieldMeta] = 0;
				m[fieldMeta] = [];
			}
			if(m[fieldMeta] && m[fieldMeta][arrayIndex[fieldMeta]]){
				m[fieldMeta][arrayIndex[fieldMeta]] = field.value;
			}
			else if(field.value != ""){m[fieldMeta].push(field.value)}
		}
		else{
			//all other types
			if(m[fieldMeta] || field.value){
				m[fieldMeta] = field.value;
			}
		}
		field.value = field.getAttribute("value") || '';
	}
}



function getMetas(myFields){
	meta = {};
	for(field of myFields){
		fieldMeta = field.getAttribute("meta");
	
		if(field.getAttribute("type") == "checkbox"){
			//checkbox field
			meta[fieldMeta] = field.checked;
		}
		else if(field.getAttribute("array")){
			//Part of an array'd variable
			//uuuuuuuuh
			if(meta[fieldMeta]){meta[fieldMeta].push(field.value);}
			else{meta[fieldMeta] = [field.value];}
		}
		else{
			meta[fieldMeta] = field.value;		
		}
	}	
	return meta;
}

function libraryAction(btn){
	myAction = btn.getAttribute("action")
	objectType = btn.getAttribute("object");
	myLibrary = libraries[objectType];
	if(myAction == "export"){
		libraryToCSV(objectType)
		
		return;
	}
	if(myAction == "import"){

		let csvInput = document.getElementById(btn.getAttribute("input"));
		if ('files' in csvInput && csvInput.files.length > 0) {
			CSVToLibrary(csvInput.files[0], objectType);
			
		}
	

		
		
		return;
	}
	if(myAction == "add"){
		//get object type
		nameField = document.getElementById(objectType + "Name")
		var name = nameField.value.trim() || objectType;
		

		if(myLibrary.editing != ""){
			if(myLibrary.editing != name){
				Object.defineProperty(myLibrary.lib, name, Object.getOwnPropertyDescriptor(myLibrary.lib, myLibrary.editing));
				delete myLibrary.lib[myLibrary.editing];
				myLibrary.editing = name;
			}
		}
		else if(!myLibrary.lib[name]){
			myLibrary.lib[name] = {name: name, meta: {}};
		}
		libraryFromFields(myLibrary.lib[name].meta, metaMap[objectType]);
		
		//update refs!
		myItem = myLibrary.lib[name];
		if(myItem.refs){
			updateRefs(myItem, name, objectType)
		}
		
		
		
		btn.textContent = 'Add ' + objectType;
		var cancel = myLibrary.btnCancel; 
		if(cancel) cancel.style.display='none';
	}
	libSelectedClass(myLibrary.table, "");
	resetFields(metaMap[objectType]);
	myLibrary.editing = "";
	renderLibraries();
}

function updateRefs(myItem, name, objectType){
	updateRefs()
	myLevels = Object.keys(myItem.refs)
	for(level of myLevels){
		for(item of myItem.refs[level]){
			//update only meta that is stored in the library (non-instance meta)
			libMeta = myItem.meta
			libKeys = Object.keys(libMeta)
			itemRef = findObj(level, item, name, objectType)
			
			for(key of libKeys){
				console.log(key)
				itemRef.meta[key] = libMeta[key];
			}
		}
	}	
	
}

function libraryUpload(field){
	console.log("uploading library")
	document.getElementById(field.getAttribute("btn")).click();
	
}


function CSVToArray( strData, strDelimiter ){
	// Source - https://stackoverflow.com/a/1293163
	// Posted by Kirtan, modified by community. See post 'Timeline' for change history
	// Retrieved 2026-03-02, License - CC BY-SA 4.0
		// ref: http://stackoverflow.com/a/1293163/2343
        // This will parse a delimited string into an array of
        // arrays. The default delimiter is the comma, but this
        // can be overriden in the second argument.
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		),
		"gi"
		);


	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;


	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){

		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[ 1 ];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
			){

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );

		}

		var strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
				);

		} else {

			// We found a non-quoted value.
			strMatchedValue = arrMatches[ 3 ];

		}


		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}

	// Return the parsed data.
	return( arrData );
}


function CSVToLibrary(file, objectType){
	readFileContent(file).then(content => {
		
		
		myRows = CSVToArray(content);
		myMetas = myRows.shift()
		
		myLibrary = libraries[objectType].lib;
		libraries[objectType].editing = "";
		
		arrayMetas = []
		fields = metaMap[objectType];
		for (field of fields){
			if(!field.getAttribute("instance")){
				if(field.getAttribute("array")){
					arrayMetas.push(field.getAttribute("meta"));
				}
			}
		}
		console.log(myRows);
		
		for(row of myRows){1
			if(row.join().length > 1){
			console.log(row);
			if(!myLibrary[row[0]]){myLibrary[row[0]] = {name: row[0], meta: {}, refs: {}}}
			arrayIndex = {};
			name = row[0]
			
			libMeta = myLibrary[name].meta;
			
			for(i in myMetas){
				
				if(arrayMetas.includes(myMetas[i])){
				//array Element
					if(!libMeta[myMetas[i]]){libMeta[myMetas[i]] = [];}
					if(!arrayIndex[myMetas[i]]){
						arrayIndex[myMetas[i]] = 0;
					}
					if(libMeta[myMetas[i]][arrayIndex[myMetas[i]]]){
						libMeta[myMetas[i]][arrayIndex[myMetas[i]]] = row[i];
					}
					else{
						//
						libMeta[myMetas[i]].push(row[i]);
					}
					arrayIndex[myMetas[i]] += 1;
				}
				else{
				//non-array element
					libMeta[myMetas[i]] = row[i];					
				}
				
			}
			
		}
		}
		renderLibraries();
		
		
	}).catch(error => console.log(error));
}



function readFileContent(file) {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = event => resolve(event.target.result);
		reader.onerror = error => reject(error);
		reader.readAsText(file, "windows-1252");
	});
}


function libraryToCSV(objectType){
	fields = metaMap[objectType];
	
    // Variable to store the final csv data
    let csv_data = [];
    let csvrow = [];
	
	//header row
	
	metaKeys = []
	arrayIndex = {};
	arrayMetas = []
	for (field of fields){
		if(!field.getAttribute("instance")){
			myMeta = field.getAttribute("meta");
			csvrow.push(myMeta);
			metaKeys.push(myMeta);
			if(field.getAttribute("array")){
				arrayMetas.push(myMeta);
			}
		}
	}
    csv_data.push("\"" + csvrow.join("\",\"") + "\""  );
	
	//data rows
	myItems = libraries[objectType].lib;
	itemKeys = Object.keys(myItems);
	for(item of itemKeys){
		let csvrow = [];
		arrayIndex = {};
		for(meta of metaKeys){
			if(arrayMetas.includes(meta)){
				if(!arrayIndex[meta]){arrayIndex[meta] = 0;}
				if(myItems[item].meta[meta] && myItems[item].meta[meta].length > arrayIndex[meta]){
				csvrow.push(myItems[item].meta[meta][arrayIndex[meta]]);}
				else{csvrow.push("");}
				arrayIndex[meta] += 1;
			}
			else{
				csvrow.push(myItems[item].meta[meta]);
			}
		}
		csv_data.push("\"" + csvrow.join("\",\"") + "\""  );
	}
	
    csv_data = csv_data.join('\n');
	downloadCSVFile(csv_data, objectType);
}

function downloadCSVFile(csv_data, objectType) {
    // Create CSV file object and feed our
    // csv_data into it
    CSVFile = new Blob([csv_data], { type: "text/csv" });

    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement('a');

    // Download csv file
	
    temp_link.download = objectType + "Library.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download 
    temp_link.click();
    document.body.removeChild(temp_link);
}


// Handle grid keyboard navigation
function setupGridKeyboard() {
//console.log("setupGridKeyboard");
//console.log(LEVELS);
//console.log(items);

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
				myDiv = configMap[type];
				//populateFromLibrary(m, myFields){
				if(myDiv){
					myDiv.style.display = 'block'; 
					message = type + " properties expanded."
					myFields = metaMap[type];
					populateFromLibrary(items[existingIdx].meta, myFields);
				}
				else{updateTreasureUI()}
				if (message != ""){document.getElementById('gridAnnouncer').textContent = message;}
		}}
		else {
			newObj = {type: currentItem, pos: pos, meta: getMetas(metaMap[currentItem])};
			myIndex = existingIdx;
			if (existingIdx >= 0) {
				items[existingIdx] = newObj;				
			} else {
				items.push(newObj);
				myIndex = items.length - 1;
			}
			if(libraries[currentItem]){
				myName = LEVELS[currentId].items[myIndex].meta.name;
				myLibSelf = libraries[currentItem].lib[myName];
				if(!myLibSelf.refs){myLibSelf.refs = {}}
				if(!myLibSelf.refs[currentId]){myLibSelf.refs[currentId] = [LEVELS[currentId].items[myIndex].pos]}
				else{myLibSelf.refs[currentId].push(LEVELS[currentId].items[myIndex].pos)}
				renderLibraries();
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


//object="treasure" class="configDiv"

function initForms(){
	arrayIndex = {};
	console.log("initForms")
	
	levelSelectors = [];
	iconSelectors = [];
	libraries = {};
	
	var inputs = document.getElementsByTagName("input");
	var selects = document.getElementsByTagName("select");
	var configs = document.getElementsByClassName("configDiv");
	var tables = document.getElementsByTagName("table");
	var buttons = document.getElementsByTagName("button");
	var objectKeys = [];
	for(input of inputs){	
		myObject = input.getAttribute("object");
		if (myObject && !objectKeys.includes(myObject)) {
			objectKeys.push(myObject);
		}
	}
	for(select of selects){
		myObject = select.getAttribute("object");
		if (myObject && !objectKeys.includes(myObject)) {
			objectKeys.push(myObject);
		}
		if (select.getAttribute("meta") && select.getAttribute("meta") == "level"){
			levelSelectors.push(select);
		}
		else if (select.getAttribute("meta") && select.getAttribute("meta") == "icon"){
			iconSelectors.push(select);
		}
	}
	
	for(key of objectKeys){
		metaMap[key] = [];
	}
	
	for(input of inputs){	
		myObject = input.getAttribute("object");
		if(myObject){
		metaMap[myObject].push(input);
		myFunks = ["updateSelected(this);"]
		
		if(input.getAttribute("onChange")){
			myFunks.push(input.getAttribute("onchange"))
		}

		//console.log(myFunks)
		input.setAttribute("onChange", myFunks.join(" "))
		
		if(input.getAttribute("array") == true){
			myMeta = input.getAttribute("meta")
			arrayIndex[myMeta] = (arrayIndex[myMeta] + 1) || 0;
			input.setAttribute("index", arrayIndex[myMeta]);
		}
		
		}
	}
	for(select of selects){	
		myObject = select.getAttribute("object");
		if(myObject){
			metaMap[myObject].push(select);
			myFunks = ["updateSelected(this);"]
		if(select.getAttribute("onChange")){
			myFunks.push(select.getAttribute("onchange"))
		}
		if(select.getAttribute("meta") == "level" && select.getAttribute("cellSelect")){
			myFunks.push("updateCellList(this);");
		}
		select.setAttribute("onChange", myFunks.join(" "))
		
		}
	}
	

	for(div of configs){
		myObject = div.getAttribute("object");
		if(myObject){
			configMap[myObject] = div;}
	}
	
	//<button object="monster" action="add" id="btnAddMonster">Add Monster</button>
	//<button object="monster" action="cancel" id="btnCancelEdit" >New monster</button>
	//<table object="monster" library="true" id="monsterList" class="monster-list">


	
	for(table of tables){
		if(table.getAttribute("library")){
			libraries[table.getAttribute("object")] = {};
			libraries[table.getAttribute("object")].table = table;
			libraries[table.getAttribute("object")].lib = {};
			libraries[table.getAttribute("object")].editing = "";
		}
	}
	
	for(btn of buttons){
		if(btn.getAttribute("object") && btn.getAttribute("action")){
			myKey = btn.getAttribute("action");
			myKey = String(myKey).charAt(0).toUpperCase() + String(myKey).slice(1);
			myKey = "btn" + myKey;
			libraries[btn.getAttribute("object")][myKey] = btn;
			btn.setAttribute("onclick", "libraryAction(this)");
		}
	}
	
	console.log(libraries);
	//console.log(metaMap);
	
}

function updateSelected(field){
	//console.log("updateSelected");
	//console.log(field);
	if(activeCell){
		var pos = activeCell.dataset.pos;
		var existingIdx = getItemIndex(pos);
		cellObject = items[existingIdx];
		fieldObject = field.getAttribute("object");
		fieldMeta = field.getAttribute("meta");
		fieldValue = field.value;
		//console.log(fieldValue)
		if(cellObject && cellObject.type == fieldObject){
			//what kind of field
			if (field.getAttribute("type") == "checkbox") {
				//console.log("checkbox")
				cellObject.meta[fielMeta] = field.checked;
				
			}
			else if (field.getAttribute("array") == true){
				//console.log("array")
				cellObject.meta[fieldMeta][field.getAttribute("index")] = fieldValue;
				
			}
			else{
				//console.log("standard field")
				//console.log(cellObject)
				//console.log(cellObject.meta)
				//console.log(fieldMeta)
				if(!cellObject.meta){cellObject.meta = {}}
				cellObject.meta[fieldMeta] = fieldValue;
			}
		}
	}
}





myOption = document.createElement("option");
myOption.textContent = "Finish"
myOption.setAttribute("value", null);
nextLevelList.appendChild(myOption);

				
