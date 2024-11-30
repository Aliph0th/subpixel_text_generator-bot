import { Injectable } from '@nestjs/common';
import { BuildedButton, ButtonOptions, IBoolButton, IMenuState, ISceneContext } from '../common/interfaces';
import { getNextID } from '../utils';

@Injectable()
export class MenuBuilder {
   constructor(/*@InjectBot() private readonly bot: Telegraf<ISceneContext>*/) {}
   private buildHint = (menu: IMenuState, hint: string) => {
      const menuID = menu.menuID;
      const hintID = (menu.hints[menuID] ??= { currentID: getNextID() }).currentID;
      menu.hints[menuID].currentID = getNextID(hintID);
      menu.hints[menuID][hintID] = hint;
      return `(hint)-m:${menuID}-h:${hintID}`;
   };
   bool = (options: ButtonOptions<IBoolButton>) => (ctx: ISceneContext) => {
      {
         const menuID = ctx.session.menu.menuID;
         ctx.session.menu.results[menuID][options.resultingProperty] = options.default || false;
         const button: BuildedButton = {
            title: options.title,
            resultingProperty: options.resultingProperty,
            action: `(btn)-t:bool-m:${menuID}-p:${options.resultingProperty}`
         };
         if (options.hint) {
            button.hintAction = this.buildHint(ctx.session.menu, options.hint);
         }
         return button;
      }
   };
}
