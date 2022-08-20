const { DishType } = require('../../db.js');


let dTypes = [ 'main dish', 'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast',
'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink', 'dinner', 'lunch' ];

  

function pushDishTypes () {
    dTypes.forEach((dt) =>  DishType.create({name: dt}) );
};

module.exports = pushDishTypes;
