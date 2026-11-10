function RegSection({ band = 'band-card' }) {
  const t = useT();
  return <section className={'sec ' + band}>
    <div className="wrap split">
      <div className="sec-head" style={{ marginBottom: 0 }}>
        <span className="label">{t('Regulatory framework', 'الإطار النظامي')}</span>
        <h2 className="h-1">{t('We work within the Saudi regulatory framework', 'نعمل ضمن الإطار النظامي السعودي')}</h2>
        <p className="lead">{t('Projects are offered as Real Estate Contributions under the rules issued by the Real Estate General Authority, and regulated activities are carried out through institutions licensed by the Capital Market Authority. Bunyan does not receive or hold investor funds.', 'تُطرح المشاريع عبر المساهمات العقارية وفق الأنظمة الصادرة عن الهيئة العامة للعقار، وتتم الأنشطة المنظمة عبر مؤسسات سوق مالية مرخصة من هيئة السوق المالية. لا يستلم بنيان أموال المستثمرين ولا يحتفظ بها.')}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'center' }}>
        <span className="label">{t('The regulatory framework we work within', 'الإطار النظامي الذي نعمل ضمنه')}</span>
        <div className="regstrip">
          <div><b style={{ fontSize: 17 }}>{t('Real Estate General Authority', 'الهيئة العامة للعقار')}</b><span className="small muted">{t('Real Estate Contributions rules', 'أنظمة المساهمات العقارية')}</span></div>
          <div><b style={{ fontSize: 17 }}>{t('Capital Market Authority', 'هيئة السوق المالية')}</b><span className="small muted">{t('Licensing of capital market institutions', 'ترخيص مؤسسات السوق المالية')}</span></div>
        </div>
      </div>
    </div>
  </section>;
}

function Home() {
  const t = useT(); const h = useHref(); const openLead = React.useContext(LeadCtx);
  const toInterest = (e) => { e && e.preventDefault(); const el = document.getElementById('interest'); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' }); };
  const doors = [
    { k: 'developer', en: 'For developers', ar: 'للمطورين', dEn: 'Get your project ready and reach licensed institutions.', dAr: 'جهّز مشروعك ووصّله للمؤسسات المرخصة.', cEn: 'Bunyan Build', cAr: 'بنيان بيلد', to: 'build', dark: true },
    { k: 'institution', en: 'For licensed financial institutions', ar: 'للمؤسسات المالية المرخصة', dEn: 'Review ready projects that match your mandate.', dAr: 'راجع مشاريع جاهزة تناسب توجهاتك الاستثمارية.', cEn: 'Learn more', cAr: 'اعرف أكثر', to: 'institutions' },
    { k: 'investor', en: 'For investors', ar: 'للمستثمرين', dEn: 'Tell us your ticket size and what you want to invest in. We contact you when a matching project opens.', dAr: 'أخبرنا بحجم استثمارك ونوع الفرصة، ونتواصل معك أول ما يُطرح مشروع يناسبك.', cEn: 'Register your interest', cAr: 'سجّل اهتمامك', to: 'projects', anchor: true },
    { k: 'broker', en: 'For brokers', ar: 'للوسطاء', dEn: 'Refer developers and track each referral.', dAr: 'أحِل المطورين وتابع كل إحالة.', cEn: 'Join the programme', cAr: 'انضم للبرنامج', to: 'brokers' },
  ];
  const storeys = [
    { lEn: 'Ground', lAr: 'الأرضي', en: 'The developer prepares', ar: 'المطور يجهّز', dEn: 'Bunyan Build puts the file together: title, permits, feasibility, valuation and track record.', dAr: 'بنيان بيلد يجمع الملف كاملًا: الصك والتراخيص والجدوى والتقييم وسجل الأعمال.' },
    { lEn: 'Floor 1', lAr: 'الطابق ١', en: 'A licensed institution reviews', ar: 'مؤسسة مرخصة تراجع', dEn: 'The institution reviews the file in a deal room and decides whether to offer it.', dAr: 'المؤسسة تراجع الملف في غرفة الصفقة وتقرر الطرح.' },
    { lEn: 'Floor 2', lAr: 'الطابق ٢', en: 'Investors subscribe', ar: 'المستثمرون يساهمون', dEn: 'The institution offers the Real Estate Contribution. Investors sign in with Nafath and subscribe.', dAr: 'المؤسسة تطرح المساهمة العقارية، والمستثمر يدخل بنفاذ ويساهم.' },
    { lEn: 'Floor 3', lAr: 'الطابق ٣', en: 'Each stage is documented', ar: 'كل مرحلة موثقة', dEn: 'Inspector report, Shariah approval and financial approval for every floor.', dAr: 'تقرير المعاين والاعتماد الشرعي والاعتماد المالي لكل طابق.' },
    { lEn: 'Roof', lAr: 'السطح', en: 'Funds are released', ar: 'يُصرف المبلغ', dEn: 'Only then is the floor’s amount released, and every investor can see it.', dAr: 'بعدها فقط يُصرف مبلغ الطابق، ويشوفه كل مستثمر.', top: true },
  ];
  const trust = [['REGA', 'الهيئة العامة للعقار', 'PropTech sandbox', 'البيئة التجريبية للتقنية العقارية'], ['Amanx', 'أمانكس', 'Shariah advisory', 'الاستشارات الشرعية'], ['Taqeem', 'تقييم', 'Accredited valuers', 'مقيّمون معتمدون'], ['Nafath', 'نفاذ', 'National sign-in', 'الدخول الوطني الموحد']];
  return <main>
    <section className="home-hero">
      <img className="hero-photo" src="assets/projects/diriyah-courtyard.webp" alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="wrap hero-inner">
      <span className="hero-eyebrow"><span className="hero-dot" />{t('Bunyan', 'بنيان')}<span className="hero-eyebrow-line" />{t('Real Estate Contributions', 'المساهمات العقارية')}</span>
      <div className="hero-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 40 }}>
          <h1 className="h-display">{t('Connecting capital to buildings.', 'نربط رأس المال بالمباني')}</h1>
          <p className="lead" style={{ maxWidth: 560 }}>{t('Bunyan is a Saudi platform that brings real estate developers, licensed financial institutions and investors together. We fund real projects through Real Estate Contributions, and every construction stage is documented before any funds are released.', 'بنيان منصة سعودية تجمع المطورين العقاريين والمؤسسات المالية المرخصة والمستثمرين في مكان واحد. نموّل مشاريع حقيقية عبر المساهمات العقارية، وكل مرحلة بناء موثقة قبل صرف أي مبلغ.')}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn-primary btn-lg" href="#interest" onClick={toInterest}>{t('Register as an investor', 'سجّل كمستثمر')}</a>
            <a className="btn btn-secondary btn-lg" href={h('build')}>{t('I am a developer', 'أنا مطور')}</a>
          </div>
        </div>
        
      </div>
      <div className="hero-bottom"><span className="hero-coordinate" dir="ltr">BUNYAN / بنيان</span><a href="#interest" onClick={toInterest} aria-label={t('Register your interest', 'سجّل اهتمامك')}><Icon name="chevron-down" size={20} /></a><span>{t('Connecting capital to buildings.', 'نربط رأس المال بالمباني.')}</span></div>
      </div>
    </section>
    <div className="wall"></div>

    <section className="sec suite-section">
      <div className="wrap suite-heading"><span className="label">{t('Bunyan', 'بنيان')}</span><h2 className="h-1">{t('Connecting capital to buildings.', 'نربط رأس المال بالمباني.')}</h2></div>
      <div className="wrap doors">
        {doors.map((d, i) => <div key={d.k} className={'door' + (d.dark ? ' dark' : '')}>
          <div className="suite-top"><span className="mono">0{i + 1}</span><Icon name={['building-2','landmark','wallet','arrow-up-right'][i]} size={28} /></div><h3 className="h-2">{t(d.en, d.ar)}</h3>
          <p className="muted">{t(d.dEn, d.dAr)}</p>
          <a className={'btn ' + (d.dark ? 'btn-accent' : 'btn-secondary')} href={h(d.to)} onClick={d.anchor ? toInterest : undefined} style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>{t(d.cEn, d.cAr)}</a>
        </div>)}
      </div>
    </section>

    <section className="sec band-sand anchor" id="interest">
      <div className="wrap split" style={{ alignItems: 'start' }}>
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <span className="label">{t('For investors', 'للمستثمرين')}</span>
          <h2 className="h-1">{t('Register your interest in upcoming opportunities', 'سجّل اهتمامك بالفرص القادمة')}</h2>
          <p className="lead">{t('We are preparing the first projects with licensed institutions. Leave your email, ticket size and the type of opportunity you want, and we will contact you when a matching one is offered.', 'نجهّز أول المشاريع مع مؤسسات مرخصة. سجّل بريدك وحجم استثمارك ونوع الفرصة اللي تهمك، ونتواصل معك أول ما تُطرح فرصة تناسبك.')}</p>
          <p className="small muted">{t('Registering is not a subscription or a commitment. Offerings are made by CMA-licensed institutions. Returns are not guaranteed.', 'التسجيل لا يعني مساهمةً ولا التزامًا. الطرح يتم عبر مؤسسات مرخصة من هيئة السوق المالية. العوائد غير مضمونة.')}</p>
        </div>
        <div className="card" style={{ padding: 24 }}><LeadForm type="investor" /></div>
      </div>
    </section>

    <section className="sec">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <div className="sec-head" style={{ marginBottom: 0 }}><span className="label">{t('Projects', 'المشاريع')}</span><h2 className="h-1">{t('Open for contribution', 'متاحة للمساهمة')}</h2></div>
          <a className="btn btn-ghost" href={h('projects')}>{t('All projects', 'كل المشاريع')}<Icon name="arrow-right" size={16} flip /></a>
        </div>
        <ProjectRail items={PROJECTS.filter((p) => p.open)} />
        <p className="small muted" style={{ marginTop: 20 }}>{t('Want to hear about new projects? ', 'تبي تعرف عن المشاريع الجديدة؟ ')}<a href="#" onClick={(e) => { e.preventDefault(); openLead('investor'); }}>{t('Register your interest', 'سجّل اهتمامك')}</a></p>
        <DemoNote />
      </div>
    </section>
    <section className="sec">
      <div className="wrap split">
        <div className="sec-head" style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <span className="label">{t('How it works', 'كيف يشتغل بنيان')}</span>
          <h2 className="h-1">{t('Built from the ground up, one floor at a time.', 'نبني من الأساس، طابقًا بعد طابق.')}</h2>
          <p className="lead">{t('No floor is funded before the one below it is documented. Read from the bottom.', 'ما يُموَّل طابق قبل توثيق الطابق اللي تحته. اقرأ من الأسفل.')}</p>
        </div>
        <div>
          <div className="parapet lg ink"></div>
          <div className="tower" style={{ marginTop: 4 }}>
            {storeys.map((s, i) => <Reveal key={i} delay={i * 120} className={'storey' + (s.top ? ' top' : '')}>
              <span className="lvl">{t(s.lEn, s.lAr)}</span>
              <h3 className="h-3">{t(s.en, s.ar)}</h3>
              <p className="small muted">{t(s.dEn, s.dAr)}</p>
            </Reveal>)}
          </div>
          <div className="plinth" style={{ height: 10 }}></div>
        </div>
      </div>
    </section>

    <RegSection band="band-sand" />

    <section style={{ paddingBlock: 40 }}>
      <div className="wrap">
        <span className="label" style={{ display: 'block', marginBottom: 16 }}>{t('Working with', 'نعمل مع')}</span>
        <div className="trust">{trust.map(([en, ar, rEn, rAr]) => <div key={en}><b>{t(en, ar)}</b><span className="small muted">{t(rEn, rAr)}</span></div>)}</div>
      </div>
    </section>

  </main>;
}

function Projects() {
  const t = useT(); const [f, setF] = React.useState('all');
  const filters = [['all', 'All', 'الكل'], ['open', 'Open for contribution', 'متاحة للمساهمة'], ['build', 'In construction', 'قيد التنفيذ']];
  const items = PROJECTS.filter((p) => f === 'all' || (f === 'open' ? p.open : !p.open));
  return <main>
    <section className="wrap" style={{ paddingBlock: '48px 24px' }}>
      <div className="sec-head" style={{ marginBottom: 24 }}>
        <span className="label">{t('Projects', 'المشاريع')}</span>
        <h1 className="h-1">{t('Projects offered through licensed institutions', 'مشاريع تطرحها مؤسسات مرخصة')}</h1>
        <p className="lead">{t('Swipe through the projects. Open one to see its floors and approvals, and to subscribe.', 'تصفّح المشاريع، وافتح أي مشروع لتشوف طوابقه واعتماداته وتساهم فيه.')}</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {filters.map(([k, en, ar]) => <button key={k} className={'btn ' + (f === k ? 'btn-ink' : 'btn-secondary')} style={{ height: 36 }} onClick={() => setF(k)}>{t(en, ar)}</button>)}
      </div>
      <ProjectRail key={f} items={items} />
    </section>
    <section className="wrap" style={{ paddingBlock: '24px 56px' }}>
      <div className="card" style={{ padding: 24, display: 'grid', gap: 16 }}>
        <span className="label">{t('Reading the floors', 'كيف تقرأ الطوابق')}</span>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
          {[['on', 'Floor approved, amount released', 'طابق معتمد وصُرف مبلغه'], ['cur', 'Floor in construction', 'طابق قيد البناء'], ['', 'Floor not started', 'طابق لم يبدأ']].map(([c, en, ar]) => <div key={c} style={{ display: 'flex', gap: 10, alignItems: 'center' }}><div className="courses" style={{ width: 40 }}><i className={c}></i></div><span className="small">{t(en, ar)}</span></div>)}
        </div>
        <p className="small muted">{t('Each offering is made by the named licensed institution under its own documents. Returns are not guaranteed.', 'كل طرح تقدّمه المؤسسة المرخصة المذكورة وفق مستنداتها. العوائد غير مضمونة.')}</p>
      </div>
      <DemoNote />
    </section>
  </main>;
}
Object.assign(window, { Home, Projects, RegSection });
