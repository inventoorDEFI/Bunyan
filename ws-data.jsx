const DEV_PROJECTS = [
  { id: 'diriyah', en: 'Diriyah Courtyard Executive Centre', ar: 'مركز فناء الدرعية التنفيذي', cityEn: 'Riyadh', cityAr: 'الرياض', typeEn: 'Office', typeAr: 'مكاتب', cap: 120, score: 74, risk: 'moderate', proc: 1, stEn: 'Readiness assessment', stAr: 'تقييم الجاهزية', nxEn: 'Resolve 6 requirements', nxAr: 'استكمال ٦ متطلبات', img: (window.BUNYAN_IMG || {})['diriyah-courtyard'] },
  { id: 'najd', en: 'Najd Horizon Business Centre', ar: 'مركز أفق نجد للأعمال', cityEn: 'Riyadh', cityAr: 'الرياض', typeEn: 'Office', typeAr: 'مكاتب', cap: 186, score: 88, risk: 'low', proc: 2, stEn: 'Institutional review', stAr: 'المراجعة المؤسسية', nxEn: 'Answer 2 institution questions', nxAr: 'الرد على سؤالين من المؤسسة', img: (window.BUNYAN_IMG || {})['najd-horizon'], ready: true },
  { id: 'coral', en: 'Coral Gate Business Hotel', ar: 'فندق بوابة المرجان للأعمال', cityEn: 'Jeddah', cityAr: 'جدة', typeEn: 'Hospitality', typeAr: 'ضيافة', cap: 210, score: 86, risk: 'moderate', proc: 2, stEn: 'Institutional review', stAr: 'المراجعة المؤسسية', nxEn: 'Upload revised cost plan', nxAr: 'رفع خطة التكاليف المحدّثة', img: (window.BUNYAN_IMG || {})['coral-gate'], ready: true },
  { id: 'khobar', en: 'Khobar Marina Business Hotel', ar: 'فندق مارينا الخبر للأعمال', cityEn: 'Al Khobar', cityAr: 'الخبر', typeEn: 'Hospitality', typeAr: 'ضيافة', cap: 168, score: 84, risk: 'moderate', proc: 2, stEn: 'Institutional review', stAr: 'المراجعة المؤسسية', nxEn: 'Confirm contractor terms', nxAr: 'تأكيد شروط المقاول', img: (window.BUNYAN_IMG || {})['khobar-marina'], ready: true },
  { id: 'asir', en: 'Asir Heights Conference Hotel', ar: 'فندق مرتفعات عسير للمؤتمرات', cityEn: 'Abha', cityAr: 'أبها', typeEn: 'Hospitality', typeAr: 'ضيافة', cap: 240, score: 63, risk: 'elevated', proc: 1, stEn: 'Readiness assessment', stAr: 'تقييم الجاهزية', nxEn: 'Update the feasibility study', nxAr: 'تحديث دراسة الجدوى', img: (window.BUNYAN_IMG || {})['asir-heights'] },
  { id: 'yasmin', en: 'Al Yasmin Residences', ar: 'مساكن الياسمين', cityEn: 'Riyadh', cityAr: 'الرياض', typeEn: 'Residential', typeAr: 'سكني', cap: 95, score: 58, risk: 'moderate', proc: 0, stEn: 'Project preparation', stAr: 'تجهيز المشروع', nxEn: 'Upload title deed', nxAr: 'رفع صك الأرض' },
  { id: 'safa', en: 'Al Safa Gardens', ar: 'حدائق الصفا', cityEn: 'Jeddah', cityAr: 'جدة', typeEn: 'Residential', typeAr: 'سكني', cap: 72, score: 52, risk: 'moderate', proc: 0, stEn: 'Project preparation', stAr: 'تجهيز المشروع', nxEn: 'Add permit documents', nxAr: 'إضافة مستندات التراخيص' },
  { id: 'nakheel', en: 'Al Nakheel Logistics Park', ar: 'مجمع النخيل اللوجستي', cityEn: 'Dammam', cityAr: 'الدمام', typeEn: 'Logistics', typeAr: 'لوجستي', cap: 149, score: 47, risk: 'elevated', proc: 0, stEn: 'Project preparation', stAr: 'تجهيز المشروع', nxEn: 'Complete company profile', nxAr: 'إكمال ملف الشركة' },
];
const RISK = { low: ['Low risk', 'مخاطر منخفضة', 'b-success'], moderate: ['Moderate risk', 'مخاطر متوسطة', 'b-pending'], elevated: ['Elevated risk', 'مخاطر مرتفعة', 'b-danger'] };
function RiskBadge({ r }) { const t = useT(); return <span className={'badge ' + RISK[r][2]}>{t(RISK[r][0], RISK[r][1])}</span>; }

const PROCESS = [
  ['Project preparation', 'تجهيز المشروع', 'Developer, Bunyan', 'المطور، بنيان', 'Title deed, permits, design, company profile', 'الصك، التراخيص، التصاميم، ملف الشركة', 'Complete the readiness file', 'إكمال ملف الجاهزية'],
  ['Capital readiness', 'الجاهزية للتمويل', 'Developer, accredited valuer', 'المطور، المقيّم المعتمد', 'Valuation, feasibility study, readiness score of 80 or more', 'التقييم، دراسة الجدوى، درجة جاهزية ٨٠ أو أكثر', 'Resolve open requirements', 'استكمال المتطلبات المفتوحة'],
  ['Institutional review', 'المراجعة المؤسسية', 'Licensed institution', 'المؤسسة المرخصة', 'Data room access, questions and answers', 'الوصول لغرفة البيانات، الأسئلة والأجوبة', 'Answer the institution’s questions', 'الرد على أسئلة المؤسسة'],
  ['Due diligence', 'الفحص النافي للجهالة', 'Licensed institution, Shariah advisor, legal counsel', 'المؤسسة المرخصة، المستشار الشرعي، المستشار القانوني', 'Legal, technical, financial and Shariah reviews', 'المراجعة القانونية والفنية والمالية والشرعية', 'Close open due diligence items', 'إغلاق بنود الفحص المفتوحة'],
  ['Formal capital process', 'إجراءات الطرح الرسمية', 'Licensed institution, contribution manager', 'المؤسسة المرخصة، مدير المساهمة', 'Offering documents, Real Estate Contribution approval', 'مستندات الطرح، اعتماد المساهمة العقارية', 'The institution files the offering', 'المؤسسة تقدّم الطرح'],
  ['Capital commitments', 'التزامات رأس المال', 'Licensed institution, investors', 'المؤسسة المرخصة، المستثمرون', 'Subscriptions through the institution', 'المساهمات عبر المؤسسة', 'The institution confirms allocation', 'المؤسسة تؤكد التخصيص'],
  ['Closing', 'الإغلاق', 'Licensed institution, developer', 'المؤسسة المرخصة، المطور', 'Signed agreements, floor schedule', 'الاتفاقيات الموقعة، جدول الطوابق', 'Licensed participants confirm closing', 'الأطراف المرخصة تؤكد الإغلاق'],
  ['Ongoing operations', 'التشغيل المستمر', 'Certified inspector, Shariah advisor, institution', 'المعاين المعتمد، المستشار الشرعي، المؤسسة', 'Inspector reports, Shariah and financial approvals', 'تقارير المعاين، الاعتماد الشرعي والمالي', 'Funds released floor by floor', 'صرف المبالغ طابق بطابق'],
];

const AREAS = [['Developer', 'المطور', 92], ['Asset', 'الأصل', 88], ['Market', 'السوق', 81], ['Financial', 'المالية', 72], ['Legal and regulatory', 'القانوني والنظامي', 61], ['Investment structure', 'هيكل الاستثمار', 68]];
function ReadinessBars({ score }) {
  const t = useT(); const off = score - 74;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontSize: 44, fontWeight: 600, lineHeight: 1, color: 'var(--teal-700)' }}><Num n={score} /></span><span className="muted">/ <Num n={100} /></span><span className="label" style={{ marginInlineStart: 'auto' }}>{t('Readiness score', 'درجة الجاهزية')}</span></div>
    {AREAS.map(([en, ar, v]) => { const x = Math.max(20, Math.min(100, v + off)); return <div key={en} style={{ display: 'grid', gridTemplateColumns: '140px minmax(0,1fr) 32px', gap: 10, alignItems: 'center' }}>
      <span className="small">{t(en, ar)}</span><div className={'meter' + (x < 65 ? ' low' : x < 80 ? ' warn' : '')}><i style={{ width: x + '%' }}></i></div><span className="mono" style={{ textAlign: 'end' }}>{x}</span>
    </div>; })}
  </div>;
}
function RiskGrid() {
  const t = useT();
  const risks = { '0-1': [['Permit renewal', 'تجديد التراخيص']], '0-2': [['Cost overrun', 'تجاوز التكاليف']], '1-1': [['Absorption', 'سرعة التسويق'], ['Contractor performance', 'أداء المقاول']], '1-0': [['Rent levels', 'مستويات الإيجار']], '2-0': [['Utility connection', 'توصيل الخدمات']] };
  const sev = (l, i) => (l + i >= 3 ? 'var(--brick-50)' : l + i >= 2 ? 'var(--sand-50)' : 'var(--teal-50)');
  const lv = [['Low', 'منخفض'], ['Medium', 'متوسط'], ['High', 'مرتفع']];
  return <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(3,minmax(0,1fr))', gap: 3, fontSize: 12 }}>
    <span></span>{lv.map(([en, ar]) => <span key={en} className="label" style={{ textAlign: 'center' }}>{t(en, ar)}</span>)}
    {[2, 1, 0].map((imp) => <React.Fragment key={imp}>
      <span className="label" style={{ alignSelf: 'center' }}>{t(lv[imp][0], lv[imp][1])}</span>
      {[0, 1, 2].map((lik) => <div key={lik} style={{ minHeight: 64, background: sev(lik, imp), padding: 6, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>{(risks[lik + '-' + imp] || []).map(([en, ar]) => <span key={en} style={{ background: 'var(--white-warm)', borderRadius: 2, padding: '2px 6px' }}>{t(en, ar)}</span>)}</div>)}
    </React.Fragment>)}
    <span></span><span className="small muted" style={{ gridColumn: 'span 3', textAlign: 'center' }}>{t('Likelihood →  ·  Impact ↑', 'الاحتمالية ←  ·  الأثر ↑')}</span>
  </div>;
}
const REQS = [['Updated valuation report', 'تقرير تقييم محدّث', 'missing'], ['Downside financial scenario', 'سيناريو مالي متحفظ', 'progress'], ['Contractor commercial terms', 'الشروط التجارية للمقاول', 'review'], ['Market absorption study', 'دراسة استيعاب السوق', 'missing'], ['Governance matrix', 'مصفوفة الحوكمة', 'progress'], ['Contribution manager appointment', 'تعيين مدير المساهمة', 'missing']];
const REQ_ST = { missing: ['Missing', 'ناقص', 'b-danger'], progress: ['In progress', 'قيد العمل', 'b-pending'], review: ['Review required', 'يحتاج مراجعة', 'b-neutral'] };
function Requirements() {
  const t = useT();
  return <div className="card" style={{ padding: 4 }}>{REQS.map(([en, ar, st], i) => <div key={en} className="docrow" style={{ cursor: 'default' }}><span className="mono muted" style={{ width: 22 }}>{String(i + 1).padStart(2, '0')}</span><span style={{ flex: 1 }}>{t(en, ar)}</span><span className={'badge ' + REQ_ST[st][2]}>{t(REQ_ST[st][0], REQ_ST[st][1])}</span></div>)}</div>;
}
function Tabs({ items, at, onChange }) {
  const t = useT();
  return <div className="tabs" role="tablist">{items.map(([k, en, ar, lock]) => <button key={k} role="tab" aria-selected={at === k} className={at === k ? 'on' : ''} onClick={() => onChange(k)}>{lock && <Icon name="lock" size={14} />}{t(en, ar)}</button>)}</div>;
}
function KVG({ rows }) { return <div className="kvg">{rows.map(([k, v, mono]) => <div key={k}><span className="label">{k}</span><span className={mono ? 'mono' : ''} style={mono ? { fontSize: 14 } : { fontWeight: 500 }}>{v}</span></div>)}</div>; }
function finRows(d, t) { const c = d.cap * 1e6; const f = (x) => 'SAR ' + Math.round(x).toLocaleString('en'); return [[t('Total development cost', 'إجمالي تكلفة التطوير'), f(c * 1.3), 1], [t('Capital required', 'رأس المال المطلوب'), f(c), 1], [t('Developer equity', 'حصة المطور'), f(c * 0.3), 1], [t('Land value', 'قيمة الأرض'), f(c * 0.42), 1], [t('Expected value on completion', 'القيمة المتوقعة عند الاكتمال'), f(c * 1.72), 1], [t('Expected margin, not guaranteed', 'الهامش المتوقع، غير مضمون'), '18.4%', 1]]; }
function propRows(d, t) { return [[t('Location', 'الموقع'), t(d.cityEn, d.cityAr)], [t('Asset type', 'نوع الأصل'), t(d.typeEn, d.typeAr)], [t('Plot area', 'مساحة الأرض'), Math.round(d.cap * 52).toLocaleString('en') + ' m²', 1], [t('Built-up area', 'مسطحات البناء'), Math.round(d.cap * 190).toLocaleString('en') + ' m²', 1], [t('Floors', 'الطوابق'), '6'], [t('Title deed', 'الصك'), t('Verified', 'متحقق منه')], [t('Building permit', 'رخصة البناء'), t('Issued, valid to 2027-06', 'صادرة، سارية حتى ٢٠٢٧-٠٦')], [t('Zoning', 'التصنيف'), t('Commercial', 'تجاري')]]; }
const GOV = [['Developer', 'المطور', 'Project company', 'شركة المشروع', 'ok'], ['Contribution manager', 'مدير المساهمة', 'Not appointed', 'لم يُعيّن', 'missing'], ['Licensed institution', 'المؤسسة المرخصة', 'Selected after review', 'تُختار بعد المراجعة', 'pending'], ['Shariah advisor', 'المستشار الشرعي', 'Amanx', 'أمانكس', 'ok'], ['Accredited valuer', 'المقيّم المعتمد', 'Taqeem-accredited firm', 'منشأة معتمدة من تقييم', 'ok'], ['Certified inspector', 'المعاين المعتمد', 'Certified inspection firm', 'منشأة معاينة معتمدة', 'ok'], ['Legal counsel', 'المستشار القانوني', 'Engagement pending', 'التعاقد قيد الإجراء', 'pending']];
function GovMatrix() {
  const t = useT(); const st = { ok: ['Appointed', 'معيّن', 'b-success'], pending: ['Pending', 'قيد الإجراء', 'b-pending'], missing: ['Missing', 'ناقص', 'b-danger'] };
  return <div className="card" style={{ padding: 4 }}>{GOV.map(([en, ar, pEn, pAr, s]) => <div key={en} className="docrow" style={{ cursor: 'default', flexWrap: 'wrap' }}><span style={{ flex: '1 1 160px', fontWeight: 500 }}>{t(en, ar)}</span><span className="small muted" style={{ flex: '1 1 160px' }}>{t(pEn, pAr)}</span><span className={'badge ' + st[s][2]}>{t(st[s][0], st[s][1])}</span></div>)}</div>;
}
const WS_DOCS = [['Title deed', 'صك الأرض', 'ok'], ['Building permit', 'رخصة البناء', 'ok'], ['Architectural drawings', 'المخططات المعمارية', 'ok'], ['Feasibility study', 'دراسة الجدوى', 'ok'], ['Valuation report (2025)', 'تقرير التقييم (٢٠٢٥)', 'review'], ['Bill of quantities', 'جدول الكميات', 'ok'], ['Contractor agreement (draft)', 'عقد المقاول (مسودة)', 'review'], ['Audited financial statements', 'القوائم المالية المدققة', 'ok']];
function DocRegister({ d }) {
  const t = useT(); const openDoc = React.useContext(DocCtx);
  return <div className="card" style={{ padding: 4 }}>{WS_DOCS.map(([en, ar, s]) => <button key={en} className="docrow" onClick={() => openDoc({ k: 'memo', title: [en, ar], by: [d.en, d.ar], file: d.id + '-' + en, rows: [[t('Project', 'المشروع'), t(d.en, d.ar)], [t('Document', 'المستند'), t(en, ar)], [t('Uploaded', 'تاريخ الرفع'), '2026-09-' + (10 + en.length)], [t('Status', 'الحالة'), s === 'ok' ? t('Accepted', 'مقبول') : t('Review required', 'يحتاج مراجعة')]] })}>
    <Icon name="file-text" style={{ color: 'var(--teal-600)' }} /><span style={{ flex: 1 }}>{t(en, ar)}</span><span className={'badge ' + (s === 'ok' ? 'b-success' : 'b-neutral')}>{s === 'ok' ? t('Accepted', 'مقبول') : t('Review required', 'يحتاج مراجعة')}</span><span className="small" style={{ color: 'var(--teal-700)' }}>{t('Preview', 'معاينة')}</span>
  </button>)}</div>;
}
function Activity({ items }) {
  const t = useT();
  return <div className="list">{items.map(([d, en, ar], i) => <div key={i} style={{ gridTemplateColumns: '92px minmax(0,1fr)' }}><span className="mono muted">{d}</span><span>{t(en, ar)}</span></div>)}</div>;
}
Object.assign(window, { DEV_PROJECTS, RISK, RiskBadge, PROCESS, ReadinessBars, RiskGrid, Requirements, Tabs, KVG, finRows, propRows, GovMatrix, DocRegister, Activity });
