// ScreenPilot static host shim — screenpilot.tech (Porkbun static)
// Loaded before main app script. Patches hosted-only behavior after globals exist.
(function () {
  'use strict';

  var HOSTED = /screenpilot\.tech$/i.test(window.location.hostname);
  if (!HOSTED) return;

  window.ScreenPilotHosted = {
    isHosted: true,
    localIdeUrl: 'http://127.0.0.1:11435/gui',
    localHint: 'Run RawrXD-Win32IDE on this PC, then open http://127.0.0.1:11435/gui locally. This page is a UI preview only.'
  };

  // Expand CSP before any iframe loads (meta tag may still be restrictive)
  var CSP = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' http://localhost:* ws://localhost:* http://127.0.0.1:* ws://127.0.0.1:* https:",
    "img-src 'self' data: blob: https:",
    "frame-src 'self' https: http://localhost:* http://127.0.0.1:* blob:",
    "media-src 'self' blob:",
    "worker-src 'self' blob:"
  ].join('; ');

  var cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  if (cspMeta) cspMeta.setAttribute('content', CSP);

  document.documentElement.classList.add('screenpilot-hosted');

  function toast(msg) {
    if (typeof window.addMessage === 'function') {
      window.addMessage('system', msg, { skipMemory: true });
    } else {
      console.info('[ScreenPilot hosted]', msg);
    }
  }

  function backendOnline() {
    return !!(window.State && window.State.backend && window.State.backend.online);
  }

  function wrapLocalOnly(name, label) {
    var orig = window[name];
    if (typeof orig !== 'function' || orig._hostedWrapped) return;
    window[name] = function () {
      if (!backendOnline()) {
        toast('\u26A0 **' + label + '** needs a local RawrXD backend.\n\n' + window.ScreenPilotHosted.localHint);
        return undefined;
      }
      return orig.apply(this, arguments);
    };
    window[name]._hostedWrapped = true;
  }

  var LOCAL_ONLY = [
    ['bridgeLoadModel', 'Load model (MASM bridge)'],
    ['bridgeUnloadModel', 'Unload model'],
    ['fetchBridgeProfiles', 'Model bridge profiles'],
    ['fetchBridgeCapabilities', 'Engine capabilities'],
    ['applyHotpatch', 'Apply hotpatch'],
    ['revertHotpatch', 'Revert hotpatch'],
    ['rePEAnalyze', 'PE analyze'],
    ['reDisassemble', 'Disassemble'],
    ['reGGUFInspect', 'GGUF inspect'],
    ['reDeobfuscate', 'Deobfuscator'],
    ['reMemScan', 'Memory scan'],
    ['reResolveSymbols', 'Symbol resolve'],
    ['reOmegaScan', 'Omega suite scan'],
    ['installVsixFromPath', 'VSIX install'],
    ['installVsixFromFile', 'VSIX load'],
    ['installFromMarketplaceId', 'Marketplace install'],
    ['installNativeExt', 'Native extension load'],
    ['installPsm1Ext', 'PowerShell extension import'],
    ['extPsAction', 'PowerShell extension action'],
    ['extPsCreate', 'Create PowerShell extension'],
    ['browserExtractContent', 'Extract page content'],
    ['browserSendToModel', 'Send page to model']
  ];

  function injectBanner() {
    if (document.getElementById('screenpilot-hosted-banner')) return;
    var bar = document.createElement('div');
    bar.id = 'screenpilot-hosted-banner';
    bar.innerHTML =
      '<span><strong>ScreenPilot Preview</strong> — UI runs in your browser; inference and IDE bridge stay on your PC.</span>' +
      '<a href="/" title="Product home">Home</a>' +
      '<a href="http://127.0.0.1:11435/gui" target="_blank" rel="noopener noreferrer" title="Local IDE (when running)">Local IDE</a>';
    document.body.appendChild(bar);
  }

  function applyPatches() {
    LOCAL_ONLY.forEach(function (pair) { wrapLocalOnly(pair[0], pair[1]); });

    var origLaunch = window.launchWin32IDE;
    if (typeof origLaunch === 'function' && !origLaunch._hostedWrapped) {
      window.launchWin32IDE = function () {
        toast('\uD83D\uDDA5 **Desktop Preview** — Start `RawrXD-Win32IDE.exe` on this machine, then open `http://127.0.0.1:11435/gui`. Ghost/embed from HTTPS is blocked by browser security.');
        window.open('/', '_blank');
      };
      window.launchWin32IDE._hostedWrapped = true;
    }

    var origGhost = window.ghostIntoIDE;
    if (typeof origGhost === 'function' && !origGhost._hostedWrapped) {
      window.ghostIntoIDE = function () {
        toast('\uD83D\uDC7B **Ghost IDE** cannot embed `localhost` inside this HTTPS preview (mixed content). ' + window.ScreenPilotHosted.localHint);
      };
      window.ghostIntoIDE._hostedWrapped = true;
    }

    injectBanner();
  }

  function waitForApp() {
    if (typeof window.addMessage === 'function' && window.State) {
      applyPatches();
      return;
    }
    if (waitForApp._tries > 120) return;
    waitForApp._tries = (waitForApp._tries || 0) + 1;
    setTimeout(waitForApp, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForApp);
  } else {
    waitForApp();
  }
})();
