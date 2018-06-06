describe("DiggingCalculation", function(){
	describe("numberOfHolesNeeded", function(){
		it("when no holes to reuse and length evenly divisible by distance", function(){
			// arrange
			let length = 100;
			let distanceBetween = 10;
			let previousDistance = DiggingConstants.NoHolesDug;
			let diggingCalculation = new DiggingCalculation();
			// act
			let actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, previousDistance);
			// asset
			let expected = 10;
			expect(actual).toBe(expected);
		});

		it("when no holes to reuse length not evenly divisible by distance", function(){
			// arrange
			let length = 105;
			let distanceBetween = 10;
			let previousDistance = DiggingConstants.NoHolesDug;
			let diggingCalculation = new DiggingCalculation();
			// act
			var actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, previousDistance);
			// asset
			let expected = 10;
			expect(actual).toBe(expected);
		});

		it("when holes to reuse and buried and length evenly divisible by distance", function(){
			// arrange
			let length = 100;
			let distanceBetween = 10;
			let previousDistance = 25;
			let diggingCalculation = new DiggingCalculation();
			// act
			let actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, previousDistance);
			// asset
			let expected = 9;
			expect(actual).toBe(expected);
		});

		it("when holes to reuse and buried and length not evenly divisible by distance", function(){
			// arrange
			let length = 105;
			let distanceBetween = 10;
			let previousDistance = 25;
			let diggingCalculation = new DiggingCalculation();
			// act
			var actual = diggingCalculation.numberOfHolesNeeded(length,distanceBetween, previousDistance);
			// asset
			let expected = 9;
			expect(actual).toBe(expected);
		});
	});
});