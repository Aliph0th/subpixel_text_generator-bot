import { Scene, SceneEnter, Ctx, On, Message } from 'nestjs-telegraf';
import { MESSAGES, REGEX, SCENES } from '../common/constants';
import { IMessage, ISceneContext } from '../common/interfaces';

const optionMap = {
   single: MESSAGES.SEND_ONE_NUMBER,
   double: MESSAGES.SEND_TWO_NUMBERS,
   both: MESSAGES.SEND_NUMBER_OR_NUMBERS
};

@Scene(SCENES.MENU_NUMBERS)
export class NumberEnterScene {
   private validator: (_: string) => boolean;
   constructor() {
      this.onText = this.onText.bind(this);
   }
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: ISceneContext) {
      const match: RegExpExecArray = ctx.scene.state.action.matchAll(REGEX.NUMBERS_CONSTRAINTS).next().value;

      this.validator = (input: string) => {
         const values = input
            .split(' ')
            .map(Number)
            .filter(x => !isNaN(x));
         if (values.length < 1 || values.length > 2) {
            return false;
         }
         if (match) {
            if (+match.groups.min && values.some(x => x < +match.groups.min)) {
               return false;
            }
            if (+match.groups.max && values.some(x => x > +match.groups.max)) {
               return false;
            }
         }
         return true;
      };
      let message = optionMap[ctx.scene.state.option];
      if (+match?.groups?.min || +match?.groups?.max) {
         if (+match.groups?.min) {
            message += `\nМинимум: ${match.groups.min}`;
         }
         if (+match.groups?.max) {
            message += `\nМаксимум: ${match.groups.max}`;
         }
      }
      if (!ctx.scene.state?.silent) {
         await ctx.reply(message);
      }
   }

   @On('text')
   async onText(@Ctx() ctx: ISceneContext, @Message() msg: IMessage) {
      if (!this.validator(msg.text)) {
         await ctx.reply(MESSAGES.ERROR.INVALID_DATA_FORMAT);
         return;
      }
      ctx.session.menu.results[ctx.scene.state.menuID][ctx.scene.state.resulting] = msg.text;
      await ctx.reply(MESSAGES.OK);
      if (ctx.scene.state.sceneID) {
         await ctx.scene.enter(ctx.scene.state.sceneID, { cursor: ctx.scene.state.wizardStep, silent: true });
      } else {
         await ctx.scene.leave();
      }
   }
}
