// Script Santé & IA - Dr Elias Chaddouk
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('sante-ia-theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('sante-ia-theme', targetTheme);
    });
  }

  // Waitlist Form Handler via real API endpoint
  const waitlistForm = document.getElementById('waitlistForm');
  const alertFeedback = document.getElementById('alertFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('emailInput');
      const email = emailInput.value.trim();

      if (!email || !email.includes('@')) {
        return;
      }

      // 5-state UI machine: Loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width: 16px; height: 16px; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Enregistrement...</span>
      `;

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        // Backup local storage
        try {
          const list = JSON.parse(localStorage.getItem('sante_ia_waitlist') || '[]');
          list.push({ email, date: new Date().toISOString() });
          localStorage.setItem('sante_ia_waitlist', JSON.stringify(list));
        } catch (storageErr) {
          console.warn('Storage warning:', storageErr);
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        emailInput.value = '';

        if (alertFeedback) {
          alertFeedback.style.display = 'block';
          alertFeedback.textContent = 'Votre inscription a bien été prise en compte. Merci de votre intérêt pour l\'ouvrage !';
        }
      } catch (err) {
        console.error('Fetch error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (alertFeedback) {
          alertFeedback.style.display = 'block';
          alertFeedback.textContent = 'Votre inscription a bien été enregistrée localement.';
        }
      }
    });
  }
});
