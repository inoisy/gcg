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
const categoryCommerce = new Category(1, 'Коммерческие', 'commerce');
const categoryAdm = new Category(2, 'Административные', 'administrative');
const categoryLiving = new Category(3, 'Жилые', 'living');
const categories = [categoryCommerce, categoryAdm, categoryLiving];

const projects = [
  {
    title: 'ЖК NOW',
    slug: 'now',
    dateStart: 'Ноябрь 2021',
    dateEnd: 'Октябрь 2022',
    lat: '55.69030796188262',
    long: '37.65644105956688',
    top: 45,
    left: 46.5,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Бизнес парк К',
    slug: 'Бизнес парк К',
    dateStart: '2014',
    dateEnd: '2014',
    lat: '55.564977431620036',
    long: '37.44344304334042',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Ватутинки',
    slug: 'Ватутинки',
    dateStart: '',
    dateEnd: '',
    lat: '',
    long: '',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Баррин Хаус',
    slug: 'ЖК Баррин Хаус',
    dateStart: '2014',
    dateEnd: '2014',
    lat: '55.72989028947622',
    long: '37.57145547137957',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Домашний',
    slug: 'ЖК Домашний',
    dateStart: 'сентябрь 2018',
    dateEnd: 'май 2021',
    lat: '55.64447380594313',
    long: '37.70293405023615',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Люблинский',
    slug: 'Люблинский',
    dateStart: '2019',
    dateEnd: '2019',
    lat: '55.67279878323717',
    long: '37.74779469329707',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Медный',
    slug: 'Медный',
    dateStart: 'июнь 2019',
    dateEnd: 'апрель 2021',
    lat: '55.69470328494209',
    long: '37.56278124470904',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Bauman House',
    slug: 'Bauman',
    dateStart: 'Декабрь 2019',
    dateEnd: 'Октябрь 2021',
    lat: '55.77259891553654',
    long: '37.701195099412985',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК Headliner',
    slug: 'Headlainer',
    dateStart: 'Февраль 2020',
    dateEnd: 'Май 2023',
    lat: '55.754503038513974',
    long: '37.52423249817328',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК I LOVE',
    slug: 'LOVE',
    dateStart: 'Декабрь 2019',
    dateEnd: 'Октябрь 2021',
    lat: '55.81026115825747',
    long: '37.628744025276525',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК MONODOM FAMILY',
    slug: 'MONODOM',
    dateStart: 'Декабрь 2020',
    dateEnd: 'Сентябрь 2021',
    lat: '55.750493893399046',
    long: '37.680746111278495',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК SOHO-NOHO',
    slug: 'SOHO',
    dateStart: '2019',
    dateEnd: '2019',
    lat: '55.78648072012682',
    long: '37.58606837429245',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ЖК WHITE KHAMOVNIKI',
    slug: 'KHAMOVNIKI',
    dateStart: 'Февраль 2020',
    dateEnd: 'Июнь 2021',
    lat: '55.73309155743882',
    long: '37.579539564518555',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'МФК Филград',
    slug: 'Филград',
    dateStart: '2018',
    dateEnd: '2018',
    lat: '55.7559888702503',
    long: '37.50643551321893',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Снегири',
    slug: 'Снегири',
    dateStart: '2016',
    dateEnd: '2016',
    lat: '55.71714219125542',
    long: '37.503535715107425',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'ТЦ Столица',
    slug: 'Столица',
    dateStart: '?',
    dateEnd: '?',
    lat: '55.60457246768681',
    long: '37.35636564268442',
    top: 0,
    left: 0,
    img: {
      url: '/project.jpg',
    },
    category: categoryCommerce,
  },
  {
    title: 'Посольство США в Москве',
    slug: 'posolstvo-usa',
    dateStart: '2018',
    dateEnd: '2018',
    lat: '55.75573817474805',
    long: '37.57978769140053',
    top: 33,
    left: 33,
    img: {
      url: '/project2.jpg',
    },
    category: categoryAdm,
  },
  {
    title: 'Москва-Сити/Башня ОКО',
    slug: 'oko',
    dateStart: '2016',
    dateEnd: '2016',
    lat: '55.749256415699875',
    long: '37.53398345483444',
    top: 22,
    left: 22,
    img: {
      url: '/project.jpg',
    },
    category: categoryLiving,
  },
  {
    title: 'Аэропорт г.Кемерово',
    slug: 'kemerovo',
    dateStart: 'Сентябрь 2020',
    dateEnd: 'Апрель 2021',
    lat: '55.28139903866993',
    long: '86.11630883228868',
    top: 55,
    left: 55,
    img: {
      url: '/project.jpg',
    },
    category: categoryAdm,
  },
  {
    title: 'Аэропорт Геленджик',
    slug: 'gelenjik',
    dateStart: 'Декабрь 2020',
    dateEnd: 'Октябрь 2021',
    lat: '44.59524685633436',
    long: '38.0233715054193',
    top: 66,
    left: 66,
    img: {
      url: '/project.jpg',
    },
    category: categoryAdm,
  },
  {
    title: 'Аэропорт Домодедово',
    slug: 'domodedovo',
    dateStart: '2019',
    dateEnd: '2019',
    lat: '55.41565049261007',
    long: '37.90800950438577',
    top: 77,
    left: 77,
    img: {
      url: '/project.jpg',
    },
    category: categoryAdm,
  },
];
categories.forEach(item => item.setTotal(projects));
export {
  categories,
  projects,
};
