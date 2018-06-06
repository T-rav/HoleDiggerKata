describe("HoleDiggingPlanner", function () {
	describe("pickNewDistance",function(){
		describe("when 1 new distance", function(){
			it("When new distance less than old expect it to be picked", function() {
				// arrange
				var diggingPlanner = new HoleDiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(100)
																	 .withOldDistance(50)
																	 .withNewDistance(25)
																	 .pickNewDistance();
				// assert
				expect(actual).toBe(25);
			});
	
			it("When new distance more than old expect null", function() {
				// arrange
				var diggingPlanner = new HoleDiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(100)
																	 .withOldDistance(50)
																	 .withNewDistance(55)
																	 .pickNewDistance();
				// assert
				expect(actual).toBe(HoleDiggingConstants.NoNewPlan);
			});
	
			it("When new distance equal to old expect null", function() {
				// arrange
				var diggingPlanner = new HoleDiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(100)
																	 .withOldDistance(50)
																	 .withNewDistance(50)
																	 .pickNewDistance();
				// assert
				expect(actual).toBe(HoleDiggingConstants.NoNewPlan);
			});
		});

		describe("when 2 new distance", function(){
			it("When both distances only require new holes, expect larger distance to be picked", function() {
				// arrange
				var diggingPlanner = new HoleDiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(120)
																	 .withOldDistance(40)
																	 .withNewDistance(10)
																	 .withNewDistance(20)
																	 .pickNewDistance();
				// assert
				expect(actual).toBe(20);
			});

			// NOTE : when I completed this test, the jump was too large, 
			// thus I extract a responsibiltiy and brought it under test to 
			// help rescope the problem to being smaller
			// I then was able to easily slot my new work in easily
			it("When both require same amount of work, first new distance be picked", function() {
				// arrange
				var diggingPlanner = new HoleDiggingPlanner();
				// act (both require 10 actions)
				var actual = diggingPlanner.withLength(120)
																	 .withOldDistance(40)
																	 .withNewDistance(15)
																	 .withNewDistance(10)
																	 .pickNewDistance();
				// assert
				expect(actual).toBe(15);
			});
		});
	});
});

describe("DiggingCalcualtion", function(){
	describe("numberOfHolesNeeded", function(){
		it("when no holes to reuse and length evenly divisible by distance", function(){
			// arrange
			let length = 100;
			let distanceBetween = 10;
			let dugHoles = [];
			let diggingCalculation = new DiggingCalculation();
			// act
			let actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, dugHoles);
			// asset
			let expected = 10;
			expect(actual).toBe(expected);
		});

		it("when no holes to reuse length not evenly divisible by distance", function(){
			// arrange
			let length = 105;
			let distanceBetween = 10;
			let dugHoles = [];
			let diggingCalculation = new DiggingCalculation();
			// act
			var actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, dugHoles);
			// asset
			let expected = 10;
			expect(actual).toBe(expected);
		});

		it("when holes to reuse and buried and length evenly divisible by distance", function(){
			// arrange
			let length = 100;
			let distanceBetween = 10;
			let dugHoles = [0,25,50,75,100];
			let diggingCalculation = new DiggingCalculation();
			// act
			let actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, dugHoles);
			// asset
			let expected = 9;
			expect(actual).toBe(expected);
		});

		it("when holes to reuse and buried and length not evenly divisible by distance", function(){
			// arrange
			let length = 105;
			let distanceBetween = 10;
			let dugHoles = [0,25,50,75,100];
			let diggingCalculation = new DiggingCalculation();
			// act
			var actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, dugHoles);
			// asset
			let expected = 9;
			expect(actual).toBe(expected);
		});
	});
});

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
