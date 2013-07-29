angular.module('SpecApp', ['ui.bootstrap']);

angular.module('SpecApp').run(function ($http, $rootScope, $route, $location) {

	$rootScope.base = '/';
	$rootScope.root = '/';
	$rootScope.title = 'History';
	var base = window.location.pathname.split('/');
	var version = false;
	angular.forEach(base, function (item, index) {
		if (item === 'versions' && item !== '') {
			$rootScope.base += item + '/';
			version = index;
		} else if (version === false && item !== 'versions' && item !== '') {
			$rootScope.base += item + '/';
			$rootScope.root += item + '/';
		} else {
			if ((version + 1) >= index && item !== '') {
				$rootScope.base += item + '/';
				$rootScope.version = item;
			} else if ((version + 2 === index && item !== '')) {
				$rootScope.folder = item;
			}
		}
	});

	if ($rootScope.base !== $rootScope.root) {
		$http.get($rootScope.base + 'routes.json').success(function (data) {
			$rootScope.routes = data;
			angular.forEach(data, function (datum) {
				var path = $rootScope.base + datum.folder;
				$route.routes[path] = {
					templateUrl: path + '/index.html'
				};
				if (datum.folder === $rootScope.folder) {
					$rootScope.title = datum.title;
				}
			});
		});
	}

	$http.get($rootScope.root + 'spec.json').success(function (data) {
		$rootScope.spec = data;
	});
});