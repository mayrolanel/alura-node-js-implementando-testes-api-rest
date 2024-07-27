import {
  afterAll, afterEach, beforeEach, describe, expect, it,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

describe('Login', () => {
  let servidor;

  beforeEach(() => {
    const porta = 3000;
    servidor = app.listen(porta);
  });

  it('deve obrigar o campo senha', async () => {
    const data = {
      email: 'raphael@teste.com.br',
    };

    const response = await request(servidor).post('/login').send(data);

    expect(response.status).toBe(500);
    expect(response.body).toContain('A senha de usuario é obrigatório.');
  });

  it('deve alerta quando usuario nao cadastrado', async () => {
    const data = {
      email: 'inexistente@teste.com.br',
      senha: '123456',
    };

    const response = await request(servidor).post('/login').send(data);

    expect(response.status).toBe(500);
    expect(response.body).toContain('Usuário não cadastrado.');
  });

  it('deve alerta quando e senha invalida', async () => {
    const data = {
      email: 'raphael@teste.com.br',
      senha: '12345',
    };

    const response = await request(servidor).post('/login').send(data);

    expect(response.status).toBe(500);
    expect(response.body).toContain('Usuário ou senha inválido.');
  });

  it('deve fazer login e exibir o acessToken', async () => {
    const data = {
      email: 'raphael@teste.com.br',
      senha: '123456',
    };

    const response = await request(servidor).post('/login').send(data);

    expect(response.status).toBe(201);
    expect(response.body.message).toContain('Usuário conectado');
    expect(response.body).toHaveProperty('accessToken');
  });

  afterEach(() => {
    servidor.close();
  });
});
