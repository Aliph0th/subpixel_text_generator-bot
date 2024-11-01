import axios, { AxiosInstance } from 'axios';
import { GeneratorModuleOptions, IGeneratorClient, IGeneratorRequest, Mode } from '../common/interfaces';

export class GeneratorClient implements IGeneratorClient {
   private readonly client: AxiosInstance;
   constructor(options: GeneratorModuleOptions) {
      this.client = axios.create(options);
   }

   async request(mode: Mode, data: IGeneratorRequest) {
      const response = await this.client.post<Buffer>(`/generate/${mode}`, data, {
         responseType: 'arraybuffer'
      });
      return Buffer.from(response.data);
   }
}
