export default function validate(i) {

  let errors = {}

  if (!i.title || i.title.length < 1) errors.title = '* title is required';  
  if (!i.servings || i.servings.length < 1) errors.servings = '* servings is required';
  if (!i.dishTypes || i.dishTypes.length < 1) errors.dishTypes = '* dishTypes is required';
  if (!i.healthScore || i.healthScore.length < 1) errors.healthScore = '* healthScore is required';

  if (i.title) {
    if (!/([A-Z])\w+/g.test(i.title)) {
      errors.title = '* title requires at least one uppercase letter'
    } else if (i.title.length < 3) {
      errors.title = '* title must contain more than three characters'
    } else if (/(?=.*[0-9])/.test(i.title)) {
      errors.title = '* title should not contain numbers, only words'
    } else if (!typeof i.title === 'string') {
      errors.title = '* title must be of type "string"'
    } 
  };
  if (i.healthScore) {
    if (i.healthScore < 0 || i.healthScore > 100) {
      errors.healthScore = '* healthScore must be within a range of 0 to 100'
    } else if (!typeof i.healthScore === 'number') {
      errors.healthScore = '* healthScore can only be a number'
    }  
  };
  if (i.image) {
    if ( !i.image.includes('www.') && !i.image.includes('http:/') && !i.image.includes('https:/') ) {
      errors.image = '* Image must be a url'
    }
  };
  if (i.servings) {
    if (i.servings < 1 || i.servings > 50) {
      errors.servings = '* servings must be within a range of 1 to 50 peoples'
    } else if (!typeof i.servings === 'number') {
      errors.servings = '* servings can only be a number'
    }  
  };
  if (i.readyInMinutes) {
    if (i.readyInMinutes < 1 || i.readyInMinutes > 4500) {
      errors.readyInMinutes = '* readyInMinutes must be within a range of 0 to 4500'
    } else if (!typeof i.readyInMinutes === 'number') {
      errors.readyInMinutes = '* readyInMinutes can only be a number'
    }  
  };
  if (i.cuisines && i.cuisines.length > 0) {
    if (!/([A-Z])\w+/g.test(i.cuisines)) {
      errors.cuisines = '* cuisines requires at least one uppercase letter'
    } else if (i.cuisines.length < 2) {
      errors.cuisines = '* cuisines must contain more than three characters'
    } else if (/(?=.*[0-9])/.test(i.cuisines)) {
      errors.cuisines = '* cuisines should not contain numbers, only words'
    } 
  };
  if (i.analyzedInstructions){
    if (Object.keys(i.analyzedInstructions).length > 0) {
      if (!i.analyzedInstructions[0].hasOwnProperty('steps')) {
        errors.analyzedInstructions = '* analyzedInstructions is required';
      }
    }     
  };

  return errors;
};
