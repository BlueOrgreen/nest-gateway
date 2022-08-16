## 自定义 Logger

- 格式化返回对象 yarn add fast-json-parse
- 替换输出流 yarn add pino-multi-stream
- 处理文本流 yarn add split2

## Nodejs Api

#### fs.state() 用法及示例

fs.stat()方法用于返回有关给定文件或目录的信息。它返回一个 fs.Stat 对象，该对象具有几个属性和方法来获取有关文件或目录的详细信息。

`fs.stat( path, options, callback )`

- path:它包含必须检查的文件或目录的路径。它可以是字符串，缓冲区或 URL。
- options:该对象可用于指定将影响输出的可选参数。它具有一个可选参数：
  - bigint:它是一个布尔值，它指定 fs.Stats 对象中返回的数值是否为 bigint。默认值为 false。
- callback:执行该方法时将调用该函数。
  - err:如果该方法会引发错误
  - stats:Stats 对象包含文件路径的详细信息。

```js
const fs = require('fs');

// Getting information for a file
fs.stat('example_file.txt', (error, stats) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Stats object for:example_file.txt');
    console.log(stats);

    // Using methods of the Stats object
    console.log('Path is file:', stats.isFile());
    console.log('Path is directory:', stats.isDirectory());
  }
});
```

#### fs.rename() 用法及示例

`fs.rename( oldPath, newPath, callback )`

```js
const fs = require('fs');
fs.rename('hello.txt', 'world.txt', (e) => {
  if (e) {
    console.log(error);
  } else {
    console.log('\nFile Renamed!\n');
  }
});
```

#### fs.createReadStream() 用法及示例

createWriteStream()方法是fs模块的内置应用程序编程接口，可用于快速创建可写流，以将数据写入文件。当涉及大量数据时，与fs.writeFile之类的方法相比，该方法可能是更明智的选择。

`fs.createReadStream( path, options )`
- path:此参数保存读取文件的文件路径。它可以是String，Buffer或URL。
- options:它是一个可选参数，用于保存字符串或对象。

```js
let fs = require('fs'),  
let writer = fs.createWriteStream('test_gfg.txt')  

writer.write('GeeksforGeeks');
```


