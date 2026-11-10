function DashHead({ roleKey, title, sub }) {
  const t = useT(); const r = ROLES.find((x) => x.k === roleKey);
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span className="label">{t(r.en, r.ar)}</span><h1 className="h-1">{title}</h1>{sub && <p className="muted">{sub}</p>}</div>;
}
const Stat2 = ({ label, value, tone }) => <div className="card" style={{ padding: 16 }}><span className="label">{label}</span><div style={{ fontSize: 26, fontWeight: 600, marginTop: 4, color: tone || 'var(--ink-900)' }}>{value}</div></div>;
const statGrid = { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))' };

function InspectorDash() {
  const t = useT();
  const [jobs, setJobs] = React.useState([{ p: PROJECTS[0], f: 5, due: '2026-10-30', st: 'due' }, { p: PROJECTS[4], f: 6, due: '2026-11-04', st: 'due' }, { p: PROJECTS[1], f: 1, due: '2026-12-18', st: 'later' }]);
  const [sel, setSel] = React.useState(0); const [chk, setChk] = React.useState({}); const [files, setFiles] = React.useState([]); const [note, setNote] = React.useState('');
  const j = jobs[sel]; const items = [['Structure complete for this floor', 'اكتمال هيكل هذا الطابق'], ['Work matches approved drawings', 'مطابقة الأعمال للمخططات المعتمدة'], ['Site safety in place', 'توفر اشتراطات السلامة في الموقع']];
  const ok = items.every((_, i) => chk[i]) && files.length > 0;
  const sign = () => { setJobs(jobs.map((x, i) => i === sel ? { ...x, st: 'signed' } : x)); setChk({}); setFiles([]); setNote(''); };
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <DashHead roleKey="inspector" title={t('Site inspections', 'معاينات المواقع')} sub={t('Upload evidence for each floor and sign. Your signature goes to the Shariah advisor next.', 'ارفع أدلة كل طابق ووقّع، ثم ينتقل توقيعك إلى المستشار الشرعي.')} />
    <div className="split" style={{ gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{jobs.map((x, i) => <button key={i} className="role" style={sel === i ? { borderColor: 'var(--teal-600)', background: 'var(--teal-50)' } : null} onClick={() => setSel(i)}>
        <span className="ri"><span className="mono">{t('F', 'ط')}{String(x.f).padStart(2, '0')}</span></span>
        <span><span style={{ display: 'block', fontWeight: 600 }}>{t(x.p.en, x.p.ar)}</span><span className="small muted">{t('Due', 'الموعد')} <span className="mono">{x.due}</span></span></span>
        <span className={'badge ' + (x.st === 'signed' ? 'b-success' : x.st === 'due' ? 'b-pending' : 'b-neutral')}>{x.st === 'signed' ? t('Signed', 'موقَّع') : x.st === 'due' ? t('Due', 'مستحق') : t('Scheduled', 'مجدول')}</span>
      </button>)}</div>
      <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="h-3">{t(j.p.en, j.p.ar)} · {t('Floor', 'الطابق')} <Num n={j.f} /></h2>
        {j.st === 'signed' ? <><span className="badge b-success" style={{ alignSelf: 'flex-start' }}>{t('Signed and sent to Shariah advisor', 'وُقّع وأُرسل إلى المستشار الشرعي')}</span><p className="small muted">{t('You can no longer edit this inspection.', 'لم يعد بإمكانك تعديل هذه المعاينة.')}</p></> : <>
          {items.map(([en, ar], i) => <label key={i} className="chk"><input type="checkbox" checked={!!chk[i]} onChange={(e) => setChk({ ...chk, [i]: e.target.checked })} /><span>{t(en, ar)}</span></label>)}
          <div className="field"><label>{t('Site photos and report', 'صور الموقع والتقرير')}</label>
            <label className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}><Icon name="upload" />{t('Add files', 'إضافة ملفات')}<input type="file" multiple hidden onChange={(e) => setFiles([...files, ...Array.from(e.target.files).map((f) => f.name)])} /></label>
            {files.length > 0 && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{files.map((f, i) => <span key={i} className="badge b-neutral">{f}</span>)}</div>}
            <button type="button" className="btn btn-ghost" style={{ alignSelf: 'flex-start', height: 32 }} onClick={() => setFiles([...files, 'site-photo-' + (files.length + 1) + '.jpg'])}>{t('Use sample photo', 'استخدام صورة تجريبية')}</button>
          </div>
          <div className="field"><label htmlFor="nt">{t('Notes (optional)', 'ملاحظات (اختياري)')}</label><textarea id="nt" className="inp" value={note} onChange={(e) => setNote(e.target.value)}></textarea></div>
          <button className="btn btn-primary btn-lg" disabled={!ok} onClick={sign}><Icon name="pen-line" />{t('Sign inspector report', 'توقيع تقرير المعاين')}</button>
        </>}
      </div>
    </div>
  </div>;
}

function ShariahDash() {
  const t = useT();
  const [q, setQ] = React.useState([
    { k: 'm', p: PROJECTS[0], f: 4, en: 'Floor sign-off', ar: 'اعتماد طابق', st: 'open' },
    { k: 's', p: PROJECTS[2], en: 'Offering structure review', ar: 'مراجعة هيكل الطرح', st: 'open' },
    { k: 'm', p: PROJECTS[4], f: 5, en: 'Floor sign-off', ar: 'اعتماد طابق', st: 'approved' },
  ]);
  const [sel, setSel] = React.useState(0); const [note, setNote] = React.useState(''); const x = q[sel];
  const act = (st) => { setQ(q.map((y, i) => i === sel ? { ...y, st, note } : y)); setNote(''); };
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <DashHead roleKey="shariah" title={t('Shariah review queue', 'قائمة المراجعة الشرعية')} sub={t('Floors signed by the inspector and offering structures waiting for your decision.', 'طوابق وقّعها المعاين، وهياكل طرح بانتظار قرارك.')} />
    <div style={statGrid}><Stat2 label={t('Waiting', 'بالانتظار')} value={<Num n={q.filter((y) => y.st === 'open').length} />} tone="var(--sand-700)" /><Stat2 label={t('Approved this month', 'معتمد هذا الشهر')} value={<Num n={q.filter((y) => y.st === 'approved').length + 6} />} tone="var(--teal-600)" /></div>
    <div className="split" style={{ gap: 20, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{q.map((y, i) => <button key={i} className="role" style={sel === i ? { borderColor: 'var(--teal-600)', background: 'var(--teal-50)' } : null} onClick={() => setSel(i)}>
        <span className="ri"><Icon name={y.k === 's' ? 'scale' : 'layers'} /></span>
        <span><span style={{ display: 'block', fontWeight: 600 }}>{t(y.p.en, y.p.ar)}</span><span className="small muted">{t(y.en, y.ar)}{y.f ? <> · {t('Floor', 'الطابق')} <Num n={y.f} /></> : null}</span></span>
        <span className={'badge ' + (y.st === 'approved' ? 'b-success' : y.st === 'returned' ? 'b-neutral' : 'b-pending')}>{y.st === 'approved' ? t('Approved', 'معتمد') : y.st === 'returned' ? t('Returned', 'مُعاد') : t('Waiting', 'بالانتظار')}</span>
      </button>)}</div>
      <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 className="h-3">{t(x.en, x.ar)}</h2>
        <DocList p={x.p} keys={x.k === 's' ? ['memo', 'shariah'] : ['inspection']} />
        {x.k === 'm' && <div className="ev"><div className="ev-row"><span className="muted">{t('Inspector', 'المعاين')}</span><span style={{ color: 'var(--teal-700)' }}>{t('Signed', 'موقَّع')}</span></div><div className="ev-row"><span className="muted">{t('Tranche', 'الدفعة')}</span><span className="mono">SAR {ledgerFor(x.p)[x.f - 1].tranche.toLocaleString('en')}</span></div></div>}
        {x.st === 'open' ? <><div className="field"><label htmlFor="sn">{t('Note to record', 'ملاحظة للسجل')}</label><textarea id="sn" className="inp" value={note} onChange={(e) => setNote(e.target.value)}></textarea></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><button className="btn btn-primary" onClick={() => act('approved')}><Icon name="shield-check" />{t('Approve and sign', 'اعتماد وتوقيع')}</button><button className="btn btn-secondary" disabled={!note} onClick={() => act('returned')}>{t('Return with note', 'إعادة مع ملاحظة')}</button></div></>
          : <p className="small muted">{x.st === 'approved' ? t('Signed. Sent to admin for tranche approval.', 'تم التوقيع وأُرسل إلى المشرف لاعتماد الدفعة.') : t('Returned to the inspector with your note.', 'أُعيد إلى المعاين مع ملاحظتك.')}</p>}
      </div>
    </div>
  </div>;
}

function AdminDash() {
  const t = useT();
  const [rows, setRows] = React.useState([
    { p: PROJECTS[4], f: 5, sh: true, st: 'ready' }, { p: PROJECTS[0], f: 4, sh: false, st: 'waiting' }, { p: PROJECTS[4], f: 4, sh: true, st: 'released', tx: ledgerFor(PROJECTS[4])[3].tx },
  ]);
  const [conf, setConf] = React.useState(null);
  const approve = () => { setRows(rows.map((r, i) => i === conf ? { ...r, st: 'released', tx: ledgerFor(r.p)[r.f - 1].tx } : r)); setConf(null); };
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <DashHead roleKey="admin" title={t('Tranche approvals', 'اعتماد الدفعات')} sub={t('A tranche can be approved only when the inspector and the Shariah advisor have both signed.', 'لا تُعتمد الدفعة إلا بعد توقيع المعاين والمستشار الشرعي معًا.')} />
    <div style={statGrid}><Stat2 label={t('Ready to approve', 'جاهزة للاعتماد')} value={<Num n={rows.filter((r) => r.st === 'ready').length} />} tone="var(--sand-700)" /><Stat2 label={t('Released this quarter', 'صُرفت هذا الربع')} value={<span className="mono" style={{ fontSize: 22 }}>SAR 41.2M</span>} tone="var(--teal-600)" /><Stat2 label={t('Active projects', 'المشاريع النشطة')} value={<Num n={4} />} /></div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{rows.map((r, i) => { const tr = ledgerFor(r.p)[r.f - 1].tranche; return <div key={i} className="card" style={{ padding: 16, display: 'grid', gap: 12, gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontWeight: 600 }}>{t(r.p.en, r.p.ar)} · {t('Floor', 'الطابق')} <Num n={r.f} /></span>
        <div className="small" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}><span className="mono">SAR {tr.toLocaleString('en')}</span><span style={{ color: 'var(--teal-700)' }}>✓ {t('Inspector', 'المعاين')}</span><span style={{ color: r.sh ? 'var(--teal-700)' : 'var(--sand-700)' }}>{r.sh ? '✓' : '…'} {t('Shariah advisor', 'المستشار الشرعي')}</span></div>
        {r.tx && <span className="mono muted">{r.tx}</span>}
      </div>
      {r.st === 'ready' ? <button className="btn btn-primary" onClick={() => setConf(i)}>{t('Approve release', 'اعتماد الصرف')}</button> : <span className={'badge ' + (r.st === 'released' ? 'b-success' : 'b-pending')}>{r.st === 'released' ? t('Released', 'صُرفت') : t('Waiting for Shariah', 'بانتظار الشرعي')}</span>}
    </div>; })}</div>
    {conf !== null && <Sheet title={t('Approve release', 'اعتماد الصرف')} onClose={() => setConf(null)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p>{t('Release', 'صرف')} <span className="mono">SAR {ledgerFor(rows[conf].p)[rows[conf].f - 1].tranche.toLocaleString('en')}</span> {t('for', 'لـ')} {t(rows[conf].p.en, rows[conf].p.ar)}.</p>
        <p className="small muted">{t('The approval is written to the tamper-proof record and shown to every investor in the project. It cannot be undone.', 'يُسجَّل الاعتماد في السجل الموثّق غير القابل للتعديل ويظهر لكل مستثمر في المشروع، ولا يمكن التراجع عنه.')}</p>
        <button className="btn btn-primary btn-lg" onClick={approve}>{t('Approve and record', 'اعتماد وتسجيل')}</button>
      </div>
    </Sheet>}
  </div>;
}

function RoleHome({ product, roleKey }) {
  const D = { inspector: InspectorDash, shariah: ShariahDash, admin: AdminDash, developer: window.DevWorkspace, partner: window.CmiWorkspace }[roleKey] || AdminDash;
  return <><AppBar product={product} /><main className="wrap" style={{ paddingBlock: 32 }}><D /><DemoNote /></main><AppFooter /></>;
}
Object.assign(window, { RoleHome });
