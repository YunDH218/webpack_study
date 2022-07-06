// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: { // 절대경로로 입력
    //path: path.resolve(__dirname, 'dist'),
    //filename: 'main.js',
    clean: true
  },
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [  // 순서 중요!
          'style-loader', // compile된 style 적용
          'css-loader'  // 먼저 해석됨 - css compile
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    // static에 있는 내용을 dist폴더로 copy해주는 역할
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }
}