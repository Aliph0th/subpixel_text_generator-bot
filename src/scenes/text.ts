import { Ctx, Hears, Message, Scene, SceneEnter } from 'nestjs-telegraf';
import { MESSAGES, SCENES } from '../constants';
import { IMessage, ISceneContext } from '../interfaces';
import { GeneratorService } from '../generator/generator.service';

@Scene(SCENES.MODE.TEXT)
export class TextModeScene {
   constructor(private readonly generatorService: GeneratorService) {}
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: ISceneContext) {
      await ctx.reply(MESSAGES.SEND_TEXT);
   }

   @Hears(/^[^/]/)
   async onTextInput(@Ctx() ctx: ISceneContext, @Message() message: IMessage) {
      const generatedBuffer = await this.generatorService.request(0, { text: message.text });
      if (!generatedBuffer) {
         await ctx.reply(MESSAGES.ERROR.GENERATION);
         return;
      }
      await ctx.sendDocument(
         {
            source: generatedBuffer,
            filename: 'output.png'
         },
         { caption: MESSAGES.DONE }
      );
   }
}
