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
  let _length;
  let _oldDistance;
  let _newDistances = [];
  let holeCalculator = new DiggingCalculation();

  let buildOldHoles = function(){
    let existingHoles = [];
    
    for(let x = 0; x <= _length; x+= _oldDistance){
      existingHoles.push(x);
    }

    return existingHoles;
  }

  return{
    withLength : function(length){
      _length = length;
      return{
        withOldDistance: function(oldDistance){
          _oldDistance = oldDistance;
          return{
            withNewDistance:function(newDistance){
              _newDistances.push(newDistance);
              return{
                withNewDistance:function(newDistance){
                  _newDistances.push(newDistance);
                  return this;
                },
                pickNewDistance:function(){
                  if(_newDistances.length == 1){
                    let result =  _newDistances[0];
                    if(result >= _oldDistance){
                      return HoleDiggingConstants.NoNewPlan;
                    }
                    return result;
                  }
                  
                  let selectedDistance = _newDistances[0];
                  let selectedDistanceWorkItems = Number.MAX_SAFE_INTEGER;

                  let oldHoles = buildOldHoles();
                  _newDistances.forEach(element=>{
                    let numberOfWorkItems = holeCalculator.numberOfHolesNeeded(length, element, oldHoles);
                    if(numberOfWorkItems < selectedDistanceWorkItems){
                      selectedDistance = element;
                      selectedDistanceWorkItems = numberOfWorkItems;
                    }
                  });

                  return selectedDistance;

                }
              }
            }
          }
        }
      }
    }
  }
}
