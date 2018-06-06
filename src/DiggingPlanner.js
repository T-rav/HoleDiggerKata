let DiggingPlanner = function() {

  let selectBestPlan = function(newDistances, length, previousDistance) {
    let holeCalculator = new DiggingCalculation();

    let selectedDistance = newDistances[0];
    let selectedDistanceWorkItems = Number.MAX_SAFE_INTEGER;

    newDistances.forEach(element => {
      let numberOfWorkItems = holeCalculator.numberOfHolesNeeded(length, element, previousDistance);
      if (numberOfWorkItems < selectedDistanceWorkItems) {
        selectedDistance = element;
        selectedDistanceWorkItems = numberOfWorkItems;
      }
    });
    return selectedDistance;
  }

  return{
    withLength : function(length){
      return{
        withOldDistance: function(oldDistance){
          return{
            withNewDistance:function(newDistance){
              let newDistances = [];
              newDistances.push(newDistance);
              return{
                withNewDistance:function(newDistance){
                  newDistances.push(newDistance);
                  return this;
                },
                pickNewDistance:function(){
                  
                  if(newDistances.length == 1){
                    let result =  newDistances[0];
                    if(result >= oldDistance){
                      return DiggingConstants.NoNewPlan;
                    }
                    return result;
                  }
                  
                  return selectBestPlan(newDistances, length, oldDistance);
                }
              }
            }
          }
        }
      }
    }
  }
}

