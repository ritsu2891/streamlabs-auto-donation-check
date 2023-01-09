# <img src="public/icons/icon_48.png" width="45" align="left"> Streamlabs Auto Donation Check

Streamlabsのダッシュボード「最近のイベント」画面で確認ボタンを押していないドネートについて自動的に確認ボタンを押すGoogle Chromeの拡張機能です。

私の環境では上手く動いていますが、他の環境では試せていません。

## インストール

1. [Release](https://github.com/ritsu2891/streamlabs-auto-donation-check/releases)ページより**build.zip**をダウンロードします。

2. **build.zip**に含まれている**build**フォルダを適当な箇所に配置します。（どこでもかまいません）

3. Google Chromeにて[chrome://extensions/](chrome://extensions/)を開き、右上の「デベロッパーモード」をクリックして有効にします。その後「パッケージ化されていない拡張機能を読み込む」をクリックします。

![001](https://cdn.rpaka.dev/sadc/001.png)

5. 2.で用意した**build**フォルダを選択します。拡張機能一覧に下記画像のように拡張機能が追加されていればインストール完了です。

![002](https://cdn.rpaka.dev/sadc/002.png)

# 使い方

特に設定の必要はありません。Streamlabの最近のイベントページを開いていると、チェックマークが付いていないドネートの項目について自動でクリックしてチェックを付けていきます。

動作の有効/無効は右上の拡張機能ボタンのアイコンをクリックして表示されるポップアップより切り替えられます。

![003](https://cdn.rpaka.dev/sadc/003.png)

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

