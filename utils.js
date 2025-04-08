function pointInRectangle(pos, rectpos, rectsize) {
  return (pos.x >= rectpos.x && pos.x <= rectpos.x + rectsize.x && pos.y >= rectpos.y && pos.y <= rectpos.y + rectsize.y);
}
var entityTypes = [
  "unknown",
  "normal",
  "wall",
  "dasher",
  "homing",
  "slowing",
  "draining",
  "oscillating",
  "turning",
  "liquid",
  "sizing",
  "switch",
  "freezing",
  "sniper",
  "teleporting",
  "draining",
  "immune",
  "ice_sniper",
  "disabling",
  "icicle",
  "spiral",
  "gravity",
  "repelling",
  "wavy",
  "zigzag",
  "zoning",
  "radiating_bullets",
  "frost_giant",
  "tree",
  "pumpkin",
  "fake_pumpkin",
  "speed_sniper",
  "regen_sniper",
  "snowman",
  "slippery",
  "toxic",
  "corrosive",
  "corrosive_sniper",
  "poison_sniper",
  "magnetic_reduction",
  "magnetic_nullification",
  "positive_magnetic_sniper",
  "negative_magnetic_sniper",
  "positive_magnetic_ghost",
  "negative_magnetic_ghost",
  "experience_draining",
  "fire_trail",
  "wind",
  "wind_ghost",
  "burning",
  "sticky_sniper",
  "sticky_trail",
  "clown_trail",
  "ice_ghost",
  "lava",
  "poison_ghost",
  "star",
  "web",
  "cobweb",
  "grass",
  "defender",
  "glowy",
  "firefly",
  "mist",
  "lunging",
  "barrier",
  "quicksand",
  "radar",
  "wind_sniper",
  "disabling_ghost",
  "sand",
  "crumbling",
  "flower",
  "seedling",
  "cactus",
  "regen_ghost",
  "speed_ghost"
];

function closestPointToRectangle(pos, rectpos, rectsize) {
  var xpos = pos.x;
  var ypos = pos.y;
  if (xpos < rectpos.x) {
    xpos = rectpos.x
  }
  if (xpos > rectpos.x + rectsize.x) {
    xpos = rectpos.x + rectsize.x;
  }
  if (ypos < rectpos.y) {
    ypos = rectpos.y
  }
  if (ypos > rectpos.y + rectsize.y) {
    ypos = rectpos.y + rectsize.y;
  }
  return new Vector(xpos, ypos);
}

function make2Darray(cols, rows, xpos, ypos, type) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Tile(i + xpos, j + ypos, type);
    }
  }
  return arr;
};
function distance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}
function perimeter(rect){
  return (rect.w*2+rect.h*2);
}
function warpAround(rect,lengthT){
  var result = {};
  var length = lengthT%(rect.w*2+rect.h*2);
  var xpos;
  var ypos;
  var dir;
  if (length<rect.w) {
    dir = 0;
    ypos = rect.y;
    xpos = rect.x+length;
  }else if (length<rect.w+rect.h) {
    dir = 1;
    xpos = rect.x+rect.w;
    ypos = rect.y+(length-rect.w)
  }else if (length<rect.w*2+rect.h) {
    dir = 2;
    ypos = rect.y+rect.h
    xpos = (rect.x+rect.w)-(length-(rect.w+rect.h));
  }else if (length<rect.w*2+rect.h*2) {
    dir = 3;
    xpos = rect.x;
    ypos = (rect.y+rect.h)-(length-(rect.w*2+rect.h))
  }
  result.x = xpos;
  result.y = ypos;
  result.dir = dir;
  return result;
}
var ttest = 1;
function isSpawned(boundary,thes){
  if(thes.isSpawned){
    var wallXLpos,wallXRpos,wallYLpos,wallYRpos;
    if(thes.pos.x - thes.radius < boundary.x + boundary.w&&thes.pos.x + thes.radius > boundary.x&&!(thes.pos.y>boundary.y+boundary.h||thes.pos.y<boundary.y)){
      wallXRpos = boundary.x+boundary.w-thes.pos.x-thes.radius
    }
    if(thes.pos.x + thes.radius > boundary.x&&!(thes.pos.x + thes.radius > boundary.x + boundary.w)&&!(thes.pos.y>boundary.y+boundary.h||thes.pos.y<boundary.y)){
      wallXLpos = thes.pos.x-thes.radius-boundary.x;
    }
    if(thes.pos.y - thes.radius < boundary.y + boundary.h&&thes.pos.y + thes.radius > boundary.y&&thes.pos.x>boundary.x&&thes.pos.x<boundary.x+boundary.w){
      wallYRpos = boundary.y+boundary.h-thes.pos.y-thes.radius
    }
    if (thes.pos.y + thes.radius > boundary.y&&!(thes.pos.y + thes.radius > boundary.y + boundary.h)&&thes.pos.x>boundary.x&&thes.pos.x<boundary.x+boundary.w) {
      wallYLpos = thes.pos.y-thes.radius-boundary.y;
    }
    var lowestOne = Math.min(wallXLpos||100000,wallXRpos||100000,wallYLpos||100000,wallYRpos||100000)
    if(wallXRpos==lowestOne){
      if(ttest)thes.pos.x = boundary.x+boundary.w+thes.radius;
      thes.vel.x = Math.abs(thes.vel.x);
      thes.wallHit = true;
      thes.isSpawned = false;
    }
    if(wallXLpos==lowestOne){
      if(ttest)thes.pos.x = boundary.x-thes.radius;
      thes.vel.x = -Math.abs(thes.vel.x);
      thes.wallHit = true;
      thes.isSpawned = false;
    }
    if(wallYRpos==lowestOne){
      if(ttest)thes.pos.y = boundary.y+boundary.h+thes.radius;
      thes.vel.y = Math.abs(thes.vel.y);
      thes.wallHit = true;
      thes.isSpawned = false;
    }
    if(wallYLpos==lowestOne){
      if(ttest)thes.pos.y = boundary.y-thes.radius;
      thes.vel.y = -Math.abs(thes.vel.y);
      thes.wallHit = true;
      thes.isSpawned = false;
    }//thes.isSpawned = false
  }
}

function sectorInRect(t,e,o,n,a,i){
  i<0&&(i=360+i);
  var l=270*Math.PI/180;
  i*=Math.PI/180;
  var r=e+n/2,
  h=o+a/2,
  s={x:e,y:o},
  c={x:e+n,y:o},
  v={x:e+n,y:o+a},
  f={x:e,y:o+a},
  u=Math.sqrt(2)*n/2,
  d=Math.sqrt(2)*a/2,
  M=r+u*Math.cos(l),
  T=(Math.sin(l),
  r+u*Math.cos(i)),
  P=h+d*Math.sin(i),
  g={x:M,y:o},
  x={x:T,y:o},
  b={x:e+n,y:P},
  y={x:T,y:o+a},
  I={x:e,y:P},
  m=[],
  k=Math.PI/180*225,
  p=Math.PI/180*315,
  q=Math.PI/180*45,
  C=Math.PI/180*135;
  m=i>p||i<q?[g,s,f,v,c,b]:i>q&&i<=C?[g,s,f,y]:i>C&&i<=k?[g,s,I]:g.x<x.x?[g,s,f,v,c,x]:[x,g],
  t.beginPath(),t.moveTo(r,h);for(var S=0;S<m.length;S++){var H=m[S];t.lineTo(H.x,H.y)}t.lineTo(r,h),t.closePath(),t.fill()
}

function greaterMax(player){
  const max = Math.max(Math.abs(player.d_x),Math.abs(player.d_y));
  if(max == Math.abs(player.d_x)){
    return player.d_x.toFixed(2);
  }
  return player.d_y.toFixed(2);
}

function combineSpeed(player){
  return parseFloat(((player.d_x**2 + player.d_y**2)**0.5).toFixed(2));
}

function returnToSafePoint (player){
  if(settings.timerClear){player.timer = 0}
  const safeP = {world:player.safePoint.world,area:player.safePoint.area,pos:{x:player.safePoint.pos.x,y:player.safePoint.pos.y}};
  player.pos = safeP.pos;
  player.world = safeP.world;
  player.area = safeP.area;
}

function invulnerable(player){
  if (player.god||player.inBarrier||player.invicible) return true;
  return false
}

function death(player,enemy){
  const diff = document.getElementById("diff").value;
  if(enemy){
    if(enemy.radius===0){
      return;
    }
  }

  if(diff == "Easy"){
    player.pos = new Vector(player.dyingPos.x, player.dyingPos.y); 
    if(settings.dev && player.safePoint){
      returnToSafePoint(player);
    }
    player.reset_abilities();
    player.deathCounter++; if(player.className=="Rameses"){player.bandage=true;}
  } else if (diff == "Medium") {
    player.lives--;
    if(player.lives < 0){
      player.area = 0;
      player.pos = new Vector(game.worlds[player.world].pos.x + 6,game.worlds[player.world].pos.y + 4);
      player.lives = player.maxLives;
      if(settings.dev && player.safePoint){
        returnToSafePoint(player);
        player.reset_abilities();
      }
    } else {
      player.pos = new Vector(player.dyingPos.x, player.dyingPos.y);
      player.reset_abilities();
      player.deathCounter++; if(player.className=="Rameses"){player.bandage=true;}
    }
  } else {
    player.area = 0;
    player.pos = new Vector(game.worlds[player.world].pos.x + 6,game.worlds[player.world].pos.y + 4);
    if(settings.dev && player.safePoint){
      returnToSafePoint(player);
    }
    player.reset_abilities();
  }
}

const secondsFormat = (time) => {
  let minutes = 0, seconds = 0;
  while (time>=60){
      time-=60; minutes++;
  }
  seconds = time;
  return `${minutes}m ${seconds}s`
}

function collides(enemy,enemy2){
  const dx = enemy.pos.x - enemy2.pos.x;
  const dy = enemy.pos.y - enemy2.pos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < enemy.radius + enemy2.radius) {
      return true;
  } else {return false}
}

function renderBackground(t,e){
  if(null!==this.areaCanvas){
    var i={x:e.left+e.width/2,y:e.top+e.height/2};
    this.drawNearbyMinimap(i);
    t.beginPath();
    t.rect(this.left,this.top,this.minimapWidth,this.minimapHeight);
    t.clip();
    t.drawImage(this.areaCanvas,(e.left-this.x-this.areaCanvasOffset.x)*this.canvasScale,(e.top-this.y-this.areaCanvasOffset.y)*this.canvasScale,e.width*this.canvasScale,e.height*this.canvasScale,this.left,this.top,this.minimapWidth,this.minimapHeight),t.fillStyle="rgba(80, 80, 80, 0.6)",t.fillRect(this.left,this.top,this.minimapWidth,this.minimapHeight)}
  }

function drawNearbyMinimap(t,ctx,canvas,zones,areaPos){
  t = {x:t.x*32,y:t.y*32}
  var areaCanvasOffset = {x:10000,y:10000};
  var nearbySize = 10000;
  var canvasScale = scale;
  var e=roundTo(t.x,nearbySize);
  var i=roundTo(t.y,nearbySize);
  var a=e-nearbySize;
  var n=i-nearbySize;
  var r=e+nearbySize;
  var s=i+nearbySize;
  if(null===areaCanvasOffset||areaCanvasOffset.x!==a||areaCanvasOffset.y!==n){
    areaCanvasOffset={x:a,y:n};
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var o={};
    o[0]=[255,255,255,255];
    o[1]=[195,195,195,255];
    o[2]=[255,244,108,255];
    o[3]=[106,208,222,255];
    o[4]=[255,244,108,255];
    o[5]=[255,249,186,255];
    var l=!0,u=!1,f=void 0;
    try{
      for(var c in zones){
        var y=zones[c];
        if(!(y.pos.x>r||y.pos.x+y.width<a||y.pos.y>s||y.pos.y+y.height<n)){
          var m=[y.backgroundColor>>24&255,y.backgroundColor>>16&255,y.backgroundColor>>8&255,255&y.backgroundColor];
          var p=mixColors(o[y.type],m);
          ctx.fillStyle="rgba(".concat(p[0],", ").concat(p[1],", ").concat(p[2],", ").concat(p[3]);
          var v=(y.pos.x-areaPos.x-areaCanvasOffset.x)*canvasScale;
          var g=(y.pos.y-areaPos.y-areaCanvasOffset.y)*canvasScale;
          ctx.fillRect(v,g,y.width*canvasScale,y.height*canvasScale)}
        }
      }catch(b){u=!0,f=b}
      finally{try{l||null==d.return||d.return()}finally{if(u)throw f}
    }
  }
}

function collisionEnemy(boundary,vel,pos,radius,realVel = {x:0,y:0}){
  let collision = false;
  if (pos.x - radius < boundary.x) {
    vel.x = Math.abs(vel.x);
    realVel.x = Math.abs(realVel.x);
  }
  if (pos.x + radius > boundary.x + boundary.w) {
    vel.x = -Math.abs(vel.x);
    realVel.x = -Math.abs(realVel.x);
  }
  if (pos.y - radius < boundary.y) {
    vel.y = Math.abs(vel.y);
    realVel.y = Math.abs(realVel.y);
  }
  if (pos.y + radius > boundary.y + boundary.h) {
    vel.y = -Math.abs(vel.y);
    realVel.y = -Math.abs(realVel.y);
  }

  if(pos.x - radius < boundary.x ||
     pos.x + radius > boundary.x + boundary.w ||
     pos.y - radius < boundary.y ||
     pos.y + radius > boundary.y + boundary.h){
      collision = true;
  }
  return {col:collision};
}

function interactionWithEnemy(player,enemy,offset,barrierInvulnerable, corrosive, immune, Harmless, killInSafeZone = false){
  let dead = true;
  let inDistance = false;
  if(Harmless === undefined){
    Harmless = enemy.Harmless;
  }
  if (distance(player.pos, new Vector(enemy.pos.x + offset.x, enemy.pos.y + offset.y)) < player.radius + enemy.radius && (!player.safeZone||!killInSafeZone)) {
    inDistance = true;

    if(player.night && !immune && !enemy.disabled){
      player.night=false;
      player.speedAdditioner=0;
      enemy.Harmless=true;
      Harmless = true;
      setTimeout(()=>{enemy.Harmless=false;},2000)
    }
    if(enemy.texture=="pumpkinOff" || enemy.radius <= 0 || Harmless || enemy.shatterTime > 0){
      dead = false;
    }
    if(dead){
      if(player.className=="Cent" && !player.invicible){
        if(player.energy >= 20 && player.secondAbilityCooldown==0 && player.mortarTime<=0){
          player.onDeathSecondAb=true;
          player.invicible=true;
        }
      }
      if(player.bandage){ //Rameses
        player.bandage = false; player.invicible = true; setTimeout(()=>{player.invicible=false;},900)
      }
      if (player.className == "Necro"){
        if (!player.die){
          player.die = true;
          player.invicible = true;
        }
        else{
          const id = setInterval(() => { //Death Timer
            if (player.timeDead == 0){
              clearInterval(id);
            }
            else if (player.timeDead >= this.game.worlds[this.game.players[0].world].areas[this.game.players[0].area].death_timer * 1000 || !player.resurrectAvailable){
              player.die = false;
              player.invincible = false;

              death(player)
              clearInterval(id);
            }
          }, 100);
        }
      }
      if (player.className == "Chrono"){
        if(player.god){
        }
        else if (!player.die){
          death_timer = Number(document.getElementById("death_timer").value)
          player.die = true; //Stop movement
          player.invicible = true //Player can't get hit during death - for now it will be here
        }
        else{
          const id = setInterval(() => { //Death timer
            if (player.timeDead >= death_timer * 1000){ //Incase of backtrack 
              player.invicible = false; //Player can get hit by enemies again
              player.die = false; //Player can move again

              death(player);
              clearInterval(id);
            }
          }, 100)
        }
      }
  }
    if((((barrierInvulnerable && player.inBarrier) || (player.god || player.invicible)) && !corrosive) || Harmless){
      dead = false;
    }
    if(dead){
      death(player)
    }
  } else {
    dead = false;
  }
  return {dead: dead, inDistance: inDistance}
}

function mixColors(t,e){
  var i=t[3]/255;
  var a=e[3]/255;
  var n=[];
  var r=1-(1-a)*(1-i);
  return n[0]=Math.round(e[0]*a/r+t[0]*i*(1-a)/r),n[1]=Math.round(e[1]*a/r+t[1]*i*(1-a)/r),n[2]=Math.round(e[2]*a/r+t[2]*i*(1-a)/r),n[3]=r,n
}

function roundTo(t,e){
  return Math.round(t/e)*e
}

function createOffscreenCanvas (width,height){
  const canvas = document.createElement("canvas");
  canvas.width=width;
  canvas.height=height;
  return canvas;
}

function random (number) {
  return Math.floor(Math.random()*(number+1))
}

function min_max(min,max) {
  return Math.floor(Math.random()*(max-min+1))+min
}

function random_between(array){
  return array[random((array.length-1))]
}

function math_module(variable,pushableVariable){
  if(variable.includes("+")){
    pushableVariable += parseFloat(variable.split("+")[1])
  } else if(variable.includes("-")) {
    pushableVariable -= parseFloat(variable.split("-")[1])
  } else if(variable.includes("*")) {
    pushableVariable *= parseFloat(variable.split("*")[1])
  } else if(variable.includes("/")) {
    pushableVariable /= parseFloat(variable.split("/")[1])
  } else if(variable.includes("^")) {
    pushableVariable **= parseFloat(variable.split("^")[1])
  }
  return pushableVariable
}

function process_variable(variable){
  let pushableVariable = 0;

  if(typeof parseFloat(variable) === "number" && !isNaN(parseFloat(variable))){
    pushableVariable = parseFloat(variable);
  } else if(variable.startsWith("random_between")){
    pushableVariable = parseFloat(random_between(variable.split("(")[1].split(")")[0].split("|")));
  } else if(variable.startsWith("random")){
    pushableVariable = random(parseInt(variable.split("(")[1]));
  } else if(variable.startsWith("min")){
    const min = parseInt(variable.split("min(")[1].split(")")[0]);
    const max = parseInt(variable.split("max(")[1].split(")")[0]);
    pushableVariable = min_max(min,max);
  }
  return pushableVariable
}

function find_variable(preset, variables, hashVariables, pattern_id, amount){
  const string = preset.split("var")[1];
  const id = parseInt(string);
  if(pattern_id !== undefined && hashVariables[pattern_id] && hashVariables[pattern_id][id]){
    const xVariable = hashVariables[pattern_id][id][amount[pattern_id]]

    return math_module(string,xVariable);
  }
  const flow = variables[id];
  return math_module(string,flow);
}

function loadImages(character){

  if(localStorage.tiles == "true"){
    tiles.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/tiles.jpg?v=1704653753540";
  } else {
    tiles.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/tiles2.jpg?v=1704653754632";
  }

  switch(character){
    case "Magmax":
    case "Basic":
      flow.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/flow.png?v=1704653741589";
      harden.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/harden.png?v=1704653743907";
      break;
    case "Rime":
      warp.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/warp.png?v=1704653759080";
      paralysis.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/paralysis.png?v=1704653747374";
      break;
    case "Morfe":
      minimize.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/minimize.png?v=1704653746090";
      reverse.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/reverse.png?v=1704653748538";
      break;
    case "Necro":
      resurrection.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/resurrection.png?v=1715039837333";
      reanimate.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/reanimate.png?v=1715039837026";
    case "Brute":
      stomp.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/stomp.png?v=1704653751181";
      vigor.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/vigor.png?v=1704653758768";
      break;
    case "Chrono":
      rewind.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/rewind.png?v=1704653748832";
      backtrack.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/backtrack.png?v=1704653737500";
      break;
    case "Clown":
      rejoicing.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/Rejoicing.png?v=1704653760049";
      heavy_ballon.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/heavy_ballon.png?v=1704653744268";
      break;
    case "Aurora":
      energize.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/energize.png?v=1704653740166";
      distort.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/distort.png?v=1704653739828";
      break;
    case "Candy":
      sweet_tooth_item.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/sweet_tooth_item.png?v=1704653752637";
      sugar_rush.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/sugar_rush.png?v=1704653751567";
      sweet_tooth.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/sweet_tooth.png?v=1704653752215";
      break;
    case "Jötunn":
      shatter.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/shatter.png?v=1704653749500";
      decay.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/decay.png?v=1704653739172";
      break;
    case "Shade":
      vengeance_projectile.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/vengeance_projectile.png?v=1706027318032";
      vengeance.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/vengeance.png?v=1704653756201";
      night.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/night.png?v=1704653746747";
      break;
    case "Cent":
      mortar.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/mortar.png?v=1704653746412";
      fusion.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/fusion.png?v=1704653741908";
      break;
    case "Rameses":
      latch.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/latch.png?v=1704653744582";
      bandages.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/bandages.png?v=1704653737815";
      break;
    case "Reaper":
      depart.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/depart.png?v=1704653739509";
      atonement.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/atonement.png?v=1704653736838";
      break;
  }

  if(document.getElementById("wreath").value.includes("Crown")){
    gem.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/1000-gem.png?v=1704653760444";
  }

  gate.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/gate.png?v=1704653742621";
  flashlight.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/flashlight.png?v=1704653740863";
  flashlight_item.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/flashlight_item.png?v=1704653741259";
  torchUp.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/torch_upside_down.png?v=1704653755505";
  torch.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/torch.png?v=1704653755039";
  pumpkinOff.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/pumpkin_off.png?v=1704653747704";
  pumpkinOn.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/pumpkin_on.png?v=1704653748248";
  magnetUp.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/magnetism_up.png?v=1704653745721";
  magnetDown.src = "https://cdn.glitch.global/9ea89343-3b18-43f9-b04d-c89f6590af5d/magnetism_down.png?v=1704653745430";

}