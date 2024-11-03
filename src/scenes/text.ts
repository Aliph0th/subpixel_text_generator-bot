import { Ctx, Hears, Message, Wizard, WizardStep } from 'nestjs-telegraf';
import { MESSAGES, SCENES } from '../common/constants';
import { IMessage, ISceneContext, IWizardContext } from '../common/interfaces';
import { GeneratorService } from '../generator/generator.service';

@Wizard(SCENES.MODE.TEXT)
export class TextModeWizard {
   constructor(private readonly generatorService: GeneratorService) {}
   @WizardStep(1)
   async onSceneEnter(@Ctx() ctx: IWizardContext) {
      await ctx.reply(MESSAGES.SEND_TEXT);
      ctx.session.options ??= {};
      ctx.session.options.mode = 0;
      ctx.wizard.next();
   }

   @Hears(/^[^/]/)
   @WizardStep(2)
   async onTextInput(@Ctx() ctx: ISceneContext, @Message() message: IMessage) {
      ctx.session.options.text = message.text;
   }
}
