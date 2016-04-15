/**
 * @fileoverview Pie chart.
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var ChartBase = require('./chartBase'),
    chartConst = require('../const'),
    predicate = require('../helpers/predicate'),
    Legend = require('../legends/legend'),
    Tooltip = require('../tooltips/tooltip'),
    Series = require('../series/pieChartSeries'),
    SimpleCustomEvent = require('../customEvents/simpleCustomEvent');

var PieChart = tui.util.defineClass(ChartBase, /** @lends PieChart.prototype */ {
    /**
     * Pie chart.
     * @constructs PieChart
     * @extends ChartBase
     * @param {Array.<Array>} rawData raw data
     * @param {object} theme chart theme
     * @param {object} options chart options
     */
    init: function(rawData, theme, options) {
        this.className = 'tui-pie-chart';

        options.tooltip = options.tooltip || {};

        if (!options.tooltip.align) {
            options.tooltip.align = chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
        }

        ChartBase.call(this, {
            rawData: rawData,
            theme: theme,
            options: options
        });

        this._addComponents(theme.chart.background, options);
    },

    /**
     * Add components
     * @param {object} chartBackground chart background
     * @param {object} options chart options
     * @private
     */
    _addComponents: function(chartBackground, options) {
        var legendAlign, isPieLegendType;

        options.legend = options.legend || {};
        legendAlign = options.legend && options.legend.align;
        isPieLegendType = predicate.isPieLegendAlign(legendAlign);

        if (!isPieLegendType && !options.legend.hidden) {
            this.componentManager.register('legend', Legend, {
                chartType: options.chartType,
                userEvent: this.userEvent
            });
        }

        this.componentManager.register('tooltip', Tooltip, this._makeTooltipData());

        this.componentManager.register('pieSeries', Series, {
            libType: options.libType,
            chartType: options.chartType,
            componentType: 'series',
            chartBackground: chartBackground,
            userEvent: this.userEvent,
            legendAlign: isPieLegendType && !options.legend.hidden ? legendAlign : null
        });
    },

    /**
     * Add custom event component.
     * @private
     */
    _addCustomEventComponent: function() {
        this.componentManager.register('customEvent', SimpleCustomEvent, {
            chartType: this.chartType
        });
    },

    /**
     * Add data ratios.
     * @private
     * @override
     */
    _addDataRatios: function() {
        this.dataProcessor.addDataRatiosOfPieChart();
    },

    /**
     * Attach custom evnet.
     * @private
     * @override
     */
    _attachCustomEvent: function() {
        var customEvent, tooltip, pieSeries;

        ChartBase.prototype._attachCustomEvent.call(this);

        customEvent = this.componentManager.get('customEvent');
        tooltip = this.componentManager.get('tooltip');
        pieSeries = this.componentManager.get('pieSeries');

        customEvent.on({
            clickPieSeries: pieSeries.onClickSeries,
            movePieSeries: pieSeries.onMoveSeries
        }, pieSeries);

        pieSeries.on({
            showTooltip: tooltip.onShow,
            hideTooltip: tooltip.onHide,
            showTooltipContainer: tooltip.onShowTooltipContainer,
            hideTooltipContainer: tooltip.onHideTooltipContainer
        }, tooltip);
    }
});

module.exports = PieChart;