こちらは「Coooms」のフロントエンドのリポジトリになります。バックエンドのリポジトリは[こちら](https://github.com/Takumi-Itaya/coooms-backend)です。

# Coooms

[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=React&logoColor=61DAFB)](https://react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18)
[![Thanks](https://img.shields.io/badge/Thank%20you-for%20visiting-00aab9)](https://www.hayabusatrip.com)

## 概要

現在は自然音、雨音、波音、しゃろう BGM の 4 種類の BGM を再生できます。ログインすると勉強時間の合計が見れるようになります。

## サービス URL

[https://coooms.com/](https://coooms.com/)  
ゲストアカウントは以下のアカウントをご利用ください。  
E メール: guest@email.com  
パスワード: Guest000/

## 使用している技術スタック

HTML, CSS, JavaScript, React

## なぜ作ろうと思ったのか

私は勉強をするとき youtube で作業用 BGM を聞いて勉強するのですが、youtube だとおすすめの動画や広告などで集中力が切れることがよくありました。そこでできる限り集中力を落とさずシンプルに BGM だけ聞けるサービスがあればいいのにという思いがあり Coooms と言うサービスを開発しました。

## 工夫した点

オーディオビジュアライザーやボタン、サイドバーにアニメーションを設定し、モダンな Web デザインにしたこと。

## 大変だった点、その対策

複数の BGM をループしながら再生する機能の実装するときに音声がならなかったり複数の音声が混ざったりするというバグが発生しました。
私はこういうエラーが出ないバグが発生したときの大体の原因が使っている技術の理解の浅さだと思います。なので今回でしたら React のコンポーネントの動きや new Audio の使い方などをもう一度勉強しなおすこで解決しました。

## 工数

4 ヶ月
