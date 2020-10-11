module.exports = {
  access: {
    public: ['1', 'true'].includes(process.env.REACT_APP_PUBLIC_ACCESS),
    google: {
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    },
  }
};
