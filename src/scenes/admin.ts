import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { MESSAGES, SCENES } from '../common/constants';
import { ISceneContext } from '../common/interfaces';

@Scene(SCENES.ADMIN)
export class AdminScene {
   constructor() {}
   @SceneEnter()
   async onSceneEnter(@Ctx() ctx: ISceneContext) {
      if (!ctx.scene.state?.silent) {
         await ctx.reply(MESSAGES.ADMIN.ENTER);
      }
   }
}
