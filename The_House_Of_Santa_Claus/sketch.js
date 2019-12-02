var n = 9, rpta, vis, aux = [], rpta_real = [], lad, it = 0;
var xs, ys, cont = 0;

function setup() {
  createCanvas(400, 400);
  init();
  xs = [100, 300, 300, 200, 100];
  ys = [300, 300, 100, 50, 100];
  frameRate(8);
  textSize(20);
}
function draw() {
  background(0);
  var c = color(255, 204, 0), i;
  for(i=0;i<min(cont, 8);++i){
    var now = rpta_real[it][i] - 1, next = rpta_real[it][(i + 1)%9] - 1;
    if(cont == 9){
      strokeWeight(5); 
      stroke(color('red'));
    }
    else{
      strokeWeight(1);
      stroke(color('white'));
    }
    line(xs[now], ys[now], xs[next], ys[next]);
  }
  
  strokeWeight(1);
  for(i=0;i<5;++i){
    fill(c)
    stroke(color('black'));
    circle(xs[i], ys[i], 40);
    fill(color('black'));
    text(i+1,xs[i] - 5, ys[i] + 7);
  }
  if(cont == 9){
    it = (it + 1)%rpta_real.length;
    cont = 0;
    frameRate(1);
  }
  else
    frameRate(8);
  cont++;
}
function init(){
  vis = new Array(5);
  lad = new Array(5);
  rpta = new Array(9);
  for(var i = 0; i < 5; ++i){
    vis[i] = new Array(5);
    lad[i] = [];
    for(var j = 0; j < 5; ++j)
      vis[i][j] = false;
  }
  lad[0].push(1);
  lad[1].push(0);
  lad[0].push(2);
  lad[2].push(0);
  lad[0].push(4);
  lad[4].push(0);
  lad[1].push(2);
  lad[2].push(1);
  lad[1].push(4);
  lad[4].push(1);
  lad[2].push(4);
  lad[4].push(2);
  lad[4].push(3);
  lad[3].push(4);
  lad[3].push(2);
  lad[2].push(3);
  rpta[0] = 0;
  bt(1, 0);
}
function bt(pos, ds){ // 1 1
  if(n==pos){
    end_it();
    return;
  }
  for(var i=0;i<lad[ds].length;++i){ 
    if(!vis[ds][lad[ds][i]]){ 
        rpta[pos] = lad[ds][i]; 
        vis[ds][lad[ds][i]] = vis[lad[ds][i]][ds] = true; 
        bt(pos+1, lad[ds][i]); 
        rpta[pos] = 0;
        vis[ds][lad[ds][i]] = vis[lad[ds][i]][ds] = false;
    } 
  }
}
function end_it(){
  aux = [];
  for(var i=0;i<n;++i)
    aux.push(rpta[i] + 1);
  rpta_real.push(aux);
}