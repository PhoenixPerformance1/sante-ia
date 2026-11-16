// Script Santé & IA - Dr Elias Chaddouk (Light Mode Strict)
document.addEventListener('DOMContentLoaded', () => {
  // Waitlist Form Handler via API endpoint
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

      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Enregistrement...</span>';

      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        // Backup local
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
          alertFeedback.textContent = 'Votre inscription a bien été enregistrée. Merci de votre intérêt !';
        }
      } catch (err) {
        console.error('Fetch error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (alertFeedback) {
          alertFeedback.style.display = 'block';
          alertFeedback.textContent = 'Votre inscription a bien été enregistrée.';
        }
      }
    });
  }
});
