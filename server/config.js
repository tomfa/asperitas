module.exports = {
  port: 8080,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb://localhost/reddit',
    test: 'mongodb://localhost/reddit_test',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  },
  access: {
    // Shared env var with React app frontend
    public: ['1', 'true'].includes(process.env.REACT_APP_PUBLIC_ACCESS),
    google: {
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      secretKey: process.env.GOOGLE_CLIENT_SECRET,
    }
  }
};
