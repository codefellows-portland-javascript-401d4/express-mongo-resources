'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe('works api', () => {
    before(done => {
        const connected = 1;
        if(connection.readyState === connected) dropConnection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'works'
        }
    })
});