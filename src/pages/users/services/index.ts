import axios from 'axios';
import { userTypeRequest, userTypeResponse } from './types';

export class UserTypeServices {


  static async get(): Promise<userTypeResponse[]> {
    const { data } = await axios.get('http://localhost:8800/users');
    return data;
  }

  static async getOne(guid: string): Promise<userTypeResponse> {
    const { data } = await axios.get(`http://localhost:8800/users/${guid}`);
    return data;
  }

  static async create(values: userTypeRequest): Promise<void> {
    await axios.post('http://localhost:8800/users', values);
  }

  static async update(values: userTypeRequest): Promise<void> {
    await axios.put('http://localhost:8800/users', values);
  }

  static async patch(values: userTypeRequest): Promise<void> {
    await axios.patch('http://localhost:8800/users', values);
  }

  static async delete(guid: string): Promise<void> {
    await axios.delete(`http://localhost:8800/users/${guid}`, {
      data: { guid: guid },
    });
  }
}
