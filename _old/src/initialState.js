const initialState = {
  store: {
    fullName: null,
    email: null,
    avatar: null,
    requestUrl: null,
    apiKey: null,
    autoSecretDataAttribute: null,
  },
  get info() {
    return this.store;
  },
  set info(info) {
    this.store = info ?? {
      fullName: undefined,
      email: undefined,
      avatar: undefined,
      requestUrl: undefined,
      apiKey: undefined,
      autoSecretDataAttribute: undefined,
    };
  },
};
export default initialState;