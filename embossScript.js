
var name = "Super Dungeon"
var myBook = document.getElementById("bookContent")

var artof = ",>t (";
var currentGame = "";
var dataPath = "./data/game";
var myGames = {}
var levels = {"level1":{"id":"level1","rows":2,"cols":2,"items":[{"type":"wall","pos":"B1"},{"type":"door","pos":"B2"},{"type":"key","pos":"A2"}],"scenes":{"A1":"You wake up in a small room."},"nextLevelId":"level2"}, 		"level2":{"id":"level2","rows":2,"cols":6,"items":[{"type":"wall","pos":"A2"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"D1"},{"type":"door","pos":"F2"},{"type":"key","pos":"F1"}],"scenes":{"A1":"You walk down the hall."},"nextLevelId":"level3"}, 		"level3":{"id":"level3","rows":4,"cols":4,"items":[{"type":"wall","pos":"B1"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"D1"},{"type":"key","pos":"D2"},{"type":"potion","pos":"C3"},{"type":"door","pos":"D4"},{"type":"treasure","pos":"B4","meta":{"kind":"power","value":2}},{"type":"monster","pos":"A4","meta":{"name":"Slime","hp":6,"atk":1,"def":0,"descriptions":["Squiggle, squiggle","Slurp, slurp","Oooooooze"]}}],"scenes":{"A1":"The door opens with a creak, but something feels off in this small room."},"nextLevelId":"level4"}, 		"level4":{"id":"level4","rows":6,"cols":6,"items":[{"type":"wall","pos":"A2"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"C2"},{"type":"wall","pos":"D2"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"F4"},{"type":"wall","pos":"E4"},{"type":"wall","pos":"D4"},{"type":"wall","pos":"B4"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"F6"},{"type":"door","pos":"F5"},{"type":"void","pos":"D6"},{"type":"key","pos":"C6"},{"type":"potion","pos":"B3"},{"type":"potion","pos":"F1"},{"type":"treasure","pos":"E3","meta":{"kind":"gold","value":25}},{"type":"monster","pos":"C3","meta":{"name":"Davey","hp":3,"atk":3,"def":1,"descriptions":["Whoa! Watch where you're going!","Ouch, dude! What's your deal?!","I'm leaving"]}},{"type":"monster","pos":"E1","meta":{"name":"Goblin","hp":6,"atk":2,"def":0,"descriptions":["The goblin sneers and draws his blade.","The goblin growls and leaps toward you.","The goblin winces."]}}],"scenes":{"A1":"You can't help but feel that more danger lies ahead. Be brave, adventurer!","B5":"You hope the exit is near, but it's hard to tell in the dim dungeon light."},"nextLevelId":"town1"}, 		"town1":{"id":"town1","rows":3,"cols":10,"items":[{"type":"custom_wall","pos":"B2","meta":{"name":"bush"}},{"type":"exit","pos":"J3"},{"type":"custom_wall","pos":"D2","meta":{"name":"bush"}},{"type":"custom_wall","pos":"H2","meta":{"name":"bush"}},{"type":"custom_wall","pos":"J2","meta":{"name":"bush"}},{"type":"custom_wall","pos":"C2","meta":{"name":"flowers"}},{"type":"custom_wall","pos":"I2","meta":{"name":"flowers"}},{"type":"custom_wall","pos":"F1","meta":{"name":"flowers"}},{"type":"armor_shop","pos":"G1"},{"type":"weapon_shop","pos":"E1"},{"type":"inn","pos":"F3"},{"type":"villager","pos":"J1","meta":{"text":"Take this to help you in the dungeon.","kind":"power","value":1}},{"type":"villager","pos":"G3","meta":{"text":"Your work in the dungeon is dangerous but important. Take this as a thank you for your work.","kind":"gold","value":10}}],"scenes":{"A1":"You step out of the dungeon into a quiet town.","C1":"It's a lovely day, and you're glad to get a break from the dark dungeon."},"nextLevelId":"level5"}, 		"level5":{"id":"level5","rows":6,"cols":6,"items":[{"type":"wall","pos":"C1"},{"type":"wall","pos":"C2"},{"type":"wall","pos":"A2"},{"type":"wall","pos":"A3"},{"type":"wall","pos":"B4"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"D4"},{"type":"wall","pos":"E3"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"F5"},{"type":"door","pos":"A4"},{"type":"key","pos":"A6"},{"type":"treasure","pos":"D6","meta":{"kind":"gold","value":25}},{"type":"potion","pos":"F6"},{"type":"monster","pos":"B3","meta":{"name":"Blob","hp":7,"atk":1,"def":0,"descriptions":["Squelch","The blob shifts moistily","Look out now!"]}},{"type":"monster","pos":"E1","meta":{"name":"Wolf","hp":9,"atk":3,"def":0,"descriptions":["The wold bares its teeth.","The wolf lunges forward.","The wolf issues a low growl."]}},{"type":"monster","pos":"C5","meta":{"name":"Cave bat","hp":7,"atk":3,"def":1,"descriptions":["The bat screeches","The bat dives toward you","Flap flap flap"]}}],"scenes":{"A1":"You worry about how long this may go on.","E4":"Your bones ache. If only you could find a potion."},"nextLevelId":"level6"}, 		"level6":{"id":"level6","rows":6,"cols":6,"items":[{"type":"wall","pos":"B1"},{"type":"wall","pos":"C2"},{"type":"wall","pos":"D4"},{"type":"wall","pos":"E3"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"A3"},{"type":"wall","pos":"F5"},{"type":"wall","pos":"F6"},{"type":"wall","pos":"E6"},{"type":"void","pos":"C1"},{"type":"door","pos":"F1"},{"type":"potion","pos":"D2"},{"type":"potion","pos":"A5"},{"type":"key","pos":"A6"},{"type":"wall","pos":"B5"},{"type":"treasure","pos":"C5","meta":{"kind":"gold","value":25}},{"type":"treasure","pos":"F3","meta":{"kind":"gold","value":25}},{"type":"monster","pos":"A4","meta":{"name":"Steve","hp":8,"atk":4,"def":0,"descriptions":["Hey! What's up?","What are you doing?!","Oh, man!"]}},{"type":"monster","pos":"D3","meta":{"name":"Mummy","hp":8,"atk":4,"def":1,"descriptions":["Mmmmuuuuuuummmmmmmyyyyyy","Grrrrrrr rrr rrrrrrr","Muuuuu uuuuuuuu uuuuuuummmmy"]}},{"type":"monster","pos":"F4","meta":{"name":"Zombie","hp":8,"atk":4,"def":2,"descriptions":["Zombieeeeeee","The zombie shuffles toward you","The zombie opens its mouth, but you don't want to look inside."]}}],"scenes":{"A1":"You steel yourself for what may come."},"nextLevelId":"town2"}, 		"town2":{"id":"town2","rows":7,"cols":5,"items":[{"type":"custom_wall","pos":"B2","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"B5","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"D5","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"D2","meta":{"name":"Flowers"}},{"type":"exit","pos":"E1"},{"type":"custom_wall","pos":"B7","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"D7","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"A7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"C7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"E7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B4","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"D3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"D4","meta":{"name":"Bushes"}},{"type":"inn","pos":"C5"},{"type":"weapon_shop","pos":"A6"},{"type":"armor_shop","pos":"E6"},{"type":"villager","pos":"E4","meta":{"text":"Be careful in the dungeons! Take this to help you prepare.","kind":"gold","value":20}}],"scenes":{"A1":"A quiet town offers a welcome respite.","C3":"What a lovely garden."},"nextLevelId":"level7"}, 		"level7":{"id":"level7","rows":6,"cols":6,"items":[{"type":"wall","pos":"D1"},{"type":"treasure","pos":"E1","meta":{"kind":"gold","value":25}},{"type":"door","pos":"F3"},{"type":"wall","pos":"B3"},{"type":"wall","pos":"B4"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"E3"},{"type":"wall","pos":"E4"},{"type":"wall","pos":"C6"},{"type":"key","pos":"A6"},{"type":"potion","pos":"B5"},{"type":"void","pos":"E6"},{"type":"monster","pos":"A5","meta":{"name":"Skeleton","hp":11,"atk":7,"def":2,"descriptions":["The skeleton's bones rattle as it raises a bone blade.","The bones are their money. So are the worms.","The pull your hair up, but not out, to get another chance at life."]}},{"type":"monster","pos":"F2","meta":{"name":"Skeleton","hp":11,"atk":7,"def":2,"descriptions":["The skeleton's bones rattle as it raises a bone blade.","The bones are their money. So are the worms.","The pull your hair up, but not out, to get another chance at life."]}},{"type":"monster","pos":"C3","meta":{"name":"Ogre","hp":12,"atk":8,"def":2,"descriptions":["A giant ogre appears from the shadows.","The ogre towers over you as it raises a massive club.","The ogre grumbles and charges forward."]}}],"scenes":{"A1":"You confidence soars, and you hope it is not misplaced."},"nextLevelId":"level8"}, 		"level8":{"id":"level8","rows":7,"cols":7,"items":[{"type":"wall","pos":"C2"},{"type":"wall","pos":"B3"},{"type":"wall","pos":"B5"},{"type":"wall","pos":"C6"},{"type":"wall","pos":"E6"},{"type":"wall","pos":"F5"},{"type":"wall","pos":"F3"},{"type":"wall","pos":"E2"},{"type":"treasure","pos":"D2","meta":{"kind":"gold","value":25}},{"type":"door","pos":"D4"},{"type":"treasure","pos":"D6","meta":{"kind":"gold","value":25}},{"type":"treasure","pos":"B4","meta":{"kind":"power","value":2}},{"type":"treasure","pos":"F4","meta":{"kind":"power","value":2}},{"type":"potion","pos":"G4"},{"type":"potion","pos":"D7"},{"type":"void","pos":"A5"},{"type":"key","pos":"F2"},{"type":"monster","pos":"C4","meta":{"name":"Ghoul","hp":12,"atk":8,"def":2,"descriptions":["Oooooo ooooo oooooooo ooooo ooooooooo.","The ghoul swoops spookily.","The ghoul disappears then reappears behind you."]}},{"type":"monster","pos":"E4","meta":{"name":"Ghoul","hp":12,"atk":8,"def":2,"descriptions":["Oooooo ooooo oooooooo ooooo ooooooooo.","The ghoul swoops spookily.","The ghoul disappears then reappears behind you."]}},{"type":"monster","pos":"D3","meta":{"name":"Werewolf","hp":12,"atk":7,"def":2,"descriptions":["You see a large wolf standing upright in tattered clothes.","The wolf dribbles its basketball toward you.","This wolf seemed nicer in the movies."]}},{"type":"monster","pos":"D5","meta":{"name":"Werewolf","hp":12,"atk":7,"def":2,"descriptions":["You see a large wolf standing upright in tattered clothes.","The wolf dribbles its basketball toward you.","This wolf seemed nicer in the movies."]}}],"scenes":{"A1":"You can sense the end is near, if you can just make it a bit further."},"nextLevelId":"town3"}, 		"town3":{"id":"town3","rows":9,"cols":7,"items":[{"type":"custom_wall","pos":"B2","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F2","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F3","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"F8","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B8","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"B7","meta":{"name":"Bushes"}},{"type":"custom_wall","pos":"C2","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"B4","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"E2","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"F4","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"F6","meta":{"name":"Flowers"}},{"type":"exit","pos":"A9"},{"type":"custom_wall","pos":"E8","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"C8","meta":{"name":"Flowers"}},{"type":"custom_wall","pos":"B6","meta":{"name":"Flowers"}},{"type":"armor_shop","pos":"C5"},{"type":"inn","pos":"D4"},{"type":"weapon_shop","pos":"E5"},{"type":"custom_wall","pos":"D5","meta":{"name":"Fountain"}},{"type":"villager","pos":"D7","meta":{"text":"Be strong, adventurer! Take this.","kind":"gold","value":15}},{"type":"villager","pos":"G9","meta":{"text":"Your curiosity can lead to danger in the dungeon. Stay safe, warrior!","kind":"defense","value":2}}],"scenes":{"A1":"Finally a new town. I can rest here a bit.","A5":"The beauty of the quiet town helps calm your nerves, but makes you dread the dungeon even more. ","G1":"Few people are around, but you see a villager in the distance."},"nextLevelId":"level9"}, 		"level9":{"id":"level9","rows":8,"cols":8,"items":[{"type":"wall","pos":"A2"},{"type":"wall","pos":"B2"},{"type":"wall","pos":"C3"},{"type":"wall","pos":"D2"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"F2"},{"type":"wall","pos":"G2"},{"type":"wall","pos":"H4"},{"type":"wall","pos":"F4"},{"type":"wall","pos":"G5"},{"type":"wall","pos":"E4"},{"type":"wall","pos":"D5"},{"type":"wall","pos":"C5"},{"type":"wall","pos":"B5"},{"type":"wall","pos":"A7"},{"type":"wall","pos":"B7"},{"type":"wall","pos":"C7"},{"type":"wall","pos":"D7"},{"type":"wall","pos":"E7"},{"type":"wall","pos":"F7"},{"type":"wall","pos":"G7"},{"type":"potion","pos":"H8"},{"type":"potion","pos":"A3"},{"type":"treasure","pos":"C2","meta":{"kind":"defense","value":1}},{"type":"treasure","pos":"E5","meta":{"kind":"power","value":1}},{"type":"key","pos":"G4"},{"type":"void","pos":"H5"},{"type":"door","pos":"A8"},{"type":"monster","pos":"E1","meta":{"name":"Giant spider","hp":25,"atk":13,"def":6,"descriptions":["Numerous soft foot steps creep toward you.","The spiders fangs are much longer than you thought they might be.","The spider shoots a web toward you."]}},{"type":"monster","pos":"F5","meta":{"name":"Giant spider","hp":25,"atk":13,"def":6,"descriptions":["Numerous soft foot steps creep toward you.","The spiders fangs are much longer than you thought they might be.","The spider shoots a web toward you."]}},{"type":"monster","pos":"C4","meta":{"name":"Ghoul","hp":12,"atk":13,"def":2,"descriptions":["Oooooo ooooo oooooooo ooooo ooooooooo.","The ghoul swoops spookily.","The ghoul disappears then reappears behind you."]}},{"type":"monster","pos":"E8","meta":{"name":"Sorceress","hp":30,"atk":14,"def":6,"descriptions":["A bright ball of energy hovers in front of the sorceress.","The sorcerer shoots the ball toward you.","The sorceress floats above the ground with an eerie glow."]}}],"scenes":{"A1":"Your armor is damaged and your body is bruised, but you just need to keep moving."},"nextLevelId":"level10"}, 		"level10":{"id":"level10","rows":10,"cols":10,"items":[{"type":"wall","pos":"C2"},{"type":"wall","pos":"C3"},{"type":"wall","pos":"B3"},{"type":"wall","pos":"C4"},{"type":"wall","pos":"D3"},{"type":"wall","pos":"E2"},{"type":"wall","pos":"G1"},{"type":"potion","pos":"J2"},{"type":"potion","pos":"E3"},{"type":"wall","pos":"I2"},{"type":"wall","pos":"J3"},{"type":"wall","pos":"G3"},{"type":"wall","pos":"F4"},{"type":"wall","pos":"G4"},{"type":"wall","pos":"G5"},{"type":"wall","pos":"H4"},{"type":"wall","pos":"J5"},{"type":"wall","pos":"A6"},{"type":"wall","pos":"D6"},{"type":"wall","pos":"D7"},{"type":"wall","pos":"C7"},{"type":"wall","pos":"D8"},{"type":"wall","pos":"E7"},{"type":"wall","pos":"G8"},{"type":"wall","pos":"H7"},{"type":"wall","pos":"H8"},{"type":"wall","pos":"I8"},{"type":"wall","pos":"H9"},{"type":"wall","pos":"E10"},{"type":"wall","pos":"F10"},{"type":"wall","pos":"B9"},{"type":"void","pos":"C9"},{"type":"treasure","pos":"D10","meta":{"kind":"defense","value":2}},{"type":"potion","pos":"A8"},{"type":"potion","pos":"F7"},{"type":"potion","pos":"I4"},{"type":"key","pos":"J4"},{"type":"treasure","pos":"D2","meta":{"kind":"power","value":2}},{"type":"door","pos":"I9"},{"type":"monster","pos":"A4","meta":{"name":"Sorceress","hp":30,"atk":14,"def":6,"descriptions":["A bright ball of energy hovers in front of the sorceress.","The sorcerer shoots the ball toward you.","The sorceress floats above the ground with an eerie glow."]}},{"type":"monster","pos":"A10","meta":{"name":"Sorceress","hp":30,"atk":14,"def":6,"descriptions":["A bright ball of energy hovers in front of the sorceress.","The sorcerer shoots the ball toward you.","The sorceress floats above the ground with an eerie glow."]}},{"type":"monster","pos":"D5","meta":{"name":"Vampire Lord","hp":30,"atk":16,"def":7,"descriptions":["I vaunt to suck your blood!","1! 2! 3! strikes from the Vampire Lord.","The Vampire Lord hovers ominously."]}},{"type":"monster","pos":"F8","meta":{"name":"Vampire Lord","hp":30,"atk":16,"def":7,"descriptions":["I vaunt to suck your blood!","1! 2! 3! strikes from the Vampire Lord.","The Vampire Lord hovers ominously."]}},{"type":"monster","pos":"J8","meta":{"name":"Vampire Lord","hp":30,"atk":16,"def":7,"descriptions":["I vaunt to suck your blood!","1! 2! 3! strikes from the Vampire Lord.","The Vampire Lord hovers ominously."]}}],"scenes":{"A1":"You finally made it to the end. If you could just reach the exit.","F5":"This labyrinth can be infuriating, but you\u2019ve come too far to give up now."},"nextLevelId":null}};
var	icons = { player: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<defs><style>.cls-1{fill:currentColor}.cls-1,.cls-2{stroke:currentColor;stroke-miterlimit:10;stroke-width:4px}.cls-2{fill:none}</style></defs>' + '<g><g id="Layer_1"><rect class="cls-2" x="32.6" y="38.8" width="2.4" height="31.2" transform="translate(-28.5 39.8) rotate(-45)"/>' + '<path class="cls-1" d="M16.7,81.5c-2.8,2.8-7.2,2.8-10,0-2.8-2.8-2.8-7.2,0-10,1.7-1.7,3.9-2.3,6.1-2l14.2-14.2,5.9,5.9-14.2,14.2c.3,2.1-.3,4.4-2,6.1Z"/>' + '<polygon class="cls-2" points="79.2 18.2 42.3 55.1 33.1 45.8 70 9 83.6 4.6 79.2 18.2"/>' + '<path class="cls-2" d="M44.8-.6"/>' + '</g></g></svg>' , wall: `<svg viewBox="0 0 88.19 88.19" aria-hidden="true" focusable="false"> <rect x="1" y="1" width="86.19" height="86.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="65.64" x2="87.19" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="44.09" x2="87.19" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="22.55" x2="87.19" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="33.93" y1="1" x2="33.93" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="64.74" y1="1" x2="64.74" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="12.59" y1="22.55" x2="12.59" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="44.69" y1="22.55" x2="44.69" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="79.26" y1="22.55" x2="79.26" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="19.41" y1="44.09" x2="19.41" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="53.48" y1="44.09" x2="53.48" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="71.85" y1="65.64" x2="71.85" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="30.07" y1="65.64" x2="30.07" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M21.73,23.25c.57,2.12,3.27,3.14,3.81,5.27.37,1.46-.38,3.19.48,4.43.32.46.81.76,1.25,1.11,1.38,1.07,2.38,2.64,2.75,4.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M70.94,51.36c.69-2.36,2.19-4.47,4.18-5.9.55.04.73.08,1.27.13.44.04.88.07,1.31-.03s.84-.36,1.01-.76" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M47.63,87.2c-.55-2.12-1.3-4.18-2.24-6.16" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M73.03,1.7c.92,2.16,2.6,4.86,3.51,7.02" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M12.4,1.37c.52,2.3-.47,5.69-2.26,7.23" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M10.89,5.91l3.37,2.03c.17.69.68,1.3,1.33,1.59" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> </svg>`, monster: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<g stroke="currentColor" stroke-miterlimit="10" stroke-width="4" fill="none">' + '<path d="M77.9,37.4c0,11.5-5.7,21.7-14.5,27.8v18.2H24.8v-18.2c-8.8-6.1-14.5-16.3-14.5-27.8C10.3,18.7,25.4,3.6,44.1,3.6s33.8,15.1,33.8,33.8Z"/>' + '<polyline points="63.4 72.9 63.4 83.4 24.8 83.4 24.8 72.9"/>' + '<line x1="53.8" y1="72.9" x2="53.8" y2="83.4"/>' + '<line x1="44.1" y1="72.9" x2="44.1" y2="83.4"/>' + '<line x1="34.4" y1="72.9" x2="34.4" y2="83.4"/>' + '</g>' + '<g fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="4">' + '<path d="M25.9,31.9c0-2.4,2.1-5.3,4.3-4.3s3.1,2.2,4.3,4.3-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3Z"/>' + '<path d="M62.3,31.9c0-2.4-2.1-5.3-4.3-4.3s-3.1,2.2-4.3,4.3,1.9,4.3,4.3,4.3,4.3-1.9,4.3-4.3Z"/>' + '<path d="M42.7,43.5l-1.5,2.6c-.6,1.1.2,2.5,1.4,2.5h3c1.3,0,2-1.4,1.4-2.5l-1.5-2.6c-.6-1.1-2.2-1.1-2.8,0Z"/>' + '</g>' + '</svg>', treasure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M52,34.7c-.5.9-1.3,1.3-2.3,2.1l4.1,11.4h-19.6,0c0,0,4.1-11.4,4.1-11.4-.7-.6-1.3-1.3-1.8-2.1H3.5v46.1h81.2v-46.1h-32.7Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '<path d="M44,21.3c4.9,0,8.8,3.9,8.8,8.8s0,1.6-.1,2.2h31.9v-9.9c0-8.3-6.7-15-15-15H18.5c-8.3,0-15,6.7-15,15v9.9h32c-.2-.7-.3-1.4-.3-2.2,0-4.9,3.9-8.8,8.8-8.8Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '</svg>', door: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2"  aria-hidden="true" focusable="false">' + '<g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10">' + '<rect x="15.8" y="3.2" width="56.7" height="81.8"/>' + '<circle cx="62.1" cy="46.9" r="4.6"/>' + '</g>' + '</svg>', key: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M31,15.9c-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6,6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7Z" fill="none"/>' + '<path d="M85,69.1L34,26.9c2-3.2,3.3-6.5,3.9-9.7,1-5.4-.1-9.8-3.3-12.4-1.9-1.5-4.1-2.3-6.7-2.3-5.8,0-12.8,3.9-18.6,10.9C1.1,23.4-.5,34.8,5.6,39.9c1.9,1.5,4.1,2.3,6.7,2.3,4.6,0,10-2.5,14.9-7l38.6,31.9-6.1,7.4c-.5.6-.4,1.4.2,1.9l1.7,1.4c.6.5,1.4.4,1.9-.2l6.1-7.4,6.6,5.5-6.1,7.4c-.4.5-.4,1.3.2,1.8l1.3,1.1c.5.4,1.3.4,1.8-.2l11.9-14.4c.6-.7.5-1.7-.2-2.2ZM14.7,17.9c6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', potion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M68.2,65c0,10.8-10.8,19.5-24.1,19.5s-24.1-8.7-24.1-19.5c0-8.7,7-16.1,16.7-18.6V5.7h14.8v40.8c9.7,2.5,16.7,9.9,16.7,18.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '<path d="M44.1,5.7c-5.1,0-9.2-.5-9.2-1s4.1-1,9.2-1,9.2.5,9.2,1-4.1,1-9.2,1Z"' + ' fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '</svg>', weapon:"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M49.8,21.7c-13.7,15.8-27.5,31.6-41.2,47.4-.4.5-.8,1.1-1,1.7-.4,1.4,0,2.4,1.4,3.2.9.5,2.2.3,3.1-.6.2-.2.4-.4.6-.6,13.8-15.8,27.5-31.7,41.3-47.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M76.9,36.4c-3.5,5.4-8,9.5-13.7,12.4-5,2.6-10.4,3.6-16.1,1.8.6-.6,1.2-1.2,1.8-1.7,2.8-2.4,5.3-5,7.3-8.1,1.7-2.7,3.2-5.5,3.1-8.8v-.7c-.4-2.4-1.7-4.3-3.6-5.7l5-6c.4-.2.8-.2,1.5,0,3.9,1.2,7.8,1.3,11.2-1.5,1.4-1.2,2.5-2.8,3.7-4.2,0,0,0,0,0,0,0,0,0,0,.2,0,1.1,1.8,2,3.8,2.5,5.8,1.4,6,.4,11.5-2.9,16.7h0Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M55.7,25.5c1.9,1.4,3.2,3.3,3.6,5.7v.7c.2,3.4-1.3,6.2-3,8.8-2,3.1-4.5,5.7-7.3,8.1-.6.5-1.1,1.1-1.8,1.7,5.7,1.8,11.1.8,16.1-1.8,5.6-2.9,10.2-7.1,13.7-12.4,3.3-5.2,4.3-10.7,2.9-16.7-.5-2.1-1.3-4-2.5-5.8,0,0-.1,0-.2,0s0,0,0,0c-1.2,1.4-2.3,3-3.7,4.2-3.4,2.8-7.3,2.8-11.2,1.5-.7-.2-1.1-.2-1.5,0-.3.1-.5.3-.8.6-1.6,1.9-3.3,3.8-5,5.7l-5.8-5,6.3-7.3c1.7,1.5,3.3,2.9,4.9,4.3.4.3.8.6.5,1.3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <circle id=\"Filll\" cx=\"55.4\" cy=\"19.7\" r=\"3.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></circle>\n <path id=\"Filll-2\" data-name=\"Filll\" d=\"M55.4,13.7c3.3,0,6,2.7,6,6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", armor: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Fills\" style='opacity: 0.5;' stroke='none' fill='currentColor'>\n <path d=\"M20,29.2c0,3.2,0,6.4.6,9.5.2,1.1.4,2.2.6,3.3h22.9V15.2h0c-.4,0-.8,0-1.2,0-3.2.9-6.3,1.7-9.5,2.6-3.8,1.1-7.5,2.2-11.3,3.3-.8.2-1.2.7-1.4,1.5-.4,2.1-.7,4.3-.7,6.5h0Z\"></path>\n <path d=\"M44.1,71.5h0c.3.1.5,0,.8,0,1-.5,2.1-.9,3-1.5,4.2-2.5,7.7-5.8,10.7-9.6,3.6-4.6,6.2-9.8,7.7-15.5.3-.9.5-1.9.7-2.8h-22.9v29.5h0Z\"></path>\n </g>\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M44.1,15.2c.8-.3,1.6.1,2.4.3,4.3,1.2,8.6,2.5,12.9,3.8,2.2.6,4.5,1.2,6.7,1.8.8.2,1.3.9,1.4,1.6.2,1.5.4,3.1.5,4.7.1,2.1.2,4.2.1,6.3,0,1.5-.3,3-.5,4.5-.1,1.2-.4,2.5-.6,3.7-.2.9-.4,1.9-.7,2.8-1.5,5.7-4.1,10.8-7.7,15.5-3,3.8-6.5,7.1-10.7,9.6-1,.6-2,1-3,1.5-.3.1-.5.2-.8.2s-.7-.1-1.1-.3c-3.3-1.5-6.1-3.5-8.7-5.9-3.4-3.1-6.2-6.7-8.4-10.6-1.9-3.4-3.3-6.9-4.2-10.7-.2-.7-.3-1.4-.4-2.1-.2-1.1-.4-2.2-.6-3.3-.6-3.2-.6-6.3-.6-9.5,0-2.2.3-4.4.7-6.5.2-.8.6-1.3,1.4-1.5,3.8-1.1,7.5-2.2,11.3-3.3,3.1-.9,6.3-1.8,9.5-2.6.4-.1.8,0,1.2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M44.1,15.3v56.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M45,7.6c1.4.4,2.7.8,4.1,1.2,2.4.7,4.9,1.4,7.3,2.1,2.8.8,5.6,1.6,8.4,2.4,2.2.6,4.4,1.3,6.6,1.9.8.2,1.6.3,2.2,1,.6.7.6,1.6.7,2.4.3,1.8.6,3.7.6,5.6.1,1.9,0,3.9,0,5.8s0,.6,0,.9c-.1,1.6-.2,3.2-.4,4.7-.2,1.6-.3,3.3-.7,4.9-.5,2.3-1.1,4.6-1.7,6.9-.7,2.8-1.7,5.4-3,8-1.4,2.8-3,5.6-4.8,8.2-2.6,3.6-5.5,6.9-8.8,9.8-2.9,2.6-6.1,4.7-9.6,6.4-.2.1-.4.2-.7.3-.9.5-1.8.4-2.8,0-3.6-1.7-6.8-3.8-9.8-6.4-2.6-2.2-4.9-4.5-7-7.2-2.4-3-4.5-6.3-6.3-9.7-1.9-3.8-3.4-7.7-4.4-11.8-.4-1.7-.8-3.4-1.2-5.1-.3-1.3-.4-2.6-.5-3.9-.4-3.1-.6-6.3-.5-9.5,0-1.5,0-3,.3-4.5.2-1.7.5-3.4.8-5.1.2-1,.9-1.5,1.8-1.8,1.7-.5,3.5-1,5.2-1.5,2.7-.8,5.5-1.6,8.2-2.4,3.2-.9,6.3-1.8,9.5-2.7,1.4-.4,2.9-.9,4.3-1.2.6-.1,1.4,0,2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <polyline points=\"66.9 42 44.1 42 21.2 42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></polyline>\n </g>\n </g>\n </g>\n </g>\n</svg>", inn: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 62.55 56.26\">\n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" d=\"M55.07,34.69c-6.57,8.54-15.36,15.02-23.79,21.57-8.44-6.55-17.23-13.03-23.8-21.57C1.5,26.92-3.44,15.54,3.11,6.55,10.06-2.99,24.82-1.93,30.27,8.54c.36.7.59,1.57.94,2.24l.07.14.07-.14c.34-.67.57-1.54.94-2.24,5.45-10.47,20.21-11.53,27.15-1.99,6.56,8.99,1.62,20.37-4.37,28.14Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n</svg>", villager: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 88 88\">\n \n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" id=\"path966\" d=\"M69.79,80.5c-2.54-25.58-6.66-33.2-13.41-37.4-6.8-.3-15.35,0-23.63,0-7.33,3.9-11.78,11.65-14.55,37.4h51.59Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path id=\"path710\" d=\"M59.43,22.93c0,8.52-6.91,15.43-15.43,15.43s-15.43-6.91-15.43-15.43,6.91-15.43,15.43-15.43,15.43,6.91,15.43,15.43Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <line x1=\"60.48\" y1=\"80.5\" x2=\"56.9\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n <line x1=\"27.61\" y1=\"80.5\" x2=\"31.34\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n</svg>", void: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88.2 88.2\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M86.4,54.4c.9-2.3.6-4.8.3-7.3-1-7.2-2-14.4-3-21.5-.3-2.5-.7-5-2.3-7-2.6-3.2-7.9-3.8-9.7-7.6-.8-1.7-.8-3.7-1.7-5.3-.9-1.5-2.4-2.4-4-3.2-2-1-4.2-1.9-6.4-1.8-3.1.2-5.9,2.3-9,2.6-3,.3-5.8-1.1-8.6-2s-6.3-1.3-8.5.7c-.9.8-1.5,2-2.5,2.9-2.2,2-5.5,1.9-8.4,1.9-4.7,0-9.9.7-13.3,4-3.1,3-4,7.5-4.2,11.8s.4,8.6-.3,12.8c-.6,3.5-1.9,6.8-2.8,10.3s-1.2,7.2.2,10.5c1.6,3.5,5,5.9,6.7,9.3,1.8,3.6,1.5,7.9,3,11.5,2.2,5,8.1,8,13.4,6.9,2.8-.6,5.7-2.2,8.4-1.2,1.9.7,3.1,2.6,4.8,3.7,3.2,2.1,7.5.9,11-.7s7-3.8,10.8-3.5c2.1.2,4.1,1.1,6.3,1.1,2.6,0,5.2-1.3,6.6-3.5,1.5-2.4,1.9-5.2,3.5-7.6s2.9-3.3,3.6-5.6.7-3.6,1.5-5.3c1.2-2.5,3.5-4.3,4.6-6.9Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M12.1,52.5c-.8-2.5,1-5.1,1.2-7.6.6-3.8-.7-7.9-2.4-11.1-.5-1-1-2.1-1-3.1.3-3.2,4.5-3.7,6.7-5.2,2.9-1.5,5.8-4,7.9-6.7,1.6-1.8,2.7-4.3,5.1-5,2.9-.7,5.8-.2,8.7-.2,6,.4,12.6-1.3,18.2-2.7,2-.4,5.1-1.1,6.7,0,2,2.1,2.5,5.9,3.4,8.6.8,3.3,3.8,7.7,7,10.5,1.4,1.4,1.8,3,1.6,4.9-.2,3,.1,6.8,1.5,9.9.7,2.4,3.1,4.4,3.2,7-.6,2.5-4.1,3.9-5.5,6.1-1.7,2.2-2.7,4.5-3.3,6.6-.5,1.5-1.2,3.1-2.5,4.1-3.9,2.1-8.6,3.5-14.4,5.9-3.4,1.2-5.3,2.7-8.6,2.9-2.9-.2-6.6-2.2-10-2.3-4.4,0-8.3-1.8-12.8-2.8-2.2-.6-2.4-2.8-2.7-4.7-.6-3.2-2.1-6.5-3.8-9-1.3-2.1-3.3-3.7-4.2-6v-.2Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M28.9,60.3c-.6-.7-1-1.6-1.4-2.5-1.2-2.8-2.8-5.3-4.9-7.6-1.2-1.3-2.9-2.6-2.2-4.6,1.1-3,2.3-6,2.8-9.2.4-4.7,1.7-5.3,5.4-7.3,4.7-2.8,8.8-6.5,12.1-9.9.9-.9,2-1.3,3.2-.6,3.4,2.6,7.5,4.8,11.4,5.9,1.5.4,2.8,1.2,3.7,2.5,1.8,2.5,4.2,5.3,6.7,7.2,1.6,1.1,2.1,2.9,1.9,4.8-.1,2.3,0,4.7.3,6.6.3,1.5.3,3.1-.6,4.5-2,2.8-4.1,5.5-6.2,8.5-1.5,2.1-2.8,4.4-5.5,5-4,.9-7.4,3.4-11.3,4.4-1.6.4-3.1-.2-4.2-1.2-2.7-2.1-5.9-3.9-9.1-5.2-.7-.3-1.4-.7-1.9-1.2h-.1Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", stairs: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points="88.1 24 68 24 68 40 52 40 52 56 36 56 36 72 18 72 18 88.1"/> </svg>', stairsD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points=".2 24 20.3 24 20.3 40 36.3 40 36.3 56 52.3 56 52.3 72 70.3 72 70.3 88.1"/> </svg>' };
var myIcons = ["player"];
var myTypes = [];
var pageTypes = ["level", "art"];

var brlAlways = {".": 4, "?": 8, "!": 6, ",": 1, ";": 2, ":": 3, "—": ",-", "$": ",-", "¢": "@c", "@": "@a", "’":  "'", "‘": ",8", "’": ",0", "(": '"<', ")": '">', "[": ".<", "]": ".>", "/": "_/" }
var brlWholeWords = {"but": "b", "can": "c", "do": "d", "every": "e", "from": "f", "go": "g", "have": "h", "just": "j", "knowledge": "k", "like": "l", "more": "m", "not": "n", "people": "p", "quite": "q", "rather": "r", "so": "s", "that": "t", "us": "u", "very": "v", "will": "w", "it": "x", "you": "y", "as": "z", "child": "*", "shall": "v", "this": "?",  "which": ":", "out": "\\", "still": "/", "enough": "5", "his": "8", "was": "0", "were": "7"}
var brlEndings = {"-ound": ".d", "-ance": ".e", "-ence": ";e", "-ong": ";g", "-ful": ";l", "-sion": ".n", "-tion": ";n", "-less": ".s", "-ness": ";s", "-ount": ".t", "-ment": ";t", "-ity": ";y"}
var brlGroupSigns = {"and": "&",  "for": "=", "with": ")", "of": "(", "ou": "\\", "st": "/", "ar": ">", "ed": "$", "er": "]", "gh": "<", "ow": "[", "ing": "+", "in": "9", "en": "5", "be": "2", "con": "3", "dis": "4", "about": "ab", "because": "2c", "first": "f/", "above": "abv", "below": "2l", "great": "grt", "cannot": "_c", "day": "\"d", "ever": "\"e", "father": "\"f", "here": "\"h", "had": "_h", "know": "\"k", "lord": "\"l", "mother": "\"m", "many": "_m", "name": "\"n", "one": "\"o", "part": "\"p", "question": "\"q", "right": "\"r", "some": "\"s", "spirit": "_s", "time": "\"t", "under": "\"u", "upon": "^u", "work": "\"w", "word": "^w", "world": "_w", "young": "\"y", "character": "\"*", "through": "\"?", "those": "^?", "where": "\":", "whose": "^:", "ought": "\"|", "there": "\"!", "these": "^!", "their": "_!", "according": "ac", "braille": "brl", "perhaps": "p]h", "always": "alw", "children": "*n", "across": "acr", "almost": "alm", "must": "m/", "also": "al", "immediate": "imm", "necessary": "nec", "about": "ab", "friend": "*fr", "him": "hm", "above": "abv", "good": "*gd", "himself": "hmf", "according": "ac", "great": "*grt", "its": "xs", "across": "acr", "immediate": "imm", "itself": "xf", "after": "af", "letter": "*lr", "your": "yr", "afternoon": "afn", "little": "*ll", "yourself": "yrf", "afterward": "afw", "must": "m/", "yourselves": "yrvs", "again": "ag", "necessary": "nec", "herself": "h]f", "against": "ag/", "paid": "pd", "myself": "myf", "almost": "alm", "perhaps": "p]h", "oneself": "\"of", "already": "alr", "quick": "*qk", "ourselves": "|rvs", "also": "al", "said": "sd", "themselves": "!mvs", "although": "al?", "together": "tgr", "thyself": "?yf", "altogether": "alt", "could": "cd", "declare": "dcl", "always": "alw", "should": "vd", "declaring": "dclg", "because": "2c", "would": "wd", "rejoice": "rjc", "before": "2f", "either": "ei", "rejoicing": "rjcg", "behind": "2h", "neither": "nei", "conceive": "3cv", "below": "2l", "much": "m*", "conceiving": "3cvg", "beneath": "2n", "such": "s*", "deceive": "dcv", "beside": "2s", "today": "td", "deceiving": "dcvg", "between": "2t", "tonight": "tn", "perceive": "p]cv", "beyond": "2y", "tomorrow": "tm", "perceiving": "p]cvg", "blind": "*bl", "receive": "rcv", "braille": "*brl", "receiving": "rcvg", "children": "*n", "first": "f/"}
var brlSpecHs = {"the": "!", "ch": "*", "sh": "v", "th": "?",  "wh": ":", "ou": "\\", "st": "/"}
var brlSandwich = {"bb": "2", "cc": "3", "ff": "6", "gg": "7", "ea": "1", "tio": ";"}
var head = translate(name);


getIcon = {wall: "wall", custom_wall: "wall", armor_shop: "armor", weapon_shop: "weapon", inn: "inn", monster: "monster", key: "key", door: "door", exit: "door", stairs: "stairs", trigger: "void", shop: "villager", villager: "villager", treasure: "treasure", potion: "potion", "void": "void"}

var customStyle = document.createElement("style");
customStyle.type = 'text/css';
document.getElementsByTagName("head")[0].appendChild(customStyle);
var myStyles = {art: "display: block", level: "display: block;"};



function revertDefaults(){
	var	icons = { player: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<defs><style>.cls-1{fill:currentColor}.cls-1,.cls-2{stroke:currentColor;stroke-miterlimit:10;stroke-width:4px}.cls-2{fill:none}</style></defs>' + '<g><g id="Layer_1"><rect class="cls-2" x="32.6" y="38.8" width="2.4" height="31.2" transform="translate(-28.5 39.8) rotate(-45)"/>' + '<path class="cls-1" d="M16.7,81.5c-2.8,2.8-7.2,2.8-10,0-2.8-2.8-2.8-7.2,0-10,1.7-1.7,3.9-2.3,6.1-2l14.2-14.2,5.9,5.9-14.2,14.2c.3,2.1-.3,4.4-2,6.1Z"/>' + '<polygon class="cls-2" points="79.2 18.2 42.3 55.1 33.1 45.8 70 9 83.6 4.6 79.2 18.2"/>' + '<path class="cls-2" d="M44.8-.6"/>' + '</g></g></svg>' , wall: `<svg viewBox="0 0 88.19 88.19" aria-hidden="true" focusable="false"> <rect x="1" y="1" width="86.19" height="86.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="65.64" x2="87.19" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="44.09" x2="87.19" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="1" y1="22.55" x2="87.19" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="33.93" y1="1" x2="33.93" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="64.74" y1="1" x2="64.74" y2="22.55" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="12.59" y1="22.55" x2="12.59" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="44.69" y1="22.55" x2="44.69" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="79.26" y1="22.55" x2="79.26" y2="44.09" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="19.41" y1="44.09" x2="19.41" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="53.48" y1="44.09" x2="53.48" y2="65.64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="71.85" y1="65.64" x2="71.85" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <line x1="30.07" y1="65.64" x2="30.07" y2="87.19" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M21.73,23.25c.57,2.12,3.27,3.14,3.81,5.27.37,1.46-.38,3.19.48,4.43.32.46.81.76,1.25,1.11,1.38,1.07,2.38,2.64,2.75,4.35" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M70.94,51.36c.69-2.36,2.19-4.47,4.18-5.9.55.04.73.08,1.27.13.44.04.88.07,1.31-.03s.84-.36,1.01-.76" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M47.63,87.2c-.55-2.12-1.3-4.18-2.24-6.16" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M73.03,1.7c.92,2.16,2.6,4.86,3.51,7.02" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M12.4,1.37c.52,2.3-.47,5.69-2.26,7.23" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> <path d="M10.89,5.91l3.37,2.03c.17.69.68,1.3,1.33,1.59" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/> </svg>`, monster: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<g stroke="currentColor" stroke-miterlimit="10" stroke-width="4" fill="none">' + '<path d="M77.9,37.4c0,11.5-5.7,21.7-14.5,27.8v18.2H24.8v-18.2c-8.8-6.1-14.5-16.3-14.5-27.8C10.3,18.7,25.4,3.6,44.1,3.6s33.8,15.1,33.8,33.8Z"/>' + '<polyline points="63.4 72.9 63.4 83.4 24.8 83.4 24.8 72.9"/>' + '<line x1="53.8" y1="72.9" x2="53.8" y2="83.4"/>' + '<line x1="44.1" y1="72.9" x2="44.1" y2="83.4"/>' + '<line x1="34.4" y1="72.9" x2="34.4" y2="83.4"/>' + '</g>' + '<g fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="4">' + '<path d="M25.9,31.9c0-2.4,2.1-5.3,4.3-4.3s3.1,2.2,4.3,4.3-1.9,4.3-4.3,4.3-4.3-1.9-4.3-4.3Z"/>' + '<path d="M62.3,31.9c0-2.4-2.1-5.3-4.3-4.3s-3.1,2.2-4.3,4.3,1.9,4.3,4.3,4.3,4.3-1.9,4.3-4.3Z"/>' + '<path d="M42.7,43.5l-1.5,2.6c-.6,1.1.2,2.5,1.4,2.5h3c1.3,0,2-1.4,1.4-2.5l-1.5-2.6c-.6-1.1-2.2-1.1-2.8,0Z"/>' + '</g>' + '</svg>', treasure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M52,34.7c-.5.9-1.3,1.3-2.3,2.1l4.1,11.4h-19.6,0c0,0,4.1-11.4,4.1-11.4-.7-.6-1.3-1.3-1.8-2.1H3.5v46.1h81.2v-46.1h-32.7Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '<path d="M44,21.3c4.9,0,8.8,3.9,8.8,8.8s0,1.6-.1,2.2h31.9v-9.9c0-8.3-6.7-15-15-15H18.5c-8.3,0-15,6.7-15,15v9.9h32c-.2-.7-.3-1.4-.3-2.2,0-4.9,3.9-8.8,8.8-8.8Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '</svg>', door: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false">' + '<g fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10">' + '<rect x="15.8" y="3.2" width="56.7" height="81.8"/>' + '<circle cx="62.1" cy="46.9" r="4.6"/>' + '</g>' + '</svg>', key: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M31,15.9c-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6,6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7Z" fill="none"/>' + '<path d="M85,69.1L34,26.9c2-3.2,3.3-6.5,3.9-9.7,1-5.4-.1-9.8-3.3-12.4-1.9-1.5-4.1-2.3-6.7-2.3-5.8,0-12.8,3.9-18.6,10.9C1.1,23.4-.5,34.8,5.6,39.9c1.9,1.5,4.1,2.3,6.7,2.3,4.6,0,10-2.5,14.9-7l38.6,31.9-6.1,7.4c-.5.6-.4,1.4.2,1.9l1.7,1.4c.6.5,1.4.4,1.9-.2l6.1-7.4,6.6,5.5-6.1,7.4c-.4.5-.4,1.3.2,1.8l1.3,1.1c.5.4,1.3.4,1.8-.2l11.9-14.4c.6-.7.5-1.7-.2-2.2ZM14.7,17.9c6.1-7.4,13.2-9.5,15.4-7.7,1.1.9,1.4,3,.9,5.7-.7,3.4-2.7,7.4-5.6,10.9-6.1,7.4-13.2,9.5-15.4,7.7-2.2-1.8-1.5-9.2,4.7-16.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/>' + '</svg>', potion: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" aria-hidden="true" focusable="false">' + '<path d="M68.2,65c0,10.8-10.8,19.5-24.1,19.5s-24.1-8.7-24.1-19.5c0-8.7,7-16.1,16.7-18.6V5.7h14.8v40.8c9.7,2.5,16.7,9.9,16.7,18.6Z"' + ' fill="currentColor" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '<path d="M44.1,5.7c-5.1,0-9.2-.5-9.2-1s4.1-1,9.2-1,9.2.5,9.2,1-4.1,1-9.2,1Z"' + ' fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10"/>' + '</svg>', weapon:"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M49.8,21.7c-13.7,15.8-27.5,31.6-41.2,47.4-.4.5-.8,1.1-1,1.7-.4,1.4,0,2.4,1.4,3.2.9.5,2.2.3,3.1-.6.2-.2.4-.4.6-.6,13.8-15.8,27.5-31.7,41.3-47.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M76.9,36.4c-3.5,5.4-8,9.5-13.7,12.4-5,2.6-10.4,3.6-16.1,1.8.6-.6,1.2-1.2,1.8-1.7,2.8-2.4,5.3-5,7.3-8.1,1.7-2.7,3.2-5.5,3.1-8.8v-.7c-.4-2.4-1.7-4.3-3.6-5.7l5-6c.4-.2.8-.2,1.5,0,3.9,1.2,7.8,1.3,11.2-1.5,1.4-1.2,2.5-2.8,3.7-4.2,0,0,0,0,0,0,0,0,0,0,.2,0,1.1,1.8,2,3.8,2.5,5.8,1.4,6,.4,11.5-2.9,16.7h0Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M55.7,25.5c1.9,1.4,3.2,3.3,3.6,5.7v.7c.2,3.4-1.3,6.2-3,8.8-2,3.1-4.5,5.7-7.3,8.1-.6.5-1.1,1.1-1.8,1.7,5.7,1.8,11.1.8,16.1-1.8,5.6-2.9,10.2-7.1,13.7-12.4,3.3-5.2,4.3-10.7,2.9-16.7-.5-2.1-1.3-4-2.5-5.8,0,0-.1,0-.2,0s0,0,0,0c-1.2,1.4-2.3,3-3.7,4.2-3.4,2.8-7.3,2.8-11.2,1.5-.7-.2-1.1-.2-1.5,0-.3.1-.5.3-.8.6-1.6,1.9-3.3,3.8-5,5.7l-5.8-5,6.3-7.3c1.7,1.5,3.3,2.9,4.9,4.3.4.3.8.6.5,1.3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <circle id=\"Filll\" cx=\"55.4\" cy=\"19.7\" r=\"3.5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></circle>\n <path id=\"Filll-2\" data-name=\"Filll\" d=\"M55.4,13.7c3.3,0,6,2.7,6,6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", armor: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88 88\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Fills\" style='opacity: 0.5;' stroke='none' fill='currentColor'>\n <path d=\"M20,29.2c0,3.2,0,6.4.6,9.5.2,1.1.4,2.2.6,3.3h22.9V15.2h0c-.4,0-.8,0-1.2,0-3.2.9-6.3,1.7-9.5,2.6-3.8,1.1-7.5,2.2-11.3,3.3-.8.2-1.2.7-1.4,1.5-.4,2.1-.7,4.3-.7,6.5h0Z\"></path>\n <path d=\"M44.1,71.5h0c.3.1.5,0,.8,0,1-.5,2.1-.9,3-1.5,4.2-2.5,7.7-5.8,10.7-9.6,3.6-4.6,6.2-9.8,7.7-15.5.3-.9.5-1.9.7-2.8h-22.9v29.5h0Z\"></path>\n </g>\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M44.1,15.2c.8-.3,1.6.1,2.4.3,4.3,1.2,8.6,2.5,12.9,3.8,2.2.6,4.5,1.2,6.7,1.8.8.2,1.3.9,1.4,1.6.2,1.5.4,3.1.5,4.7.1,2.1.2,4.2.1,6.3,0,1.5-.3,3-.5,4.5-.1,1.2-.4,2.5-.6,3.7-.2.9-.4,1.9-.7,2.8-1.5,5.7-4.1,10.8-7.7,15.5-3,3.8-6.5,7.1-10.7,9.6-1,.6-2,1-3,1.5-.3.1-.5.2-.8.2s-.7-.1-1.1-.3c-3.3-1.5-6.1-3.5-8.7-5.9-3.4-3.1-6.2-6.7-8.4-10.6-1.9-3.4-3.3-6.9-4.2-10.7-.2-.7-.3-1.4-.4-2.1-.2-1.1-.4-2.2-.6-3.3-.6-3.2-.6-6.3-.6-9.5,0-2.2.3-4.4.7-6.5.2-.8.6-1.3,1.4-1.5,3.8-1.1,7.5-2.2,11.3-3.3,3.1-.9,6.3-1.8,9.5-2.6.4-.1.8,0,1.2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M44.1,15.3v56.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M45,7.6c1.4.4,2.7.8,4.1,1.2,2.4.7,4.9,1.4,7.3,2.1,2.8.8,5.6,1.6,8.4,2.4,2.2.6,4.4,1.3,6.6,1.9.8.2,1.6.3,2.2,1,.6.7.6,1.6.7,2.4.3,1.8.6,3.7.6,5.6.1,1.9,0,3.9,0,5.8s0,.6,0,.9c-.1,1.6-.2,3.2-.4,4.7-.2,1.6-.3,3.3-.7,4.9-.5,2.3-1.1,4.6-1.7,6.9-.7,2.8-1.7,5.4-3,8-1.4,2.8-3,5.6-4.8,8.2-2.6,3.6-5.5,6.9-8.8,9.8-2.9,2.6-6.1,4.7-9.6,6.4-.2.1-.4.2-.7.3-.9.5-1.8.4-2.8,0-3.6-1.7-6.8-3.8-9.8-6.4-2.6-2.2-4.9-4.5-7-7.2-2.4-3-4.5-6.3-6.3-9.7-1.9-3.8-3.4-7.7-4.4-11.8-.4-1.7-.8-3.4-1.2-5.1-.3-1.3-.4-2.6-.5-3.9-.4-3.1-.6-6.3-.5-9.5,0-1.5,0-3,.3-4.5.2-1.7.5-3.4.8-5.1.2-1,.9-1.5,1.8-1.8,1.7-.5,3.5-1,5.2-1.5,2.7-.8,5.5-1.6,8.2-2.4,3.2-.9,6.3-1.8,9.5-2.7,1.4-.4,2.9-.9,4.3-1.2.6-.1,1.4,0,2,0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <polyline points=\"66.9 42 44.1 42 21.2 42\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></polyline>\n </g>\n </g>\n </g>\n </g>\n</svg>", inn: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 62.55 56.26\">\n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" d=\"M55.07,34.69c-6.57,8.54-15.36,15.02-23.79,21.57-8.44-6.55-17.23-13.03-23.8-21.57C1.5,26.92-3.44,15.54,3.11,6.55,10.06-2.99,24.82-1.93,30.27,8.54c.36.7.59,1.57.94,2.24l.07.14.07-.14c.34-.67.57-1.54.94-2.24,5.45-10.47,20.21-11.53,27.15-1.99,6.56,8.99,1.62,20.37-4.37,28.14Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n</svg>", villager: "<svg id=\"Layer_2\" data-name=\"Layer 2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 88 88\">\n \n <path style=\" scale: 0.9; transform: translate(4px, 4px);\" id=\"path966\" d=\"M69.79,80.5c-2.54-25.58-6.66-33.2-13.41-37.4-6.8-.3-15.35,0-23.63,0-7.33,3.9-11.78,11.65-14.55,37.4h51.59Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path id=\"path710\" d=\"M59.43,22.93c0,8.52-6.91,15.43-15.43,15.43s-15.43-6.91-15.43-15.43,6.91-15.43,15.43-15.43,15.43,6.91,15.43,15.43Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <line x1=\"60.48\" y1=\"80.5\" x2=\"56.9\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n <line x1=\"27.61\" y1=\"80.5\" x2=\"31.34\" y2=\"62.96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></line>\n</svg>", void: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 88.2 88.2\">\n \n <!-- Generator: Adobe Illustrator 28.7.10, SVG Export Plug-In . SVG Version: 1.2.0 Build 236) -->\n <g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <g id=\"Layer_1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\">\n <path d=\"M86.4,54.4c.9-2.3.6-4.8.3-7.3-1-7.2-2-14.4-3-21.5-.3-2.5-.7-5-2.3-7-2.6-3.2-7.9-3.8-9.7-7.6-.8-1.7-.8-3.7-1.7-5.3-.9-1.5-2.4-2.4-4-3.2-2-1-4.2-1.9-6.4-1.8-3.1.2-5.9,2.3-9,2.6-3,.3-5.8-1.1-8.6-2s-6.3-1.3-8.5.7c-.9.8-1.5,2-2.5,2.9-2.2,2-5.5,1.9-8.4,1.9-4.7,0-9.9.7-13.3,4-3.1,3-4,7.5-4.2,11.8s.4,8.6-.3,12.8c-.6,3.5-1.9,6.8-2.8,10.3s-1.2,7.2.2,10.5c1.6,3.5,5,5.9,6.7,9.3,1.8,3.6,1.5,7.9,3,11.5,2.2,5,8.1,8,13.4,6.9,2.8-.6,5.7-2.2,8.4-1.2,1.9.7,3.1,2.6,4.8,3.7,3.2,2.1,7.5.9,11-.7s7-3.8,10.8-3.5c2.1.2,4.1,1.1,6.3,1.1,2.6,0,5.2-1.3,6.6-3.5,1.5-2.4,1.9-5.2,3.5-7.6s2.9-3.3,3.6-5.6.7-3.6,1.5-5.3c1.2-2.5,3.5-4.3,4.6-6.9Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M12.1,52.5c-.8-2.5,1-5.1,1.2-7.6.6-3.8-.7-7.9-2.4-11.1-.5-1-1-2.1-1-3.1.3-3.2,4.5-3.7,6.7-5.2,2.9-1.5,5.8-4,7.9-6.7,1.6-1.8,2.7-4.3,5.1-5,2.9-.7,5.8-.2,8.7-.2,6,.4,12.6-1.3,18.2-2.7,2-.4,5.1-1.1,6.7,0,2,2.1,2.5,5.9,3.4,8.6.8,3.3,3.8,7.7,7,10.5,1.4,1.4,1.8,3,1.6,4.9-.2,3,.1,6.8,1.5,9.9.7,2.4,3.1,4.4,3.2,7-.6,2.5-4.1,3.9-5.5,6.1-1.7,2.2-2.7,4.5-3.3,6.6-.5,1.5-1.2,3.1-2.5,4.1-3.9,2.1-8.6,3.5-14.4,5.9-3.4,1.2-5.3,2.7-8.6,2.9-2.9-.2-6.6-2.2-10-2.3-4.4,0-8.3-1.8-12.8-2.8-2.2-.6-2.4-2.8-2.7-4.7-.6-3.2-2.1-6.5-3.8-9-1.3-2.1-3.3-3.7-4.2-6v-.2Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n <path d=\"M28.9,60.3c-.6-.7-1-1.6-1.4-2.5-1.2-2.8-2.8-5.3-4.9-7.6-1.2-1.3-2.9-2.6-2.2-4.6,1.1-3,2.3-6,2.8-9.2.4-4.7,1.7-5.3,5.4-7.3,4.7-2.8,8.8-6.5,12.1-9.9.9-.9,2-1.3,3.2-.6,3.4,2.6,7.5,4.8,11.4,5.9,1.5.4,2.8,1.2,3.7,2.5,1.8,2.5,4.2,5.3,6.7,7.2,1.6,1.1,2.1,2.9,1.9,4.8-.1,2.3,0,4.7.3,6.6.3,1.5.3,3.1-.6,4.5-2,2.8-4.1,5.5-6.2,8.5-1.5,2.1-2.8,4.4-5.5,5-4,.9-7.4,3.4-11.3,4.4-1.6.4-3.1-.2-4.2-1.2-2.7-2.1-5.9-3.9-9.1-5.2-.7-.3-1.4-.7-1.9-1.2h-.1Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"></path>\n </g>\n </g>\n</svg>", stairs: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points="88.1 24 68 24 68 40 52 40 52 56 36 56 36 72 18 72 18 88.1"/> </svg>', stairsD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.2 88.2" style="width: 100%; height: 100%; display: block;" aria-hidden="true" focusable="false"> <polyline fill="none" stroke="currentColor" stroke-width="4" points=".2 24 20.3 24 20.3 40 36.3 40 36.3 56 52.3 56 52.3 72 70.3 72 70.3 88.1"/> </svg>' };
	var myIcons = ["player"];
	var myTypes = [];
	
}

function makeLevelPages(){
	levelNames = Object.keys(levels);

	for(levName of levelNames){
		
		myPage = makePage(levName, head, translate(levName));
		myPage.classList.add("level")
		newTable = makeTable(levels[levName])	
		myPage.appendChild(newTable);
		
	}
	addTypeOptions();
}

function addTypeOptions(){
	myList = document.getElementById("itemList")
	//<li><input  id="inclLevels"  type="checkbox"  /><label for="inclLevels">Levels</label></li>
	myList.innerHTML = "";
	for (type of myTypes){
		myStyles[type] = "display: block; "
		let newLi = document.createElement("li");
		let newInput = document.createElement("input");
		let newLabel = document.createElement("label");
		newLabel.innerHTML = type;
		let myId = "show" + type;
		newInput.setAttribute("id", myId);
		newInput.setAttribute("type", "checkbox");
		newInput.setAttribute("onClick", "toggleType(this)");
		newInput.setAttribute("object", type);
		newLabel.setAttribute("for", myId);
		if(type.includes("wall") || type.includes("stair")){
			newInput.checked = true;
		}
		myList.appendChild(newLi);
		newLi.appendChild(newInput);
		newLi.appendChild(newLabel);
		toggleType(newInput);
	}
	
}

function toggleType(box){
	if(box.checked == true ){
		myStyles[box.getAttribute("object")] = "display: block; "
	}
	else{
		myStyles[box.getAttribute("object")] = "display: none; !important"
	}
	updateStyles()
}

function updateStyles(){
	styleArray = [];
	for(type of myTypes){
		styleArray.push("." + type + " svg { " + myStyles[type] + " }");
	}
	for(page of pageTypes){
		styleArray.push("." + page + "{ " + myStyles[page] + " }");
	}
	
	customStyle.innerHTML = styleArray.join("\n")
}




function makePage(id, header, name = ""){
	newPage = document.createElement("div");
	newPage.setAttribute("class", "page");
	newPage.setAttribute("id", id);
	newHeader = document.createElement("p");
	newHeader.setAttribute("class", "header");
	newHeader.innerHTML = header;
	newPage.appendChild(newHeader);
	myBook.appendChild(newPage);
	if (name != ""){
		newName = document.createElement("p");
		newName.innerHTML = name;
		newPage.appendChild(newName);
	}

	return newPage
}


	


function makeArtPages(){

	var artPage = makePage("art01", artof + " " + head)
		artPage.classList.add("art")
	var iconGrid = document.createElement("div");
		iconGrid.setAttribute("class", "iconGrid");
		artPage.appendChild(iconGrid);

	var iconClasses = ["iconA", "iconB", "iconC", "iconD"];
	let c = 0
		//myIcons
	for( let i = 0; i < myIcons.length; i++){
		//new page every 4 icons
		if(i > 0 && (i/4) === Math.floor(i/4)){
			
			num = Math.floor(i/4)
			num = parseInt(num).toString().padStart(2, '0');
			artPage = makePage("art" + num, artof + " " + head)
			artPage.classList.add("art")
			iconGrid = document.createElement("div");
			iconGrid.setAttribute("class", "iconGrid");
			artPage.appendChild(iconGrid);
		}
		var newCell = document.createElement("div");
		var newName = document.createElement("p");
		if (c > 3){c = 0;}
		newCell.classList.add(iconClasses[c]);
		c += 1;
		newName.innerHTML = translate(myIcons[i]);
		newCell.appendChild(newName);
		newCell.innerHTML += icons[myIcons[i]];
		reduceBlack(newCell.children[1]);
		iconGrid.appendChild(newCell);
	}
}

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
					myType = myThings[getPOS(r, c)].type;
					myThing = myThings[getPOS(r, c)]
					myIcon = getIcon[myType];
					if(myThing.meta && myThing.meta.icon){
						myIcon = myThing.meta.icon;
					}
					myCell.innerHTML = icons[myIcon];
					reduceBlack(myCell.children[0]);
					myCell.classList.add(myType);
					//var myIcons = [];
					//var myTypes = [];
					if(!myIcons.includes(myIcon)){
						myIcons.push(myIcon)
					}
					if(!myTypes.includes(myType)){
						myTypes.push(myType)
					}
				}
			myRow.appendChild(myCell);
		}
		table.appendChild(myRow);
	}
	return table
}

function reduceBlack(vect){
	myPaths = vect.children;
	for (path of myPaths){
		if(path.getAttribute("fill") && path.getAttribute("fill") == "currentColor"){
				path.setAttribute("fill", "#6D6E71");
		}
		if(path.children){reduceBlack(path);}
	}
	
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
	//check for numbers
	translated = translated.replace(/[\d]+/g,  "#" +  "$&");
	if (translated.indexOf("#") != -1) {
		numAt = translated.indexOf("#")
		translated = translated.substring(numAt + 1, -1) + numFix(translated.substring(numAt + 1));
	}
    brlKeys = Object.keys(brlAlways);
	for (key of brlKeys){
		translated = translated.replaceAll(key, brlAlways[key])
	}
	var translated = english.replace(/[A-Z]/g,  "," + "$&".toLowerCase());

	brlKeys = Object.keys(brlWholeWords);
	for (key of brlKeys){
		regex = new RegExp("([\\s\\(\\[\\{\\\"“'‘])" + key + "([\\s\\)\\]\\}\\\"”'’.,;:.!?…])", "g")
		translated = translated.replace(regex, "$1" + brlWholeWords[key] + "$2")
	}
	brlKeys = Object.keys(brlEndings);
	for (key of brlKeys){
		regex = new RegExp("([a-z])" + key + "([\\s\\)\\]\\}\\\"”'’\\.,;:.!?…])", "g")
		translated = translated.replace(regex, "$1" + brlEndings[key] + "$2")
	}
    brlKeys = Object.keys(brlGroupSigns);
	for (key of brlKeys){
		translated = translated.replaceAll(key, brlGroupSigns[key])
	}
    brlKeys = Object.keys(brlSpecHs);
	for (key of brlKeys){
		translated = translated.replaceAll(key, brlSpecHs[key])
	}
	brlKeys = Object.keys(brlSandwich);
	for (key of brlKeys){
		regex = new RegExp("([a-z])" + key + "([a-z])", "g")
		translated = translated.replace(regex, "$1" + brlSandwich[key] + "$2")
	}
	
	
	console.log(english + " --> " + translated)
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

function selectGame(){
	myBook.innerHTML = "";
//
	revertDefaults();
	if(currentGame != ""){
		levels = {};
	}	

	currentGame = gameSelect.value;
	initCustomIcons()
	name = myGames[currentGame]["title"]
	head = translate(name);
	levels = myGames[currentGame].levels;
	makeLevelPages();
	makeArtPages();
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

	demoGame = {"title": "New Game", "levels": levels};	
	myGames["game" + num] = demoGame;
	addGame(num)
	selectGame()
	
}

//<select id="gameSelect">
//<option value="gold">Gold</option>


function addGame(num){
//
	
	let gameId = "game" + num;
	let myOption = document.createElement("option");
	myOption.setAttribute("value", gameId);
	
	myOption.innerHTML = myGames[gameId]["title"];	
	gameSelect.appendChild(myOption)
	
}

getFile("01");


function initCustomIcons(){
	if(myGames[currentGame] && myGames[currentGame]["myIcons"]){
		newIcons = myGames[currentGame]["myIcons"];
		iconNames = Object.keys(newIcons);
		for(icon of iconNames){
			icons[icon] = newIcons[icon];
		}
	}
}