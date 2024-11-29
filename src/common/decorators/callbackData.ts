import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { IContext } from '../interfaces';

export const CallbackData = createParamDecorator((_, context: ExecutionContext) => {
   const ctx = TelegrafExecutionContext.create(context).getContext<IContext>();
   const update = ctx.update as Update.CallbackQueryUpdate<CallbackQuery.DataQuery>;
   return update.callback_query.data;
});
