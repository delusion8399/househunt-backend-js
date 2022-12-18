module.exports = {
  server: {
    port: 5001,
    host: '127.0.0.1',
    hostWithPort: `127.0.0.1:${5001}`,
  },
  databases: {
    househunt:
      'mongodb+srv://delusion8399:delusion8399@cluster0.wrea4gz.mongodb.net/househunt-dev?retryWrites=true&w=majority',
  },
  services: {},
};
