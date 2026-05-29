import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Copy,
  Heart,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Home,
  Trees,
  PlusCircle,
  Shirt,
  ExternalLink,
} from "lucide-react";
import "./style.css";

const heroImageUrl = "/top.png";

const identityRule =
  "アップロードされたペットの顔・表情・毛色・模様・目の形・鼻と口まわり・耳の位置・毛並み・体格を最優先で保持してください。犬・猫・ハムスターなど、元写真のペットの種類と本人らしさを守り、別の子に変えないでください。可愛く整える場合も、元写真の本人らしさを崩さないことを最重要にしてください。白目やまつ毛など、元写真にない要素は勝手に追加しないでください。";

const locationTree = {
  indoor: {
    label: "屋内",
    icon: Home,
    options: [
      "お姫さまの部屋",
      "可愛いスウィーツ屋さん",
      "アイドルのステージ",
      "海が見える窓辺",
      "庭園が見える窓辺",
      "ベッドルーム",
      "アフタヌーンティーの出来るお洒落カフェ",
    ],
  },
  outdoor: {
    label: "屋外",
    icon: Trees,
    options: [],
  },
};

const indoorWorlds = [
  {
    id: "dreamLolita",
    title: "🩷 夢かわ・ロリータ系",
    description: "お姫さま部屋、苺、レース、ぬいぐるみの甘い屋内世界。",
    places: ["お姫さまの部屋", "苺スウィーツルーム", "レースだらけの寝室", "お人形の部屋", "ミルキーピンクのサロン"],
    decor: ["レース", "パール", "苺", "くまのぬいぐるみ", "うさぎのぬいぐるみ", "フリル", "花かご"],
  },
  {
    id: "gothicIndoor",
    title: "🖤 ゴシック・ダークメルヘン系",
    description: "黒レース、月明かり、アンティーク時計の少しダークな屋内世界。",
    places: ["黒レースの寝室", "月明かりの書斎", "ゴシックホール", "アンティーク図書室", "蝋燭のある部屋", "闇かわステージ"],
    decor: ["黒レース", "キャンドル", "アンティーク時計", "薔薇", "ステンドグラス", "古い本", "銀色の小物"],
  },
  {
    id: "classicAntique",
    title: "☕ クラシカル・アンティーク系",
    description: "ヨーロッパ風サロンやアンティークカフェの上品な屋内世界。",
    places: ["アフタヌーンティールーム", "ヨーロッパ風サロン", "アンティークカフェ", "クラシカル書斎", "古い洋館"],
    decor: ["アンティーク家具", "ティーセット", "薔薇", "額縁", "レースカーテン", "クラシカルなランプ"],
  },
  {
    id: "idolStage",
    title: "🎀 アイドル・ステージ系",
    description: "ライブステージ、ネオン、ハート照明の華やかな屋内世界。",
    places: ["アイドルステージ", "ハートライトステージ", "ネオンライブステージ", "リボンだらけの舞台"],
    decor: ["スポットライト", "ハート照明", "リボン装飾", "キラキラライト", "マイク", "ステージカーテン"],
  },
  {
    id: "countryNatural",
    title: "🌲 ナチュラル・カントリー系",
    description: "木のおうちやカントリーキッチン。ピンクハウス系とも相性の良い屋内世界。",
    places: ["木のおうち", "カントリーキッチン", "花柄の寝室", "森のおうち", "パッチワーク部屋"],
    decor: ["小花柄", "木製家具", "パッチワーク", "野いちご", "生成りレース", "カントリー雑貨"],
  },
  {
    id: "sweetsMarchen",
    title: "🍓 スウィーツ・メルヘン系",
    description: "マカロン、キャンディ、苺ミルクの甘いお菓子の屋内世界。",
    places: ["マカロンルーム", "キャンディのお部屋", "チョコレートサロン", "ケーキ工房", "苺ミルクカフェ"],
    decor: ["マカロン", "キャンディ", "ケーキ", "苺", "チョコレート", "ホイップクリーム風装飾"],
  },
  {
    id: "heavenIndoor",
    title: "🌌 幻想・天国系",
    description: "雲の上、星降る部屋、光の回廊のような幻想的な屋内世界。",
    places: ["雲の上の寝室", "光の回廊", "星降るお部屋", "オーロラサロン", "天使のお部屋"],
    decor: ["羽", "星", "雲", "光の粒", "白い花", "淡い虹色の光"],
  },
  {
    id: "aliceIndoor",
    title: "♠️ 不思議ワールド室内版",
    description: "時計、トランプ、浮遊本、ティーカップがある不思議な屋内世界。",
    places: ["不思議なお茶会部屋", "時計だらけの部屋", "トランプの広間", "逆さま廊下", "浮遊本の図書室"],
    decor: ["トランプ", "時計", "ティーカップ", "浮遊本", "鍵", "うさぎモチーフ"],
  },
  {
    id: "simpleLuxury",
    title: "🤍 シンプル・ラグジュアリー系",
    description: "ブランド名や実在ロゴを使わず、白・ピンク・パール・リボン・ふわふわ素材で上品にまとめる、シンプル可愛い高級感のある屋内世界。",
    places: ["パールとリボンの上品ルーム", "ピンク×白の高級ギフトボックス", "ふわふわファーの撮影ブース", "白レースのドレッサールーム", "シンプル可愛いラグジュアリーサロン"],
    decor: ["パール", "白レース", "サテンリボン", "ふわふわファー素材", "上品な丸箱", "淡いピンクの小物"],
  },
  {
    id: "boardingSchool",
    title: "🥀 寄宿学校・学院系",
    description: "ヨーロッパの古い寄宿学校や学院のような、静かな映画感・冬の空気・赤薔薇が似合うクラシカルな世界。",
    places: ["雪の寄宿学校", "古い学院の回廊", "石造りの中庭", "冬の洋館前", "夕暮れの渡り廊下"],
    decor: ["赤薔薇", "古い石造り", "回廊", "雪", "アンティークな窓", "静かな冬の光"],
  },
];

const outdoorWorlds = [
  {
    id: "flowerGarden",
    title: "🌸 花・庭園ワールド",
    description: "花を主役にしたロード・庭園・丘・畑を作ります。",
    subCategories: [
      {
        id: "gardenType",
        title: "景色タイプ",
        single: true,
        options: ["ロード", "庭園", "丘", "畑", "公園", "小道"],
        customPlaceholder: "例：小さな花の坂道、湖沿いの花道",
      },
      {
        id: "mainFlower",
        title: "メインの花",
        single: true,
        options: ["なし", "桜", "薔薇", "ネモフィラ", "藤", "あじさい", "ラベンダー", "チューリップ", "コスモス", "ひまわり"],
        customPlaceholder: "例：スズラン、彼岸花、野いちごの花",
      },
      {
        id: "subFlowers",
        title: "その他の花",
        multi: true,
        options: ["桜", "薔薇", "ネモフィラ", "藤", "あじさい", "ラベンダー", "チューリップ", "コスモス", "ひまわり", "椿", "カスミソウ"],
        customPlaceholder: "例：ミモザ、パンジー、白い小花",
      },
      {
        id: "flowerDensity",
        title: "花の密度",
        single: true,
        options: ["自然な量", "花多め", "一面の花畑", "奥まで続く花ロード", "画面いっぱいに華やか"],
        customPlaceholder: "例：地面が見えないくらいぎっしり",
      },
    ],
  },
  {
    id: "castle",
    title: "🏰 お城・メルヘンワールド",
    description: "お城・宮殿・魔法学校など、物語のような背景を作ります。",
    subCategories: [
      { id: "castlePlace", title: "景色", single: true, options: ["お城の見える風景", "白い宮殿", "お姫さまのお庭", "メルヘンな村", "時計塔の街", "魔法学校", "白い回廊"], customPlaceholder: "例：ガラスのお城、薔薇に囲まれた宮殿" },
      { id: "castleMood", title: "テイスト", single: true, options: ["お姫さま風", "クラシカル", "アンティーク", "魔法ファンタジー", "パステルメルヘン"], customPlaceholder: "例：少しレトロで上品な童話風" },
      { id: "castleDecor", title: "装飾", multi: true, options: ["噴水", "お花アーチ", "リボン装飾", "ガラス細工", "レース旗", "パール装飾"], customPlaceholder: "例：白い階段、薔薇の門、金色のランプ" },
    ],
  },
  {
    id: "fantasy",
    title: "🌌 幻想・天国ワールド",
    description: "光の門・雲の上・星空・オーロラなど幻想的な世界を作ります。",
    subCategories: [
      { id: "fantasyPlace", title: "幻想世界", single: true, options: ["光の門", "光のドア", "雲の上", "神々しい花園", "星降る世界", "月夜の幻想世界", "オーロラの空", "パステル天国"], customPlaceholder: "例：花畑の先に光が漏れる天国のドア" },
      { id: "fantasyMood", title: "テイスト", single: true, options: ["やさしい", "神秘的", "神々しい", "パステル幻想", "夢の中のよう"], customPlaceholder: "例：切なく美しい天国の入口" },
      { id: "fantasyFlowers", title: "花畑", single: true, options: ["なし", "少なめ", "花畑あり", "一面の花畑"], customPlaceholder: "例：白い小花の花畑、淡い虹色の花畑" },
      { id: "fantasyLight", title: "光の強さ", single: true, options: ["やさしい光", "神秘的な光", "まばゆい光"], customPlaceholder: "例：ドアの隙間からあふれる金色の光" },
    ],
  },
  {
    id: "sea",
    title: "🌊 海・夏ワールド",
    description: "海辺、白い砂浜、夕焼け、南国リゾートなどを作ります。",
    subCategories: [
      { id: "seaPlace", title: "景色", single: true, options: ["白い砂浜", "海辺テラス", "南国リゾート", "貝殻の浜辺", "夜の海", "夕焼けの海辺", "ミコノス島の白い街並み", "グレートバリアリーフ風・夢かわ海中世界"], customPlaceholder: "例：白い桟橋、海が見える高台" },
      { id: "seaMood", title: "海の雰囲気", single: true, options: ["透明感のある海", "キラキラした海", "穏やかな海", "夕焼けの海", "幻想的な夜の海"], customPlaceholder: "例：淡い水色の宝石みたいな海" },
      { id: "seaDecor", title: "海モチーフ", multi: true, options: ["貝殻", "ヒトデ", "ガラス細工", "浮き輪", "マリンリボン", "小瓶"], customPlaceholder: "例：パールの貝殻、シーグラス" },
    ],
  },
  {
    id: "city",
    title: "🎡 街・遊園地ワールド",
    description: "遊園地、夜景、イルミネーション、街並みを作ります。",
    subCategories: [
      { id: "cityPlace", title: "景色", single: true, options: ["遊園地", "メリーゴーランド", "観覧車", "イルミネーション街", "カフェ通り", "ヨーロッパ風街並み", "スウィーツタウン", "ノイシュバンシュタイン城風のメルヘンなお城", "ロマンチック街道風の可愛いショップ通り", "おとぎ話のテーマパーク風", "パステルカラーの夢の遊園地"], customPlaceholder: "例：夜の遊園地、レトロな商店街" },
      { id: "cityTime", title: "時間帯", single: true, options: ["昼", "夕方", "夜"], customPlaceholder: "例：夕方から夜に変わる時間" },
      { id: "cityLight", title: "光演出", single: true, options: ["控えめ", "イルミ多め", "キラキラ幻想的", "ネオン風"], customPlaceholder: "例：遠くにきらめく街明かり" },
    ],
  },
  {
    id: "nature",
    title: "🌲 自然・季節ワールド",
    description: "森、雪景色、紅葉、雨の日、公園、和風庭園などを作ります。",
    subCategories: [
      { id: "naturePlace", title: "景色", single: true, options: ["木漏れ日の森", "雪景色", "紅葉ロード", "湖のほとり", "雨の日の公園", "和風庭園"], customPlaceholder: "例：竹林の小道、霧の森" },
      { id: "natureMood", title: "自然演出", single: true, options: ["やさしい自然", "幻想的", "透明感", "しっとり", "明るく爽やか"], customPlaceholder: "例：雨上がりの透明感、朝霧" },
    ],
  },
  {
    id: "alice",
    title: "♠️ 不思議ワールド",
    description: "アリスのような、ティーカップ・時計・トランプの夢世界を作ります。",
    subCategories: [
      { id: "alicePlace", title: "不思議世界", single: true, options: ["不思議の国のティーパーティー", "トランプの庭園", "時計うさぎの森", "マカロン迷路", "ハートのお城", "ティーカップワールド", "逆さま階段", "終わらないお茶会", "時計だらけの回廊", "空に浮かぶチェス盤"], customPlaceholder: "例：ねじれた廊下、逆さまの庭園" },
      { id: "aliceContainer", title: "不思議な入れ物", single: true, options: ["なし", "巨大ティーカップの中", "ハンプティダンプティの割れた卵の中", "時計の中の世界", "空飛ぶ本の中", "マカロンハウスの中"], customPlaceholder: "例：割れた卵の殻の中、巨大な砂時計の中" },
      { id: "aliceItems", title: "モチーフ", multi: true, options: ["トランプ", "時計", "ティーカップ", "マカロン", "浮遊本", "キャンディ", "うさぎ"], customPlaceholder: "例：空飛ぶ鍵、ハートの女王の飾り" },
      { id: "aliceMood", title: "テイスト", single: true, options: ["可愛い", "幻想的", "パステル", "カラフル", "少しダークメルヘン"], customPlaceholder: "例：ちょっと不気味で可愛い" },
    ],
  },
];

const sceneEffects = [
  { id: "fallingItems", title: "舞い落ちるもの", multi: true, options: ["なし", "花びら", "雪", "キラキラ（星）", "紙ふぶき", "羽", "光の粒"], customPlaceholder: "例：蝶、ハート、薔薇の花びら" },
  { id: "effectAmount", title: "演出量", single: true, options: ["少なめ", "適度に", "たくさん"], customPlaceholder: "例：画面の邪魔にならない程度" },
];

const outfitTranslations = {
  "ピンクハウス系": "ワッペンや刺繍がたくさん付いた、カントリーロマンティックな服。くま・いちご・ひなぎくモチーフ。ゆったりしたブルゾン。段フリルのロングスカート。生成りレースとコットン素材。レトロで可愛い雰囲気。",
  "ゴスロリドレス": "ゴスロリドレス",
  "パンクロック衣装": "チェーンがたくさん付いたハードロック風ファッション。黒レザー、スタッズ、シルバーチェーン、少し反抗的でかっこいい雰囲気。",
  "白馬の王子様衣装": "白と金を基調にした上品で神聖な王子様衣装。マント、宝石装飾、クラシカルなプリンス風の雰囲気。",
  "黒いロングコート": "寄宿学校や古い学院に似合う、黒い上品なロングコート。細身で中性的な学院生風のシルエットにし、静かな映画感とクラシカルな雰囲気を大切にしてください。",
  "黒を基調としたイギリス寄宿学校風制服": "黒を基調とした、イギリスの寄宿学校風制服。白シャツ、黒リボン、クラシカルなジャケットを合わせた、細身で中性的な学院生風の上品なスタイル。",
  "白シャツと黒リボンの学院制服": "白シャツと黒リボンを合わせた、清潔感のあるクラシカルな学院制服。大人びすぎず幼すぎない、細身で中性的な学院生風にしてください。",
  "チェック柄の学院制服": "落ち着いたチェック柄を使った、クラシカルで上品な学院制服。細身で中性的な学院生風のシルエットにしてください。",
  "冬の学院マント": "冬の寄宿学校や古い学院に似合う、黒や深い色のクラシカルな学院マント。小柄〜中くらいの細身で中性的な学院生風にしてください。",
  "赤薔薇が似合うクラシカル男子制服": "赤薔薇が似合う、黒を基調にしたクラシカルな学院制服。細身で中性的な学院生風にし、静かな映画感のある雰囲気を大切にしてください。",
  "リスのきぐるみ": "リスをモチーフにした、ふわふわで可愛い小動物きぐるみ。丸い耳としっぽを可愛く表現し、体型はまるくころんとしたぬいぐるみのようなシルエットにしてください。",
  "モモンガのきぐるみ": "エゾモモンガ風の、ふわふわで可愛い小動物きぐるみ。小さな耳と広がるシルエットを可愛く表現し、体型はまるくころんとしたぬいぐるみのようにしてください。",
  "ひよこのきぐるみ": "ひよこをモチーフにした、ふわふわ黄色の可愛いきぐるみ。小さなくちばし風の飾りを控えめに入れ、体型はまるくころんとした雛鳥のようにしてください。",
  "うさぎのきぐるみ": "うさぎをモチーフにした、ふわふわで可愛いきぐるみ。長い耳とやさしい雰囲気を可愛く表現し、体型はまるくころんとしたぬいぐるみのようにしてください。",
  "小鳥のきぐるみ": "小鳥をモチーフにした、ふわふわで可愛いきぐるみ。小さな翼風の飾りを自然に入れ、体型はまるくころんとした雛鳥のようにしてください。",
  "くまのきぐるみ": "くまをモチーフにした、ふわふわで可愛いきぐるみ。丸い耳と、まるくころんとしたぬいぐるみのような雰囲気を大切にしてください。",
};

const colorChipOptions = [
  { name: "おまかせ", value: "linear-gradient(135deg, #fff1f8, #ede9fe, #e0f2fe)" },
  { name: "白", value: "#ffffff" },
  { name: "アイボリー", value: "#fffaf0" },
  { name: "クリーム", value: "#fff7d6" },
  { name: "ベージュ", value: "#ead8bd" },
  { name: "ミルクティー", value: "#d8c1a3" },
  { name: "キャメル", value: "#c77f2f" },
  { name: "茶", value: "#8b5a3c" },
  { name: "ベビーピンク", value: "#ffd6e8" },
  { name: "くすみピンク", value: "#d8a2b0" },
  { name: "ピンク", value: "#ff7ab6" },
  { name: "濃いピンク", value: "#db2777" },
  { name: "赤", value: "#ef4444" },
  { name: "葡萄色", value: "#5b3a68" },
  { name: "オレンジ", value: "#fb923c" },
  { name: "黄色", value: "#ffd84d" },
  { name: "薄い黄色", value: "#fff59d" },
  { name: "からし色", value: "#c99a00" },
  { name: "水色", value: "#67c7f0" },
  { name: "青", value: "#2563eb" },
  { name: "紺", value: "#1e3a8a" },
  { name: "黄緑", value: "#a3e635" },
  { name: "緑", value: "#3fa65b" },
  { name: "モスグリーン", value: "#556b2f" },
  { name: "藤色", value: "#c4b5fd" },
  { name: "紫", value: "#9333ea" },
  { name: "紅桔梗色", value: "#4f46a5" },
  { name: "蕎麦切色", value: "#c8cec4" },
  { name: "グレー", value: "#9ca3af" },
  { name: "黒", value: "#111827" },
  { name: "金", value: "#d4a72c" },
  { name: "銀", value: "#c7cbd1" },
];

const clothingCategories = [
  { id: "clothingSeason", title: "服の季節", single: true, defaultValue: "おまかせ", options: ["おまかせ", "春", "夏", "秋", "冬", "酷寒"] },
  { id: "clothingShape", title: "服の形", single: true, defaultValue: "おまかせ", options: ["おまかせ", "なし", "ワンピース", "ドレス", "エプロンワンピース", "ケープ", "制服", "着ぐるみ", "マント"], customPlaceholder: "例：ピンクハウス風ワンピース、寄宿学校風制服" },
  { id: "clothingDecor", title: "服の装飾", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "フリル", "レース", "リボン", "チュール", "パール", "刺繍"] },
  { id: "fruitPattern", title: "果物柄", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "苺", "さくらんぼ", "苺と白い花", "自由記入"], customPlaceholder: "例：桃、ブルーベリー、野いちご" },
  { id: "flowerPattern", title: "花柄", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "小花柄", "薔薇", "デイジー", "デフォルメデイジー", "自由記入"], customPlaceholder: "例：すずらん、ミモザ、チューリップ柄" },
  { id: "otherPattern", title: "その他柄", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "チェック", "水玉", "ヒョウ柄", "ストライプ", "唐草", "ボタニカル", "千鳥", "自由記入"], customPlaceholder: "例：星柄、ハート柄、クラシカルな総柄" },
];

const outfitColorCategories = [
  { id: "outfitColorChips", title: "服セットの色合い", type: "colorChips", maxSelect: 3, defaultValue: "おまかせ", options: colorChipOptions, customPlaceholder: "色合い自由記入" },
];

const headCategories = [
  { id: "headShape", title: "帽子の形", single: true, defaultValue: "おまかせ", options: ["おまかせ", "リボン", "垂れリボン", "カチューシャ", "ヘッドドレス", "ボンネット", "ベレー帽", "麦わら帽子", "かぶりもの", "ティアラ", "自由記入"], customPlaceholder: "例：白レースボンネット、苺リボン、天使のヘッドドレス" },
  { id: "headDecor", title: "頭装備の飾り", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "花", "リボン", "耳"] },
  { id: "earType", title: "耳の種類", single: true, defaultValue: "おまかせ", dependsOn: { id: "headDecor", value: "耳" }, options: ["おまかせ", "猫耳", "くま耳", "うさぎ耳", "垂れ耳うさぎ", "狐耳"] },
];

const accessoryCategories = [
  { id: "accessories", title: "アクセサリー", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "ネックレス", "首リボン", "ブローチ", "バッグ", "サングラス"], customPlaceholder: "例：パールの首飾り、ハートのバッグ、小さな王冠ブローチ" },
];

const shoeCategories = [
  { id: "shoeShape", title: "靴の形", single: true, defaultValue: "おまかせ", options: ["おまかせ", "ローファー", "ブーツ", "スニーカー", "サンダル", "パンプス", "バレエシューズ"], customPlaceholder: "例：白いレース靴、ピンクの長靴" },
  { id: "shoeDecor", title: "靴の飾り", multi: true, defaultValue: "おまかせ", options: ["おまかせ", "リボン", "レース", "花", "パール"] },
];

const multiCategories = [
  { id: "containerScene", title: "ペットのポーズ・ギミック", single: true, defaultValue: "おまかせ", options: ["おまかせ", "ちょこんと座る", "窓辺", "クッション", "前足そろえ", "スノードームの中", "シャボン玉の中", "ティーカップの中", "グラスの中", "苺バスケットの中", "花かごの中", "プレゼント箱の中", "ベビーベッド", "マカロンクッションの上", "馬車の中"], customPlaceholder: "例：宝石箱の中、透明な香水瓶の中、窓辺" },
  { id: "gesture", title: "ペットのしぐさ", defaultValue: "おまかせ", options: ["おまかせ", "首かしげ", "お花くんくん", "スイーツを食べる", "ケーキを見る", "笑顔"], customPlaceholder: "例：マカロンを見る、リボンを見上げる、ぺろっ" },
  { id: "items", title: "小物・飾り", defaultValue: "おまかせ", options: ["おまかせ", "なし", "レース", "リボン", "パール", "フリル", "苺", "フルーツ各種いろいろ", "スウィーツ", "紅茶", "アフタヌーンティー", "花かご", "カーテン", "くまのぬいぐるみ", "うさぎのぬいぐるみ"], customPlaceholder: "例：小さな王冠、ピンクの魔法ステッキ" },
  { id: "wallpaper", title: "屋内の壁紙", indoorOnly: true, single: true, defaultValue: "おまかせ（屋内世界観に合わせる）", options: ["おまかせ（屋内世界観に合わせる）", "ピンクのストライプ壁紙", "苺柄の壁紙", "薔薇柄の壁紙", "小花柄の壁紙", "レース模様の壁紙", "天使やリボンの絵がある壁紙", "レースカーテン越しの光", "白い腰壁パネル"], customPlaceholder: "例：ピンクの薔薇柄壁紙、白い腰壁" },
  { id: "wallDecor", title: "屋内の壁飾り", indoorOnly: true, defaultValue: "おまかせ", options: ["おまかせ", "なし", "額縁入りの可愛い絵", "ドライフラワーの壁飾り", "リボンガーランド", "Happy Birthdayと書かれた風船のガーランド", "アンティーク風の飾り棚", "小さな鏡", "ウォールランプ", "パールガーランド"], customPlaceholder: "例：額縁の天使画、リボンガーランド" },
  { id: "color", title: "全体の色合い", single: true, defaultValue: "おまかせ", options: ["おまかせ", "選んだ小物や服に合わせて自然に", "背景に合わせておまかせ", "服の色を主役にして調整", "小物の色を差し色にして調整", "白ピンク", "ミルキーピンク", "藤色", "クリームホワイト", "淡い水色", "桜ピンク", "パステル虹色", "淡い黄色", "上品なラベンダーピンク", "黒×ピンク", "黒×紫", "白×金"], customPlaceholder: "例：白多めのピンク、淡い藤色" },
  { id: "density", title: "密度・余白", single: true, defaultValue: "おまかせ", options: ["おまかせ", "すっきり", "普通", "ごちゃかわ", "超ごちゃかわ"], customPlaceholder: "例：余白多め、背景はすっきり" },
  { id: "textOverlay", title: "文字入れ（短い英語推奨・失敗する場合あり）", single: true, defaultValue: "なし", options: ["なし", "Happy Birthday", "Happy Anniversary", "Thank you", "Welcome", "Sweet Dream"], customPlaceholder: "例：Happy Birthday（短い英語推奨）" },
  { id: "size", title: "縦横の比率", single: true, defaultValue: "正方形 1:1", options: ["正方形 1:1", "インスタ投稿用 縦長4:5", "リール・ストーリー用 縦長9:16", "横長16:9"], customPlaceholder: "例：横長3:2、縦長2:3" },
];

const uiSections = [
  { id: "clothing", title: "服", categories: clothingCategories },
  { id: "head", title: "頭装備", categories: headCategories },
  { id: "accessory", title: "アクセサリー", categories: accessoryCategories },
  { id: "shoes", title: "靴", categories: shoeCategories },
  { id: "outfitColors", title: "服セットの色", categories: outfitColorCategories },
];

const allCategoryDefinitions = [
  ...clothingCategories,
  ...outfitColorCategories,
  ...headCategories,
  ...accessoryCategories,
  ...shoeCategories,
  ...multiCategories,
  ...sceneEffects,
  ...outdoorWorlds.flatMap((world) => world.subCategories || []),
];

const initialSelected = Object.fromEntries(
  allCategoryDefinitions
    .filter((category) => category.defaultValue)
    .map((category) => [category.id, [category.defaultValue]])
);

const customFieldLabels = Object.fromEntries(
  allCategoryDefinitions.map((category) => [category.id, category.title])
);

const customPlaceholders = Object.fromEntries(
  allCategoryDefinitions.map((category) => [category.id, category.customPlaceholder || "カンマ、読点、改行で複数追加できます"])
);

const recommendedPrompts = [
  {
    id: "rose-swing-garden",
    title: "薔薇のブランコ庭園",
    label: "ゆゆ姫5月のおすすめ",
    image: "/rose-swing-garden.png",
    description: "薔薇のアーチ、花かごブランコ、石畳の小道、天使像まで見える上品な遠景構図。",
    prompt: `${identityRule}

【世界観・背景】
美しい薔薇の庭園。色とりどりの薔薇（主にピンク系だが、水色、黄色、赤、オレンジ、藤色など様々な色）が咲き誇っています。大きな薔薇のアーチから、薔薇で装飾されたブランコが吊り下げられています。

ブランコのチェーン部分にも薔薇や蔦が美しく巻き付いており、座面部分は花かごのようになっています。花かごはたっぷりの薔薇、レースのような花飾り、小花、繊細な装飾で華やかに彩られています。

花かごの中には、このペットがいます。ペットは幸せそうにニコニコ笑いながら、優しく揺れる薔薇のブランコに乗っています。

画面はペットのアップではなく、少し引いた遠景構図にしてください。ペットは画面中央〜やや下あたりに小さめに配置し、薔薇のアーチ全体、ブランコ全体、花かご、美しい薔薇の庭園、石畳の小道、奥に見える天使像や庭園の背景までしっかり見えるようにしてください。

庭園には奥行き感があり、薔薇が自然に広がっています。背景には白いガゼボ、噴水、天使像、クラシカルな庭園装飾なども自然に配置してください。

【服・アクセサリー】
必要に応じて、アップロード画像の服装・リボン・アクセサリーを保持してください。または、ユーザーが指定した服装・アクセサリーがある場合は、それを自然に反映してください。服装を追加・変更する場合も、ペット本人の顔・表情・毛色・体格を変えないでください。

【色合い・光・雰囲気】
現実の写真のような美しさを保ちながら、夢の中のような幻想的な雰囲気にしてください。柔らかな白い光、ふんわりした逆光、淡い霧、空気中に漂うきらめく光の粒、透明感のある空気感を加えてください。薄いピンクの花びらが、風に乗って優しくそよそよ舞っています。

全体は明るく、透明感があり、上品で夢可愛い雰囲気。暗い雰囲気、ゴシック調、夜景、強すぎる魔法エフェクト、派手すぎる発光、暗い霧演出にはしないでください。

黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色調を暗く引きずらないでください。ペット本来の毛色は保ちつつ、背景は選んだ世界観どおり明るく、選択した色合いや世界観を維持してください。

【仕上げ】
写真スタイル。超高精細。ふんわり柔らかな被写界深度。自然な光。インスタストーリー用の縦長9:16サイズ。とても幻想的で、メルヘンで、上品で愛らしい一枚にしてください。`,
  },
  {
    id: "ajisai-road",
    title: "雨の日のあじさいロード",
    label: "ゆゆ姫5月のおすすめ",
    image: "/ajisai-road.png",
    description: "あじさい・お天気雨・虹・フリル傘の、透明感たっぷりな夢かわ世界。",
    prompt: `${identityRule}\n\n屋外の「雨の日のあじさいロード」で、たくさんのあじさい（桜ピンク、藤色、水色）に囲まれたペットの可愛い静止画。少なめの小さな水玉（ピンク・水色・藤色）が入った、フリル付きの白い可愛い傘をペットが持っています。\n\n背景には、奥まで続くあじさいロード、美しい雨粒、お天気雨の透明感、淡い虹を入れてください。晴れているのに雨が降っているような、明るく幻想的な雰囲気。雨の日でも暗くせず、透明感のあるハイキーな明るさを維持してください。\n\nペットは、花型ポケットの付いた可愛いフリル付きのピンクのレインコートを着ています。右耳の下には可愛いピンクの細長いフリル付きリボンをつけています。服はペットの体型に自然に合っていて、顔や鼻口まわりを隠さないでください。\n\n色合いは桜ピンクを中心に、藤色・淡い水色を組み合わせ、少量の白や淡い黄色のあじさいも配置してください。\n\n雰囲気は、透明感、絵本のような可愛さ、やさしい光、夢かわいい世界観。自然の景色を活かしつつ、華やかだけど自然な可愛さを大切にしてください。\n\n黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色味を暗く引きずらないでください。ペット本来の毛色を保ちつつ、背景は明るく、選択した世界観どおりのやさしい色合いを維持してください。\n\nペットは小首をかしげながら、傘を持ってこちらを見ています。縦横の比率は4:5の縦長。ふんわり上品で夢かわいい一枚にしてください。`,
  },
];

function splitCustomText(value) {
  if (!value) return [];
  return value.split(/[、,\n]/).map((item) => item.trim()).filter(Boolean);
}


function findCategoryDefinition(key) {
  return allCategoryDefinitions.find((category) => category.id === key);
}

function isSingleCategory(key) {
  const category = findCategoryDefinition(key);
  return Boolean(category?.single) || key === "location";
}

function hasNoneSelected(selected, key) {
  return (selected[key] || []).includes("なし");
}

function isAutoValue(item) {
  return item === "おまかせ" || item === "なし" || item === "自由記入" || item === "おまかせ（屋内世界観に合わせる）";
}

function getValues(selected, custom, key, { keepAuto = false } = {}) {
  const customValues = splitCustomText(custom[key]);
  const selectedValues = selected[key] || [];

  if (isSingleCategory(key) && customValues.length) {
    return customValues.filter((item) => keepAuto || !isAutoValue(item));
  }

  return [...selectedValues, ...customValues].filter((item) => keepAuto || !isAutoValue(item));
}

function joinValues(selected, custom, key, fallback = "", options = {}) {
  const values = getValues(selected, custom, key, options);
  return values.length ? values.join("、") : fallback;
}

function getSingleValue(selected, custom, key, fallback = "", options = {}) {
  const customValues = splitCustomText(custom[key]);
  if (customValues.length) return customValues[0];

  const values = (selected[key] || []).filter((item) => options.keepAuto || !isAutoValue(item));
  return values.length ? values[values.length - 1] : fallback;
}

function getDefaultSelected(categoryId) {
  const defaultValue = findCategoryDefinition(categoryId)?.defaultValue;
  return defaultValue ? [defaultValue] : [];
}

function describeAutoFallback(label) {
  return `${label}は、選んだ背景・季節・世界観に合わせて自然におまかせしてください。`;
}

function getSizeInstruction(size) {
  if (size.includes("1:1") || size.includes("正方形")) return "縦横の比率は1:1の正方形。";
  if (size.includes("4:5")) return "縦横の比率は4:5の縦長。";
  if (size.includes("9:16")) return "縦横の比率は9:16の縦長。";
  if (size.includes("16:9")) return "縦横の比率は16:9の横長。";
  return size ? `縦横の比率は${size}。` : "";
}

function translateOutfit(outfit) {
  if (!outfit) return "";
  return outfit.split("、").map((item) => outfitTranslations[item] || item).join("、");
}

function getAutoLightingInstruction({ locationType, indoorWorldId, outdoorWorldId, locationOption, color }) {
  const sceneHint = locationType === "indoor"
    ? `屋内世界観ID:${indoorWorldId}、場所:${locationOption}`
    : `屋外世界観ID:${outdoorWorldId}、場所:${locationOption}`;

  return `光・明るさはユーザーに選ばせず、選んだ世界観・場所・色合いに合わせて自動調整してください。${sceneHint}に最も似合う、ペットが一番可愛く見える自然で上品な光にしてください。夢かわ・ロリータ・薔薇・花畑・お姫さま系では、明るく清潔感があり、白や淡いピンクがきれいに見えるふんわり柔らかな光にしてください。海・水辺・空・透明感のある世界では、明るく澄んだ青空感と透明感を保ってください。夜景・月明かり・ゴシック・ダークメルヘン系の場合も、背景の雰囲気は残しつつ、ペットの顔・目・鼻口まわり・毛並みは暗くせず、はっきり可愛く見える明るさに補正してください。黒い子・濃い茶色の子・グレー系の子でも、ペットの毛色に背景全体が暗く引きずられないようにしてください。ペット本来の毛色は保ちつつ、背景は選んだ世界観本来の明るさ・色合い・空気感を維持してください。強すぎる白飛び、暗い沈み込み、不自然な発光、顔が影で見えにくくなる表現は避けてください。`;
}

function translateColor(color) {
  if (!color) return "";
  const translations = {
    "選んだ小物や服に合わせて自然に":
      "選んだ小物・服・背景に自然になじむ色合い。特定の色を強く固定せず、全体が可愛くまとまるように調整してください。",
    "背景に合わせておまかせ":
      "選んだ背景や世界観に合わせて自然にまとまる色合い。ペットの毛色は変えず、背景と小物が調和するようにしてください。",
    "服の色を主役にして調整":
      "選んだ服の色を主役にして、背景や小物はその色を引き立てるように自然に調整してください。",
    "小物の色を差し色にして調整":
      "選んだ小物の色を差し色として使い、全体はまとまりのある可愛い色合いにしてください。",
  };

  return color
    .split("、")
    .map((item) => translations[item] || item)
    .join("、");
}

function translateWallpaper(wallpaper) {
  if (!wallpaper) return "";
  const translations = {
    "おまかせ（屋内世界観に合わせる）":
      "選んだ屋内の世界観に自然に合う壁紙や壁面デザイン",
  };

  return wallpaper
    .split("、")
    .map((item) => translations[item] || item)
    .join("、");
}

function translateTextOverlay(textOverlay) {
  if (!textOverlay || textOverlay === "なし") return "";
  return `画像内に「${textOverlay}」という短い文字を、選んだ世界観・背景・服・色合いに合うフォント風デザインで、背景の邪魔にならない位置に自然に入れてください。ゴシックならゴシック調、クラシカルならクラシカル調、海や空なら爽やかな雰囲気など、文字の素材感と装飾も世界観に合わせてください。文字が崩れる場合は、文字なしでも自然に見える構図にしてください。`;
}

function translateContainerScene(scene) {
  if (!scene) return "";
  const translations = {
    "ちょこんと座る": "ペットがちょこんと可愛く座っています",
    "窓辺": "ペットが可愛い窓辺にふんわり配置されています",
    "クッション": "ペットが可愛いクッションの上でくつろいでいます",
    "前足そろえ": "ペットが前足をそろえて上品に座っています",
    "スノードームの中": "ペットが透明なスノードームの中に入っています",
    "シャボン玉の中": "ペットが大きな透明シャボン玉の中に入っています",
    "ティーカップの中": "ペットがアンティークで可愛いティーカップの中に入っています",
    "グラスの中": "ペットが可愛いガラスのグラスの中に入っています",
    "苺バスケットの中": "ペットが苺のバスケットの中に入っています",
    "花かごの中": "ペットが花かごの中に入っています",
    "プレゼント箱の中": "ペットが大きなプレゼント箱の中に入っています",
    "ベビーベッド": "ペットがレースのベビーベッドの中にいます",
    "マカロンクッションの上": "ペットがマカロン型クッションの上にいます",
    "馬車の中": "ペットが小さな馬車の中にいます",
  };

  return scene
    .split("、")
    .map((item) => translations[item] || item)
    .join("。");
}

function translateGesture(gesture) {
  if (!gesture) return "";
  const translations = {
    "首かしげ": "小首をかしげる",
    "お花くんくん": "お花をくんくんする",
    "スイーツを食べる": "スイーツを可愛く食べる",
    "ケーキを見る": "ケーキを見つめる",
    "笑顔": "にっこり笑っているように見える",
  };

  return gesture
    .split("、")
    .map((item) => translations[item] || item)
    .join("、");
}

function buildIndoorScene({ indoorWorldId, locationOption, customLocation }) {
  const world = indoorWorlds.find((item) => item.id === indoorWorldId) || indoorWorlds[0];
  const place = customLocation?.trim() || locationOption || world.places[0];
  const decor = world.decor?.join("、") || "";

  return `屋内の「${world.title}」の${place}で、ペットの可愛い静止画。背景は${world.description}${decor ? `装飾として${decor}を世界観に合うように自然に配置してください。` : ""}`;
}

function buildOutdoorScene({ selected, custom, outdoorWorldId }) {
  const world = outdoorWorlds.find((item) => item.id === outdoorWorldId) || outdoorWorlds[0];
  const getWorldValue = (id, fallback = "") => getSingleValue(selected, custom, id, fallback);
  const getWorldValues = (id, fallback = "") => joinValues(selected, custom, id, fallback);

  if (world.id === "flowerGarden") {
    const gardenType = getWorldValue("gardenType", "庭園");
    const mainFlower = getWorldValue("mainFlower", "");
    const subFlowers = getWorldValues("subFlowers", "");
    const density = getWorldValue("flowerDensity", "花多め");
    const main = mainFlower ? `${mainFlower}をメインにした` : "美しい花々が咲く";
    const sub = subFlowers ? `周囲には${subFlowers}も自然に咲いています。` : "";
    return `${main}${gardenType}で、${density}の花に包まれたペットの可愛い静止画。${sub}`;
  }

  if (world.id === "castle") {
    const place = getWorldValue("castlePlace", "お城の見える風景");
    const mood = getWorldValue("castleMood", "パステルメルヘン");
    const decor = getWorldValues("castleDecor", "");
    return `${place}で、${mood}な雰囲気に包まれたペットの可愛い静止画。${decor ? `装飾として${decor}を自然に取り入れてください。` : ""}`;
  }

  if (world.id === "fantasy") {
    const place = getWorldValue("fantasyPlace", "光のドア");
    const mood = getWorldValue("fantasyMood", "神秘的");
    const flowers = getWorldValue("fantasyFlowers", "花畑あり");
    const light = getWorldValue("fantasyLight", "やさしい光");
    const flowerText = flowers && flowers !== "なし" ? `、${flowers}` : "";
    return `${place}のある${mood}な幻想世界で、${light}${flowerText}に包まれたペットの可愛い静止画。`;
  }

  if (world.id === "sea") {
    const place = getWorldValue("seaPlace", "海辺テラス");
    const mood = getWorldValue("seaMood", "透明感のある海");
    const decor = getWorldValues("seaDecor", "");

    if (place === "ミコノス島の白い街並み") {
      return `ミコノス島風の白い街並みで、白いお家、青い屋根、青いドア、石畳、海が見える坂道に囲まれたペットの可愛い静止画。白と青を活かした、エーゲ海風の明るくすっきり透明感のある世界にしてください。${decor ? `海モチーフとして${decor}をさりげなく配置してください。` : ""}`;
    }

    if (place === "グレートバリアリーフ風・夢かわ海中世界") {
      return `現実よりも夢かわいく色鮮やかな、グレートバリアリーフ風の海中世界で、ペットの可愛い静止画。カラフルな珊瑚、熱帯魚、ウミガメ、透明な水の光、泡、きらめく水中の光の筋を入れて、明るく楽しい海の中にしてください。${decor ? `海モチーフとして${decor}を自然に配置してください。` : ""}`;
    }

    return `${place}で、${mood}を背景にしたペットの可愛い静止画。${decor ? `海モチーフとして${decor}をさりげなく配置してください。` : ""}`;
  }

  if (world.id === "city") {
    const place = getWorldValue("cityPlace", "遊園地");
    const time = getWorldValue("cityTime", "夜");
    const light = getWorldValue("cityLight", "キラキラ幻想的");

    if (place === "ノイシュバンシュタイン城風のメルヘンなお城") {
      return `${time}の、ノイシュバンシュタイン城を思わせる白く優雅なメルヘン城の前で、${light}な光に包まれたペットの可愛い静止画。実在テーマパーク名や実在ブランドのロゴは入れず、おとぎ話のような夢の城として表現してください。`;
    }

    if (place === "ロマンチック街道風の可愛いショップ通り") {
      return `${time}の、ロマンチック街道を思わせるヨーロッパ風の可愛いショップ通りで、${light}な光に包まれたペットの可愛い静止画。木組みの建物、花飾りの窓、石畳、小さな看板を自然に入れて、実在ブランド名やロゴは入れないでください。`;
    }

    if (place === "おとぎ話のテーマパーク風" || place === "パステルカラーの夢の遊園地") {
      return `${time}の${place}で、${light}な光に包まれたペットの可愛い静止画。実在テーマパーク名や実在キャラクター、実在ブランドのロゴは入れず、メルヘンなお城、可愛いショップ、観覧車、メリーゴーランド、石畳の広場などで、夢の遊園地のような雰囲気にしてください。`;
    }

    return `${time}の${place}で、${light}な光に包まれたペットの可愛い静止画。`;
  }

  if (world.id === "nature") {
    const place = getWorldValue("naturePlace", "木漏れ日の森");
    const mood = getWorldValue("natureMood", "透明感");
    return `${place}で、${mood}のある自然に包まれたペットの可愛い静止画。`;
  }

  if (world.id === "alice") {
    const place = getWorldValue("alicePlace", "不思議の国のティーパーティー");
    const container = getWorldValue("aliceContainer", "");
    const items = getWorldValues("aliceItems", "");
    const mood = getWorldValue("aliceMood", "パステル");
    const containerText = container && container !== "なし" ? `ペットは${container}にいます。` : "";
    const itemText = items ? `周囲には${items}のモチーフを配置してください。` : "";

    if (place === "逆さま階段") {
      return `少しダークメルヘンな不思議世界にいるペットの可愛い静止画。ペットは逆さま階段の面に足をつけて、階段に沿った重力で自然に歩いています。体は階段の向きに合わせて上下反転して見えますが、顔・目・鼻口まわり・体の形は崩さないでください。宙に落下している姿や、無理にねじれた姿勢にはしないでください。${itemText}${containerText}`;
    }

    return `${place}で、${mood}な不思議世界にいるペットの可愛い静止画。${containerText}${itemText}`;
  }

  return `${world.title}の世界にいるペットの可愛い静止画。`;
}

function buildSceneEffects({ selected, custom }) {
  const falling = joinValues(selected, custom, "fallingItems", "");
  const amount = getSingleValue(selected, custom, "effectAmount", "");
  if (!falling) return "";
  return `情景演出として、${falling}が${amount || "適度に"}舞っています。ペットの顔を邪魔しない量と位置にしてください。`;
}

function buildPrompt({ locationType, locationOption, selected, custom, outdoorWorldId, indoorWorldId }) {
  const items = joinValues(selected, custom, "items");
  const containerScene = joinValues(selected, custom, "containerScene");
  const wallpaper = translateWallpaper(joinValues(selected, custom, "wallpaper", locationType === "indoor" ? "選んだ屋内世界観に自然に合う壁紙や壁面デザイン" : ""));
  const wallDecor = joinValues(selected, custom, "wallDecor", locationType === "indoor" ? "選んだ屋内世界観に合う壁飾り" : "");

  const clothingSeason = getSingleValue(selected, custom, "clothingSeason", "");
  const clothingShape = getSingleValue(selected, custom, "clothingShape", "");
  const clothingDecor = joinValues(selected, custom, "clothingDecor");
  const fruitPattern = joinValues(selected, custom, "fruitPattern");
  const flowerPattern = joinValues(selected, custom, "flowerPattern");
  const otherPattern = joinValues(selected, custom, "otherPattern");
  const outfitColors = joinValues(selected, custom, "outfitColorChips");
  const headShape = getSingleValue(selected, custom, "headShape", "");
  const headDecor = joinValues(selected, custom, "headDecor");
  const earType = getSingleValue(selected, custom, "earType", "");
  const accessories = joinValues(selected, custom, "accessories");
  const shoeShape = getSingleValue(selected, custom, "shoeShape", "");
  const shoeDecor = joinValues(selected, custom, "shoeDecor");

  const color = translateColor(joinValues(selected, custom, "color", "選んだ世界観・服・小物に合うやさしい色合い"));
  const lighting = getAutoLightingInstruction({ locationType, indoorWorldId, outdoorWorldId, locationOption, color });

  const gesture = joinValues(selected, custom, "gesture", "小首をかしげる、にっこり笑っているように見える");
  const density = getSingleValue(selected, custom, "density", "おまかせ", { keepAuto: true });
  const textOverlay = getSingleValue(selected, custom, "textOverlay", "なし", { keepAuto: true });
  const size = joinValues(selected, custom, "size", "正方形 1:1", { keepAuto: true });
  const aspectInstruction = getSizeInstruction(size);

  const baseScene =
    locationType === "indoor"
      ? `${buildIndoorScene({ indoorWorldId, locationOption, customLocation: custom.location })}${wallpaper ? `壁紙は${wallpaper}。` : ""}${wallDecor ? `壁飾りは${wallDecor}を自然に配置してください。` : ""}壁や奥の空間まで可愛く作り込んでください。`
      : `屋外の「${outdoorWorlds.find((item) => item.id === outdoorWorldId)?.title || "ワールド"}」で、${buildOutdoorScene({ selected, custom, outdoorWorldId })}背景は、選んだ屋外ワールドに合う自然な奥行き・空気感・光を大切にしてください。`;

  const clothingParts = [];
  if (clothingSeason) clothingParts.push(`季節は${clothingSeason}`);
  if (clothingShape) clothingParts.push(`服の形は${clothingShape}`);
  if (clothingDecor) clothingParts.push(`服の装飾は${clothingDecor}`);
  if (fruitPattern) clothingParts.push(`果物柄は${fruitPattern}`);
  if (flowerPattern) clothingParts.push(`花柄は${flowerPattern}`);
  if (otherPattern) clothingParts.push(`その他柄は${otherPattern}`);
  if (outfitColors) clothingParts.push(`服セットの色合いは${outfitColors}を基調に、最大3色の組み合わせとして自然にまとめる`);

  const noClothes = clothingShape === "なし";
  const clothingSentence = noClothes
    ? "服は追加せず、元写真の自然な魅力を尊重してください。"
    : clothingParts.length
      ? `ペットの服は次の条件で自然に作ってください。${clothingParts.join("。") }。未指定の服要素は、背景・季節・世界観に合わせて自動で可愛く調整してください。服はペットの体型に自然に合っていて、顔・目・鼻口まわりを隠さないでください。`
      : "服は、選んだ背景・季節・世界観に合わせて自動で可愛く調整してください。ペットの体型に自然に合っていて、顔・目・鼻口まわりを隠さないでください。";

  const headParts = [];
  if (headShape) headParts.push(`帽子・頭装備の形は${headShape}`);
  if (headDecor) headParts.push(`頭装備の飾りは${headDecor}`);
  if (headDecor.includes("耳") && earType) headParts.push(`耳モチーフは${earType}`);
  const headSentence = headParts.length
    ? `${headParts.join("。") }。頭装備はペットの顔・目・鼻口まわりを隠さない位置と大きさにしてください。`
    : "頭装備は、必要な場合だけ背景や服に合わせて自然に追加してください。顔・目・鼻口まわりは隠さないでください。";

  const accessorySentence = accessories
    ? `アクセサリーは${accessories}。頭装備とは分離して扱い、首元・胸元・手元・小物として自然に配置してください。サングラスを選んだ場合もアクセサリーとして扱ってください。`
    : "アクセサリーは、選んだ服や背景に合うものを必要な範囲で自然におまかせしてください。";

  const shoeSentence = shoeShape || shoeDecor
    ? `靴の形は${shoeShape || "背景と服に合わせておまかせ"}。靴の飾りは${shoeDecor || "控えめにおまかせ"}。足元は小さめにして、ペットの体型や自然な可愛さを邪魔しないようにしてください。`
    : "靴や足元は、服と背景に合わせて自然におまかせしてください。";

  const itemSentence = items ? `選んだ小物（${items}）は、世界観になじむ程度にさりげなく取り入れてください。` : "小物は選んだ世界観に合わせて自然におまかせしてください。";
  const containerDescription = translateContainerScene(containerScene);
  const containerSentence = containerDescription
    ? `ペットの配置・ポーズ・舞台ギミックは、${containerDescription}。入れ物や透明素材を使う場合も、ペットの顔・目・鼻口まわりが歪んだり隠れたりしないようにしてください。背景や小物と自然に合うようにしてください。`
    : "";
  const sceneEffectSentence = locationType === "outdoor" ? buildSceneEffects({ selected, custom }) : "";
  const selectedIndoorWorld = indoorWorlds.find((item) => item.id === indoorWorldId);
  const selectedOutdoorWorld = outdoorWorlds.find((item) => item.id === outdoorWorldId);
  const simpleDensityWorlds = ["simpleLuxury", "boardingSchool"];
  const clearOutdoorWorlds = ["sea", "fantasy"];

  let densitySentence = "";
  if (density === "すっきり") {
    densitySentence = "小物や装飾を増やしすぎず、余白と透明感を大切にした、すっきり上品な一枚にしてください。";
  } else if (density === "普通") {
    densitySentence = "小物や装飾は自然な量にして、華やかさと見やすさのバランスがよい一枚にしてください。";
  } else if (density === "ごちゃかわ") {
    densitySentence = "選択した小物や装飾を画面内にバランスよく配置し、華やかでごちゃかわいい密度のある一枚にしてください。";
  } else if (density === "超ごちゃかわ") {
    densitySentence = "主役の顔を邪魔しない範囲で、装飾や背景要素を画面いっぱいに華やかに配置してください。";
  } else if (locationType === "indoor" && simpleDensityWorlds.includes(selectedIndoorWorld?.id)) {
    densitySentence = "装飾を詰め込みすぎず、余白・上品さ・空気感を大切にした、すっきり高級感のある一枚にしてください。";
  } else if (locationType === "outdoor" && clearOutdoorWorlds.includes(selectedOutdoorWorld?.id)) {
    densitySentence = "人工物や小物を増やしすぎず、透明感・空気感・奥行きを優先した、すっきり美しい一枚にしてください。";
  } else if (locationType === "indoor") {
    densitySentence = "全体が地味にならないように、選択した小物や壁飾りを画面内にバランスよく配置し、華やかで可愛い密度のある一枚にしてください。";
  } else {
    densitySentence = "選んだ世界観の雰囲気を大切にして、自然な華やかさのある夢かわいい一枚にしてください。";
  }

  const brightLock = "黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色調を暗く引きずらないでください。ペット本来の毛色は保ちつつ、背景は選んだ世界観どおり明るく、選択した色合いや世界観を維持してください。";
  const adaptiveDesignRule = "入れ物・家具・小物・舞台装飾は、選んだ世界観・服・色合いに自然になじむデザインにしてください。色・素材・装飾は、背景や世界観に合わせて可愛く調整してください。";

  const gestureDescription = translateGesture(gesture);
  const gestureSection = gestureDescription ? `ペットのしぐさは${gestureDescription}。` : "";
  const scenePoseSection = [sceneEffectSentence, gestureSection].filter(Boolean).join("\n");
  const scenePoseBlock = scenePoseSection ? `\n\n【情景演出・ポーズ】\n${scenePoseSection}` : "";

  return `【最優先：ペット本人の保持】
${identityRule}

【世界観・背景】
${baseScene}
背景は明るく、やさしい光に包まれていて、可愛いけれどペットの顔を邪魔しない。

【服】
${clothingSentence}

【頭装備・アクセサリー・足元】
${headSentence}
${accessorySentence}
${shoeSentence}

【舞台ギミック・小物】
${containerSentence}
${itemSentence}
${adaptiveDesignRule}${scenePoseBlock}

【色合い・光】
色合いは${color}。
光や明るさは${lighting}
${brightLock}

【仕上げ】
${densitySentence}
${translateTextOverlay(textOverlay)}
${aspectInstruction}
ふんわり上品で夢かわいい一枚にしてください。`;
}

async function copyTextSafely(text, fallbackElement) {
  try {
    if (navigator?.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { ok: true };
    }
  } catch (error) {}

  try {
    if (fallbackElement) {
      fallbackElement.focus();
      fallbackElement.select();
      const copied = document.execCommand?.("copy");
      return { ok: Boolean(copied) };
    }
  } catch (error) {}

  return { ok: false };
}

function getSelectionNote(category) {
  if (category.maxSelect) return `${category.maxSelect}個まで選択可能`;
  if (category.single) return "1個選択";
  return "複数選択OK";
}

function getDisplayTitle(category) {
  if (category.title.includes("（")) return category.title;
  return `${category.title}（${getSelectionNote(category)}）`;
}

function hasSpecificSelection(selected, categoryId) {
  return (selected[categoryId] || []).some((item) => !isAutoValue(item));
}

function hasSelection(selected, categoryId, value) {
  return (selected[categoryId] || []).includes(value);
}

function isCategoryDisabledById(categoryId, selected) {
  if (categoryId === "headDecor") {
    return !hasSpecificSelection(selected, "headShape");
  }

  if (categoryId === "earType") {
    return isCategoryDisabledById("headDecor", selected) || !hasSelection(selected, "headDecor", "耳");
  }

  if (categoryId === "shoeDecor") {
    return !hasSpecificSelection(selected, "shoeShape");
  }

  if (["clothingDecor", "fruitPattern", "flowerPattern", "otherPattern", "outfitColorChips"].includes(categoryId)) {
    return hasSelection(selected, "clothingShape", "なし");
  }

  return false;
}

function getDisabledPlaceholder(category) {
  if (category.id === "headDecor") return "帽子の形を選ぶと使えます";
  if (category.id === "earType") return "頭装備の飾りで『耳』を選ぶと使えます";
  if (category.id === "shoeDecor") return "靴の形を選ぶと使えます";
  if (["clothingDecor", "fruitPattern", "flowerPattern", "otherPattern", "outfitColorChips"].includes(category.id)) return "服の形が『なし』以外の時に使えます";
  return "この項目は、関連する項目を選ぶと使えます";
}

function normalizeDependentSelections(nextSelected) {
  let normalized = { ...nextSelected };
  const dependentIds = [
    "headDecor",
    "earType",
    "shoeDecor",
    "clothingDecor",
    "fruitPattern",
    "flowerPattern",
    "otherPattern",
    "outfitColorChips",
  ];

  for (const categoryId of dependentIds) {
    if (isCategoryDisabledById(categoryId, normalized)) {
      normalized[categoryId] = getDefaultSelected(categoryId);
    }
  }

  return normalized;
}

function removeDisabledCustomValues(customValues, selected) {
  const next = { ...customValues };
  Object.keys(next).forEach((categoryId) => {
    if (isCategoryDisabledById(categoryId, selected)) {
      delete next[categoryId];
    }
  });
  return next;
}

function isCategoryDisabled(category, selected) {
  if (isCategoryDisabledById(category.id, selected)) return true;
  if (!category.dependsOn) return false;
  return !(selected[category.dependsOn.id] || []).includes(category.dependsOn.value);
}

function OptionGroup({ category, selected, custom, onToggle, onCustomChange, resetCategory }) {
  const selectedValues = selected[category.id] || [];
  const isColorChips = category.type === "colorChips";
  const disabled = isCategoryDisabled(category, selected);
  const displayTitle = getDisplayTitle(category);

  return (
    <div className={`option-group ${disabled ? "disabled" : ""}`}>
      <div className="category-head">
        <h3>{displayTitle}</h3>
        <button type="button" className="category-reset" onClick={() => resetCategory(category.id)}>リセット</button>
      </div>

      {isColorChips ? (
        <>
          <div className="color-chip-grid">
            {category.options.map((option) => {
            const active = selectedValues.includes(option.name);
            return (
              <button
                key={option.name}
                type="button"
                title={option.name}
                aria-label={option.name}
                disabled={disabled}
                onClick={() => !disabled && onToggle(category.id, option.name, false, category.maxSelect)}
                className={`color-chip ${active ? "active" : ""}`}
                data-label={option.name}
              >
                <span className="color-chip-swatch" style={{ background: option.value }} />
                {active && <span className="color-chip-check">✓</span>}
                <span className="color-chip-name">{option.name}</span>
              </button>
            );
            })}
          </div>
          <div className="color-chip-help">おまかせ、または最大3色まで選択可能。色の名前はチップにカーソルを重ねると表示されます。</div>
        </>
      ) : (
        <div className="chips">
          {category.options.map((option) => {
            const active = selectedValues.includes(option);
            return (
              <button key={option} type="button" disabled={disabled} onClick={() => !disabled && onToggle(category.id, option, category.single, category.maxSelect)} className={`chip ${active ? "active" : ""}`}>
                {option}
              </button>
            );
          })}
        </div>
      )}

      <label>
        <PlusCircle size={16} /> {category.customLabel || "その他を記入"}
      </label>
      <input disabled={disabled} value={custom[category.id] || ""} onChange={(event) => onCustomChange(category.id, event.target.value)} placeholder={disabled ? getDisabledPlaceholder(category) : (category.customPlaceholder || "カンマ、読点、改行で複数追加できます")} />
    </div>
  );
}

function CategorySection({ title, categories, selected, custom, onToggle, onCustomChange, resetCategory }) {
  return (
    <section className="card">
      <div className="card-head category-card-head">
        <h2>{title}</h2>
      </div>
      <div className="section-stack">
        {categories.map((category) => (
          <OptionGroup key={category.id} category={category} selected={selected} custom={custom} onToggle={onToggle} onCustomChange={onCustomChange} resetCategory={resetCategory} />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [locationType, setLocationType] = useState("indoor");
  const [locationOption, setLocationOption] = useState("お姫さまの部屋");
  const [indoorWorldId, setIndoorWorldId] = useState("dreamLolita");
  const [outdoorWorldId, setOutdoorWorldId] = useState("flowerGarden");
  const [selected, setSelected] = useState(initialSelected);
  const [custom, setCustom] = useState({});
  const [featuredPrompt, setFeaturedPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const [modalImage, setModalImage] = useState(null);
  const [recommendedOpen, setRecommendedOpen] = useState(true);
  const [worldOpen, setWorldOpen] = useState(true);
  const textAreaRef = useRef(null);

  const toggleOption = (categoryId, option, single = false, maxSelect = null) => {
    setFeaturedPrompt("");
    setSelected((prev) => {
      const current = prev[categoryId] || [];
      const exists = current.includes(option);
      let next;

      if (single) {
        if (!exists) {
          setCustom((customPrev) => ({ ...customPrev, [categoryId]: "" }));
        }
        next = { ...prev, [categoryId]: exists ? getDefaultSelected(categoryId) : [option] };
      } else if (option === "なし" || option === "おまかせ") {
        next = { ...prev, [categoryId]: exists ? getDefaultSelected(categoryId) : [option] };
      } else {
        const withoutAuto = current.filter((item) => item !== "なし" && item !== "おまかせ");
        if (maxSelect && !exists && withoutAuto.length >= maxSelect) return prev;
        next = { ...prev, [categoryId]: exists ? withoutAuto.filter((item) => item !== option) : [...withoutAuto, option] };
      }

      const normalized = normalizeDependentSelections(next);
      setCustom((customPrev) => removeDisabledCustomValues(customPrev, normalized));
      return normalized;
    });
  };

  const selectLocationType = (type) => {
    setFeaturedPrompt("");
    setLocationType(type);
    if (type === "indoor") {
      const currentIndoorWorld = indoorWorlds.find((item) => item.id === indoorWorldId) || indoorWorlds[0];
      setLocationOption(currentIndoorWorld.places[0]);
    }
    setCustom((prev) => ({ ...prev, location: "" }));
  };

  const selectOutdoorWorld = (id) => {
    setFeaturedPrompt("");
    setOutdoorWorldId(id);
  };

  const updateCustom = (key, value) => {
    if (isCategoryDisabledById(key, selected)) return;
    setFeaturedPrompt("");
    setCustom((prev) => ({ ...prev, [key]: value }));

    if (value.trim()) {
      setSelected((prev) => {
        if (isSingleCategory(key) || (prev[key] || []).includes("なし") || (prev[key] || []).includes("おまかせ")) {
          const normalized = normalizeDependentSelections({ ...prev, [key]: [] });
          setCustom((customPrev) => removeDisabledCustomValues(customPrev, normalized));
          return normalized;
        }
        return prev;
      });
    }

    if (key === "location" && value.trim()) setLocationOption("");
  };

  const generatedPrompt = useMemo(() => buildPrompt({ locationType, locationOption, selected, custom, outdoorWorldId, indoorWorldId }), [locationType, locationOption, selected, custom, outdoorWorldId, indoorWorldId]);
  const prompt = featuredPrompt || generatedPrompt;

  const allSelected = useMemo(() => {
    if (featuredPrompt) return ["おすすめテンプレート使用中"];
    const base = Object.values(selected).flat().filter((item) => !isAutoValue(item));
    const customValues = Object.values(custom).flatMap(splitCustomText).filter((item) => !isAutoValue(item));
    const locationLabel = locationType === "indoor" ? `${indoorWorlds.find((item) => item.id === indoorWorldId)?.title} / ${locationOption}` : outdoorWorlds.find((item) => item.id === outdoorWorldId)?.title;
    return [locationTree[locationType]?.label, locationLabel, ...base, ...customValues].filter(Boolean);
  }, [selected, custom, locationType, locationOption, featuredPrompt, outdoorWorldId, indoorWorldId]);

  const selectedSummary = useMemo(() => {
    if (!allSelected.length) return "まだ未選択。初期おすすめで作成中。";
    const visible = allSelected.slice(0, 8).join(" / ");
    const rest = allSelected.length - 8;
    return rest > 0 ? `${visible} / ほか${rest}件` : visible;
  }, [allSelected]);

  const copyPrompt = async () => {
    const result = await copyTextSafely(prompt, textAreaRef.current);
    if (result.ok) setCopyStatus("copied");
    else {
      setCopyStatus("manual");
      textAreaRef.current?.focus();
      textAreaRef.current?.select();
    }
    setTimeout(() => setCopyStatus("idle"), 2200);
  };

  const reset = () => {
    setLocationType("indoor");
    setLocationOption("お姫さまの部屋");
    setIndoorWorldId("dreamLolita");
    setOutdoorWorldId("flowerGarden");
    setSelected(initialSelected);
    setCustom({});
    setFeaturedPrompt("");
    setCopyStatus("idle");
  };

  const resetCategory = (categoryId) => {
    setFeaturedPrompt("");
    setSelected((prev) => {
      const normalized = normalizeDependentSelections({ ...prev, [categoryId]: getDefaultSelected(categoryId) });
      setCustom((customPrev) => {
        const next = removeDisabledCustomValues(customPrev, normalized);
        delete next[categoryId];
        return next;
      });
      return normalized;
    });
  };


  const LocationIcon = locationTree[locationType]?.icon || Home;
  const activeWorld = outdoorWorlds.find((item) => item.id === outdoorWorldId) || outdoorWorlds[0];

  const hasStageGimmick =
    selected.containerScene?.length &&
    !selected.containerScene.includes("なし") &&
    !selected.containerScene.includes("おまかせ");

  const isUpsideDownStairs =
    locationType === "outdoor" &&
    outdoorWorldId === "alice" &&
    selected.alicePlace?.includes("逆さま階段");

  return (
    <div className="page">
      <div className="blob blob-pink" />
      <div className="blob blob-violet" />
      <div className="blob blob-blue" />
      <div className="dots" />

      {modalImage && (
        <div onClick={() => setModalImage(null)} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(30, 20, 40, 0.65)", display: "grid", placeItems: "center", padding: "20px", cursor: "pointer" }}>
          <img src={modalImage} alt="拡大画像" style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: "28px", boxShadow: "0 20px 80px rgba(0,0,0,0.35)", background: "white", padding: "6px" }} />
        </div>
      )}

      <div className="container">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="hero">
          <div className="badge"><Sparkles size={16} /><span>Yuyu Princess World</span></div>
          <h1>ゆゆ姫の夢かわプロンプト工房</h1>
          <p className="subtitle">場所・ワールド・服・小物・光をポチポチ選択。ゆゆ姫みたいに可愛い夢かわ世界で、ペットの顔を守るプロンプトを作ります。</p>
          <div className="update-time">最終更新：2026/05/29 17:31</div>
          {heroImageUrl && <div className="hero-image"><img src={heroImageUrl} alt="ゆゆ姫ワールドのトップ画像" /></div>}
        </motion.div>

        <a className="sister-site-link" href="https://yuyuhy.yuyu-chan.com/" target="_blank" rel="noreferrer">
          🌈 姉妹サイト：夢かわ以外も作りたい時は、汎用版プロンプト工房へ
        </a>
            <section className="card recommended-wide">
              <div className="card-head">
                <h2>🌸 ゆゆ姫のおすすめ</h2>
                <button className="outline-button" onClick={() => setRecommendedOpen((prev) => !prev)}>{recommendedOpen ? "閉じる" : "開く"}</button>
              </div>
              {recommendedOpen && (
                <div className="recommended-grid">
                  {recommendedPrompts.map((item) => (
                    <div key={item.id} className="recommended-item">
                      <img className="recommended-thumb" src={item.image} alt={item.title} onClick={() => setModalImage(item.image)} />
                      <div className="recommended-body">
                        <div className="recommended-label">{item.label}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="recommended-actions">
                          <button className="main-button" onClick={() => { setFeaturedPrompt(item.prompt); setCopyStatus("idle"); }}>このおすすめを使う</button>
                          {featuredPrompt && <button className="outline-button" onClick={() => { setFeaturedPrompt(""); setCopyStatus("idle"); }}>通常作成に戻す</button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>


<div className="grid">
          <div className="left">
            <section className="card">
              <div className="card-head">
                <h2><Heart size={20} /> ゆゆ姫ワールド</h2>
                <button className="outline-button" onClick={reset}><RefreshCcw size={16} /> リセット</button>
              </div>
              <div className="notice">
                <strong>ゆゆ姫ワールドの作り方</strong>
                <span>屋内も屋外も、まず世界観を選んでから場所や装飾を選びます。選んだ世界観に合わせて、背景・小物・光・密度を自然に調整します。黒い子・濃い茶色の子・グレー系の子は、背景まで暗く引っ張られやすいので「明るくハイキー」系の光設定推奨です。</span>
              </div>
            </section>

            <section className="card">
              <h2><LocationIcon size={20} /> 場所を選ぶ</h2>
              <div className="choice-grid">
                {Object.entries(locationTree).map(([key, value]) => {
                  const Icon = value.icon;
                  const active = locationType === key;
                  return <button key={key} onClick={() => selectLocationType(key)} className={`big-choice ${active ? "active-soft" : ""}`}><Icon size={20} /><strong>{value.label}</strong></button>;
                })}
              </div>
              {locationType === "indoor" && (
                <>
                  <h3 style={{ marginTop: "14px", marginBottom: "10px" }}>屋内の世界観</h3>
                  <div className="chips">
                    {indoorWorlds.map((world) => {
                      const active = indoorWorldId === world.id;
                      return <button key={world.id} onClick={() => { setFeaturedPrompt(""); setIndoorWorldId(world.id); setLocationOption(world.places[0]); }} className={`chip ${active ? "active" : ""}`}>{world.title}</button>;
                    })}
                  </div>
                  <div className="notice" style={{ marginTop: "10px" }}>
                    <strong>{indoorWorlds.find((item) => item.id === indoorWorldId)?.title}</strong>
                    <span>{indoorWorlds.find((item) => item.id === indoorWorldId)?.description}</span>
                  </div>
                  <h3 style={{ marginTop: "14px", marginBottom: "10px" }}>屋内の場所</h3>
                  <div className="chips">
                    {(indoorWorlds.find((item) => item.id === indoorWorldId)?.places || []).map((option) => {
                      const active = locationOption === option && !custom.location;
                      return <button key={option} onClick={() => { setFeaturedPrompt(""); setLocationOption(option); setCustom((prev) => ({ ...prev, location: "" })); }} className={`chip ${active ? "active" : ""}`}>{option}</button>;
                    })}
                  </div>
                  <label><PlusCircle size={16} /> その他の場所を記入</label>
                  <input value={custom.location || ""} onChange={(event) => updateCustom("location", event.target.value)} placeholder="例：雪景色のお城、星空のバルコニー、苺レースの小部屋" />
                </>
              )}
            </section>

            {locationType === "outdoor" && (
              <section className="card">
                <div className="card-head">
                  <h2>🌍 屋外の世界観</h2>
                  <button className="outline-button" onClick={() => setWorldOpen((prev) => !prev)}>{worldOpen ? "閉じる" : "開く"}</button>
                </div>
                {worldOpen && (
                  <div style={{ display: "grid", gap: "16px" }}>
                    <div className="chips">
                      {outdoorWorlds.map((world) => {
                        const active = outdoorWorldId === world.id;
                        return <button key={world.id} onClick={() => selectOutdoorWorld(world.id)} className={`chip ${active ? "active" : ""}`}>{world.title}</button>;
                      })}
                    </div>
                    <div className="notice"><strong>{activeWorld.title}</strong><span>{activeWorld.description}</span></div>
                    {activeWorld.subCategories.map((category) => (
                      <OptionGroup key={category.id} category={category} selected={selected} custom={custom} onToggle={toggleOption} onCustomChange={updateCustom} resetCategory={resetCategory} />
                    ))}
                    <div style={{ display: "grid", gap: "18px", marginTop: "6px" }}>
                      {sceneEffects.map((category) => (
                        <OptionGroup key={category.id} category={category} selected={selected} custom={custom} onToggle={toggleOption} onCustomChange={updateCustom} resetCategory={resetCategory} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {uiSections.map((section) => (
              <CategorySection
                key={section.id}
                title={section.title}
                categories={section.categories}
                selected={selected}
                custom={custom}
                onToggle={toggleOption}
                onCustomChange={updateCustom}
                resetCategory={resetCategory}
              />
            ))}

            {multiCategories
              .filter((category) => !(category.indoorOnly && locationType !== "indoor"))
              .filter((category) => !(isUpsideDownStairs && category.id === "containerScene"))
              .map((category) => {
              const CategoryIcon = category.icon;
              const displayTitle = getDisplayTitle(category);
              return (
                <section key={category.id} className="card">
                  <div className="card-head category-card-head"><h2>{CategoryIcon && <CategoryIcon size={20} />} {displayTitle}</h2><button type="button" className="category-reset" onClick={() => resetCategory(category.id)}>リセット</button></div>
                  <div className="chips">
                    {category.options.map((option) => {
                      const active = selected[category.id]?.includes(option);
                      return <button key={option} onClick={() => toggleOption(category.id, option, category.single, category.maxSelect)} className={`chip ${active ? "active" : ""}`}>{option}</button>;
                    })}
                  </div>
                  <label><PlusCircle size={16} /> {customFieldLabels[category.id]}を記入</label>
                  <input value={custom[category.id] || ""} onChange={(event) => updateCustom(category.id, event.target.value)} placeholder={customPlaceholders[category.id] || "カンマ、読点、改行で複数追加できます"} />
                </section>
              );
            })}
</div>

          <div className="right">

            <section className="card instagram-card">
              <h2>Instagramも見てね</h2>
              <a href="https://www.instagram.com/momomimiyuyu/" target="_blank" rel="noreferrer" className="instagram-link">
                <img src="/instagram_momomimiyuyu.png" alt="Instagram QR" className="instagram-image" />
              </a>
            </section>

            <section className="card result-card">
              <div className="card-head"><h2>完成文</h2><button className="main-button" onClick={copyPrompt}><Copy size={16} /> {copyStatus === "copied" ? "コピー済み" : "コピー"}</button></div>
              {copyStatus === "manual" && <div className="message warn"><AlertCircle size={16} /><span>自動コピーがブロックされました。下の文章を選択済みにしたので、Ctrl+C または長押しコピーしてください。</span></div>}
              {copyStatus === "copied" && <div className="message ok"><CheckCircle2 size={16} /><span>コピーできました。</span></div>}
              <div className="selected">選択中：{selectedSummary}</div>
              <textarea ref={textAreaRef} value={prompt} readOnly aria-label="生成されたプロンプト" />
            </section>
            <section className="card small-card"><strong>固定ルール：</strong>ペットの顔・毛色・目・鼻口まわりを最優先で守る文を、どの出力にも自動で入れています。</section>
</div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
