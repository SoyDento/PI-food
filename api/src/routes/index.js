const { Router } = require('express');
const { recipesGet,
        recIDget,
        dietsGet,
        dishTypesGet,
        cuisinesGet,
        recIDremove,
        recPost,
        altAttribute,
        altCuisine } = require('../controllers');


const router = Router();


router.get('/recipes', recipesGet);  // ruta probada !!!!!! --

router.get('/recipe/:id', recIDget);   // ruta probada !!!!!! --

router.get('/diets', dietsGet);     // ruta probada !!!!!! --

router.get('/dishtypes', dishTypesGet);    // ruta probada !!!!!! --

router.get('/cuisines', cuisinesGet);    // ruta probada !!!!!! --

router.delete('/recipe/remove', recIDremove);  // ruta probada !!!!!! --

router.post('/recipe', recPost);    // ruta probada !!!!!! --

router.put('/recipe/:attribute', altAttribute);  // ruta probada !!!!!! --

router.put('/cuisine/:attribute', altCuisine);  // ruta probada !!!!!! --


module.exports = router;
