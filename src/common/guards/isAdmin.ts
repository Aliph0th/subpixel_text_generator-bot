import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { IContext } from '../interfaces';
import { ConfigService } from '@nestjs/config';
import { MESSAGES } from '../constants';

@Injectable()
export class AdminGuard implements CanActivate {
   private readonly allowedUserIds: number[];

   constructor(private readonly configService: ConfigService) {
      const userIds = this.configService.get('ADMINS');
      this.allowedUserIds = userIds ? userIds.split(',').map(Number) : [];
   }

   canActivate(context: ExecutionContext): boolean {
      const ctx = context.switchToHttp().getRequest() as IContext;
      const userId = ctx.from.id;

      if (!this.allowedUserIds.includes(userId)) {
         throw new ForbiddenException(MESSAGES.ERROR.ATTEMPT_ADMIN(userId, ctx.from.username));
      }

      return true;
   }
}
