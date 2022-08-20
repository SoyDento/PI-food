export default function validate(i) {
  let errors = {};

  if (i.nickname) {
    if (!/([A-Z])\w+/g.test(i.nickname)) {
      errors.nickname = '* nickname requires at least one uppercase letter'
    } else if (!/(?=.*[0-9])/.test(i.nickname)) {
      errors.nickname = '* nickname must have at least one number between 0 and 9'
    } else if (i.nickname.length >15 || i.nickname.length <3) {
      errors.nickname = '* nickname must be between 3 and 15 characters long'
    } else if (!/(?=.*[@$?¡\-%()!¿*#_])/.test(i.nickname)) {
      errors.nickname = 'nickname must have at least one special character'
    }
  };

  if (i.birthday) {
    if (!/^(0?[1-9]|[12]\d|3[01])[-|.|/](0?[1-9]|1[0-2])[-|.|/](19|20)\d{2}$/.test(i.birthday)) {
      errors.birthday = '* invalid date'
    }
  };

  if (i.img) {
    if ( !i.img.includes('www.') && !i.img.includes('http:/') && !i.img.includes('https:/') ) {
      errors.img = '* Image must be a url'
    }
  };

  return errors;
};
