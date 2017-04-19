import { ResponseOptions } from '@angular/http';

import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

const itemsPerPage = 10;

export class PublicAssociationsData implements InMemoryDbService {
  // responseInterceptor required to add 'X-Total-Count' header
  // to follow RESTful API pagination best practices
  public responseInterceptor(res: ResponseOptions, ri: RequestInfo) {
    const body: any = res.body;

    if (body && Array.isArray(body.data)) {
      res.headers.append('X-Total-Count', body.data.length);
      let page = ri.query.paramsMap.get('page');

      if (Array.isArray(page)) {
        let startIndex = (parseInt(page[0], 10) - 1) * itemsPerPage;
        body.data = body.data.slice(startIndex, startIndex + itemsPerPage);
      }
    }

    return res;
  }

  public createDb() {
    let items: any = [];
    let curId = 1;
    let db = {};

    const mockData = [
      {
        DateReg: new Date('1993/3/31').getTime(),
        Name: 'Обласне товариство рятування на воді',
        VudName: 'Громадська організація',
        Edrpou: '',
        Adress: 'Чернівецька обл., м. Чернівці,  вул. Університетська, 19',
        Phone: '',
        Zasnovn: [
          'Фрасинюк Віктор Іванович',
          'Тостановський Михайло Васильович',
          'Ліщинський Володимир Сергійович'
        ],
        Government: [
          'Фрасинюк Віктор Іванович, Голова',
          'Катинський Микола Омельянович, Заступник',
          'Ліщинський Володимир Сергійович, Заступник'
        ],
        Kved: '',
        License: 32
      },
      {
        DateReg: new Date('2016/12/1').getTime(),
        Name: 'ВСЕУКРАЇНСЬКА ГРОМАДСЬКА ОРГАНІЗАЦІЯ \'СПІЛКА ОНКОУРОЛОГІВ УКРАЇНИ\'(ВГО \'СОУ\')',
        VudName: 'Громадська організація',
        Edrpou: 36482499,
        Adress: '03022, м.Київ, Голосіївський р., ВУЛИЦЯ ЛОМОНОСОВА, будинок 33/43',
        Phone: '0675380276',
        Zasnovn: [
          'СТАХОВСЬКИЙ ЕДУАРД  ОЛЕКСАНДРОВИЧ',
          'Вукалович  П. С.',
          'Войненко О. А.'
        ],
        Government: [
          'СТАХОВСЬКИЙ  ЕДУАРД  ОЛЕКСАНДРОВИЧ, Голова Правління',
          'Кравчук Т. В., Член',
          'Безпалова А. В., Член',
          'Миронюк  С. В., Член'
        ],
        Kved: 'Діяльність професійних громадських організацій',
        License: 3090
      },
      {
        DateReg: new Date('2016/12/8').getTime(),
        Name: 'Громадська організація \'Товариство австрійсько-німецької культури\'',
        VudName: 'Громадська організація',
        Edrpou: 21433016,
        Adress: '58000, Чернівецька обл., м. Чернівці, Першотравневий р., вул. Кобилянської, 53',
        Phone: '0675380276',
        Zasnovn: [
          'Келлнер франціск Адольфович',
          'Кияр Тарас Романович',
          'Вітталь Едмунд Едмундович'
        ],
        Government: [
          'Шламп Олександр Миколайович, Голова Організації, член Президії',
          'Дуган Василь Михайлович, член Президії',
          'Литвин Катерина Володимирівна, член Президії',
          'Вітталь Інга Едмундівна, член Президії',
          'Півторак Павло Пилипович, член Президії'
        ],
        Kved: 'Діяльність інших громадських організацій, н. в. і. у.',
        License: 2
      }
    ];

    let mapNewEl = ((el) => {
      let newEl = Object.assign({}, el);
      newEl.Id = curId + '';
      newEl.RegNum = newEl.Id;

      // properties required for pagination and update functionality
      newEl.id = newEl.Id;
      newEl.itemsPerPage = itemsPerPage;
      newEl.page = 1234567890;

      curId++;
      return newEl;
    });

    // copy mockData "itemsPerPage" times to have enough data for pagination
    for (let i = 0; i < itemsPerPage; i++) {
      items.push(...mockData.map(mapNewEl));
    }

    // add one extra mock item to have page with one item
    items.push(mapNewEl(mockData[1]));

    items.push = (el) => {
      el.DateReg = Date.now();
      Array.prototype.push.call(items, mapNewEl(el));
    };

    return {
      'public-associations': items
    };
  }
}
