import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CLIENTS } from '../constants';
import { GeneratorModuleAsyncOptions } from '../interfaces';
import { GeneratorClient } from './generator.client';
import { GeneratorService } from './generator.service';

@Module({
   providers: [GeneratorService],
   exports: [GeneratorService]
})
export class GeneratorModule {
   static forRootAsync(options: GeneratorModuleAsyncOptions): DynamicModule {
      return {
         module: GeneratorModule,
         global: options.isGlobal,
         imports: options.imports,
         providers: [this.createServiceProvider(options)]
      };
   }

   private static createServiceProvider(options: GeneratorModuleAsyncOptions): Provider {
      return {
         provide: CLIENTS.GENERATOR,
         async useFactory(...args: any[]) {
            const opts = await options.useFactory(...args);
            const client = new GeneratorClient(opts);
            return client;
         },
         inject: options.inject
      };
   }
}
