define('ember-quickstart/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/people-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/people-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/programmers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/programmers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/scientists-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/scientists-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/singin-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/singin-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/singup-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/singup-test.js should pass ESLint\n\n');
  });
});