import { describe, expect, it } from '@jest/globals';
import AluguelLivroService from '../../services/aluguelLivroService.js';

const aluguelLivroService = new AluguelLivroService();

describe('Aluguel Livro Service', () => {
  it('deve devolver a data de devolucao e validar quantidade de dias', async () => {
    const dataAlugado = new Date('2024-01-01');
    const numeroDiasAlugado = 5;
    const dataDevolucaoMock = new Date('2024-01-06');

    const dataDevolucao = await aluguelLivroService.calcularDataDevolucao(dataAlugado, numeroDiasAlugado);

    expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
  });
});
