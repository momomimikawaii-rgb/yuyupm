import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Sparkles, Copy, Heart, RefreshCcw, CheckCircle2, AlertCircle, Home, Trees, PlusCircle, Shirt, Sun } from "lucide-react";
import "./style.css";

const heroImageUrl = "/top.png";

const locationTree = {
  indoor: { label: "屋内", icon: Home, options: ["お姫さまの部屋","可愛いスウィーツ屋さん","アイドルのステージ","海が見える窓辺","庭園が見える窓辺","ベッドルーム","アフタヌーンティーの出来るお洒落カフェ"] },
  outdoor: { label: "屋外", icon: Trees, options: ["苺畑","ぶどう畑","薔薇の庭園","藤の花公園","桜ロード","メルヘンなお庭","色とりどりの花が咲いた公園","和風庭園","イングリッシュガーデン"] },
};

const multiCategories = [
  { id: "items", title: "小物・飾り", options: ["レース","リボン","パール","フリル","苺","フルーツ各種いろいろ","スウィーツ","花かご","カーテン","くまのぬいぐるみ","うさぎのぬいぐるみ"] },
  { id: "containerScene", title: "入れ物・舞台ギミック", options: ["ペットがスノーボールの中に入っている","ペットが大きな透明シャボン玉の中に入っている","ペットがアンティークなティーカップの中に入っている","ペットが可愛いガラスのグラスの中に入っている","ペットが苺のバスケットの中に入っている","ペットが花かごの中に入っている","ペットが大きなプレゼント箱の中に入っている","ペットがレースのベビーベッドに入っている","ペットがマカロン型クッションの上にいる","ペットが小さな馬車の中にいる"] },
  { id: "wallpaper", title: "屋内の壁紙・壁飾り", options: ["ピンクのストライプ壁紙","苺柄の壁紙","薔薇柄の壁紙","小花柄の壁紙","レース模様の壁紙","天使やリボンの絵がある壁紙","額縁入りの可愛い絵","ドライフラワーの壁飾り","リボンガーランド","レースカーテン越しの光","白い腰壁パネル","アンティーク風の飾り棚"] },
  { id: "outfit", title: "服・衣装", icon: Shirt, options: ["夏のフリルワンピース","ごちゃかわロリータワンピース","お姫さまドレス","苺柄ワンピース","レースたっぷりワンピース","アイドル衣装","カフェ店員さん風エプロン","ふわふわケープ","ヘッドドレス付きドレス","リボンたっぷりドレス","クラシカルロリータ","妖精みたいなチュールドレス"] },
{
  id: "headAccessory",
  title: "頭飾り・アクセサリー",
  options: [
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
    "猫耳ヘッドドレス"
  ],
},  { id: "outfitColor", title: "服の色", options: ["白ピンク","ミルキーピンク","藤色","クリームホワイト","淡い水色","苺ミルク色","パウダーピンク","パステルイエロー","白レース多め","ピンク×白フリル","藤色×白フリル","淡いミントグリーン"] },
  { id: "color", title: "全体の色合い", options: ["白ピンク","ミルキーピンク","藤色","クリームホワイト","淡い水色","桜ピンク","パステル虹色","淡い黄色","上品なラベンダーピンク"] },
  { id: "lighting", title: "光・明るさ", icon: Sun, options: ["明るくハイキー","白っぽくふんわり発光","透明感のある明るい光","やさしい昼間の光","夕暮れのやわらかい光","夜景風","月明かり風"] },
  { id: "mood", title: "雰囲気", options: ["ふんわり","透明感","夢かわ","メルヘン","ロリータ風","上品","明るい昼間","やさしい光","高級感","絵本のように可愛い"] },
  { id: "pose", title: "ペットのポーズ・しぐさ", options: ["カメラ目線","ちょこんと座る","小首をかしげる","お花をくんくん","スウィーツを食べる","ケーキを見つめる","窓辺でふんわり","クッションでくつろぐ","前足をそろえる","にっこり笑っているように見える"] },
  { id: "size", title: "画像サイズ", options: ["正方形 1:1","インスタ投稿用 縦長4:5","リール・ストーリー用 縦長9:16","横長16:9"] },
];

const customFieldLabels = {
  location: "その他の場所", items: "その他の小物", containerScene: "その他の入れ物・舞台ギミック", wallpaper: "その他の壁紙・壁飾り",
  outfit: "その他の服・衣装", outfitColor: "その他の服の色", color: "その他の全体色", lighting: "その他の光・明るさ",
  mood: "その他の雰囲気", pose: "その他のポーズ", size: "その他の画像サイズ",
};

const customPlaceholders = {
  items: "例：小さな王冠、ピンクの魔法ステッキ、苺のティアラ",
  containerScene: "例：宝石箱の中に入る、透明な香水瓶の中に入る、苺パフェグラスに入る",
  wallpaper: "例：ピンクの薔薇柄壁紙、額縁の天使画、ドライフラワーのスワッグ",
  outfit: "例：天使のワンピース、春色ロリータ、苺のお姫さまドレス",
  outfitColor: "例：白×藤色、苺ミルクピンク、淡いクリーム色",
  color: "例：白多めのピンク、淡い藤色、ミルキーなパステルカラー",
  lighting: "例：白く明るいスタジオ光、淡い逆光、きらきらした朝の光",
  mood: "例：甘くて上品、絵本みたい、ふわふわキラキラ",
  pose: "例：マカロンを見つめる、前足でカップを持つ、リボンを見上げる",
  size: "例：横長3:2、縦長2:3、ワイドバナー用",
};

const identityRule = "アップロードされたペットの顔・表情・毛色・模様・目の形・鼻と口まわり・耳の位置・毛並み・体格を最優先で保持してください。犬・猫・ハムスターなど、元写真のペットの種類と本人らしさを守り、別の子に変えないでください。可愛く整える場合も、元写真の本人らしさを崩さないことを最重要にしてください。白目やまつ毛など、元写真にない要素は勝手に追加しないでください。";

function splitCustomText(value) {
  if (!value) return [];
  return value.split(/[、,\n]/).map((item) => item.trim()).filter(Boolean);
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

function getSizeInstruction(size) {
  if (size.includes("1:1") || size.includes("正方形")) return "画像サイズは1:1の正方形。";
  if (size.includes("4:5")) return "画像サイズは4:5の縦長。";
  if (size.includes("9:16")) return "画像サイズは9:16の縦長。";
  if (size.includes("16:9")) return "画像サイズは16:9の横長。";
  return size ? `画像サイズは${size}。` : "";
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
  const aspectInstruction = getSizeInstruction(size);
  const locationKind = locationType ? locationTree[locationType].label : "屋内または屋外";
  const containerSentence = containerScene ? `ペットは「${containerScene}」という主役ギミックで表現してください。入れ物や透明素材を使う場合も、ペットの顔・目・鼻口まわりが歪んだり隠れたりしないようにしてください。` : "";
  const brightLock = "黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色調を暗く引きずらないでください。ペット本来の毛色は保ちつつ、背景は選んだ世界観どおり明るく、選択した色合いや世界観を維持してください。";

  return `${identityRule}

${locationKind}の「${location}」で、${items}に囲まれたペットの可愛い静止画。${containerSentence}背景には${wallpaper}を入れて、壁や奥の空間まで可愛く作り込んでください。ペットは${outfitColor}の${outfit}を着ています。服はペットの体型に自然に合っていて、顔や目や鼻口まわりを隠さないでください。色合いは${color}。光や明るさは${lighting}。雰囲気は${mood}。ペットは${pose}。背景は明るく、やさしい光に包まれていて、可愛いけれどペットの顔を邪魔しない。${brightLock}${
  locationType === "indoor"
    ? "全体が地味にならないように、レース、リボン、花、スウィーツ、壁飾りを画面内にバランスよく配置し、華やかでごちゃかわいい密度のある一枚にしてください。"
    : "自然の景色や花畑の美しさを活かしつつ、夢かわいく華やかな世界観にしてください。人工物を増やしすぎず、自然な可愛さを大切にしてください。"
}${aspectInstruction}ふんわり上品で夢かわいい一枚にしてください。`;
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
      return { ...prev, [categoryId]: exists ? current.filter((item) => item !== option) : [...current, option] };
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

  const prompt = useMemo(() => buildPrompt({ locationType, locationOption, selected, custom }), [locationType, locationOption, selected, custom]);

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
    setSelected({});
    setCustom({});
    setCopyStatus("idle");
  };

  const updateCustom = (key, value) => {
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

      <div className="container">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="hero">
          <div className="badge"><Sparkles size={16} /><span>Yuyu Princess World</span></div>
          <h1>ゆゆ姫の夢かわプロンプト工房</h1>
          <p className="subtitle">場所はツリー式、小物・服・ポーズ・画像サイズ・光をポチポチ選択。白ピンク・藤色・水色のやさしい世界で、ペットの顔を守るプロンプトを作ります。</p>
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
                <span>場所を選んで、小物・服・色・雰囲気を盛るだけ。苺、レース、リボン、パールをたっぷり入れても、ペットのお顔だけは最優先で守るプロンプトになります。黒い子・濃い茶色の子・グレー系の子は、背景まで暗く引っ張られやすいので「明るくハイキー」系の光設定推奨です。</span>
              </div>
            </section>
<section className="card">
  <div className="card-head">
    <h2>🌸 ゆゆ姫5月のおすすめ</h2>
  </div>

  <div
    style={{
      display: "flex",
      gap: "16px",
      alignItems: "center",
      flexWrap: "wrap",
    }}
  >
    <img
      src="/ajisai-road.png"
      alt="雨の日のあじさいロード"
      style={{
        width: "140px",
        borderRadius: "20px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
      onClick={() => window.open("/ajisai-road.png", "_blank")}
    />

    <div style={{ flex: 1 }}>
      <h3 style={{ marginBottom: "8px" }}>
        雨の日のあじさいロード
      </h3>

      <p style={{ marginBottom: "12px" }}>
        あじさい・お天気雨・虹・フリル傘の、
        透明感たっぷりな夢かわ世界。
      </p>

      <button
        className="main-button"
        onClick={() => {
         navigator.clipboard.writeText(`アップロードされたペットの顔・表情・毛色・模様・目の形・鼻と口まわり・耳の位置・毛並み・体格を最優先で保持してください。犬・猫・ハムスターなど、元写真のペットの種類と本人らしさを守り、別の子に変えないでください。可愛く整える場合も、元写真の本人らしさを崩さないことを最重要にしてください。白目やまつ毛など、元写真にない要素は追加しないでください。

屋外の「雨の日のあじさいロード」で、たくさんのあじさい（桜ピンク、藤色、水色）に囲まれたペットの可愛い静止画。少なめの小さな水玉（ピンク・水色・藤色）が入った、フリル付きの白い可愛い傘をペットが持っています。

背景には、奥まで続くあじさいロード、美しい雨粒、お天気雨の透明感、淡い虹を入れてください。晴れているのに雨が降っているような、明るく幻想的な雰囲気。雨の日でも暗くせず、透明感のあるハイキーな明るさを維持してください。

ペットは、花型ポケットの付いた可愛いフリル付きのピンクのレインコートを着ています。右耳の下には可愛いピンクの細長いフリル付きリボンをつけています。服はペットの体型に自然に合っていて、顔や鼻口まわりを隠さないでください。

色合いは桜ピンクを中心に、藤色・淡い水色を組み合わせ、少量の白や淡い黄色のあじさいも配置してください。

雰囲気は、透明感、絵本のような可愛さ、やさしい光、夢かわいい世界観。自然の景色を活かしつつ、華やかだけど自然な可愛さを大切にしてください。

黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色味を暗く引きずらないでください。ペット本来の毛色を保ちつつ、背景は明るく、選択した世界観どおりのやさしい色合いを維持してください。

ペットは小首をかしげながら、傘を持ってこちらを見ています。画像サイズは4:5の縦長。ふんわり上品で夢かわいい一枚にしてください。`);
          alert("おすすめプロンプトをコピーしました🌸");
        }}
      >
        このおすすめをコピー
      </button>
    </div>
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

              <div className="chips">
                {locationTree[locationType].options.map((option) => {
                  const active = locationOption === option && !custom.location;
                  return <button key={option} onClick={() => { setLocationOption(option); setCustom((prev) => ({ ...prev, location: "" })); }} className={`chip ${active ? "active" : ""}`}>{option}</button>;
                })}
              </div>

              <label><PlusCircle size={16} /> その他の場所を記入</label>
              <input value={custom.location || ""} onChange={(event) => updateCustom("location", event.target.value)} placeholder="例：雪景色のお城、星空のバルコニー、苺レースの小部屋" />
            </section>

            {multiCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <section key={category.id} className="card">
                  <h2>{CategoryIcon && <CategoryIcon size={20} />} {category.title}</h2>
                  <div className="chips">
                    {category.options.map((option) => {
                      const active = selected[category.id]?.includes(option);
                      return <button key={option} onClick={() => toggleOption(category.id, option)} className={`chip ${active ? "active" : ""}`}>{option}</button>;
                    })}
                  </div>

{category.id === "lighting" && (
  <div className="mb-4 rounded-2xl border border-pink-200 bg-pink-50 p-3 text-xs leading-relaxed text-slate-700">
    黒い子・濃い茶色の子・グレー系の子は、
    背景や全体の色味まで暗く引っ張られやすいです。
    夢かわ・白ピンク系にしたい場合は、
    「明るくハイキー」「白っぽくふんわり発光」推奨です。
  </div>
)}

<label><PlusCircle size={16} /> {customFieldLabels[category.id]}を記入</label>
                  <input value={custom[category.id] || ""} onChange={(event) => updateCustom(category.id, event.target.value)} placeholder={customPlaceholders[category.id] || "カンマ、読点、改行で複数追加できます"} />
                </section>
              );
            })}
          </div>

          <div className="right">
            <section className="card result-card">
              <div className="card-head">
                <h2>完成文</h2>
                <button className="main-button" onClick={copyPrompt}><Copy size={16} /> {copyStatus === "copied" ? "コピー済み" : "コピー"}</button>
              </div>

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
