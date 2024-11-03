import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Postgres } from '@telegraf/session/pg';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { errorMiddleware } from '../common/middlewares';
import { GeneratorModule } from '../generator/generator.module';
import { AdminScene } from '../scenes/admin';
import { TextModeWizard } from '../scenes/text';
import { AppUpdate } from './app.update';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.postgres'] }),
      TelegrafModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory(configService: ConfigService) {
            const store = Postgres({
               host: configService.getOrThrow('POSTGRES_HOST'),
               port: configService.getOrThrow('POSTGRES_PORT'),
               database: configService.getOrThrow('POSTGRES_DB'),
               user: configService.getOrThrow('POSTGRES_USER'),
               password: configService.getOrThrow('POSTGRES_PASSWORD')
            });
            return {
               token: configService.getOrThrow('TOKEN'),
               middlewares: [errorMiddleware, session({ store })],
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
   providers: [AppUpdate, TextModeWizard, AdminScene]
})
export class AppModule {}
