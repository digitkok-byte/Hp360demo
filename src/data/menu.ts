export interface MenuItem {
  name: string;
  price: number;
  desc?: string;
  tag?: string;
  weight?: string;
  image?: string;
  composition?: string;
  calories?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface CategoryData {
  title: string;
  sections: MenuSection[];
}

export interface Category {
  id: string;
  label: string;
}

export const categories: Category[] = [
  { id: 'hookah', label: 'КАЛЬЯН' },
  { id: 'tea', label: 'КИТАЙСКИЙ ЧАЙ' },
  { id: 'cocktails', label: 'КОКТЕЙЛИ' },
  { id: 'lemonade', label: 'ЛИМОНАДЫ' },
  { id: 'drinks', label: 'НАПИТКИ' },
  { id: 'coffee', label: 'КОФЕ' },
  { id: 'food', label: 'ЕДА' },
  { id: 'wine', label: 'ВИНО' },
  { id: 'beer', label: 'ПИВО' },
];

export const menuData: Record<string, CategoryData> = {
  hookah: {
    title: 'КАЛЬЯН',
    sections: [
      { title: 'НА ЧАШЕ', items: [
        { name: 'Классический', price: 2300, desc: '1–3 чел: 2300 / 4–6 чел: 4400 / 7–9 чел: 6600', tag: 'HIT' },
        { name: 'Perfume', price: 4000, desc: 'Премиум табак' },
        { name: 'Perfume Mix', price: 3000, desc: 'Авторский микс' },
      ]},
      { title: 'НА ФРУКТЕ', items: [
        { name: 'Грейпфрут', price: 3200, desc: 'Фруктовая чаша' },
      ]},
    ],
  },
  tea: {
    title: 'КИТАЙСКИЙ ЧАЙ',
    sections: [
      { title: 'КЛАССИЧЕСКИЙ', items: [
        { name: 'Женьшень улун', price: 850 },
        { name: 'Моли Чжень Чжу', price: 850 },
        { name: 'Те Гуань Нинь Хуа Сян', price: 1000 },
        { name: 'Найсян Улун', price: 1000 },
        { name: 'Дянь Хун Сун Чжэнь', price: 1000 },
        { name: 'Да Хун Пао Тань Бей', price: 1100 },
        { name: 'Хэй Цзинь', price: 800 },
        { name: 'Пуэр Королевский', price: 1300 },
        { name: 'Сяо Чжун (копчёный)', price: 800 },
        { name: 'Габа Красная', price: 1100 },
        { name: 'Габа Путао (виноградная)', price: 1500 },
        { name: 'Габа Медовая', price: 1400 },
        { name: 'Габа Золото', price: 1300 },
        { name: 'Тибетская ромашка', price: 900 },
        { name: 'Ку Цяо Ча', price: 850 },
        { name: 'Саган-Дайля', price: 600 },
        { name: 'Иван-чай', price: 600 },
        { name: 'Гибискус', price: 600 },
        { name: 'Анчан', price: 600 },
        { name: 'Мао Фэн Хуаншань', price: 850 },
      ]},
      { title: 'АВТОРСКИЙ — 950 ₽', items: [
        { name: 'Облепиха-имбирь-мёд-мята', price: 950 },
        { name: 'Молочный улун-груша-корица', price: 950 },
        { name: 'Анчан-ежевика-миндаль-кардамон', price: 950 },
        { name: 'Иван-чай-персик-слива', price: 950 },
        { name: 'Имбирь-лимон-лайм-мёд', price: 950 },
        { name: 'Тибетская ромашка-помело', price: 950 },
        { name: 'Гречиха-кокос-каффир лайм', price: 950 },
      ]},
    ],
  },
  cocktails: {
    title: 'КОКТЕЙЛИ',
    sections: [
      { title: 'АВТОРСКИЕ', items: [
        { name: 'ATOMIC 360', price: 1000, tag: 'HIT' },
        { name: 'ROCK-OIL', price: 890 },
        { name: 'SPARK OF BROTHERS', price: 890 },
        { name: 'VIOLET GHOUL', price: 890 },
        { name: 'B.O.W.', price: 890 },
        { name: 'RED ROCKET', price: 890 },
        { name: 'RAD\u2011X ELIXIR', price: 890 },
        { name: 'RADIOACTIVE SUNRISE', price: 890 },
        { name: 'PLOMBIR 2287', price: 890 },
        { name: 'MUTFRUIT', price: 890 },
        { name: 'TOXIC CODE 2026', price: 890 },
        { name: 'ECHO 101', price: 890 },
        { name: 'PROTOCOL CHR', price: 890 },
        { name: 'POWER ARMOR', price: 890 },
      ]},
      { title: 'КЛАССИКА — 790 ₽', items: [
        { name: 'Апероль спритц', price: 790 },
        { name: 'Лимбурский лимонад', price: 790 },
        { name: 'Мохито', price: 790 },
        { name: 'Виски сауэр', price: 790 },
        { name: 'Негрони', price: 790 },
        { name: 'Пина колада', price: 790 },
      ]},
    ],
  },
  lemonade: {
    title: 'ЛИМОНАДЫ',
    sections: [
      { title: '0.4 Л', items: [
        { name: 'Маракуя-вишня-шисо', price: 590 },
        { name: 'Малина-фудзи-сакура', price: 590 },
        { name: 'Клубника-ананас-лемонграсс', price: 590 },
        { name: 'Гуава-арбуз-барбарис-мята', price: 590 },
        { name: 'Чёрная смородина-лайм-фиалка', price: 590 },
        { name: 'Киви-яблоко-эстрагон', price: 590 },
        { name: 'Цитрусовый с мятой', price: 590 },
        { name: 'Авторский', price: 690 },
      ]},
      { title: '1.5 Л', items: [
        { name: 'Маракуя-вишня-шисо', price: 1400 },
        { name: 'Малина-фудзи-сакура', price: 1400 },
        { name: 'Клубника-ананас-лемонграсс', price: 1400 },
        { name: 'Гуава-арбуз-барбарис-мята', price: 1400 },
        { name: 'Чёрная смородина-лайм-фиалка', price: 1400 },
        { name: 'Киви-яблоко-эстрагон', price: 1400 },
        { name: 'Авторский', price: 1600 },
      ]},
    ],
  },
  drinks: {
    title: 'НАПИТКИ',
    sections: [
      { title: 'БЕЗАЛКОГОЛЬНЫЕ', items: [
        { name: 'Cola 0.33', price: 390 },
        { name: 'Fanta 0.33', price: 390 },
        { name: 'Тоник Rich 0.33', price: 350 },
        { name: 'Вода Russe Quelle 0.5', price: 400, desc: 'газ/негаз' },
        { name: 'Borjomi 0.5', price: 500 },
        { name: 'Сок апельсин 0.3', price: 450 },
        { name: 'Сок грейпфрут 0.3', price: 450 },
        { name: 'Red Bull 0.25', price: 390 },
        { name: 'Соки 450 мл', price: 350 },
        { name: 'Соки 1000 мл', price: 650 },
      ]},
    ],
  },
  coffee: {
    title: 'КОФЕ',
    sections: [
      { title: '', items: [
        { name: 'Эспрессо', price: 270 },
        { name: 'Американо', price: 300 },
        { name: 'Капучино', price: 350 },
        { name: 'Раф', price: 450 },
        { name: 'Флэт уайт', price: 400 },
        { name: 'Латте', price: 400 },
        { name: 'Сливки', price: 100, desc: '+опция' },
        { name: 'Альтернативное молоко', price: 100, desc: '+опция' },
      ]},
    ],
  },
  food: {
    title: 'ЕДА',
    sections: [
      { title: 'ЗАВТРАК', items: [
        { name: 'Классический омлет с беконом и овощным салатом', price: 600, weight: '280гр' },
        { name: 'Классический омлет с куриным филе и овощным салатом', price: 700, weight: '330гр' },
      ]},
      { title: 'ГОРЯЧИЕ БЛЮДА', items: [
        { name: 'Соба с курицей', price: 690, weight: '345гр', image: '/dishes/goryachie/soba-kuritsa.png', composition: 'Бедро куриное, соба, перец болгарский, морковь, лук, кинза, соус терияки, кунжут', calories: '28Б 10.5Ж 94.6У 584.9кКал' },
        { name: 'Карбонара', price: 790, weight: '325гр', image: '/dishes/goryachie/karbonara.png', composition: 'Спагетти, грудинка, яйцо, бульон куриный, пармезан, черный перец', calories: '29.8Б 26.5Ж 59У 593.7кКал' },
        { name: 'Паста курица-грибы', price: 690, weight: '350гр', image: '/dishes/goryachie/pasta-kuritsa-griby.png', composition: 'Паста Казаречче, бедро курицы, шампиньоны, сливки, соус Чеддер, соус грибной, бульон куриный, петрушка, пармезан', calories: '35Б 42.5Ж 64У 778.5кКал' },
        { name: 'Паста курица-песто', price: 690, weight: '305гр', image: '/dishes/goryachie/pasta-kuritsa-pesto.png', composition: 'Паста Казаречче, бедро курицы, сливки, соус Песто, соус Чеддер, бульон куриный, пармезан, черри, петрушка', calories: '33Б 52Ж 62.8У 851.2кКал' },
        { name: 'Паста с креветками в трюфельном соусе', price: 890, weight: '330гр', image: '/dishes/goryachie/pasta-krevetki-tryufel.png', composition: 'Спагетти, креветки, желток, чесночная эмульсия, соус трюфельный, сливки, пармезан', calories: '32.44Б 36Ж 45.4У 635.36кКал' },
        { name: 'Рис с курицей терияки', price: 690, weight: '340гр', image: '/dishes/goryachie/ris-kuritsa-teriyaki.jpg', composition: 'Филе куриное, рис, морковь, лук, яйцо, соус терияки и сладкий чили, лук зеленый, кинза, кунжут', calories: '30.6Б 13Ж 83.6У 573.8кКал' },
        { name: 'Бифштекс с яйцом и зелёным гарниром', price: 850, weight: '300гр', image: '/dishes/goryachie/bifshteks.png', composition: 'Котлета говяжья, яйцо, цуккини, брокколи, огурец, чесночный соус, масло оливковое, сыр Пармезан' },
      ]},
      { title: 'ЗАКУСКИ', items: [
        { name: 'Крылья в глазури кола-барбекю', price: 890, weight: '380гр', image: '/dishes/zakuski/krylya-cola-bbq.png', composition: 'Подаются с соломкой из моркови и сельдерея, и с соусом пармезан', calories: '37.8Б 45.6Ж 37.8У 712.8кКал' },
        { name: 'Креветки эби темпура', price: 650, weight: '160гр', image: '/dishes/zakuski/krevetki-ebi-tempura.png', desc: 'с соусом сладкий чили' },
        { name: 'Сырные палочки/шарики моцарелла', price: 590, weight: '190гр', desc: 'в хрустящей корочке' },
        { name: 'Ассорти из итальянских оливок', price: 500, weight: '93гр', image: '/dishes/zakuski/olivki.png' },
        { name: 'Ассорти сыров', price: 790, weight: '170гр', image: '/dishes/zakuski/assorti-syrov.png', desc: 'Пармезан, Блю чиз, Камамбер, Дюрр, грецкий орех, мед' },
        { name: 'Кесадилья с курицей и соусом Цезарь', price: 690, weight: '260гр', image: '/dishes/zakuski/kesadilya-kuritsa.png', composition: 'Тортилья, куриное филе, салат айсберг, помидор, моцарелла, сухарики, соус Цезарь, пармезан' },
        { name: 'Кесадилья с говядиной пастрами', price: 790, weight: '250гр', image: '/dishes/zakuski/kesadilya-pastrami.png', composition: 'Тортилья, говядина пастрами, салат айсберг, огурцы маринованные, халапеньо, моцарелла, соус горчичный, пармезан' },
        { name: 'Кесадилья с креветкой и авокадо', price: 850, weight: '270гр', tag: 'NEW' },
      ]},
      { title: 'САЛАТЫ', items: [
        { name: 'Цезарь с курицей', price: 790, weight: '270гр', image: '/dishes/salaty/tsezar-kuritsa.png', composition: 'Романо, айсберг, куриное филе, черри, пармезан, соус Цезарь, сухарики', calories: '34.5Б 29.5Ж 15.5У 465.5кКал' },
        { name: 'Зелёный салат с креветкой и авокадо', price: 890, weight: '290гр', image: '/dishes/salaty/zeleny-krevetka-avokado.png', composition: 'Креветка, авокадо, романо, айсберг, огурец, пармезан, яйцо, заправка Юдзу, кунжут', calories: '23Б 24Ж 14У 364кКал' },
        { name: 'Греческий салат', price: 790, weight: '320гр', image: '/dishes/salaty/grecheskiy.png', composition: 'Огурцы, помидоры, перец болгарский, лук красный, сыр Фета, петрушка, орегано, оливки, бальзамический уксус, оливковое масло' },
      ]},
      { title: 'СУПЫ', items: [
        { name: 'Рамен с курицей', price: 750, weight: '420гр', image: '/dishes/supy/ramen-kuritsa.png', composition: 'Бульон куриный, шампиньоны, бедро куриное, лапша яичная, яйцо, нори, кунжут, зеленый лук', calories: '30Б 15Ж 64У 511кКал' },
        { name: 'Том-ям', price: 850, weight: '390гр', image: '/dishes/supy/tom-yam.png', composition: 'Основа Том Ям, вода, кокосовое молоко, шампиньоны, креветки, кинза, томаты черри, рис', calories: '19Б 15Ж 14.7У 269.8кКал' },
      ]},
      { title: 'БУРГЕРЫ', items: [
        { name: 'Классический бургер с беконом', price: 850, weight: '325гр', image: '/dishes/burgery/klassicheskiy-bekon.png', composition: 'Булочка бриошь, говяжья котлета, бекон, сыр чеддер, айсберг, томат, огурец, лук, кетчуп, соус бургер', calories: '26.89Б 70.08Ж 44.8У 917.48кКал' },
        { name: 'Бургер с курицей', price: 650, weight: '260гр', image: '/dishes/burgery/burger-kuritsa.png', composition: 'Булочка бриошь, куриная котлета, сыр чеддер, лук фри, помидор, айсберг, соус бургер и барбекю', calories: '19.19Б 25.95Ж 61.99У 558.27кКал' },
      ]},
      { title: 'ГАРНИРЫ', items: [
        { name: 'Хашбраун', price: 390, weight: '150гр', image: '/dishes/garniry/hashbraun.png' },
        { name: 'Батат с пармезаном', price: 450, weight: '160гр', image: '/dishes/garniry/batat-parmezan.png' },
        { name: 'Картофель фри', price: 390, weight: '200гр', image: '/dishes/garniry/kartofel-fri.jpg' },
        { name: 'Картофельные дольки', price: 390, weight: '200гр', image: '/dishes/garniry/kartofelnye-dolki.png' },
        { name: 'Соус в ассортименте', price: 100, weight: '50гр', desc: 'Пармезан, барбекю, кетчуп, чесночный, сладкий чили, медово-горчичный, карри, горчичный, сальса, шрирача' },
      ]},
      { title: 'ДЕСЕРТЫ', items: [
        { name: 'Шоколадный фондан с английским кремом', price: 550, weight: '163гр', image: '/dishes/deserty/shokoladny-fondan.png', composition: 'Шоколад, сливочное масло, яйцо, мука, сахарная пудра, крем Англе, вафельная крошка, стружка темного шоколада' },
        { name: 'Чизкейк Сансебастьян с кремом Шантильи', price: 550, weight: '185гр', image: '/dishes/deserty/chizkeyk-sansebestyan.png' },
        { name: 'Блины "Сюзетт"', price: 700, weight: '260гр', tag: 'NEW' },
      ]},
      { title: 'СНЕКИ', items: [
        { name: 'Арахис', price: 300, weight: '150гр' },
        { name: 'Фисташки', price: 600, weight: '150гр' },
      ]},
    ],
  },
  wine: {
    title: 'ВИНО',
    sections: [
      { title: 'БЕЛОЕ — 125 мл', items: [
        { name: 'Пино Гриджио', price: 890 },
        { name: 'Совиньон Блан', price: 890 },
        { name: 'Рислинг', price: 890 },
      ]},
      { title: 'ИГРИСТОЕ — 125 мл', items: [
        { name: 'Бруни Просекко', price: 890 },
        { name: 'Бруни Асти', price: 890 },
        { name: 'Кава Брют', price: 890 },
      ]},
      { title: 'КРАСНОЕ — 125 мл', items: [
        { name: 'Каберне Совиньон', price: 890 },
        { name: 'Пино Нуар', price: 890 },
        { name: 'Риоха', price: 890 },
      ]},
    ],
  },
  beer: {
    title: 'ПИВО',
    sections: [
      { title: 'РАЗЛИВНОЕ — 0.5', items: [
        { name: 'Edelweiss', price: 550 },
        { name: 'Krusovice', price: 550 },
      ]},
      { title: 'БУТЫЛОЧНОЕ', items: [
        { name: 'Corona Extra 0.355', price: 550 },
        { name: 'Guinness 0.44', price: 750 },
        { name: 'Gletcher 0.5', price: 550 },
      ]},
      { title: 'СИДР/МЕДОВУХА — 0.75', items: [
        { name: 'Double Tree Cherry', price: 900 },
        { name: 'Honey "Гранатовый закат"', price: 900 },
        { name: 'Honey "Лесная малина"', price: 900 },
      ]},
    ],
  },
};
