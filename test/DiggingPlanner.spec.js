describe("HoleDiggingPlanner", function () {
	describe("pickNewDistance",function(){
		describe("Given 1 new distance", function(){
			it("When new distance less than old expect it to be picked", function() {
				// arrange
				var diggingPlanner = new DiggingPlanner();
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
				var diggingPlanner = new DiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(100)
											.withOldDistance(50)
											.withNewDistance(55)
											.pickNewDistance();
				// assert
				expect(actual).toBe(DiggingConstants.NoNewPlan);
			});
	
			it("When new distance equal to old expect null", function() {
				// arrange
				var diggingPlanner = new DiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(100)
											.withOldDistance(50)
											.withNewDistance(50)
											.pickNewDistance();
				// assert
				expect(actual).toBe(DiggingConstants.NoNewPlan);
			});
		});

		describe("Given 2 new distances", function(){
			it("When both distances only require new holes, expect larger distance to be picked since it requires less work", function() {
				// arrange
				var diggingPlanner = new DiggingPlanner();
				// act
				var actual = diggingPlanner.withLength(120)
											.withOldDistance(40)
											.withNewDistance(10)
											.withNewDistance(20)
											.pickNewDistance();
				// assert
				expect(actual).toBe(20);
			});

			// NOTE : when I completed writing this test the jump was too large
			// I then ignored this test and started to extract a DiggingPlanner responsiblity
			// that brought under test to help narrow the scope of the problem to be solved
			// I then was able to easily slot my new work in to the existing code.
			// I ignored the need to use DI and simply newed it up thus reducing the amount of test 
			// rework that had to be done.
			it("When both require same amount of work, expect first new distance be picked because it has a lower position in the collection", function() {
				// arrange
				var diggingPlanner = new DiggingPlanner();
				// act (both require 10 actions)
				var actual = diggingPlanner.withLength(240)
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