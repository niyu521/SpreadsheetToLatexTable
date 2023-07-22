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

// サイドバーを表示する関数 ////////////////////////////////////////////////////////////////////////////////////////////////////
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar_table')
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