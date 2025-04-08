let Delay = 0;
let isActive = true;

window.onresize = function() {
  var winw = window.innerWidth;
  var winh = window.innerHeight;
  var xvalue = winw / width;
  var yvalue = winh / height;
  scale = xvalue;
  if (yvalue < xvalue) {
    scale = yvalue
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = (winw - width) / 2 + "px";
  canvas.style.top = (winh - height) / 2 + "px";
};
window.onload = function() {
  var winw = window.innerWidth;
  var winh = window.innerHeight;
  var xvalue = winw / width;
  var yvalue = winh / height;
  scale = xvalue;
  if (yvalue < xvalue) {
    scale = yvalue
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = (winw - width) / 2 + "px";
  canvas.style.top = (winh - height) / 2 + "px";
  
  //For the below they are changing each setting to previous options from refresh
  //const sandbox = document.getElementById('sandbox')
  const timer = document.getElementById("timer")
  const tiles = document.getElementById("tiles")
  const dev = document.getElementById("dev")
  const no_points = document.getElementById("no_points")
  const mouse_toggle = document.getElementById("mouse_toggle")
  const mouse_deadzone = document.getElementById("mouse_deadzone")
  const gamepad_deadzone = document.getElementById("gamepad_deadzone")
  const anti_cheat = document.getElementById("anti_cheat")
  const length9113 = document.getElementById('9113');
  const delay_box = document.getElementById("delay_box")
  const legacy_speed = document.getElementById("legacy_speed")
  
  sandbox.checked = settings.sandbox;
  if(localStorage.sandbox == 'false'){
    sandbox.checked = false;
    settings.sandbox = false;
  } else {sandbox.checked = true;}
  
 
  if(localStorage.timer == 'true'){timer.checked = true;}
  else {timer.checked = false;}
  
  if(localStorage.tiles == 'false'){tiles.checked = false;}
  else {tiles.checked = true;}
 
  if(localStorage.dev == 'false' || typeof localStorage.dev != "string"){dev.checked = false;}
  else {dev.checked = true;}
  
  if(localStorage.no_points == 'false' || typeof localStorage.no_points != "string"){no_points.checked = false;}
  else {no_points.checked = true;}
  
  if(localStorage.mouse_toggle == 'true' || typeof localStorage.mouse_toggle != "string"){mouse_toggle.checked = true;}
  else {mouse_toggle.checked = false;}

  if (localStorage.mouse_deadzone == undefined){mouse_deadzone.value = settings.mouse_deadzone}
  else{mouse_deadzone.value = localStorage.mouse_deadzone }

  if (localStorage.gamepad_deadzone == undefined){gamepad_deadzone.value = settings.gamepad_deadzone}
  else{gamepad_deadzone.value = localStorage.gamepad_deadzone }
  
  if(localStorage.legacy_speed == 'true' || typeof localStorage.legacy_speed != "string"){legacy_speed.checked = true;}
  else {legacy_speed.checked = false;}
  
  if (localStorage.anti_cheat == 'false' || typeof localStorage.anti_cheat != "string") {anti_cheat.checked = false;}
  else {anti_cheat.checked = true;}

  if (localStorage.length9113 == undefined){length9113.value = settings.length9113}
  else{length9113.value = localStorage.length9113}

  if (localStorage.delay_box == undefined){delay_box.value = settings.delay_box}
  else{delay_box.value = localStorage.delay_box ; Delay = localStorage.delay_box}
}
document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);

let toggleUI = true;
let toggleMinimap = true;

function keydown(e) {
  const player = game.players[0];
  setTimeout(()=>{
  keys[e.keyCode] = true;

  //Extra Functions  
  if (e.keyCode == 84 && !settings.anti_cheat) { //(t) go forward by one area
    player.hasCheated = true;
    player.area++
    if (player.area>=game.worlds[player.world].areas.length-1) {
      player.area=game.worlds[player.world].areas.length-1
    }
    game.worlds[player.world].areas[player.area].load();
    canv = null;
  }
  if (e.keyCode == 82 && !settings.anti_cheat) { // (r) go forward by 10 areas
    player.hasCheated = true;
    player.area = Number(player.area) + 10;
    if (player.area>=game.worlds[player.world].areas.length-1) {
      player.area=game.worlds[player.world].areas.length-1
    }
    game.worlds[player.world].areas[player.area].load();
    canv = null;
  }
  if (e.keyCode == 69 && !settings.anti_cheat) { // (e) go back by 1 area
    player.hasCheated = true;
    player.area = Number(player.area) - 1;
    if (player.area<0) {
      player.area=0;
    }
    game.worlds[player.world].areas[player.area].load();
    canv = null;
  }
  if (e.keyCode == 86 && !settings.anti_cheat) { // (v) turn on god mode
    player.hasCheated = true;
    player.god = !player.god;
  }
  if (e.keyCode == 78 && !settings.anti_cheat) { // (b) go through walls (not the enemy)
    player.hasCheated = true;
    player.wallGod = !player.wallGod;
  }
  if (e.keyCode == 219 && settings.dev) {
    player.safePoint = {world:player.world,area:player.area,pos:{x:player.pos.x,y:player.pos.y}};
    player.safeAmount++;
  }
  if (e.keyCode == 221 && settings.dev) {
    player.safePoint = undefined;
  }
  if (e.keyCode == 220 && settings.dev && player.safePoint) {
    returnToSafePoint(player);
    player.lives = 3;
    player.victoryTimer = 0;
    canv = null;
  }
  if (e.keyCode == 79 && settings.dev) {
    player.timer = 0;
    player.victoryTimer = 0;
  }
  if (e.keyCode == 80 && settings.dev) {
    settings.timerClear = !settings.timerClear;
  }
  if (e.keyCode == 66 && !settings.anti_cheat) { // ()
    player.hasCheated = true;
    settings.cooldown = !settings.cooldown;
  }
  if (e.keyCode == 72){ // (h)
    toggleUI = !toggleUI;
  }
  if (e.keyCode == 77 || e.keyCode == 9){ // (e/m)
    toggleMinimap = !toggleMinimap;
  }
  },Delay)
  if (e.keyCode == 9){
    e.preventDefault()
  }
  
}

function keyup(e) {
  const player = game.players[0];
  setTimeout(()=>{
    delete keys[e.keyCode];
  },Delay);
}
window.onblur = function() {
  keys = [];
};



document.getElementById("infoBtn").onclick = function(){
  let creditsOverlay = document.getElementById("infoOverlay")
  creditsOverlay.style.display = "block";
  setTimeout(() => {
    creditsOverlay.style.opacity = 1; 
  }, 460)
}

document.getElementById("infoOverlay").onclick = function(){
  this.style.opacity = 0;
  setTimeout(() => {
    this.style.display = "none";
  }, 460)
}


document.getElementById("hero").value = (typeof window.localStorage.hero === 'string') ? window.localStorage.hero : 'Normal';
var enterGame = document.getElementById("connect");
enterGame.onclick = function() {
  window.localStorage.hero = document.getElementById("hero").value;
  window.localStorage.hat = document.getElementById("wreath").value;
  switch(document.getElementById("wreath").value){
    case"Gold":hat.src="https://media.discordapp.net/attachments/1223018334904258630/1359172468228493332/adofishpasidf.png?ex=67f68380&is=67f53200&hm=12b1d3eecc3071cac9178f18f1a7046eda62ec8b4907237ad6a32b56670a7866&=&format=webp&quality=lossless";
    break;
    case"Spring":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/spring-wreath.png?v=1704653750134";
    break;
    case"Autumn":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/autumn-wreath.png?v=1704653737193";
    break;
    case"Winter":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/winter-wreath2.png?v=1704653759711";
    break;
    case"Summer":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/summer-wreath.png?v=1704653751901";
    break;
    case"Halo":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/halo.png?v=1704653743589";
    break;
    case"Santa Hat":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/santa-hat.png?v=1704653749192";
    break;
    case"Blue Santa Hat":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/blue-santa-hat.png?v=1704653738511";
    break;
    case"Gold Crown":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/gold-crown.png?v=1704653742928";
    break;
    case"Silver Crown":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/silver-crown.png?v=1704653749829";
    break;
    case"Bronze Crown":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/bronze-crown.png?v=1704653738836";
    break;
    case"Stars":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/stars.png?v=1704653750518";
    break;
    case"Flames":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/flames.png?v=1704653740503";
    break;
    case"Blue Flames":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/blue-flames.png?v=1704653738179";
    break;
    case"Orbit Ring":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/orbit-ring.png?v=1704653747059";
    break;
    case"Sticky Coat":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/sticky-coat.png?v=1704653750852";
    break;
    case"Toxic Coat":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/toxic-coat.png?v=1704653755881";
    break;
    case"Legacy Hat":hat.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/legacy-hat.png?v=1704653744901";
    break;
  }

  const timer = document.getElementById('timer');
  settings.timer = timer.checked;
  localStorage.timer = timer.checked;
  
  const tiles = document.getElementById('tiles');
  settings.tiles = tiles.checked;
  localStorage.tiles = tiles.checked;
  
  const dev = document.getElementById('dev');
  settings.dev = dev.checked;
  localStorage.dev = dev.checked;
  
  const no_points = document.getElementById('no_points');
  settings.no_points = no_points.checked;
  localStorage.no_points = no_points.checked;
  
  const mouse_toggle = document.getElementById('mouse_toggle');
  settings.mouse_toggle = mouse_toggle.checked;
  localStorage.mouse_toggle = mouse_toggle.checked;
  
  const mouse_deadzone = Number(document.getElementById('mouse_deadzone').value);
  settings.mouse_deadzone = mouse_deadzone;
  localStorage.mouse_deadzone = mouse_deadzone;

  const gamepad_deadzone = Number(document.getElementById('gamepad_deadzone').value);
  settings.gamepad_deadzone = gamepad_deadzone;
  localStorage.gamepad_deadzone = gamepad_deadzone;
  
  const legacy_speed = document.getElementById('legacy_speed');
  settings.legacy_speed = legacy_speed.checked;
  localStorage.legacy_speed = legacy_speed.checked;
  
  const anti_cheat = document.getElementById('anti_cheat');
  settings.anti_cheat = anti_cheat.checked;
  localStorage.anti_cheat = anti_cheat.checked;

  const length9113 = Number(document.getElementById('9113').value);
  settings.length9113 = length9113;
  localStorage.length9113 = length9113;

  const delay_box = Number(document.getElementById('delay_box').value);
  settings.delay_box = delay_box;
  localStorage.delay_box = delay_box;

  menu.style.display = "none";
  gamed.style.display = "inline-block";
  inMenu = false;
  var world = document.getElementById("world");
  var hero = document.getElementById("hero");
  
  if (world.selectedIndex == 0) {
    loadMain();
  }
  if (world.selectedIndex == 1) {
    loadHard()
  }
  else if (world.selectedIndex == 2) {
    loadSecondary()
  }
  else if (world.selectedIndex == 3) {
    //loadThird();
  }

  const player = new [Basic, Magmax, Rime, Aurora, Necro, Brute, Shade, Chrono, Reaper, Rameses, Cent, Jotunn, Candy, Burst, Lantern, Pole, Polygon, Clown, Poop][hero.selectedIndex](new Vector(Math.random() * 7 + 2.5, Math.random() * 10 + 2.5), (settings.no_points)? 5 : 17);
  game.players.push(player)
  
  
  loadImages(game.players[0].className);
  game.worlds[0].areas[0].load();
  startAnimation()
}
document.addEventListener("mousemove", Pos, false);


function Pos(p) {
  setTimeout(()=>{var t = canvas.getBoundingClientRect();
  mousePos = new Vector((p.pageX - t.left) / scale, (p.pageY - t.top) / scale)},Delay)
};

document.onmousedown = function(e) {
  setTimeout(() =>{
    if (e.buttons == 1) {
      if (!inMenu) {
        mouse = !mouse;
      }
    }
  }, Delay)
};

document.onmouseup = function(e) {
  if (!settings.mouse_toggle&&!inMenu)mouse = !mouse;
};

var minimapPressed = false
var heroCardPressed = false
window.addEventListener("gamepadconnected", (e) => {  
  let gamepadElements = document.getElementsByClassName("gamepad")

  for (let i = 0; i < gamepadElements.length ; i++){
    gamepadElements[i].hidden = false;
  }

  if (settings.delay_box != 0){
    setInterval(() => {
      delayList.push(gamepadInformation(settings.gamepad_layout))
    }, 1000/30);
  
    setTimeout(() => {
      setInterval(() => {
        if (delayList.length > 2){
          delayList.shift();
        }
        
      }, 1000/30);
    }, Delay);
  }
});

window.addEventListener("gamepaddisconnected", (e) => {
  let gamepadElements = document.getElementsByClassName("gamepad")

  for (let i = 0; i < gamepadElements.length ; i++){
    gamepadElements[i].hidden = true;
  }
});

function gamepadToggle(){
  if (gamepad != undefined){
    if (gamepad.minimap && !minimapPressed){
      toggleMinimap = !toggleMinimap;
      minimapPressed = true;
    }
    if (gamepad.hero_card && !heroCardPressed){
      toggleUI = !toggleUI;
      heroCardPressed = true;
    }
    if (!gamepad.minimap){
      minimapPressed = false;
    }
    if (!gamepad.hero_card){
      heroCardPressed = false;
    }
  }
}

function gamepadInformation(layout){
  const gamepad = navigator.getGamepads()[0]
  if (gamepad == undefined){
    return undefined
  }

  let keys = {
    axes: gamepad.axes,
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,
    actionKey: false,
    firstAbility: false,
    secondAbility: false,
    upgrade_speed: false,
    upgrade_energy: false,
    upgrade_regen: false,
    hero_card: false,
    minimap: false
  }

  //Finding out which keys are pressed
  for (const action in layout) { //Key
    if (Object.hasOwnProperty.call(layout, action)) { //Value
      const button = Number(layout[action]);
      
      if (button > -1){ //Button
        if (button == 6 || button == 8){ //Triggers
          keys[action] = (gamepad.buttons[button].value > 0.5) ? true : false
        }
        else{
          keys[action] = gamepad.buttons[button].pressed
        }
      }
      else{ //Axes, though only used for right stick
        switch (button){
          case -1: // Up
            if (gamepad.axes[3] < -0.5){
              keys[action] = true;
            }
            else{
              keys[action] = false;
            }
            break;
          case -2: //Right
            if (gamepad.axes[2] > 0.5){
              keys[action] = true;
            }
            else{
              keys[action] = false;
            }
            break;
          case -3: //Down
            if (gamepad.axes[3] > 0.5){
              keys[action] = true;
            }
            else{
              keys[action] = false;
            }
            break;
          case -4: //Left
            if (gamepad.axes[2] < -0.5){
              keys[action] = true;
            }
            else{
              keys[action] = false;
            }
            break;
        }
      }
    }
  }

  gamepadToggle()
  return keys
}

/* Info
  axes[
    0: left stick horizontal (1 = right)
    1: left stick vertical (1 = down)
    2: right stick horizontal (1 = right)
    3: rightstick vertical (1 = down)
  ]

  buttons[
    0: X
    1: Circle
    2: Square
    3 Triangle
    4: L1
    5: R1
    6: L2
    7: R2
    8: Share
    9: Options
    10: L3
    11: R3
    12: Dpad-up
    13: Dpad-down
    14: Dpad-left
    15: Dpad-right
    16: psButton
    17: Touchpad
  ]
*/


var inputElement = document.getElementById("load");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  loaded = true;
  var fileList = this.files[0];
  var reader = new FileReader();
  reader.onloadend = function(evt) {
    if (evt.target.readyState == FileReader.DONE) {
      game = new Game();
      var world = new World(new Vector(0, 0), 0, jsyaml.load(evt.target.result), true);
      game.worlds[0] = world;
      document.getElementById("world").selectedIndex = 3;
    }
  };
  reader.readAsBinaryString(fileList);
}
document.getElementById("checkbox").addEventListener("click",function(e){
  settings.outline=!settings.outline;
})

document.getElementById("sandbox").addEventListener("click",function(e){
  settings.sandbox=!settings.sandbox;
  localStorage.sandbox = settings.sandbox;
})

/* Limit "number" inputs
let number = document.querySelectorAll('input[type=number]')
for (const element of number){
  document.getElementById(element.id).oninput = numberCorrector
  document.getElementById(element.id).onload = numberLoader
}

function numberLoader() {
  localStorage.setItem(this.id, this.value)
}

function numberCorrector() {
  console.log(this.max)
  
  let max = parseInt(this.max);
  let min = parseInt(this.min);

  if (parseInt(this.value) > max) {
    this.value = max;
  } else if (parseInt(this.value) < min) {
    this.value = min;
  }
};
*/

window.onblur = function () {
  isActive = false;
}
window.onfocus = function () {
  isActive = true;
}