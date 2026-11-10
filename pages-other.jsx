function PageHead({ label, title, lead, children }) {
  return <section className="wrap page-head" style={{ paddingBlock: '48px 40px' }}>
    <div className="sec-head" style={{ marginBottom: 0, maxWidth: 760 }}>
      <span className="label" style={{ color: 'var(--sand-700)' }}>{label}</span>
      <h1 className="h-display">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  </section>;
}

function FormBand({ url, title, lead, cta }) {
  const t = useT(); const h = useHref();
  return <section className="sec band-card anchor" id="apply">
    <div className="wrap split" style={{ alignItems: 'center' }}>
      <div className="sec-head" style={{ marginBottom: 0 }}><h2 className="h-1">{title}</h2><p className="lead">{lead}</p></div>
      <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <a className="btn btn-primary btn-lg" href={h('apply/' + (url.includes('brokers') ? 'broker' : 'institution'))} target="_blank" rel="noopener">{cta}<Icon name="arrow-up-right" flip /></a>
        <span className="small muted">{t('The application opens in a new tab.', 'الطلب يفتح في نافذة جديدة.')}</span>
      </div>
    </div>
  </section>;
}

function Institutions() {
  const t = useT();
  return <main>
    <PageHead label={t('For licensed institutions', 'للمؤسسات المرخّصة')} title={t('Prepared files in, verified milestones out.', 'ملفات مجهّزة عند الدخول، ومراحل موثّقة بعد الإغلاق.')} lead={t('Bunyan gives CMA-licensed institutions a pipeline of prepared development projects and the operating record to manage them after close.', 'يقدّم بنيان للمؤسسات المرخّصة من هيئة السوق المالية مشاريع تطوير مجهّزة، وسجلًا تشغيليًا لإدارتها بعد الإغلاق.')}>
      <div><a className="btn btn-primary btn-lg" href="#apply" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.getElementById('apply').offsetTop - 64, behavior: 'smooth' }); }}>{t('Partner with Bunyan', 'الشراكة مع بنيان')}</a></div>
    </PageHead>
    <div className="wrap"><div className="parapet"></div></div>
    <section className="sec">
      <div className="wrap split">
        <div><span className="label">{t('Before close', 'قبل الإغلاق')}</span><h2 className="h-2" style={{ margin: '8px 0 20px' }}>{t('In Bunyan Build', 'في بنيان بيلد')}</h2>
          <Checklist items={[t('Files that have passed the Prepare and Qualify phases', 'ملفات اجتازت مرحلتي التجهيز والتأهيل'), t('Matching by ticket size, asset type and city', 'مطابقة حسب حجم الصفقة ونوع الأصل والمدينة'), t('A deal room with permissions, versions and a question log', 'غرفة صفقات بصلاحيات وإصدارات وسجل أسئلة'), t('Shariah review notes alongside the file', 'ملاحظات المراجعة الشرعية مع الملف')]} /></div>
        <div><span className="label">{t('After close', 'بعد الإغلاق')}</span><h2 className="h-2" style={{ margin: '8px 0 20px' }}>{t('In the Bunyan app', 'في تطبيق بنيان')}</h2>
          <Checklist items={[t('Subscriptions from investors who sign in with Nafath', 'اشتراكات مستثمرين يدخلون عبر نفاذ'), t('Inspector evidence and signatures for every milestone', 'أدلة المعاين وتوقيعاته لكل مرحلة'), t('Tranche approvals kept on a tamper-proof record', 'اعتماد الدفعات محفوظ في سجل موثّق لا يمكن تعديله'), t('One record shared with investors, under your offering documents', 'سجل واحد يُشارك مع المستثمرين وفق مستندات طرحك')]} /></div>
      </div>
    </section>
    <section className="sec band-sand">
      <div className="wrap">
        <div className="sec-head"><span className="label">{t('Roles stay where they belong', 'كل جهة في دورها')}</span><h2 className="h-1">{t('You offer, market and arrange. Bunyan runs the infrastructure.', 'تتولّون الطرح والتسويق والترتيب، ويدير بنيان البنية التحتية.')}</h2></div>
        <p className="lead" style={{ maxWidth: 720 }}>{t('Every offering on Bunyan carries the name of the licensed institution making it. Investor suitability, offering documents and terms remain with the institution.', 'يحمل كل طرح على بنيان اسم المؤسسة المرخّصة التي تقدّمه. وتبقى ملاءمة المستثمر ومستندات الطرح وشروطه لدى المؤسسة.')}</p>
      </div>
    </section>
    <FormBand url="https://waslcapital.netlify.app/cmi.html" cta={t('Apply for partnership', 'قدّم طلب الشراكة')} title={t('Partner with Bunyan', 'الشراكة مع بنيان')} lead={t('Tell us about your institution and mandate. We reply within three working days.', 'أخبرنا عن مؤسستك ومجال اهتمامها، وسنرد خلال ثلاثة أيام عمل.')} />
  </main>;
}

function Brokers() {
  const t = useT();
  return <main>
    <PageHead label={t('Broker programme', 'برنامج الوسطاء')} title={t('Introduce projects that are ready to be built.', 'عرّف بمشاريع جاهزة للبناء.')} lead={t('Licensed real estate brokers can refer developers and land owners to Bunyan Build and follow each referral through the track.', 'يستطيع الوسطاء العقاريون المرخّصون إحالة المطوّرين وملّاك الأراضي إلى بنيان بيلد ومتابعة كل إحالة عبر المسار.')} />
    <div className="wrap"><div className="parapet"></div></div>
    <section className="sec">
      <div className="wrap split">
        <div className="sec-head"><h2 className="h-1">{t('How the programme works', 'كيف يعمل البرنامج')}</h2></div>
        <Checklist items={[t('Register with your REGA FAL licence number.', 'سجّل برقم رخصة فال من الهيئة العامة للعقار.'), t('Refer a developer or land owner with a mid-sized real estate development project across Saudi Arabia.', 'أحِل مطوّرًا أو مالك أرض لديه مشروع تطوير عقاري متوسط الحجم في المملكة.'), t('See which stage the referral has reached.', 'تابع المرحلة التي وصلت إليها الإحالة.'), t('Referral terms are agreed in writing before the first referral.', 'تُتّفق شروط الإحالة كتابيًا قبل أول إحالة.')]} />
      </div>
    </section>
    <section className="band-sand" style={{ paddingBlock: 32 }}>
      <div className="wrap"><p className="small" style={{ maxWidth: 760 }}>{t('Brokers refer developers to Bunyan Build. Brokers do not market or arrange real estate contribution certificates to investors; that is done by CMA-licensed institutions.', 'يحيل الوسطاء المطوّرين إلى بنيان بيلد، ولا يسوّقون شهادات المساهمة العقارية للمستثمرين ولا يرتّبونها؛ إذ تتولّى ذلك مؤسسات مرخّصة من هيئة السوق المالية.')}</p></div>
    </section>
    <FormBand url="https://waslcapital.netlify.app/brokers.html" cta={t('Apply to the programme', 'قدّم على البرنامج')} title={t('Join the broker programme', 'الانضمام إلى برنامج الوسطاء')} lead={t('We verify your FAL licence before activating your account.', 'نتحقق من رخصة فال قبل تفعيل حسابك.')} />
  </main>;
}

function About() {
  const t = useT(); const h = useHref();
  return <main>
    <PageHead label={t('About Bunyan', 'عن بنيان')} title={t('We connect capital to buildings.', 'نربط رأس المال بالمباني.')} lead={t('Bunyan is a Saudi platform for real estate contributions. Developers prepare their projects on Bunyan, CMA-licensed institutions offer them, and investors take part with amounts they could not commit to a whole building on their own.', 'بنيان منصة سعودية للمساهمات العقارية. يجهّز المطوّرون مشاريعهم على بنيان، وتطرحها مؤسسات مرخّصة من هيئة السوق المالية، ويشارك المستثمرون بمبالغ ما كانوا ليستطيعوا بها تمويل مبنى كامل وحدهم.')} />
    <div className="wrap"><div className="parapet lg"></div></div>
    <section className="sec" style={{ paddingTop: 40 }}>
      <div className="wrap split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="label">{t('Within existing law', 'ضمن الأنظمة القائمة')}</span>
          <h2 className="h-1">{t('Built on the real estate contributions framework', 'قائم على إطار المساهمات العقارية')}</h2>
          <p className="lead">{t('Bunyan does not create a new kind of investment. It runs the technology for real estate contributions as they already exist under the rules of the Real Estate General Authority (REGA) and the Capital Market Authority (CMA).', 'لا يبتكر بنيان نوعًا جديدًا من الاستثمار، بل يشغّل التقنية للمساهمات العقارية كما هي قائمة وفق أنظمة الهيئة العامة للعقار وهيئة السوق المالية.')}</p>
        </div>
        <div className="card" style={{ padding: 4 }}>
          {[['REGA', 'الهيئة العامة للعقار', 'Real estate contributions rules. Bunyan participates in the REGA PropTech sandbox.', 'أنظمة المساهمات العقارية. ويشارك بنيان في البيئة التجريبية للتقنية العقارية لدى الهيئة.'], ['CMA', 'هيئة السوق المالية', 'Offering, marketing and arranging of real estate contribution certificates by licensed institutions.', 'طرح شهادات المساهمة العقارية وتسويقها وترتيبها عبر مؤسسات مرخّصة.']].map(([en, ar, dEn, dAr]) => <div key={en} style={{ display: 'grid', gridTemplateColumns: '72px minmax(0,1fr)', gap: 16, padding: 20, borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
            <div style={{ height: 56, background: 'var(--sand-50)', borderRadius: 'var(--radius-sm)', display: 'grid', placeItems: 'center', fontWeight: 600, color: 'var(--bronze-700)' }}>{en}</div>
            <div><b style={{ display: 'block' }}>{t(en === 'REGA' ? 'Real Estate General Authority' : 'Capital Market Authority', ar)}</b><span className="small muted">{t(dEn, dAr)}</span></div>
          </div>)}
        </div>
      </div>
    </section>
    <section className="sec band-card">
      <div className="wrap split">
        <div className="sec-head"><span className="label">{t('How we work', 'كيف نعمل')}</span><h2 className="h-1">{t('Every riyal follows what has been built', 'كل ريال يتبع ما بُني فعلًا')}</h2></div>
        <Checklist items={[t('Developers prepare a complete readiness file before any institution sees it.', 'يجهّز المطوّر ملف جاهزية مكتملًا قبل أن تطّلع عليه أي مؤسسة.'), t('A CMA-licensed institution decides whether to offer the project, and makes the offer.', 'تقرّر مؤسسة مرخّصة من هيئة السوق المالية طرح المشروع، وتتولّى الطرح.'), t('Independent inspectors and a Shariah advisor approve each floor.', 'يعتمد معاينون مستقلون ومستشار شرعي كل طابق.'), t('Capital is released only after sign-off, and every release is kept on a record that cannot be edited.', 'لا يُصرف رأس المال إلا بعد الاعتماد، ويُحفظ كل صرف في سجل لا يمكن تعديله.')]} />
      </div>
    </section>
    <section className="sec">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <h2 className="h-2">{t('Contact', 'تواصل معنا')}</h2>
        <a className="h-2" href="mailto:info@bunyan.capital" style={{ fontFamily: 'Sora', direction: 'ltr' }}>info@bunyan.capital</a>
      </div>
    </section>
  </main>;
}

function Privacy() {
  const t = useT();
  const secs = [
    [t('Who we are', 'من نحن'), t('Bunyan operates bunyan.capital and is the controller of personal data collected through this website.', 'يشغّل بنيان موقع bunyan.capital، وهو المتحكم في البيانات الشخصية التي تُجمع عبره.')],
    [t('What we collect', 'ما نجمعه'), t('Data you enter in our forms: name, contact details, city, licence numbers and your message. Sign-in to the apps uses Nafath; we receive the identity attributes Nafath shares.', 'البيانات التي تدخلها في النماذج: الاسم وبيانات التواصل والمدينة وأرقام التراخيص ورسالتك. ويتم الدخول إلى التطبيقات عبر نفاذ، ونستلم بيانات الهوية التي يشاركها نفاذ.')],
    [t('Why we use it', 'لماذا نستخدمها'), t('To respond to your request, verify licences, and operate the services you sign up for. We process form data on the basis of your consent.', 'للرد على طلبك والتحقق من التراخيص وتشغيل الخدمات التي تشترك فيها. ونعالج بيانات النماذج بناءً على موافقتك.')],
    [t('Where it is stored', 'أين تُحفظ'), t('In a single database hosted for Bunyan. We do not sell personal data.', 'في قاعدة بيانات واحدة مستضافة لبنيان. ولا نبيع البيانات الشخصية.')],
    [t('Your rights', 'حقوقك'), t('Under the Personal Data Protection Law you may request access, correction or deletion, and withdraw consent at any time by writing to privacy@bunyan.capital.', 'وفق نظام حماية البيانات الشخصية يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها، وسحب موافقتك في أي وقت بالكتابة إلى privacy@bunyan.capital.')],
  ];
  return <main>
    <PageHead label={t('Privacy notice', 'إشعار الخصوصية')} title={t('How Bunyan handles personal data', 'كيف يتعامل بنيان مع البيانات الشخصية')} lead={t('Draft for legal review. Version privacy-2026-10.', 'مسودة للمراجعة القانونية. الإصدار privacy-2026-10.')} />
    <section className="wrap" style={{ paddingBottom: 72 }}>
      <div className="list" style={{ maxWidth: 820 }}>{secs.map(([h, p], i) => <div key={i} style={{ gridTemplateColumns: '1fr', gap: 6, paddingBlock: 20 }}><h2 className="h-3">{h}</h2><p className="muted">{p}</p></div>)}</div>
    </section>
  </main>;
}
Object.assign(window, { Institutions, Brokers, About, Privacy, PageHead });

function ApplicationPage({type}) {
  const t = useT(); const cfg = LEAD_TYPES[type] || LEAD_TYPES.investor;
  return <main><PageHead label={t('Bunyan', 'بنيان')} title={t(cfg.en, cfg.ar)} /><section className="sec"><div className="wrap" style={{maxWidth:800}}><div className="card" style={{padding:30}}><LeadForm type={LEAD_TYPES[type] ? type : 'investor'} /></div></div></section></main>;
}
