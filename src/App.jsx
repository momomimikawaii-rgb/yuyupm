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
  Sun,
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
      { id: "castleMood", title: "世界観", single: true, options: ["お姫さま風", "クラシカル", "アンティーク", "魔法ファンタジー", "パステルメルヘン"], customPlaceholder: "例：少しレトロで上品な童話風" },
      { id: "castleDecor", title: "装飾", multi: true, options: ["噴水", "お花アーチ", "リボン装飾", "ガラス細工", "レース旗", "パール装飾"], customPlaceholder: "例：白い階段、薔薇の門、金色のランプ" },
    ],
  },
  {
    id: "fantasy",
    title: "🌌 幻想・天国ワールド",
    description: "光の門・雲の上・星空・オーロラなど幻想的な世界を作ります。",
    subCategories: [
      { id: "fantasyPlace", title: "幻想世界", single: true, options: ["光の門", "光のドア", "雲の上", "神々しい花園", "星降る世界", "月夜の幻想世界", "オーロラの空", "パステル天国"], customPlaceholder: "例：花畑の先に光が漏れる天国のドア" },
      { id: "fantasyMood", title: "世界観", single: true, options: ["やさしい", "神秘的", "神々しい", "パステル幻想", "夢の中のよう"], customPlaceholder: "例：切なく美しい天国の入口" },
      { id: "fantasyFlowers", title: "花畑", single: true, options: ["なし", "少なめ", "花畑あり", "一面の花畑"], customPlaceholder: "例：白い小花の花畑、淡い虹色の花畑" },
      { id: "fantasyLight", title: "光の強さ", single: true, options: ["やさしい光", "神秘的な光", "まばゆい光"], customPlaceholder: "例：ドアの隙間からあふれる金色の光" },
    ],
  },
  {
    id: "sea",
    title: "🌊 海・夏ワールド",
    description: "海辺、白い砂浜、夕焼け、南国リゾートなどを作ります。",
    subCategories: [
      { id: "seaPlace", title: "景色", single: true, options: ["白い砂浜", "海辺テラス", "南国リゾート", "貝殻の浜辺", "夜の海", "夕焼けの海辺"], customPlaceholder: "例：白い桟橋、海が見える高台" },
      { id: "seaMood", title: "海の雰囲気", single: true, options: ["透明感のある海", "キラキラした海", "穏やかな海", "夕焼けの海", "幻想的な夜の海"], customPlaceholder: "例：淡い水色の宝石みたいな海" },
      { id: "seaDecor", title: "海モチーフ", multi: true, options: ["貝殻", "ヒトデ", "ガラス細工", "浮き輪", "マリンリボン", "小瓶"], customPlaceholder: "例：パールの貝殻、シーグラス" },
    ],
  },
  {
    id: "city",
    title: "🎡 街・遊園地ワールド",
    description: "遊園地、夜景、イルミネーション、街並みを作ります。",
    subCategories: [
      { id: "cityPlace", title: "景色", single: true, options: ["遊園地", "メリーゴーランド", "観覧車", "イルミネーション街", "カフェ通り", "ヨーロッパ風街並み", "スウィーツタウン"], customPlaceholder: "例：夜の遊園地、レトロな商店街" },
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
      { id: "aliceMood", title: "世界観", single: true, options: ["可愛い", "幻想的", "パステル", "カラフル", "少しダークメルヘン"], customPlaceholder: "例：ちょっと不気味で可愛い" },
    ],
  },
];

const sceneEffects = [
  { id: "fallingItems", title: "舞い落ちるもの", multi: true, options: ["なし", "花びら", "雪", "キラキラ（星）", "紙ふぶき", "羽", "光の粒"], customPlaceholder: "例：蝶、ハート、薔薇の花びら" },
  { id: "effectAmount", title: "演出量", single: true, options: ["少なめ", "適度に", "たくさん"], customPlaceholder: "例：画面の邪魔にならない程度" },
];

const outfitTranslations = {
  "ピンクハウス系": "ワッペンや刺繍がたくさん付いた、カントリーロマンティックな服。くま・いちご・ひなぎくモチーフ。ゆったりしたブルゾン。段フリルのロングスカート。生成りレースとコットン素材。レトロで可愛い雰囲気。",
  "ゴスロリドレス": "黒を基調にした、黒レース、フリル、十字架モチーフのクラシカルでダークなロリータ服。アンティーク感のあるお姫さま風の衣装。差し色は選択した服の色を優先してください。",
  "パンクロック衣装": "チェーンがたくさん付いたハードロック風ファッション。黒レザー、スタッズ、シルバーチェーン、少し反抗的でかっこいい雰囲気。",
  "白馬の王子様衣装": "白と金を基調にした上品で神聖な王子様衣装。マント、宝石装飾、クラシカルなプリンス風の雰囲気。",
};

const multiCategories = [
  { id: "items", title: "小物・飾り", options: ["なし", "レース", "リボン", "パール", "フリル", "苺", "フルーツ各種いろいろ", "スウィーツ", "花かご", "カーテン", "くまのぬいぐるみ", "うさぎのぬいぐるみ"] },
  { id: "containerScene", title: "入れ物・舞台ギミック", options: ["なし", "ペットがスノーボールの中に入っている", "ペットが大きな透明シャボン玉の中に入っている", "ペットがアンティークなティーカップの中に入っている", "ペットが可愛いガラスのグラスの中に入っている", "ペットが苺のバスケットの中に入っている", "ペットが花かごの中に入っている", "ペットが大きなプレゼント箱の中に入っている", "ペットがレースのベビーベッドに入っている", "ペットがマカロン型クッションの上にいる", "ペットが小さな馬車の中にいる"] },
  { id: "wallpaper", title: "屋内の壁紙・壁飾り", indoorOnly: true, options: ["ピンクのストライプ壁紙", "苺柄の壁紙", "薔薇柄の壁紙", "小花柄の壁紙", "レース模様の壁紙", "天使やリボンの絵がある壁紙", "額縁入りの可愛い絵", "ドライフラワーの壁飾り", "リボンガーランド", "Happy Birthdayと書かれた風船のガーランド", "レースカーテン越しの光", "白い腰壁パネル", "アンティーク風の飾り棚"] },
  { id: "outfit", title: "服・衣装", icon: Shirt, options: ["なし", "夏のフリルワンピース", "ごちゃかわロリータワンピース", "お姫さまドレス", "苺柄ワンピース", "レースたっぷりワンピース", "アイドル衣装", "カフェ店員さん風エプロン", "ふわふわケープ", "ヘッドドレス付きドレス", "リボンたっぷりドレス", "クラシカルロリータ", "妖精みたいなチュールドレス", "ピンクハウス系", "ゴスロリドレス", "パンクロック衣装", "白馬の王子様衣装"] },
  { id: "headAccessory", title: "頭飾り・アクセサリー", options: ["なし", "大きなリボン", "細い垂れリボン", "ヘッドドレス", "ボンネット", "麦わら帽子", "花冠", "ティアラ", "サングラス", "うさ耳カチューシャ", "苺モチーフの髪飾り", "レースのカチューシャ", "お花付きリボン", "藤の花飾り", "レース付き麦わら帽子", "ベレー帽", "ふわふわイヤーマフ", "天使の輪っか", "小さな王冠", "猫耳ヘッドドレス", "黒レースヘッドドレス", "コウモリリボン", "猫耳ゴスカチューシャ"] },
  { id: "outfitColor", title: "服の色", options: ["白ピンク", "ミルキーピンク", "藤色", "クリームホワイト", "淡い水色", "苺ミルク色", "パウダーピンク", "パステルイエロー", "白レース多め", "ピンク×白フリル", "藤色×白フリル", "淡いミントグリーン", "黒×ピンク", "黒×紫", "ワインレッド", "黒×赤", "白×金"] },
  { id: "shoes", title: "靴・足元", options: ["なし", "ピンクのリボン付きシューズ", "白レースの小さな靴", "藤色のリボンシューズ", "淡い水色の靴", "苺モチーフの靴", "可愛いピンクのレインブーツ", "小さな赤い長靴", "パール付きシューズ", "バレエシューズ風", "ふわふわブーツ", "足元に小さなリボンだけ"] },
  { id: "color", title: "全体の色合い", options: ["白ピンク", "ミルキーピンク", "藤色", "クリームホワイト", "淡い水色", "桜ピンク", "パステル虹色", "淡い黄色", "上品なラベンダーピンク", "黒×ピンク", "黒×紫", "ワインレッド", "白×金"] },
  { id: "lighting", title: "光・明るさ", icon: Sun, options: ["明るくハイキー", "白っぽくふんわり発光", "透明感のある明るい光", "やさしい昼間の光", "夕暮れのやわらかい光", "夜景風", "月明かり風", "神々しい光", "星降るような光"] },
  { id: "mood", title: "雰囲気", options: ["ふんわり", "透明感", "夢かわ", "メルヘン", "ロリータ風", "上品", "明るい昼間", "やさしい光", "高級感", "絵本のように可愛い", "ゴシック", "ダークメルヘン", "ハードロック風"] },
  { id: "pose", title: "ペットのポーズ・しぐさ", options: ["カメラ目線", "ちょこんと座る", "小首をかしげる", "お花をくんくん", "スウィーツを食べる", "ケーキを見つめる", "窓辺でふんわり", "クッションでくつろぐ", "前足をそろえる", "にっこり笑っているように見える"] },
  { id: "size", title: "画像サイズ", options: ["正方形 1:1", "インスタ投稿用 縦長4:5", "リール・ストーリー用 縦長9:16", "横長16:9"] },
];

const customFieldLabels = {
  location: "その他の場所",
  items: "その他の小物",
  containerScene: "その他の入れ物・舞台ギミック",
  wallpaper: "その他の壁紙・壁飾り",
  outfit: "その他の服・衣装",
  headAccessory: "その他の頭飾り・アクセサリー",
  outfitColor: "その他の服の色",
  shoes: "その他の靴・足元",
  color: "その他の全体色",
  lighting: "その他の光・明るさ",
  mood: "その他の雰囲気",
  pose: "その他のポーズ",
  size: "その他の画像サイズ",
};

const customPlaceholders = {
  items: "例：小さな王冠、ピンクの魔法ステッキ、苺のティアラ",
  containerScene: "例：宝石箱の中に入る、透明な香水瓶の中に入る、苺パフェグラスに入る",
  wallpaper: "例：ピンクの薔薇柄壁紙、額縁の天使画、ドライフラワーのスワッグ",
  outfit: "例：天使のワンピース、春色ロリータ、苺のお姫さまドレス",
  headAccessory: "例：苺リボン、天使のヘッドドレス、白レースボンネット",
  outfitColor: "例：白×藤色、苺ミルクピンク、淡いクリーム色",
  shoes: "例：白いレース靴、ピンクの長靴、足元に小さなリボンだけ",
  color: "例：白多めのピンク、淡い藤色、ミルキーなパステルカラー",
  lighting: "例：白く明るいスタジオ光、淡い逆光、きらきらした朝の光",
  mood: "例：甘くて上品、絵本みたい、ふわふわキラキラ",
  pose: "例：マカロンを見つめる、前足でカップを持つ、リボンを見上げる",
  size: "例：横長3:2、縦長2:3、ワイドバナー用",
};

const recommendedPrompts = [
  {
    id: "ajisai-road",
    title: "雨の日のあじさいロード",
    label: "ゆゆ姫5月のおすすめ",
    image: "/ajisai-road.png",
    description: "あじさい・お天気雨・虹・フリル傘の、透明感たっぷりな夢かわ世界。",
    prompt: `${identityRule}\n\n屋外の「雨の日のあじさいロード」で、たくさんのあじさい（桜ピンク、藤色、水色）に囲まれたペットの可愛い静止画。少なめの小さな水玉（ピンク・水色・藤色）が入った、フリル付きの白い可愛い傘をペットが持っています。\n\n背景には、奥まで続くあじさいロード、美しい雨粒、お天気雨の透明感、淡い虹を入れてください。晴れているのに雨が降っているような、明るく幻想的な雰囲気。雨の日でも暗くせず、透明感のあるハイキーな明るさを維持してください。\n\nペットは、花型ポケットの付いた可愛いフリル付きのピンクのレインコートを着ています。右耳の下には可愛いピンクの細長いフリル付きリボンをつけています。服はペットの体型に自然に合っていて、顔や鼻口まわりを隠さないでください。\n\n色合いは桜ピンクを中心に、藤色・淡い水色を組み合わせ、少量の白や淡い黄色のあじさいも配置してください。\n\n雰囲気は、透明感、絵本のような可愛さ、やさしい光、夢かわいい世界観。自然の景色を活かしつつ、華やかだけど自然な可愛さを大切にしてください。\n\n黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色味を暗く引きずらないでください。ペット本来の毛色を保ちつつ、背景は明るく、選択した世界観どおりのやさしい色合いを維持してください。\n\nペットは小首をかしげながら、傘を持ってこちらを見ています。画像サイズは4:5の縦長。ふんわり上品で夢かわいい一枚にしてください。`,
  },
];

function splitCustomText(value) {
  if (!value) return [];
  return value.split(/[、,\n]/).map((item) => item.trim()).filter(Boolean);
}

function hasNoneSelected(selected, key) {
  return (selected[key] || []).includes("なし");
}

function getValues(selected, custom, key) {
  return [...(selected[key] || []), ...splitCustomText(custom[key])].filter((item) => item !== "なし");
}

function joinValues(selected, custom, key, fallback = "") {
  const values = getValues(selected, custom, key);
  return values.length ? values.join("、") : fallback;
}

function getSingleValue(selected, custom, key, fallback = "") {
  const customValues = splitCustomText(custom[key]);
  if (customValues.length) return customValues[0];
  const values = (selected[key] || []).filter((item) => item !== "なし");
  return values.length ? values[values.length - 1] : fallback;
}

function getSizeInstruction(size) {
  if (size.includes("1:1") || size.includes("正方形")) return "画像サイズは1:1の正方形。";
  if (size.includes("4:5")) return "画像サイズは4:5の縦長。";
  if (size.includes("9:16")) return "画像サイズは9:16の縦長。";
  if (size.includes("16:9")) return "画像サイズは16:9の横長。";
  return size ? `画像サイズは${size}。` : "";
}

function translateOutfit(outfit) {
  if (!outfit) return "";
  return outfit.split("、").map((item) => outfitTranslations[item] || item).join("、");
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
    return `${place}で、${mood}を背景にしたペットの可愛い静止画。${decor ? `海モチーフとして${decor}をさりげなく配置してください。` : ""}`;
  }

  if (world.id === "city") {
    const place = getWorldValue("cityPlace", "遊園地");
    const time = getWorldValue("cityTime", "夜");
    const light = getWorldValue("cityLight", "キラキラ幻想的");
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

function buildPrompt({ locationType, locationOption, selected, custom, outdoorWorldId }) {
  const noItems = hasNoneSelected(selected, "items");
  const noContainer = hasNoneSelected(selected, "containerScene");
  const noOutfit = hasNoneSelected(selected, "outfit");
  const noHeadAccessory = hasNoneSelected(selected, "headAccessory");
  const noShoes = hasNoneSelected(selected, "shoes");

  const items = joinValues(selected, custom, "items");
  const containerScene = joinValues(selected, custom, "containerScene");
  const wallpaper = joinValues(selected, custom, "wallpaper", locationType === "indoor" ? "ピンクのストライプ壁紙、白い腰壁パネル、レースカーテン" : "");
  const outfit = translateOutfit(joinValues(selected, custom, "outfit"));
  const headAccessory = joinValues(selected, custom, "headAccessory");
  const outfitColor = joinValues(selected, custom, "outfitColor");
  const shoes = joinValues(selected, custom, "shoes");
  const color = joinValues(selected, custom, "color", "選択した世界観に合うやさしい色合い");
  const lighting = joinValues(selected, custom, "lighting", "明るくハイキー、透明感のある明るい光");
  const mood = joinValues(selected, custom, "mood", "ふんわり明るく、透明感のあるメルヘンな雰囲気");
  const pose = joinValues(selected, custom, "pose", "カメラ目線でちょこんと可愛く座る");
  const size = joinValues(selected, custom, "size", "正方形 1:1");
  const aspectInstruction = getSizeInstruction(size);

  const baseScene =
    locationType === "indoor"
      ? `屋内の「${locationOption}」で、${noItems ? "ペットの可愛い静止画。" : `${items || "レース、リボン、フリル"}に囲まれたペットの可愛い静止画。`}背景には${wallpaper}を入れて、壁や奥の空間まで可愛く作り込んでください。`
      : `屋外の「${outdoorWorlds.find((item) => item.id === outdoorWorldId)?.title || "ワールド"}」で、${buildOutdoorScene({ selected, custom, outdoorWorldId })}背景は、選んだ屋外ワールドに合う自然な奥行き・空気感・光を大切にしてください。`;

  const itemSentence = locationType === "outdoor" && items && !noItems ? `選んだ小物（${items}）は、世界観になじむ程度にさりげなく取り入れてください。` : "";
  const containerSentence = containerScene && !noContainer ? `ペットは「${containerScene}」という主役ギミックで表現してください。入れ物や透明素材を使う場合も、ペットの顔・目・鼻口まわりが歪んだり隠れたりしないようにしてください。` : "";
  const outfitSentence = outfit && !noOutfit ? `ペットは${outfitColor ? `${outfitColor}の` : ""}${outfit}を着ています。服はペットの体型に自然に合っていて、顔や目や鼻口まわりを隠さないでください。` : "必要以上に服を追加せず、元写真の自然な魅力を尊重してください。";
  const headAccessorySentence = headAccessory && !noHeadAccessory ? `頭には${headAccessory}を付けています。頭飾りやアクセサリーは、顔・目・鼻口まわりを隠さないようにしてください。` : "";
  const shoesSentence = shoes && !noShoes ? `足元には${shoes}を合わせています。靴や足元の飾りは小さめにして、ペットの体型や自然な可愛さを邪魔しないようにしてください。` : "";
  const sceneEffectSentence = locationType === "outdoor" ? buildSceneEffects({ selected, custom }) : "";
  const densitySentence = locationType === "indoor" ? "全体が地味にならないように、選択した小物や壁飾りを画面内にバランスよく配置し、華やかでごちゃかわいい密度のある一枚にしてください。" : "人工物を増やしすぎず、選んだワールドの雰囲気を大切にして、夢かわいく華やかな世界観にしてください。";
  const brightLock = "黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色調を暗く引きずらないでください。ペット本来の毛色は保ちつつ、背景は選んだ世界観どおり明るく、選択した色合いや世界観を維持してください。";

  return `${identityRule}\n\n${baseScene}${containerSentence}${itemSentence}${outfitSentence}${headAccessorySentence}${shoesSentence}${sceneEffectSentence}色合いは${color}。光や明るさは${lighting}。雰囲気は${mood}。ペットは${pose}。背景は明るく、やさしい光に包まれていて、可愛いけれどペットの顔を邪魔しない。${brightLock}${densitySentence}${aspectInstruction}ふんわり上品で夢かわいい一枚にしてください。`;
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

function OptionGroup({ category, selected, custom, onToggle, onCustomChange }) {
  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>{category.title}</h3>
      <div className="chips">
        {category.options.map((option) => {
          const active = selected[category.id]?.includes(option);
          return (
            <button key={option} onClick={() => onToggle(category.id, option, category.single)} className={`chip ${active ? "active" : ""}`}>
              {option}
            </button>
          );
        })}
      </div>
      <label>
        <PlusCircle size={16} /> {category.customLabel || "その他を記入"}
      </label>
      <input value={custom[category.id] || ""} onChange={(event) => onCustomChange(category.id, event.target.value)} placeholder={category.customPlaceholder || "カンマ、読点、改行で複数追加できます"} />
    </div>
  );
}

function App() {
  const [locationType, setLocationType] = useState("indoor");
  const [locationOption, setLocationOption] = useState("お姫さまの部屋");
  const [outdoorWorldId, setOutdoorWorldId] = useState("flowerGarden");
  const [selected, setSelected] = useState({});
  const [custom, setCustom] = useState({});
  const [featuredPrompt, setFeaturedPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const [modalImage, setModalImage] = useState(null);
  const [recommendedOpen, setRecommendedOpen] = useState(true);
  const [worldOpen, setWorldOpen] = useState(true);
  const textAreaRef = useRef(null);

  const toggleOption = (categoryId, option, single = false) => {
    setFeaturedPrompt("");
    setSelected((prev) => {
      const current = prev[categoryId] || [];
      const exists = current.includes(option);
      if (single) return { ...prev, [categoryId]: exists ? [] : [option] };
      if (option === "なし") return { ...prev, [categoryId]: exists ? [] : ["なし"] };
      const withoutNone = current.filter((item) => item !== "なし");
      return { ...prev, [categoryId]: exists ? withoutNone.filter((item) => item !== option) : [...withoutNone, option] };
    });
  };

  const selectLocationType = (type) => {
    setFeaturedPrompt("");
    setLocationType(type);
    if (type === "indoor") setLocationOption(locationTree.indoor.options[0]);
    setCustom((prev) => ({ ...prev, location: "" }));
  };

  const selectOutdoorWorld = (id) => {
    setFeaturedPrompt("");
    setOutdoorWorldId(id);
  };

  const updateCustom = (key, value) => {
    setFeaturedPrompt("");
    setCustom((prev) => ({ ...prev, [key]: value }));
    if (key === "location" && value.trim()) setLocationOption("");
  };

  const generatedPrompt = useMemo(() => buildPrompt({ locationType, locationOption, selected, custom, outdoorWorldId }), [locationType, locationOption, selected, custom, outdoorWorldId]);
  const prompt = featuredPrompt || generatedPrompt;

  const allSelected = useMemo(() => {
    if (featuredPrompt) return ["おすすめテンプレート使用中"];
    const base = Object.values(selected).flat();
    const customValues = Object.values(custom).flatMap(splitCustomText);
    const locationLabel = locationType === "indoor" ? locationOption : outdoorWorlds.find((item) => item.id === outdoorWorldId)?.title;
    return [locationTree[locationType]?.label, locationLabel, ...base, ...customValues].filter(Boolean);
  }, [selected, custom, locationType, locationOption, featuredPrompt, outdoorWorldId]);

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
    setOutdoorWorldId("flowerGarden");
    setSelected({});
    setCustom({});
    setFeaturedPrompt("");
    setCopyStatus("idle");
  };

  const LocationIcon = locationTree[locationType]?.icon || Home;
  const activeWorld = outdoorWorlds.find((item) => item.id === outdoorWorldId) || outdoorWorlds[0];

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
          {heroImageUrl && <div className="hero-image"><img src={heroImageUrl} alt="ゆゆ姫ワールドのトップ画像" /></div>}
        </motion.div>

        <div className="grid">
          <div className="left">
            <section className="card">
              <div className="card-head">
                <h2><Heart size={20} /> ゆゆ姫ワールド</h2>
                <button className="outline-button" onClick={reset}><RefreshCcw size={16} /> リセット</button>
              </div>
              <div className="notice">
                <strong>ゆゆ姫ワールドの作り方</strong>
                <span>屋内はお部屋やステージを選択。屋外はワールドを選んで、その世界専用の項目だけを表示します。黒い子・濃い茶色の子・グレー系の子は、背景まで暗く引っ張られやすいので「明るくハイキー」系の光設定推奨です。</span>
              </div>
            </section>

            <section className="card">
              <div className="card-head">
                <h2>🌸 ゆゆ姫のおすすめ</h2>
                <button className="outline-button" onClick={() => setRecommendedOpen((prev) => !prev)}>{recommendedOpen ? "閉じる" : "開く"}</button>
              </div>
              {recommendedOpen && (
                <div style={{ display: "grid", gap: "14px" }}>
                  {recommendedPrompts.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", padding: "12px", borderRadius: "24px", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(251,207,232,0.9)" }}>
                      <img src={item.image} alt={item.title} style={{ width: "140px", borderRadius: "20px", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }} onClick={() => setModalImage(item.image)} />
                      <div style={{ flex: 1, minWidth: "220px" }}>
                        <div style={{ fontSize: "13px", color: "#9d4edd", fontWeight: 800, marginBottom: "4px" }}>{item.label}</div>
                        <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
                        <p style={{ marginBottom: "12px" }}>{item.description}</p>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button className="main-button" onClick={() => { setFeaturedPrompt(item.prompt); setCopyStatus("idle"); }}>このおすすめを使う</button>
                          {featuredPrompt && <button className="outline-button" onClick={() => { setFeaturedPrompt(""); setCopyStatus("idle"); }}>通常作成に戻す</button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  <div className="chips">
                    {locationTree.indoor.options.map((option) => {
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
                  <h2>🌍 屋外ワールド</h2>
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
                      <OptionGroup key={category.id} category={category} selected={selected} custom={custom} onToggle={toggleOption} onCustomChange={updateCustom} />
                    ))}
                    <div style={{ display: "grid", gap: "18px", marginTop: "6px" }}>
                      {sceneEffects.map((category) => (
                        <OptionGroup key={category.id} category={category} selected={selected} custom={custom} onToggle={toggleOption} onCustomChange={updateCustom} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {multiCategories.filter((category) => !(category.indoorOnly && locationType !== "indoor")).map((category) => {
              const CategoryIcon = category.icon;
              return (
                <section key={category.id} className="card">
                  <h2>{CategoryIcon && <CategoryIcon size={20} />} {category.title}</h2>
                  <div className="chips">
                    {category.options.map((option) => {
                      const active = selected[category.id]?.includes(option);
                      return <button key={option} onClick={() => toggleOption(category.id, option, category.single)} className={`chip ${active ? "active" : ""}`}>{option}</button>;
                    })}
                  </div>
                  {category.id === "lighting" && <div className="notice" style={{ marginBottom: "12px" }}>黒い子・濃い茶色の子・グレー系の子は、背景や全体の色味まで暗く引っ張られやすいです。夢かわ・白ピンク系にしたい場合は「明るくハイキー」「白っぽくふんわり発光」推奨です。</div>}
                  <label><PlusCircle size={16} /> {customFieldLabels[category.id]}を記入</label>
                  <input value={custom[category.id] || ""} onChange={(event) => updateCustom(category.id, event.target.value)} placeholder={customPlaceholders[category.id] || "カンマ、読点、改行で複数追加できます"} />
                </section>
              );
            })}
          </div>

          <div className="right">
            <section className="card result-card">
              <div className="card-head"><h2>完成文</h2><button className="main-button" onClick={copyPrompt}><Copy size={16} /> {copyStatus === "copied" ? "コピー済み" : "コピー"}</button></div>
              {copyStatus === "manual" && <div className="message warn"><AlertCircle size={16} /><span>自動コピーがブロックされました。下の文章を選択済みにしたので、Ctrl+C または長押しコピーしてください。</span></div>}
              {copyStatus === "copied" && <div className="message ok"><CheckCircle2 size={16} /><span>コピーできました。</span></div>}
              <div className="selected">選択中：{allSelected.length ? allSelected.join(" / ") : "まだ未選択。初期おすすめで作成中。"}</div>
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
