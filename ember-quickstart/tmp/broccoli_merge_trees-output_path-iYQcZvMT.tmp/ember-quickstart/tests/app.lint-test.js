define('ember-quickstart/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/people-list.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/people-list.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/programmers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/programmers.js should pass ESLint\n\n');
  });

  QUnit.test('routes/scientists.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scientists.js should pass ESLint\n\n');
  });

  QUnit.test('routes/singin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/singin.js should pass ESLint\n\n');
  });

  QUnit.test('routes/singup.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/singup.js should pass ESLint\n\n');
  });
});