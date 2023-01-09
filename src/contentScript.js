'use strict';

console.log(`[ドネートチェック自動化] 初期化処理...`);

var run = true;
const TM_POLL = 1000; // ms

function runFn() {
  if (!run) {
    setTimeout(runFn, TM_POLL);
    return;
  }

  // console.log("[ドネートチェック自動化] 走査");

  var contentFrame
  var contentDocument
  try {
    var contentFrame = document.getElementById("missionControl");
    var contentDocument = contentFrame.contentWindow.document;
  } catch (e) {
    setTimeout(runFn, TM_POLL);
    return;
  }

  var donateItems = contentDocument.querySelectorAll(".event-donation");

  var rowNo = 1;
  for (var donateItem of donateItems) {
    try {
      var row = donateItem.querySelector(".table__info > div");
      var opBtn = donateItem.querySelector(".table__button > button");
      var opBtnMark = opBtn.querySelector("i");
      var opBtnIsChecked = opBtnMark.className.split(' ').includes('fa-check');

      if (opBtnIsChecked) continue;
      opBtn.click();
      row.click();
      console.log(`[ドネートチェック自動化] ${rowNo}行目をクリックしました`);

      rowNo++;
    } catch (e) {
      console.log(e.message);
    }
  }

  setTimeout(runFn, TM_POLL);
}

window.addEventListener("load", function () {
  chrome.storage.sync.get(['enable'], (result) => {
    if (result.enable === undefined) {
      result.enable = true;
    }
    run = result.enable;
    setTimeout(runFn, TM_POLL);
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

console.log(`[ドネートチェック自動化] 初期化処理完了`);