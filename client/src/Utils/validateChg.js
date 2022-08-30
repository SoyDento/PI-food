export default function validateChg(i) {
  let errors = {}

  if (i.title) {
    if (!/([A-Z])\w+/g.test(i.title)) {
      errors.title = '* title requires at least one uppercase letter'
    } else if (i.title.length  < 3) {
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

  if (i.veryHealthy) {
    if (i.veryHealthy !== 'true' && i.veryHealthy !== 'false') {
      errors.veryHealthy = `* veryHealthy can only be 'true' or 'false'`
    }
  };

  if (i.cheap) {
    if (i.cheap !== 'true' && i.cheap !== 'false') {
      errors.cheap = `* cheap can only be 'true' or 'false'`
    }
  };

  if (i.image) {
    if ( !i.image.includes('www.') && !i.image.includes('http:/') && !i.image.includes('https:/') ) {
      errors.image = '* Image must be a url'
    }
  };

  return errors;
};
