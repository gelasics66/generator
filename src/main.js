import heatwaveArchive from './heatwave-archive.js';

const presets = {
  フランス: { heat: '6月以降、南部から都市圏へ高温日が拡大。屋外だけでなく、冷房設備の弱い住宅・店舗でも暑熱対策への関心が高まっている。', ac: '住宅の冷房普及は限定的。景観・環境意識や建物構造の制約もあり、部屋全体を冷やす以外の選択肢に余地がある。', barrier: 'ファン付きウェア＝作業着という先入観、デザイン性、動作音への懸念。まずは体験・用途理解の形成が必要。' },
  イタリア: { heat: '北部・中部を含む広域で猛暑が長期化。通勤、観光、屋外イベントなど日常シーンの熱対策ニーズが顕在化している。', ac: '地域・住宅により普及差が大きく、電力コストも導入・使用の判断材料。局所的に身体を冷やす省エネ手段に余地がある。', barrier: '機能だけでなく外観や着こなしへの要求が高い。現地の生活文脈に合う商品設計と見せ方が不可欠。' },
  スペイン: { heat: '早い時期から高温となる日が増え、日中の移動や屋外活動で継続的な暑熱負荷が発生。個人単位の対策需要が広がる。', ac: '冷房は比較的身近だが、すべての空間・時間をカバーできない。移動中や屋外という市場の空白が残る。', barrier: '価格妥当性とバッテリー性能への理解が購入の鍵。既存の暑さ対策との差を実体験で示す必要がある。' },
  ドイツ: { heat: '短期間でも強い熱波が発生し、冷房のない住宅・オフィス・公共交通で暑さが課題化。備えとしての需要が見込まれる。', ac: '住宅用エアコンは広く定着しておらず、環境負荷を抑える冷却手段との親和性が高い。季節変動への対応力も価値になる。', barrier: '品質、安全性、耐久性を裏付ける情報が重視される。規格対応と合理的な省エネ説明が導入を後押しする。' }
};

const fields = [
  ['audience', '対象ユーザー', '都市部の通勤者・屋外イベント参加者'],
  ['product', '主力商品', '薄型ファン付きクーリングベスト'],
  ['usecase', '提案用途', '通勤、観光、スポーツ観戦、軽作業'],
  ['maker', 'メーカー名', 'KAZE TECH株式会社']
];

const snapshotDates = ['08/10','08/09','08/08','08/07','08/06','08/05','08/04'];
const heatSignals = [
  ['EXTREME HEAT','42°C','南欧で40℃超が継続','hot'],
  ['WILDFIRE','500k+ ha','EU焼失面積が異常水準','fire'],
  ['SYSTEM RISK','POWER · WATER','電力・河川・物流へ波及','system'],
  ['EVIDENCE','7 SNAPSHOTS','8/4–8/10を時系列保存','evidence']
];

const coolingMatrix = [
  { band:'33–37°C / DRY', title:'空調服＋給水', body:'乾燥した内陸部。気化冷却が働きやすいが、脱水・粉じん・火災リスクを同時に管理。', tag:'FAN + HYDRATION' },
  { band:'HUMID / COASTAL', title:'PCM・水冷', body:'汗の蒸発効率が落ちる沿岸・高湿度環境。身体から熱を直接逃がす方式を優先。', tag:'PCM + WATER' },
  { band:'38–42°C / SUN', title:'複合冷却＋休憩設計', body:'外気自体が高温になる領域。ファン単独を前提にせず、遮熱・休憩・給水を含む設計へ。', tag:'HYBRID + REST' }
];

document.querySelector('#app').innerHTML = `
  <header class="topbar">
    <a class="brand" href="#"><span class="brand-mark">EH</span><span>EUROPE HEATWAVE<br><b>MARKET BRIEF</b></span></a>
    <nav class="top-nav"><a href="#heatwave-intel">Heatwave Intel</a><a href="#heatwave-archive">Archive</a><a href="#generator">Generator</a></nav>
    <div class="top-actions"><span class="status"><i></i> LIVE PROTOTYPE</span><button class="ghost" id="resetBtn">リセット</button><button class="primary" id="printBtn"><span>↗</span> PDF / 印刷</button></div>
  </header>
  <main>
    <section class="hero">
      <div><p class="eyebrow">STRATEGY PROPOSAL GENERATOR + HEATWAVE INTELLIGENCE</p><h1>欧州熱波市場への<br><em>次の一手</em>を、一枚に。</h1><p class="intro">日本の冷却技術を「商品」ではなく、気候適応の選択肢として提案する。<br>日々のHeatwave Snapshotとメーカー向け戦略ブリーフを一つのページに統合しました。</p></div>
      <div class="hero-note"><span>01</span><div><b>OBSERVE</b><p>気温・湿度・火災・社会影響を見る</p></div><span>→</span><span>02</span><div><b>DECIDE</b><p>暑さの型から冷却方式を選ぶ</p></div><span>→</span><span>03</span><div><b>PROPOSE</b><p>市場提案へ変換</p></div></div>
    </section>

    <section class="intel" id="heatwave-intel">
      <div class="intel-head">
        <div><p class="eyebrow">HEATWAVE INTELLIGENCE</p><h2>「暑い」を、意思決定できる情報へ。</h2><p>温度だけでなく、湿度・山火事・電力・水・物流・労働への波及まで見て、冷却技術の使いどころを判断します。</p></div>
        <div class="source-badge"><b>DAILY OBSERVATION</b><span>Copernicus / ESA / EFFIS / 各国気象機関を参照する設計</span></div>
      </div>
      <div class="signal-grid">${heatSignals.map(([label,value,note,tone]) => `<article class="signal ${tone}"><small>${label}</small><strong>${value}</strong><p>${note}</p></article>`).join('')}</div>
      <div class="intel-layout">
        <article class="snapshot-card">
          <div class="snapshot-meta"><div><small>LATEST + ARCHIVE</small><h3>Heatwave Snapshot</h3></div><span>7 DAYS</span></div>
          <button class="snapshot-preview" id="openArchive" aria-label="Heatwave Snapshot archiveを拡大"><img src="${heatwaveArchive}" alt="8月4日から10日までのHeatwave Snapshotアーカイブ"></button>
          <div class="date-strip">${snapshotDates.map((d,i)=>`<span class="${i===0?'active':''}">${d}</span>`).join('')}</div>
          <p class="asset-note">画像は8/4–8/10に作成したHeatwave Snapshotを時系列で保存したアーカイブです。表示は情報把握用の概況で、公式警報そのものではありません。</p>
        </article>
        <article class="decision-card">
          <small>COOLING DECISION MATRIX</small><h3>地域ではなく「暑さの型」で対策を分ける。</h3>
          <div class="matrix">${coolingMatrix.map(x=>`<div class="matrix-row"><div><span>${x.band}</span><b>${x.title}</b></div><p>${x.body}</p><em>${x.tag}</em></div>`).join('')}</div>
          <div class="caution"><b>LIMIT</b><p>40℃前後ではファン付きウェア単独を万能解として扱わない。外気温・湿度・直射日光・作業強度・使用時間をセットで評価する。</p></div>
        </article>
      </div>
      <div class="archive-section" id="heatwave-archive">
        <div><small>HEATWAVE ARCHIVE</small><h3>日々の変化を、あとから比較できる資産に。</h3></div>
        <p>単日のニュースではなく、熱波の移動、火災リスク、社会影響の変化を連続で残す。メーカー提案では「今暑い」ではなく「需要が構造化している」ことの説明材料として使います。</p>
        <button class="archive-cta" id="openArchive2">全7枚を拡大表示 <span>↗</span></button>
      </div>
    </section>

    <section class="workspace" id="generator">
      <aside class="panel form-panel">
        <div class="panel-head"><div><small>STEP 01</small><h2>市場情報を入力</h2></div><span class="required">● 必須項目</span></div>
        <form id="briefForm">
          <label>対象国 <span>必須</span><select id="country"><option>フランス</option><option>イタリア</option><option>スペイン</option><option>ドイツ</option></select></label>
          <div class="two-col">${fields.slice(0,2).map(([id,label,value]) => `<label>${label}<input id="${id}" value="${value}"></label>`).join('')}</div>
          ${fields.slice(2).map(([id,label,value]) => `<label>${label}${id==='maker'?' <span>必須</span>':''}<input id="${id}" value="${value}"></label>`).join('')}
          <div class="divider"><span>MARKET NOTES</span></div>
          <label>最新熱波メモ<textarea id="heat" rows="3"></textarea></label>
          <label>エアコン普及率メモ<textarea id="ac" rows="3"></textarea></label>
          <label>市場ハードルメモ<textarea id="barrier" rows="3"></textarea></label>
          <p class="form-help">入力内容はブラウザ内でのみ使用されます。外部送信は行いません。</p>
        </form>
      </aside>
      <article class="panel report" id="report">
        <div class="report-head"><div><small>MARKET ENTRY PROPOSAL · <span id="date"></span></small><h2 id="reportTitle">フランス市場向け<br>パーソナル冷却ギア戦略</h2><p>Prepared for <b data-out="maker"></b></p></div><div class="flag" id="flag">FR</div></div>
        <div class="thesis"><span>CORE THESIS</span><p>エアコン普及までの「移行期」を、<br><b>日本発のウェアラブル冷却技術</b>で埋める。</p></div>
        <div id="sections"></div>
        <div class="recommend"><small>RECOMMENDED POSITIONING</small><h3>「部屋を冷やす」のではなく、<br><em>一人ひとりの快適を持ち運ぶ。</em></h3><p><span data-out="product"></span>を、省エネで機動的な <b>“Personal Climate Gear from Japan”</b> として再定義。機能性と日本の技術背景をセットで伝えます。</p></div>
        <div class="comment"><div class="quote">“</div><div><small>MESSAGE TO <span data-out="maker"></span></small><p id="makerComment"></p></div></div>
        <footer class="report-foot"><span>EUROPE HEATWAVE MARKET BRIEF</span><span>CONFIDENTIAL · PROPOSAL DRAFT</span></footer>
      </article>
    </section>
  </main>
  <div class="lightbox" id="archiveLightbox" aria-hidden="true"><button id="closeArchive" aria-label="閉じる">×</button><div class="lightbox-inner"><div class="lightbox-head"><small>HEATWAVE ARCHIVE · AUG 04–10</small><b>7 snapshots</b></div><img src="${heatwaveArchive}" alt="Heatwave Snapshot全7枚"></div></div>`;

const countryCodes = {フランス:'FR', イタリア:'IT', スペイン:'ES', ドイツ:'DE'};
const $ = id => document.getElementById(id);
function setPreset(country) { ['heat','ac','barrier'].forEach(k => $(k).value = presets[country][k]); update(); }
function update() {
  const v = Object.fromEntries(['country','audience','product','usecase','maker','heat','ac','barrier'].map(id => [id, $(id).value]));
  document.querySelectorAll('[data-out]').forEach(el => el.textContent = v[el.dataset.out] || 'メーカー名');
  $('reportTitle').innerHTML = `${v.country}市場向け<br>パーソナル冷却ギア戦略`;
  $('flag').textContent = countryCodes[v.country];
  const items = [
    ['01','HEATWAVE SIGNAL','熱波状況',v.heat],
    ['02','MARKET GAP','エアコン普及と市場の空白',v.ac],
    ['03','NEW CATEGORY','「日本式パーソナル冷却ギア」という括り',`日本で実用化が進んだファン付きウェアの知見を、衣服の一カテゴリーではなく「身体の周囲だけを効率よく冷やす技術」として提示。${v.product}を新しい暑熱対策の選択肢にします。`],
    ['04','USE EXPANSION','作業服から日常用冷却ギアへ',`対象を${v.audience}へ広げ、${v.usecase}などのシーンを提案。作業現場で培った実用性を保ちながら、軽量・静音・スタイルの価値へ翻訳します。`],
    ['05','ADOPTION PACE','受け入れハードルと進み具合',`${v.barrier} これは拒絶ではなく、未知のカテゴリーに対する市場側の慎重さ。段階的な実証と利用シーンの可視化で前進できます。`]
  ];
  $('sections').innerHTML = items.map(x => `<section class="report-section"><div class="num">${x[0]}</div><div><small>${x[1]}</small><h3>${x[2]}</h3><p>${x[3]}</p>${x[0]==='05'?'<div class="pace"><span>認知</span><i class="on"></i><span>理解</span><i class="on"></i><span>体験</span><i></i><span>定着</span></div>':''}</div></section>`).join('');
  $('makerComment').textContent = `${v.maker}が持つ現場起点の技術は、欧州の暮らしにも転用できる資産です。まず${v.country}で限定的な体験機会を設け、「なぜ今、個人を冷やすのか」を生活者の言葉で検証することを提案します。`;
}
function openArchive(){ $('archiveLightbox').classList.add('open'); $('archiveLightbox').setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
function closeArchive(){ $('archiveLightbox').classList.remove('open'); $('archiveLightbox').setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
$('date').textContent = new Intl.DateTimeFormat('ja-JP',{year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
$('country').addEventListener('change', e => setPreset(e.target.value));
$('briefForm').addEventListener('input', update);
$('resetBtn').addEventListener('click', () => { $('briefForm').reset(); setPreset('フランス'); });
$('printBtn').addEventListener('click', () => window.print());
$('openArchive').addEventListener('click', openArchive);
$('openArchive2').addEventListener('click', openArchive);
$('closeArchive').addEventListener('click', closeArchive);
$('archiveLightbox').addEventListener('click', e => { if(e.target === $('archiveLightbox')) closeArchive(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeArchive(); });
setPreset('フランス');
