function AppBar({ product }) {
  const t = useT(); const h = useHref(); const l = useLang(); const role = ROLES.find((r) => r.k === Session.role());
  return <header className="hdr"><div className="wrap hdr-in">
    <a href={h('')}><Logo /></a>
    <span className="label app-prod" style={{ paddingInlineStart: 12, borderInlineStart: '1px solid var(--line-strong)' }}>{product === 'build' ? t('Bunyan Build', 'بنيان بيلد') : t('Bunyan app', 'تطبيق بنيان')}</span>
    <div className="hdr-end">
      <a className="lang" href={href(l === 'ar' ? 'en' : 'ar', location.hash.split('/').slice(2).join('/'))}>{l === 'ar' ? 'English' : 'العربية'}</a>
      {role && <span className="badge b-neutral" style={{ display: 'none' }}>{t(role.en, role.ar)}</span>}
      {role ? <a className="btn btn-secondary" href={h('')} onClick={() => Session.clear()} style={{ height: 36 }}>{t('Sign out', 'خروج')}</a> : <a className="btn btn-secondary" href={h('app/sign-in/investor')} style={{ height: 36 }}>{t('Sign in', 'دخول')}</a>}
    </div>
  </div></header>;
}
function AppFooter() {
  const t = useT();
  return <footer style={{ borderTop: '1px solid var(--line)', marginTop: 48 }}><div className="wrap" style={{ paddingTop: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }} ><a href="mailto:info@bunyan.capital" dir="ltr">info@bunyan.capital</a><span className="muted" dir="ltr">bunyan.capital</span></div><div className="wrap disclaimer" style={{ color: 'var(--text-muted)', borderTop: 0 }}><p lang="ar">{DISCLAIMER_AR}</p><p lang="en">{DISCLAIMER_EN}</p></div></footer>;
}

function SignIn({ product, roleKey }) {
  const t = useT(); const h = useHref(); const role = ROLES.find((r) => r.k === roleKey) || ROLES[0];
  const nafath = ['investor', 'developer', 'inspector'].includes(role.k);
  const [mode, setMode] = React.useState('demo');
  const [step, setStep] = React.useState('start'); const [code] = React.useState(10 + Math.floor(Math.random() * 89));
  const [id, setId] = React.useState('');
  React.useEffect(() => { if (step === 'wait') { const x = setTimeout(() => setStep('ok'), 2400); return () => clearTimeout(x); } if (step === 'ok') { const x = setTimeout(() => { Session.set(role.k); location.hash = h(role.k === 'investor' ? 'app/portfolio' : (product === 'build' ? 'build/app/' : 'app/home/') + role.k); }, 700); return () => clearTimeout(x); } }, [step]);
  const live = LIVE_URL[product === 'build' ? 'build' : 'app'];
  return <>
    <AppBar product={product} />
    <main className="wrap" style={{ paddingBlock: 40, display: 'grid', placeItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 460, padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="ri" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center' }}><Icon name={role.icon} size={22} /></span>
          <div><span className="label">{t('Signing in as', 'الدخول بصفة')}</span><div style={{ fontWeight: 600, fontSize: 18 }}>{t(role.en, role.ar)}</div></div></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['demo', 'Demo mode', 'وضع العرض التجريبي', 'No account. Fictional data.', 'بدون حساب. بيانات وهمية.'], ['live', 'Live access', 'الدخول الفعلي', 'Opens the real application.', 'يفتح التطبيق الفعلي.']].map(([k, en, ar, dEn, dAr]) => <button key={k} className="role" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, ...(mode === k ? { borderColor: 'var(--teal-600)', background: 'var(--teal-50)' } : {}) }} onClick={() => setMode(k)}><b style={{ fontSize: 14 }}>{t(en, ar)}</b><span className="small muted">{t(dEn, dAr)}</span></button>)}
        </div>
        {mode === 'live' ? <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="small muted">{t('You will sign in with your real account. Data there is live.', 'بتدخل بحسابك الفعلي، والبيانات هناك حقيقية.')}</p>
          <a className="btn btn-primary btn-lg" href={live} target="_blank" rel="noopener">{t('Continue to live sign-in', 'المتابعة للدخول الفعلي')}<Icon name="arrow-up-right" flip /></a>
          <span className="dest">{live.replace('https://', '')}</span>
        </div> : nafath ? <>
          {step === 'start' && <form onSubmit={(e) => { e.preventDefault(); if (/^\d{10}$/.test(id)) setStep('wait'); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field"><label htmlFor="nid">{t('National ID or Iqama number', 'رقم الهوية الوطنية أو الإقامة')}</label><input id="nid" className="inp mono" dir="ltr" inputMode="numeric" maxLength={10} placeholder="1XXXXXXXXX" value={id} onChange={(e) => setId(e.target.value.replace(/\D/g, ''))} /><button type="button" className="btn btn-ghost" style={{ height: 30, alignSelf: 'flex-start' }} onClick={() => setId('1012345678')}>{t('Use demo ID', 'استخدم رقمًا تجريبيًا')}</button></div>
            <button className="btn btn-primary btn-lg" disabled={id.length !== 10}><Icon name="fingerprint" />{t('Continue with Nafath', 'المتابعة عبر نفاذ')}</button>
          </form>}
          {step !== 'start' && <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center', paddingBlock: 8 }}>
            <p className="muted">{t('Open the Nafath app and choose this number', 'افتح تطبيق نفاذ واختر هذا الرقم')}</p>
            <div style={{ width: 96, height: 96, borderRadius: 'var(--radius-lg)', border: '2px solid ' + (step === 'ok' ? 'var(--teal-600)' : 'var(--sand-500)'), display: 'grid', placeItems: 'center', fontSize: 40, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{code}</div>
            <span className={'badge ' + (step === 'ok' ? 'b-success' : 'b-pending')}>{step === 'ok' ? t('Verified', 'تم التحقق') : t('Waiting for Nafath', 'بانتظار نفاذ')}</span>
          </div>}
        </> : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="small muted">{t('Demo sign-in for institutional roles. No password needed.', 'دخول تجريبي للأدوار المؤسسية، بدون كلمة مرور.')}</p>
          <button className="btn btn-primary btn-lg" onClick={() => setStep('ok')}>{step === 'ok' ? t('Opening workspace', 'جارٍ فتح مساحة العمل') : t('Enter demo workspace', 'ادخل مساحة العمل التجريبية')}</button>
        </div>}
        <a className="small" href={h('')}>{t('Back to bunyan.capital', 'العودة إلى bunyan.capital')}</a>
      </div>
    </main>
    <AppFooter />
  </>;
}

function AppProject({ id }) {
  const t = useT(); const h = useHref();
  const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];
  const cta = p.open ? <a className="btn btn-accent btn-lg" href={h('app/invest/' + p.id)}>{t('Subscribe', 'اشترك')}</a> : null;
  return <><AppBar product="app" />
    <main className={p.open ? 'has-sticky' : ''}>
      <div className="wrap" style={{ paddingTop: 20 }}><a className="crumb" href={h('projects')}><Icon name="arrow-left" size={16} flip />{t('All projects', 'كل المشاريع')}</a></div>
      <section className="wrap" style={{ paddingBlock: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}><StatusChip p={p} /><span className="label">{t(p.cityEn, p.cityAr)} · {t(p.typeEn, p.typeAr)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <h1 className="h-1">{t(p.en, p.ar)}</h1>
          {p.open ? <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="small muted">{t('Minimum SAR 500', 'الحد الأدنى ٥٠٠ ريال')}</span>{cta}</div>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span className="badge b-neutral" style={{ alignSelf: 'flex-start' }}>{t('Not available for contribution', 'غير متاحة للمساهمة')}</span><span className="small muted">{t('The offering closed and construction has started.', 'انتهى الطرح وبدأ التنفيذ.')}</span></div>}
        </div>
      </section>
      <section className="wrap split" style={{ paddingBottom: 48, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="media" style={{ aspectRatio: '16/10', borderRadius: 'var(--radius-lg)' }}><Photo src={p.img} alt={t(p.en, p.ar)} /></div>
          <div className="kv" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))', rowGap: 16 }}>
            <div><span className="label">{t('Project size', 'حجم المشروع')}</span><b className="mono" style={{ fontSize: 14 }}>SAR {p.size}</b></div>
            <div><span className="label">{t('Floors approved', 'الطوابق المعتمدة')}</span><b><Num n={Math.max(0, p.done - 1)} /> {t('of', 'من')} <Num n={p.floors} /></b></div>
            <div><span className="label">{t('Offered by', 'الجهة الطارحة')}</span><b>{p.inst.map((k) => t(INSTITUTIONS[k].en, INSTITUTIONS[k].ar)).join(t(', ', '، '))}</b></div>
            <div><span className="label">{t('Shariah advisor', 'المستشار الشرعي')}</span><b>{t('Amanx', 'أمانكس')}</b></div>
          </div>
          <div><h2 className="h-3" style={{ marginBottom: 12 }}>{t('Documents', 'المستندات')}</h2><DocList p={p} keys={['memo', 'valuation', 'shariah']} /></div>
          {!p.open && <div className="card band-sand" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', borderColor: 'var(--sand-100)' }}><span>{t('Looking to subscribe? These projects are open.', 'تبي تساهم؟ هذي المشاريع مفتوحة.')}</span><a className="btn btn-primary" href={h('projects')}>{t('Open projects', 'المشاريع المفتوحة')}</a></div>}
        </div>
        <div className="card" style={{ padding: 20, position: 'sticky', top: 100 }}>
          <h2 className="h-3" style={{ marginBottom: 4 }}>{t('Floors and approvals', 'الطوابق والاعتمادات')}</h2>
          <p className="small muted" style={{ marginBottom: 16 }}>{t('Tap a floor to see its amount and documents.', 'اضغط على أي طابق لتشوف مبلغه ومستنداته.')}</p>
          <FloorLedger p={p} openFirst />
        </div>
      </section>
      <div className="wrap"><p className="small muted">{t('How it is recorded: each approval is written to a digital record on the Stellar network. Once written, it cannot be changed.', 'كيف نسجّل: كل اعتماد يُحفظ في سجل رقمي على شبكة ستيلار، وبعد حفظه ما يمكن تعديله.')}</p><DemoNote /></div>
      {cta && <div className="sticky-cta">{cta}</div>}
    </main><AppFooter /></>;
}

function Portfolio() {
  const t = useT(); const h = useHref();
  const base = [{ p: PROJECTS[0], n: 500000, st: 'active' }, { p: PROJECTS[4], n: 250000, st: 'active' }];
  const extra = extraHoldings().map((x) => ({ p: PROJECTS.find((y) => y.id === x.id), n: x.n, st: 'pending', at: x.at })).filter((x) => x.p);
  const holdings = [...base, ...extra.filter((e) => !base.some((b) => b.p.id === e.p.id))];
  const total = holdings.reduce((a, x) => a + x.n, 0);
  const offers = PROJECTS.filter((x) => x.open && !holdings.some((y) => y.p.id === x.id));
  const feed = [
    ...extra.map((e) => [e.at, e.p, 0, 'Subscription submitted, waiting for the institution', 'تم إرسال طلب المساهمة، بانتظار المؤسسة', 'pending']),
    ['2026-10-12', PROJECTS[0], 4, 'Floor 4: inspector report and Shariah approval issued', 'الطابق ٤: صدر تقرير المعاين والاعتماد الشرعي', 'verified'],
    ['2026-10-03', PROJECTS[4], 4, 'Floor 4 amount released', 'صُرف مبلغ الطابق ٤', 'released'],
    ['2026-08-12', PROJECTS[0], 3, 'Floor 3 amount released', 'صُرف مبلغ الطابق ٣', 'released'],
    ['2026-07-20', PROJECTS[4], 0, 'Quarterly progress report published', 'نُشر تقرير التقدم الربعي', 'info'],
  ];
  return <><AppBar product="app" />
    <main className="wrap" style={{ paddingBlock: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}><div><span className="label">{t('Investor', 'مستثمر')}</span><h1 className="h-1">{t('Your portfolio', 'محفظتك')}</h1></div><a className="btn btn-accent" href={h('projects')}><Icon name="plus" />{t('Subscribe to another project', 'ساهم في مشروع آخر')}</a></div>
      <div className="split" style={{ gap: 16 }}>
        <div className="card band-ink" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, border: 0 }}>
          <span className="label">{t('Total subscribed', 'إجمالي المساهمات')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span className="mono" style={{ color: 'var(--sand-500)' }}>SAR</span><span style={{ fontSize: 40, fontWeight: 600, fontFamily: 'Sora' }}>{total.toLocaleString('en')}</span></div>
          <div className="small"><Num n={holdings.length} /> {t('projects', 'مشاريع')}</div>
          <p className="small" style={{ color: 'var(--slate-500)' }}>{t('Returns are expected, not guaranteed. See each offering memorandum.', 'العوائد متوقعة وغير مضمونة. راجع نشرة كل طرح.')}</p>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <span className="label">{t('Activity', 'آخر التحديثات')}</span>
          <div className="list" style={{ marginTop: 12 }}>{feed.map(([d, p, f, en, ar, s], i) => <div key={i} style={{ gridTemplateColumns: '10px minmax(0,1fr)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, marginTop: 6, background: s === 'released' ? 'var(--teal-600)' : s === 'verified' ? 'var(--teal-100)' : s === 'pending' ? 'var(--sand-500)' : 'var(--slate-300)' }}></span>
            <span><span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 14, fontWeight: 500 }}><span>{t(p.en, p.ar)}</span><span className="mono muted">{d}</span></span><span className="small muted">{t(en, ar)}</span></span>
          </div>)}</div>
        </div>
      </div>
      <h2 className="h-2" style={{ marginTop: 8 }}>{t('Holdings', 'استثماراتك')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {holdings.map(({ p, n, st }) => <a key={p.id} className="card pcard" href={h('app/projects/' + p.id)} style={{ flexDirection: 'row', alignItems: 'stretch' }}>
          <div className="media" style={{ width: 120, flex: 'none', aspectRatio: 'auto' }}><Photo src={p.img} alt="" /></div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><span style={{ fontWeight: 600 }}>{t(p.en, p.ar)}</span><span className={'badge ' + (st === 'active' ? 'b-success' : 'b-pending')}>{st === 'active' ? t('Active', 'نشط') : t('Pending allocation', 'بانتظار التخصيص')}</span></div>
            <Courses total={p.floors} done={p.done} cur={p.done > 0} />
            <div className="small muted" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}><span className="mono">SAR {n.toLocaleString('en')}</span><span>{t('Floor', 'الطابق')} <Num n={p.done} />/<Num n={p.floors} /></span></div>
          </div>
        </a>)}
      </div>
      {offers.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 className="h-2" style={{ marginTop: 8 }}>{t('Opportunities', 'فرص جديدة')}</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>{offers.map((x) => <div key={x.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="media" style={{ aspectRatio: '16/9' }}><Photo src={x.img} alt="" /></div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}><StatusChip p={x} /><b>{t(x.en, x.ar)}</b><span className="small muted">{t(x.cityEn, x.cityAr)} · {sarM(x.size)} · {t('from SAR 500', 'من ٥٠٠ ريال')}</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 8 }}><a className="btn btn-primary" href={h('app/invest/' + x.id)}>{t('Subscribe', 'اشترك')}</a><a className="btn btn-ghost" href={h('app/projects/' + x.id)}>{t('Details', 'التفاصيل')}</a></div></div>
        </div>)}</div>
      </div>}
      <DemoNote />
    </main><AppFooter /></>;
}
Object.assign(window, { SignIn, AppProject, Portfolio, AppBar, AppFooter });
