const NAV = [
  ['projects', 'Projects', 'المشاريع'], ['build', 'Bunyan Build', 'بنيان بيلد'], ['institutions', 'For institutions', 'للمؤسسات'], ['brokers', 'For brokers', 'للوسطاء'], ['about', 'About', 'عن بنيان'],
];
const SignInCtx = React.createContext(() => {});
const LeadCtx = React.createContext(() => {});

function Header({ path }) {
  const t = useT(); const l = useLang(); const h = useHref(); const openSignIn = React.useContext(SignInCtx);
  const [menu, setMenu] = React.useState(false);
  const other = l === 'ar' ? 'en' : 'ar';
  const cur = path.join('/');
  React.useEffect(() => setMenu(false), [cur]);
  return <header className="hdr">
    <div className="wrap hdr-in">
      <a href={h('')} aria-label="Bunyan"><Logo /></a>
      <nav className="nav">{NAV.map(([p, en, ar]) => <a key={p} href={h(p)} aria-current={path[0] === p ? 'page' : undefined} className={path[0] === p ? 'on' : ''}>{t(en, ar)}</a>)}</nav>
      <div className="hdr-end">
        <a className="lang" href={href(other, cur)} lang={other}>{l === 'ar' ? 'English' : 'العربية'}</a>
        <button className="btn btn-primary btn-signin" onClick={() => openSignIn()}><Icon name="log-in" flip /><span>{t('Sign in', 'تسجيل الدخول')}</span></button>
        <button className="menu-btn" aria-expanded={menu} aria-label={t('Menu', 'القائمة')} onClick={() => setMenu(!menu)}><Icon name={menu ? 'x' : 'menu'} /></button>
      </div>
    </div>
    {menu && <div className="drawer">{NAV.map(([p, en, ar]) => <a key={p} href={h(p)}>{t(en, ar)}</a>)}<a href={h('privacy')}>{t('Privacy', 'الخصوصية')}</a><a href={href(other, cur)} lang={other}>{l === 'ar' ? 'English' : 'العربية'}</a></div>}
  </header>;
}

const DISCLAIMER_EN = 'Bunyan provides technology and operating infrastructure. Offering, marketing and arranging of real estate contribution certificates are carried out by CMA-licensed institutions. Bunyan holds no CMA licence.';
const DISCLAIMER_AR = 'يقدّم بنيان البنية التقنية والتشغيلية. ويتولّى طرح شهادات المساهمة العقارية وتسويقها وترتيبها مؤسساتٌ مرخّصة من هيئة السوق المالية. ولا يحمل بنيان أي ترخيص من هيئة السوق المالية.';

function Footer() {
  const t = useT(); const h = useHref(); const openLead = React.useContext(LeadCtx);
  return <footer className="ftr">
    <div className="parapet paper" style={{ transform: 'scaleY(-1)' }}></div>
    <div className="wrap">
      <div className="ftr-grid">
        <div className="ftr-col" style={{ gap: 16 }}>
          <Logo inverse h={36} />
          <p style={{ maxWidth: 360 }}>{t('Connecting capital to buildings.', 'نربط رأس المال بالمباني.')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><a href="mailto:info@bunyan.capital" dir="ltr" style={{ alignSelf: 'flex-start' }}>info@bunyan.capital</a><span dir="ltr" style={{ alignSelf: 'flex-start' }}>bunyan.capital</span></div>
        </div>
        <div className="ftr-col"><span className="label">{t('Platform', 'المنصة')}</span><a href={h('projects')}>{t('Projects', 'المشاريع')}</a><a href={h('build')}>{t('Bunyan Build', 'بنيان بيلد')}</a><a href={h('app/portfolio')}>{t('Investor portfolio', 'محفظة المستثمر')}</a></div>
        <div className="ftr-col"><span className="label">{t('Work with us', 'تعاون معنا')}</span><a href={h('institutions')}>{t('Licensed institutions', 'المؤسسات المرخّصة')}</a><a href={h('brokers')}>{t('Broker programme', 'برنامج الوسطاء')}</a><a href="#" onClick={(e) => { e.preventDefault(); openLead('investor'); }}>{t('Register investor interest', 'تسجيل اهتمام مستثمر')}</a></div>
        <div className="ftr-col"><span className="label">{t('Bunyan', 'بنيان')}</span><a href={h('about')}>{t('About', 'عن بنيان')}</a><a href={h('privacy')}>{t('Privacy', 'الخصوصية')}</a></div>
      </div>
      <p className="small" style={{ color: 'var(--slate-300)', paddingBottom: 20, maxWidth: 820 }}>{t('Projects are offered as Real Estate Contributions under REGA rules, through institutions licensed by the CMA. Bunyan does not receive or hold investor funds.', 'تُطرح المشاريع عبر المساهمات العقارية وفق أنظمة الهيئة العامة للعقار، ومن خلال مؤسسات مرخّصة من هيئة السوق المالية. لا يستلم بنيان أموال المستثمرين ولا يحتفظ بها.')}</p>
      <div className="disclaimer">
        <p lang="ar">{DISCLAIMER_AR}</p>
        <p lang="en">{DISCLAIMER_EN}</p>
      </div>
      <div className="small" style={{ paddingBottom: 28, color: 'var(--slate-500)' }}>© 2026 Bunyan · {t('Returns are not guaranteed.', 'العوائد غير مضمونة.')} · {t('How it is recorded: approvals are written to a digital record on the Stellar network that cannot be edited afterwards.', 'كيف نسجّل: تُحفظ الاعتمادات في سجل رقمي على شبكة ستيلار لا يمكن تعديله لاحقًا.')}</div>
    </div>
  </footer>;
}

const ROLES = [
  { k: 'investor', icon: 'wallet', en: 'Investor', ar: 'مستثمر', dEn: 'Portfolio, subscriptions, milestone updates', dAr: 'المحفظة والاشتراكات وتحديثات المراحل', app: 'app' },
  { k: 'developer', icon: 'building-2', en: 'Developer', ar: 'مطوّر', dEn: 'Prepare your project and readiness file', dAr: 'تجهيز المشروع وملف الجاهزية', app: 'build' },
  { k: 'partner', icon: 'landmark', en: 'Capital partner', ar: 'شريك رأس المال', dEn: 'CMA-licensed institution: deal room and review', dAr: 'مؤسسة مرخّصة: غرفة الصفقات والمراجعة', app: 'build' },
  { k: 'inspector', icon: 'hard-hat', en: 'Certified inspector', ar: 'المعاين المعتمد', dEn: 'Submit and sign milestone evidence', dAr: 'رفع أدلة المراحل وتوقيعها', app: 'app' },
  { k: 'shariah', icon: 'shield-check', en: 'Shariah advisor', ar: 'مستشار شرعي', dEn: 'Review structures and sign milestones', dAr: 'مراجعة الهياكل وتوقيع المراحل', app: 'app' },
  { k: 'admin', icon: 'key-round', en: 'Admin', ar: 'مشرف', dEn: 'Tranche approvals and platform operations', dAr: 'اعتماد الدفعات وتشغيل المنصة', app: 'app' },
];

function Sheet({ title, onClose, children }) {
  const t = useT();
  const panel = React.useRef();
  React.useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () => [...panel.current.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select,textarea,[tabindex="0"]')].filter(el => el.getClientRects().length);
    focusables()[0]?.focus();
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const all = focusables(), first = all[0], last = all[all.length-1];
        if (!first) {e.preventDefault();return;}
        if (e.shiftKey && document.activeElement === first) {e.preventDefault();last.focus();}
        else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first.focus();}
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {window.removeEventListener('keydown', onKey);document.body.style.overflow = oldOverflow;previous?.focus();};
  }, []);
  return <div className="scrim" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div ref={panel} className="sheet" role="dialog" aria-modal="true" aria-label={title}>
      <div className="sheet-h"><h2 className="h-2">{title}</h2><button className="icbtn" aria-label={t('Close', 'إغلاق')} onClick={onClose}><Icon name="x" /></button></div>
      <div className="sheet-b">{children}</div>
    </div>
  </div>;
}

function RolePicker({ onClose }) {
  const t = useT(); const h = useHref();
  const go = (r) => { onClose(); location.hash = h((r.app === 'build' ? 'build/sign-in/' : 'app/sign-in/') + r.k); };
  return <Sheet title={t('Sign in as', 'الدخول بصفتك')} onClose={onClose}>
    <p className="small muted" style={{ marginBottom: 16 }}>{t('Choose your role. Developers and capital partners continue to Bunyan Build.', 'اختر دورك. يتابع المطوّرون وشركاء رأس المال إلى بنيان بيلد.')}</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['app', 'build'].map((grp) => <React.Fragment key={grp}>
        <span className="label" style={{ marginTop: grp === 'build' ? 12 : 0 }}>{grp === 'app' ? t('Bunyan app', 'تطبيق بنيان') : t('Bunyan Build', 'بنيان بيلد')}</span>
        {ROLES.filter((r) => r.app === grp).map((r) => <button key={r.k} className="role" onClick={() => go(r)}>
          <span className="ri"><Icon name={r.icon} size={20} /></span>
          <span><span style={{ display: 'block', fontWeight: 600, fontSize: 15 }}>{t(r.en, r.ar)}</span><span className="small muted">{t(r.dEn, r.dAr)}</span></span>
          <Icon name="chevron-right" flip style={{ color: 'var(--text-muted)' }} />
        </button>)}
      </React.Fragment>)}
    </div>
  </Sheet>;
}

const LEAD_TYPES = {
  investor: { en: 'Register investor interest', ar: 'تسجيل اهتمام مستثمر', fields: [['name', 'Full name', 'الاسم الكامل'], ['email', 'Email', 'البريد الإلكتروني', 'email'], ['mobile', 'Mobile (optional)', 'رقم الجوال (اختياري)', 'tel', true], ['ticket', 'Expected investment size', 'حجم الاستثمار المتوقع', 'choice', false, [['500-10k', 'SAR 500–10K', '٥٠٠ – ١٠ آلاف ريال'], ['10k-100k', 'SAR 10K–100K', '١٠ – ١٠٠ ألف ريال'], ['100k-1m', 'SAR 100K–1M', '١٠٠ ألف – مليون ريال'], ['1m+', 'Over SAR 1M', 'أكثر من مليون ريال']]], ['interest', 'What interests you (choose any)', 'وش يهمك (اختر أكثر من خيار)', 'multi', false, [['fractional', 'Fractional share in a project', 'حصة في مشروع (ملكية جزئية)'], ['unit', 'A whole unit: villa or apartment', 'وحدة كاملة: فيلا أو شقة'], ['fund', 'A real estate fund', 'صندوق عقاري']]], ['city', 'City (optional, choose any)', 'المدينة (اختياري، يمكن اختيار أكثر من مدينة)', 'cities', true, [['riyadh', 'Riyadh', 'الرياض'], ['jeddah', 'Jeddah', 'جدة'], ['makkah', 'Makkah', 'مكة المكرمة'], ['madinah', 'Madinah', 'المدينة المنورة'], ['dammam', 'Dammam', 'الدمام'], ['khobar', 'Al Khobar', 'الخبر'], ['dhahran', 'Dhahran', 'الظهران'], ['abha', 'Abha', 'أبها'], ['tabuk', 'Tabuk', 'تبوك'], ['other', 'Other', 'أخرى']]]] },
  institution: { en: 'Partner with Bunyan', ar: 'الشراكة مع بنيان', fields: [['org', 'Institution', 'اسم المؤسسة'], ['licence', 'CMA licence number', 'رقم ترخيص هيئة السوق المالية'], ['name', 'Contact name', 'اسم المسؤول'], ['title', 'Role', 'المنصب'], ['email', 'Work email', 'البريد الإلكتروني للعمل', 'email'], ['mobile', 'Mobile', 'رقم الجوال', 'tel'], ['note', 'Mandate or area of interest', 'مجال الاهتمام', 'area', true]] },
  broker: { en: 'Join the broker programme', ar: 'الانضمام إلى برنامج الوسطاء', fields: [['name', 'Full name', 'الاسم الكامل'], ['fal', 'REGA FAL licence number', 'رقم رخصة فال من الهيئة العامة للعقار'], ['firm', 'Brokerage (optional)', 'المنشأة (اختياري)', 'text', true], ['mobile', 'Mobile', 'رقم الجوال', 'tel'], ['email', 'Email', 'البريد الإلكتروني', 'email'], ['city', 'City', 'المدينة']] },
};

function MultiSelect({ id, opts, value, onChange }) {
  const t = useT(); const [open, setOpen] = React.useState(false); const ref = React.useRef();
  React.useEffect(() => { if (!open) return; const f = (e) => { if (!ref.current.contains(e.target)) setOpen(false); }; const k = (e) => e.key === 'Escape' && setOpen(false); document.addEventListener('mousedown', f); document.addEventListener('keydown', k); return () => { document.removeEventListener('mousedown', f); document.removeEventListener('keydown', k); }; }, [open]);
  const toggle = (val) => onChange(value.includes(val) ? value.filter((x) => x !== val) : [...value, val]);
  return <div className="msel" ref={ref}>
    <div className={'msel-box' + (open ? ' open' : '')} onClick={() => setOpen(!open)}>
      {value.length === 0 && <span className="muted">{t('Select cities', 'اختر المدن')}</span>}
      {value.map((val) => { const o = opts.find((x) => x[0] === val); return <span key={val} className="msel-tag">{t(o[1], o[2])}<button type="button" aria-label={t('Remove ' + o[1], 'إزالة ' + o[2])} onClick={(e) => { e.stopPropagation(); toggle(val); }}><Icon name="x" size={14} /></button></span>; })}
      <button type="button" id={id} className="msel-trig" aria-haspopup="listbox" aria-expanded={open} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}><Icon name="chevron-down" size={18} /></button>
    </div>
    {open && <div className="msel-list" role="listbox" aria-multiselectable="true">{opts.map(([val, en, ar]) => { const sel = value.includes(val); return <button type="button" key={val} role="option" aria-selected={sel} className={'msel-opt' + (sel ? ' on' : '')} onClick={() => toggle(val)}><span className={'chk-box' + (sel ? ' on' : '')} aria-hidden="true"></span>{t(en, ar)}</button>; })}</div>}
  </div>;
}

function LeadForm({ type, onDone }) {
  const t = useT(); const l = useLang(); const h = useHref(); const cfg = LEAD_TYPES[type];
  const [v, setV] = React.useState({}); const [err, setErr] = React.useState({}); const [consent, setConsent] = React.useState(false); const [done, setDone] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const [website, setWebsite] = React.useState('');
  const submit = async (e) => {
    e.preventDefault(); const er = {};
    cfg.fields.forEach(([k, , , ty, opt]) => { const raw = v[k]; const x = Array.isArray(raw) ? raw.join(',') : (raw || '').trim(); if (!opt && !x) er[k] = t('Required', 'مطلوب'); else if (ty === 'email' && x && !/^\S+@\S+\.\S+$/.test(x)) er[k] = t('Enter a valid email', 'أدخل بريدًا صحيحًا'); });
    if (!consent) er.consent = t('Consent is required to submit', 'الموافقة مطلوبة للإرسال');
    setErr(er); if (Object.keys(er).length) return;
    if (sending) return;
    setSending(true);
    try {
      const response = await fetch('/api/leads', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({type, lang:l, data:v, consent:true, website}), signal:AbortSignal.timeout(15000)});
      const result = await response.json();
      if (!response.ok || !/^BN-[A-F0-9]{12}$/.test(result.id || '')) throw new Error('submission');
      setDone(result.id);
    } catch {
      setErr({submit:t('Your request could not be sent. Please try again or email info@bunyan.capital.', 'تعذّر إرسال طلبك. يُرجى المحاولة مجددًا أو مراسلتنا على info@bunyan.capital.')});
    } finally { setSending(false); }
  };
  if (done) return <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBlock: 8 }}>
    <span className="badge b-success" style={{ alignSelf: 'flex-start' }}>{t('Received', 'تم الاستلام')}</span>
    <h3 className="h-2">{t('Your interest request has been created', 'تم إنشاء طلب اهتمامك')}</h3>
    <p className="muted">{t('A member of the Bunyan team will contact you within three working days.', 'سيتواصل معك أحد أعضاء فريق بنيان خلال ثلاثة أيام عمل.')}</p>
    <div className="ev-row card" style={{ padding: 14 }}><span className="muted small">{t('Reference', 'الرقم المرجعي')}</span><span className="mono">{done}</span></div>
    {onDone && <button className="btn btn-secondary" onClick={onDone}>{t('Close', 'إغلاق')}</button>}
  </div>;
  return <form onSubmit={submit} noValidate className="form-grid">
    <div className="honey" aria-hidden="true"><label htmlFor={'website-'+type}>Website</label><input id={'website-'+type} tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} /></div>
    {cfg.fields.map(([k, en, ar, ty, opt, opts]) => <div key={k} className={'field' + (ty === 'area' || ty === 'choice' || ty === 'multi' || ty === 'cities' ? ' full' : '')}>
      <label htmlFor={'f-' + k}>{t(en, ar)}</label>
      {ty === 'choice' || ty === 'multi' ? <div className="chips" role="group" aria-label={t(en, ar)}>{opts.map(([val, oen, oar]) => { const sel = ty === 'multi' ? (v[k] || []).includes(val) : v[k] === val; return <button type="button" key={val} aria-pressed={sel} className={'btn chip' + (sel ? ' on' : '')} onClick={() => setV({ ...v, [k]: ty === 'multi' ? (sel ? v[k].filter((x) => x !== val) : [...(v[k] || []), val]) : val })}>{sel && <span className="chk-ic" aria-hidden="true"></span>}{t(oen, oar)}</button>; })}</div>
        : ty === 'cities' ? <MultiSelect id={'f-' + k} opts={opts} value={v[k] || []} onChange={(x) => setV({ ...v, [k]: x })} />
        : ty === 'area' ? <textarea id={'f-' + k} className="inp" value={v[k] || ''} onChange={(e) => setV({ ...v, [k]: e.target.value })}></textarea>
        : <input id={'f-' + k} className={'inp' + (err[k] ? ' err' : '')} type={ty || 'text'} dir={ty === 'tel' || ty === 'email' ? 'ltr' : undefined} style={ty === 'tel' || ty === 'email' ? { textAlign: l === 'ar' ? 'right' : 'left' } : null} value={v[k] || ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} />}
      {err[k] && <span className="ferr">{err[k]}</span>}
    </div>)}
    <div className="full field">
      <label className="chk"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>{t('I agree that Bunyan may process the personal data above to respond to this request, in line with the Personal Data Protection Law (PDPL) and the ', 'أوافق على أن يعالج بنيان البيانات الشخصية أعلاه للرد على هذا الطلب، وفق نظام حماية البيانات الشخصية و')}<a href={h('privacy')} target="_blank">{t('privacy notice', 'إشعار الخصوصية')}</a>.</span></label>
      {err.consent && <span className="ferr">{err.consent}</span>}
    </div>
    {err.submit && <p className="ferr full" role="alert">{err.submit}</p>}
    <div className="full"><button className="btn btn-primary btn-lg" disabled={sending} aria-busy={sending} type="submit" style={{ width: '100%' }}>{t('Submit', 'إرسال')}</button></div>
  </form>;
}

function LeadSheet({ type, onClose }) {
  const t = useT(); const cfg = LEAD_TYPES[type];
  return <Sheet title={t(cfg.en, cfg.ar)} onClose={onClose}><LeadForm type={type} onDone={onClose} /></Sheet>;
}

const APPLY_URL = 'https://waslcapital.netlify.app';
const LIVE_URL = { app: 'https://bunyan.capital/sign-in', build: 'https://wasl.capital/sign-in' };
function PrepareBtn({ cls = 'btn btn-primary btn-lg' }) {
  const t = useT();
  return <a className={cls} href={APPLY_URL} target="_blank" rel="noopener">{t('Apply', 'قدّم مشروعك')}<Icon name="arrow-up-right" flip /></a>;
}

Object.assign(window, { LIVE_URL, Header, Footer, RolePicker, LeadSheet, LeadForm, SignInCtx, LeadCtx, ROLES, PrepareBtn, APPLY_URL, Sheet, DISCLAIMER_EN, DISCLAIMER_AR });
