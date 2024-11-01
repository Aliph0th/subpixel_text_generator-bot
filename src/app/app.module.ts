import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { errorMiddleware } from '../middlewares';
import { session } from 'telegraf';
import { GeneratorModule } from '../generator/generator.module';
import { TextModeScene } from '../scenes/text';
import { AdminScene } from '../scenes/admin';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TelegrafModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(configService: ConfigService) {
            return {
               token: configService.getOrThrow('TOKEN'),
               middlewares: [errorMiddleware, session()],
               options: { handlerTimeout: 3.6e6 }
            };
         }
      }),
      GeneratorModule.forRootAsync({
         isGlobal: true,
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(configService: ConfigService) {
            return {
               baseURL: configService.getOrThrow('GENERATOR_BACKEND_URL')
            };
         }
      })
   ],
   providers: [AppUpdate, TextModeScene, AdminScene]
})
export class AppModule {}
