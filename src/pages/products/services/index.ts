import axios from 'axios';
import { productsTypeRequest, productsTypeResponse } from './types';

export class productsTypeServices {
  static async get(): Promise<productsTypeResponse[]> {
    try {
      const { data } = await axios.get('http://localhost:8800/products'); // Certifique-se de que este é o caminho correto para a sua API.
      return data;
    } catch (error) {
      // Adicione um tratamento de erro adequado aqui
      console.error('Erro na solicitação:', error);
      throw new Error('Falha ao obter os dados do usuário'); // Customize a mensagem de erro conforme necessário
    }
  }

  
  static async create(values: productsTypeRequest): Promise<void> {
    await axios.post('http://localhost:8800/products', values);
  }

  static async patch(values: productsTypeRequest): Promise<void> {
    await axios.patch('http://localhost:8800/products', values);
  }
}
