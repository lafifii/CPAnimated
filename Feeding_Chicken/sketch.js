var letters = [], M = [], ans = [], colores = [];
var n = Math.floor(Math.random()* 10) + 3;
var m = Math.floor(Math.random()* 10) + 3;
var k = Math.floor(Math.random()* 8) + 3;
var suma = 0, it = 0;
var color1 = [0,255,255,255,181,51,51,134,236,108,19];
var color2 = [0,51,193,252,255,255,125,51,51,118,61];
var color3 = [0,51,51,51,51,240,255,255,255,118,134];

function init(){
  if(k > n*m) k = n*m;
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
        }
      }
    }
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
  createCanvas(500, 500);
  init();
  solve();
  frameRate(n*m/k);
}
function draw() {
  background(0,0,0);
  var rows = Math.floor(height/n), b;
  var columns = Math.floor(width/m), c = 0;
  for(var i = 0; i < n; ++i){
    for(var j = 0; j < m; ++j){
      var idx = ans[i][j];
      b = color(color1[idx], color2[idx], color3[idx]);
      if(c > it)
        b = color(0,0,0);
      fill(b)
      rect(j*columns, i*rows, (j + 1)*columns - j*columns, (i + 1)*rows - i*rows);
      if(M[i][j] == 'R'){
        var mid_x = ((j + 1)*columns + j*columns)/2;
        var mid_y = ((i + 1)*rows + i*rows)/2;
        line(mid_x,i*rows, mid_x, (i + 1)*rows);
        line(j*columns, mid_y, (j+ 1)*columns, mid_y);
      }
      c++;
    }
  }
  it = (it + 1)%(n*m);
}
