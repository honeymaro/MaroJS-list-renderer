var Maro;
Maro = !Maro ? {} : Maro;
Maro.listRenderer = !Maro.listRenderer ? {} : Maro.listRenderer;
Maro.listRenderer = (function (_initTarget, _initTemplate, _initData) {
	var _renderData = _initData ? _initData : [];
	var _renderTemplate = _initTemplate ? _initTemplate : "";
	var _renderTarget = _initTarget ? _initTarget : "";
	var replaceAll = function (targetValue, searchValue, replaceValue) {
		return targetValue.split(searchValue).join(replaceValue);
	}

	var getExpressionList = function (str) {
		var splitedTemplate = str.split("${");
		var i = 0;
		var arrayExpression = [];

		for (i = 1; i < splitedTemplate.length; i++) {
			splitedTemplate[i] = splitedTemplate[i].split("}");
			arrayExpression.push(splitedTemplate[i][0]);
		}

		return arrayExpression;

	}

	var expressionToValue = function (expression, data) {

		expression = JSON.stringify(expression).slice(1, -1); //replaceAll(expression,"'","\\'");

		var keys = Object.keys(data);
		var keysString = keys.join(",");

		var datas = [];
		var i = 0;
		for (i = 0; i < keys.length; i++) {
			datas.push(JSON.stringify(data[keys[i]]).slice(1, -1));
		}
		var datasString = "'" + datas.join("', '") + "'";
		var evaluator = new Function(
			"var evaluator = new Function('" + keysString + "', 'try{\\nreturn " + expression + ";');\\n}\\ncatch(e){\\nreturn undefined;\\n}\\n"
			+ "return evaluator(" + datasString + ");"
		);
		return evaluator();
	}

	var renderRefresh = function () {
		var i = 0;
		var renderedHtml = "";
		var expressionList = getExpressionList(_renderTemplate);

		for (i = 0; i < _renderData.length; i++) {
			var data = _renderData[i];
			var html = _renderTemplate;
			var j = 0;
			for (j = 0; j < expressionList.length; j++) {
				html = replaceAll(html, "${" + expressionList[j] + "}", expressionToValue(expressionList[j], data));
			}
			renderedHtml += html;
		}
		$(_renderTarget).html(renderedHtml);
	}
	var removeNeedlessSpace = function (str) {
		var splitedTemplate = str.split("${");
		var i = 0;

		for (i = 1; i < splitedTemplate.length; i++) {
			splitedTemplate[i] = splitedTemplate[i].split("}");
			splitedTemplate[i][0] = splitedTemplate[i][0].trim();
			splitedTemplate[i] = splitedTemplate[i].join("}");
		}

		return splitedTemplate.join("${");
	}
	_renderTemplate = removeNeedlessSpace(_renderTemplate);
	renderRefresh();
	return {
		setRenderData: function (data) {
			_renderData = data;
			renderRefresh();
			return _renderData;
		},
		getRenderData: function (index) {
			return index === undefined ? _renderData : _renderData[index];
		},
		getRenderTarget: function () {
			return _renderTarget;
		},
		getRenderTemplate: function () {
			return _initTemplate;
		},
		setRenderTemplate: function (str) {
			_renderTemplate = removeNeedlessSpace(str);
			renderRefresh();
		},
		addRenderData: function (data) {

			var i = 0;
			data = Array.isArray(data) ? data : [data];

			for (i = 0; i < data.length; i++) {
				_renderData.push(data[i]);
			}

			renderRefresh();
			return _renderData;
		},
		removeRenderData: function (index, count) {
			count = count || 1;
			_renderData.splice(index, count);
			renderRefresh();
			return _renderData;
		},
		sort: function (compareFn) {
			_renderData.sort(compareFn);
			renderRefresh();
			return _renderData;
		},
		refresh: function () {
			renderRefresh();
			return true;
		}
	}
});
