/**
 * 
 */

document.addEventListener('DOMContentLoaded', xmlCreate);

async function xmlCreate() {
	console.log('1');
	let doc;
	await fetch('./cd_catalog.xml')
	.then(result => result.text())
	.then(result => {
		console.log('2');
		//text 포맷을 xml포맷으로 변경.
		const xmlStr = result;
		const parser = new DOMParser();
		doc = parser.parseFromString(xmlStr, "application/xml");
		console.log(doc);
		
	})
	.catch(error => console.log(error));
	
	let tbody = document.createElement('tbody');
	//데이터 건수.
	let data = doc.getElementsByTagName('CD'); //HTMLCollection [CD,CD,...]
	for(let cd of data) {
		let tr = document.createElement('tr');
		let items = cd.children;
		for(let prop of items) {
			let td = document.createElement('td');
			td.innerText = prop.textContent; //<TITLE></TITLE>
			tr.append(td);
		}
		tbody.append(tr);
	}
	
	//thead생성.
	let thead = document.createElement('thead');
	let tr = document.createElement('tr');
	let titles = doc.getElementsByTagName('CD')[0].children;
	for (let title of titles) {
		console.log(title, title.nodeName);
		let th = document.createElement('th');
		th.innerText = title.nodeName;
		tr.append(th);
	}
	thead.append(tr);
	
	//table구성.
	let table = document.createElement('table');
	table.setAttribute('border', 1);
	table.append(tbody);
	table.prepend(thead);
	document.getElementById('show').append(table);
	console.log('3');
}