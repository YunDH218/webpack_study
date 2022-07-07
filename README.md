참고: [webpack docs](https://webpack.js.org/configuration)

# 프로젝트 생성
## webpack install  
세 가지 패키지를 개발의존성으로 설치한다.

- webpack
- webpack-cli
- webpack-dev-server@next  

```
npm i -D webpack webpack-cli webpack-dev-server@next
```  

## package.json setting
```json
"scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
    // --mode 뒤에 개발용(development)인지 제품용(production)인지 명시할 수 있다.
 }
```
## webpack 구성파일  
webpack.config.js에 구성 옵션을 상세할 수 있다. 여러 파일을 묶어 하나의 번들 형태로 결과물을 반환한다.  
```js
// import
const path = require('path')

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
  }
}
```

- `__dirname`  
현재 파일의 경로를 담는 변수. 기본적으로 제공되는 전역변수.
- `path.resolve(path1, path2)`  
path1과 path2를 이어 하나의 경로로 반환한다.  
- `clean`  
이전에 실행해서 만들어진 결과물을 삭제하는 옵션(default: false)  

path와 filename은 지정하지 않으면 자동으로 dist, entry 파일명으로 설정되기 때문에 위의 예시와 같이 작성할 필요는 없다.  

## plugins
아래 패키지를 개발의존성으로 설치한다.

- html-webpack-plugin  

```
npm i -D html-webpack-plugin
```

webpack.config.js  
```js
// import
const HtmlPlugin = require('html-webpack-plugin')

// export
module.exports = {
  // 번들링 후 결과물의 처리 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ]
}
```
  
# 정적 파일 연결  
- 1단계  
`static` 폴더 안에 `images`라는 폴더를 만들고 그 안에 연결할 파일을 넣어보자.  
예) [logo.png](./static/images/logo.png), [favicon.ico](./static/images/favicon.ico)  

- 2단계  
`copy-webpack-plugin` 파일을 개발의존성으로 설치한다.  
```
npm i -D copy-webpack-plugin
```

- 3단계  
webpack.config.js  
```js
// import
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // static에 있는 내용을 dist폴더로 copy해주는 역할
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ]
}
```

# module  
예를 들어 css 파일을 연결할 때, 정적 파일 연결을 위해 만들어 둔 static 폴더에 css파일을 포함시켜 연결할 수도 있지만, 더 많은 기능을 위해서는 다른 방법이 필요하다.  
root경로에 css폴더 안에 main.css파일을 연결한다고 하면 main.js에서 main.css를 import하는 방법이 그것이다.  
main.js  
```js
import './css/main.css'
```
하지만 js는 css를 읽을 수 없어 읽을 수 있게 하는 패키지가 필요하다.
- css-loader
- style-loader
```
npm i -D css-loader style-loader
```  

webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // css에 대하여~
        use: [  // 순서 중요!
          'style-loader', // compile된 style 적용
          'css-loader'  // 먼저 해석됨 - css compile
        ]
      }
    ]
  },
}
```

그럼 이제 scss를 연결하는 방법도 알아보자. `webpack.config.js`에서 css를 읽을 수 있도록하는 패키지들을 연결한 문장에서 scss에 대해서도 패키지들이 적용되도록 정규표현식을 수정해준다.
```js
test: /\.s?css$/,
```
또 scss를 읽기 위해서는 아래의 패키지가 필요하다.  
- sass-loader
- sass  
```
npm i -D sass-loader sass
```
`webpack.config.js`에서 sass-loader가 css-loader보다 더 먼저 해석되도록 가장 아래에 작성한다.