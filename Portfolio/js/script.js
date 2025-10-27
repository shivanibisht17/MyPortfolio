// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Set year in footers (handles multiple pages)
  const years = document.querySelectorAll('#year, #year2, #year3, #year4');
  years.forEach(n => { if(n) n.textContent = new Date().getFullYear(); });

  // Theme toggling (dark/light)
  const themeKey = 'portfolio-theme';
  const applyTheme = (theme) => {
    if(theme === 'light') {
      document.documentElement.style.setProperty('--bg-1','#f8fafc');
      document.documentElement.style.setProperty('--bg-2','#eef2ff');
      document.documentElement.style.setProperty('--text','#0b1220');
      document.documentElement.style.setProperty('--muted','#64748b');
      document.documentElement.style.setProperty('--glass-border','rgba(2,6,23,0.06)');
    } else {
      document.documentElement.style.removeProperty('--bg-1');
      document.documentElement.style.removeProperty('--bg-2');
      document.documentElement.style.removeProperty('--text');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--glass-border');
    }
  };

  // initial theme from storage
  const initTheme = localStorage.getItem(themeKey) || 'dark';
  applyTheme(initTheme);

  // hook buttons (there are multiple theme buttons across pages)
  document.querySelectorAll('#themeToggle, #themeToggle2, #themeToggle3, #themeToggle4').forEach(btn => {
    if(!btn) return;
    btn.addEventListener('click', () => {
      const current = localStorage.getItem(themeKey) || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(themeKey, next);
      applyTheme(next);
    });
  });

  // mobile nav toggles (buttons have different IDs on pages)
  document.querySelectorAll('#mobileNavBtn, #mobileNavBtn2, #mobileNavBtn3, #mobileNavBtn4').forEach(btn => {
    if(!btn) return;
    btn.addEventListener('click', () => {
      const mobileNav = document.getElementById('mobileNav');
      if(!mobileNav) return;
      const open = mobileNav.getAttribute('aria-hidden') === 'false';
      mobileNav.setAttribute('aria-hidden', open ? 'true' : 'false');
      if(!open) mobileNav.style.display = 'block'; else mobileNav.style.display = 'none';
    });
  });

  // Contact form: basic mailto fallback + optional EmailJS example (commented)
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const status = document.getElementById('formStatus');

      if(!name || !email || !message) {
        status.textContent = 'Please fill all fields.';
        return;
      }

      // Fallback: open default mail client
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:bishtshivani220385@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client...';
    });
  }

  const mailToBtn = document.getElementById('mailToBtn');
  if(mailToBtn) {
    mailToBtn.addEventListener('click', () => {
      window.location.href = 'mailto:bishtshivani220385@gmail.com';
    });
  }

  // EmailJS integration guidance (optional):
  /*
    To send messages directly without leaving the site:
    1. Sign up at https://www.emailjs.com/
    2. Create an email service, a template and get your userID (public key).
    3. Add EmailJS script:
       <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
       emailjs.init("YOUR_USER_ID");
    4. Use emailjs.send("service_id","template_id", { from_name: name, from_email: email, message: message })
       .then(() => { status.textContent = 'Message sent!'; })
       .catch(err => { status.textContent = 'Error sending message.'; console.error(err); });
  */

  // small accessibility: close mobile menu if click outside
  document.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');
    const btn = document.querySelector('#mobileNavBtn, #mobileNavBtn2, #mobileNavBtn3, #mobileNavBtn4');
    if(!mobileNav) return;
    if(mobileNav.getAttribute('aria-hidden') === 'false' && !mobileNav.contains(e.target) && !btn.contains(e.target)) {
      mobileNav.setAttribute('aria-hidden','true');
      mobileNav.style.display = 'none';
    }
  });

});
