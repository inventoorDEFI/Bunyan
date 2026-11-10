"""Exercise the built site through Netlify Dev; requires Python Playwright + Chromium."""
import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
base=os.environ.get('BUNYAN_TEST_URL','http://127.0.0.1:8888')
out=Path('artifacts');out.mkdir(exist_ok=True)
errors=[];failed=[];checks=0
routes=['','projects','build','institutions','brokers','about','privacy','apply/institution','apply/broker','app/sign-in/investor','build/sign-in/developer','build/sign-in/partner','app/sign-in/inspector','app/sign-in/shariah','app/sign-in/admin','app/projects/najd-horizon','app/projects/khobar-marina','app/portfolio','app/invest/khobar-marina','build/app/developer','build/app/partner','app/home/inspector','app/home/shariah','app/home/admin']
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=browser.new_page()
 page.on('pageerror',lambda e:errors.append(str(e)))
 for width in [1440,390]:
  page.set_viewport_size({'width':width,'height':900})
  for lang in ['en','ar']:
   for route in routes:
    page.goto(f'{base}/#/{lang}'+('/'+route if route else ''));page.wait_for_timeout(90)
    checks+=1
    try:
     assert page.locator('main').count()>0,'missing main'
     assert page.locator('body').inner_text().strip(),'empty page'
     assert page.locator('html').get_attribute('dir')==('rtl' if lang=='ar' else 'ltr'),'direction'
     over=page.evaluate('document.documentElement.scrollWidth-innerWidth')
     assert over<=1,f'horizontal overflow {over}px'
    except AssertionError as e:failed.append(f'{width} {lang}/{route}: {e}')
   if width==390:
    page.goto(f'{base}/#/{lang}');page.get_by_role('button',name='Menu' if lang=='en' else 'القائمة',exact=True).click();assert page.locator('.drawer').is_visible();page.locator('.drawer a').first.click();expect(page.locator('.drawer')).to_have_count(0);checks+=1
 # Screenshot all content after scrolling to settle image decoding and reveal effects.
 for lang,width in [('en',1440),('ar',1440),('en',390),('ar',390)]:
  page.set_viewport_size({'width':width,'height':900});page.goto(f'{base}/#/{lang}')
  page.evaluate('document.fonts.ready');page.wait_for_timeout(300)
  for top in range(0,page.evaluate('document.body.scrollHeight'),650):page.evaluate('(y)=>scrollTo(0,y)',top);page.wait_for_timeout(60)
  page.evaluate('scrollTo(0,0)');page.wait_for_timeout(800)
  page.screenshot(path=str(out/f'home-{lang}-{width}.png'),full_page=True)
 # Marketing interactions, keyboard focus trap and form validation.
 page.set_viewport_size({'width':1440,'height':1000});page.goto(f'{base}/#/en')
 page.get_by_role('button',name='Sign in',exact=True).click();assert page.get_by_role('dialog').is_visible()
 page.keyboard.press('Shift+Tab');assert page.get_by_role('dialog').evaluate('(d)=>d.contains(document.activeElement)')
 page.keyboard.press('Escape');expect(page.get_by_role('dialog')).to_have_count(0)
 page.locator('#interest').scroll_into_view_if_needed();page.get_by_role('button',name='Submit',exact=True).click();assert page.locator('.ferr').count()>=4
 form=page.locator('#interest form')
 form.locator('#f-name').fill('Bunyan automated test');form.locator('#f-email').fill('qa@example.com')
 form.get_by_role('button',name='SAR 500–10K',exact=True).click();form.get_by_role('button',name='Fractional share in a project',exact=True).click();form.locator('input[type=checkbox]').check()
 with page.expect_response(lambda r:r.url.endswith('/api/leads')) as response: form.get_by_role('button',name='Submit',exact=True).click()
 assert response.value.status==201,f'Lead endpoint: {response.value.status} {response.value.text()}'
 expect(page.get_by_text('Your interest request has been created',exact=True)).to_be_visible()
 assert page.evaluate("localStorage.getItem('bunyan.leads')") is None
 checks+=4
 # Existing project filters and stage disclosure remain functional.
 page.goto(f'{base}/#/en/projects');page.get_by_role('button',name='In construction',exact=True).click();expect(page.locator('.pcard')).to_have_count(2)
 page.goto(f'{base}/#/en/build');page.locator('.track .floor').filter(has_text='Design and cost plan').click();expect(page.get_by_text('Drawings, bill of quantities and contractor.',exact=True)).to_be_visible();checks+=2
 browser.close()
report={'checks':checks,'failures':failed,'browser_errors':errors}
(out/'validation.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
assert not failed and not errors,'See artifacts/validation.json'
