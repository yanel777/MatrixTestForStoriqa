const test = () => {	
  const matrixSource =
    'X O O X X X O O\n' +
    'O O O O X O X X\n' +
    'X X O X X O O O\n' +
    'O X O O O X X X\n' +
    'O O X X X X O X\n' +
    'X O X X X O X O\n' +
    'O O O X O X O X\n' +
    'X O X X O X O X';

  const matrixSourceAnswer =
    'X 1 1 X X X 3 2 \n' +
    '3 3 3 5 X 5 X X \n' +
    'X X 3 X X 5 5 4 \n' +
    '3 X 5 5 6 X X X \n' +
    '2 4 X X X X 6 X \n' +
    'X 3 X X X 5 X 3 \n' +
    '2 4 5 X 6 X 5 X \n' +
    'X 2 X X 4 X 4 X';

  let matrix = []; //string[][]
  for (const row of matrixSource.replace(/ /g, '').split('\n')) {
    matrix.push([...row]);
  }

  let resultMatrix = [...matrix];

  const rulesForCalculateBombs = [
    [-1, 0], [1, 0], [0, -1], [0, 1], [1, -1], [1, 1], [-1, -1], [-1, 1]
  ]; //all rules for check number[][]

  const rowsColumnsCount = matrix.length; //матрица по условию квадратная
  for (let i = 0; i < rowsColumnsCount; i++) {
    for (let j = 0; j < rowsColumnsCount; j++) {
      if (matrix[i][j].toLowerCase() === 'o') {
        let bombs = 0;

        let indicesForCheck = []; //number[][]
        for (let iC = 0; iC < rulesForCalculateBombs.length; iC++) {
          const rowCheck = [rulesForCalculateBombs[iC][0] + i, rulesForCalculateBombs[iC][1] + j]; //number[]
          if (rowCheck.filter(x => x > -1 && x < rowsColumnsCount).length === 2) {
            indicesForCheck.push(rowCheck);
          }
        }
        for (let ii = 0; ii < indicesForCheck.length; ii++) {
          if (matrix[indicesForCheck[ii][0]][indicesForCheck[ii][1]] === 'X') {
            bombs++;
          }
        }
        resultMatrix[i][j] = bombs.toString();
      }
    }
  }

  const resultString = resultMatrix.map(x => x.join(' ')).join(' \n');
  const isResultCorrect = resultString === matrixSourceAnswer;
  console.log('result:', {resultMatrix, isResultCorrect});
};

test();