import { ResponseOptions } from '@angular/http';

import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

const itemsPerPage = 10;

let getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const availablePersons = [
  'Фрасинюк Віктор Іванович',
  'Тостановський Михайло Васильович',
  'Ліщинський Володимир Сергійович',
  'Катинський Микола Омельянович',
  'Стаховський Едуард  Олександрович',
  'Вукалович  П. С.',
  'Войненко О. А.',
  'Келлнер франціск Адольфович',
  'Кияр Тарас Романович',
  'Вітталь Едмунд Едмундович'
];

let getUniqueItem = (items, allItems) => {
  let uniqueItem = allItems[getRandomInt(0, allItems.length - 1)];
  return items.includes(uniqueItem)
    ? getUniqueItem(items, allItems)
    : uniqueItem;
};

let getRandomPersons = () => {
  let count = getRandomInt(1, 4);
  let persons = [];

  for (let i = 0, person; i < count; i++) {
    persons.push(getUniqueItem(persons, availablePersons));
  }

  return persons;
};

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

    let mapNewEl = ((el) => {
      let newEl = Object.assign({}, el);
      newEl.Id = curId + '';
      newEl.RegNum = newEl.Id;

      // Random filling of data
      newEl.DateReg = newEl.DateReg || new Date(
        getRandomInt(1991, 2016), // year
        getRandomInt(0, 11), // month
        getRandomInt(1, 28) // date
      ).getTime();
      newEl.Name = newEl.Name || 'Громадська організація ' + newEl.Id;
      newEl.Government = newEl.Government || getRandomPersons();
      newEl.Zasnovn = newEl.Zasnovn || getRandomPersons();
      newEl.Kved = newEl.Kved || 'Діяльність інших громадських організацій';
      newEl.Adress = newEl.Adress || 'Адреса ' + newEl.Id;
      newEl.VudName = 'Громадська організація';
      newEl.Edrpou = getRandomInt(10000000, 99999999);
      newEl.License = getRandomInt(1, 9999);
      newEl.Phone = '+380' + getRandomInt(100000000, 999999999);

      // properties required for pagination and update functionality
      newEl.id = curId;
      newEl.itemsPerPage = itemsPerPage;
      newEl.page = 1234567890;

      curId++;
      return newEl;
    });

    for (let i = 0; i < itemsPerPage; i++) {
      items.push(...[{}, {}, {}].map(mapNewEl));
    }

    // add one extra mock item to have page with one item
    items.push(mapNewEl({}));

    items.push = (el) => {
      el.DateReg = Date.now();
      Array.prototype.push.call(items, mapNewEl(el));
    };

    return {
      'public-associations': items
    };
  }
}
