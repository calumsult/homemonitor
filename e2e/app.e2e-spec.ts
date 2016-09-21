import { HomemonitorPage } from './app.po';

describe('homemonitor App', function() {
  let page: HomemonitorPage;

  beforeEach(() => {
    page = new HomemonitorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
