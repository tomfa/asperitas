module.exports = {
  access: {
    public: ['1', 'true'].includes(process.env.REACT_APP_PUBLIC_ACCESS)
  }
};
