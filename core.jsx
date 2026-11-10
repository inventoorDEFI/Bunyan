const LangCtx = React.createContext('ar');
const useLang = () => React.useContext(LangCtx);
const useT = () => { const l = useLang(); return (en, ar) => (l === 'ar' ? ar : en); };

function parseHash() {
  const h = (location.hash || '#/ar').replace(/^#\/?/, '');
  const [lang, ...rest] = h.split('/');
  return { lang: lang === 'en' ? 'en' : 'ar', path: rest.filter(Boolean) };
}
function useRoute() {
  const [r, setR] = React.useState(parseHash());
  React.useEffect(() => {
    const f = () => { setR(parseHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f);
  }, []);
  return r;
}
const href = (lang, p = '') => `#/${lang}${p ? '/' + p : ''}`;
function useHref() { const l = useLang(); return (p) => href(l, p); }

function Icon({ name, size = 18, flip, style }) {
  return <span className={'icon' + (flip ? ' flip' : '')} style={{ '--i': `url(${(window.BUNYAN_ICONS || {})[name] || ''})`, width: size, height: size, ...style }}></span>;
}
function Logo({ inverse, h }) {
  const L = window.BUNYAN_LOGO || {};
  return <img className={'logo' + (inverse ? ' logo-inverse' : '')} src={L.dark} alt="Bunyan بنيان" width="848" height="160" decoding="sync" style={{ height: h, width: 'auto', alignSelf: 'flex-start' }} />;
}
function Photo({ src, alt = '', style }) {
  const [n, setN] = React.useState(0); const [ok, setOk] = React.useState(false);
  const url = n ? src + (src.startsWith('data:') ? '' : '?r=' + n) : src;
  return <img key={n} src={url} alt={alt} decoding="async" style={{ opacity: ok ? 1 : 0, transition: 'opacity .2s', ...style }} onLoad={() => setOk(true)} onError={() => n < 3 && setTimeout(() => setN(n + 1), 400 * (n + 1))} />;
}
const arNum = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
function Num({ n }) { const l = useLang(); return <>{l === 'ar' ? arNum(n) : n}</>; }

const PROJECTS = [
  { id: 'najd-horizon', img: (window.BUNYAN_IMG || {})['najd-horizon'], en: 'Najd Horizon Business Centre', ar: 'مركز أفق نجد للأعمال', cityEn: 'Riyadh', cityAr: 'الرياض', typeEn: 'Office', typeAr: 'مكاتب', size: '186,000,000', floors: 6, done: 4, inst: ['A'] },
  { id: 'khobar-marina', img: (window.BUNYAN_IMG || {})['khobar-marina'], en: 'Khobar Marina Business Hotel', ar: 'فندق مارينا الخبر للأعمال', cityEn: 'Al Khobar', cityAr: 'الخبر', typeEn: 'Hospitality', typeAr: 'ضيافة', size: '168,000,000', floors: 6, done: 0, inst: ['A', 'B'] },
  { id: 'asir-heights', img: (window.BUNYAN_IMG || {})['asir-heights'], en: 'Asir Heights Conference Hotel', ar: 'فندق مرتفعات عسير للمؤتمرات', cityEn: 'Abha', cityAr: 'أبها', typeEn: 'Hospitality', typeAr: 'ضيافة', size: '240,000,000', floors: 6, done: 0, inst: ['B', 'C'] },
  { id: 'diriyah-courtyard', img: (window.BUNYAN_IMG || {})['diriyah-courtyard'], en: 'Diriyah Courtyard Executive Centre', ar: 'مركز فناء الدرعية التنفيذي', cityEn: 'Diriyah, Riyadh', cityAr: 'الدرعية، الرياض', typeEn: 'Office', typeAr: 'مكاتب', size: '120,000,000', floors: 6, done: 0, inst: ['A', 'C'] },
  { id: 'coral-gate', img: (window.BUNYAN_IMG || {})['coral-gate'], en: 'Coral Gate Business Hotel', ar: 'فندق بوابة المرجان للأعمال', cityEn: 'Jeddah', cityAr: 'جدة', typeEn: 'Hospitality', typeAr: 'ضيافة', size: '210,000,000', floors: 6, done: 5, inst: ['B'] },
];
const INSTITUTIONS = { A: { en: 'Licensed institution A', ar: 'مؤسسة مرخّصة (أ)' }, B: { en: 'Licensed institution B', ar: 'مؤسسة مرخّصة (ب)' }, C: { en: 'Licensed institution C', ar: 'مؤسسة مرخّصة (ج)' } };
PROJECTS.forEach((p) => { p.open = p.done === 0; p.partnerEn = INSTITUTIONS[p.inst[0]].en; p.partnerAr = INSTITUTIONS[p.inst[0]].ar; });
const sarM = (s) => 'SAR ' + (parseInt(String(s).replace(/,/g, '')) / 1e6).toLocaleString('en', { maximumFractionDigits: 1 }) + 'M';

function StatusChip({ p }) {
  const t = useT();
  return p.open ? <span className="badge b-success">{t('Open for contribution', 'متاحة للمساهمة')}</span> : <span className="badge b-pending">{t('In construction', 'قيد التنفيذ')}</span>;
}
function DemoNote({ style }) {
  const t = useT();
  return <p className="demo-note" style={style}>{t('Demo data for presentation purposes. Project images are illustrative.', 'بيانات تجريبية لأغراض العرض. صور المشاريع توضيحية.')}</p>;
}

function ledgerFor(p) {
  const rows = []; const total = parseInt(p.size.replace(/,/g, ''));
  for (let i = 1; i <= p.floors; i++) {
    let state = 'planned';
    if (i < p.done) state = 'released'; else if (i === p.done) state = 'verified'; else if (i === p.done + 1 && p.done > 0) state = 'current';
    const d = new Date(2026, 9 - (p.done - i) * 2, 12);
    rows.push({ n: i, state, date: d.toISOString().slice(0, 10), tx: 'GC' + (p.id.length * 7919 + i * 104729).toString(36).toUpperCase().padStart(6, 'X') + '…' + (i * 37 + 11).toString(16).toUpperCase(), tranche: Math.round(total / p.floors / 1000) * 1000 });
  }
  return rows;
}
const APPROVALS = [['inspection', 'Inspector report', 'تقرير المعاين'], ['shariahApproval', 'Shariah approval', 'الاعتماد الشرعي'], ['financialApproval', 'Financial approval', 'الاعتماد المالي']];
const apprDone = (state) => ({ released: [1, 1, 1], verified: [1, 1, 0], current: [0, 0, 0], planned: [0, 0, 0] }[state]);

function FloorLedger({ p, openFirst, lg, rise, interactive = true }) {
  const t = useT(); const openDoc = React.useContext(window.DocCtx || React.createContext(() => {}));
  const rows = ledgerFor(p).reverse();
  const first = rows.find((r) => r.state === 'verified') || rows.find((r) => r.state === 'released');
  const [open, setOpen] = React.useState(openFirst && first ? first.n : null);
  const lbl = { released: t('Released', 'صُرفت'), verified: t('Awaiting financial approval', 'بانتظار الاعتماد المالي'), current: t('In construction', 'قيد البناء'), planned: t('Not started', 'لم يبدأ') };
  return <div>
    <div className={'parapet ' + (lg ? '' : 'sm')}></div>
    <div className={'ledger' + (lg ? ' ledger-lg' : '') + (rise ? ' rise' : '')} style={{ marginTop: 3 }}>
      {rows.map((r, ri) => <React.Fragment key={r.n}>
        <button className={'floor ' + r.state} onClick={() => interactive && setOpen(open === r.n ? null : r.n)} aria-expanded={open === r.n} style={rise ? { animationDelay: (rows.length - ri) * 110 + 'ms' } : null}>
          <span className="fl-n">F{String(r.n).padStart(2, '0')}</span>
          <span className="fl-t">{lbl[r.state]}<span className="fl-s mono" style={{ display: 'block' }}>SAR {r.tranche.toLocaleString('en')}</span></span>
          <span className="sigs" title={t('Inspector report · Shariah approval · Financial approval', 'تقرير المعاين · الاعتماد الشرعي · الاعتماد المالي')}>{apprDone(r.state).map((s, i) => <i key={i} className={s ? 'on' : ''}></i>)}</span>
        </button>
        {open === r.n && <div className="ev">
          {APPROVALS.map(([k, en, ar], i) => { const ok = apprDone(r.state)[i]; return <button key={k} className="appr" disabled={!ok} onClick={() => openDoc({ k, p, floor: r.n })}>
            <Icon name={ok ? 'circle-check' : 'circle-dashed'} size={16} style={{ color: ok ? 'var(--teal-600)' : 'var(--slate-300)' }} />
            <span style={{ flex: 1 }}>{t(en, ar)}</span>
            {ok ? <span className="small" style={{ color: 'var(--teal-700)', display: 'flex', gap: 4, alignItems: 'center' }}>{t('View', 'عرض')}<Icon name="file-text" size={14} /></span> : <span className="small muted">{t('Not issued yet', 'لم يصدر بعد')}</span>}
          </button>; })}
          <div className="ev-row small"><span className="muted">{t('Floor amount', 'مبلغ الطابق')}</span><span className="mono">SAR {r.tranche.toLocaleString('en')}</span></div>
        </div>}
      </React.Fragment>)}
    </div>
    <div className="plinth"></div>
    <div className="small muted" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
      <span className="sigs" style={{ color: 'var(--teal-600)' }}><i className="on"></i><i className="on"></i><i className="on"></i></span>
      <span>{t('Inspector report, Shariah approval, financial approval. Every approval is recorded and cannot be edited.', 'تقرير المعاين، الاعتماد الشرعي، الاعتماد المالي. كل اعتماد مسجل بشكل لا يمكن تعديله.')}</span>
    </div>
  </div>;
}

function Courses({ total, done, cur }) {
  return <div className="courses">{Array.from({ length: total }, (_, i) => <i key={i} className={i < done ? 'on' : i === done && cur ? 'cur' : ''}></i>)}</div>;
}

function ProjectCard({ p }) {
  const t = useT(); const h = useHref();
  return <a className="card pcard" href={h('app/projects/' + p.id)}>
    <div className="media"><Photo src={p.img} alt={t(p.en, p.ar)} /></div>
    <div className="pcard-b">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <StatusChip p={p} />
        <span className="label">{t(p.cityEn, p.cityAr)} · {t(p.typeEn, p.typeAr)}</span>
      </div>
      <h3 className="h-3">{t(p.en, p.ar)}</h3>
      <Courses total={p.floors} done={p.done} cur={p.done > 0} />
      <div className="kv">
        <div><span className="label">{t('Project size', 'حجم المشروع')}</span><b className="mono" style={{ fontSize: 13 }}>{sarM(p.size)}</b></div>
        <div><span className="label">{t('Floors', 'الطوابق')}</span><b><Num n={p.done} />/<Num n={p.floors} /></b></div>
        <div><span className="label">{p.open ? t('Minimum', 'الحد الأدنى') : t('Offered by', 'الجهة الطارحة')}</span><b style={{ fontSize: 13 }}>{p.open ? <span className="mono">SAR 500</span> : t(p.partnerEn, p.partnerAr)}</b></div>
      </div>
    </div>
  </a>;
}

function ProjectRail({ items }) {
  const t = useT(); const ref = React.useRef(); const [idx, setIdx] = React.useState(0); const l = useLang();
  const step = (d) => { const el = ref.current; const w = el.firstChild.getBoundingClientRect().width + 16; el.scrollBy({ left: d * w * (l === 'ar' ? -1 : 1), behavior: 'smooth' }); };
  const onScroll = () => { const el = ref.current; const w = el.firstChild.getBoundingClientRect().width + 16; setIdx(Math.round(Math.abs(el.scrollLeft) / w)); };
  return <div>
    <div className="rail" ref={ref} onScroll={onScroll}>{items.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
      <div className="dots">{items.map((_, i) => <i key={i} className={i === idx ? 'on' : ''}></i>)}</div>
      <div className="rail-ctl">
        <button className="icbtn" aria-label={t('Previous', 'السابق')} onClick={() => step(-1)}><Icon name="chevron-left" flip /></button>
        <button className="icbtn" aria-label={t('Next', 'التالي')} onClick={() => step(1)}><Icon name="chevron-right" flip /></button>
      </div>
    </div>
  </div>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = React.useRef(); const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.disconnect(); } }, { threshold: .2 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className + (on ? ' in' : '')}>{children}</div>;
}
function Checklist({ items }) {
  return <div className="list">{items.map((x, i) => <div key={i}><Icon name="check" /><span>{x}</span></div>)}</div>;
}

// Najdi facade: tapered mud-brick mass, triangular sharafat, stepped tower, wall courses, triangle vents, door.
function NajdiMotif({ stroke = 'var(--bronze-700)', wall = 'var(--sand-50)', tower = 'var(--sand-100)', accent = 'var(--sand-500)', style }) {
  const tri = []; for (let x = 92; x < 468; x += 19) tri.push(`M${x} 150L${x + 9.5} 128L${x + 19} 150Z`);
  const vents = []; [120, 200, 340, 420].forEach((cx) => [-14, 0, 14].forEach((dx) => vents.push(`M${cx + dx - 6} 186L${cx + dx} 174L${cx + dx + 6} 186Z`)));
  const courses = []; for (let y = 200; y < 420; y += 22) courses.push(y);
  const band = []; for (let x = 252; x < 308; x += 8) band.push(`M${x} 326L${x + 4} 318L${x + 8} 326`);
  return <svg viewBox="0 0 560 440" className="motif" style={style} aria-hidden="true" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M24 420H536" />
    <path d="M80 420L90 150H470L480 420Z" fill={wall} />
    {courses.map((y, i) => <path key={y} className="course" style={{ animationDelay: (10 - i) * 70 + 'ms' }} d={`M${84 + (420 - y) * 0.03} ${y}H${476 - (420 - y) * 0.03}`} strokeOpacity=".35" />)}
    <path d={tri.join('')} fill={accent} stroke="none" />
    <path d="M90 150H470" />
    <path d={vents.join('')} fill={stroke} stroke="none" />
    <path d="M34 420L40 96H132L138 420Z" fill={tower} />
    <path d="M36 96V84H50V72H62V60H110V72H122V84H136V96" fill={tower} />
    <path d="M78 120V172M94 120V172M78 260V312M94 260V312" strokeWidth="5" strokeLinecap="square" />
    {[180, 380].map((x) => <rect key={x} x={x} y="236" width="22" height="30" fill={tower} />)}
    {[180, 380].map((x) => <path key={x} d={`M${x} 236L${x + 11} 224L${x + 22} 236`} />)}
    <rect x="248" y="330" width="64" height="90" fill={tower} />
    <rect x="258" y="342" width="44" height="78" />
    <path d={band.join('')} />
    <path d="M280 342V420" strokeOpacity=".6" />
  </svg>;
}

Object.assign(window, { Photo, LangCtx, useLang, useT, useRoute, href, useHref, Icon, Logo, Num, arNum, PROJECTS, INSTITUTIONS, sarM, StatusChip, DemoNote, ledgerFor, APPROVALS, apprDone, FloorLedger, Courses, ProjectCard, ProjectRail, Reveal, Checklist, NajdiMotif });
