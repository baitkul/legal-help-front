export default {
  isLoggedIn: state => state.auth.loggedIn,
  isAdmin: state => (state.auth.loggedIn && state.auth.user.role === 'ADMIN'),
  isOperator: state => (state.auth.loggedIn && state.auth.user.role === 'OPERATOR'),
  isClient: state => (state.auth.loggedIn && state.auth.user.role === 'CLIENT'),
  getUser: state => (state.auth.loggedIn && state.auth.user),
  getRoles: () => {
    return [
      { label: 'Адвокат', value: 'CLIENT' },
      { label: 'Оператор', value: 'OPERATOR' },
      { label: 'Админ', value: 'ADMIN' },
    ]
  }
}
