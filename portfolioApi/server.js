require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuração do CORS para permitir requisições do seu front-end Angular
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Validação básica
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const data = await resend.emails.send({
      from: `Contato Portfólio <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Nova mensagem de: ${nome}`,
      reply_to: email, // Isso permite que você responda direto para quem te enviou
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2>Você recebeu um novo contato pelo Portfólio!</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail do remetente:</strong> ${email}</p>
          <hr>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-wrap;">${mensagem}</p>
        </div>
      `
    });

    console.log('E-mail enviado com sucesso:', data.id);
    res.status(200).json({ success: true, message: 'Mensagem enviada!' });
    
  } catch (error) {
    console.error('Erro ao enviar e-mail via Resend:', error);
    res.status(500).json({ error: 'Falha ao processar o envio do e-mail.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API de e-mail rodando em http://localhost:${PORT}`);
});