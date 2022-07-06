참고: [webpack docs](https://webpack.js.org/configuration)

# 프로젝트 생성
## webpack install  
세 가지 파일을 개발의존성으로 설치한다.

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
아래 파일을 개발의존성으로 설치한다.

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