
function testrun(){
  let data_xy_arr = [[ 1, 0.018],
                     [ 2, 0.034],
                     [ 3, 0.048],
                     [ 4, 0.061],
                     [ 5, 0.077],
                     [ 6, 0.092],
                     [ 7, 0.107],
                     [ 8, 0.120],
                     [ 9, 0.137],
                     [10, 0.150]]

  let decimal_x = 0;
  let decimal_y = 3;

  console.log(makeSaishoNijoEquation(data_xy_arr, decimal_x, decimal_y));

}

function graphFunction(array){
  let decimal_x = array[0];
  let decimal_y = array[1];
  let data_xy_arr = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveRange().getValues();

  return makeSaishoNijoEquation(data_xy_arr, decimal_x, decimal_y);
}





function makeSaishoNijoEquation(data_xy_arr, decimal_x, decimal_y){
  let data_count = data_xy_arr.length;

  let x_sum = 0;
  let x2_sum = 0
  let y_sum = 0;
  let xy_sum = 0;
  let zanza2_sum = 0;

  for(let d = 0; d < data_count; d++){
    let thisx = Number(data_xy_arr[d][0]);
    let thisy = Number(data_xy_arr[d][1]);
    x_sum += thisx;
    x2_sum += (thisx*thisx);
    y_sum += thisy;
    xy_sum += (thisx*thisy);
  } 

  

  let a = (x2_sum * y_sum - x_sum * xy_sum)/(data_count * x2_sum - x_sum*x_sum);
  let b = (data_count * xy_sum - x_sum * y_sum)/(data_count * x2_sum - x_sum*x_sum);

  x_sum  = roundFloat(x_sum, decimal_x);
  x2_sum = roundFloat(x2_sum, decimal_x*2);
  y_sum  = roundFloat(y_sum, decimal_y);
  xy_sum = roundFloat(xy_sum, decimal_x + decimal_y);


  let decimal_a = 2*decimal_x + decimal_y;
  let decimal_b = decimal_x > decimal_y ? decimal_x*2 : decimal_x + decimal_y;
  a = roundFloat(a, decimal_a + 5)
  b = roundFloat(b, decimal_b + 5)


  for(let d = 0; d < data_count; d++){
    let thisx = Number(data_xy_arr[d][0]);
    let thisy = Number(data_xy_arr[d][1]);
    zanza2_sum += ((thisy - (a + b*thisx))*(thisy - (a + b*thisx)));
  } 

  // let decimal_abi = decimal_a > decimal_b + decimal_x ? decimal_b + decimal_x : decimal_a;
  // let decimal_zansa = decimal_y > decimal_abi ? decimal_abi : decimal_y;
  // zanza2_sum = roundFloat(zanza2_sum, decimal_zansa*2) //yv,i = yi − (a + bi)

  let r_a = 0.6745 * Math.sqrt(x2_sum * zanza2_sum/((data_count * x2_sum - x_sum*x_sum) * (data_count-2)));
  let r_b = 0.6745 * Math.sqrt(data_count * zanza2_sum/((data_count * x2_sum - x_sum*x_sum) * (data_count-2)));;

  var output = `\\begin{equation}<br>
                  \\begin{aligned}<br>
                    a &=\\frac{\\sum_i x_i^2 \\cdot \\sum_i y_i-\\sum_i x_i \\cdot \\sum_i x_i y_i}{${data_count} \\sum_i x_i^2-\\left(\\sum_i x_i\\right)^2}\\\\  <br>
                    &=\\frac{${x2_sum}  \\times ${y_sum}-${x_sum}  \\times ${xy_sum}}{${data_count} \\times ${x2_sum}-\\left(${x_sum}\\right)^2}\\\\  <br>
                    &=\\frac{${roundFloat(x2_sum * y_sum - x_sum * xy_sum, 2*decimal_x + decimal_y)}}{${roundFloat(data_count * x2_sum - x_sum*x_sum, 2*decimal_x)}}\\\\  <br>
                    & = ${a} \\quad \\mathrm{}\\\\<br>
                    \\\\<br>
                    b &=\\frac{${data_count} \\sum_i x_i y_i-\\sum_i x_i \\cdot \\sum_i y_i}{${data_count} \\sum_i x_i^2-\\left(\\sum_i x_i\\right)^2}\\\\<br>
                    &=\\frac{${data_count} \\times  ${xy_sum}-${x_sum} \\times  ${y_sum}}{${data_count} \\times ${x2_sum}-\\left(${x_sum}\\right)^2}\\\\<br>
                    &=\\frac{${roundFloat(data_count * xy_sum - x_sum * y_sum, decimal_x +  decimal_y)}}{${roundFloat(data_count * x2_sum - x_sum*x_sum, 2*decimal_x)}}\\\\<br>
                    & = ${b}\\quad \\mathrm{}\\\\  <br>
                  \\end{aligned}<br>
                \\end{equation}<br>
                <br>
                加えて$a$、$b$の公算誤差$r_a$、$r_b$を計算すると以下のような値になった。<br>
                \\begin{equation}<br>
                  \\begin{aligned}<br>
                    r_a &=0.6745 \\sqrt{\\frac{\\sum_i x_i^2}{${data_count} \\sum_i x_i^2- \\left(\\sum_i x_i\\right)^2} \\cdot \\frac{\\sum_i y_{v,i}^2}{${data_count}-2}}\\\\<br>
                    &=0.6745 \\sqrt{\\frac{${x2_sum}}{${data_count} \\times ${x2_sum}- \\left(${x_sum}\\right)^2} \\times \\frac{${zanza2_sum}}{${data_count}-2}}\\\\<br>
                    &=0.6745 \\sqrt{\\frac{${x2_sum}}{${data_count * x2_sum - x_sum*x_sum}} \\times \\frac{${zanza2_sum}}{${data_count-2}}}\\\\<br>
                    &=0.6745 \\sqrt{\\frac{${x2_sum * zanza2_sum}}{${(data_count * x2_sum - x_sum*x_sum) * (data_count-2)}} }\\\\<br>
                    & = ${r_a} \\quad \\mathrm{}<br>
                    \\\\<br>
                    \\\\<br>
                    r_b &=0.6745 \\sqrt{\\frac{${data_count}}{${data_count} \\sum_i x_i^2- \\left(\\sum_i x_i\\right)^2} \\cdot \\frac{\\sum_i y_{v,i}^2}{${data_count}-2}}\\\\<br>
                    &=0.6745 \\sqrt{\\frac{${data_count}}{${data_count} \\times ${x2_sum}- \\left(${x_sum}\\right)^2} \\times \\frac{${zanza2_sum}}{${data_count}-2}}\\\\<br>
                    &=0.6745 \\sqrt{\\frac{${data_count}}{${data_count * x2_sum - x_sum*x_sum}} \\times \\frac{${zanza2_sum}}{${data_count-2}}}\\\\<br>
                    &=0.6745 \\sqrt{\\frac{${data_count * zanza2_sum}}{${(data_count * x2_sum - x_sum*x_sum) * (data_count-2)}} }\\\\<br>
                    &= ${r_b} \\quad \\mathrm{}\\\\<br>
                  \\end{aligned}<br>
                \\end{equation}`;


  let graph = outputGraph(a,b,data_xy_arr);

  output += graph;

  return output; 
}




function outputGraph(a,b,dot_arr) {
  let dots = ""; 
  for(let d = 0; d < dot_arr.length; d++){
    let thisx = dot_arr[d][0];
    let thisy = dot_arr[d][1];
    dots += `(${thisx}, ${thisy}) `
  }
  var output = `\\begin{figure}[h]<br> 
                  \\centering<br>
                  \\begin{tikzpicture}<br>
                      \\begin{axis}[<br> 
                          width = 100 mm,<br>
                          height = 100 mm,<br>
                          xlabel = {x},<br>
                          ylabel = {y},<br>
                          xmin = 0,<br>
                          xmax = 1,<br>
                          ymin = 0,<br>
                          ymax = 1,<br>
                          xtick = {0.0, 0.2, ..., 1.0},<br>
                          ytick = {0.0, 0.2, ..., 1.0},<br>
                          tick align=inside,<br>
                          legend style = {legend pos = north west},<br>
                      ]<br>
                          \\addplot[black, solid, domain= 0.00 : 10.00, samples = 100] {${a} + ${b}*x};<br>
                          \\addlegendentry{回帰直線：$y = ${a} + ${b}x$};<br>
                          \\addplot[black, mark = *, only marks] coordinates {${dots}};<br>
                          \\addlegendentry{実験で得られたデータ};<br>
                      \\end{axis}<br>
                  \\end{tikzpicture}<br>
                  \\caption{aa}<br>
                  \\label{fig:}<br>
                \\end{figure}<br><br>`;

  return output;
}
