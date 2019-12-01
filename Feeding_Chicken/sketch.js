var letters = [], M = [], ans = [], states = [], colores = [];
var n = 25;
var m = 25;
var k = 5, suma = 0, it = 0;
var color1 = [255], color2 = [255], color3 = [255];

function init(){
  var i;
  for(i = 0; i <= k; ++i){
      letters.push(i + 1);
      color1.push(Math.floor(Math.random() * (256 - i*10) ));
      color2.push(Math.floor(Math.random() * (256 - i*10) ));
      color3.push(Math.floor(Math.random() * (256 - i*10) ));
  }
  for(i=0;i<n;++i){
    var s_aux = "", zeros = [];
    for(var j=0;j<m;++j){ 
      var letra = '.';
      if(Math.random() < 0.7)
        letra = 'R';
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
  var rows = Math.floor(height/n), b;
  var columns = Math.floor(width/m);
  for(var i = 0; i < n; ++i){
    for(var j = 0; j < m; ++j){
      var idx = states[it][i][j];
      b = color(color1[idx], color2[idx], color3[idx]);
      fill(b)
      rect(j*rows, i*rows, rows, columns);
    }
  }
  it = (it + 1)%states.length;
}