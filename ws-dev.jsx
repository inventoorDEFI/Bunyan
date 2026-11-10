function DevStat({ label, value }) { return <div className="card" style={{ padding: 16 }}><span className="label">{label}</span><div style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>{value}</div></div>; }

function CapitalProcess({ at }) {
  const t = useT();
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div className="ledger" style={{ flexDirection: 'column-reverse' }}>{PROCESS.map((s, i) => { const st = i < at ? 'released' : i === at ? 'current' : 'planned'; return <div key={i} className={'floor ' + st} style={{ cursor: 'default', gridTemplateColumns: '32px minmax(0,1fr)', alignItems: 'start', paddingBlock: 12 }}>
      <span className="fl-n">{String(i + 1).padStart(2, '0')}</span>
      <span style={{ display: 'grid', gap: 4 }}><span className="fl-t">{t(s[0], s[1])}</span>
        {i === at && <span className="small" style={{ display: 'grid', gap: 2 }}><span><b style={{ fontWeight: 500 }}>{t('Responsible: ', 'المسؤول: ')}</b>{t(s[2], s[3])}</span><span><b style={{ fontWeight: 500 }}>{t('Evidence: ', 'الأدلة المطلوبة: ')}</b>{t(s[4], s[5])}</span><span><b style={{ fontWeight: 500 }}>{t('Next action: ', 'الإجراء التالي: ')}</b>{t(s[6], s[7])}</span></span>}
        {i !== at && <span className="fl-s">{t(s[2], s[3])}</span>}
      </span>
    </div>; })}</div>
    <div className="plinth"></div>
    <p className="small" style={{ padding: 12, background: 'var(--sand-50)', borderRadius: 'var(--radius-md)' }}>{t('The developer does not move or approve capital. Regulated steps are carried out by licensed participants.', 'المطور لا يحرّك رأس المال ولا يعتمده. الخطوات المنظمة تتم عبر الأطراف المرخصة.')}</p>
  </div>;
}

function DevProject({ d, back }) {
  const t = useT(); const [tab, setTab] = React.useState('overview');
  const tabs = [['overview', 'Overview', 'نظرة عامة'], ['readiness', 'Readiness', 'الجاهزية'], ['financials', 'Financials', 'المالية'], ['property', 'Property', 'العقار'], ['governance', 'Governance', 'الحوكمة'], ['documents', 'Documents', 'المستندات'], ['activity', 'Activity', 'النشاط'], ['ops', 'Operations', 'التشغيل', true]];
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <button className="crumb" style={{ background: 'none', border: 0, cursor: 'pointer', padding: 0, font: 'inherit' }} onClick={back}><Icon name="arrow-left" size={16} flip />{t('Project register', 'سجل المشاريع')}</button>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {d.img && <div className="media" style={{ width: 96, height: 72, borderRadius: 'var(--radius-md)', flex: 'none' }}><Photo src={d.img} alt="" /></div>}
      <div style={{ flex: 1, minWidth: 220 }}><span className="label">{t(d.cityEn, d.cityAr)} · {t(d.typeEn, d.typeAr)}</span><h1 className="h-1">{t(d.en, d.ar)}</h1></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><span className="badge b-neutral">{t(d.stEn, d.stAr)}</span><RiskBadge r={d.risk} /></div>
    </div>
    <Tabs items={tabs} at={tab} onChange={setTab} />
    {tab === 'overview' && <div className="split" style={{ gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KVG rows={[[t('Capital required', 'رأس المال المطلوب'), 'SAR ' + d.cap + 'M', 1], [t('Readiness', 'الجاهزية'), d.score + '/100', 1], [t('Current stage', 'المرحلة الحالية'), t(d.stEn, d.stAr)], [t('Next action', 'الإجراء التالي'), t(d.nxEn, d.nxAr)]]} />
        <div className="card" style={{ padding: 20 }}><span className="label">{t('Next action', 'الإجراء التالي')}</span><p style={{ marginBlock: '6px 14px', fontWeight: 500 }}>{t(d.nxEn, d.nxAr)}</p><button className="btn btn-primary" onClick={() => setTab('readiness')}>{t('Open requirements', 'افتح المتطلبات')}</button></div>
      </div>
      <div><h2 className="h-3" style={{ marginBottom: 12 }}>{t('Capital process', 'مسار رأس المال')}</h2><CapitalProcess at={d.proc} /></div>
    </div>}
    {tab === 'readiness' && <div className="split" style={{ gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}><div className="card" style={{ padding: 20 }}><ReadinessBars score={d.score} /></div><div className="card" style={{ padding: 20 }}><span className="label" style={{ display: 'block', marginBottom: 12 }}>{t('Risk grid', 'مصفوفة المخاطر')}</span><RiskGrid /></div></div>
      <div><h2 className="h-3" style={{ marginBottom: 4 }}>{t('Missing requirements', 'المتطلبات الناقصة')}</h2><p className="small muted" style={{ marginBottom: 12 }}>{t('In order of priority.', 'مرتبة حسب الأولوية.')}</p><Requirements /></div>
    </div>}
    {tab === 'financials' && <><KVG rows={finRows(d, t)} /><p className="small muted">{t('Expected figures from the developer’s feasibility study. Not guaranteed.', 'أرقام متوقعة من دراسة جدوى المطور، وغير مضمونة.')}</p></>}
    {tab === 'property' && <KVG rows={propRows(d, t)} />}
    {tab === 'governance' && <GovMatrix />}
    {tab === 'documents' && <DocRegister d={d} />}
    {tab === 'activity' && <Activity items={[['2026-10-21', 'Readiness score updated to ' + d.score, 'تحديث درجة الجاهزية إلى ' + arNum(d.score)], ['2026-10-18', 'Contractor agreement draft uploaded', 'رفع مسودة عقد المقاول'], ['2026-10-09', 'Valuation flagged as older than six months', 'تنبيه: التقييم أقدم من ستة أشهر'], ['2026-09-30', 'Feasibility study accepted', 'قبول دراسة الجدوى'], ['2026-09-12', 'Project created', 'إنشاء المشروع']]} />}
    {tab === 'ops' && <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center' }}><Icon name="lock" size={28} style={{ color: 'var(--text-muted)' }} /><h2 className="h-3">{t('Operations are locked', 'التشغيل مقفل')}</h2><p className="muted" style={{ maxWidth: 420 }}>{t('Operations open once closing is confirmed by the licensed participants. Floor reports and approvals then appear here.', 'يفتح التشغيل بعد تأكيد الإغلاق من الأطراف المرخصة، وبعدها تظهر هنا تقارير الطوابق واعتماداتها.')}</p></div>}
  </div>;
}

function DevWorkspace() {
  const t = useT(); const [sel, setSel] = React.useState(null);
  if (sel) return <DevProject d={DEV_PROJECTS.find((x) => x.id === sel)} back={() => setSel(null)} />;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
      <div><span className="label">{t('Developer workspace', 'مساحة المطور')}</span><h1 className="h-1">{t('Your projects', 'مشاريعك')}</h1></div>
      <a className="btn btn-primary" href={APPLY_URL} target="_blank" rel="noopener"><Icon name="plus" />{t('Add a project', 'أضف مشروع')}</a>
    </div>
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))' }}>
      <DevStat label={t('Active projects', 'المشاريع النشطة')} value={<Num n={8} />} />
      <DevStat label={t('Capital required', 'رأس المال المطلوب')} value={<span className="mono" style={{ fontSize: 22 }}>SAR 1.24B</span>} />
      <DevStat label={t('Ready for institutional review', 'جاهزة للمراجعة المؤسسية')} value={<Num n={3} />} />
      <DevStat label={t('In preparation', 'قيد التجهيز')} value={<Num n={5} />} />
    </div>
    <h2 className="h-2">{t('Project register', 'سجل المشاريع')}</h2>
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
      {DEV_PROJECTS.map((d) => <button key={d.id} className="card pcard" style={{ textAlign: 'start', font: 'inherit', cursor: 'pointer', padding: 18, gap: 12 }} onClick={() => setSel(d.id)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}><div><span className="label">{t(d.cityEn, d.cityAr)} · {t(d.typeEn, d.typeAr)}</span><div style={{ fontWeight: 600, fontSize: 16 }}>{t(d.en, d.ar)}</div></div><span style={{ fontWeight: 600, fontSize: 20, color: d.score >= 80 ? 'var(--teal-700)' : d.score >= 65 ? 'var(--sand-700)' : 'var(--brick-600)' }}><Num n={d.score} /><span className="small muted">/<Num n={100} /></span></span></div>
        <div className={'meter' + (d.score < 65 ? ' low' : d.score < 80 ? ' warn' : '')}><i style={{ width: d.score + '%' }}></i></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}><span className="mono">SAR {d.cap}M</span><RiskBadge r={d.risk} /><span className="badge b-neutral">{t(d.stEn, d.stAr)}</span></div>
        <div className="small" style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--teal-700)' }}><Icon name="arrow-right" size={14} flip />{t(d.nxEn, d.nxAr)}</div>
      </button>)}
    </div>
  </div>;
}
Object.assign(window, { DevWorkspace, CapitalProcess });
