# index.html: cordova.js যোগ করো script.js এর আগে
with open('index.html') as f:
    html = f.read()
if 'cordova.js' not in html:
    html = html.replace(
        '<script src="script.js"></script>',
        '<script src="cordova.js"></script>\n<script src="script.js"></script>'
    )
    with open('index.html', 'w') as f:
        f.write(html)
    print("index.html updated")
else:
    print("index.html already has cordova.js")

# script.js: হার্ডওয়্যার ব্যাক বাটন হ্যান্ডলার যোগ করো
with open('script.js') as f:
    js = f.read()
if 'onHardwareBack' not in js:
    addition = '''
/* ============================== ANDROID HARDWARE BACK BUTTON (Cordova) ============================== */
document.addEventListener("deviceready", function(){
  document.addEventListener("backbutton", onHardwareBack, false);
}, false);

function onHardwareBack(e){
  if(e && e.preventDefault) e.preventDefault();
  if(currentAppId === "messages" && currentThreadId){ handleBack(); return; }
  if(currentAppId){ closeApp(false); return; }
  if(window.navigator && navigator.app && navigator.app.exitApp){ navigator.app.exitApp(); }
}
'''
    js = js.replace(
        'document.addEventListener("DOMContentLoaded", boot);',
        addition + '\ndocument.addEventListener("DOMContentLoaded", boot);'
    )
    with open('script.js', 'w') as f:
        f.write(js)
    print("script.js updated")
else:
    print("script.js already has onHardwareBack")
