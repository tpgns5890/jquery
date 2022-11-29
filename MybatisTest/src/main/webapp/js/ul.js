/**
 * 
 */

export default class Ul {
	constructor(data) {
		this.data = data;
		this.makeUl();
		return this.ul;
	}

	makeUl() {
		this.ul = document.createElement('ul');
		for (let item of this.data) {
			this.ul.append(this.makeLi(item));
		}
	}

	makeLi(obj) {
		let li = document.createElement('li');
		li.innerText = obj;
		return li;
	}

}