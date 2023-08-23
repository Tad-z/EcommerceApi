// just testing impotant endpoints that i use in the frontend

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // Update this with your server entry point file
const { date } = require('joi');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Products API', () => {
    // posting a product requires a product image file and multipart form which i cannot imitate here
    describe('GET /products', () => {
        it('should retrieve a list of products', async () => {
            try {
                const res = await chai.request(server).get('/products/');

                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Products retrieved successfully');
                expect(res.body).to.have.property('count').to.be.a('number');
                expect(res.body).to.have.property('products').to.be.an('array');

            } catch (error) {

                throw error;
            }
        }).timeout(20000);
    });

    describe('GET /products/:id', () => {
        it('should retrieve a single product', async () => {
            try {
                const res = await chai.request(server).get('/products/634456e0c51c4b30ddb7005a');

                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title').eql('Cactus Jack Tee Shirt');
                expect(res.body).to.have.property('price').to.be.a('number');
                expect(res.body).to.have.property('color').to.be.a('string');
                expect(res.body).to.have.property('slug').to.be.a('string');
                expect(res.body).to.have.property('createdAt').to.be.a('string');
            } catch (error) {
                throw error;
            }
        }).timeout(20000);
    });

    describe('Patch /products/:id', () => {
        it('should update a single product', async () => {
            try {
                const res = await chai.request(server).patch('/products/634456e0c51c4b30ddb7005a').send({
                    title: 'Cactus Jack Tee Shirt',
                    price: 6500,
                    color: 'Black',
                    slug: 'cactus-jack-tee-shirt',
                    createdAt: '2021-09-06T12:00:00.000Z'
                });

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Product was updated successfully.')

            } catch (error) {
                throw error;
            }
        }).timeout(20000);
    });

    // i dont want to delete all products so i will not test my delete endpoint
});

/* i developed the user sign up in such a way that a user cannot sign up with a generic username
that is 2 users can not have the same username
so i am commenting this part out because i have already signed up a user with the username testuser
you can uncomment it and use a different username to test it */

describe('User API', () => {
    //     describe('POST /user/signup', () => {
    //         it('should create a new user', async () => {
    //             try {
    //                 const res = await chai.request(server).post('/user/signup').send({
    //                     username: 'testuser',
    //                     email: 'test@gmail.com',
    //                     password: 'testpassword'
    //                 });

    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.have.property('message').eql('You have signed up successfully');
    //             } catch (error) {
    //                 throw error;
    //             }
    //         }).timeout(20000);
    //     });

    describe('POST /user/login', () => {
        it('should login a user', async () => {
            try {
                const res = await chai.request(server).post('/user/login').send({
                    username: "testuser",
                    password: "testpassword"
                });

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Authentication successful');
                expect(res.body).to.have.property('token').to.be.a('string');
            } catch (error) {
                throw error;
            }
        }).timeout(20000);
    });

    // don't want an error cuz i have deleted the user i created the first time i tested this

    // describe('delete /user/:id', () => {
    //     it('should delete a user', async () => {
    //         try {
    //             const res = await chai.request(server).delete('/user/64d360953944f77b9548d2a0');

    //             expect(res).to.have.status(200);
    //             expect(res.body).to.have.property('message').eql('User was deleted successfully!');
    //         } catch (error) {
    //             throw error;
    //         }
    //     }).timeout(20000);
    // });

    describe('get /users', () => {
        it('should return all users', async () => {
            try {
                const res = await chai.request(server).get('/user/');
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Users retrieved successfully');

            } catch (error) {
                throw error;
            }
        }).timeout(20000);
    });

})


const mockUser = {
    userId: "64e60e96c9889401197300f2",
    email: 'test@gmail.com',
};
const token = jwt.sign(mockUser, process.env.JWT_KEY);
describe('Cart API', () => {
    describe('POST /cart', () => {
        it('should add an item to the cart', async () => {
            try {
                const itemToAdd = {
                    productId: '634456e0c51c4b30ddb7005a',
                    userId: '64e60e96c9889401197300f2',
                    quantity: 2,
                };
                const res = await chai.request(server)
                    .post('/cart')
                    .set('Authorization', `Bearer ${token}`) // Inject the mock user's token
                    .send(itemToAdd);

                expect(res).to.have.status(200);
                // Add more assertions for the response
            } catch (error) {
                // Handle errors here if needed
                throw error;
            }
        });

        it('should return unauthorized access without token', async () => {
            try {
                const itemToAdd = {
                    productId: '634456e0c51c4b30ddb7005a',
                    userId: '64e60e96c9889401197300f2',
                    quantity: 2,
                };
                const res = await chai.request(server)
                    .post('/cart')
                    .send(itemToAdd);

                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').eql('Unauthorized access');
                // Add more assertions for the response
            } catch (error) {
                // Handle errors here if needed
                throw error;
            }
        });
    }).timeout(20000);

    describe('GET /cart', () => {
        it(`should retrieve all items in the user's cart`, async () => {
            try {
                const res = await chai.request(server)
                    .get('/cart')
                    .set('Authorization', `Bearer ${token}`) // Inject the mock user's token

                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Products retrieved successfully');
                expect(res.body.count).to.be.a('number');
                expect(res.body.cartItems).to.be.an('array');
                // Add more assertions for the response
            } catch (error) {
                // Handle errors here if needed
                throw error;
            }
        });

        it('should return unauthorized access without token', async () => {
            try {
                const res = await chai.request(server)
                    .get('/cart')

                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').eql('Unauthorized access');
                // Add more assertions for the response
            } catch (error) {
                // Handle errors here if needed
                throw error;
            }
        });
    }).timeout(20000);

    describe('GET /cart/:id', () => {
        it(`should retrieve a single item in the user's cart`, async () => {
            try {
                const res = await chai.request(server)
                    .get('/cart/634456e0c51c4b30ddb7005a')
                    .set('Authorization', `Bearer ${token}`) // Inject the mock user's token

                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                // Add more assertions for the response
            } catch (error) {
                // Handle errors here if needed
                throw error;
            }
        });
    }).timeout(20000);

    describe('PATCH /cart/:id', () => {
        it('should update the quantity of a product in cart', async () => {
            const newQuantity = {
                quantity: 1
            }
            try {
                const res = await chai.request(server)
                .patch('/cart/64e62126f60caf572b217840')
                .set('Authorization', `Bearer ${token}`) 
                .send(newQuantity)

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql("Product was updated successfully.");
            } catch (error) {
                throw error
            }
        })
    }).timeout(20000);

    // describe('DELETE /cart/:id', () => {
    //     it('should delete a product from cart', async () => {
    //         try {
    //             const res = await chai.request(server)
    //             .delete('/cart/64e61be6ebc19843cd843880')
    //             .set('Authorization', `Bearer ${token}`) 

    //             expect(res).to.have.status(204);
    //             expect(res.body).to.have.property('message').eql("Product was deleted successfully!");
    //         } catch (error) {
    //             throw error
    //         }
    //     })
    // })

    // describe('DELETE /cart', () => {
    //     it('should delete all products from cart', async () => {
    //         try {
    //             const res = await chai.request(server)
    //             .delete('/cart')
    //             .set('Authorization', `Bearer ${token}`) 

    //             expect(res).to.have.status(204);
    //         } catch (error) {
    //             throw error
    //         }
    //     })

   
});











