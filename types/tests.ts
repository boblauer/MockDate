import * as Mockdate from '.';

Mockdate.set(new Date());
Mockdate.set({ valueOf: (): number => 3 });
Mockdate.set('2017-01-05');
Mockdate.set(new Date().getTime());

Mockdate.set(new Date(), 0);

Mockdate.reset();

Mockdate.startTicking(100);
Mockdate.startTicking();
Mockdate.stopTicking();
