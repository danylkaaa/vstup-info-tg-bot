import {
  Action,
  Ctx,
  Message,
  On,
  Scene,
  SceneEnter,
  Sender,
  Start,
} from 'nestjs-telegraf';
import { Scenes } from '../constants';
import { SceneContext } from 'telegraf/typings/scenes';
import { OfferService } from '../../offers/offer.service';
import { Logger } from '@nestjs/common';
import { ApplicationsService } from '../../applications/applications.service';
import { TelegramService } from '../telegram.service';

@Scene(Scenes.REGISTER_OFFER)
export class RegisterNewOfferScene {
  private readonly logger = new Logger(RegisterNewOfferScene.name);

  constructor(
    private readonly offerService: OfferService,
    private readonly telegramService: TelegramService,
    private readonly applicationService: ApplicationsService,
  ) {}

  @SceneEnter()
  async enter(@Ctx() context: SceneContext) {
    await context.reply('Надішли мені посилання на спеціальність');
  }

  @Start()
  async onStart(
    @Ctx()
    ctx: SceneContext<{
      state: { pendingOfferId: number };
    }>,
  ) {
    await ctx.scene.leave();
  }

  @On('text')
  async onText(
    @Sender('id') senderId: number,
    @Message('text') text: string,
    @Ctx()
    ctx: SceneContext<{
      state: { pendingOfferId: number };
    }>,
  ) {
    const match = /^https:\/\/vstup\.edbo\.gov\.ua\/offer\/(\d+)/gi.exec(text);

    if (!match) {
      await ctx.reply('Посилання не коректне, надішли нове');
      return;
    }

    const offerId = +match[1];

    try {
      const offer = await this.offerService.lookup(offerId);
      const user = await this.telegramService.createOrGetUser(senderId);
      const prevApplication = await this.applicationService.getByUserAndOffer(
        user,
        offer,
      );
      if (prevApplication) {
        await ctx.reply('Ти вже підписаний на це посилання');
        return;
      }

      (ctx.session as any).pendingOfferId = offer.id;
      await ctx.reply(`Ти хочеш відстежувати на <b>${offer.name}?</b>`, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Так',
                callback_data: Scenes.REGISTER_OFFER + '/confirm',
              },
              { text: 'Ні', callback_data: Scenes.REGISTER_OFFER + '/cancel' },
            ],
          ],
        },
      });
    } catch (error) {
      this.logger.error(error);
      await ctx.reply(`Нажаль я не можу обробити це посилання`);
    }
  }

  @Action(Scenes.REGISTER_OFFER + '/confirm')
  async onConfirm(
    @Sender('id') senderId: number,
    @Ctx()
    ctx: SceneContext,
  ) {
    if (!(ctx.session as any).pendingOfferId) {
      ctx.reply('Щось пішло не так, не можу знайти ІД посилання');
      return;
    }

    const user = await this.telegramService.createOrGetUser(senderId);
    const offer = await this.offerService.lookup(
      (ctx.session as any).pendingOfferId,
    );

    if (!offer) {
      await ctx.reply('Щось пішло не так, прийшли нове посилання');
      return;
    }
    const prevApplication = await this.applicationService.getByUserAndOffer(
      user,
      offer,
    );
    if (prevApplication) {
      await ctx.reply('Ти вже підписаний на це посилання');
    } else {
      await this.applicationService.create(user, offer);
      await ctx.scene.leave();
      await ctx.reply(`Ок, підписав тебе на <b>${offer.name}?</b>`, {
        parse_mode: 'HTML',
      });
    }
    delete (ctx.session as any).pendingOfferId;
  }

  @Action(Scenes.REGISTER_OFFER + '/cancel')
  async onCancel(@Ctx() ctx: SceneContext) {
    return ctx.reply('Прийшли новий URL або повернись назад', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Назад',
              callback_data: Scenes.REGISTER_OFFER + '/back',
            },
          ],
        ],
      },
    });
  }

  @Action(Scenes.REGISTER_OFFER + '/back')
  async onBack(@Ctx() ctx: SceneContext) {
    await ctx.reply('Всьо хуйня давай по новой');
    await ctx.scene.leave();
  }
}
