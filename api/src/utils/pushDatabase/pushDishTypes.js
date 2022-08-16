const { DishType } = require('../../db.js');


let dTypes = [ 'main course', 'side dish', 'main dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast',
  'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink', 'dinner', 'lunch' ];

function pushDishTypes () {
    dTypes.forEach((dt) =>  DishType.create(dt) );
};

module.exports = pushDishTypes;
