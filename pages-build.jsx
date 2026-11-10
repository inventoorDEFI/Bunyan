const PHASES = [
  { en: 'Prepare', ar: 'التجهيز', stages: [['Company profile', 'ملف الشركة', 'Registration, ownership, team and past projects.', 'السجل والملكية والفريق والمشاريع السابقة.'], ['Land and title', 'الأرض والصك', 'Title deed or lease, survey and zoning.', 'الصك أو عقد الإيجار والرفع المساحي والتصنيف.'], ['Permits and approvals', 'التراخيص والموافقات', 'Building permit, Balady and utility approvals.', 'رخصة البناء وبلدي وموافقات الخدمات.'], ['Design and cost plan', 'التصاميم وخطة التكاليف', 'Drawings, bill of quantities and contractor.', 'المخططات وجدول الكميات والمقاول.']] },
  { en: 'Qualify', ar: 'التأهيل', stages: [['Feasibility study', 'دراسة الجدوى', 'Market, sales or lease plan, cash flow.', 'السوق وخطة البيع أو التأجير والتدفقات النقدية.'], ['Independent valuation', 'التقييم المستقل', 'Valuation by a Taqeem-accredited valuer.', 'تقييم من مقيّم معتمد لدى تقييم.'], ['Readiness score', 'درجة الجاهزية', 'Gaps listed with what to fix before review.', 'قائمة بالنواقص وما يلزم إصلاحه قبل المراجعة.']] },
  { en: 'Review', ar: 'المراجعة', stages: [['Data room', 'غرفة البيانات', 'One controlled file shared with selected partners.', 'ملف واحد مضبوط يُشارك مع شركاء مختارين.'], ['Partner matching', 'مطابقة الشركاء', 'Matched to licensed partners by size, type and city.', 'مطابقة مع شركاء مرخّصين حسب الحجم والنوع والمدينة.'], ['Institutional and Shariah review', 'المراجعة المؤسسية والشرعية', 'Questions and answers on the record, in one place.', 'الأسئلة والإجابات موثّقة في مكان واحد.']] },
  { en: 'Execute', ar: 'التنفيذ', stages: [['Terms and close', 'الشروط والإغلاق', 'Term sheet, documents and milestone schedule agreed.', 'الاتفاق على ورقة الشروط والمستندات وجدول المراحل.']] },
];

function Track() {
  const t = useT(); const [sel, setSel] = React.useState(null); let n = 0;
  return <div>
    <div className="track">
      {PHASES.map((ph, pi) => <div key={pi} className="track-col" style={{ '--step': pi }}>
        <div className="track-head"><span className="label" style={{ color: 'var(--sand-700)' }}>{t('Phase', 'المرحلة')} {t(String(pi + 1), arNum(pi + 1))}</span><h3 className="h-3">{t(ph.en, ph.ar)}</h3></div>
        <div className="track-floors">
          {ph.stages.map((s) => { n++; const id = n; return <button key={id} className={'floor ' + (sel === id ? 'current' : pi === 3 ? 'released' : 'verified')} onClick={() => setSel(sel === id ? null : id)} style={{ gridTemplateColumns: '32px minmax(0,1fr)' }}>
            <span className="fl-n">{String(id).padStart(2, '0')}</span>
            <span><span className="fl-t" style={{ display: 'block' }}>{t(s[0], s[1])}</span>{sel === id && <span className="fl-s" style={{ display: 'block', marginTop: 4, fontSize: 13 }}>{t(s[2], s[3])}</span>}</span>
          </button>; })}
        </div>
        <div className="pedestal"></div>
      </div>)}
    </div>
    <div className="plinth" style={{ height: 8 }}></div>
    <p className="small muted" style={{ marginTop: 12 }}>{t('Select a stage to see what it covers.', 'اختر مرحلة لترى ما تشمله.')}</p>
  </div>;
}

function Timeline() {
  const t = useT();
  const rows = [
    { en: 'Today', ar: 'اليوم', total: 60, segs: [[16, 'Preparation', 'التجهيز'], [14, 'Finding a partner', 'البحث عن شريك'], [18, 'Due diligence', 'الفحص النافي للجهالة'], [12, 'Structuring and close', 'الهيكلة والإغلاق']] },
    { en: 'With Bunyan Build', ar: 'مع بنيان بيلد', total: 20, segs: [[6, 'Preparation', 'التجهيز'], [3, 'Matching', 'المطابقة'], [7, 'Review', 'المراجعة'], [4, 'Close', 'الإغلاق']], good: true },
  ];
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
    {rows.map((r, i) => <div key={i}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>{t(r.en, r.ar)}</span>
        <span><span style={{ fontSize: 28, fontWeight: 600, color: r.good ? 'var(--teal-600)' : 'var(--ink-900)' }}>{t('~' + r.total, '~' + arNum(r.total))}</span> <span className="muted small">{t('weeks', 'أسبوعًا')}</span></span>
      </div>
      <div style={{ display: 'flex', gap: 3, width: (r.total / 60 * 100) + '%', minWidth: 120 }}>
        {r.segs.map(([w, en, ar], j) => <div key={j} style={{ flex: w, minWidth: 0 }}>
          <div style={{ height: 28, borderRadius: 2, background: r.good ? (j % 2 ? 'var(--teal-700)' : 'var(--teal-600)') : (j % 2 ? 'var(--line-strong)' : 'var(--slate-300)') }}></div>
          <div className="small muted tl-lbl" style={{ marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t(en, ar)}</div>
        </div>)}
      </div>
    </div>)}
    <p className="small muted">{t('Indicative, for a SAR 50M project in Riyadh. Actual timing depends on the project and the institution.', 'تقديري لمشروع بقيمة ٥٠ مليون ريال في الرياض. يختلف التوقيت الفعلي حسب المشروع والمؤسسة.')}</p>
  </div>;
}

function Build() {
  const t = useT(); const openSignIn = React.useContext(SignInCtx);
  return <main>
    <section className="band-ink">
      <div className="wrap split" style={{ paddingBlock: '48px 0', alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 48 }}>
          <span className="label">{t('Bunyan Build', 'بنيان بيلد')}</span>
          <h1 className="h-display">{t('Get your project ready for capital', 'جهّز مشروعك للتمويل')}</h1>
          <p className="lead">{t('Bunyan Build prepares the developer for the offering and connects them with licensed financial institutions. After the offering, investors follow the project stage by stage in the Bunyan app.', 'بنيان بيلد يجهّز المطور للطرح ويربطه بالمؤسسات المالية المرخصة. بعد الطرح، يتابع المستثمرون المشروع مرحلة بمرحلة عبر تطبيق بنيان.')}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><PrepareBtn cls="btn btn-accent btn-lg" /></div>
        </div>
        <NajdiMotif stroke="var(--sand-500)" wall="var(--ink-700)" tower="var(--ink-900)" accent="var(--sand-500)" style={{ maxWidth: 640, marginInline: 'auto' }} />
      </div>
      <div className="parapet lg paper"></div>
    </section>

    <section className="sec">
      <div className="wrap">
        <div className="sec-head"><span className="label">{t('What you get', 'وش تحصل')}</span><h2 className="h-1">{t('One complete file, one review, a shorter path to close', 'ملف واحد مكتمل، ومراجعة واحدة، وطريق أقصر للإغلاق')}</h2></div>
        <div className="split">
          <div><h3 className="h-3" style={{ marginBottom: 16 }}>{t('Developers', 'المطورون')}</h3>
            <Checklist items={[t('A guided checklist that tells you which document is needed and why.', 'قائمة واضحة تقول لك وش المستند المطلوب وليش.'), t('A readiness score with the gaps to close before review.', 'درجة جاهزية توضّح النواقص قبل المراجعة.'), t('One data room shared with the institutions you choose.', 'غرفة بيانات وحدة تشاركها مع المؤسسات اللي تختارها.'), t('Clear status at every stage, with the next step named.', 'حالة واضحة لكل مرحلة والخطوة الجاية محددة.')]} /></div>
          <div><h3 className="h-3" style={{ marginBottom: 16 }}>{t('Licensed institutions', 'المؤسسات المرخصة')}</h3>
            <Checklist items={[t('Prepared files in one structure, easy to compare.', 'ملفات مجهّزة بهيكل واحد وسهلة المقارنة.'), t('Valuation and permits checked before you open the file.', 'التقييم والتراخيص متحقق منها قبل ما تفتح الملف.'), t('Questions, answers and Shariah notes in one place.', 'الأسئلة والأجوبة والملاحظات الشرعية في مكان واحد.'), t('Floor-by-floor approvals after close.', 'اعتمادات طابق بطابق بعد الإغلاق.')]} /></div>
        </div>
        <div className="card" style={{ padding: 24, marginTop: 40 }}>
          <span className="label" style={{ display: 'block', marginBottom: 20 }}>{t('Time to close', 'مدة الإغلاق')}</span>
          <Timeline />
        </div>
      </div>
    </section>

    <section className="sec band-card">
      <div className="wrap">
        <div className="sec-head"><span className="label">{t('The track', 'المسار')}</span><h2 className="h-1">{t('11 stages in 4 phases', '١١ مرحلة في ٤ أقسام')}</h2><p className="lead">{t('Each phase sits on the one before it. Institutions see the file only after Prepare and Qualify are complete.', 'كل قسم مبني على اللي قبله، والمؤسسات ما تشوف الملف إلا بعد اكتمال التجهيز والتأهيل.')}</p></div>
        <Track />
      </div>
    </section>

    <section className="sec">
      <div className="wrap split">
        <div className="sec-head"><span className="label">{t('Readiness score', 'درجة الجاهزية')}</span><h2 className="h-1">{t('Know where your project stands before an institution does', 'اعرف وين وصل مشروعك قبل ما تشوفه المؤسسة')}</h2><p className="lead">{t('The score is built from six areas. Each missing requirement is listed with what to do next.', 'الدرجة مبنية على ست محاور، وكل متطلب ناقص مذكور مع الخطوة المطلوبة.')}</p></div>
        <div className="card" style={{ padding: 20 }}><ReadinessBars score={74} /></div>
      </div>
    </section>

    <section className="sec band-sand">
      <div className="wrap split">
        <div className="sec-head"><span className="label">{t('After the raise', 'بعد الطرح')}</span><h2 className="h-1">{t('Funds are released floor by floor', 'المبالغ تُصرف طابق بطابق')}</h2>
          <p className="lead">{t('Each floor needs an inspector report, a Shariah approval and a financial approval before its amount is released.', 'كل طابق يحتاج تقرير معاين واعتماد شرعي واعتماد مالي قبل صرف مبلغه.')}</p></div>
        <div className="card" style={{ padding: 20 }}><FloorLedger p={PROJECTS[0]} openFirst /></div>
      </div>
    </section>

    <section className="sec">
      <div className="wrap split">
        <div className="sec-head"><span className="label">{t('Who it is for', 'لمن بنيان بيلد')}</span><h2 className="h-1">{t('Mid-sized real estate development projects across Saudi Arabia', 'مشاريع تطوير عقاري متوسطة الحجم في المملكة')}</h2></div>
        <Checklist items={[t('Developers with a title deed or long-term lease', 'مطورون عندهم صك أو عقد إيجار طويل'), t('Residential, office, hospitality and mixed-use projects', 'مشاريع سكنية ومكتبية وفندقية ومتعددة الاستخدام'), t('Projects with design and permits under way', 'مشاريع بدأت تصاميمها وتراخيصها'), t('Institutions licensed by the Capital Market Authority', 'مؤسسات مرخصة من هيئة السوق المالية')]} />
      </div>
    </section>

    <RegSection />

    <section className="band-ink">
      <div className="parapet lg paper" style={{ transform: 'scaleY(-1)' }}></div>
      <div className="wrap" style={{ paddingBlock: 56, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <h2 className="h-1">{t('Apply with your project', 'قدّم مشروعك')}</h2>
        <p className="lead" style={{ maxWidth: 620 }}>{t('The application has about 80 questions and opens in a new tab. Our team reviews it and contacts you by email.', 'الطلب فيه حوالي ٨٠ سؤال ويفتح في نافذة جديدة. يراجعه فريقنا ويتواصل معك عبر البريد.')}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><PrepareBtn cls="btn btn-accent btn-lg" /></div>
        <a href="mailto:info@bunyan.capital" dir="ltr" style={{ color: 'var(--sand-500)' }}>info@bunyan.capital</a>
      </div>
    </section>
  </main>;
}
Object.assign(window, { Build, PHASES });
