const { Router } = require('express');
const { recipesGet,
        recIDget,
        dietsGet,
        recIDremove,
        recPost,
        altAttribute} = require('../controllers');


const router = Router();


router.get('/recipes', recipesGet);

router.get('/recipes/:id', recIDget);

router.get('/diets', dietsGet);

router.get('/dishtypes', dishTypesGet);

router.get('/cuisines', cuisinesGet);

router.delete('/removerec', recIDremove);

router.post('/recipes', recPost);

router.put('/:attribute', altAttribute);


module.exports = router;
