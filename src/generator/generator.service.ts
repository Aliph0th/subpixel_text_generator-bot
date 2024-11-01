import { Inject, Injectable, Logger } from '@nestjs/common';
import { CLIENTS } from '../constants';
import { IGeneratorClient, IGeneratorRequest, Mode } from '../interfaces';
@Injectable()
export class GeneratorService {
   constructor(@Inject(CLIENTS.GENERATOR) private readonly generatorClient: IGeneratorClient) {}
   async request(mode: Mode, data: IGeneratorRequest) {
      try {
         const generatedBuffer = await this.generatorClient.request(mode, data);
         return generatedBuffer;
      } catch (error) {
         Logger.error(`mode: ${mode} data: ${JSON.stringify(data)} error: ${error}`, GeneratorService.name);
         return null;
      }
   }
}
