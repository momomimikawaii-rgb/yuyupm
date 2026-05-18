import React, { useMemo, useRef, useState } from "react";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const heroImageUrl = ""; // トップ画像を表示したい場合は、ここに画像URLを入れてください。

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
      "犬がスノーボールの中に入っている",
      "犬が大きな透明シャボン玉の中に入っている",
      "犬がアンティークなティーカップの中に入っている",
      "犬が可愛いガラスのグラスの中に入っている",
      "犬が苺のバスケットの中に入っている",
      "犬が花かごの中に入っている",
      "犬が大きなプレゼント箱の中に入っている",
      "犬がレースのベビーベッドに入っている",
      "犬がマカロン型クッションの上にいる",
      "犬が小さな馬車の中にいる",
    ],
  },
  {
    id: "wallpaper",
    title: "屋内の壁紙・壁飾り",
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
    id: "color",
    title: "全体の色合い",
    options: ["白ピンク", "ミルキーピンク", "藤色", "クリームホワイト", "淡い水色", "桜ピンク", "パステル虹色", "淡い黄色", "上品なラベンダーピンク"],
  },
  {
    id: "lighting",
    title: "光・明るさ",
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
    options: ["ふんわり", "透明感", "夢かわ", "メルヘン", "ロリータ風", "上品", "明るい昼間", "やさしい光", "高級感", "絵本のように可愛い"],
  },
  {
    id: "pose",
    title: "犬のポーズ・しぐさ",
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
    options: ["正方形 1:1", "インスタ投稿用 縦長4:5", "リール・ストーリー用 縦長9:16", "横長16:9"],
  },
];

const customFieldLabels = {
  location: "その他の場所",
  items: "その他の小物",
  containerScene: "その他の入れ物・舞台ギミック",
  wallpaper: "その他の壁紙・壁飾り",
  outfit: "その他の服・衣装",
  outfitColor: "その他の服の色",
  color: "その他の全体色",
  mood: "その他の雰囲気",
  pose: "その他のポーズ",
  size: "その他の画像サイズ",
};

const customPlaceholders = {
  items: "例：小さな王冠、ピンクの魔法ステッキ、苺のティアラ",
  containerScene: "例：宝石箱の中に入る、透明な香水瓶の中に入る、苺パフェグラスに入る",
  wallpaper: "例：ピンクの薔薇柄壁紙、額縁の天使画、ドライフラワーのスワッグ",
  outfit: "例：天使のワンピース、春色ロリータ、苺のお姫さまドレス",
  outfitColor: "例：白×藤色、苺ミルクピンク、淡いクリーム色",
  color: "例：白多めのピンク、淡い藤色、ミルキーなパステルカラー",
  mood: "例：甘くて上品、絵本みたい、ふわふわキラキラ",
  pose: "例：マカロンを見つめる、前足でカップを持つ、リボンを見上げる",
  size: "例：横長3:2、縦長2:3、ワイドバナー用",
};

const identityRule = `アップロードされた犬の顔・表情・毛色・模様・目の形・鼻と口まわり・耳の位置・毛並み・体格を最優先で保持してください。犬の顔を別の犬に変えないでください。可愛く整える場合も、元写真の本人らしさを崩さないことを最重要にしてください。白目やまつ毛など、元写真にない要素は勝手に追加しないでください。`;

function splitCustomText(value) {
  if (!value) return [];
  return value
    .split(/[、,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinSelected(selected, custom, key, fallback) {
  const preset = selected[key] || [];
  const customValues = splitCustomText(custom[key]);
  const values = [...preset, ...customValues];
  return values.length ? values.join("、") : fallback;
}

function getLocationLabel(locationType, locationOption, customLocation) {
  const customValues = splitCustomText(customLocation);
  if (customValues.length) return customValues.join("、");
  if (locationOption) return locationOption;
  if (locationType) return `${locationTree[locationType].label}の可愛い場所`;
  return "白ピンクの夢かわいい空間";
}

function buildPrompt({ locationType, locationOption, selected, custom }) {
  const location = getLocationLabel(locationType, locationOption, custom.location);
  const items = joinSelected(selected, custom, "items", "レース、リボン、フリル");
  const containerScene = joinSelected(selected, custom, "containerScene", "");
  const wallpaper = joinSelected(selected, custom, "wallpaper", locationType === "indoor" ? "ピンクのストライプ壁紙、白い腰壁パネル、レースカーテン" : "背景に自然な奥行きのある景色");
  const outfit = joinSelected(selected, custom, "outfit", "可愛いフリル衣装");
  const outfitColor = joinSelected(selected, custom, "outfitColor", "白ピンク系");
  const color = joinSelected(selected, custom, "color", "白ピンクとミルキーカラー");
  const lighting = joinSelected(selected, custom, "lighting", "明るくハイキー、透明感のある明るい光");
  const mood = joinSelected(selected, custom, "mood", "ふんわり明るく、透明感のあるメルヘンな雰囲気");
  const pose = joinSelected(selected, custom, "pose", "カメラ目線でちょこんと可愛く座る");
  const size = joinSelected(selected, custom, "size", "正方形 1:1");

  let aspectInstruction = "";

  if (size.includes("1:1") || size.includes("正方形")) {
    aspectInstruction = "画像サイズは1:1の正方形。";
  } else if (size.includes("4:5")) {
    aspectInstruction = "画像サイズは4:5の縦長。";
  } else if (size.includes("9:16")) {
    aspectInstruction = "画像サイズは9:16の縦長。";
  } else if (size.includes("16:9")) {
    aspectInstruction = "画像サイズは16:9の横長。";
  } else if (size) {
    aspectInstruction = `画像サイズは${size}。`;
  } else if (use.includes("インスタ投稿")) {
    aspectInstruction = "4:5構図。インスタ投稿で見栄えするように、被写体を少し大きめに配置してください。";
  } else if (use.includes("プロフィール画像")) {
    aspectInstruction = "1:1の正方形構図。アイコン表示でも犬の顔が分かりやすいように、顔を中央に大きく配置してください。";
  } else if (use.includes("LINEスタンプ風")) {
    aspectInstruction = "スタンプ向けのシンプルで見やすい構図。犬が小さくなりすぎないようにしてください。";
  }
  const locationKind = locationType ? locationTree[locationType].label : "屋内または屋外";
  const containerSentence = containerScene
    ? `犬は「${containerScene}」という主役ギミックで表現してください。入れ物や透明素材を使う場合も、犬の顔・目・鼻口まわりが歪んだり隠れたりしないようにしてください。`
    : "";

  return `${identityRule}

${locationKind}の「${location}」で、${items}に囲まれた犬の可愛い静止画。${containerSentence}背景には${wallpaper}を入れて、壁や奥の空間まで可愛く作り込んでください。犬は${outfitColor}の${outfit}を着ています。服は犬の体型に自然に合っていて、顔や目や鼻口まわりを隠さないでください。色合いは${color}。光や明るさは${lighting}。雰囲気は${mood}。犬は${pose}。背景は明るく、やさしい光に包まれていて、可愛いけれど犬の顔を邪魔しない。全体が地味にならないように、レース、リボン、花、スウィーツ、壁飾りを画面内にバランスよく配置し、華やかでごちゃかわいい密度のある一枚にしてください。${aspectInstruction}ふんわり上品で夢かわいい一枚にしてください。`;
}

async function copyTextSafely(text, fallbackElement) {
  try {
    if (navigator?.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { ok: true };
    }
  } catch (error) {
    // Some embedded previews block Clipboard API via permissions policy.
  }

  try {
    if (fallbackElement) {
      fallbackElement.focus();
      fallbackElement.select();
      const copied = document.execCommand?.("copy");
      return { ok: Boolean(copied) };
    }
  } catch (error) {
    // Ignore and return manual fallback below.
  }

  return { ok: false };
}

function runPromptTests() {
  const baseState = { locationType: "indoor", locationOption: "お姫さまの部屋", selected: {}, custom: {} };
  const generated = buildPrompt(baseState);

  const tests = [
    {
      name: "prompt does not include distribution labels",
      pass: !generated.includes("プロンプト配布用") && !generated.includes("完成プロンプト"),
    },
    {
      name: "prompt includes identity rule",
      pass: generated.includes("犬の顔を別の犬に変えないでください"),
    },
    {
      name: "selected tree location appears in prompt",
      pass: generated.includes("お姫さまの部屋"),
    },
    {
      name: "container scene, wallpaper, outfit and outfit color are included",
      pass: buildPrompt({ ...baseState, selected: { containerScene: ["犬がアンティークなティーカップの中に入っている"], wallpaper: ["苺柄の壁紙"], outfit: ["夏のフリルワンピース"], outfitColor: ["藤色"] }, custom: {} }).includes("ティーカップ") && buildPrompt({ ...baseState, selected: { containerScene: ["犬がアンティークなティーカップの中に入っている"], wallpaper: ["苺柄の壁紙"], outfit: ["夏のフリルワンピース"], outfitColor: ["藤色"] }, custom: {} }).includes("苺柄の壁紙") && buildPrompt({ ...baseState, selected: { containerScene: ["犬がアンティークなティーカップの中に入っている"], wallpaper: ["苺柄の壁紙"], outfit: ["夏のフリルワンピース"], outfitColor: ["藤色"] }, custom: {} }).includes("夏のフリルワンピース") && buildPrompt({ ...baseState, selected: { containerScene: ["犬がアンティークなティーカップの中に入っている"], wallpaper: ["苺柄の壁紙"], outfit: ["夏のフリルワンピース"], outfitColor: ["藤色"] }, custom: {} }).includes("藤色"),
    },
    {
      name: "custom fields are included",
      pass: buildPrompt({ ...baseState, custom: { items: "王冠, 魔法のステッキ", outfit: "天使のワンピース", outfitColor: "白い羽色" } }).includes("王冠") && buildPrompt({ ...baseState, custom: { items: "王冠, 魔法のステッキ", outfit: "天使のワンピース", outfitColor: "白い羽色" } }).includes("天使のワンピース") && buildPrompt({ ...baseState, custom: { items: "王冠, 魔法のステッキ", outfit: "天使のワンピース", outfitColor: "白い羽色" } }).includes("白い羽色"),
    },
  ];

  return tests;
}

export default function YuyuPrincessPromptMaker() {
  const [locationType, setLocationType] = useState("indoor");
  const [locationOption, setLocationOption] = useState("お姫さまの部屋");
  const [selected, setSelected] = useState({});
  const [custom, setCustom] = useState({});
  const [copyStatus, setCopyStatus] = useState("idle");
  const textAreaRef = useRef(null);

  const toggleOption = (categoryId, option) => {
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
    setLocationType(type);
    setLocationOption(locationTree[type].options[0]);
    setCustom((prev) => ({ ...prev, location: "" }));
  };

  const allSelected = useMemo(() => {
    const base = Object.values(selected).flat();
    const customValues = Object.values(custom).flatMap(splitCustomText);
    return [locationTree[locationType]?.label, locationOption, ...base, ...customValues].filter(Boolean);
  }, [selected, custom, locationType, locationOption]);

  const prompt = useMemo(
    () => buildPrompt({ locationType, locationOption, selected, custom }),
    [locationType, locationOption, selected, custom]
  );

  const tests = useMemo(() => runPromptTests(), []);
  const allTestsPassed = tests.every((test) => test.pass);

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
    setCopyStatus("idle");
  };

  const updateCustom = (key, value) => {
    setCustom((prev) => ({ ...prev, [key]: value }));
    if (key === "location" && value.trim()) {
      setLocationOption("");
    }
  };

  const LocationIcon = locationTree[locationType]?.icon || Home;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&display=swap');
        .yuyu-rounded-font {
          font-family: 'M PLUS Rounded 1c', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
      <div className="yuyu-rounded-font relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff1f8_0,#fffafd_30%,#f4ecff_62%,#eaf8ff_100%)] p-4 md:p-8 text-slate-800">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-pink-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-24 -right-16 h-80 w-80 rounded-full bg-violet-100/55 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-sky-100/55 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(#fbcfe8_1px,transparent_1px),radial-gradient(#ddd6fe_1px,transparent_1px),radial-gradient(#bae6fd_1px,transparent_1px)] [background-size:28px_28px,42px_42px,52px_52px] [background-position:0_0,12px_18px,20px_8px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 shadow-md border border-pink-200 mb-4 ring-4 ring-violet-100/50">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Yuyu Princess World</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-pink-500 via-violet-400 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            ゆゆ姫の夢かわプロンプト工房
          </h1>
          <p className="mx-auto mt-3 max-w-2xl rounded-full bg-white/75 px-5 py-2 text-sm md:text-base text-slate-600 shadow-sm border border-pink-100">
            場所はツリー式、小物・服・ポーズ・画像サイズ・光をポチポチ選択。白ピンク・藤色・水色のやさしい世界で、犬の顔を守るプロンプトを作ります。
          </p>

          {heroImageUrl && (
            <div className="mx-auto mt-5 max-w-3xl overflow-hidden rounded-[2rem] border border-pink-200 bg-white/80 p-2 shadow-xl ring-4 ring-white/50">
              <img src={heroImageUrl} alt="ゆゆ姫ワールドのトップ画像" className="h-56 w-full rounded-[1.5rem] object-cover md:h-72" />
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 space-y-4">
            <Card className="rounded-[2rem] border-pink-200 shadow-md bg-white/90 ring-4 ring-white/45">
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-violet-600 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    ゆゆ姫ワールド
                  </h2>
                  <Button variant="outline" size="sm" onClick={reset} className="rounded-full">
                    <RefreshCcw className="h-4 w-4 mr-1" /> リセット
                  </Button>
                </div>
                <div className="relative overflow-hidden rounded-[2rem] border border-pink-200 bg-gradient-to-br from-pink-50 via-white to-sky-50 p-5 text-sm text-slate-700 leading-relaxed shadow-inner">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-100/60 blur-2xl" />
                  <div className="relative">
                    <div className="mb-2 text-base font-extrabold text-violet-600">ゆゆ姫ワールドの作り方</div>
                    場所を選んで、小物・服・色・雰囲気を盛るだけ。苺、レース、リボン、パールをたっぷり入れても、犬のお顔だけは最優先で守るプロンプトになります。黒い子・濃い茶色の子・グレー系の子は、背景まで暗く引っ張られやすいので、『明るくハイキー』系の光設定推奨です。
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-pink-200 shadow-md bg-white/90 ring-4 ring-white/45">
              <CardContent className="p-4 md:p-5">
                <h2 className="text-lg font-extrabold text-violet-600 mb-3 flex items-center gap-2">
                  <LocationIcon className="h-5 w-5" />
                  場所を選ぶ
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(locationTree).map(([key, value]) => {
                    const Icon = value.icon;
                    const active = locationType === key;
                    return (
                      <button
                        key={key}
                        onClick={() => selectLocationType(key)}
                        className={`rounded-2xl border p-4 text-left transition shadow-sm ${active ? "bg-violet-100 border-violet-300" : "bg-white border-slate-100 hover:bg-violet-50"}`}
                      >
                        <Icon className="h-5 w-5 mb-2" />
                        <div className="font-bold">{value.label}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {locationTree[locationType].options.map((option) => {
                    const active = locationOption === option && !custom.location;
                    return (
                      <button
                        key={option}
                        onClick={() => {
                          setLocationOption(option);
                          setCustom((prev) => ({ ...prev, location: "" }));
                        }}
                        className={`rounded-full px-4 py-2 text-sm border transition shadow-sm hover:scale-[1.03] active:scale-[0.98] ${
                          active
                            ? "bg-violet-400 text-white border-violet-400 shadow-sm"
                            : "bg-white text-slate-700 border-pink-100 hover:bg-violet-50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  その他の場所を記入
                </label>
                <input
                  value={custom.location || ""}
                  onChange={(event) => updateCustom("location", event.target.value)}
                  placeholder="例：雪景色のお城、星空のバルコニー、苺レースの小部屋"
                  className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-200"
                />
              </CardContent>
            </Card>

            {multiCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={category.id} className="rounded-[2rem] border-pink-200 shadow-md bg-white/90 ring-4 ring-white/45">
                  <CardContent className="p-4 md:p-5">
                    <h2 className="text-lg font-extrabold text-violet-600 mb-3 flex items-center gap-2">
                      {CategoryIcon && <CategoryIcon className="h-5 w-5" />}
                      {category.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.options.map((option) => {
                        const active = selected[category.id]?.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => toggleOption(category.id, option)}
                            className={`rounded-full px-4 py-2 text-sm border transition shadow-sm hover:scale-[1.03] active:scale-[0.98] ${
                              active
                                ? "bg-violet-400 text-white border-violet-400 shadow-sm"
                                : "bg-white text-slate-700 border-pink-100 hover:bg-violet-50"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      {customFieldLabels[category.id]}を記入
                    </label>
                    <input
                      value={custom[category.id] || ""}
                      onChange={(event) => updateCustom(category.id, event.target.value)}
                      placeholder={customPlaceholders[category.id] || "カンマ、読点、改行で複数追加できます"}
                      className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-200"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-4 space-y-4">
              <Card className="rounded-[2rem] border-pink-200 shadow-xl bg-white/95 ring-4 ring-violet-100/40">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h2 className="text-lg font-extrabold text-violet-600">完成文</h2>
                    <Button onClick={copyPrompt} size="sm" className="rounded-full bg-violet-400 hover:bg-violet-500">
                      <Copy className="h-4 w-4 mr-1" /> {copyStatus === "copied" ? "コピー済み" : "コピー"}
                    </Button>
                  </div>

                  {copyStatus === "manual" && (
                    <div className="mb-3 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-none" />
                      <span>この表示環境では自動コピーがブロックされました。下の文章を選択済みにしたので、Ctrl+C または長押しコピーしてください。</span>
                    </div>
                  )}

                  {copyStatus === "copied" && (
                    <div className="mb-3 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-3 text-xs text-green-800">
                      <CheckCircle2 className="h-4 w-4 flex-none" />
                      <span>コピーできました。</span>
                    </div>
                  )}

                  <div className="mb-3 text-xs text-slate-500">
                    選択中：{allSelected.length ? allSelected.join(" / ") : "まだ未選択。初期おすすめで作成中。"}
                  </div>

                  <textarea
                    ref={textAreaRef}
                    value={prompt}
                    readOnly
                    className="w-full min-h-[460px] resize-y whitespace-pre-wrap rounded-2xl bg-violet-50/60 border border-pink-100 p-4 text-sm leading-relaxed font-sans outline-none focus:ring-2 focus:ring-violet-200"
                    aria-label="生成されたプロンプト"
                  />
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-pink-200 shadow-md bg-white/85 ring-4 ring-white/40">
                <CardContent className="p-4 text-xs text-slate-600 leading-relaxed">
                  <strong>固定ルール：</strong> 犬の顔・毛色・目・鼻口まわりを最優先で守る文を、どの出力にも自動で入れています。
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-pink-200 shadow-md bg-white/85 ring-4 ring-white/40">
                <CardContent className="p-4 text-xs text-slate-600 leading-relaxed">
                  <div className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                    {allTestsPassed ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    自己チェック
                  </div>
                  <ul className="space-y-1">
                    {tests.map((test) => (
                      <li key={test.name} className="flex items-start gap-2">
                        <span>{test.pass ? "OK" : "NG"}</span>
                        <span>{test.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>      </div>
    </>
  );
}
