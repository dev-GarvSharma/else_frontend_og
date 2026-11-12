const ACCESS_TOKEN_KEY = "crm_access_token";
const REFRESH_TOKEN_KEY = "crm_refresh_token";
const USER_DATA_KEY = "crm_user_data";
const CART_KEY = "else_cart";

const getStorage = () =>
  typeof window !== "undefined" ? window.localStorage : null;

const readJson = (key) => {
  const value = getStorage()?.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const LocalStorageService = {
  getAccessToken() {
    return getStorage()?.getItem(ACCESS_TOKEN_KEY) ?? null;
  },

  getRefreshToken() {
    return getStorage()?.getItem(REFRESH_TOKEN_KEY) ?? null;
  },

  getUserData() {
    return readJson(USER_DATA_KEY);
  },

  getCart() {
    const cart = readJson(CART_KEY);
    return Array.isArray(cart) ? cart : [];
  },

  setCart(cart = []) {
    const storage = getStorage();
    if (storage) storage.setItem(CART_KEY, JSON.stringify(cart));
  },

  setTokenData(tokenData = {}) {
    const storage = getStorage();
    if (!storage) return;

    const accessToken = tokenData.accessToken ?? tokenData.access_token;
    const refreshToken = tokenData.refreshToken ?? tokenData.refresh_token;

    if (accessToken) storage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  setAuthData(authData = {}) {
    this.setTokenData(authData);
    if (authData.user) this.setUserData(authData.user);
  },

  setUserData(userData) {
    const storage = getStorage();
    if (storage) storage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  },

  clearAuthData() {
    const storage = getStorage();
    if (!storage) return;

    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY].forEach((key) =>
      storage.removeItem(key),
    );
  },
};

export default LocalStorageService;
