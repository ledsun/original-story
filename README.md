# What's this?
[『アニメ史上に残るオリジナル展開』へのコメント](http://b.hatena.ne.jp/entry/s/anond.hatelabo.jp/20171113140500)を作品名別に集計するスクリプトです。

# Setup

データ取得

```
curl 'http://b.hatena.ne.jp/entry/json/https://anond.hatelabo.jp/20171113140500' > bookmarks1.json
```

依存ライブラリインストール

```
npm i
```


# Run
コメント数10件の作品を表示

```
node . 10
```

集計結果をMarkdown形式で出力

```
node markdown-table.js
```

# Other

## 辞書データを順位順でソート

```
node sort-dictionary.js dictinary.json
```

辞書を整形したり、ヒットしないキーワードを削るときに使います。

## 辞書に含まれるキーワード数をカウントする

```
node node count-dictionary-words.js './dictionary.json'
```

キーワードが多すぎる辞書は名寄せ作業が大変になります。
数を数えます。

## マッチしないコメントを表示

```
node not-match.js
```

マッチしないコメントを出力します。
辞書にキーワードが足りていないか確認します。

## 元になる辞書の作り方

### mecab-ipadic-NEologd

[mecab-ipadic-neologd/README.ja.md at master · neologd/mecab-ipadic-neologd](https://github.com/neologd/mecab-ipadic-neologd/blob/master/README.ja.md)

の辞書を使います。

[Node.jsでmecab-ipadic-NEologdを使う](https://blog.knjcode.com/neologd-on-nodejs/)を参考にmecab-ipadic-NEologdをインストールします。

```
node create-base-dictionary-from-mecab.js > base-dictionary-mecab.json
```

### はてなキーワード

[はてなキーワード一覧ファイル - Hatena Developer Center](http://developer.hatena.ne.jp/ja/documents/keyword/misc/catalog)

のキーワードを使います。


取得

```
curl 'http://d.hatena.ne.jp/images/keyword/keywordlist_furigana_with_kid.csv'
```

EUC形式なので、UTF-8に変更します。

```
cat keywordlist_furigana.csv | iconv -f EUCJP -t UTF8 -c > keywordlist_furigana_utf8.csv
```

TSV形式なので、本ツールの辞書形式に変換します。

```
node tsv-to-dictionary.js > base-dictionary-hatena-keyword.json
```

ヒットするキーワードに絞込みます。

```
node sort-dictionary.js ./base-dictionary-hatena-keyword.json > dictinary-hatena-keyword.json
```
