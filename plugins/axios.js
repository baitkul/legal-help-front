export default function ({ $axios, $auth, redirect }) {
  $axios.onError((err) => {
    const status = err.response.status
    switch (status) {
      case 401:
        if ($auth.loggedIn) {
          $auth.logout()
        }
        break

      case 404:
        redirect('/error')
        break

      default:
        break
    }
  })
}
