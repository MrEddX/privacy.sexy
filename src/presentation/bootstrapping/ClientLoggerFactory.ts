import { RuntimeEnvironment } from '@/infrastructure/RuntimeEnvironment/RuntimeEnvironment';
import { IRuntimeEnvironment } from '@/infrastructure/RuntimeEnvironment/IRuntimeEnvironment';
import { ConsoleLogger } from '@/infrastructure/Log/ConsoleLogger';
import { Logger } from '@/application/Common/Log/Logger';
import { LoggerFactory } from '@/application/Common/Log/LoggerFactory';
import { NoopLogger } from '@/infrastructure/Log/NoopLogger';
import { WindowInjectedLogger } from '@/infrastructure/Log/WindowInjectedLogger';

export class ClientLoggerFactory implements LoggerFactory {
  public static readonly Current: LoggerFactory = new ClientLoggerFactory();

  public readonly logger: Logger;

  protected constructor(environment: IRuntimeEnvironment = RuntimeEnvironment.CurrentEnvironment) {
    if (environment.isDesktop) {
      this.logger = new WindowInjectedLogger();
      return;
    }
    if (environment.isNonProduction) {
      this.logger = new ConsoleLogger();
      return;
    }
    this.logger = new NoopLogger();
  }
}