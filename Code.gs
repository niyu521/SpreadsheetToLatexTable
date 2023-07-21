// サイドバーを表示する関数 ////////////////////////////////////////////////////////////////////////////////////////////////////
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('LaTeX形式の表を出力')
  SpreadsheetApp.getUi().showSidebar(html);
}

function showSidebarGraph() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar_graph')
    .setTitle('最小二乗法のグラフと計算過程を出力')
  SpreadsheetApp.getUi().showSidebar(html);
}

function showSidebarMatrix() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar_matrix')
    .setTitle('行列式の計算と計算結果を出力')
  SpreadsheetApp.getUi().showSidebar(html);
}

function showMsg(msg){
  SpreadsheetApp.getUi().alert(msg)
}

// 実行する関数 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
function myFunction(arr,hf) {
  var header = hf.length == 0 ? 2 : hf[0];
  var footer = hf.length == 0 ? 2 : hf[1];
  var output = testArrayToLatexTable(arr, header, footer)
  return output;
}


// onOpen //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ファイルを開いた時に実行する関数
function onOpen(){
  
  const ui = SpreadsheetApp.getUi(); //追加メニューの作成
  ui.createMenu('サイドバーを表示')
  .addItem("指定した範囲の表を出力", "showSidebar")
  .addItem("最小二乗法を適用", "showSidebarGraph")
  .addItem("行列式を計算", "showSidebarMatrix")
  .addToUi(); 


}
// latexの表を作成する関数 ///////////////////////////////////////////////////////////////////////////////////////////////////////

function testArrayToLatexTable(array_maxdegit, header, footer) {
  var array = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange().getValues();
  var tableCaption = "表"
  var tableLabel = "table1"
  if(array.length > 0){
    var latexTable = arrayToLatexTablecaption(array, array_maxdegit, tableCaption, tableLabel, header, footer)
    Logger.log(latexTable);
    return latexTable
  }else{
    return "表を取得できませんでした。";
  }
}


function arrayToLatexTablecaption(array, decimalDigits, tableCaption, tableLabel, header, footer) {
  var rows = array.length;
  var cols = array[0].length;

  var latexTable = "\\begin{table}[h]<br>";
  latexTable += "\\caption{" + tableCaption + "}<br>";
  latexTable += "\\label{" + tableLabel + "}<br>";
  latexTable += "\\centering<br>";
  latexTable += "\\scalebox{0.9}[0.9]{<br>";
  latexTable += "\\begin{tabular}{|";

  for (var i = 0; i < cols; i++) {
    latexTable += "r|";
  }

  latexTable += "}<br>";
  latexTable += "\\hline<br>";

  latexTable += makeLaTXtable(0, header, cols, array, decimalDigits)

  header == 0 ? null : latexTable += "\\hline \\hline<br>";

  latexTable += makeLaTXtable(header, rows-footer, cols, array, decimalDigits)

  footer == 0 ? null : latexTable += "\\hline \\hline<br>";

  latexTable += makeLaTXtable(rows-footer, rows, cols, array, decimalDigits)

  latexTable += "\\hline<br>";
  latexTable += "\\end{tabular}<br>";
  latexTable += "}<br>";
  latexTable += "\\end{table}";

  latexTable = String(latexTable).replace(/undefined/g,"")

  return latexTable;
}


function makeLaTXtable(startrow, endrow, cols, array, decimalDigits){
  let latexTable;
  for (var i = startrow; i < endrow  ; i++) {
    for (var j = 0; j < cols; j++) {
      //数値がどうかの判定。数値ならば小数点切り捨ての操作を行いそうでなければテキストとして扱う。
      //空白セルは空白として扱う。
      var value = String(array[i][j]).length <= 0 ? "" : (isFinite(String(array[i][j])) == true 
                                                        ? parseFloat(array[i][j]).toFixed(decimalDigits[j])
                                                        : String(array[i][j]))
      latexTable += "" + value;

      if (j < cols - 1) {
        latexTable += " & ";
      } else {
        latexTable += " \\\\<br>";
      }
    }
  }

  return latexTable;
}



