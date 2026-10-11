// Mathrubhumi Enterprises — Apple-style interactions
(function(){
  var navLinks = document.getElementById('navLinks');
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function(e){
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  // Scroll reveal
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  // Lightbox
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  window.openLB = function(src, alt){
    if (!lb || !lbImg) return;
    lbImg.src = src; lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeLB = function(){
    if (!lb || !lbImg) return;
    lb.classList.remove('open'); lbImg.src = '';
    document.body.style.overflow = '';
  };
  if (lb) {
    lb.addEventListener('click', function(e){ if (e.target === lb) window.closeLB(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') window.closeLB(); });
  }

  // Location
  window.fetchLoc = function(){
    var inp = document.getElementById('fLoc');
    var st = document.getElementById('locSt');
    if (!navigator.geolocation) { st.textContent = 'Geolocation not supported — type your city manually.'; return; }
    st.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(function(p){
      inp.value = 'Lat: ' + p.coords.latitude.toFixed(5) + ', Lon: ' + p.coords.longitude.toFixed(5);
      st.textContent = 'Location captured.';
    }, function(){
      st.textContent = 'Could not get location — type your city manually.';
    }, { timeout: 10000 });
  };

  // Dynamic services
  window.addSvc = function(){
    var box = document.getElementById('svcBox');
    var row = document.createElement('div');
    row.className = 'svc-row';
    row.innerHTML = '<input class="svc-n" placeholder="Service (e.g. Fabrication)" required>' +
      '<input class="svc-q" placeholder="Qty / unit" required>' +
      '<button type="button" class="icon-btn" onclick="this.parentElement.remove()" aria-label="Remove">×</button>';
    box.appendChild(row);
  };

  // Quote -> email
  var form = document.getElementById('qform');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var g = function(id){ return (document.getElementById(id).value || '').trim(); };
      var name = g('fName'), phone = g('fPhone'), email = g('fEmail'), loc = g('fLoc'), msg = g('fMsg');
      var lines = [];
      document.querySelectorAll('.svc-row').forEach(function(r, i){
        var n = (r.querySelector('.svc-n').value || '').trim();
        var q = (r.querySelector('.svc-q').value || '').trim();
        if (n) lines.push('  ' + (i+1) + '. ' + n + ' — ' + q);
      });
      var body = 'New Lead Details:\n-----------------------------------------\n' +
        'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + '\nLocation: ' + (loc || 'Not provided') + '\n\n' +
        'Services & Quantities:\n-----------------------------------------\n' + (lines.join('\n') || '  None specified') +
        '\n\nProject Description:\n-----------------------------------------\n' + msg;
      window.location.href = 'mailto:mathrubhuie@gmail.com?subject=' +
        encodeURIComponent('New Project Inquiry from ' + name) + '&body=' + encodeURIComponent(body);
      var ok = document.getElementById('okMsg');
      if (ok) ok.style.display = 'block';
    });
  }

  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
})();
