const path = require('path');
try {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
} catch (e) {
  // Ignored in Vercel
}
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);


// ─── CORS ────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4000'],
  methods: ['POST'],
}));
app.use(express.json({ limit: '10kb' })); // Limit payload size


// Trust the first proxy in Vercel to properly handle x-forwarded-for headers
app.set('trust proxy', 1);

// Max 3 emails per IP every 15 minutes
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again in 15 minutes.' }
});


// ─── Helpers ────────────────────────────────────────────────
function sanitize(str) {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Minimum time (ms) to "process" the request — makes rapid-fire bot spam harder
const MIN_RESPONSE_TIME_MS = 1500;
function enforceMinTime(startTime) {
  const elapsed = Date.now() - startTime;
  const remaining = MIN_RESPONSE_TIME_MS - elapsed;
  return remaining > 0 ? new Promise(r => setTimeout(r, remaining)) : Promise.resolve();
}


// ─── Route ──────────────────────────────────────────────────
app.post('/api/send-email', emailLimiter, async (req, res) => {
  const startTime = Date.now();
  const { nome, email, mensagem, _honeypot, _loadedAt } = req.body;

  // 1. Honeypot — invisible field that only bots fill
  if (_honeypot) {
    // Pretend success so bots don't know they were caught
    await enforceMinTime(startTime);
    return res.status(200).json({ success: true, message: 'Mensagem enviada!' });
  }

  // 2. Timing check — reject if form was submitted < 3s after page load
  if (_loadedAt && (Date.now() - _loadedAt) < 3000) {
    await enforceMinTime(startTime);
    return res.status(200).json({ success: true, message: 'Mensagem enviada!' });
  }

  // 3. Basic validation
  if (!nome || !email || !mensagem) {
    await enforceMinTime(startTime);
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // 4. Length limits
  if (nome.length > 100 || email.length > 254 || mensagem.length > 2000) {
    await enforceMinTime(startTime);
    return res.status(400).json({ error: 'One or more fields exceed the maximum allowed length.' });
  }

  // 5. Email format validation
  if (!isValidEmail(email)) {
    await enforceMinTime(startTime);
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // 6. Sanitize inputs before using in HTML
  const safeNome = sanitize(nome);
  const safeEmail = sanitize(email);
  const safeMensagem = sanitize(mensagem);

  try {
    const data = await resend.emails.send({
      from: `Contato Portfólio <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Nova mensagem de: ${safeNome}`,
      reply_to: email, // Isso permite que você responda direto para quem te enviou
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; padding: 32px 16px;">
          <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e6ea; overflow: hidden;">

            <!-- Header -->
            <div style="padding: 28px 32px 20px 32px;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #1a1a2e;">Nova mensagem no Portfolio</h1>
            </div>

            <!-- Content -->
            <div style="padding: 0 32px 28px 32px;">

              <!-- Contact Info Block -->
              <div style="background-color: #f5f8fc; border-left: 4px solid #4a90d9; border-radius: 6px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px 0; font-size: 15px; color: #333;"><strong style="color: #1a1a2e;">Nome:</strong> ${safeNome}</p>
                <p style="margin: 0; font-size: 15px; color: #333;"><strong style="color: #1a1a2e;">E-mail:</strong> <a href="mailto:${safeEmail}" style="color: #4a90d9; text-decoration: none;">${safeEmail}</a></p>
              </div>

              <!-- Message Section -->
              <div style="margin-bottom: 8px;">
                <p style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #1a1a2e;">Mensagem:</p>
                <div style="border-left: 4px solid #4a90d9; padding: 16px 20px; color: #555; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${safeMensagem}</div>
              </div>

            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #e2e6ea; padding: 20px 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #888;">Esta e uma notificacao automatica enviada pelo seu portfolio.</p>
              <a href="mailto:${safeEmail}" style="font-size: 14px; font-weight: 600; color: #c0392b; text-decoration: none;">Responder a este e-mail</a>
            </div>

          </div>
        </div>
      `
    });

    await enforceMinTime(startTime);
    res.status(200).json({ success: true, message: 'Mensagem enviada!' });
    
  } catch (error) {
    await enforceMinTime(startTime);
    res.status(500).json({ error: 'Falha ao processar o envio do e-mail.' });
  }
});

const PORT = process.env.PORT || 3000;

// Export app for Vercel
module.exports = app;

if (process.env.NODE_ENV !== 'production' || process.env.LISTEN_APP === 'true') {
  app.listen(PORT);
}