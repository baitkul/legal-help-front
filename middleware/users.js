export default ({ store, error }) => {
  if (store.getters.isClient) {
    error({ statusCode: 404 })
  }
}
