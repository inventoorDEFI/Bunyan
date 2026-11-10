const OPPS = [{ id: 'najd', fit: 92, st: 'dd' }, { id: 'coral', fit: 85, st: 'review' }, { id: 'khobar', fit: 78, st: 'new' }, { id: 'diriyah', fit: 71, st: 'saved' }];
const OPP_ST = { new: ['New', 'جديدة', 'b-pending'], saved: ['Saved', 'محفوظة', 'b-neutral'], review: ['Under review', 'قيد المراجعة', 'b-neutral'], interest: ['Interest expressed', 'تم إبداء الاهتمام', 'b-success'], dd: ['Due diligence', 'الفحص النافي للجهالة', 'b-success'], capital: ['Capital process', 'إجراءات الطرح', 'b-success'] };
const FIT = [['Geography: Riyadh', 'النطاق الجغرافي: الرياض', 1], ['Asset class: office', 'فئة الأصل: مكاتب', 1], ['Ticket within SAR 50M–250M', 'الحجم ضمن ٥٠–٢٥٠ مليون ريال', 1], ['Risk within appetite', 'المخاطر ضمن الحد المقبول', 1], ['Readiness score 80 or more', 'درجة جاهزية ٨٠ أو أكثر', 1], ['Valuation under six months old', 'تقييم عمره أقل من ستة أشهر', 1], ['Shariah structure approved', 'الهيكل الشرعي معتمد', 1], ['Contribution manager appointed', 'تعيين مدير المساهمة', 0]];
const DD = [['Legal', 'القانونية', 90, 'Lease registration confirmation', 'تأكيد تسجيل الإيجار'], ['Technical', 'الفنية', 86, 'Geotechnical report sign-off', 'اعتماد تقرير التربة'], ['Financial', 'المالية', 78, 'Downside scenario review', 'مراجعة السيناريو المتحفظ'], ['Market', 'السوق', 88, null], ['Shariah', 'الشرعية', 100, null], ['Valuation', 'التقييم', 56, 'Valuation refresh', 'تحديث التقييم']];

function CmiDeal({ o, onState, back }) {
  const t = useT(); const d = DEV_PROJECTS.find((x) => x.id === o.id);
  const [tab, setTab] = React.useState('overview'); const [why, setWhy] = React.useState(false);
  const [qa, setQa] = React.useState([['Is the building permit final?', 'هل رخصة البناء نهائية؟', 'Yes, issued 2026-06-02. See Documents.', 'نعم، صدرت في ٢٠٢٦-٠٦-٠٢. راجع المستندات.']]); const [ask, setAsk] = React.useState('');
  const ddPct = 83;
  const tabs = [['overview', 'Overview', 'نظرة عامة'], ['case', 'Investment case', 'الأطروحة الاستثمارية'], ['fin', 'Financials', 'المالية'], ['prop', 'Property', 'العقار'], ['dd', 'Due diligence', 'الفحص النافي للجهالة'], ['risk', 'Risk', 'المخاطر'], ['gov', 'Governance', 'الحوكمة'], ['docs', 'Documents', 'المستندات'], ['qa', 'Q&A', 'الأسئلة'], ['act', 'Activity', 'النشاط']];
  const next = { new: [['review', 'Start review', 'ابدأ المراجعة']], saved: [['review', 'Start review', 'ابدأ المراجعة']], review: [['interest', 'Express interest', 'أبدِ الاهتمام']], interest: [['dd', 'Start due diligence', 'ابدأ الفحص']], dd: [['capital', 'Start capital process', 'ابدأ إجراءات الطرح']], capital: [] }[o.st];
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <button className="crumb" style={{ background: 'none', border: 0, cursor: 'pointer', padding: 0, font: 'inherit' }} onClick={back}><Icon name="arrow-left" size={16} flip />{t('Opportunity register', 'سجل الفرص')}</button>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {d.img && <div className="media" style={{ width: 96, height: 72, borderRadius: 'var(--radius-md)', flex: 'none' }}><Photo src={d.img} alt="" /></div>}
      <div style={{ flex: 1, minWidth: 220 }}><span className="label">{t('Deal room', 'غرفة الصفقة')} · {t(d.cityEn, d.cityAr)}</span><h1 className="h-1">{t(d.en, d.ar)}</h1></div>
      <span className={'badge ' + OPP_ST[o.st][2]}>{t(OPP_ST[o.st][0], OPP_ST[o.st][1])}</span>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button className="btn btn-secondary" onClick={() => setTab('qa')}><Icon name="message-square" size={16} />{t('Request clarification', 'طلب توضيح')}</button>
      {o.st === 'new' && <button className="btn btn-secondary" onClick={() => onState('saved')}><Icon name="bookmark" size={16} />{t('Save opportunity', 'حفظ الفرصة')}</button>}
      {next.map(([s, en, ar]) => <button key={s} className="btn btn-primary" onClick={() => onState(s)}>{t(en, ar)}</button>)}
    </div>
    <Tabs items={tabs} at={tab} onChange={setTab} />
    {tab === 'overview' && <div className="split" style={{ gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KVG rows={[[t('Capital required', 'رأس المال المطلوب'), 'SAR ' + d.cap + 'M', 1], [t('Readiness', 'الجاهزية'), d.score + '/100', 1], [t('Asset type', 'نوع الأصل'), t(d.typeEn, d.typeAr)], [t('Risk', 'المخاطر'), t(RISK[d.risk][0], RISK[d.risk][1])]]} />
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="label">{t('Due diligence', 'الفحص النافي للجهالة')}</span><span className="mono">{ddPct}%</span></div>
          <div className="meter"><i style={{ width: ddPct + '%' }}></i></div>
          <button className="btn btn-ghost" style={{ alignSelf: 'flex-start', height: 32 }} onClick={() => setTab('dd')}>{t('See open items', 'البنود المفتوحة')}</button>
        </div>
      </div>
      <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span className="label">{t('Mandate fit', 'التوافق مع التوجه')}</span><span style={{ fontSize: 32, fontWeight: 600, color: 'var(--teal-700)' }}>{t(o.fit + '% fit', arNum(o.fit) + '٪ توافق')}</span></div>
        <button className="btn btn-secondary" style={{ alignSelf: 'flex-start', height: 34 }} onClick={() => setWhy(!why)}>{why ? t('Hide explanation', 'إخفاء التوضيح') : t('Explain this score', 'وضّح الدرجة')}</button>
        {why && <p className="small muted">{t('Seven of eight mandate criteria are met. Each criterion is weighted by your mandate; the missing contribution manager carries the lowest weight.', 'تحققت ٧ من ٨ معايير. كل معيار له وزن حسب توجهكم، وتعيين مدير المساهمة الناقص أقلها وزنًا.')}</p>}
        <div className="list">{FIT.map(([en, ar, ok]) => <div key={en}><Icon name={ok ? 'circle-check' : 'circle-dashed'} style={{ color: ok ? 'var(--teal-600)' : 'var(--sand-700)' }} /><span>{t(en, ar)}</span></div>)}</div>
      </div>
    </div>}
    {tab === 'case' && <Checklist items={[t('Grade A office demand in North Riyadh exceeds new supply through 2028.', 'الطلب على مكاتب الفئة (أ) في شمال الرياض يفوق المعروض الجديد حتى ٢٠٢٨.'), t('Pre-leasing letters of intent cover 38% of net lettable area.', 'خطابات نوايا التأجير المسبق تغطي ٣٨٪ من المساحة القابلة للتأجير.'), t('Developer has delivered four comparable projects on time.', 'المطور سلّم ٤ مشاريع مشابهة في وقتها.'), t('Floor-by-floor release limits capital exposed ahead of construction.', 'الصرف طابق بطابق يقلّل رأس المال المعرّض قبل التنفيذ.')]} />}
    {tab === 'fin' && <KVG rows={finRows(d, t)} />}
    {tab === 'prop' && <KVG rows={propRows(d, t)} />}
    {tab === 'dd' && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>{t('Overall progress', 'التقدم العام')}</b><span className="mono">{ddPct}%</span></div><div className="meter"><i style={{ width: ddPct + '%' }}></i></div>
      <div className="card" style={{ padding: 4 }}>{DD.map(([en, ar, v, oEn, oAr]) => <div key={en} className="docrow" style={{ cursor: 'default', flexWrap: 'wrap' }}><span style={{ flex: '0 0 110px', fontWeight: 500 }}>{t(en, ar)}</span><div className={'meter' + (v < 65 ? ' low' : v < 80 ? ' warn' : '')} style={{ flex: '1 1 120px' }}><i style={{ width: v + '%' }}></i></div><span className="mono" style={{ width: 40, textAlign: 'end' }}>{v}%</span><span className="small" style={{ flex: '1 1 100%', color: oEn ? 'var(--sand-700)' : 'var(--teal-700)' }}>{oEn ? t('Open: ' + oEn, 'مفتوح: ' + oAr) : t('Complete', 'مكتمل')}</span></div>)}</div>
    </div>}
    {tab === 'risk' && <div className="card" style={{ padding: 20 }}><RiskGrid /></div>}
    {tab === 'gov' && <GovMatrix />}
    {tab === 'docs' && <DocRegister d={d} />}
    {tab === 'qa' && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{qa.map(([q, qa_, a, aa], i) => <div key={i} className="card" style={{ padding: 16, display: 'grid', gap: 6 }}><b style={{ fontWeight: 500 }}>{t(q, qa_)}</b><span className="small muted">{a ? t(a, aa) : t('Waiting for the developer’s answer', 'بانتظار رد المطور')}</span></div>)}
      <div style={{ display: 'flex', gap: 8 }}><input className="inp" placeholder={t('Ask the developer', 'اسأل المطور')} value={ask} onChange={(e) => setAsk(e.target.value)} /><button className="btn btn-primary" disabled={!ask} onClick={() => { setQa([...qa, [ask, ask, '', '']]); setAsk(''); }}>{t('Send', 'إرسال')}</button></div></div>}
    {tab === 'act' && <Activity items={[['2026-10-22', 'Due diligence reached 83%', 'وصل الفحص إلى ٨٣٪'], ['2026-10-15', 'Shariah review completed', 'اكتملت المراجعة الشرعية'], ['2026-10-02', 'Data room opened to your team', 'فُتحت غرفة البيانات لفريقكم'], ['2026-09-27', 'Opportunity matched to your mandate', 'مطابقة الفرصة مع توجهكم']]} />}
  </div>;
}

function CmiWorkspace() {
  const t = useT(); const [sel, setSel] = React.useState(null); const [st, setSt] = React.useState(Object.fromEntries(OPPS.map((o) => [o.id, o.st])));
  const list = OPPS.map((o) => ({ ...o, st: st[o.id] }));
  const closing = <p className="small" style={{ padding: 14, background: 'var(--sand-50)', borderRadius: 'var(--radius-md)' }}>{t('Bunyan provides the operating infrastructure. Regulated activities are executed by licensed participants. Bunyan does not hold or receive participant capital.', 'يوفّر بنيان البنية التشغيلية. الأنشطة المنظمة تنفذها الأطراف المرخصة. بنيان لا يستلم أموال الأطراف ولا يحتفظ بها.')}</p>;
  if (sel) return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><CmiDeal o={list.find((x) => x.id === sel)} onState={(s) => setSt({ ...st, [sel]: s })} back={() => setSel(null)} />{closing}</div>;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div><span className="label">{t('Licensed institution workspace', 'مساحة المؤسسة المرخصة')}</span><h1 className="h-1">{t('Opportunities', 'الفرص')}</h1></div>
    <div className="card band-ink" style={{ padding: 20, border: 0, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))' }}>
      {[['Geography', 'النطاق الجغرافي', 'Riyadh, Jeddah, Eastern Province', 'الرياض، جدة، الشرقية'], ['Asset classes', 'فئات الأصول', 'Office, hospitality, residential', 'مكاتب، ضيافة، سكني'], ['Ticket range', 'حجم الصفقة', 'SAR 50M–250M', '٥٠–٢٥٠ مليون ريال'], ['Risk appetite', 'تقبّل المخاطر', 'Moderate', 'متوسط']].map(([en, ar, vEn, vAr]) => <div key={en}><span className="label">{t(en, ar)}</span><div style={{ fontWeight: 500, marginTop: 4, color: 'var(--white-warm)' }}>{t(vEn, vAr)}</div></div>)}
    </div>
    <h2 className="h-2">{t('Opportunity register', 'سجل الفرص')}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{list.map((o) => { const d = DEV_PROJECTS.find((x) => x.id === o.id); return <button key={o.id} className="role" style={{ gridTemplateColumns: '64px minmax(0,1fr) auto' }} onClick={() => setSel(o.id)}>
      <span className="ri" style={{ width: 64, height: 48, fontWeight: 600, color: 'var(--teal-700)', background: 'var(--teal-50)' }}>{t(o.fit + '%', arNum(o.fit) + '٪')}</span>
      <span style={{ display: 'grid', gap: 4 }}><span style={{ fontWeight: 600 }}>{t(d.en, d.ar)}</span><span className="small muted" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><span className="mono">SAR {d.cap}M</span><span>{t('Readiness', 'الجاهزية')} {d.score}/100</span><span>{t(RISK[d.risk][0], RISK[d.risk][1])}</span></span></span>
      <span className={'badge ' + OPP_ST[o.st][2]}>{t(OPP_ST[o.st][0], OPP_ST[o.st][1])}</span>
    </button>; })}</div>
    <p className="small muted">{t('Fit is the share of your mandate criteria each project meets.', 'نسبة التوافق هي نسبة معايير توجهكم اللي يحققها كل مشروع.')}</p>
    {closing}
  </div>;
}
Object.assign(window, { CmiWorkspace });
