module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test-shop/'
    : '/'
}
const vueConfig = {
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/assets/styles/styles.scss";
          `,
        },
      },
    },
  };