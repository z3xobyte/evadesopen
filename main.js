var canvas = document.getElementById("game");
var context = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height;
var inMenu = true;
var fov = 32;
var keys = [];
var settings = {
  outline: true,
  cooldown: true,
  sandbox: true,
  timerClear: true,
  mouse_toggle: true,
  mouse_deadzone: 3,
  legacy_speed: true,
  anti_cheat: false,
  delay_box: 0,
  death_timer: 3,
  length9113: 0,
  gamepad_deadzone: 0.06,
  gamepad_layout: {up: 12, down: 13, left: 14, right: 15, shift: 0, actionKey: 2, firstAbility: 6, secondAbility: 7, upgrade_speed: -4, upgrade_energy: -1, upgrade_regen: -2, hero_card: 9, minimap: 17}
}
var mousePos = new Vector(0, 0);
var mouse = false;
var delayList = []
var gamepad = undefined;
var scale = 1;
var loaded = false;
var game = new Game();

function loadMain() {
  game.worlds[0] = new World(new Vector(0, 0), 0, centralCore)
  game.worlds[1] = new World(new Vector(0, 80), 1, hauntedHalls)
  game.worlds[2] = new World(new Vector(0, 160), 2, peculiarPyramid)
  game.worlds[3] = new World(new Vector(0, 525), 3, wackyWonderland)
  game.worlds[4] = new World(new Vector(0, 570), 4, glacialGorge)
  game.worlds[5] = new World(new Vector(0, 615), 5, viciousValley)
  game.worlds[6] = new World(new Vector(0, 660), 6, humongousHollow)
  game.worlds[7] = new World(new Vector(0, 705), 7, eliteExpanse);
  game.worlds[8] = new World(new Vector(0, 750), 8, centralCoreHard);
  game.worlds[9] = new World(new Vector(0, 795), 9, dangerousDistrict);
  game.worlds[10] = new World(new Vector(0, 840), 10, quietQuarry);
  game.worlds[11] = new World(new Vector(0, 885), 11, monumentalMigration);
  game.worlds[12] = new World(new Vector(0, 930), 12, ominousOccult);
  game.worlds[13] = new World(new Vector(0, 970), 13, viciousValleyHard);
  game.worlds[14] = new World(new Vector(0, 1015), 14, frozenFjord);
  game.worlds[15] = new World(new Vector(-61, 1465), 15, restlessRidge);
  game.worlds[16] = new World(new Vector(-61, 1365), 16, toxicTerritory);
  game.worlds[17] = new World(new Vector(-61, 1400), 17, magnetic_monopole);
  game.worlds[18] = new World(new Vector(-61, 1440), 18, assorted_alcove);
  game.worlds[19] = new World(new Vector(-61, -15), 19, stellarSquare);
}

function loadHard(){
  game.worlds[0] = new World(new Vector(0, 0), 0, centralCoreFast)
  game.worlds[1] = new World(new Vector(0, 80), 1, hauntedHalls)
  game.worlds[2] = new World(new Vector(0, 160), 2, peculiarPyramid)
  game.worlds[3] = new World(new Vector(0, 525), 3, wackyWonderland)
  game.worlds[4] = new World(new Vector(0, 570), 4, glacialGorge)
  game.worlds[5] = new World(new Vector(0, 615), 5, viciousValley)
  game.worlds[6] = new World(new Vector(0, 660), 6, humongousHollow)
  game.worlds[7] = new World(new Vector(0, 705), 7, eliteExpanse);
  game.worlds[8] = new World(new Vector(0, 750), 8, centralCoreHard);
  game.worlds[9] = new World(new Vector(0, 795), 9, dangerousDistrict);
  game.worlds[10] = new World(new Vector(0, 840), 10, quietQuarry);
  game.worlds[11] = new World(new Vector(0, 885), 11, monumentalMigration);
  game.worlds[12] = new World(new Vector(0, 930), 12, ominousOccult);
  game.worlds[13] = new World(new Vector(0, 970), 13, viciousValleyHard);
  game.worlds[14] = new World(new Vector(0, 1015), 14, frozenFjord);
  game.worlds[15] = new World(new Vector(-61, 1465), 15, restlessRidge);
  game.worlds[16] = new World(new Vector(-61, 1365), 16, toxicTerritory);
  game.worlds[17] = new World(new Vector(-61, 1400), 17, magnetic_monopole);
  game.worlds[18] = new World(new Vector(-61, 1440), 18, assorted_alcoveHard);
  game.worlds[19] = new World(new Vector(-61, -15), 19, stellarSquareHard);
}

function loadSecondary() {
  game.worlds[0] = new World(new Vector(0, 0), 0, transformingTurbidity)
  game.worlds[1] = new World(new Vector(0, 45), 1, unexploredUtopia)
  game.worlds[2] = new World(new Vector(0, 90), 2, littleLandscape)
  game.worlds[3] = new World(new Vector(0, 132), 3, darknessDimension)
  game.worlds[4] = new World(new Vector(0, 177), 4, crowdedCavern)
  game.worlds[5] = new World(new Vector(0, 222), 5, centralCoreImpossible)
  game.worlds[6] = new World(new Vector(0, 267), 6, transformingTurbidityImpossible)
  game.worlds[7] = new World(new Vector(0, 312), 7, elongatingEscalator)
  game.worlds[8] = new World(new Vector(0, 357), 8, ballisticBattlefield)
  game.worlds[9] = new World(new Vector(0, 402), 9, insanityIsle)
  game.worlds[10] = new World(new Vector(0, 447), 10, naturalNightmare)
}
const tiles = new Image();
const hat = new Image();
const gem = new Image();
const magnetDown = new Image();
const magnetUp = new Image();
const pumpkinOn = new Image();
const pumpkinOff = new Image();
const torch = new Image();
const torchUp = new Image();
const flashlight_item = new Image();
const flashlight = new Image();
const warp = new Image();
const paralysis = new Image();
const atonement = new Image();
const depart = new Image();
const flow = new Image();
const harden = new Image();
const bandages = new Image();
const latch = new Image();
const fusion = new Image();
const mortar = new Image();
const night = new Image();
const vengeance = new Image();
const vengeance_projectile = new Image();
const decay = new Image();
const shatter = new Image();
const sweet_tooth = new Image();
const sugar_rush = new Image();
const sweet_tooth_item = new Image();
const gate = new Image();
const distort = new Image();
const energize = new Image();
const heavy_ballon = new Image();
const rejoicing = new Image();
const backtrack = new Image();
const rewind = new Image();
const vigor = new Image();
const stomp = new Image();
const reverse = new Image();
const minimize = new Image();
const resurrection = new Image();
const reanimate = new Image();
var fps=[],fpsS,averageFPS;
var thing = 0.983;
var world = new World(new Vector(0, 0), 0, missingMap);
game.worlds[0] = world;
var tset = 0;
var FPSCUT = 30000000;
var updD = 0;
var tim = 0;
function animate(time) {
  if(!settings.sandbox){
    tim+=1000/30;
    time = tim;
  }
  var progress = time - lastRender;
  if(isActive){
    fps.push(Date.now()-fpsS)
    if(fps.length>10){fps.shift()}
    fpsS = Date.now();
    if(fps.length>=10)averageFPS = (fps.map(i=>x+=i, x=0).reverse()[0])/fps.length;
  } else{fps = [];}
  //if(progress<33||progress>34)
  //if(tset%FPSCUT!=0){
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.fillStyle = "#333";
  context.rect(0, 0, width, height);
  context.fill();
  context.closePath();//}
  if (!inMenu) {
    var input = {}
    input.keys = keys;
    input.mouse = mousePos;
    input.isMouse = mouse;
    gamepad = (settings.delay_box != 0) ? delayList[0] : gamepadInformation(settings.gamepad_layout);
    input.gamepad = gamepad; //Current idea is to store in list where adding to the list is asynchronous but pulling data and removing it is not
    game.inputPlayer(0, input)
    if (progress > 1000) {
      progress = 1000;
    }
    var old = {area:game.players[0].area,world:game.players[0].world};
    game.update(progress * thing);
    //if(tset%FPSCUT!=0){
    var players = game.players;
    var states = game.getStates(0);
    var focus = new Vector(players[0].pos.x, players[0].pos.y);
    var area = (game.worlds[game.players[0].world].areas[game.players[0].area]);
    var wasVictory = area.getActiveBoundary().t;
    var strokeColor = "#425a6d";
    if(area.title_stroke_color){strokeColor=area.title_stroke_color}
    area = (wasVictory) ? "Victory!" : (game.worlds[game.players[0].world].areas[game.players[0].area].name)
    renderArea(states, players, focus, old)
    context.beginPath();
    context.textAlign = "center";
    context.lineWidth = 6;
    context.fillStyle = "#f4faff";
    context.strokeStyle = strokeColor;//"#425a6d";
    context.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
    context.textAlign = "center";
    context.strokeText(game.worlds[game.players[0].world].name + ": " + area, width / 2, 40);
    context.fillText(game.worlds[game.players[0].world].name + ": " + area, width / 2, 40);
    context.closePath();

    if(settings.timer){
      const timerTime = secondsFormat(Math.floor(game.players[0].timer/1000))
      context.beginPath();
      context.textAlign = "center";
      context.lineWidth = 6;
      context.fillStyle = "#f4faff";
      context.strokeStyle = strokeColor;//"#425a6d";
      context.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
      context.textAlign = "center";
      if(game.players[0].victoryTimer>0){
        context.fillStyle = "yellow";
      }
      context.strokeText(timerTime, width / 2, 80);
      context.fillText(timerTime, width / 2, 80);
      context.closePath();
    }
    //
    var world = document.getElementById("world");
    if (world.selectedIndex == 2 && game.players[0].area == 0) {
      var author = "???"
      if (states.name == "Transforming Turbidity") {
        author = "DD1";
      }
      if (states.name == "Unexplored Utopia") {
        author = "Marko";
      }
      if (states.name == "Little Landscape") {
        author = "Rc";
      }
      if (states.name == "Darkness Dimension") {
        author = "XScienceMasterX";
      }
      if (states.name == "Crowded Cavern") {
        author = "fAtKiD";
      }
      if (states.name == "Central Core Impossible") {
        author = "Pentagonis, REALLY IMPOSSIBLE";
      }
      if (states.name == "Transforming Turbidity Impossible") {
        author = "haha0201. For your sanity click R four times.";
      }
      if (states.name == "Elongating Escalators") {
        author = "Darklight";
      }
      if (states.name == "Ballistic Battlefield") {
        author = "Strat";
      }
      if (states.name == "Insanity Isle") {
        author = "Manticore";
      }
      if (states.name == "Natural Nightmare") {
        author = "HIJ";
      }
      context.beginPath();
      context.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
      context.textAlign = "center";
      context.lineWidth = 5,
      context.strokeStyle = "#006b2c",
      context.fillStyle = "#00ff6b",
      context.strokeText("made by " + author, width / 2, height - 120);
      context.fillText("made by " + author, width / 2, height - 120);
      context.closePath();
    }

    if(game.worlds[game.players[0].world].areas[game.players[0].area].text){
      const text = game.worlds[game.players[0].world].areas[game.players[0].area].text;
      context.beginPath();
      context.font = "bold " + 25 + "px Tahoma, Verdana, Segoe, sans-serif";
      context.textAlign = "center";
      context.lineWidth = 5,
      context.strokeStyle = "#006b2c",
      context.fillStyle = "#00ff6b",
      context.strokeText(text, width / 2, height - 120);
      context.fillText(text, width / 2, height - 120);
      context.closePath();
    }
    if (world.selectedIndex == 1 && game.players[0].area == 1 && game.players[0].world == 3) {
      context.beginPath();
      context.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
      context.textAlign = "center";
      context.lineWidth = 5,
        context.strokeStyle = "#006b2c",
        context.fillStyle = "#00ff6b",
        context.strokeText("this map has 120 areas... make sure you have time :D", width / 2, height - 120);
      context.fillText("this map has 120 areas... make sure you have time :D", width / 2, height - 120);
      context.closePath();
    }
    if (world.selectedIndex == 3 && !loaded) {
      context.beginPath();
      context.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
      context.textAlign = "center";
      context.lineWidth = 5,
        context.strokeStyle = "#006b2c",
        context.fillStyle = "#00ff6b",
        context.strokeText("this is to import a map, top left in the menu", width / 2, height - 120);
      context.fillText("this is to import a map, top left in the menu", width / 2, height - 120);
      context.closePath();
    }//}
  }
  lastRender = time
  if(settings.sandbox)window.requestAnimationFrame(animate);
}
var lastRender = 0;
//setInterval(animate,1000/30)
//console.log(settings.sandbox)
//window.requestAnimationFrame(animate);

function startAnimation(){
  Delay = settings.delay_box

  if(settings.sandbox){
    window.requestAnimationFrame(animate);
  } else {setInterval(animate,1000/30)}
}

if(!window.localStorage.hat){window.localStorage.hat = "Gold"};document.getElementById("wreath").value = window.localStorage.hat;
if(window.localStorage.nick){document.getElementById("nick").value = window.localStorage.nick}
//setInterval(/*gamepad = gamepadInformation(settings.gamepadLayout);*/ console.log("hi"), 3)
/* Bugs
 - Upon entering MM2 you get magnet which should not be possible
 - MM2 1 does not connect to MM2 2
 - Candy: Sugar Rush + Soul Snipers () does not work as intended 
*/