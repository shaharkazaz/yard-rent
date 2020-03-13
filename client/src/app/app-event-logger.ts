import { CoreEventLogger, CoreEventTypes, HashMap } from '@datorama/core';

export const appLogger: CoreEventLogger = {
  logEvent(eventType: CoreEventTypes, eventProperties?: HashMap): void {}
};
