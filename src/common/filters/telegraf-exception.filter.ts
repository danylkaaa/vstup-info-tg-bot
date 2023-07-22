import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { IContext } from '../inrterfaces/IContext';

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TelegrafExceptionFilter.name);

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host);
    const ctx = telegrafHost.getContext<IContext>();

    this.logger.error(
      'Unhandled exception:',
      exception.message,
      exception.stack,
    );

    await ctx.replyWithHTML(`<b>Error</b>: ${exception.message}`);
  }
}
