import { Ctx, Hears, Message, Wizard, WizardStep } from 'nestjs-telegraf';
import { MESSAGES, SCENES } from '../common/constants';
import { IMessage, IWizardContext } from '../common/interfaces';
import { GeneratorService } from '../generator/generator.service';

@Wizard(SCENES.MODE.TEXT)
export class TextModeWizard {
   constructor(private readonly generatorService: GeneratorService) {}
   @WizardStep(1)
   async onSceneEnter(@Ctx() ctx: IWizardContext) {
      if (ctx.scene.state.cursor) {
         ctx.wizard.selectStep(ctx.scene.state.cursor);
         return;
      }
      if (!ctx.scene.state?.silent) {
         await ctx.reply(MESSAGES.SEND_TEXT);
      }
      ctx.session.options ??= {};
      ctx.session.options.mode = 0;
      ctx.wizard.next();
   }

   @WizardStep(2)
   @Hears(/^[^/]/)
   async onTextInput(@Ctx() ctx: IWizardContext, @Message() message: IMessage) {
      ctx.session.options.text = message.text;
      ctx.wizard.next();
   }
}
