var fila = [], columna = [], cuad, esfijo = [], indice;
var sudoku_matriz = [], solution;
var n = Math.floor(Math.random()*2) + 2, it = 0;
var phases = [], solutions = [];

function setup() {
  createCanvas(400, 400);
  initialize();
  frameRate(n*n/3);
  for(var i=0;i<n;++i){
    for(var j=0;j<n;++j)
    {      
        if(Math.floor(Math.random()*n*10) == n)
          sudoku_matriz[i][j] = Math.floor(Math.random()*n) + 1;
        else
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
  phases.push(getMatrix());
  sudoku(0,0);
}
function draw() {
  
  background(220);
  var rows = Math.ceil(height/n);
  var columns = Math.ceil(width/n);
  
  var is_solution = checkifsolution();
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
      if(is_solution) fill('red');
      if(phases[it][i][j] != 0){
        if(n == 9)
          text(phases[it][i][j], j*rows + n, i*rows + n*4.2);
        else
          text(phases[it][i][j], j*rows + 15, i*rows + 85);
      }
    }
  }
  
  it = (it + 1)%phases.length;
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
function initialize(){
  solv = false;
  indice = n;
  n = n*n;
  var i, j, k;
  cuad = new Array(n);
  for (i = 0; i < n; ++i) {
    fila.push([]);
    columna.push([]);
    esfijo.push([]);
    sudoku_matriz.push([]);
    cuad[i] = new Array(n);
    for (j = 0; j < n; ++j) {
      fila[i].push(false);
      columna[i].push(false);
      esfijo[i].push(false);
      sudoku_matriz[i].push(false);
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
    solutions.push(getMatrix());
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
  if(solutions.length >=5)
    return;
  
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
function matrixEqual(a, b) {
  for(var i = 0; i < n; ++i){
    for(var j = 0; j < n; ++j)
      if(a[i][j] != b[i][j]){
        frameRate(n*n/3);
        return false;
      }
  }
  frameRate(1);
  return true;
}
function checkifsolution(){
  for(var i = 0; i < solutions.length; ++i){
    if(matrixEqual(solutions[i],phases[it]))
      return true;
  }
  return false;
}
