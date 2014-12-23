// 必要なモジュールをロードする
var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 3333);
var db = new mongodb.Db('social_library_db', server, {safe:true});

db.open(function (err, db) {
  if (err) {
    throw err;
  }
});

// http.Serverオブジェクトを作成する
var server = http.createServer(onRequest);


// requestイベントハンドラを定義する
function onRequest(request, response) {
  // リクエストされたパスが「/」以外の場合、404エラーを返す
  if (request.url != '/') {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end('Error 404: Not Found.');
    return;
  }

  // POST以外のリクエストの場合、メインフォームを送信する
  if (request.method != 'POST') {
    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    response.end('200 not POST');
    return;
  }

  // POSTリクエストの場合、送信されたデータから占い結果を生成する
  if (request.method == 'POST') {
    // 送信されたデータを取得する
    request.data = '';
    request.on('data', function (chunk) {
      request.data += chunk;
    });
    request.on('end', sendResponse);
    return;
  }

  // データの受信が完了したら実行される関数
  function sendResponse() {
    var query = querystring.parse(request.data);

   
  }
}

// 待ち受けするポートとアドレスを指定
var PORT = 8080;
var ADDRESS = '127.0.0.1';

// 指定したポートで待ち受けを開始する
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');

