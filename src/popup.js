'use strict';

import './popup.css';

(function () {
  const settingStorage = {
    get: (cb) => {
      chrome.storage.sync.get(['enable'], (result) => {
        if (result.enable === undefined) {
          result.enable = true;
          chrome.storage.sync.set(result, () => { });
        }
        cb(result);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        value,
        cb
      );
    },
  };

  function setupUI(setting) {
    document.getElementById('counter').innerHTML = setting.enable ? '有効' : '無効';

    var oldPowBtn = document.getElementById('powBtn');
    var powBtn = oldPowBtn.cloneNode(true);
    oldPowBtn.parentNode.replaceChild(powBtn, oldPowBtn);

    var powBtnFn = () => {
      console.log("button push");
      var newSetting = {
        enable: !setting.enable
      }
      settingStorage.set(newSetting, restore);
    }

    powBtn.addEventListener('click', powBtnFn);
    powBtn.innerHTML = setting.enable ? '無効にする' : '有効にする';
  }

  function restore() {
    settingStorage.get((setting) => {
      setupUI(setting);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'CHAGNE_POW',
            payload: {
              enable: setting.enable,
            },
          },
          (response) => {
            console.log('[ドネートチェック自動化] 設定変化通知完了');
          }
        );
      });
    });
  }

  document.addEventListener('DOMContentLoaded', restore);
})();