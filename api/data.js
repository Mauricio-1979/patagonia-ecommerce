import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: "Mario",
            email: "marioadmin@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true,
        },
        {
            name: "Sarah",
            email: "sarah@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false,
        }
    ],
    products: [
        {
            //_id: '1',
            name: 'Nike slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 15,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 8,
            description: 'high quality shirt'
        },
        {
            //_id: '2',
            name: 'Adidas Fit Shirt',
            slug: 'adidas-slim-shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 250,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.3,
            numReviews: 10,
            description: 'high quality shirt'
        },
        {
            //_id: '3',
            name: 'Nike slim pants',
            slug: 'nike-fit-pants',
            category: 'Pants',
            image: '/images/p3.jpg',
            price: 25,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality shirt'
        },
        {
            //_id: '4',
            name: 'Adidas Fit Pant',
            slug: 'adidas-fit-pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Adidas',
            rating: 5,
            numReviews: 11,
            description: 'high quality shirt'
        },
    ]
}

export default data;