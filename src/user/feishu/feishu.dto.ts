import { RECEIVE_TYPE, MSG_TYPE } from 'src/helper/feishu/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class GetUserTokenDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'xxxx', description: '飞书临时登录凭证' })
  code: string;

  app_token: string;
}

export class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: 'email' })
  receive_id_type: RECEIVE_TYPE;

  @IsNotEmpty()
  @ApiProperty({ example: '1936341390@qq.com' })
  receive_id?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '{"text":" test content"}' })
  content?: string;

  @IsNotEmpty()
  @IsEnum(MSG_TYPE)
  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE;
}

export class FeishuUserInfo {
  accessToken?: string;
  email: string;
  avatarUrl: string;
  avatarThumb: string;
  avatarBig: string;
  avatarMiddle: string;
  mobile: string;
  enName: string;
  name: string;
  feishuUserId: string;
  feishuUnionId: string;
}
