const axios = require('axios');
const qs = require('querystring');

// ファイル更新するfsパッケージ
const fs = require("fs");

const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';

// GitHub Actions で実行する際に Security 値 LINE_TOKEN を利用する
// 
// 実際には、GitHub Actions の
// run: LINE_TOKEN=${{secrets.LINE_TOKEN}} node action.js
// という書き方で渡されています
const LINE_NOTIFY_TOKEN = process.env.LINE_TOKEN;

let config = {
    url: LINE_NOTIFY_API_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    data: qs.stringify({
        message: 'ProtoOut Studioからの通知だよー！',
    })
}

async function getRequest() {

  ////// LINE Notify に送る ////////////////////////
  let responseLINENotify;
  try {
    responseLINENotify = await axios.request(config);
    console.log(responseLINENotify.data);
  } catch (error) {
    console.error(error);
  }

  ////// データ保存 ////////////////////////
  const PATH = "./docs/apidata.json";  // ファイルの置き場所 // 事前にからファイルはコミットしておく
  console.log(responseLINENotify.data);
  let result = fs.writeFileSync(PATH, JSON.stringify(responseLINENotify.data));
  console.log(result);

}

// getRequest を呼び出してデータを読み込む
getRequest();
