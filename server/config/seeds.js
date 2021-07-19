const db = require('./connection');
const { User, Product, Category, Review } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  await User.deleteMany();
  await Review.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Watch' },
    { name: 'Hat' },
    { name: 'Sunglasses' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  await Product.insertMany([
    {
      name: 'Cool Watch One',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      modelImage: 'watchone.jpeg',
      thumbnail: 'watchone.jpeg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500,
      reviews: []
    },
    {
      name: 'Hat One',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      modelImage: 'hatone.jpeg',
      thumbnail: 'hatone.jpeg',
      category: categories[1]._id,
      price: 1.99,
      quantity: 500,
      reviews: []
    },
    {
      name: 'Sunglasses One',
      category: categories[2]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      modelImage: 'sunone.jpeg',
      thumbnail: 'sunone.jpeg',
      price: 7.99,
      quantity: 20,
      reviews: []
    },
    {
      name: 'Another Watch Two',
      category: categories[0]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      modelImage: 'watchtwo.jpeg',
      thumbnail: 'watchtwo.jpeg',
      price: 3.99,
      quantity: 50,
      reviews: []
    },
    {
      name: 'Top Hat Two',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      modelImage: 'hattwo.jpeg',
      thumbnail: 'hattwo.jpeg',
      price: 14.99,
      quantity: 100,
      reviews: []
    },
    {
      name: 'Shades Two',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      modelImage: 'suntwo.jpeg',
      thumbnail: 'suntwo.jpeg',
      price: 399.99,
      quantity: 30,
      reviews: []
    },
    {
      name: 'Watch Number Three',
      category: categories[0]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      modelImage: 'watchthree.jpeg',
      thumbnail: 'watchthree.jpeg',
      price: 199.99,
      quantity: 30,
      reviews: []
    },
    {
      name: 'Hat Wear Three',
      category: categories[1]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      modelImage: 'hatthree.jpeg',
      thumbnail: 'hatthree.jpeg',
      price: 9.99,
      quantity: 100,
      reviews: []
    },
    {
      name: 'Sunnies Three',
      category: categories[2]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      modelImage: 'sunthree.jpeg',
      thumbnail: 'sunthree.jpeg',
      price: 1.99,
      quantity: 1000,
      reviews: []
    },
    {
      name: 'Watch It Four',
      category: categories[0]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      modelImage: 'watchfour.jpeg',
      thumbnail: 'watchfour.jpeg',
      price: 2.99,
      quantity: 1000,
      reviews: []
    },
    {
      name: 'Head Gear Four',
      category: categories[1]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      modelImage: 'hatfour.jpeg',
      thumbnail: 'hatfour.jpeg',
      price: 7.99,
      quantity: 100,
      reviews: []
    },
    {
      name: 'SunShadeFour',
      category: categories[2]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      modelImage: 'sunfour.jpeg',
      thumbnail: 'sunfour.jpeg',
      price: 9.99,
      quantity: 600,
      reviews: []
    }
  ]);

  console.log('products seeded');

  process.exit();
});
