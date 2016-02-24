ne.util.defineNamespace("fedoc.content", {});
fedoc.content["charts_columnChart.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Column chart.\n * @author NHN Ent.\n *         FE Development Team &lt;dl_javascript@nhnent.com>\n */\n\n'use strict';\n\nvar ChartBase = require('./chartBase'),\n    axisTypeMixer = require('./axisTypeMixer'),\n    verticalTypeMixer = require('./verticalTypeMixer'),\n    Series = require('../series/columnChartSeries');\n\nvar ColumnChart = tui.util.defineClass(ChartBase, /** @lends ColumnChart.prototype */ {\n    /**\n     * Column chart.\n     * @constructs ColumnChart\n     * @extends ChartBase\n     * @mixes axisTypeMixer\n     * @mixes verticalTypeMixer\n     * @param {array.&lt;array>} userData chart data\n     * @param {object} theme chart theme\n     * @param {object} options chart options\n     * @param {object} initedData initialized data from combo chart\n     */\n    init: function(userData, theme, options, initedData) {\n        var baseData = initedData || this.makeBaseData(userData, theme, options, {\n                isVertical: true,\n                hasAxes: true\n            }),\n            convertedData = baseData.convertedData,\n            bounds = baseData.bounds,\n            axesData = this._makeAxesData(convertedData, bounds, options, initedData);\n\n        /**\n         * className\n         * @type {string}\n         */\n        this.className = 'tui-column-chart';\n\n        ChartBase.call(this, {\n            bounds: bounds,\n            axesData: axesData,\n            theme: theme,\n            options: options,\n            isVertical: true,\n            initedData: initedData\n        });\n\n        this._addComponents(convertedData, axesData, options);\n    },\n\n    /**\n     * Add components\n     * @param {object} convertedData converted data\n     * @param {object} axesData axes data\n     * @param {object} options chart options\n     * @private\n     */\n    _addComponents: function(convertedData, axesData, options) {\n        var plotData, seriesData;\n\n        plotData = this.makePlotData(convertedData.plotData, axesData);\n        seriesData = {\n            allowNegativeTooltip: true,\n            data: {\n                values: convertedData.values,\n                formattedValues: convertedData.formattedValues,\n                formatFunctions: convertedData.formatFunctions,\n                scale: axesData.yAxis.scale\n            }\n        };\n        this.addAxisComponents({\n            convertedData: convertedData,\n            axes: axesData,\n            plotData: plotData,\n            chartType: options.chartType,\n            Series: Series,\n            seriesData: seriesData\n        });\n    }\n});\n\naxisTypeMixer.mixin(ColumnChart);\nverticalTypeMixer.mixin(ColumnChart);\n\nmodule.exports = ColumnChart;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"