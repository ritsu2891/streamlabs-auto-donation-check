'use strict';

console.log(`[ドネートチェック自動化] 初期化処理...`);

var lastCount = 0;
var run = true;

function runFn() {
  if (!run) {
    setTimeout(runFn, 1000);
    return;
  }

  // console.log("[ドネートチェック自動化] 走査");

  var contentFrame
  var contentDocument
  try {
    var contentFrame = document.getElementById("missionControl");
    var contentDocument = contentFrame.contentWindow.document;
  } catch (e) {
    setTimeout(runFn, 1000);
    return;
  }

  var donateItems = contentDocument.querySelectorAll(".event-donation");

  var diffCount = donateItems.length - lastCount;
  lastCount = donateItems.length;
  var execCount = 0;

  if (0 < diffCount) {
    console.log(`[ドネートチェック自動化] 新規検出${diffCount}件`);
  }

  for (var donateItem of donateItems) {
    try {
      if (diffCount < ++execCount) break;

      var opBtn = donateItem.querySelector(".table__button > button");
      var opBtnMark = opBtn.querySelector("i");
      var opBtnIsChecked = opBtnMark.className.split(' ').includes('fa-check');

      if (opBtnIsChecked) continue;
      opBtn.click();
      console.log("[ドネートチェック自動化] クリックしました");
    } catch (e) {
      console.log(e.message);
    }
  }

  setTimeout(runFn, 1000);
}

window.addEventListener("load", function () {
  chrome.storage.sync.get(['enable'], (result) => {
    if (result.enable === undefined) {
      result.enable = true;
    }
    run = result.enable;
    setTimeout(runFn, 1000);
  });
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHAGNE_POW') {
    console.log(`[ドネートチェック自動化] 設定変更：有効/無効 ${request.payload.enable}`);
    run = request.payload.enable;
  }
  sendResponse({});
  return true;
});