import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuService } from './feishu.service';
import { FeishuMessageDto, GetUserTokenDto } from './feishu.dto';

@ApiTags('飞书')
@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) {}

  @ApiOperation({
    summary: '消息推送',
  })
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params;
    return this.feishuService.sendMessage(receive_id_type, rest);
  }

  @ApiOperation({
    summary: '获取用户凭证',
  })
  @Post('getUserToken')
  getUserToken(@Body() params: GetUserTokenDto) {
    const { code } = params;
    return this.feishuService.getUserToken(code);
  }
}
// 获取飞书code
// https://open.feishu.cn/open-apis/authen/v1/index?app_id=cli_a25ba3dbda3a5013&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Fauth

// 获取code, 用code去获取access_token
// f7bh5f3ed9f74c43a4d7228649d45a2a

// "access_token": "u-1hIrMybFR2G91op_FcRWJ_g0gO0x5lebNq001heawdEG",
