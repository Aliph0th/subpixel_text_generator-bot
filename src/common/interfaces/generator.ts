import { ModuleMetadata } from '@nestjs/common/interfaces';
import { CreateAxiosDefaults } from 'axios';

export interface IGeneratorClient {
   request(mode: Mode, data: IGeneratorRequest): Promise<Buffer | null>;
}
export type GeneratorModuleOptions = CreateAxiosDefaults & { baseURL: string };
export type GeneratorModuleAsyncOptions = {
   isGlobal: boolean;
   useFactory?: (...args: any[]) => Promise<GeneratorModuleOptions> | GeneratorModuleOptions;
   inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;

export type Mode = 0 | 1 | 2;

export interface IGeneratorRequest {
   text: string;
}

export interface IScriptOptions {
   mode?: Mode;
   text?: string;
}
