const item0 = {
  id: 'specialItem',

  images: [
    { src: 'https://picsum.photos/120', alt: 'item picture 1' },
    { src: 'https://picsum.photos/120', alt: 'item picture 1' },
    { src: 'https://picsum.photos/120', alt: 'item picture 1' },
  ],
  item: {
    id: 'selected item id',
    thumbnail: {
      src: 'https://picsum.photos/150',
      alt: 'selected item picture',
    },
    isFavorite: true,
    price: 299.43,
    name: 'Nike Air Zoom Pegasus 36 Miami',
    score: 4.75,
  },
  options: [
    {
      title: 'select size',
      options: [
        { value: 6 },
        { value: 6.5 },
        { value: 7 },
        { value: 7.5 },
        { value: 8 },
        { value: 8.5 },
        { value: 9 },
        { value: 9.5 },
        { value: 10 },
      ],
    },
    {
      title: 'select color',
      options: [
        { value: 'var(--yellow)' },
        { value: 'var(--blue)' },
        { value: 'var(--red)' },
        { value: 'var(--green)' },
        { value: 'var(--purple)' },
        { value: 'var(--dark)' },
      ],
    },
  ],
  specifications: [
    { key: 'Shown', value: 'Laser Blue/Anthracite/Watermelon/White' },
    { key: 'Style', value: 'CD0113-400' },
  ],
  description:
    'The Nike Air Max 270 React ENG combines a full-length React foam midsole with a 270 Max Air unit for unrivaled comfort and a striking visual experience.',
  reviews: [
    {
      id: 'review 1',
      publishedDate: 'December 10, 2016',
      comment:
        'air max are always very comfortable fit, clean and just perfect in every way. just the box was too small and scrunched the sneakers up a little bit, not sure if the box was always this small but the 90s are and will always be one of my favorites.',
      score: 4.2,
      user: {
        name: 'James',
        id: 'user0',
        lastName: 'Lawson',
        avatar: { src: 'https://picsum.photos/100', alt: 'avatar user 0' },
      },
      photos: [
        {
          src: 'https:/picsum.photos/150',
          alt: 'photo 0 from user 0',
        },
        {
          src: 'https:/picsum.photos/150',
          alt: 'photo 1 from user 0',
        },
        {
          src: 'https:/picsum.photos/150',
          alt: 'photo 2 from user 0',
        },
      ],
    },
    {
      id: 'review 2',
      publishedDate: 'December 10, 2016',
      comment:
        'This is really amazing product, i like the design of product, I hope can buy it again!',
      score: 4,
      user: {
        name: 'Laura',
        id: 'user2',
        lastName: 'Octavian',
        avatar: { src: 'https://picsum.photos/100', alt: 'avatar user 2' },
      },
      photos: [],
    },
    {
      id: 'review 1',
      publishedDate: 'December 10, 2016',
      comment:
        'air max are always very comfortable fit, clean and just perfect in every way. just the box was too small and scrunched the sneakers up a little bit',
      score: 5,
      user: {
        name: 'Jhonson',
        id: 'user1',
        lastName: 'Bridge',
        avatar: { src: 'https://picsum.photos/100', alt: 'avatar user 1' },
      },
      photos: [],
    },
    {
      id: 'review 3',
      publishedDate: 'December 10, 2016',
      comment:
        'air max are always very comfortable fit, clean and just perfect in every way. just the box was too small',
      score: 5,
      user: {
        name: 'Griffin',
        id: 'user3',
        lastName: 'Rod',
        avatar: { src: 'https://picsum.photos/100', alt: 'avatar user 3' },
      },
      photos: [
        {
          src: 'https:/picsum.photos/150',
          alt: 'photo 0 from user 0',
        },
        {
          src: 'https:/picsum.photos/150',
          alt: 'photo 1 from user 0',
        },
      ],
    },
  ],
};

module.exports = {
  item0,
};
