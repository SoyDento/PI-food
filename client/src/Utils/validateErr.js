export default function validate(i) {
  let errors = {};

  (i.name.length < 1) ?
    errors.nameErr = '* requiere name' : errors.nameErr ='';

  if (i.nickname.length < 1) { errors.nicknameErr = '* requiere nickname'
  } else if (!/([A-Z])\w+/g.test(i.nickname)) {
    errors.nicknameErr = '* nickname requires at least one uppercase letter'
  } else if (!/(?=.*[0-9])/.test(i.nickname)) {
    errors.nicknameErr = '* nickname must have at least one number between 0 and 9'
  } else if (i.nickname.length >15 || i.nickname.length <3) {
    errors.nicknameErr = '* nickname must be between 3 and 15 characters long'
  } else if (!/(?=.*[@$?¡\-%()!¿*#_])/.test(i.nickname)) {
    errors.nicknameErr = 'nickname must have at least one special character'
  } else { errors.nicknameErr ='' };

  if (i.birthday.length < 1) { errors.birthdayErr = '* requiere birthday'
} else if (!/^(0?[1-9]|[12]\d|3[01])[-|.|/](0?[1-9]|1[0-2])[-|.|/](19|20)\d{2}$/.test(i.birthday)) {
    errors.birthdayErr = '* invalid date'
  } else { errors.birthdayErr = '' };

  if (i.img.length < 1) { errors.imgErr = '* requiere img'
} else if ( !i.img.includes('www.') && !i.img.includes('http:/') && !i.img.includes('https:/') ) {
    errors.imgErr = '* Image must be a url'
  } else { errors.imgErr = '' };

  (i.status.length < 1) ? errors.statusErr = '* requiere status' : errors.statusErr = '';

  (i.occupations.length < 1) ?
    errors.occupationsErr = '* requiere occupations' : errors.occupationsErr = '';

  return errors;
};
