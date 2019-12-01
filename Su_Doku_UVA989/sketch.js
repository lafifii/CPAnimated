var fila, columna, cuad, esfijo, indice;
var sudoku_matriz = [], solution;
var n = 2, it = 0;
var phases = [];

function setup() {
  createCanvas(400, 400);
  initialize();
  frameRate(3);
  for(var i=0;i<n;++i){
    for(var j=0;j<n;++j)
    {
        
        sudoku_matriz[i][j] = 0;
        if(sudoku_matriz[i][j] != 0){
          esfijo[i][j] = true;
          fila[i][sudoku_matriz[i][j] - 1] = true;
          columna[j][sudoku_matriz[i][j] - 1] = true;
          cuad[int(i/indice)][int(j/indice)][int(sudoku_matriz[i][j]) - 1] = true;
        }
        else
          esfijo[i][j] = false;
    }
  }
  var aux = getMatrix();
  phases.push(aux);
  sudoku(0,0);
}
function getMatrix(){
  var m_aux = [];
  for(var i = 0; i < n; ++i){
    var mm_aux = [];
    for(var j = 0; j < n; ++j) mm_aux.push(sudoku_matriz[i][j]);
    m_aux.push(mm_aux);
  }
  return m_aux;
}
function draw() {
  
  background(220);
  var rows = Math.ceil(height/n);
  var columns = Math.ceil(width/n);
  
  for(var i = 0; i < n; ++i){
    for(var j = 0; j < n; ++j){
      var back = color('black');
      if((i + j)%2)
        back = color('white')
      
      fill(back)
      rect(j*rows, i*rows, rows, columns);
      textSize(rows);
      fill('white');
      if((i + j)%2) fill('black');
      if(phases[it][i][j] != 0)
        text(phases[it][i][j], j*rows + 20, i*rows + 85);
    }
  }
  
  it = (it + 1)%phases.length;
}
function initialize(){
  solv = false;
  indice = n;
  n = n*n;
  var i, j, k;
  cuad = new Array(n);
  fila = new Array(n);
  columna = new Array(n);
  esfijo = new Array(n);
  cuad = new Array(n);
  sudoku_matriz = new Array(n);
  for (i = 0; i < n; ++i) {
    fila[i] = new Array(n);
    columna[i] = new Array(n);
    esfijo[i] = new Array(n);
    cuad[i] = new Array(n);
    sudoku_matriz[i] = new Array(n);
    for (j = 0; j < n; ++j) {
      fila[i][j] = false;
      columna[i][j] = false;
      esfijo[i][j] = false;
      cuad[i][j] = new Array(n);
      for (k = 0; k < n; ++k)
        cuad[i][j][k] = false;  
    }
  }
}
function sudoku(posx, posy){
  if(posx == n){
    solv = true;
    phases.push(getMatrix());
    return;
  }
  if(posy == n){
    sudoku(posx+1, 0);
    return;
  }
  if(esfijo[posx][posy]){
    sudoku(posx,posy+1);
    return;
  }
  
  phases.push(getMatrix());
  
  for(var i=0;i<n;++i){
    if(!fila[posx][i] && !columna[posy][i] && !cuad[int(posx/indice)][int(posy/indice)][i]){
      sudoku_matriz[posx][posy] = i+1;

      fila[posx][i] = true;
      columna[posy][i] = true;
      cuad[int(posx/indice)][int(posy/indice)][i] = true;
      
      
      sudoku(posx, posy+1);
      fila[posx][i] = false;
      columna[posy][i] = false;
      cuad[int(posx/3)][int(posy/3)][i] = false;
    }
  }

}