const assert = require('assert');
const express = require('express');
const request = require('supertest');
const createRoute = require('../src/createRoute');

const {
	FailureImmediateCheck,
	SuccessfulImmediateCheck,
} = require('./fixtures/healthchecks');

describe('createRoute', function () {
	describe('Route', function () {
		context('when at least one of the healthchecks fails', function () {
			beforeEach(function () {
				const app = express();
				app.get('/', createRoute([FailureImmediateCheck]));
				this.app = app;
			});

			context('when the request content-type is text/plain', function () {
				it('responds with a fail', function (done) {
					request(this.app)
						.get('/')
						.set('Accept', 'text/plain')
						.expect(500)
						.expect('Content-Type', /text\/plain/)
						.expect(res => {
							const parsed = JSON.parse(res.text);
							assert.deepEqual(parsed, {
								healthy: false,
								healthchecks: [
									{
										name: 'FailureImmediateCheck',
										healthy: false,
										data: 'OK',
									},
								],
							});
						})
						.end(done);
				});
			});

			context('when the request content-type is application/json', function () {
				it('responds with a fail', function (done) {
					request(this.app)
						.get('/')
						.set('Accept', 'application/json')
						.expect(500)
						.expect('Content-Type', /application\/json/)
						.expect(res => {
							assert.deepEqual(res.body, {
								healthy: false,
								healthchecks: [
									{
										name: 'FailureImmediateCheck',
										healthy: false,
										data: 'OK',
									},
								],
							});
						})
						.end(done);
				});
			});

			context('when the request content-type is not explicitly handled', function () {
				it('responds with a fail', function (done) {
					request(this.app)
						.get('/')
						.set('Accept', 'foo/bar')
						.expect(500)
						.expect('Content-Type', /application\/json/)
						.expect(res => {
							assert.deepEqual(res.body, {
								healthy: false,
								healthchecks: [
									{
										name: 'FailureImmediateCheck',
										healthy: false,
										data: 'OK',
									},
								],
							});
						})
						.end(done);
				});
			});
		});

		context('when all the healthchecks pass', function () {
			beforeEach(function () {
				const app = express();
				app.get('/', createRoute([SuccessfulImmediateCheck]));
				this.app = app;
			});

			context('when the request content-type is text/plain', function () {
				it('responds with a fail', function (done) {
					request(this.app)
						.get('/')
						.set('Accept', 'text/plain')
						.expect(200)
						.expect('Content-Type', /text\/plain/)
						.expect(res => {
							const parsed = JSON.parse(res.text);
							assert.deepEqual(parsed, {
								healthy: true,
								healthchecks: [
									{
										name: 'SuccessfulImmediateCheck',
										healthy: true,
										data: 'OK',
									},
								],
							});
						})
						.end(done);
				});
			});

			context('when the request content-type is application/json', function () {
				it('responds with a fail', function (done) {
					request(this.app)
						.get('/')
						.set('Accept', 'application/json')
						.expect(200)
						.expect('Content-Type', /application\/json/)
						.expect(res => {
							assert.deepEqual(res.body, {
								healthy: true,
								healthchecks: [
									{
										name: 'SuccessfulImmediateCheck',
										healthy: true,
										data: 'OK',
									},
								],
							});
						})
						.end(done);
				});
			});

			context('when the request content-type is not explicitly handled', function () {
				it('responds with a fail', function (done) {
					request(this.app)
						.get('/')
						.set('Accept', 'foo/bar')
						.expect(200)
						.expect('Content-Type', /application\/json/)
						.expect(res => {
							assert.deepEqual(res.body, {
								healthy: true,
								healthchecks: [
									{
										name: 'SuccessfulImmediateCheck',
										healthy: true,
										data: 'OK',
									},
								],
							});
						})
						.end(done);
				});
			});
		});
	});
});
