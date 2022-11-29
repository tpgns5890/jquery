/**
 * table.js => 표 형태로 데이터를 받아 목록 출력 가능
 * 다른 js 파일에서 import 해서 사용.
 */

export default class Table {
	constructor(data) {
		this.data = data;
		this.makeTable();
		return this.table;
	}
	makeTable() { //<table></table>
		this.table = document.createElement('table');
		this.makeHead();
		this.makeBody();
	}
	makeHead() {
		let template ={}
		template = this.data[0]; // 첫번째 데이터를 갖고 head타이틀 생성.
		this.thead = document.createElement('thead');
		let tr = document.createElement('tr');
		for(let prop in template){
			let th = document.createElement('th');
			th.innerText = prop;
			tr.append(th);
		}
		this.thead.append(tr);
		this.table.append(this.thead);
	}
	makeBody() {
		this.tbody = document.createElement('tbody');
		//데이터 건수만큼 반복.
		for (let item of this.data){
			this.tbody.append(this.makeTr(item));
		}
		this.table.append(this.tbody);
	}
	makeTr(obj={}) {
		let tr = document.createElement('tr');
		for(let prop in obj){
			let td = document.createElement('td');
			td.innerText = obj[prop];
			tr.append(td);
		}
		return tr;
	}
}
