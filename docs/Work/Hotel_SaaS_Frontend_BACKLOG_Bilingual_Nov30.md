# Hotel Booking SaaS — Product Backlog / プロダクトBacklog
Nov 28:
Gotta check if my AWS EC2 will expire.
Update files on AWS (73 files suggested).



更新日 / Updated: 2026-11-21

## Quick Plan / 最短実装計画 — November 30 / 11月30日

**Goal / 目標:** A publicly accessible demo: search → select hotel and room → enter guest information → booking confirmation. / 公開デモで「検索 → ホテル・客室選択 → 宿泊者情報入力 → 予約完了」を動かす。

1. **Search API + tests / 検索API＋基本テスト：** Filter by city, dates and guest count; include hotel details. / 都市・日付・人数で空室検索し、ホテル情報も返す。
2. **React search + selection / React検索・選択：** Search form → hotel results → select an available room. / 検索フォーム → ホテル一覧 → 空室選択。
3. **Booking / 予約：** Enter name, email, phone → confirmation without account registration. Adapt backend booking authorization, ownership and access rules safely. / 氏名・メール・電話番号を入力して、アカウント登録なしで予約完了。Backendの認証・予約所有権・照会権限を安全に調整。
4. **Demo data + release / デモデータ＋公開：** Seed hotels and rooms; test the end-to-end journey; deploy and update README. / デモデータ投入 → 一連の動作確認 → 公開・README更新。

**Defer / 後回し：** Live payments, optional filters, visual polish and unnecessary refactoring. / 実決済、追加フィルター、見た目の作り込み、不要なリファクタリング。

**Detailed backlog starts at line 20. / 詳細Backlogは20行目から。**

---

## 1. プロジェクト目標

**主な利用者：採用担当者・面接官。** 実際に操作できるホテル予約デモを通じて、Webアプリケーションの設計・実装力を短時間（目安3分）で伝える。

**デモの中心体験：** 都市・宿泊日・人数で検索 → 空室・料金の確認 → 客室選択 → 予約完了。

**成功基準**
- 初見の利用者が、手順説明なしで検索から予約完了まで進める。
- デモ用データが十分あり、検索結果が空ばかりにならない。
- バックエンドの正しさ（定員、日付、重複予約、認証・権限）を維持する。
- 公開デモ、GitHub README、APIドキュメントから実装内容を確認できる。

## 2. 現状

- **バックエンド：** TypeScript / Node.js / Express / PostgreSQL。認証、ホテル、客室、予約、ゲスト関連APIを実装済み。Docker、テスト、Swagger/OpenAPI、AWSデプロイ経験あり。
- `getHotels({ hotelId?, name?, city? })` は都市名で検索可能。
- `searchAvailableRooms` の都市フィルター、ホテル情報JOINはBackendの `WIP` ブランチで実装途中。現時点では正常動作・テスト通過は未確認。
- `createBooking` は `req.user.id` を `createdByUserId` として扱うため、現行経路はログイン前提。
- **フロントエンド：** React / TypeScript / Viteで開発開始。検索フォーム等を学習・実装中。
- **課題：** デモ用ホテルデータが少ない。検索から予約まで一貫したUIは未完成。

## 3. 優先順位付きBacklog

| ID | 優先度 | タスク | 完了条件 | 状態 |
|---|---|---|---|---|
| P1 | 最優先 | 検索UXの仕様を確定 | 都市・チェックイン・チェックアウト・人数（初期値1人）、ホテル単位の結果表示を確定 | **完了（仕様）** |
| P2 | 最優先 | `searchAvailableRooms` の検索APIを拡張 | `city`・`guestCount`・宿泊日で検索、`rooms.capacity >= guestCount`、ホテル情報JOIN、テストが通る | **進行中（WIP）** |
| P3 | 最優先 | 現実的なデモデータを用意 | 複数都市・ホテル・客室・料金・定員を検索できる。再現可能な投入方法がある | 未着手 |
| P4 | 最優先 | React検索フォームとAPI接続 | 都市・日付・人数で実際に検索し、読み込み・空結果・エラーを扱える | 進行中 |
| P5 | 高 | 検索結果・客室選択画面 | 条件に合う客室、ホテル名、料金、定員が分かり、客室を選べる | 未着手 |
| P6 | 高 | 予約フローの認証方針を決定 | 「予約時ログイン必須」か「ログイン不要のゲスト予約」かを、スコープとセキュリティを踏まえて決める | 要判断 |
| P7 | 高 | 予約入力・確認・完了画面 | 選択客室・宿泊日・人数を引き継ぎ、既存APIで予約作成できる | 未着手 |
| P8 | 高 | 検索・予約の自動テスト | 都市検索、日付、定員、重複予約、失敗時の応答を検証 | 未着手 |
| P9 | 高 | デモの公開・README更新 | 採用担当者がURLから触れ、GitHubで設計・起動方法を把握できる | 未着手 |
| P10 | 中 | UIの視認性・レスポンシブ対応 | PCとスマホで主要操作が無理なくできる | 未着手 |

## 4. 実装ステップ（最短ルート）

1. **検索体験を定義する（P1：完了）。** 都市・チェックイン・チェックアウトを必須、人数は初期値1人（検索時は必須）。検索結果は空室があるホテル単位で表示し、ホテル選択後に客室を表示。
2. **バックエンド検索APIを拡張する（P2：進行中）。** `city`、`guestCount`、日付を扱い、ホテル情報のJOIN、`rooms.capacity >= guestCount`、重複予約除外を検証する。まず動作とテストを確認し、その後Reactへ戻る。
3. **少量でも見栄えのするデモデータを投入する。** 複数都市に検索可能なホテル・客室を配置する（実在施設の情報を無断で事実として表示しない）。
4. **Reactで検索→結果表示を完成する。** API通信、Loading、該当なし、エラーを実装する。
5. **予約時の認証方針を確定する。** 既存のログイン必須を維持するか、ゲスト予約を追加するか決定してから予約画面を作る。
6. **予約完了までつなぐ。** 入力・確認・成功/失敗表示を実装する。
7. **テスト・公開・README。** 最重要フローを検証し、3分で試せるデモとして仕上げる。

## 5. 確定した検索仕様と責任分担（2026-11-18）

- **初期検索フォーム：** 都市、チェックイン、チェックアウト、宿泊人数。人数の初期値は **1人**。検索時は4項目が揃っていることを確認する。
- **追加フィルター：** 客室タイプ、最低・最高料金などは任意。
- **結果表示：** ホテル単位のカード一覧。ホテルを選択後、該当する空室・価格・定員を表示する。
- **Controller：** `guestCount` などリクエストを受け付ける。
- **Service：** 必須入力・日付・人数を検証し、必要に応じてRepositoryの客室単位結果をホテル単位に整理する。
- **Repository：** `hotels` と `rooms` をSQL JOINし、都市と客室定員（`capacity >= guestCount`）などで検索する。予約重複判定は既存ロジックを活かしてよい。
- **現状の注意：** BackendのJOINとcity追加はWIPであり、`city` を `rooms` 単体のSQLに指定してしまうと動かない。JOINしたSQLにWHERE条件を適用する必要がある。WIPがコミット済みでもP2完了とはみなさない。

## 6. 設計上の注意

- **`createdByUserId`：** クライアントから自由に指定させず、認証済みの場合はサーバー側の `req.user.id` から取得する。匿名予約を導入するなら、DBの所有者・連絡先・予約照会・認可モデルを別途設計する。
- **都市検索：** フロントエンドからホテルごとに何度も空室APIを呼ぶより、バックエンドで一括検索できるAPIを優先する。
- **検索の正しさ：** 日付範囲、価格範囲、定員、予約重複を破らない。
- **時間配分：** 追加機能やデザインの作り込みより、最初に動くエンドツーエンドのデモを優先する。

## 7. 今すぐ取り組む1件

**P2：Backend検索APIを動かしてテストする。**

- JOINと検索WHEREを同じSQLにまとめ、都市と人数を正しく絞り込む。
- Controller → Service → Repository の入出力を揃える。
- 必要なテストを通す。
- 完了後は **P4のReact検索フォームとAPI接続にすぐ戻る**。Backlog全体の詳細設計や不要なBackend最適化は先送り。


