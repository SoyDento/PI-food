//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, PORT } = require('./src/db.js');
const  pushDiets  = require('./src/utils/pushDatabase/pushDiets.js');
const  pushCuisines  = require('./src/utils/pushDatabase/pushCuisines.js');
const  pushDishTypes  = require('./src/utils/pushDatabase/pushDishTypes.js');
const  pushRecipes  = require('./src/utils/pushDatabase/pushRecipes.js');
const  addTables  = require('./src/utils/pushDatabase/addTables.js');
const  changeRecipes  = require('./src/utils/pushDatabase/changeRecipes.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  // addTables();
  // pushDiets(); pushCuisines(); pushDishTypes();
  // pushRecipes(); 
  // changeRecipes();
  
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
