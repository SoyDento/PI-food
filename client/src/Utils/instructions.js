

export default function instructions (obj) {

    let steps = [], ingredients = [], equipam = [];
    console.log(obj);
    if (obj.length > 0) {
        obj[0].steps?.forEach((s)=>{
            if (s.step.length > 0) {
                steps.push(s.step);
                s.ingredients?.forEach(element => {            
                    if (!ingredients.includes(element.name)) {
                        ingredients.push(element.name)
                    }       
                });      
                s.equipment?.forEach(element => {
                    if (!equipam.includes(element.name)) {
                        equipam.push(element.name)
                    }            
            }); 
            }         
        });
    };
    
    
    return { st: steps, ing: ingredients, equip: equipam};
};