const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  transpileDependencies: ['uview-ui'],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@@', resolve('/'))
      .set('@', resolve('./src'))
      .set('@com', resolve('./src/components'))
      .set('@api', resolve('./src/api'))
      .set('@store', resolve('./src/store'))
      .set('@utils', resolve('./src/utils'))
      .set('@mixins', resolve('./src/mixins'))
      .set('@img', resolve('./src/static/images'));
  },
};
