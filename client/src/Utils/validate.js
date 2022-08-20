export default function validate(i) {
  let errors = {};

  (i.name.length < 1) ?
    errors.name = '* requiere name' : errors.name ='';

  if (i.nickname.length < 1) { errors.nickname = '* requiere nickname'
  } else if (!/([A-Z])\w+/g.test(i.nickname)) {
    errors.nickname = '* nickname requires at least one uppercase letter'
  } else if (!/(?=.*[0-9])/.test(i.nickname)) {
    errors.nickname = '* nickname must have at least one number between 0 and 9'
  } else if (i.nickname.length >15 || i.nickname.length <3) {
    errors.nickname = '* nickname must be between 3 and 15 characters long'
  } else if (!/(?=.*[@$?¡\-%()!¿*#_])/.test(i.nickname)) {
    errors.nickname = 'nickname must have at least one special character'
  } else { errors.nickname ='' };

  if (i.birthday.length < 1) { errors.birthday = '* requiere birthday'
} else if (!/^(0?[1-9]|[12]\d|3[01])[-|.|/](0?[1-9]|1[0-2])[-|.|/](19|20)\d{2}$/.test(i.birthday)) {
    errors.birthday = '* invalid date'
  } else { errors.birthday = '' };

  if (i.img.length < 1) { errors.img = '* requiere img'
} else if ( !i.img.includes('www.') && !i.img.includes('http:/') && !i.img.includes('https:/') ) {
    errors.img = '* Image must be a url'
  } else { errors.img = '' };

  (i.status.length < 1) ? errors.status = '* requiere status' : errors.status = '';

  (i.occupations.length < 1) ?
    errors.occupations = '* requiere occupations' : errors.occupations = '';

  return errors;
};
