"use strcit";

const axios = require("axios");
const fs = require("fs"); //注: npm i 不要

//データ更新関数
async function updateData(newData) {
  const PATH = "./docs/data.json";
  fs.writeFileSync(PATH, JSON.stringify(newData));
}

// 実際にデータを取得する getRequest 関数
async function getRequest() {
  let response;
  try {
    response = await axios.get(
      "https://onedannote.com/280/"
    );
    // console.log(response.data);
    let html = response.data;
    html = html.replace(/\r?\n/g, ""); //整形1: 改行などを削除して整形しやすくする

    //運行情報
    let unko = html.match(/class="latestprice2.pid280">(.*?)<\/div>/)[1];
    unko = unko.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ""); //整形2: タグを削除
    console.log(unko);

    //時間
    /*
    let jikan = html.match(/class="subText">(.*?)<\/span>/)[1];
    jikan = jikan.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ""); //整形2: タグを削除
    console.log(jikan);
    */

   let jikan = new Date().getTime(); // タイムスタンプを呼ぶので常に変わる

    const saveData = {
      date: jikan,
      msg: unko,
    };

    await updateData(saveData); //データ更新関数を実行
  } catch (error) {
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();