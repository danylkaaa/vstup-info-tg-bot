import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Ctx,
  Command,
  TelegrafContextType,
  TelegrafExecutionContext,
  Sender,
  Action,
  SceneEnter,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ResponseTimeInterceptor } from '../common/interceptor/ResponseTimeInterceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { IContext } from '../common/inrterfaces/IContext';
import { TelegramService } from './telegram.service';
import { Scenes, TelegramActions } from './constants';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class TelegramUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<IContext>,
    private readonly telegramService: TelegramService,
  ) {}

  @Start()
  async onStart(
    @Sender('id') id: number,
    @Sender('first_name') firstName: string,
    @Ctx() ctx: IContext,
  ) {
    await this.telegramService.createOrGetUser(id);
    ctx.reply(`Розпочнімо, ${firstName}?`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Додати спеціальність',
              callback_data: TelegramActions.REGISTER_OFFER,
            },
          ],
        ],
      },
    });
  }

  @Action(TelegramActions.REGISTER_OFFER)
  onRegisterOfferAction(@Ctx() ctx: IContext) {
    ctx.reply(`Додав тебе у ${Scenes.REGISTER_OFFER}`);
    ctx.scene.enter(Scenes.REGISTER_OFFER);
  }
}
