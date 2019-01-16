import * as mockdate from './index';

mockdate.set(new Date());
mockdate.set({ valueOf: () => 3 });
mockdate.set('2017-01-05');
mockdate.set(new Date().getTime());

mockdate.set(new Date(), 0);

mockdate.reset();

mockdate.startTicking(100);
mockdate.startTicking();
mockdate.stopTicking();
