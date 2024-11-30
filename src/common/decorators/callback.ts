import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { CallbackQuery, CommonMessageBundle, Update } from 'telegraf/typings/core/types/typegram';
import { IContext } from '../interfaces';

export const CallbackData = createParamDecorator((regex: RegExp, context: ExecutionContext) => {
   const ctx = TelegrafExecutionContext.create(context).getContext<IContext>();
   const update = ctx.update as Update.CallbackQueryUpdate<CallbackQuery.DataQuery>;
   const data = update.callback_query.data.matchAll(regex).next().value as RegExpExecArray;
   return data.groups;
});

export const CallbackKeyboard = createParamDecorator((_, context: ExecutionContext) => {
   const ctx = TelegrafExecutionContext.create(context).getContext<IContext>();
   const update = ctx.update as Update.CallbackQueryUpdate;
   const data = update.callback_query.message as CommonMessageBundle;
   return data.reply_markup;
});
