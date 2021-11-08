import { Product } from '../models/index.js';
import faker from 'faker';

function createOne() {
  const name = faker.commerce.productName();
  const thumbnail = {
    src: faker.image.imageUrl(200, 200, undefined, true),
    alt: faker.image.image(),
  };
  const price = faker.commerce.price();
  const category = faker.commerce.productAdjective();
  const percentageOff = faker.datatype.number(90);
  const description = faker.commerce.productDescription();
  let images = [];
  let specifications = [];
  let options = [];
  for (let i = 0; i < 8; i++) {
    images.push({
      src: faker.image.fashion(200, 200),
      alt: faker.image.image(),
    });

    if (i < 8) {
      specifications.push({
        key: faker.lorem.word(),
        value: faker.lorem.word(),
      });
    }

    if (i < 3) {
      options.push({
        title: faker.lorem.word(),
        values: faker.lorem.words(6).split(' '),
      });
    }
  }

  const doc = {
    name,
    thumbnail,
    price,
    category,
    percentageOff,
    description,
    images,
    specifications,
    options,
  };

  return doc;
}

export default async function createProducts(n = 150) {
  const totalDocs = await Product.estimatedDocumentCount();
  if (totalDocs > n) return;
  let items = [];
  for (let i = 0; i < n; i++) {
    items.push(createOne());
  }
  //console.log(items);
  Product.create(items).catch('something went wrong creating mock up database');
}
