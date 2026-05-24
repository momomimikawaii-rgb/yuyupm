import React,{useMemo,useState}from"react";
import{createRoot}from"react-dom/client";
import{Sparkles,Copy,CheckCircle2,AlertCircle,Globe2,Waves,Film,Train,PawPrint,Info,Shirt,Heart,Image as ImageIcon,Link as LinkIcon,X}from"lucide-react";
import"./style.css";

const sisterSiteUrl="https://yuyupm.vercel.app/";
const identity=`アップロードされたペットの顔・表情・毛色・模様・目の形・鼻と口まわり・耳の位置・毛並み・体格を最優先で保持してください。
犬・猫・ハムスターなど、元写真のペットの種類と本人らしさを守り、別の子に変えないでください。
可愛く整える場合も、元写真の本人らしさを崩さないことを最重要にしてください。
白目・まつ毛・別の口元・別犬風の丸顔など、元写真にない要素は勝手に追加しないでください。`;
const dream=`現実そのままではなく、夢の中のように美しく理想化された風景にしてください。
雑多な現実感、生活感、汚れ、暗さ、混雑、観光客、不要な看板、古びた質感は避けてください。
ペットが本来入れない場所でも、夢の世界として自然に存在しているようにしてください。
ペットの顔が主役としてはっきり見える構図にしてください。
背景や小物を盛りすぎて、ペット本人が埋もれないようにしてください。`;
const travelRule=`旅行カテゴリは「夢の観光ポスター構図」で作ってください。
場所らしさが分かる背景量と、ペットの顔がちゃんと見える距離の両方を優先してください。
近すぎてただの壁や階段にならず、遠すぎてペットが豆粒にならないようにしてください。
現実の建物配置を完全再現する必要はありません。色合い・建物の特徴・空気感は守りつつ、ペットが一番可愛く見えるように夢世界として再構成してください。`;
const darkRule=`黒い子・濃い茶色の子・グレー系の子でも、背景や全体の色調を暗く引きずらないでください。
ペット本来の毛色は保ちつつ、背景は選んだ世界観どおり明るく、透明感と清潔感のある色合いを維持してください。`;
const movieRule=`映画ポスター風カテゴリでは、アップロードされたペット写真は顔・毛色・模様・耳・目・鼻・口元・表情・毛並みの参考としてのみ使用してください。
元写真の体型、ポーズ、四足姿勢はコピーしないでください。
体は固定された可愛いマスコット人形風の直立ボディにしてください。腰を後ろに突き出した姿勢、犬同士が不自然に密着する姿勢は禁止です。
実在映画のロゴやタイトルは再現せず、架空タイトルとして扱ってください。`;
const animalRule=`一緒にいる動物たちはリアル寄りの質感を保ちながらも、夢の世界のように理想化された美しい姿で表現してください。
汚れ・泥・黄ばみ・濡れて束になった毛・野生の荒々しさ・獣臭さは不要です。
猛獣や大型動物も怖くせず、清潔で優しく、ぬいぐるみのような愛らしさを少し加えてください。
キリン・馬・シマウマ・象などは、首や脚を長くしすぎず、丸く可愛いぬいぐるみ寄りの体型にしてください。`;
const kigurumiRule=`きぐるみを選んだ場合、首から下は完全に丸いぬいぐるみ体型にしてください。
元写真の体型・ポーズ・4本脚姿勢は参照しすぎず、ころころした赤ちゃんぬいぐるみのように、丸い胴体、短い手足、やわらかいシルエットにしてください。
手先・足先まで全部きぐるみで覆い、元の手足や肉球や足先を出さないでください。
理想は、ぬいぐるみの顔部分だけをくり抜いて、そこからペット本人の顔だけが見えている状態です。
きぐるみの毛質は、安っぽい化繊・スポンジ・舞台衣装・ビニール感ではなく、高級感のあるふわふわのフェイクファー、抱きしめたくなるベビーぬいぐるみの質感にしてください。`;

const C=[
{id:"travel",label:"夢の世界旅行",icon:Globe2,desc:"有名観光地を、うちの子が行ける理想化された夢の観光ポスター構図にします。",tpl:[
["mykonos","ミコノス島風","白い階段、真っ白な建物、濃い青い丸屋根、青いドア、ターコイズブルーの海が見える理想化されたミコノス島風。禿山や茶色い岩山、雑多な観光地感は目立たせない。カメラは白い階段の奥行きと海が両方見え、ペットの顔も見える前景〜中景の夢の観光ポスター構図。"],
["mont","モンサンミッシェル風","海に浮かぶ修道院のような壮大な建築を、やわらかな光と幻想的な空気で表現。ペットは手前の石畳や水辺側に配置し、遠景に建築全体が分かる夢の観光ポスター構図。"],
["venice","ベネチア風","運河、ゴンドラ、クラシカルな建物、きらめく水面のベネチア風。ペットは前景の橋やゴンドラ横に配置し、運河の奥行きと街並みが分かる構図。"],
["kyoto","京都風","石畳、和の建築、庭園、桜や紅葉など、上品で静かな京都風。混雑を避け、奥行きある参道や庭を背景に、ペットの顔が見える前景〜中景構図。"],
["paris","パリ風","エッフェル塔やクラシカルな街灯、上品なカフェ通りを思わせる夢のパリ風。観光客や車は減らし、遠景に塔や街並みが分かり、ペットは前景で可愛く映る観光ポスター構図。"],
["london","ロンドン風","赤い電話ボックス、クラシカルな街並み、ビッグベン風の時計塔、明るく上品なロンドン風。ペットは前景、街の記号が背景に入る構図。"],
["alsace","アルザス風","木組みの家、花いっぱいの窓辺、石畳の小道が続くアルザス風。家並みの奥行きが分かる中景構図で、ペットを前景に置く。"],
["petite","ラ・プチ・ヴェニス風","運河、花飾り、カラフルで可愛い家並みのラ・プチ・ヴェニス風。運河を横方向に見せ、ペットは橋やテラス側の前景に配置する。"],
["romantic","ロマンチック街道風","石畳、絵本のような中世ヨーロッパの街並み、可愛い塔や木組みの家が続くロマンチック街道風。ローアングル気味で奥行きを出し、ペットを旅の主役にする。"],
["castle","ノイシュバンシュタイン城風","白く美しいおとぎ話のお城、山や森を理想化した明るい景色。城は遠景で形が分かるようにし、ペットは前景の草地や小道に配置する。"],
["taj","タージマハル風","白大理石の壮麗な建築と水面反射を持つタージマハル風。左右対称の美しい構図を保ち、ペットは前景中央寄りで顔が見えるサイズにする。"],
["bali","バリ島寺院風","湖や水辺に浮かぶ美しいバリ島寺院風。暗い湿気や古びた感じは避け、神秘的で清潔感ある夢の南国寺院にする。"],
["uyuni","ウユニ塩湖風","鏡のような水面に空が映るウユニ塩湖風。超広角の美しい空と反射を見せつつ、ペットは前景で顔が見えるサイズにする。"],
["aurora","オーロラの国風","美しいオーロラと雪景色の夢の北国。夜でもペットの顔は明るく、透明感のある幻想的な世界にする。"],
["burano","ブラーノ島風","カラフルな家並みと運河が美しいブラーノ島風。少し離れた運河沿い構図で、家並みの色の連なりが分かるようにし、ペットは前景寄りに配置する。"],
["guanajuato","グアナファト風","丘に広がるカラフルな街並みのグアナファト風。高台から少し見下ろす構図で街全体の色が分かるようにし、ペットは手前のテラスや石畳に配置する。"],
["cordoba","コルドバのパティオ風","白壁の中庭、アーチ、壁一面の鉢花、石畳が美しいコルドバのパティオ風。ペットは前景〜中景に配置し、中庭の入口アーチと壁いっぱいの鉢花が分かる構図。"],
["custom","自由記入の場所","ユーザーが指定した場所を、夢の観光ポスター構図で理想化してください。場所以外のギミック・ポーズ・服装指定は無視してください。"]
]},
{id:"summer",label:"夏・海・水中",icon:Waves,desc:"海、花火、水中、川遊び、浮き輪、スイカ、アイスなどの明るい夏。",tpl:[
["beach","夢のビーチリゾート","白い砂浜、透明なターコイズブルーの海、青空、きらめく陽射し。清潔感のある理想化された夏の海。"],
["fireworks","夏の花火","美しい夏の夜空に大きな花火が広がる幻想的な風景。夜でもペットの顔は暗くならず、花火とペットを主役にする。"],
["underwater","水中世界","透明な海、熱帯魚、サンゴ礁、きらめく水面の光。明るく幻想的でペットが自然に存在できる海の夢世界。"],
["river","川遊び","澄んだ川の浅瀬で、水しぶきをあげながら可愛く遊んでいる夏の風景。泥っぽさや危険な流れは避ける。"]
]},
{id:"vehicle",label:"乗り物系",icon:Train,desc:"ペットサイズの絵本みたいな夢の乗り物。",tpl:[
["sl","おもちゃのSL","ペットサイズの可愛いおもちゃのSL機関車。絵本の中のようなミニチュア感のある乗り物。"],
["retro_airplane","レトロ飛行機","ペットサイズの可愛いレトロ飛行機。青空の中を旅しているような明るく楽しい冒険感。"],
["balloon","気球","ペットが可愛い気球に乗って空を旅している夢のような風景。"],
["sidecar","サイドカー","可愛いレトロなサイドカーにペットが乗っている構図。"],
["flying_bike","未来の空飛ぶバイク","未来の空飛ぶバイクにペットが乗る、明るく可愛いSFファンタジー。"],
["flying_car","未来の空飛ぶ車","未来の空飛ぶ車にペットが乗る、夢の都市や空を旅する可愛いSF風。"],
["race_cart","おもちゃのレースカート","実在作品には似せず、カラフルで可愛いおもちゃのレースカートに乗る楽しい構図。"],
["cloud_car","雲の上を走る小さな車","ふわふわの雲の上を小さな可愛い車で走る夢のドライブ。"],
["space_car","宇宙船風ミニカー","宇宙船のような丸いミニカーに乗って星空を旅する、怖くない可愛い宇宙冒険。"]
]},
{id:"movie",label:"映画ポスター風",icon:Film,desc:"構図・服・体型固定。顔と毛色だけ本人化する特殊テンプレ。",tpl:[
["ship","豪華客船ロマンス風","豪華客船を舞台にしたロマンス映画ポスター風。夕焼け、海、ドラマチックな空、船首を思わせる構図。"],
["nanny","空飛ぶ魔法の乳母さん風","傘でふわっと空から降りてくる、クラシカルで楽しい魔法の乳母さん風ポスター。実在作品やキャラクターには似せない。"],
["planet","ペットの惑星風","遠い惑星を舞台に、ペットたちが主役になった壮大なSF映画ポスター風。"],
["street","下町ミュージカル風","夜の下町で仲間と踊るミュージカル映画ポスター風。街灯、レンガ、ダンスの躍動感。"],
["princess","おとぎ話プリンセス風","魔法の森、古城、光の粒、ロマンチックで夢のようなおとぎ話プリンセス映画ポスター風。"],
["magic","魔法学校ファンタジー風","古い城、魔法の光、ローブ風衣装、冒険の始まりを感じる魔法学校ファンタジー映画ポスター風。"],
["pirate","海賊冒険映画風","大きな船、宝箱、海、冒険感のある可愛い海賊冒険映画ポスター風。"],
["space","宇宙SF映画風","星空、宇宙船、光る惑星を背景にした壮大だけど可愛い宇宙SF映画ポスター風。"],
["detective","探偵ミステリー風","霧の街、街灯、虫眼鏡、クラシカルな探偵映画ポスター風。怖すぎず上品に。"],
["western","西部劇ポスター風","夕焼けの荒野、木造の街並み、帽子と旅の雰囲気の西部劇ポスター風。危険な銃や暴力表現は避ける。"],
["theater","ミュージカル劇場風","舞台照明、幕、華やかなショー感のあるミュージカル劇場ポスター風。"]
]},
{id:"animal",label:"動物さんと一緒",icon:PawPrint,desc:"好きな動物さんと一緒。色選択や自由記入もできます。",tpl:[["animal","動物さんと一緒","選んだ動物さんと仲良く一緒にいる、夢のように可愛い動物フォト。"]]},
{id:"infographic",label:"うちの子インフォグラフィック",icon:Info,desc:"希少動物図鑑風の本格インフォグラフィックを作ります。",tpl:[["rare","希少動物図鑑風","アップロードされたペットを、世界に一匹だけの希少動物として紹介する、本格的で可愛いインフォグラフィック風フォト。"]]}
].map(c=>({...c,tpl:c.tpl.map(t=>({id:t[0],label:t[1],prompt:t[2]}))}));

const rec=[
{title:"ゆゆママのお勧め：夢のミコノス島フォト",image:"/mykonos.png",categoryId:"travel",templateId:"mykonos",text:"白と青とターコイズの海を、現実より綺麗な夢のリゾートに。"},
{title:"ゆゆママのお勧め：豪華客船ロマンス風",image:"/titanic.png",categoryId:"movie",templateId:"ship",text:"構図・体型・衣装は固定。顔と毛色だけ本人化する映画ポスター風。"}
];

const travelColors=[
["yuyu","ゆゆママおすすめ","白壁、コバルトブルーの鉢、ピンクの花を多めにした可愛い配色。"],
["colorful","カラフル華やか","白壁に、色々な鉢と赤・ピンク・紫・黄色の花を華やかに飾る。"],
["chic","上品シック","白壁、黒い鉄格子、深緑、赤い花少なめの上品で落ち着いた配色。"],
["blue","爽やかブルー","白壁、青鉢多め、白・水色・淡ピンクの花を使った爽やかな配色。"]
].map(x=>({id:x[0],label:x[1],prompt:x[2]}));

const outfitSet={
travel:[["keep","なし（元写真のまま）","服は新しく追加せず、元写真の服や自然な姿を維持してください。"],["auto","おまかせ","旅行先に似合う服を自然に合わせてください。"],["retro","レトロ旅行服","昔の旅行ポスターのようなレトロで可愛い旅行服を着せてください。"],["furisode","振袖着物（友禅）","華やかな友禅柄の振袖着物を着せてください。"],["taisho","大正ロマン風着物","大正ロマン風の上品で可愛い着物を着せてください。"]],
summer:[["keep","なし（元写真のまま）","服は新しく追加せず、元写真の服や自然な姿を維持してください。"],["auto","おまかせ","夏の世界観に似合う服を自然に合わせてください。"],["frill","フリル水着","フリル付きの可愛いペット用水着を着せてください。"],["marine","マリン風水着","白と青を基調にした爽やかなマリン風水着を着せてください。"],["yukata","浴衣","夏祭りに似合う可愛い浴衣を着せてください。"],["heko","兵児帯つき浴衣","ふんわりした兵児帯つきの可愛い浴衣を着せてください。"]],
vehicle:[["keep","なし（元写真のまま）","服は新しく追加せず、元写真の服や自然な姿を維持してください。"],["auto","おまかせ","乗り物に似合う服を自然に合わせてください。"],["retro","レトロ旅行服","昔の旅行ポスターのようなレトロで可愛い旅行服を着せてください。"],["pilot","パイロット風","ゴーグルや帽子を合わせた可愛いパイロット風衣装にしてください。"]],
animal:[["kauto","おまかせ（きぐるみ）","選んだ動物に合わせた可愛いきぐるみ姿にしてください。","k"],["keep","なし（元写真のまま）","服は新しく追加せず、元写真の服や自然な姿を維持してください。"],["kigurumi","きぐるみ","選んだ動物モチーフの可愛いきぐるみ姿にしてください。","k"]]
};
Object.keys(outfitSet).forEach(k=>outfitSet[k]=outfitSet[k].map(x=>({id:x[0],label:x[1],prompt:x[2],kigurumi:x[3]==="k"})));
const commonOutfits=[["keep","なし（元写真のまま）","服は新しく追加せず、元写真の服や自然な姿を維持してください。"],["auto","おまかせ","選んだ世界観に似合う服を自然に合わせてください。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const acc=[["ribbon","リボン","可愛いリボンをつけてください。"],["frill","フリル帽","可愛いフリル帽をつけてください。"],["straw","麦わら帽子","夏らしい麦わら帽子をつけてください。"],["flower","花飾り","小さな花飾りを自然につけてください。"],["neck","首飾り","可愛い首飾りをつけてください。"],["pearl","パール","上品なパールアクセサリーをつけてください。"],["goggles","ゴーグル","乗り物や冒険に似合う可愛いゴーグルをつけてください。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const shoes=[["keep","なし（元写真のまま）","靴は追加せず、元写真の足元を維持してください。"],["auto","おまかせ","世界観に合う靴や足元にしてください。"],["sandals","サンダル","可愛いサンダルを履かせてください。"],["boots","ブーツ","可愛いブーツを履かせてください。"],["ballet","バレエシューズ","上品で可愛いバレエシューズを履かせてください。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const colors=[["auto","おまかせ","服セットの色合いは世界観に合わせておまかせにしてください。"],["pink","ピンク系","服セットの色合いはピンク系でまとめてください。"],["blue","水色系","服セットの色合いは水色系でまとめてください。"],["white","白系","服セットの色合いは白系でまとめてください。"],["lavender","ラベンダー系","服セットの色合いはラベンダー系でまとめてください。"],["mint","ミント系","服セットの色合いはミント系でまとめてください。"],["red","赤系","服セットの色合いは赤系でまとめてください。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const light=[["auto","おまかせ","選んだ世界観に一番似合う光へ自動調整してください。"],["day","明るい昼","明るい昼の自然光で、全体を晴れやかに見せてください。"],["sunset","夕方","美しい夕方の光で、暗くなりすぎず、温かく幻想的にしてください。"],["night","夜でも顔明るく","夜景や暗い場面でも、ペットの顔はやわらかく明るく見えるようにしてください。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const under=[["none","なし",""],["turtle","亀の上","大きな海亀の背中に優しく乗っています。夢のような海中冒険の雰囲気にしてください。","water_ski"],["shell","貝の上","真珠のように美しく輝く大きな貝の上に乗っています。","water_ski,watermelon_split"],["bottle","瓶の中","透明感のある幻想的なガラス瓶の中にいます。","water_ski,watermelon_split"],["float","浮き輪","可愛い浮き輪に乗って、透明な海にぷかぷか浮かんでいます。"],["dolphin","イルカの上","優しいイルカの背中に乗って、夢のような海を進んでいます。","water_ski"],["orca","オルカの上","優しいオルカの背中に乗って、迫力はありつつも怖くない夢の海にしてください。","water_ski"]].map(x=>({id:x[0],label:x[1],prompt:x[2],block:x[3]?.split(",")||[]}));
const summerG=[["none","なし",""],["watermelon_split","スイカ割り","砂浜で可愛くスイカ割りをしている夏らしい場面にしてください。"],["watermelon","スイカを食べる","大きなスイカを嬉しそうに食べている、夏らしく可愛い場面にしてください。"],["ice","ソーダアイス","夏らしい水色のソーダアイスを嬉しそうに食べています。"],["water_ski","水上スキー","透明な海の上で可愛く水上スキーをしています。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const vibes=[["clear","透明感","透明感のある澄んだ仕上がり。"],["dreamy","夢のよう","夢の中のように幻想的で美しい雰囲気。"],["bright","明るい","明るく晴れやかな雰囲気。"],["clean","清潔感","汚れや生活感のない清潔で美しい仕上がり。"],["storybook","絵本感","絵本の中のような優しい世界観。"]].map(x=>({id:x[0],label:x[1],prompt:x[2]}));
const animals=["あひる","アライグマ","アルパカ","うさぎ|白,茶,黒","ウォンバット","馬","オカメインコ|白,並","鴨","カピバラ","キリン","くま|白,茶,黒","コアラ","ゴリラ","鹿","シマウマ","白鳥","セキセイインコ|黄緑,水色,黄色,白","象","チーター","虎","恐竜|ティラノ,トリケラ,ブラキオ,ステゴ","パンダ","ハシビロコウ","ハリネズミ","豹|黄,黒","羊","ミーアキャット","ヤギ","ライオン","レッサーパンダ"].map((s,i)=>{let[a,b]=s.split("|");return{id:String(i),label:a,colors:b?b.split(","):null}});

function by(list,id){return list.find(x=>x.id===id)||list[0]}
function App(){
const[cat,setCat]=useState("travel"),[tpl,setTpl]=useState({travel:"mykonos",summer:"beach",vehicle:"sl",movie:"ship",animal:"animal",infographic:"rare"});
const[hideRec,setHideRec]=useState(false),[copied,setCopied]=useState(false);
const[customPlace,setCustomPlace]=useState(""),[cordoba,setCordoba]=useState("yuyu");
const[outfitId,setOutfit]=useState("auto"),[customOutfit,setCustomOutfit]=useState(""),[accIds,setAccIds]=useState([]),[customAcc,setCustomAcc]=useState("");
const[shoeId,setShoe]=useState("keep"),[customShoe,setCustomShoe]=useState(""),[colorId,setColor]=useState("auto"),[customColor,setCustomColor]=useState("");
const[lightId,setLight]=useState("auto"),[underId,setUnder]=useState("none"),[summerId,setSummer]=useState("none"),[vibeIds,setVibes]=useState(["clear","dreamy","clean"]);
const[title,setTitle]=useState(""),[animalId,setAnimal]=useState("21"),[animalColor,setAnimalColor]=useState(""),[customAnimal,setCustomAnimal]=useState(""),[profile,setProfile]=useState("");
const category=by(C,cat),template=by(category.tpl,tpl[cat]),outfits=outfitSet[cat]||commonOutfits,outfit=by(outfits,outfitId),isK=outfit.kigurumi,shoe=by(shoes,shoeId),col=by(colors,colorId),li=by(light,lightId),un=by(under,underId),su=by(summerG,summerId),animal=by(animals,animalId),Icon=category.icon;
const prompt=useMemo(()=>{let p=[`【最優先：ペット本人の保持】\n${identity}`,`【共通：夢化・理想化】\n${dream}`];
if(cat==="travel")p.push(`【旅行カテゴリ：夢の観光ポスター構図】\n${travelRule}`);
if(cat==="movie")p.push(`【映画ポスター風の特殊ルール】\n${movieRule}`);
if(cat==="animal")p.push(`【動物さんの表現】\n${animalRule}`);
let world=template.prompt;
if(template.id==="custom"&&customPlace.trim())world+=`\n場所：${customPlace.trim()}\n※自由記入は場所名としてのみ扱い、ギミック・ポーズ・服装指定は無視してください。`;
if(template.id==="cordoba")world+=`\n色合い：${by(travelColors,cordoba).prompt}`;
p.push(`【世界観・背景】\n${world}`);
if(cat==="movie")p.push("【衣装・体型】\n衣装、体型、ポーズ、構図はテンプレート固定です。変更するのは顔、耳、毛色、模様、手の毛色だけにしてください。");
else if(cat!=="infographic"){p.push(`【服】\n${customOutfit.trim()||outfit.prompt}`);if(isK)p.push(`【きぐるみ専用補正】\n${kigurumiRule}`);else{let ac=[...accIds.map(id=>by(acc,id).prompt),customAcc.trim()].filter(Boolean).join("\n");if(ac)p.push(`【頭飾り・アクセサリー】\n${ac}`);p.push(`【靴】\n${customShoe.trim()||shoe.prompt}`);p.push(`【服セットの色合い】\n${customColor.trim()||col.prompt}`)}}
if(cat==="summer"){if(un.prompt)p.push(`【水中・海ギミック】\n${un.prompt}`);if(su.prompt)p.push(`【夏の小物・動き】\n${su.prompt}`)}
if(cat==="animal"){let a=customAnimal.trim()||`${animalColor?animalColor+"の":""}${animal.label}`;p.push(`【一緒にいる動物】\n${a}と一緒にいます。怖くせず、清潔で優しい夢の動物さんとして表現してください。`)}
if(cat==="infographic")p.push(`【インフォグラフィック情報】\n${profile.trim()||"名前、性格、好きなもの、苦手なもの、よく目撃される時間、よく目撃される場所、食性、チャームポイント、豆知識などを、飼い主から聞いた情報として整理してください。学名風の名前はAIがその子らしく可愛く自動で作ってください。"}\n希少動物図鑑風に、入力された情報を自然に言い換えてください。例：「よく散歩に行く時間」は「よく目撃される時間」のように表現してください。文字は大きく読みやすく、情報量は本格的に、でもごちゃつきすぎないようにしてください。`);
p.push(`【光・明るさ】\n${li.prompt}`);
p.push(`【雰囲気】\n${vibeIds.map(id=>by(vibes,id).prompt).join("\n")}\n${darkRule}`);
if(cat==="movie"&&title.trim())p.push(`【架空タイトル】\n「${title.trim()}」\n短く大きく読みやすく配置してください。実在映画ロゴや実在ブランド風の完全再現は避けてください。`);
p.push("【仕上げ】\n高品質、可愛いペットポートレート、清潔感、透明感、理想化された夢の世界。");
return p.join("\n\n")},[cat,template,customPlace,cordoba,outfit,customOutfit,accIds,customAcc,shoe,customShoe,col,customColor,isK,un,su,animal,animalColor,customAnimal,profile,li,vibeIds,title]);
const copy=async()=>{await navigator.clipboard.writeText(prompt);setCopied(true);setTimeout(()=>setCopied(false),1400)};
const selectRec=async(r)=>{setCat(r.categoryId);setTpl(cur=>({...cur,[r.categoryId]:r.templateId}));await navigator.clipboard.writeText(prompt);setCopied(true);setTimeout(()=>setCopied(false),1400)};
const changeCat=id=>{setCat(id);let list=outfitSet[id]||commonOutfits;setOutfit(list[0].id==="keep"?"auto":list[0].id)};
const toggleV=id=>setVibes(cur=>cur.includes(id)?cur.filter(x=>x!==id):cur.length>=3?cur:[...cur,id]);
const toggleA=id=>setAccIds(cur=>cur.includes(id)?cur.filter(x=>x!==id):[...cur,id]);
let blocked=un.block||[];
return <main className="page"><div className="blob blob-pink"/><div className="blob blob-violet"/><div className="blob blob-blue"/><div className="dots"/><div className="container">
<header className="hero"><div className="badge"><Sparkles size={18}/>Yuyu Mama Dream Prompt Studio</div><h1>ゆゆママの夢プロンプト工房（汎用版）</h1><p className="subtitle">うちの子を主役に、世界旅行・夏の海・乗り物・映画ポスター風など、夢のように美しい画像プロンプトを作る工房です。</p><div className="hero-image"><img src="/top.png" alt="top"/></div><a className="sister-link" href={sisterSiteUrl} target="_blank" rel="noreferrer"><LinkIcon size={16}/>姉妹サイト：ゆゆ姫の夢かわプロンプト工房はこちら</a></header>
{!hideRec&&<section className="card recommend-card"><div className="card-head"><h2><Sparkles size={19}/>ゆゆママのお勧め</h2><button className="outline-button" onClick={()=>setHideRec(true)}><X size={16}/>閉じる</button></div><div className="recommend-grid">{rec.map(r=><article className="recommend-item" key={r.title}><img src={r.image}/><div><strong>{r.title}</strong><small>{r.text}</small><button className="main-button mini" onClick={()=>selectRec(r)}>このおすすめを使う</button></div></article>)}</div></section>}
<div className="grid"><section className="left"><div className="notice"><strong>この工房の方針</strong><span>清潔感・透明感・夢感を大切にした「うちの子の理想世界」を作ります。</span></div>
<section className="card"><h2><Sparkles size={19}/>1. ジャンルを選択</h2><div className="choice-grid">{C.map(c=>{let I=c.icon;return <button className={`big-choice ${cat===c.id?"active-soft":""}`} onClick={()=>changeCat(c.id)} key={c.id}><strong><I size={18}/>{c.label}</strong><span>{c.desc}</span></button>})}</div></section>
<section className="card"><h2><Icon size={19}/>2. テンプレを選択</h2><div className="chips">{category.tpl.map(t=><button key={t.id} className={`chip ${template.id===t.id?"active":""}`} onClick={()=>setTpl(cur=>({...cur,[cat]:t.id}))}>{t.label}</button>)}</div>{template.id==="custom"&&<><label>自由記入欄</label><p className="selected">※場所のみ記入してください。ギミック・ポーズ・服装指定などは無視されます。</p><input value={customPlace} onChange={e=>setCustomPlace(e.target.value)} placeholder="例：フィレンツェ、ドバイ、モロッコの青い街"/></>}{template.id==="cordoba"&&<><label>パティオの色合い</label><div className="chips">{travelColors.map(x=><button className={`chip ${cordoba===x.id?"active":""}`} onClick={()=>setCordoba(x.id)} key={x.id}>{x.label}</button>)}</div></>}</section>
{cat!=="movie"&&cat!=="infographic"&&<section className="card"><h2><Shirt size={19}/>3. 服</h2><p className="selected">自由入力欄に書いた場合、服の選択肢は無効になります。「なし」は裸ではなく元写真のままです。</p><div className="chips">{outfits.map(o=><button disabled={!!customOutfit.trim()} className={`chip ${outfit.id===o.id?"active":""}`} onClick={()=>setOutfit(o.id)} key={o.id}>{o.label}</button>)}</div><label>服の自由記入</label><input value={customOutfit} onChange={e=>setCustomOutfit(e.target.value)} placeholder="例：水色チェックのフリルワンピース"/>
{!isK&&<><h2>4. 頭飾り・アクセサリー</h2><p className="selected">複数選択OK。自由記入も同時に反映されます。</p><div className="chips">{acc.map(a=><button className={`chip ${accIds.includes(a.id)?"active":""}`} onClick={()=>toggleA(a.id)} key={a.id}>{a.label}</button>)}</div><label>自由記入</label><input value={customAcc} onChange={e=>setCustomAcc(e.target.value)} placeholder="例：小さなブレスレット、首元の花飾り"/><h2>5. 靴</h2><div className="chips">{shoes.map(s=><button disabled={!!customShoe.trim()} className={`chip ${shoe.id===s.id?"active":""}`} onClick={()=>setShoe(s.id)} key={s.id}>{s.label}</button>)}</div><label>靴の自由記入</label><input value={customShoe} onChange={e=>setCustomShoe(e.target.value)} placeholder="例：白い小さなサンダル"/><h2>6. 服セットの色合い</h2><div className="chips">{colors.map(c=><button disabled={!!customColor.trim()} className={`chip ${col.id===c.id?"active":""}`} onClick={()=>setColor(c.id)} key={c.id}>{c.label}</button>)}</div><label>色合い自由記入</label><input value={customColor} onChange={e=>setCustomColor(e.target.value)} placeholder="例：白とティファニーブルー"/></>}</section>}
{cat==="movie"&&<section className="card"><h2><Film size={19}/>3. 架空タイトル</h2><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="例：白雪ゆゆ姫"/></section>}
{cat==="summer"&&<section className="card"><h2><Waves size={19}/>7. 夏・水中ギミック</h2><label>水中・海ギミック</label><div className="chips">{under.map(u=><button className={`chip ${un.id===u.id?"active":""}`} onClick={()=>{setUnder(u.id);if((u.block||[]).includes(summerId))setSummer("none")}} key={u.id}>{u.label}</button>)}</div><label>夏の小物・動き</label><div className="chips">{summerG.map(g=><button disabled={blocked.includes(g.id)} className={`chip ${su.id===g.id?"active":""}`} onClick={()=>setSummer(g.id)} key={g.id}>{g.label}</button>)}</div></section>}
{cat==="animal"&&<section className="card"><h2><PawPrint size={19}/>7. 動物を選択</h2><div className="animal-list">{animals.map(a=><div className="animal-row" key={a.id}><button className={`animal-name ${animal.id===a.id?"active":""}`} onClick={()=>{setAnimal(a.id);setAnimalColor(a.colors?.[0]||"")}}>{a.label}</button>{a.colors&&<span>{a.colors.map(co=><label className="radio-inline" key={co}><input type="radio" checked={animal.id===a.id&&animalColor===co} onChange={()=>{setAnimal(a.id);setAnimalColor(co)}}/>{co}</label>)}</span>}</div>)}</div><label>自由記入</label><input value={customAnimal} onChange={e=>setCustomAnimal(e.target.value)} placeholder="例：白いフェネック、小さなユニコーン"/></section>}
{cat==="infographic"&&<section className="card"><h2><Info size={19}/>3. プロフィール情報</h2><p className="selected">学名風の名前はAIが自動でつけます。入力内容は希少動物図鑑風に言い換えます。</p><textarea className="profile-textarea" value={profile} onChange={e=>setProfile(e.target.value)} placeholder={`名前：
犬種・動物種：
性別：
年齢・誕生日：
性格：
好きなもの：
苦手なもの：
よく散歩に行く時間：
よくいる場所：
食べ物の好み：
チャームポイント：
特技：
飼い主から一言：`}/></section>}
<section className="card"><h2><Heart size={19}/>雰囲気（3つまで選択可能）</h2><div className="chips">{vibes.map(v=><button className={`chip ${vibeIds.includes(v.id)?"active":""}`} onClick={()=>toggleV(v.id)} key={v.id}>{v.label}</button>)}</div><label>光・明るさ</label><div className="chips">{light.map(l=><button className={`chip ${li.id===l.id?"active":""}`} onClick={()=>setLight(l.id)} key={l.id}>{l.label}</button>)}</div></section>
</section><aside className="right"><section className="card result-card"><div className="card-head"><h2><ImageIcon size={19}/>生成プロンプト</h2><button className="main-button" onClick={copy}>{copied?<CheckCircle2 size={16}/>:<Copy size={16}/>}{copied?"コピー済み":"コピー"}</button></div><div className="message warn"><AlertCircle size={16}/>画像生成時は、このプロンプトと一緒にペット写真をアップロードしてください。</div><textarea value={prompt} readOnly/></section></aside></div></div></main>
}
createRoot(document.getElementById("root")).render(<App/>);
