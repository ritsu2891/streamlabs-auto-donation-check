'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(`[rpaka SADC] 初期化処理`);
console.log(pageTitle);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

var lastCount = 0;

function runFn() {
  console.log("[rpaka SADC] 走査");

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
    console.log(`新規検出${diffCount}件`);
  }

  for (var donateItem of donateItems) {
    try {
      if (diffCount < ++execCount) break;

      var opBtn = donateItem.querySelector(".table__button > button");
      var opBtnMark = opBtn.querySelector("i");
      var opBtnIsChecked = opBtnMark.className.split(' ').includes('fa-check');

      if (opBtnIsChecked) continue;
      opBtn.click();
      console.log("[rpaka SADC] クリック");
    } catch (e) {
      console.log(e.message);
    }
  }

  setTimeout(runFn, 1000);
}

window.addEventListener("load", function () {
  console.log("load");
  setTimeout(runFn, 1000);

  /*
  let mutationObserver = new MutationObserver(
    mutations => runFn()
  )
  mutationObserver.observe(document.body, { childList: true })
  */
})