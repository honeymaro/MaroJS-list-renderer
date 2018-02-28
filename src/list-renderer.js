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
	var renderRefresh = function () {
		var i = 0;
		var renderedHtml = "";
		for (i = 0; i < _renderData.length; i++) {
			var data = _renderData[i];
			var keys = Object.keys(data);
			var html = _renderTemplate;
			var j = 0;
			for (j = 0; j < keys.length; j++) {
				html = replaceAll(html, "${" + keys[j] + "}", data[keys[j]]);
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
		refresh: function(){
			renderRefresh();
			return true;
		}
	}
});
