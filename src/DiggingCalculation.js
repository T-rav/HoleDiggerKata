let DiggingCalculation = function(){
    let buildOldHoles = function(length,previousDistance){
      let existingHoles = [];
      
      if(previousDistance == DiggingConstants.NoHolesDug){
        return existingHoles;
      }
  
      for(let x = 0; x <= length; x+= previousDistance){
        existingHoles.push(x);
      }
  
      return existingHoles;
    }
  
    return{
      numberOfHolesNeeded:function(length, distanceBetweenHoles, previousDistance){
        let dugHoles = buildOldHoles(length, previousDistance);
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