import AppModel from '../models/AppModel';
import MainPage from '../views/templates/MainPage.marko';
import Swiper from '../views/templates/components/Swiper.marko';
import Slides from '../views/templates/components/Slides.marko';
import RequestGenerator from './helpers/RequestGenerator';
import GetTranslate from './helpers/GetTranslate';
import checkRuChars from './helpers/checkRuChars';
import Waiter from './helpers/Waiter';
import WAITER_STATES from '../constants/WaiterStates';
import GLOBAL from '../constants/Global';
import MySwiper from './MySwiper';

export default class App {
  constructor() {
    this.state = {
      url: 'https://www.omdbapi.com/?s=dream&page=1&apikey=79979921',
    };
  }

  async start() {
    MainPage.renderSync({ name: 'Movie Search', footer: 'RS School 2020q1' }).appendTo(document.body);
    const model = new AppModel(this.state);
    Waiter(WAITER_STATES.SHOW);
    const data = await model.getMovieTitles();
    Waiter(WAITER_STATES.HIDE);
    const section = document.querySelector('section');
    Swiper.renderSync(data).appendTo(section);
    const form = document.getElementById('form');
    const searchInput = document.getElementById('searchInput');
    const alertsBox = document.getElementById('alerts');
    const clearBtn = document.querySelector('.fa-times');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const mySwiper = MySwiper.createInstance();
    let pageIndex = 1;
    let request = GLOBAL.START_PAGE_REQUEST;

    mySwiper.on('slideChange', async () => {
      if (mySwiper.slides.length - mySwiper.activeIndex <= GLOBAL.SLIDES_BEFORE_SWIPER_END) {
        pageIndex += 1;
        const nextPageRequestData = new RequestGenerator(request, pageIndex);
        const nextPageModel = new AppModel(nextPageRequestData.extractURL());
        Waiter(WAITER_STATES.SHOW);
        const nextPageData = await nextPageModel.getMovieTitles();
        Waiter(WAITER_STATES.HIDE);
        await Slides.renderSync(nextPageData).appendTo(swiperWrapper);
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchRequest = searchInput.value.toString();
      if (checkRuChars(searchRequest) && searchRequest !== '') {
        request = await GetTranslate(searchRequest);
        alertsBox.innerText = `Showing results for '${request}'`;
      } else {
        request = searchRequest;
        alertsBox.innerText = '';
      }
      const searchRequestData = new RequestGenerator(request, 1);
      this.state = searchRequestData.extractURL();
      const searchModel = new AppModel(this.state);
      Waiter(WAITER_STATES.SHOW);
      const searchData = await searchModel.getMovieTitles();
      Waiter(WAITER_STATES.HIDE);
      if (searchData === undefined) {
        if (request === '') {
          alertsBox.innerText = 'You looking for nothing..';
        } else {
          alertsBox.innerText = `No results for '${request}'`;
        }
      }
      mySwiper.removeAllSlides();
      Slides.renderSync(searchData).appendTo(swiperWrapper);
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
    });
  }
}
