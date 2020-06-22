export const required = {
  required: true,
  message: 'Обязательное поле',
  formatter: value => value.trim(),
}
export const emailPattern = {
  message: 'Неверный адрес эл. почты',
  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}
export const passwordLength = {
  message: 'Пароль должен включать от 6 до 100 символов',
  pattern: /^.{6,100}$/,
}
export const passwordPattern = {
  message: 'Пароль может содержать только латиницу, цифры, общие символы пунктуации',
  pattern: /^[a-zA-Z0-9 `~!@#$%^&*()-_=+[\]{}\\|/;:'",.<>?]+$/,
}
const fullnameLength = {
  message: 'ФИО должно содержать минимум 3 символа',
  pattern: /^.{3,}$/,
}
const fullnamePattern = {
  message: 'ФИО может содержать только латиницу, кириллицу, пробелы, знак "-"',
  pattern: /^[a-zA-Zа-яА-Я -]+$/,
}
const rolePattern = {
  message: 'Обязательное поле',
  pattern: /^(CLIENT|OPERATOR|ADMIN)$/,
}
const phonePattern = {
  message: '996-XXX-XXX-XXX',
  pattern: /^(996)-\d{3}-\d{3}-\d{3}$/,
}

export const userRules = {
  email: [required, emailPattern],
  phone: [required, phonePattern],
  password: [{ required: true, message: 'Обязательное поле' }, passwordLength, passwordPattern],
  fullname: [required, fullnameLength, fullnamePattern],
  role: [required, rolePattern],
}

export const appealRules = {
  fullname: [required, fullnameLength, fullnamePattern],
  phone: [required, phonePattern],
  address: [required],
  description: [required],
}

export const profileRules = {
  email: [required, emailPattern],
  fullname: [required, fullnameLength, fullnamePattern],
}

export const passwordRules = {
  password: [{ required: true, message: 'Обязательное поле' }, passwordLength, passwordPattern],
  newPassword: [{ required: true, message: 'Обязательное поле' }, passwordLength, passwordPattern],
}

export const loginRules = {
  email: [{ ...required, message: ' ' }, { ...emailPattern, message: ' ' }],
  password: [{ required: true, message: ' ' }, { ...passwordLength, message: ' ' }, { ...passwordPattern, message: ' ' }],
}

export const signupRules = {
  phone: [required, phonePattern],
  fullname: [required, fullnameLength, fullnamePattern],
  password: [{ required: true, message: 'Обязательное поле' }, passwordLength, passwordPattern],
}
