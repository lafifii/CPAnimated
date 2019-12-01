var letters = [], M = [], ans = [], states = [], colores = [];
var n = Math.floor(Math.random()* 6) + 10;
var m = Math.floor(Math.random()* 6) + 10;
var k = Math.floor(Math.random()* 8) + 3;
var suma = 0, it = 0;
var color1 = [0,255,255,255,181,51,51,134,236,108,19];
var color2 = [0,51,193,252,255,255,125,51,51,118,61];
var color3 = [0,51,51,51,51,240,255,255,255,118,134];

function init(){
  var i, inter = int(256/k), cont_k = 0;
  for(i = 0; i <= k; ++i)
      letters.push(i + 1);
  for(i=0;i<n;++i){
    var s_aux = "", zeros = [];
    for(var j=0;j<m;++j){ 
      var letra = '.';
      if(Math.random() < 0.2 && cont_k < k){
        letra = 'R';
        cont_k++;
      }
      s_aux+=letra;
      zeros.push(0);
      if(s_aux[j] == 'R') suma++;
    }
    M.push(s_aux);
    ans.push(zeros);
  }
}
function solve(){
  var pro = suma/k, rem=suma%k, c1 =0, c2 =0, ok = false;
  var i, j; 
  for(i=0;i<n;++i){
      if(i%2==0){
	      for(j=0;j<m;++j){
	        ans[i][j] = letters[c1];
            if(M[i][j]=='R'){ 
              c2++;
              suma--;
            }
	        if(c2==pro){
	           if(!ok&&rem>0){ 
                 ok= true; 
                 rem--;
                 c2--;
               }
	           else{
		          c2 = 0;
                  ok = false;
		          if(suma) c1++;
	            }
            }
            states.push(getMatrix());
	     }
      }
      else{
        for(j=m-1;j>=0;--j){
	       ans[i][j] = letters[c1];
	       if(M[i][j]=='R'){ 
             c2++;
             suma--;
           }
	       if(c2==pro){
	         if(!ok&&rem>0){
	           ok= true;
               rem--;
               c2--;
             }
	         else{
		       ok= false;
               c2 =0;
		       if(suma) c1++;
	         }
	       }
          states.push(getMatrix());
        }
      }
    }
  states.push(getMatrix());
  
}
function getMatrix(){
  var m_aux = [];
  for(var i = 0; i < n; ++i){
    var mm_aux = [];
    for(var j = 0; j < m; ++j) mm_aux.push(ans[i][j]);
    m_aux.push(mm_aux);
  }
  return m_aux;
}
function setup() {
  createCanvas(400, 400);
  init();
  solve();
  frameRate(n*m);
}
function draw() {
  background(220);
  var rows = Math.ceil(height/n), b;
  var columns = Math.ceil(width/m);
  for(var i = 0; i < n; ++i){
    for(var j = 0; j < m; ++j){
      var idx = states[it][i][j];
      b = color(color1[idx], color2[idx], color3[idx]);
      fill(b)
      rect(j*columns, i*rows, columns, rows);
      if(M[i][j] == 'R'){
        var mid_x = ((j + 1)*columns + j*columns)/2;
        var mid_y = ((i + 1)*rows + i*rows)/2;
        line(mid_x,i*rows, mid_x, (i + 1)*rows);
        line(j*columns, mid_y, (j+ 1)*columns, mid_y);
      }
    }
  }
  it = (it + 1)%states.length;
}
