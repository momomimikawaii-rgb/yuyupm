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
    options: [
      "苺畑",
      "ぶどう畑",
      "薔薇の庭園",
      "藤の花公園",
      "桜ロード",
      "メルヘンなお庭",
      "色とりどりの花が咲いた公園",
      "和風庭園",
      "イングリッシュガーデン",
    ],
  },
};

const multiCategories = [
  {
    id: "items",
    title: "小物・飾り",
    options: [
      "なし",
      "レース",
      "リボン",
      "パール",
      "フリル",
      "苺",
      "フルーツ各種いろいろ",
      "スウィーツ",
      "花かご",
      "カーテン",
      "くまのぬいぐるみ",
      "うさぎのぬいぐるみ",
    ],
  },
  {
    id: "containerScene",
    title: "入れ物・舞台ギミック",
    options: [
      "ペットがスノーボールの中に入っている",
      "ペットが大きな透明シャボン玉の中に入っている",
      "ペットがアンティークなティーカップの中に入っている",
      "ペットが可愛いガラスのグラスの中に入っている",
      "ペットが苺のバスケットの中に入っている",
      "ペットが花かごの中に入っている",
      "ペットが大きなプレゼント箱の中に入っている",
      "ペットがレースのベビーベッドに入っている",
      "ペットがマカロン型クッションの上にいる",
      "ペットが小さな馬車の中にいる",
    ],
  },
  {
    id: "wallpaper",
    title: "屋内の壁紙・壁飾り",
    indoorOnly: true,
    options: [
      "ピンクのストライプ壁紙",
      "苺柄の壁紙",
      "薔薇柄の壁紙",
      "小花柄の壁紙",
      "レース模様の壁紙",
      "天使やリボンの絵がある壁紙",
      "額縁入りの可愛い絵",
      "ドライフラワーの壁飾り",
      "リボンガーランド",
      "Happy Birthdayと書かれた風船のガーランド",
      "レースカーテン越しの光",
      "白い腰壁パネル",
      "アンティーク風の飾り棚",
    ],
  },
  {
    id: "outfit",
    title: "服・衣装",
    icon: Shirt,
    options: [
      "なし",
      "夏のフリルワンピース",
      "ごちゃかわロリータワンピース",
      "お姫さまドレス",
      "苺柄ワンピース",
      "レースたっぷりワンピース",
      "アイドル衣装",
      "カフェ店員さん風エプロン",
      "ふわふわケープ",
      "ヘッドドレス付きドレス",
      "リボンたっぷりドレス",
      "クラシカルロリータ",
      "妖精みたいなチュールドレス",
    ],
  },
  {
    id: "headAccessory",
    title: "頭飾り・アクセサリー",
    options: [
      "なし",
      "大きなリボン",
      "細い垂れリボン",
      "ヘッドドレス",
      "ボンネット",
      "麦わら帽子",
      "花冠",
      "ティアラ",
      "サングラス",
      "うさ耳カチューシャ",
      "苺モチーフの髪飾り",
      "レースのカチューシャ",
      "お花付きリボン",
      "藤の花飾り",
      "レース付き麦わら帽子",
      "ベレー帽",
      "ふわふわイヤーマフ",
      "天使の輪っか",
      "小さな王冠",
      "猫耳ヘッドドレス",
    ],
  },
  {
    id: "outfitColor",
    title: "服の色",
    options: [
      "白ピンク",
      "ミルキーピンク",
      "藤色",
      "クリームホワイト",
      "淡い水色",
      "苺ミルク色",
      "パウダーピンク",
      "パステルイエロー",
      "白レース多め",
      "ピンク×白フリル",
      "藤色×白フリル",
      "淡いミントグリーン",
    ],
  },
  {
    id: "shoes",
    title: "靴・足元",
    options: [
      "なし",
      "ピンクのリボン付きシューズ",
      "白レースの小さな靴",
      "藤色のリボンシューズ",
      "淡い水色の靴",
      "苺モチーフの靴",
      "可愛いピンクのレインブーツ",
      "小さな赤い長靴",
      "パール付きシューズ",
      "バレエシューズ風",
      "ふわふわブーツ",
      "足元に小さなリボンだけ",
    ],
  },

  {
    id: "outdoorBackground",
    title: "屋外背景",
    outdoorOnly: true,
    options: [
      "青空",
      "夕焼け空",
      "満天の星空",
      "星が降るような夜空",
      "淡いオーロラ",
      "月明かりの夜",
      "都会の夜景",
      "遠くにきらめく街明かり",
      "イルミネーションの光",
      "海が見える景色",
      "湖のほとり",
      "森の小道",
      "お城が見える遠景",
      "虹のかかった空",
      "天国のような光あふれる花園",
      "神々しい光の庭園",
      "雲の上の花園",
      "天使が住むような白い庭園",
      "祝福の光が降り注ぐ空",
      "パステルの花畑の先に、光が漏れる天国のドアがある",
      "花畑の奥に、まばゆい光が漏れる神聖な天国の門がある",
    ],
  },

  {
    id: "outdoorFlowers",
    title: "花・植物の種類",
    outdoorOnly: true,
    options: [
      "桜","薔薇","ネモフィラ","藤の花","あじさい","ラベンダー",
      "チューリップ","コスモス","ひまわり","椿","紅葉","雪景色","いろんな花",
    ],
  },
  {
    id: "outdoorEffects",
    title: "舞い演出・自然演出",
    outdoorOnly: true,
    options: [
      "なし",
      "桜の花びらがほろほろ舞い落ちている",
      "花びらが風に乗って舞っている",
      "雪がふんわり降っている",
      "雨粒がきらきらしている",
      "光の粒が漂っている",
      "シャボン玉が漂っている",
      "淡い虹が出ている",
      "星の光がきらきら舞っている",
      "オーロラの光が淡く揺れている",
      "朝霧",
      "木漏れ日",
    ],
  },
  {
    id: "outdoorDensity",
    title: "屋外の花・景色の密度",
    outdoorOnly: true,
    options: [
      "自然のまま控えめ",
      "花多め",
      "一面の花畑",
      "奥まで続く花道",
      "画面いっぱいに華やか",
    ],
  },

  {
    id: "color",
    title: "全体の色合い",
    options: [
      "白ピンク",
      "ミルキーピンク",
      "藤色",
      "クリームホワイト",
      "淡い水色",
      "桜ピンク",
      "パステル虹色",
      "淡い黄色",
      "上品なラベンダーピンク",
    ],
  },
  {
    id: "lighting",
    title: "光・明るさ",
    icon: Sun,
    options: [
      "明るくハイキー",
      "白っぽくふんわり発光",
      "透明感のある明るい光",
      "やさしい昼間の光",
      "夕暮れのやわらかい光",
      "夜景風",
      "月明かり風",
    ],
  },
  {
    id: "mood",
    title: "雰囲気",
    options: [
      "ふんわり",
      "透明感",
      "夢かわ",
      "メルヘン",
      "ロリータ風",
      "上品",
      "明るい昼間",
      "やさしい光",
      "高級感",
      "絵本のように可愛い",
    ],
  },
  {
    id: "pose",
    title: "ペットのポーズ・しぐさ",
    options: [
      "カメラ目線",
      "ちょこんと座る",
      "小首をかしげる",
      "お花をくんくん",
      "スウィーツを食べる",
      "ケーキを見つめる",
      "窓辺でふんわり",
      "クッションでくつろぐ",
      "前足をそろえる",
      "にっこり笑っているように見える",
    ],
  },
  {
    id: "size",
    title: "画像サイズ",
    options: [
      "正方形 1:1",
      "インスタ投稿用 縦長4:5",
      "リール・ストーリー用 縦長9:16",
      "横長16:9",
    ],
  },
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
  outdoorBackground: "その他の屋外背景",
  outdoorFlowers: "その他の花・植物",
  outdoorEffects: "その他の自然演出",
  outdoorDensity: "その他の景色密度",
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
  outdoorBackground: "例：星降る夜空、淡いオーロラ、都会の夜景、光が漏れる天国の門",
  outdoorFlowers: "例：桜と藤、ネモフィラとチューリップ、雪景色と椿",
  outdoorEffects: "例：花びらが舞う、虹、木漏れ日、朝霧",
  outdoorDensity: "例：一面の花畑、奥まで続く花道",
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
    prompt: `${identityRule}

屋外の「雨の日のあじさいロード」で、たくさんのあじさい（桜ピンク、藤色、水色）に囲まれたペットの可愛い静止画。少なめの小さな水玉（ピンク・水色・藤色）が入った、フリル付きの白い可愛い傘をペットが持っています。

背景には、奥まで続くあじさいロード、美しい雨粒、お天気雨の透明感、淡い虹を入れてください。晴れているのに雨が降っているような、明るく幻想的な雰囲気。雨の日でも暗くせず、透明感のあるハイキーな明るさを維持してください。

ペットは、花型ポケットの付いた可愛いフリル付きのピンクのレインコートを着ています。右耳の下には可愛いピンクの細長いフリル付きリボンをつけています。服はペットの体型に自然に合っていて、顔や鼻口まわりを隠さないでください。

色合いは桜ピンクを中心に、藤色・淡い水色を組み合わせ、少量の白や淡い黄色のあじさいも配置してください。

雰囲気は、透明感、絵本のような可愛さ、やさしい光、夢かわいい世界観。自然の景色を活かしつつ、華やかだけど自然な可愛さを大切にしてください。

黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色味を暗く引きずらないでください。ペット本来の毛色を保ちつつ、背景は明るく、選択した世界観どおりのやさしい色合いを維持してください。

ペットは小首をかしげながら、傘を持ってこちらを見ています。画像サイズは4:5の縦長。ふんわり上品で夢かわいい一枚にしてください。`,
  },
];

function splitCustomText(value) {
  if (!value) return [];
  return value
    .split(/[、,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
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

function getLocationLabel(locationType, locationOption, customLocation) {
  const customValues = splitCustomText(customLocation);
  if (customValues.length) return customValues.join("、");
  if (locationOption) return locationOption;
  if (locationType) return `${locationTree[locationType].label}の可愛い場所`;
  return "白ピンクの夢かわいい空間";
}

function getSizeInstruction(size) {
  if (size.includes("1:1") || size.includes("正方形")) return "画像サイズは1:1の正方形。";
  if (size.includes("4:5")) return "画像サイズは4:5の縦長。";
  if (size.includes("9:16")) return "画像サイズは9:16の縦長。";
  if (size.includes("16:9")) return "画像サイズは16:9の横長。";
  return size ? `画像サイズは${size}。` : "";
}

function buildPrompt({ locationType, locationOption, selected, custom }) {
  const location = getLocationLabel(locationType, locationOption, custom.location);
  const locationKind = locationType ? locationTree[locationType].label : "屋内または屋外";

  const noItems = hasNoneSelected(selected, "items");
  const noOutfit = hasNoneSelected(selected, "outfit");
  const noHeadAccessory = hasNoneSelected(selected, "headAccessory");
  const noShoes = hasNoneSelected(selected, "shoes");

  const items = joinValues(selected, custom, "items");
  const containerScene = joinValues(selected, custom, "containerScene");
  const wallpaper = joinValues(
    selected,
    custom,
    "wallpaper",
    locationType === "indoor" ? "ピンクのストライプ壁紙、白い腰壁パネル、レースカーテン" : ""
  );
  const outfit = joinValues(selected, custom, "outfit");
  const headAccessory = joinValues(selected, custom, "headAccessory");
  const outfitColor = joinValues(selected, custom, "outfitColor");
  const shoes = joinValues(selected, custom, "shoes");
  const outdoorBackground = joinValues(selected, custom, "outdoorBackground");
  const outdoorFlowers = joinValues(selected, custom, "outdoorFlowers");
  const outdoorEffects = joinValues(selected, custom, "outdoorEffects");
  const outdoorDensity = joinValues(selected, custom, "outdoorDensity");
  const color = joinValues(selected, custom, "color", "選択した世界観に合うやさしい色合い");
  const lighting = joinValues(selected, custom, "lighting", "明るくハイキー、透明感のある明るい光");
  const mood = joinValues(selected, custom, "mood", "ふんわり明るく、透明感のあるメルヘンな雰囲気");
  const pose = joinValues(selected, custom, "pose", "カメラ目線でちょこんと可愛く座る");
  const size = joinValues(selected, custom, "size", "正方形 1:1");
  const aspectInstruction = getSizeInstruction(size);

  const outdoorBackgroundText = outdoorBackground ? `${outdoorBackground}を背景に、` : "";
  const outdoorFlowerText = outdoorFlowers || "美しい花々";
  const outdoorEffectText = outdoorEffects ? `、${outdoorEffects}` : "";
  const outdoorDensityText = outdoorDensity ? `、${outdoorDensity}` : "";

  const baseScene =
    locationType === "indoor"
      ? noItems
        ? "ペットの可愛い静止画。"
        : `${items || "レース、リボン、フリル"}に囲まれたペットの可愛い静止画。`
      : `${outdoorBackgroundText}${outdoorFlowerText}に囲まれ${outdoorEffectText}${outdoorDensityText}、自然の美しさに包まれたペットの可愛い静止画。`;

  const itemSentence =
    locationType === "outdoor" && items
      ? `選んだ小物（${items}）は、自然の景色になじむ程度にさりげなく取り入れてください。`
      : "";

  const backgroundSentence =
    locationType === "indoor"
      ? `背景には${wallpaper}を入れて、壁や奥の空間まで可愛く作り込んでください。`
      : "背景は、選んだ屋外の世界観に合う自然の奥行き・空気感・光を大切にしてください。人工物を増やしすぎず、自然な可愛さを大切にしてください。";

  const containerSentence = containerScene
    ? `ペットは「${containerScene}」という主役ギミックで表現してください。入れ物や透明素材を使う場合も、ペットの顔・目・鼻口まわりが歪んだり隠れたりしないようにしてください。`
    : "";

  const outfitSentence =
    outfit && !noOutfit
      ? `ペットは${outfitColor ? `${outfitColor}の` : ""}${outfit}を着ています。服はペットの体型に自然に合っていて、顔や目や鼻口まわりを隠さないでください。`
      : "必要以上に服を追加せず、元写真の自然な魅力を尊重してください。";

  const headAccessorySentence =
    headAccessory && !noHeadAccessory
      ? `頭には${headAccessory}を付けています。頭飾りやアクセサリーは、顔・目・鼻口まわりを隠さないようにしてください。`
      : "";

  const shoesSentence =
    shoes && !noShoes
      ? `足元には${shoes}を合わせています。靴や足元の飾りは小さめにして、ペットの体型や自然な可愛さを邪魔しないようにしてください。`
      : "";

  const densitySentence =
    locationType === "indoor"
      ? "全体が地味にならないように、選択した小物や壁飾りを画面内にバランスよく配置し、華やかでごちゃかわいい密度のある一枚にしてください。"
      : "自然の景色や花畑の美しさを活かしつつ、夢かわいく華やかな世界観にしてください。";

  const brightLock =
    "黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色調を暗く引きずらないでください。ペット本来の毛色は保ちつつ、背景は選んだ世界観どおり明るく、選択した色合いや世界観を維持してください。";

  return `${identityRule}

${locationKind}の「${location}」で、${baseScene}${containerSentence}${backgroundSentence}${itemSentence}${outfitSentence}${headAccessorySentence}${shoesSentence}色合いは${color}。光や明るさは${lighting}。雰囲気は${mood}。ペットは${pose}。背景は明るく、やさしい光に包まれていて、可愛いけれどペットの顔を邪魔しない。${brightLock}${densitySentence}${aspectInstruction}ふんわり上品で夢かわいい一枚にしてください。`;
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

function App() {
  const [locationType, setLocationType] = useState("indoor");
  const [locationOption, setLocationOption] = useState("お姫さまの部屋");
  const [selected, setSelected] = useState({});
  const [custom, setCustom] = useState({});
  const [featuredPrompt, setFeaturedPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const [modalImage, setModalImage] = useState(null);
  const [recommendedOpen, setRecommendedOpen] = useState(true);
  const [outdoorOpen, setOutdoorOpen] = useState(true);
  const textAreaRef = useRef(null);

  const toggleOption = (categoryId, option) => {
    setFeaturedPrompt("");
    setSelected((prev) => {
      const current = prev[categoryId] || [];
      const exists = current.includes(option);
      return {
        ...prev,
        [categoryId]: exists ? current.filter((item) => item !== option) : [...current, option],
      };
    });
  };

  const selectLocationType = (type) => {
    setFeaturedPrompt("");
    setLocationType(type);
    setLocationOption(locationTree[type].options[0]);
    setCustom((prev) => ({ ...prev, location: "" }));
  };

  const generatedPrompt = useMemo(
    () => buildPrompt({ locationType, locationOption, selected, custom }),
    [locationType, locationOption, selected, custom]
  );

  const prompt = featuredPrompt || generatedPrompt;

  const allSelected = useMemo(() => {
    if (featuredPrompt) return ["おすすめテンプレート使用中"];
    const base = Object.values(selected).flat();
    const customValues = Object.values(custom).flatMap(splitCustomText);
    return [locationTree[locationType]?.label, locationOption, ...base, ...customValues].filter(Boolean);
  }, [selected, custom, locationType, locationOption, featuredPrompt]);

  const copyPrompt = async () => {
    const result = await copyTextSafely(prompt, textAreaRef.current);

    if (result.ok) {
      setCopyStatus("copied");
    } else {
      setCopyStatus("manual");
      textAreaRef.current?.focus();
      textAreaRef.current?.select();
    }

    setTimeout(() => setCopyStatus("idle"), 2200);
  };

  const reset = () => {
    setLocationType("indoor");
    setLocationOption("お姫さまの部屋");
    setSelected({});
    setCustom({});
    setFeaturedPrompt("");
    setCopyStatus("idle");
  };

  const updateCustom = (key, value) => {
    setFeaturedPrompt("");
    setCustom((prev) => ({ ...prev, [key]: value }));
    if (key === "location" && value.trim()) setLocationOption("");
  };

  const LocationIcon = locationTree[locationType]?.icon || Home;

  return (
    <div className="page">
      <div className="blob blob-pink" />
      <div className="blob blob-violet" />
      <div className="blob blob-blue" />
      <div className="dots" />

      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(30, 20, 40, 0.65)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <img
            src={modalImage}
            alt="拡大画像"
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              borderRadius: "28px",
              boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
              background: "white",
              padding: "6px",
            }}
          />
        </div>
      )}

      <div className="container">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="hero">
          <div className="badge">
            <Sparkles size={16} />
            <span>Yuyu Princess World</span>
          </div>
          <h1>ゆゆ姫の夢かわプロンプト工房</h1>
          <p className="subtitle">
            場所はツリー式、小物・服・ポーズ・画像サイズ・光をポチポチ選択。白ピンク・藤色・水色のやさしい世界で、ペットの顔を守るプロンプトを作ります。
          </p>
          {heroImageUrl && (
            <div className="hero-image">
              <img src={heroImageUrl} alt="ゆゆ姫ワールドのトップ画像" />
            </div>
          )}
        </motion.div>

        <div className="grid">
          <div className="left">
            <section className="card">
              <div className="card-head">
                <h2>
                  <Heart size={20} /> ゆゆ姫ワールド
                </h2>
                <button className="outline-button" onClick={reset}>
                  <RefreshCcw size={16} /> リセット
                </button>
              </div>
              <div className="notice">
                <strong>ゆゆ姫ワールドの作り方</strong>
                <span>
                  場所を選んで、小物・服・色・雰囲気を盛るだけ。苺、レース、リボン、パールをたっぷり入れても、ペットのお顔だけは最優先で守るプロンプトになります。
                  黒い子・濃い茶色の子・グレー系の子は、背景まで暗く引っ張られやすいので「明るくハイキー」系の光設定推奨です。
                </span>
              </div>
            </section>

            <section className="card">
              <div className="card-head">
                <h2>🌸 ゆゆ姫のおすすめ</h2>
                <button
                  className="outline-button"
                  onClick={() => setRecommendedOpen((prev) => !prev)}
                >
                  {recommendedOpen ? "閉じる" : "開く"}
                </button>
              </div>

              {recommendedOpen && (
                <div style={{ display: "grid", gap: "14px" }}>
                  {recommendedPrompts.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        flexWrap: "wrap",
                        padding: "12px",
                        borderRadius: "24px",
                        background: "rgba(255,255,255,0.72)",
                        border: "1px solid rgba(251,207,232,0.9)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "140px",
                          borderRadius: "20px",
                          cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        }}
                        onClick={() => setModalImage(item.image)}
                      />

                      <div style={{ flex: 1, minWidth: "220px" }}>
                        <div style={{ fontSize: "13px", color: "#9d4edd", fontWeight: 800, marginBottom: "4px" }}>
                          {item.label}
                        </div>
                        <h3 style={{ marginBottom: "8px" }}>{item.title}</h3>
                        <p style={{ marginBottom: "12px" }}>{item.description}</p>

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button
                            className="main-button"
                            onClick={() => {
                              setFeaturedPrompt(item.prompt);
                              setCopyStatus("idle");
                            }}
                          >
                            このおすすめを使う
                          </button>

                          {featuredPrompt && (
                            <button
                              className="outline-button"
                              onClick={() => {
                                setFeaturedPrompt("");
                                setCopyStatus("idle");
                              }}
                            >
                              通常作成に戻す
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="card">
              <h2>
                <LocationIcon size={20} /> 場所を選ぶ
              </h2>
              <div className="choice-grid">
                {Object.entries(locationTree).map(([key, value]) => {
                  const Icon = value.icon;
                  const active = locationType === key;
                  return (
                    <button
                      key={key}
                      onClick={() => selectLocationType(key)}
                      className={`big-choice ${active ? "active-soft" : ""}`}
                    >
                      <Icon size={20} />
                      <strong>{value.label}</strong>
                    </button>
                  );
                })}
              </div>

              <div className="chips">
                {locationTree[locationType].options.map((option) => {
                  const active = locationOption === option && !custom.location;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setFeaturedPrompt("");
                        setLocationOption(option);
                        setCustom((prev) => ({ ...prev, location: "" }));
                      }}
                      className={`chip ${active ? "active" : ""}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <label>
                <PlusCircle size={16} /> その他の場所を記入
              </label>
              <input
                value={custom.location || ""}
                onChange={(event) => updateCustom("location", event.target.value)}
                placeholder="例：雪景色のお城、星空のバルコニー、苺レースの小部屋"
              />
            </section>


            {locationType === "outdoor" && (
              <section className="card">
                <div className="card-head">
                  <h2>🌸 花・自然演出</h2>
                  <button
                    className="outline-button"
                    onClick={() => setOutdoorOpen((prev) => !prev)}
                  >
                    {outdoorOpen ? "閉じる" : "開く"}
                  </button>
                </div>

                {outdoorOpen && (
                  <div style={{ display: "grid", gap: "18px" }}>
                    {multiCategories
                      .filter((category) =>
                        ["outdoorBackground", "outdoorFlowers", "outdoorEffects", "outdoorDensity"].includes(category.id)
                      )
                      .map((category) => (
                        <div key={category.id}>
                          <h3 style={{ marginBottom: "10px" }}>{category.title}</h3>

                          <div className="chips">
                            {category.options.map((option) => {
                              const active = selected[category.id]?.includes(option);

                              return (
                                <button
                                  key={option}
                                  onClick={() => toggleOption(category.id, option)}
                                  className={`chip ${active ? "active" : ""}`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>

                          <label>
                            <PlusCircle size={16} /> {customFieldLabels[category.id]}を記入
                          </label>

                          <input
                            value={custom[category.id] || ""}
                            onChange={(event) => updateCustom(category.id, event.target.value)}
                            placeholder={customPlaceholders[category.id]}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </section>
            )}

            {multiCategories
              .filter((category) => !(category.indoorOnly && locationType !== "indoor"))
              .filter((category) => !category.outdoorOnly)
              .map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <section key={category.id} className="card">
                    <h2>
                      {CategoryIcon && <CategoryIcon size={20} />} {category.title}
                    </h2>
                    <div className="chips">
                      {category.options.map((option) => {
                        const active = selected[category.id]?.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => toggleOption(category.id, option)}
                            className={`chip ${active ? "active" : ""}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {category.id === "lighting" && (
                      <div className="notice" style={{ marginBottom: "12px" }}>
                        黒い子・濃い茶色の子・グレー系の子は、背景や全体の色味まで暗く引っ張られやすいです。夢かわ・白ピンク系にしたい場合は「明るくハイキー」「白っぽくふんわり発光」推奨です。
                      </div>
                    )}

                    <label>
                      <PlusCircle size={16} /> {customFieldLabels[category.id]}を記入
                    </label>
                    <input
                      value={custom[category.id] || ""}
                      onChange={(event) => updateCustom(category.id, event.target.value)}
                      placeholder={customPlaceholders[category.id] || "カンマ、読点、改行で複数追加できます"}
                    />
                  </section>
                );
              })}
          </div>

          <div className="right">
            <section className="card result-card">
              <div className="card-head">
                <h2>完成文</h2>
                <button className="main-button" onClick={copyPrompt}>
                  <Copy size={16} /> {copyStatus === "copied" ? "コピー済み" : "コピー"}
                </button>
              </div>

              {copyStatus === "manual" && (
                <div className="message warn">
                  <AlertCircle size={16} />
                  <span>自動コピーがブロックされました。下の文章を選択済みにしたので、Ctrl+C または長押しコピーしてください。</span>
                </div>
              )}
              {copyStatus === "copied" && (
                <div className="message ok">
                  <CheckCircle2 size={16} />
                  <span>コピーできました。</span>
                </div>
              )}

              <div className="selected">
                選択中：{allSelected.length ? allSelected.join(" / ") : "まだ未選択。初期おすすめで作成中。"}
              </div>
              <textarea ref={textAreaRef} value={prompt} readOnly aria-label="生成されたプロンプト" />
            </section>

            <section className="card small-card">
              <strong>固定ルール：</strong>ペットの顔・毛色・目・鼻口まわりを最優先で守る文を、どの出力にも自動で入れています。
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
