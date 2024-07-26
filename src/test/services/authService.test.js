import { describe, expect, it } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthService from '../../services/authService.js';
import Usuario from '../../models/usuario.js';

const authService = new AuthService();
describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuário deve possui um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Maria',
      email: 'maria3@teste.com',
    };

    const usuario = authService.cadastrarUsuario(usuarioMock);

    await expect(usuario).rejects.toThrowError('A senha do usuário é obrigatória!');
  });

  it('Senha deve ser encriptografada quando salva no banco', async () => {
    const data = {
      nome: 'Jose',
      email: 'jose@teste.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);
    const senhasIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    expect(senhasIguais).toStrictEqual(true);

    await Usuario.excluir(resultado.content.id);
  });

  it('bloquear cadastrar usuario com email duplicado', async () => {
    const data = {
      nome: 'Luana Brito',
      email: 'teste@gmail.com',
      senha: 'senha123',
    };

    const usuarioSave = authService.cadastrarUsuario(data);

    await expect(usuarioSave).rejects.toThrowError('O email já esta cadastrado!');
  });

  it('deve exibir mensagem de sucesso ao cadastrar usuario', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.message).toEqual('usuario criado');

    await Usuario.excluir(resultado.content.id);
  });
});
