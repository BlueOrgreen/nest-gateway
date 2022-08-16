import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule.register()],
  controllers: [UserController, FeishuController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService, FeishuService],
})
export class UserModule {}
