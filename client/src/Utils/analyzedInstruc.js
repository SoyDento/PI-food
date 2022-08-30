export default function analyzedInstruc (step1,ing1,eq1,step2,ing2,eq2,step3,ing3,eq3,step4,ing4,eq4,step5,ing5,eq5) {
    
    let arr = [ing1,eq1,ing2,eq2,ing3,eq3,ing4,eq4,ing5,eq5];     console.log(arr);
    let arr2 = [];
    arr.forEach(e=>{ 
      (e.length > 0) ? arr2.push( e.split('-') ) :  arr2.push([]);
    });
    let [i1,e1,i2,e2,i3,e3,i4,e4,i5,e5] = arr2;    console.log(arr2);

    let ingred_1 = [], ingred_2 = [], ingred_3 = [], ingred_4 = [], ingred_5 = [];

    if (i1.length > 0) i1.forEach(i=> ingred_1.push( {name: i} ));
    if (i2.length > 0) i2.forEach(i=> ingred_2.push( {name: i} ));
    if (i3.length > 0) i3.forEach(i=> ingred_3.push( {name: i} ));
    if (i4.length > 0) i4.forEach(i=> ingred_4.push( {name: i} ));
    if (i5.length > 0) i5.forEach(i=> ingred_5.push( {name: i} ));

    let equip_1 = [], equip_2 = [], equip_3 = [], equip_4 = [], equip_5 = [];

    if (e1.length > 0) e1.forEach(i=> equip_1.push( {name: i} ));
    if (e2.length > 0) e2.forEach(i=> equip_2.push( {name: i} ));
    if (e3.length > 0) e3.forEach(i=> equip_3.push( {name: i} ));
    if (e4.length > 0) e4.forEach(i=> equip_4.push( {name: i} ));
    if (e5.length > 0) e5.forEach(i=> equip_5.push( {name: i} ));


    const analyzedInstructions = [
        {
          name: "",
          steps: [
            {
              number: 1,
              step: step1,
              ingredients: ingred_1,
              equipment: equip_1
            },
            {
              number: 2,
              step: step2,
              ingredients: ingred_2,
              equipment: equip_1
            },
            {
              number: 3,
              step: step3,
              ingredients: ingred_3,
              equipment: equip_3
            },
            {
              number: 4,
              step: step4,
              ingredients: ingred_4,
              equipment: equip_4
            },
            {
              number: 5,
              step: step5,
              ingredients: ingred_5,
              equipment: equip_5
            }
          ]
        }
      ];
    
      return analyzedInstructions;
}