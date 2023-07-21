function testrun(){

  // テスト用の3x3行列
  const testMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const determinant = getLatex(testMatrix);
  console.log(determinant);

}

function matrixFunction(){
  let matrix = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange().getValues();
  return getLatex(matrix);
}


function getLatex(matrix){
  let latex = `
  \\begin{equation} <br>
  \\begin{split} <br>
    \\det A_a &= \\det  <br>
    \\begin{bmatrix} <br>
      \\ ${matrix[0][0]}  &  ${matrix[0][1]} &  ${matrix[0][2]} \\ \\\\ <br>
      \\ ${matrix[1][0]}  &  ${matrix[1][1]} &  ${matrix[1][2]} \\ \\\\ <br>
      \\ ${matrix[2][0]}  &  ${matrix[2][1]} &  ${matrix[2][2]} \\ \\\\ <br>
    \\end{bmatrix}\\\\ <br>
    &= ${matrix[0][0]} \\cdot ${matrix[1][1]} \\cdot ${matrix[2][2]} \\ - \\ ${matrix[0][2]} \\cdot ${matrix[1][1]} \\cdot ${matrix[2][0]} \\\\ <br>
    &\\quad+ ${matrix[0][1]} \\cdot ${matrix[1][2]} \\cdot ${matrix[2][0]} \\ - \\ ${matrix[0][0]} \\cdot ${matrix[1][2]} \\cdot ${matrix[2][1]} \\\\ <br>
    &\\quad+ ${matrix[0][2]} \\cdot ${matrix[1][0]} \\cdot ${matrix[2][1]} \\ - \\ ${matrix[0][1]} \\cdot ${matrix[1][0]} \\cdot ${matrix[2][2]} \\\\ <br>
    &= ${calculateDeterminant(matrix)}  <br>
  \\end{split} <br>
 \\end{equation} <br>
 `

 return latex;
}



//3x3行列の行列式の値を計算
function calculateDeterminant(matrix) {

  const det =
    matrix[0][0] * matrix[1][1] * matrix[2][2] +
    matrix[0][1] * matrix[1][2] * matrix[2][0] +
    matrix[0][2] * matrix[1][0] * matrix[2][1] -
    matrix[0][2] * matrix[1][1] * matrix[2][0] -
    matrix[0][0] * matrix[1][2] * matrix[2][1] -
    matrix[0][1] * matrix[1][0] * matrix[2][2];

  return det;
}

