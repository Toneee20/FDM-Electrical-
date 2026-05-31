/* FMD Navigation Fix — paste this as a separate file or add before </body> */
(function() {
  function showPage(name) {
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.cssText = 'display:none!important';
      pages[i].classList.remove('active');
    }
    var target = document.getElementById('page-' + name);
    if (target) {
      target.style.cssText = 'display:block!important';
      target.classList.add('active');
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Update active nav state
    var navLinks = document.querySelectorAll('[data-nav], [data-page], [data-mnav]');
    for (var j = 0; j < navLinks.length; j++) {
      var val = navLinks[j].getAttribute('data-nav') || 
                navLinks[j].getAttribute('data-page') || 
                navLinks[j].getAttribute('data-mnav');
      navLinks[j].classList.toggle('active', val === name);
    }
    
    try { if (name === 'cart') renderCart(); } catch(e) {}
    try { if (name === 'account') renderAccount(); } catch(e) {}
    try { if (name === 'shop') paintProductImages(); } catch(e) {}
    try { closeDrawer(); } catch(e) {}
    return false;
  }
  
  // Override the broken showPage with this working one
  window.showPage = showPage;
  
  // Wire all nav elements on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Re-wire all [data-page] elements with direct onclick
    var all = document.querySelectorAll('[data-page]');
    for (var i = 0; i < all.length; i++) {
      (function(el) {
        var page = el.getAttribute('data-page');
        el.onclick = function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showPage(page);
          return false;
        };
      })(all[i]);
    }
    console.log('FMD Nav Fix: wired ' + all.length + ' nav elements');
  });
})();
