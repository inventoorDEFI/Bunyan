const Session = {
  role: () => sessionStorage.getItem('bunyan.role'),
  set: (r) => sessionStorage.setItem('bunyan.role', r),
  clear: () => sessionStorage.removeItem('bunyan.role'),
};
const extraHoldings = () => JSON.parse(localStorage.getItem('bunyan.holdings') || '[]');
const DocCtx = React.createContext(() => {});
window.DocCtx = DocCtx;

const DOCS = {
  memo: { icon: 'file-text', en: 'Offering memorandum', ar: 'نشرة الطرح', by: (p) => [p.partnerEn, p.partnerAr] },
  valuation: { icon: 'file-check', en: 'Valuation report', ar: 'تقرير التقييم', by: () => ['Taqeem-accredited valuer', 'مقيّم معتمد من تقييم'] },
  shariah: { icon: 'shield-check', en: 'Shariah structure', ar: 'الهيكل الشرعي', by: () => ['Amanx', 'أمانكس'] },
  inspection: { icon: 'hard-hat', en: 'Inspector report', ar: 'تقرير المعاين', by: () => ['Certified inspector', 'معاين معتمد'] },
  shariahApproval: { icon: 'shield-check', en: 'Shariah approval', ar: 'الاعتماد الشرعي', by: () => ['Shariah advisor, Amanx', 'المستشار الشرعي، أمانكس'] },
  financialApproval: { icon: 'landmark', en: 'Financial approval', ar: 'الاعتماد المالي', by: (p) => [p.partnerEn, p.partnerAr] },
};
function docRows(k, p, t, floor) {
  const fl = floor ? t('Floor ' + floor, 'الطابق ' + arNum(floor)) : '';
  const amt = floor ? 'SAR ' + ledgerFor(p)[floor - 1].tranche.toLocaleString('en') : '';
  return {
    memo: [[t('Project', 'المشروع'), t(p.en, p.ar)], [t('Offered by', 'الجهة الطارحة'), t(p.partnerEn, p.partnerAr)], [t('Offering size', 'حجم الطرح'), 'SAR ' + p.size], [t('Minimum subscription', 'الحد الأدنى للمساهمة'), 'SAR 500'], [t('Use of funds', 'استخدام المبالغ'), t('Construction of ' + p.floors + ' floors, released floor by floor after approval', 'إنشاء ' + arNum(p.floors) + ' طوابق، تُصرف طابقًا بطابق بعد الاعتماد')], [t('Returns', 'العوائد'), t('Expected, not guaranteed. Capital is at risk.', 'متوقعة وغير مضمونة، ورأس المال معرّض للمخاطر.')]],
    valuation: [[t('Asset', 'الأصل'), t(p.en, p.ar)], [t('Method', 'المنهجية'), t('Residual method and comparable sales', 'الطريقة المتبقية والمقارنة بالمبيعات')], [t('Valuation date', 'تاريخ التقييم'), '2026-08-14'], [t('Market value on completion', 'القيمة السوقية عند الاكتمال'), 'SAR ' + Math.round(parseInt(p.size.replace(/,/g, '')) * 1.32).toLocaleString('en')]],
    shariah: [[t('Structure', 'الهيكل'), t('Musharakah within a Real Estate Contribution', 'مشاركة ضمن مساهمة عقارية')], [t('Decision', 'القرار'), t('Compliant, subject to the conditions below', 'متوافق، وفق الضوابط أدناه')], [t('Conditions', 'الضوابط'), t('No interest-bearing debt. Profit shared by agreed ratio. Losses by capital share.', 'لا ديون ربوية. الربح بنسبة متفق عليها. الخسارة بقدر الحصة.')]],
    inspection: [[t('Milestone', 'المرحلة'), fl], [t('Site visit', 'زيارة الموقع'), ledgerFor(p)[(floor || 1) - 1].date], [t('Findings', 'النتيجة'), t('Structure complete and matches approved drawings', 'الهيكل مكتمل ومطابق للمخططات المعتمدة')], [t('Attachments', 'المرفقات'), t('24 site photos, checklist', '٢٤ صورة من الموقع، قائمة التحقق')]],
    shariahApproval: [[t('Milestone', 'المرحلة'), fl], [t('Based on', 'بناءً على'), t('Inspector report for ' + fl, 'تقرير المعاين لـ' + fl)], [t('Decision', 'القرار'), t('Approved. Use of funds consistent with the Shariah structure.', 'معتمد. استخدام المبالغ متوافق مع الهيكل الشرعي.')]],
    financialApproval: [[t('Milestone', 'المرحلة'), fl], [t('Amount released', 'المبلغ المصروف'), amt], [t('Approved by', 'اعتمده'), t(p.partnerEn, p.partnerAr)], [t('Record', 'السجل'), t('Recorded and cannot be edited', 'مسجل ولا يمكن تعديله')]],
  }[k] || [];
}
function DocViewer({ doc, onClose }) {
  const t = useT(); const [dl, setDl] = React.useState(false);
  const d = DOCS[doc.k]; const title = doc.title || [d.en, d.ar]; const by = doc.by || d.by(doc.p);
  const rows = doc.rows || docRows(doc.k, doc.p, t, doc.floor);
  const file = (doc.file || (title[0] + (doc.floor ? ' F' + doc.floor : ''))).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.pdf';
  return <Sheet title={t(...title)} onClose={onClose}>
    <div className="pdfwrap">
      <div className="pdfbar"><span className="mono" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span><span className="mono">1 / 4</span></div>
      <div className="pdfpage">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Logo h={22} /><span className="mono muted" style={{ fontSize: 10 }}>v1.2 · 2026-10</span></div>
        <div style={{ borderBottom: '2px solid var(--sand-500)', paddingBottom: 10 }}><div className="label">{t(...by)}</div><div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{t(...title)}</div>{doc.p && <div className="small muted">{t(doc.p.en, doc.p.ar)}</div>}</div>
        {rows.map(([k, v]) => <div key={k} style={{ display: 'grid', gap: 2, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}><span className="label" style={{ fontSize: 10 }}>{k}</span><span>{v}</span></div>)}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }} className="mono muted"><span style={{ fontSize: 10 }}>{t('Demo document', 'مستند تجريبي')}</span><span style={{ fontSize: 10 }}>1</span></div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <button className="btn btn-primary" onClick={() => setDl(true)}><Icon name={dl ? 'check' : 'download'} />{dl ? t('Downloaded', 'تم التنزيل') : t('Download PDF', 'تنزيل PDF')}</button>
      <button className="btn btn-secondary" onClick={onClose}>{t('Close', 'إغلاق')}</button>
    </div>
  </Sheet>;
}
function DocList({ p, keys = ['memo', 'valuation', 'shariah'] }) {
  const t = useT(); const openDoc = React.useContext(DocCtx);
  return <div className="card" style={{ padding: 4 }}>{keys.map((k) => { const d = DOCS[k]; return <button key={k} className="docrow" onClick={() => openDoc({ k, p })}>
    <Icon name={d.icon} style={{ color: 'var(--teal-600)' }} /><span style={{ flex: 1 }}><span style={{ display: 'block' }}>{t(d.en, d.ar)}</span><span className="small muted">{t(...d.by(p))}</span></span><span className="mono muted">PDF</span><Icon name="chevron-right" size={16} flip style={{ color: 'var(--text-muted)' }} />
  </button>; })}</div>;
}

function Stepper({ steps, at }) {
  const t = useT();
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div className="courses" style={{ height: 8 }}>{steps.map((_, i) => <i key={i} className={i < at ? 'on' : i === at ? 'cur' : ''}></i>)}</div>
    <div className="small" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 600 }}>{t(...steps[at])}</span><span className="muted">{t('Step', 'الخطوة')} <Num n={at + 1} /> {t('of', 'من')} <Num n={steps.length} /></span></div>
  </div>;
}

function Invest({ id }) {
  const t = useT(); const h = useHref(); const l = useLang();
  const p = PROJECTS.find((x) => x.id === id && x.open) || PROJECTS.find((x) => x.open);
  const [step, setStep] = React.useState(0);
  const [amt, setAmt] = React.useState('5000'); const n = parseInt(amt) || 0;
  const [inst, setInst] = React.useState(p.inst.length === 1 ? p.inst[0] : null);
  const [nid, setNid] = React.useState(''); const [naf, setNaf] = React.useState('idle'); const [code] = React.useState(10 + Math.floor(Math.random() * 89));
  const [ack, setAck] = React.useState({}); const [ref, setRef] = React.useState(null);
  React.useEffect(() => { if (naf === 'wait') { const x = setTimeout(() => { setNaf('ok'); Session.set('investor'); }, 2400); return () => clearTimeout(x); } }, [naf]);
  const I = inst ? INSTITUTIONS[inst] : null;
  const steps = [['Amount', 'المبلغ'], ['Licensed institution', 'المؤسسة المرخصة'], ['Nafath', 'نفاذ'], ['Risk and Shariah', 'المخاطر والهيكل الشرعي'], ['Confirm', 'التأكيد'], ['Done', 'تم']];
  const can = [n >= 500, !!inst, naf === 'ok', ack.a && ack.b && ack.c, true][step];
  const confirm = () => { const r = 'SUB-' + Date.now().toString(36).toUpperCase().slice(-6); setRef(r); const all = extraHoldings().filter((x) => x.id !== p.id); all.push({ id: p.id, n, ref: r, inst, at: new Date().toISOString().slice(0, 10) }); localStorage.setItem('bunyan.holdings', JSON.stringify(all)); setStep(5); };
  const row = (k, v, mono) => <div key={k} className="ev-row" style={{ paddingBlock: 8, borderBottom: '1px solid var(--line)' }}><span className="muted small">{k}</span><span className={mono ? 'mono' : ''} style={{ textAlign: 'end' }}>{v}</span></div>;
  return <><AppBar product="app" />
    <main className="wrap" style={{ paddingBlock: 28, maxWidth: 720 }}>
      <a className="crumb" href={h('app/projects/' + p.id)}><Icon name="arrow-left" size={16} flip />{t(p.en, p.ar)}</a>
      <div className="card" style={{ marginTop: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div className="media" style={{ width: 64, height: 48, borderRadius: 'var(--radius-sm)', flex: 'none' }}><Photo src={p.img} alt="" /></div>
          <div><span className="label">{t('Subscription', 'المساهمة')}</span><div style={{ fontWeight: 600 }}>{t(p.en, p.ar)}</div></div>
        </div>
        <Stepper steps={steps} at={step} />
        {step === 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="field"><label htmlFor="amt">{t('Amount (SAR)', 'المبلغ (ريال)')}</label><input id="amt" className={'inp mono' + (n < 500 ? ' err' : '')} dir="ltr" inputMode="numeric" style={{ fontSize: 22, height: 56, textAlign: l === 'ar' ? 'right' : 'left' }} value={Number(amt || 0).toLocaleString('en')} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} />{n < 500 ? <span className="ferr">{t('Minimum SAR 500', 'الحد الأدنى ٥٠٠ ريال')}</span> : <span className="small muted">{t('Minimum SAR 500', 'الحد الأدنى ٥٠٠ ريال')}</span>}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['500', '5000', '25000', '100000'].map((v) => <button key={v} className={'btn ' + (amt === v ? 'btn-ink' : 'btn-secondary')} style={{ height: 36 }} onClick={() => setAmt(v)}><span className="mono">{Number(v).toLocaleString('en')}</span></button>)}</div>
          <div className="band-sand small" style={{ padding: 14, borderRadius: 'var(--radius-md)' }}>{t('Your money is released to the developer floor by floor, only after each floor is approved.', 'مبلغك يُصرف للمطور طابق بطابق، وبعد اعتماد كل طابق فقط.')}</div>
        </div>}
        {step === 1 && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="small muted">{t('Choose the CMA-licensed institution you subscribe through. It holds your subscription and your funds.', 'اختر مؤسسة السوق المالية المرخصة اللي تساهم عن طريقها. هي اللي تستلم مساهمتك وأموالك.')}</p>
          {p.inst.map((k) => <button key={k} className="role" style={inst === k ? { borderColor: 'var(--teal-600)', background: 'var(--teal-50)' } : null} onClick={() => setInst(k)}>
            <span className="ri"><Icon name="landmark" /></span>
            <span><span style={{ display: 'block', fontWeight: 600 }}>{t(INSTITUTIONS[k].en, INSTITUTIONS[k].ar)}</span><span className="small muted">{t('Capital market institution licensed by the CMA', 'مؤسسة سوق مالية مرخصة من هيئة السوق المالية')}</span></span>
            <Icon name={inst === k ? 'circle-check' : 'circle'} style={{ color: inst === k ? 'var(--teal-600)' : 'var(--slate-300)' }} />
          </button>)}
        </div>}
        {step === 2 && <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {naf === 'idle' ? <>
            <div className="field"><label htmlFor="nid">{t('National ID or Iqama number', 'رقم الهوية الوطنية أو الإقامة')}</label><input id="nid" className="inp mono" dir="ltr" inputMode="numeric" maxLength={10} placeholder="1XXXXXXXXX" value={nid} onChange={(e) => setNid(e.target.value.replace(/\D/g, ''))} /></div>
            <button className="btn btn-primary btn-lg" disabled={nid.length !== 10} onClick={() => setNaf('wait')}><Icon name="fingerprint" />{t('Verify with Nafath', 'التحقق عبر نفاذ')}</button>
          </> : <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center' }}>
            <p className="muted">{t('Open the Nafath app and choose this number', 'افتح تطبيق نفاذ واختر هذا الرقم')}</p>
            <div style={{ width: 96, height: 96, borderRadius: 'var(--radius-lg)', border: '2px solid ' + (naf === 'ok' ? 'var(--teal-600)' : 'var(--sand-500)'), display: 'grid', placeItems: 'center', fontSize: 40, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{code}</div>
            <span className={'badge ' + (naf === 'ok' ? 'b-success' : 'b-pending')}>{naf === 'ok' ? t('Verified', 'تم التحقق') : t('Waiting for Nafath', 'بانتظار نفاذ')}</span>
          </div>}
        </div>}
        {step === 3 && <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: 16, display: 'grid', gap: 8 }}><b>{t('Risk notice', 'إشعار المخاطر')}</b><p className="small muted">{t('Real estate development carries risk. Construction can be delayed or cost more than planned, and the value of the project can fall. Returns are expected, not guaranteed, and you may lose part or all of your capital.', 'التطوير العقاري فيه مخاطر. ممكن يتأخر البناء أو تزيد التكلفة، وممكن تنخفض قيمة المشروع. العوائد متوقعة وغير مضمونة، وممكن تخسر جزء من رأس مالك أو كله.')}</p></div>
          <div className="card" style={{ padding: 16, display: 'grid', gap: 8 }}><b>{t('Shariah structure', 'الهيكل الشرعي')}</b><p className="small muted">{t('Musharakah within a Real Estate Contribution, reviewed by Amanx. No interest-bearing debt. Profit is shared by an agreed ratio and losses by capital share.', 'مشاركة ضمن مساهمة عقارية، راجعتها أمانكس. لا ديون ربوية. الربح بنسبة متفق عليها، والخسارة بقدر الحصة.')}</p></div>
          <DocList p={{ ...p, partnerEn: I.en, partnerAr: I.ar }} keys={['memo', 'shariah']} />
          <label className="chk"><input type="checkbox" checked={!!ack.a} onChange={(e) => setAck({ ...ack, a: e.target.checked })} /><span>{t('I have read the offering memorandum and the risk notice.', 'قرأت نشرة الطرح وإشعار المخاطر.')}</span></label>
          <label className="chk"><input type="checkbox" checked={!!ack.b} onChange={(e) => setAck({ ...ack, b: e.target.checked })} /><span>{t('I understand returns are not guaranteed.', 'أدرك أن العوائد غير مضمونة.')}</span></label>
          <label className="chk"><input type="checkbox" checked={!!ack.c} onChange={(e) => setAck({ ...ack, c: e.target.checked })} /><span>{t('I agree that Bunyan shares my details with the institution to process this subscription, under the PDPL.', 'أوافق على مشاركة بياناتي مع المؤسسة لمعالجة المساهمة، وفق نظام حماية البيانات الشخصية.')}</span></label>
        </div>}
        {step === 4 && <div>
          {row(t('Project', 'المشروع'), t(p.en, p.ar))}{row(t('Amount', 'المبلغ'), 'SAR ' + n.toLocaleString('en'), true)}{row(t('Institution', 'المؤسسة'), t(I.en, I.ar))}{row(t('Pay to', 'الدفع إلى'), t(I.en + ', project account', I.ar + '، حساب المشروع'))}{row('IBAN', 'SA03 8000 0000 6080 1016 7519', true)}
          <p className="small muted" style={{ marginTop: 12 }}>{t('Bunyan does not receive or hold investor funds. You pay the institution directly.', 'بنيان لا يستلم أموال المستثمرين ولا يحتفظ بها. الدفع مباشرة للمؤسسة.')}</p>
        </div>}
        {step === 5 && <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="badge b-success" style={{ alignSelf: 'flex-start' }}>{t('Subscription submitted', 'تم إرسال طلب المساهمة')}</span>
          <h2 className="h-2">{t('SAR ' + n.toLocaleString('en') + ' in ' + p.en, n.toLocaleString('en') + ' ريال في ' + p.ar)}</h2>
          <div className="ev-row card" style={{ padding: 14 }}><span className="muted small">{t('Reference', 'الرقم المرجعي')}</span><span className="mono">{ref}</span></div>
          <div className="list">{[[1, 'Subscription submitted', 'تم إرسال طلب المساهمة'], [0, 'Payment received by the institution', 'استلام المؤسسة للمبلغ'], [0, 'Allocation confirmed', 'تأكيد التخصيص'], [0, 'Certificates issued in your name', 'إصدار الشهادات باسمك']].map(([on, en, ar], i) => <div key={i}><Icon name={on ? 'circle-check' : 'circle'} style={{ color: on ? 'var(--teal-600)' : 'var(--slate-300)' }} /><span>{t(en, ar)}</span></div>)}</div>
          <a className="btn btn-primary btn-lg" href={h('app/portfolio')}>{t('Go to my portfolio', 'روح لمحفظتي')}</a>
        </div>}
        {step < 5 && <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          {step > 0 ? <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>{t('Back', 'رجوع')}</button> : <span></span>}
          {step < 4 ? <button className="btn btn-primary" disabled={!can} onClick={() => setStep(step + 1)}>{t('Continue', 'التالي')}</button> : <button className="btn btn-accent btn-lg" onClick={confirm}>{t('Confirm subscription', 'تأكيد المساهمة')}</button>}
        </div>}
      </div>
      <DemoNote />
    </main><AppFooter /></>;
}
Object.assign(window, { Session, extraHoldings, DocCtx, DOCS, DocViewer, DocList, Invest, Stepper });
