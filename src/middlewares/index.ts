import { Logger } from '@nestjs/common';
import { Context, MiddlewareFn } from 'telegraf';

export const errorMiddleware: MiddlewareFn<Context> = async (_, next) => {
   next().catch(error => Logger.error(error));
};
