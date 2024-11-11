'use server'

import { HTTPError } from 'ky'
import nodemailer from 'nodemailer'
import { z } from 'zod'

import { recoverPassword } from '@/http/user/recover-password'

const sendEmail = async (email: string, recoverCode: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de senha',
    html: `
            <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
    </style>
    <title>Redefinição de Senha</title>
    <style>
      body {
        font-family: "Roboto", sans-serif;
        background-color: #18181b;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #18181b;
        padding: 20px;
        border: #303032 2px solid;
        border-radius: 5px;
        margin-top: 2rem;
        color: #eeeeee;
      }
      .header {
        text-align: center;
        padding: 20px;
        background-color: #6366f1;
        color: #eeeeee;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .header img {
        max-width: 150px;
        margin-bottom: 10px;
      }
      .content {
        margin: 20px 0;
        text-align: center;
      }
      .content h1 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #eeeeee;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        color: #ffffff;
        background-color: #6366f1;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #9fa191;
        margin-top: 20px;
      }
      .social-icons {
        margin: 20px 0;
        text-align: center;
      }
      .social-icons img {
        width: 24px;
        margin: 0 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>SafeBudget</h1>
      </div>
      <div class="content">
        <h1>Olá,</h1>
        <p>
          Esta é a sua nova senha temporária.
            <br />
            <strong>${recoverCode}</strong>
        </p>
        <a href="projeto-integrador-3.vercel.app/auth/sign-in" class="button">Fazer Login</a>
        <br />
        <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
      </div>
      <div class="footer">
        <p>© 2024 SafeBudget. Todos os direitos reservados.</p>
      </div>
    </div>
 </body>
</html>
        `,
  }

  await transporter.sendMail(mailOptions)
}

const recoverPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

export async function recoverPasswordAction(formData: FormData) {
  try {
    const email = formData.get('email')
    const validation = recoverPasswordSchema.safeParse({ email })

    if (!validation.success) {
      return {
        success: false,
        message: 'Dados inválidos',
        errors: validation.error.flatten().fieldErrors,
      }
    }

    const response = await recoverPassword({ email: validation.data.email })

    await sendEmail(validation.data.email, response.recoverCode)

    return {
      success: true,
      message: 'Email de recuperação enviado',
      errors: null,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Erro inesperado. Tente novamente em alguns minutos.',
      errors: null,
    }
  }
}
