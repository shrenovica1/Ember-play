QUnit.module('ESLint | app');

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('components/people-list.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/people-list.js should pass ESLint\n\n');
});

QUnit.test('components/popular-locations.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/popular-locations.js should pass ESLint\n\n');
});

QUnit.test('components/popular-restaurants.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/popular-restaurants.js should pass ESLint\n\n');
});

QUnit.test('components/restaurant-search.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/restaurant-search.js should pass ESLint\n\n');
});

QUnit.test('components/single-restaurant-popular.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'components/single-restaurant-popular.js should pass ESLint\n\n');
});

QUnit.test('controllers/singup.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/singup.js should pass ESLint\n\n7:10 - \'post\' is not defined. (no-undef)');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/home.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/home.js should pass ESLint\n\n');
});

QUnit.test('routes/index.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/index.js should pass ESLint\n\n');
});

QUnit.test('routes/scientists.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/scientists.js should pass ESLint\n\n');
});

QUnit.test('routes/singin.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/singin.js should pass ESLint\n\n');
});

QUnit.test('routes/singup.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/singup.js should pass ESLint\n\n');
});

