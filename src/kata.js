let HoleDiggingConstants = {
  NoNewPlan: null
};

let DiggingCalculation = function(){
  return{
    numberOfHolesNeeded:function(length, distanceBetweenHoles, dugHoles){
      let result = Math.floor(length / distanceBetweenHoles);
      dugHoles.forEach(element=>{
        if(element % distanceBetweenHoles === 0){
          result--;
        }else{
          result++;
        }
      });
      return result;
    }
  }
};

let HoleDiggingPlanner = function() {
  

  let buildOldHoles = function(length,oldDistance){
    let existingHoles = [];
    
    for(let x = 0; x <= length; x+= oldDistance){
      existingHoles.push(x);
    }

    return existingHoles;
  }

  let selectBestPlan = function(newDistances, length, previousDistance) {
    let holeCalculator = new DiggingCalculation();

    let selectedDistance = newDistances[0];
    let selectedDistanceWorkItems = Number.MAX_SAFE_INTEGER;
    let oldHoles = buildOldHoles(length, previousDistance);
    newDistances.forEach(element => {
      let numberOfWorkItems = holeCalculator.numberOfHolesNeeded(length, element, oldHoles);
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
                      return HoleDiggingConstants.NoNewPlan;
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

