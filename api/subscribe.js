export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Adresse e-mail invalide' });
    }

    const lead = {
      email,
      source: 'sante-ia.fr',
      consent: 'book_and_newsletter',
      submittedAt: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || null
    };

    console.log('[SANTE-IA WAITLIST]', JSON.stringify(lead));

    // Intégration Brevo native si BREVO_API_KEY est configurée
    if (process.env.BREVO_API_KEY) {
      try {
        const brevoPayload = {
          email,
          attributes: {
            SOURCE: 'sante-ia.fr',
            DATE_INSCRIPTION: lead.submittedAt
          },
          updateEnabled: true
        };

        if (process.env.BREVO_LIST_ID) {
          brevoPayload.listIds = [Number(process.env.BREVO_LIST_ID)];
        }

        const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY
          },
          body: JSON.stringify(brevoPayload)
        });

        console.log('[BREVO SYNC]', brevoRes.status);
      } catch (brevoErr) {
        console.warn('[BREVO ERROR]', brevoErr);
      }
    }

    // Webhook générique si configuré
    if (process.env.BREVO_WEBHOOK_URL) {
      try {
        await fetch(process.env.BREVO_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead)
        });
      } catch (webhookErr) {
        console.warn('Webhook notification error:', webhookErr);
      }
    }

    return res.status(200).json({ ok: true, message: 'Inscription enregistrée avec succès' });
  } catch (err) {
    console.error('Subscription error:', err);
    return res.status(500).json({ error: 'Erreur lors de l’enregistrement' });
  }
}
