/**
 * 	tableEx.js : 데이터 사용 app값에 목록 출력.
 */

import Table from './table.js';


let data = [
	{ name: "홍길동", age: 20, score: 80 },
	{ name: "김민수", age: 22, score: 85 }

];
let tbl = new Table(data); //<table><thead><tr>...</tr></thead><tbody>...</tbody></table>
document.getElementById('app').append(tbl);