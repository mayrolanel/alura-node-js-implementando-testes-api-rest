import { describe, expect, it } from '@jest/globals';
import nodemailer from 'nodemailer';
import 'dotenv/config';

describe('Disparo Email', () => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });

  const verificarConexao = () => new Promise((resolver, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolver(success);
      }
    });
  });

  it('deve validar a conexao com servidor de email', async () => {
    const estarConectado = true;

    const validaConexao = await verificarConexao();

    expect(validaConexao).toStrictEqual(estarConectado)
  });
});
