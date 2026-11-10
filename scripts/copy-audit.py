"""Compare the redesign's UI copy with the original supplied ZIP."""
import json,re,zipfile,sys
from pathlib import Path
archive=sys.argv[1] if len(sys.argv)>1 else '/workspace/attachments/8ec4e842-386c-4704-b80d-44d6aab05958/Bunyan website redesign-2.zip'
allowed={('pages-home.jsx','نبني من الأساس، طابق بعد طابق.'):'نبني من الأساس، طابقًا بعد طابق.',('app.jsx','استخدم رقم تجريبي'):'استخدم رقمًا تجريبيًا'}
missing=[];reviewed=0
with zipfile.ZipFile(archive) as z:
 for name in z.namelist():
  if not name.endswith('.jsx'):continue
  original=z.read(name).decode();current=Path(name).read_text()
  for text in dict.fromkeys(re.findall(r"'((?:[^'\\]|\\.)*)'",original)):
   if ' ' not in text or not re.search('[A-Za-z\u0600-\u06ff]',text) or any(c in text for c in '<>{}\\'):continue
   if re.match(r'^[\d.]+px ',text):continue
   reviewed+=1
   if text not in current and allowed.get((name,text),'\0') not in current:missing.append({'file':name,'text':text})
report={'original_copy_strings_checked':reviewed,'missing':missing,'arabic_corrections':[{'file':file,'before':before,'after':after} for (file,before),after in allowed.items()]}
Path('artifacts').mkdir(exist_ok=True);Path('artifacts/copy-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2));assert not missing
