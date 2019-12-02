//Inspired in Codeforces 245525 Problem, Fractal
var Fractals = [];
var modelo = [];
var time = 0, times = Math.floor(Math.random() * 4) + 2;
function setup() {
  createCanvas(600, 600);
  modelo = [];
  var M, n, n_x;
  n = Math.floor(Math.random() * 2) + 2;
  n_x = n;
  M = [];
  var j, i, k ,aux_str = "";
  for(j = 0; j < n; ++j){
    aux_str = "";
    for(i = 0; i < n; ++i){
      if(Math.random() < 0.5)
        aux_str+="*";      
      else
        aux_str+=".";
    }
    M.push(aux_str);
  }
  modelo = M;
  Fractals.push(M);
  for(var kk = 0; kk < times; ++kk){
    vans = [];
    for(i = 0; i < n; ++i){
      var aux = repeat(n_x, "");
      for(j = 0; j < n; ++j){ 
          var aux_ = GetModel(M[i][j]);
          for(l = 0; l < n_x; ++l) aux[l]+= aux_[l];
      }
      for(l = 0; l < n_x; ++l) vans.push(aux[l]);
    }
    Fractals.push(vans);
    M = vans;
    n = M.length;
  }
  frameRate(1);
}
function repeat(num, thing){
    var arr = [];
    for(var i=0;i<num;++i){
        arr.push(thing);
    }
    return arr;
}
function draw() {
  background(255);
  circle(100,100,20);
  var figure = Fractals[time], i, j;
  var rows = Math.ceil(height/figure.length);
  for(i = 0; i < figure.length; ++i){
    var columns = int(width/figure[i].length);
    for(j = 0; j < figure[i].length; ++j){
      var c = color('black');
      if(figure[i][j] == '*')
        c = color('white')
      fill(c)
      rect(j*columns, i*rows, columns, rows);
    }
  }
  time = (time + 1)%times;
}
function GetModel(c){
	if(c == '.') return modelo;
	var h = "";
    for(j = 0; j < modelo[0].length; ++j) h+="*";
	var aux = repeat(modelo.length, h);
	return aux;
}
