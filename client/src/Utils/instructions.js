

export default function instructions (obj) {

    let steps = [], ingredients = [], equipam = [];
    
    obj[0].steps?.forEach((s)=>{
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
    });
    
    return { st: steps, ing: ingredients, equip: equipam};
};