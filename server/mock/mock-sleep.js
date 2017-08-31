const fs = require("fs");

class MockSleep {

	constructor() {
		const content = fs.readFileSync(__dirname + "/mock-sleep.json");
		this.data = JSON.parse(content);

		/*console.log("\n *START* \n");
		console.log("MockSleep : \n"+ content);
		console.log("\n *EXIT* \n");*/
	}

	list() {
		return this.data;
	}

	upsertItem(data) {
		var index = this.data.findIndex(item => item.id == data.id);
		Object.assign(this.data[index], data);
		return this.data[index];
	}

	deleteItem(id) {

	}
};

const mockSleep = new MockSleep(); 
module.exports = mockSleep;