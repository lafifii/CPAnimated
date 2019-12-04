var lad, ans, vis, nivel, xs, ys;
var n = Math.floor(Math.random() * 16) + 10;
var c1 = [0,255,255,255,181,51,51,134,236,108,19];
var c2 = [0,51,193,252,255,255,125,51,51,118,61];
var c3 = [0,51,51,51,51,240,255,255,255,118,134];
function setup() {
  lad = new Array(100);
  nivel = new Array(100);
  vis = new Array(100);
  xs = new Array(100);
  ys = new Array(100);
  createCanvas(600, 600);
  frameRate(1); 
  
}
function bad_case(){
  for(i = 1; i <= n; ++i)
    if(!xs[i] && !ys[i])
      return true;
  return false;
}
function draw() {
  background(0);
  generaGrafo();
  while(bad_case()){
    generaGrafo();
    run();
  }
  var i;
  stroke(255);
  for(i = 1; i <= n; ++i){
    for(var j = 0; j < lad[i].length; ++j)
      line(xs[i], ys[i] + 50, xs[lad[i][j]], ys[lad[i][j]] + 50);
  }
   stroke(0);
  for(i = 1; i <= n; ++i){
    var pos = (ys[i]/40)%c1.length;
    fill(color(c1[pos],c2[pos],c3[pos]));
    circle(xs[i], 50 + ys[i], 20);
  }
  textSize(13)
  fill(color('black'));
  for(i = 1; i <= n; ++i){
    var digitos = str(i).length;
    text(i, xs[i] - 4 - digitos, 50 + ys[i] + 5);
  }
  fill(color('white'));
  textSize(20)
  text('Answer: ' + ans, 230, 30);
}
function generaGrafo(){
  var i;
  for(i = 0; i < 100; ++i){
    lad[i] = [];
    nivel[i] = [];
    vis[i] = 0;
    xs[i] = 0;
    ys[i] = 0;
  }
  for(i = 1; i <= n; ++i){
    if(Math.random() < 0.3) lad[0].push(i);
    else{
      var u = Math.floor(Math.random() * n) + 1;
      do{
        u = Math.floor(Math.random() * n) + 1;
      }while(u == i);
      lad[u].push(i);
    }
  }
  
}
function run(){
  ans = 0;
  dfs(0,-1,0);
  for(var lv = 0; lv <= ans; ++lv){
    var pos_x = width/2 - (nivel[lv].length/2)*40;
    for(i = 0; i < nivel[lv].length; ++i){
      xs[nivel[lv][i]] = pos_x;
      ys[nivel[lv][i]] = lv*40;
      pos_x+=40;
    }
  }
}
function dfs(u, prev, depth) {
	if(vis[u]) return;
	vis[u] = 1;
    nivel[depth].push(u);
	ans = max(ans, depth);
	for(var i = 0; i < lad[u].length; ++i) {
	  var x = lad[u][i];
      dfs(x, u, depth+1);
    }
}
