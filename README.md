# pyてょん to python
日本語入力で変換確定後に誤変換「pyてょん」を「python」に変換するChrome拡張機能です
## インストール
**この拡張機能はストアに公開していません**
### Build
1. 依存パッケージをインストール
   ```bash
   npm install # or npm i
   ```
2. ビルドする
   ```bash
   npm run build
   ```
3. Chrome で chrome://extensions を開く
4. デベロッパーモードを ON にする
5. 「パッケージ化されていない拡張機能を読み込む」を選択
6. このフォルダ内にある `dist/` フォルダを選択
### Release
ビルド済みファイルからのインストールは[Releases](https://github.com/Junya-Izumi/python-ime-typo-fixer/releases)を確認してください
## アップデート
> [!NOTE]
>  **v2.0.0からは選択するフォルダーが `dist/` になりました**<br>
>  v2.0.0未満からのアップデートでmanifestが読み込めない場合は、一度拡張機能を削除し`dist/` を選択して入れなおしてください
### Build
1. このリポジトリを pull する
2. ビルドする
    ```bash
    npm run build
    ```
3. Chrome で chrome://extensions を開く
4. この拡張機能の「再読み込み」をクリック
### Release
1. 新しいバージョンのReleaseから `python-ime-typo-fixer-vX.Y.Z.zip` をダウンロードする
2. 展開して既存のファイルと置き換える
3. Chrome で chrome://extensions を開く
4. この拡張機能の「再読み込み」をクリック
## 注意
リッチテキストエディタや一部テキスト欄で非対応の場合があります
## License
MIT License
***
この拡張機能が役に立ったら、⭐️ をつけてもらえると嬉しいです
