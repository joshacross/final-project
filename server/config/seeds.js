const db = require('./connection');
const { User, Product, Category, Review } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  await Review.deleteMany();
  await User.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Watch' },
    { name: 'Hat' },
    { name: 'Sunglasses' }
  ]);

  console.log('categories seeded');

  const user = await User.insertMany([
    {
      firstName: 'James',
      lastName: 'Johnson',
      email: 'james@gmail.com',
      password: 'password123',
      orders:[]
    },
    {
      firstName: 'Listen',
      lastName: 'Linda',
      email: 'llinda@gmail.com',
      password: 'password123',
      orders: []
    },
    {
      firstName: 'Daddie',
      lastName: 'Warbucks',
      email: 'dwar@gmail.com',
      password: 'password123',
      orders: []
    },
    {
      firstName: 'Cynthia',
      lastName: 'Thetic',
      email: 'cynthetic@gmail.com',
      password: 'password123',
      orders: []
    },
    {
      firstName: 'Foh',
      lastName: 'Pah',
      email: 'FohPah@gmail.com',
      password: 'password123',
      orders: []
    },
    {
      firstName: 'Johnny',
      lastName: 'Appleseed',
      email: 'japple@gmail.com',
      password: 'password123',
      orders: []
    },
    {
      firstName: 'Georgia',
      lastName: 'Carver',
      email: 'carver@gmail.com',
      password: 'password123',
      orders: []
    }
  ])

  console.log('user seeded');

  const review = await Review.insertMany([
    {
      user: user[0]._id,
      reviewText: 'This should be a review by James Johnson. This is a fantastic product, love the new augmented features! Wish the description was not in latin thougth.'
    },
    {
      user: user[1]._id,
      reviewText: 'This should be a review by Listen Linda. This is a fantastic product, love the new augmented features!'
    },
    {
      user: user[2]._id,
      reviewText: 'This should be a review by Daddie Warbucks. This is a fantastic product, love the new augmented features!'
    },
    {
      user: user[3]._id,
      reviewText: 'This should be a review by Cynthia Thetic. This is a fantastic product, love the new augmented features!'
    },
    {
      user: user[4]._id,
      reviewText: 'This should be a review by Foh Pah. This is a fantastic product, love the new augmented features!'
    },
    {
      user: user[5]._id,
      reviewText: 'This should be a review by Johnny Appleseed. This is a fantastic product, love the new augmented features!'
    },
    {
      user: user[6]._id,
      reviewText: 'This should be a review by Georgia Carver. This is a fantastic product, love the new augmented features!'
    }
  ])

  console.log('Reviews seeded.')

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Cool Watch One',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      modelImage: 'watchone.jpg',
      thumbnail: 'watchone.jpg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500,
      reviews: review[0]._id
    },
    {
      name: 'Hat One',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      modelImage: 'hatone.jpg',
      thumbnail: 'hatone.jpg',
      category: categories[1]._id,
      price: 1.99,
      quantity: 500,
      reviews: review[1]._id
    },
    {
      name: 'Sunglasses One',
      category: categories[2]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      modelImage: 'sunone.jpg',
      thumbnail: 'sunone.jpg',
      price: 7.99,
      quantity: 20,
      reviews: review[2]._id
    },
    {
      name: 'Another Watch Two',
      category: categories[0]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      modelImage: 'watchtwo.jpg',
      thumbnail: 'watchtwo.jpg',
      price: 3.99,
      quantity: 50,
      reviews: review[3]._id
    },
    {
      name: 'Top Hat Two',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      modelImage: 'hattwo.jpg',
      thumbnail: 'hattwo.jpg',
      price: 14.99,
      quantity: 100,
      reviews: review[4]._id
    },
    {
      name: 'Shades Two',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      modelImage: 'suntwo.jpg',
      thumbnail: 'suntwo.jpg',
      price: 399.99,
      quantity: 30,
      reviews: review[5]._id
    },
    {
      name: 'Watch Number Three',
      category: categories[0]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      modelImage: 'watchthree.jpg',
      thumbnail: 'watchthree.jpg',
      price: 199.99,
      quantity: 30,
      reviews: review[6]._id
    },
    {
      name: 'Hat Wear Three',
      category: categories[1]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      modelImage: 'hatthree.jpg',
      thumbnail: 'hatthree.jpg',
      price: 9.99,
      quantity: 100,
      reviews: review[0]._id
    },
    {
      name: 'Sunnies Three',
      category: categories[2]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      modelImage: 'sunthree.jpg',
      thumbnail: 'sunthree.jpg',
      price: 1.99,
      quantity: 1000,
      reviews: review[1]._id
    },
    {
      name: 'Watch It Four',
      category: categories[0]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      modelImage: 'watchfour.jpg',
      thumbnail: 'watchfour.jpg',
      price: 2.99,
      quantity: 1000,
      reviews: review[2]._id
    },
    {
      name: 'Head Gear Four',
      category: categories[1]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      modelImage: 'hatfour.jpg',
      thumbnail: 'hatfour.jpg',
      price: 7.99,
      quantity: 100,
      reviews: review[3]._id
    },
    {
      name: 'SunShadeFour',
      category: categories[2]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      modelImage: 'sunfour.jpg',
      thumbnail: 'sunfour.jpg',
      price: 9.99,
      quantity: 600,
      reviews: review[4]._id
    }
  ]);

  await User.updateOne({
    _id: user[0]._id,
    orders: [
      {
        products: [ products[0]._id, products[5]._id, products[6]._id ]
      }
    ]
  })

  console.log('products seeded');

  process.exit();
});
