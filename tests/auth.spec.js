import supertest from 'supertest';
import { expect } from 'chai';

describe('auth', function() {
    let result;

    describe('successful log in', function() {
        before(async function() {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: process.env.LOGIN, password: process.env.PASSWORD })
                .then(res => {
                    result = res;
                });
        });

        it('response status code is 200', function (done) {
           expect(result.statusCode).to.eq(200);
           console.log(result)
           done()
        });

        it('response body contains authorization token', function(done) {
            expect(result.body.token).not.to.be.undefined;
            done()
        })
    });

    describe('log in with wrong credentials should return error', function() {
        before(async function() {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: 'wrong', password: 'wrong' })
                .then(res => {
                    result = res;
                    console.log(result)
                });
        });

        it('response status code is 404', function(done) {
            expect(result.statusCode).to.eq(404);
            done()
        });

        it('response status code is 404', function(done) {
            expect(result.body.message).to.eq('Wrong login or password.');
            done()
        });
    })
});
