/* eslint-disable sonarjs/no-duplicate-string */
class Category {
  constructor(id, name, slug) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.total = 0;
  }

  setTotal(items) {
    const count = items.reduce((acc, val) => {
      let accInner = acc;
      if (val.category.id === this.id) {
        accInner += 1;
      }
      return accInner;
    }, 0);
    this.total = count;
  }

  toJSON() {
    return { ...this }; // here I make a POJO's copy of the class instance
  }
}
const categoryPublic = new Category(1, 'Общественные здания', 'public');
const categoryAirports = new Category(2, 'Аэропорты', 'airports');
const categoryLiving = new Category(3, 'Жилые комплексы', 'living');
const categories = [categoryPublic, categoryAirports, categoryLiving];

const projects = [
  {
    title: 'ЖК I LOVE',
    slug: 'love',
    dateStart: '', // Декабрь 2019
    dateEnd: 'настоящее время', // настоящее время?
    lat: '55.81026115825747',
    long: '37.628744025276525',
    top: 28,
    left: 53,
    square: '170000',
    type: 'Внутренние инженерные системы',
    client: 'Кортрос',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК I Love.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Russian Design District',
    slug: 'russian-design-district',
    dateStart: '',
    dateEnd: 'настоящее время',
    lat: '55.504421',
    long: '37.321136',
    top: 35,
    left: 44,
    square: '18000',
    type: 'Генеральный подряд',
    client: 'ГК Родина',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Russian Design District/ЖК Russian Design District.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК NOW',
    slug: 'now',
    dateStart: '', // Ноябрь 2021
    dateEnd: 'настоящее время',
    lat: '55.69030796188262',
    long: '37.65644105956688',
    top: 61,
    left: 56,
    square: '60000',
    type: 'Внутренние инженерные системы',
    client: 'ФОДД',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК NOW.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК WHITE KHAMOVNIKI',
    slug: 'white-khamovniki',
    dateStart: '2020',
    dateEnd: '2022', // настоящее время
    lat: '55.73309155743882',
    long: '37.579539564518555',
    top: 50,
    left: 46,
    square: '25000',
    type: 'Внутренние инженерные системы',
    client: 'ANTTEQ',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/Клубный дом White Khamovniki.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Торгово-офисный центр Botanica Plaza',
    slug: 'botanica-plaza',
    dateStart: '',
    dateEnd: 'настоящее время',
    lat: '55.802667',
    long: '37.620901',
    top: 20,
    left: 54,
    square: '85000',
    type: 'Внутренние инженерные системы',
    client: 'Альфа Строй',
    img: {
      url: '/projects/ОБЩЕСТВЕННЫЕ ЗДАНИЯ/ТОЦ Botanica Piaza.jpg',
    },
    category: categoryPublic,
  },
  {
    title: 'Фитнес центр ЖК Lucky',
    slug: 'fitnies-tsientr-zh-k-lucky',
    dateStart: '',
    dateEnd: 'настоящее время',
    lat: '55.764684',
    long: '37.619064',
    top: 42,
    left: 42,
    square: '5000',
    type: 'Внутренние инженерные системы',
    client: 'Vesper',
    img: {
      url: '/projects/ОБЩЕСТВЕННЫЕ ЗДАНИЯ/Фитнес центр ЖК Lucky .jpg',
    },
    category: categoryPublic,
  },
  {
    title: 'Russian Design District',
    slug: 'russian-design-district-2',
    dateStart: '',
    dateEnd: 'настоящее время',
    lat: '55.504421',
    long: '37.321136',
    top: 35,
    left: 44,
    square: '18000',
    type: 'Генеральный подряд',
    client: 'ГК Родина',
    img: {
      url: '/projects/photo_2023-01-12_19-52-17.jpg',
    },
    category: categoryPublic,
  },
  {
    title: 'ЖК Headliner',
    slug: 'headlainer',
    dateStart: '2020',
    dateEnd: '2022',
    lat: '55.754503038513974',
    long: '37.52423249817328',
    top: 44,
    left: 39,
    square: '150000',
    type: 'Внутренние инженерные системы',
    client: 'Кортрос',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Headliner.jpg',
    },
    category: categoryLiving,
  },

  {
    title: 'ЖК MONODOM FAMILY',
    slug: 'monodom-family',
    dateStart: '2021',
    dateEnd: '2022', // 22
    lat: '55.750493893399046',
    long: '37.680746111278495',
    top: 47,
    left: 61,
    square: '17000',
    type: 'Внутренние инженерные системы',
    client: 'Sun Development',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК MONODOM FAMILY 2.jpg',
    },
    category: categoryLiving,
  },

  {
    title: 'Аэропорт Геленджик',
    slug: 'gelenjik',
    dateStart: '2020',
    dateEnd: '2022',
    lat: '44.59524685633436',
    long: '38.0233715054193',
    top: null,
    left: null,
    isBottom: true,
    square: '16000',
    type: 'Внутренние инженерные системы',
    client: 'Альфа Строй',
    img: {
      url: '/projects/АЭРОПОРТЫ/Аэропорт Геленджик.jpg',
    },
    category: categoryAirports,
  },
  {
    title: 'ЖК Медный 3.14',
    slug: 'miednyi-3-14',
    dateStart: '2019',
    dateEnd: '2021',
    lat: '55.69470328494209',
    long: '37.56278124470904',
    top: 53,
    left: 49,
    square: '30000',
    type: 'Внутренние инженерные системы',
    client: 'ANTTEQ',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Медный.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Bauman House',
    slug: 'bauman',
    dateStart: '2020',
    dateEnd: '2022',
    lat: '55.77259891553654',
    long: '37.701195099412985',
    top: 40,
    left: 62,
    square: '43000',
    type: 'Внутренние инженерные системы',
    client: 'Кортрос',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Бауман Хаус/VRayCam013-s450045.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК SOHO-NOHO',
    slug: 'soho-noho',
    dateStart: '2019',
    dateEnd: '2020', // 2020
    lat: '55.78648072012682',
    long: '37.58606837429245',
    top: 37,
    left: 45,
    square: '45000',
    type: 'Внутренние инженерные системы',
    client: 'ANTTEQ',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК SOHO-NOHO 1.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Аэропорт г.Кемерово',
    slug: 'kemerovo',
    dateStart: '2020',
    dateEnd: '2021',
    lat: '55.28139903866993',
    long: '86.11630883228868',
    top: null,
    left: null,
    isBottom: true,
    square: '14000',
    type: 'Внутренние инженерные системы',
    client: 'Лимакмаращстрой',
    img: {
      url: '/projects/АЭРОПОРТЫ/Аэропорт Кемерово/315574.jpg',
    },
    category: categoryAirports,
  },
  {
    title: 'ЖК Домашний',
    slug: 'domashnii',
    dateStart: '2018',
    dateEnd: '2020',
    lat: '55.64447380594313',
    long: '37.70293405023615',
    top: 73.5,
    left: 62,
    square: '130000',
    type: 'Внутренние инженерные системы',
    client: 'Альфа Строй',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Домашний.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Аэропорт Домодедово',
    slug: 'domodedovo',
    dateStart: '2017',
    dateEnd: '2019',
    lat: '55.41565049261007',
    long: '37.90800950438577',
    top: null,
    left: null,
    isBottom: true,
    square: '190000',
    type: 'Внутренние инженерные системы',
    client: 'DKM Construction',
    img: {
      url: '/projects/АЭРОПОРТЫ/Аэропотр Домодедово Т2.jpg',
    },
    category: categoryAirports,
  },
  {
    title: 'ЖК Люблинский',
    slug: 'liublinskii',
    dateStart: '2018',
    dateEnd: '2019',
    lat: '55.67279878323717',
    long: '37.74779469329707',
    top: 66,
    left: 67,
    square: '26000',
    type: 'Внутренние инженерные системы',
    client: 'Альфа Строй',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Люблинский/id_030002.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Аэропорт г.Челябинск',
    slug: 'chelyabinsk',
    dateStart: '2019',
    dateEnd: '2020',
    lat: '55.297781780423286',
    long: '61.509328558271356',
    top: null,
    left: null,
    isBottom: true,
    square: '14000',
    type: 'Внутренние инженерные системы',
    client: 'Лимакмаращстрой',
    img: {
      url: '/projects/АЭРОПОРТЫ/Аэропорт Челябинск.jpg',
    },
    category: categoryAirports,
  },
  {
    title: 'Снегири ЭКО',
    slug: 'snieghiri',
    dateStart: '2016',
    dateEnd: '2018', // 2018
    lat: '55.71714219125542',
    long: '37.503535715107425',
    top: 54,
    left: 36,
    square: '68000',
    type: 'Внутренние инженерные системы',
    client: 'ГК Снегири',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Снегири ЭКО - Sneigiri ECO/snigirieko-1.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Аэропорт г.Симферополь, Новый терминал',
    slug: 'simfieropol',
    dateStart: '2018',
    dateEnd: '2018',
    lat: '45.03587149270787',
    long: '33.98156949471629',
    top: null,
    left: null,
    isBottom: true,
    square: '70000',
    type: 'Внутренние инженерные системы',
    client: 'Аконс Про',
    img: {
      url: '/projects/АЭРОПОРТЫ/Аэропорт Симферополь.jpg',
    },
    category: categoryAirports,
  },
  {
    title: 'МФК Филиград',
    slug: 'filighrad',
    dateStart: '2015',
    dateEnd: '2017',
    lat: '55.7559888702503',
    long: '37.50643551321893',
    top: 43,
    left: 35,
    square: '190000',
    type: 'Внутренние инженерные системы',
    client: 'MR Group',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Фили Град 2 - Fili Grad 2/a802f80a66168144b7d4ba263875ba4d.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Посольство США в Москве',
    slug: 'posolstvo-usa',
    dateStart: '2016',
    dateEnd: '2017',
    lat: '55.75573817474805',
    long: '37.57978769140053',
    top: 44,
    left: 46,
    square: '18000',
    type: 'Внутренние инженерные системы',
    client: 'OBO',
    img: {
      url: '/projects/ОБЩЕСТВЕННЫЕ ЗДАНИЯ/Посольство США в г.Москве.jpg',
    },
    category: categoryPublic,
  },
  {
    title: 'ТЦ Столица',
    slug: 'stolitsa',
    dateStart: '2018',
    dateEnd: '2019',
    lat: '55.60457246768681',
    long: '37.35636564268442',
    top: 79,
    left: 69,
    square: '13000',
    type: 'Внутренние инженерные системы',
    client: 'Лимакмаращстрой',
    img: {
      url: '/projects/ОБЩЕСТВЕННЫЕ ЗДАНИЯ/ТЦ Столица.jpg',
    },
    category: categoryPublic,
  },
  {
    title: 'Москва-Сити/Башня ОКО',
    slug: 'oko',
    dateStart: '2016',
    dateEnd: '2016',
    lat: '55.749256415699875',
    long: '37.53398345483444',
    top: 45,
    left: 40,
    square: '150000',
    type: 'Внутренние инженерные системы',
    client: 'CAPITAL GROUP',
    img: {
      url: '/projects/ОБЩЕСТВЕННЫЕ ЗДАНИЯ/Москва-Сити (Башня ОКО).jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Бизнес Парк К2',
    slug: 'biznies-park-k2',
    dateStart: '2014',
    dateEnd: '2014',
    lat: '55.564977431620036',
    long: '37.44344304334042',
    top: 84,
    left: 32,
    square: '20000',
    type: 'Внутренние инженерные системы',
    client: 'SAWATZKY GROUP OF COMPANIES',
    img: {
      url: '/projects/ОБЩЕСТВЕННЫЕ ЗДАНИЯ/Бизнес Парк «K2» -K2/К2.jpg',
    },
    category: categoryPublic,
  },
  {
    title: 'ЖК Баррин Хаус',
    slug: 'barrin-khaus',
    dateStart: '2014',
    dateEnd: '2014',
    lat: '55.72989028947622',
    long: '37.57145547137957',
    top: 51,
    left: 45,
    square: '65000',
    type: 'Внутренние инженерные системы',
    client: 'Донстрой',
    img: {
      url: '/projects/ЖИЛЫЕ КОМПЛЕКСЫ/ЖК Баррин Хаус.jpg',
    },
    category: categoryLiving,
  },


];
categories.forEach(item => item.setTotal(projects));
export {
  categories,
  projects,
};
