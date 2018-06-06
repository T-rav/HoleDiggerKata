let HoleDiggingConstants = {
  NoNewPlan: null
};

let HoleDiggingPlanner = function() {
  let _length;
  let _oldDistance;
  let _newDistances = [];

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
                pickNewDistance:function(){
                  let result =  _newDistances[0];
                  if(result >= _oldDistance){
                    return HoleDiggingConstants.NoNewPlan;
                  }
                  return result;
                }
              }
            }
          }
        }
      }
    }
  }
}
