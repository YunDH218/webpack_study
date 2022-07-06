// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

// export
module.exports = {
  // parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: { // 절대경로로 입력
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },
  // 번들링 후 결과물의 처리 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    host: 'localhost'
  }
}