describe("learning test", function(){
	xit("calculate existing holes array",function(){
		// arrange
		let length = 100;
		let distance = 20;
		// act
		let actual = [];
		for(let x = 0; x <= length; x+= distance){
			actual.push(x);
		}
		// assert
		let expected = [0,20,40,60,80,100];
		expect(actual).toEqual(expected);
	});
});