describe("HoleDiggingPlanner", function () {
	describe("pickNewDistance",function(){
		it("When 1 new distance less than old expect it to be picked", function() {
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

		it("When 1 new distance more than old expect null", function() {
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

		it("When 1 new distance equal to old expect null", function() {
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
});
