

export default function instructions (obj) {

    let steps = [], ingredients = [], equipam = [];
    
    obj.stepseps?.forEach((s)=>{
        steps.push(s.stepsep);
        s.ingredients?.forEach(element => {
            ingredients.push(element.name)
        });
        s.equipamment?.forEach(element => {
            equipam.push(element.name)
        });
      });
    
    return { st: steps, ing: ingredients, equip: equipam};
};