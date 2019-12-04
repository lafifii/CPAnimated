var N = 100, lad, ans = 0, vis, level, xs = [], ys = [], nivel;
var n = Math.floor(Math.random() * 6) + 15;
var c1,c2,c3;
function setup() {
  createCanvas(600, 500);
  frameRate(30); 
  lad = new Array(N);
  vis = new Array(N);
  level = new Array(N);
  nivel = new Array(N);
  c1 = new Array(N);
  c2 = new Array(N);
  c3 = new Array(N);
  
  var i, u;
  for(i = 0 ; i < N; ++i){
    lad[i] = [];
    level[i] = [];
    vis[i] = nivel[i] = 0;
    c1[i] = Math.floor(Math.random() * 256);
    c2[i] = Math.floor(Math.random() * 256);
    c3[i] = Math.floor(Math.random() * 256);
  }
  for(i = 1; i <= n; ++i) {
		vis[i] = 0;
		if(Math.random() < 0.3) u = -1;
        else u = Math.floor(Math.random() * n) + 1;
    
		if(u != -1) lad[u].push(i);
		else lad[0].push(i);
	}
	run();
}
function draw() {
  background(0);
  var i;
  stroke(255);
  for(i =0;i<= n;++i){
    for(var u = 0; u < lad[i].length; ++u)
      line(xs[i], ys[i], xs[lad[i][u]], ys[lad[i][u]]);
  }
  stroke(0);
  for(i = 1;i<= n;++i){
    fill(color(c1[nivel[i]], c2[nivel[i]], c3[nivel[i]]));
    circle(xs[i], ys[i], 20);
    fill(color('black'));
    text(i, xs[i] - 5, ys[i] + 5);
  }
  fill(color('white'));
  textSize(20);
  text("Number of Groups: " + ans , width/2 - 100, 50);
  textSize(10);
}
function run(){
  dfs(0, -1, 0);
  for(var lv = 1; lv < n; ++lv){
    var x_pos = width/2 - 25*level[lv].length/2;
    for(var node = 0; node < level[lv].length; ++node){
      xs[level[lv][node]] = x_pos;
      ys[level[lv][node]] = 70 + lv*50;
      x_pos+=30;
    }
  }
}
function dfs(u, prev, depth) {
	if(vis[u]) return;
	vis[u] = 1;
    level[depth].push(u);
    nivel[u] = depth;
	ans = max(ans, depth);
	for(var i = 0; i < lad[u].length; ++i) {
	  var x = lad[u][i];
      if(x != prev) dfs(x, u, depth+1);
    }
}