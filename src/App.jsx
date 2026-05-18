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
} from "lucide-react";
import "./style.css";

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
    id: "use",
    title: "用途",
    options: ["インスタ投稿", "インスタストーリー", "LINEスタンプ風", "プロフィール画像", "動画生成用の元静止画"],
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
  use: "その他の用途",
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
  use: "例：リール表紙、ストーリー背景、動画生成用サムネイル",
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
  const wallpaper = joinSelected(
    selected,
    custom,
    "wallpaper",
    locationType === "indoor" ? "ピンクのストライプ壁紙、白い腰壁パネル、レースカーテン" : "背景に自然な奥行きのある景色"
  );
  const outfit = joinSelected(selected, custom, "outfit", "可愛いフリル衣装");
  const outfitColor = joinSelected(selected, custom, "outfitColor", "白ピンク系");
  const color = joinSelected(selected, custom, "color", "白ピンクとミルキーカラー");
  const mood = joinSelected(selected, custom, "mood", "ふんわり明るく、透明感のあるメルヘンな雰囲気");
  const pose = joinSelected(selected, custom, "pose", "カメラ目線でちょこんと可愛く座る");
  const use = joinSelected(selected, custom, "use", "インスタ投稿用の可愛い静止画");
  const locationKind = locationType ? locationTree[locationType].label : "屋内または屋外";
  const containerSentence = containerScene
    ? `犬は「${containerScene}」という主役ギミックで表現してください。入れ物や透明素材を使う場合も、犬の顔・目・鼻口まわりが歪んだり隠れたりしないようにしてください。`
    : "";

  return `${identityRule}\n\n${locationKind}の「${location}」で、${items}に囲まれた犬の可愛い静止画。${containerSentence}背景には${wallpaper}を入れて、壁や奥の空間まで可愛く作り込んでください。犬は${outfitColor}の${outfit}を着ています。服は犬の体型に自然に合っていて、顔や目や鼻口まわりを隠さないでください。色合いは${color}。雰囲気は${mood}。犬は${pose}。背景は明るく、やさしい光に包まれていて、可愛いけれど犬の顔を邪魔しない。全体が地味にならないように、レース、リボン、花、スウィーツ、壁飾りを画面内にバランスよく配置し、華やかでごちゃかわいい密度のある一枚にしてください。${use}に向いた、ふんわり上品で夢かわいい一枚にしてください。`;
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
    <div className="page">
      <div className="blob blob-pink" />
      <div className="blob blob-violet" />
      <div className="blob blob-blue" />
      <div className="dots" />

      <div className="container">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="hero">
          <div className="badge">
            <Sparkles size={16} />
            <span>Yuyu Princess World</span>
          </div>
          <h1>ゆゆ姫の夢かわプロンプト工房</h1>
          <p className="subtitle">
            場所はツリー式、小物・服・ポーズはポチポチ選択。白ピンク・藤色・水色のやさしい世界で、犬の顔を守るプロンプトを作ります。
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
                <h2><Heart size={20} /> ゆゆ姫ワールド</h2>
                <button className="outline-button" onClick={reset}>
                  <RefreshCcw size={16} /> リセット
                </button>
              </div>
              <div className="notice">
                <strong>ゆゆ姫ワールドの作り方</strong>
                <span>
                  場所を選んで、小物・服・色・雰囲気を盛るだけ。苺、レース、リボン、パールをたっぷり入れても、犬のお顔だけは最優先で守るプロンプトになります。
                </span>
              </div>
            </section>

            <section className="card">
              <h2><LocationIcon size={20} /> 場所を選ぶ</h2>
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

              <label><PlusCircle size={16} /> その他の場所を記入</label>
              <input
                value={custom.location || ""}
                onChange={(event) => updateCustom("location", event.target.value)}
                placeholder="例：雪景色のお城、星空のバルコニー、苺レースの小部屋"
              />
            </section>

            {multiCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <section key={category.id} className="card">
                  <h2>{CategoryIcon && <CategoryIcon size={20} />} {category.title}</h2>
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
                  <label><PlusCircle size={16} /> {customFieldLabels[category.id]}を記入</label>
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
              <strong>固定ルール：</strong>
              犬の顔・毛色・目・鼻口まわりを最優先で守る文を、どの出力にも自動で入れています。
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
