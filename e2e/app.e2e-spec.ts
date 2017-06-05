import { SleepAppPage } from './app.po';

describe('sleep-app App', () => {
  let page: SleepAppPage;

  beforeEach(() => {
    page = new SleepAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
