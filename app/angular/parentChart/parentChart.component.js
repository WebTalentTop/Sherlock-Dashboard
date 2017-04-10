"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shape = require("d3-shape");
var data_1 = require("./data");
var chartTypes_1 = require("./chartTypes");
var http_1 = require("@angular/http");
var ParentChartComponent = (function () {
    function ParentChartComponent(http) {
        this.http = http;
        this.version = "4.3.0";
        this.colorSets = [
            {
                name: 'cool',
                selectable: true,
                group: 'Ordinal',
                domain: [
                    '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
                ]
            },
        ];
        this.theme = 'dark';
        this.chartType = 'bar-vertical';
        this.realTimeData = true;
        this.linearScale = false;
        this.range = false;
        this.width = 700;
        this.height = 300;
        this.fitContainer = true;
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.tooltipDisabled = false;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'GDP Per Capita';
        this.showGridLines = true;
        this.innerPadding = 8;
        this.barPadding = 8;
        this.groupPadding = 16;
        this.roundDomains = false;
        this.maxRadius = 10;
        this.minRadius = 3;
        // line interpolation
        this.curveType = 'Linear';
        this.curve = shape.curveLinear;
        this.interpolationTypes = [
            'Basis', 'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
            'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
        ];
        this.schemeType = 'ordinal';
        this.rangeFillOpacity = 0.15;
        // pie
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
        this.arcWidth = 0.25;
        // line, area
        this.autoScale = true;
        this.timeline = false;
        // margin
        this.margin = false;
        this.marginTop = 40;
        this.marginRight = 40;
        this.marginBottom = 40;
        this.marginLeft = 40;
        // gauge
        this.gaugeMin = 0;
        this.gaugeMax = 100;
        this.gaugeLargeSegments = 10;
        this.gaugeSmallSegments = 5;
        this.gaugeTextValue = '';
        this.gaugeUnits = 'alerts';
        this.gaugeAngleSpan = 240;
        this.gaugeStartAngle = -120;
        this.gaugeShowAxis = true;
        this.gaugeValue = 50; // linear gauge value
        this.gaugePreviousValue = 70;
        this.card1 = {
            name: 'card1',
            selectable: false,
            group: 'Ordinal',
            domain: [
                '#00a79a', '#94bfff', '#fdbf1d'
            ]
        };
        this.heatmap_color = {
            name: 'heatmap1',
            selectable: true,
            group: 'Ordinal',
            domain: [
                '#657dab', '#677dac', '#687eac', '#6c7ead', '#8c837a', '#9184ab', '#ac88ac', '#e99eb0', '#febfa5', '#ac88ac'
            ]
        };
        Object.assign(this, {
            cardResult: data_1.cardResult,
            external_balance: data_1.external_balance,
            internal_product: data_1.internal_product,
            single: data_1.single,
            multi: data_1.multi,
            countries: data_1.countries,
            chartGroups: chartTypes_1.default,
            graph: data_1.generateGraph(50),
            bubble: data_1.bubble
        });
        this.dateData = data_1.generateData(5, false);
        this.dateDataWithRange = data_1.generateData(2, true);
        this.setColorScheme('cool');
    }
    ParentChartComponent.prototype.handleError = function (error) {
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return errMsg;
    };
    Object.defineProperty(ParentChartComponent.prototype, "dateDataWithOrWithoutRange", {
        get: function () {
            if (this.range) {
                return this.dateDataWithRange;
            }
            else {
                return this.dateData;
            }
        },
        enumerable: true,
        configurable: true
    });
    ParentChartComponent.prototype.ngOnInit = function () {
        this.selectChart(this.chartType);
        //setInterval(this.updateData.bind(this), 1000);
        if (!this.fitContainer) {
            this.applyDimensions();
        }
    };
    ParentChartComponent.prototype.updateData = function () {
        if (!this.realTimeData) {
            return;
        }
        this.gaugeValue = this.gaugeMin + Math.floor(Math.random() * (this.gaugeMax - this.gaugeMin));
        var country = this.countries[Math.floor(Math.random() * this.countries.length)];
        var add = Math.random() < 0.7;
        var remove = Math.random() < 0.5;
        if (remove) {
            if (this.single.length > 1) {
                var index = Math.floor(Math.random() * this.single.length);
                this.single.splice(index, 1);
                this.single = this.single.slice();
            }
            if (this.multi.length > 1) {
                var index = Math.floor(Math.random() * this.multi.length);
                this.multi.splice(index, 1);
                this.multi = this.multi.slice();
            }
            if (this.bubble.length > 1) {
                var index = Math.floor(Math.random() * this.bubble.length);
                this.bubble.splice(index, 1);
                this.bubble = this.bubble.slice();
            }
            if (this.graph.nodes.length > 1) {
                var index = Math.floor(Math.random() * this.graph.nodes.length);
                var value_1 = this.graph.nodes[index].value;
                this.graph.nodes.splice(index, 1);
                var nodes = this.graph.nodes.slice();
                var links = this.graph.links.filter(function (link) {
                    return link.source !== value_1 && link.source.value !== value_1 &&
                        link.target !== value_1 && link.target.value !== value_1;
                });
                this.graph = { links: links, nodes: nodes };
            }
        }
        if (add) {
            // single
            var entry = {
                name: country,
                value: Math.floor(10000 + Math.random() * 50000)
            };
            this.single = this.single.concat([entry]);
            // multi
            var multiEntry = {
                name: country,
                series: [{
                        name: '2010',
                        value: Math.floor(1000000 + Math.random() * 20000000)
                    }, {
                        name: '2011',
                        value: Math.floor(1000000 + Math.random() * 20000000)
                    }]
            };
            this.multi = this.multi.concat([multiEntry]);
            // graph
            var node = { value: country };
            var nodes = this.graph.nodes.concat([node]);
            var link = {
                source: country,
                target: nodes[Math.floor(Math.random() * (nodes.length - 1))].value,
            };
            var links = this.graph.links.concat([link]);
            this.graph = { links: links, nodes: nodes };
            // bubble
            var bubbleEntry = {
                name: country,
                series: [{
                        name: '2010',
                        x: Math.floor(10000 + Math.random() * 20000),
                        y: Math.floor(30 + Math.random() * 70),
                        r: Math.floor(30 + Math.random() * 20),
                    }, {
                        name: '2011',
                        x: Math.floor(10000 + Math.random() * 20000),
                        y: Math.floor(30 + Math.random() * 70),
                        r: Math.floor(30 + Math.random() * 20),
                    }]
            };
            this.bubble = this.bubble.concat([bubbleEntry]);
        }
        this.dateData = data_1.generateData(5, false);
        this.dateDataWithRange = data_1.generateData(2, true);
    };
    ParentChartComponent.prototype.applyDimensions = function () {
        this.view = [this.width, this.height];
    };
    ParentChartComponent.prototype.toggleFitContainer = function (event) {
        this.fitContainer = event;
        if (this.fitContainer) {
            this.view = undefined;
        }
        else {
            this.applyDimensions();
        }
    };
    ParentChartComponent.prototype.selectChart = function (chartSelector) {
        this.chartType = chartSelector;
        this.linearScale = this.chartType === 'line-chart' ||
            this.chartType === 'line-chart-with-ranges' ||
            this.chartType === 'area-chart' ||
            this.chartType === 'area-chart-normalized' ||
            this.chartType === 'area-chart-stacked';
        if (this.chartType === 'bubble-chart') {
            this.xAxisLabel = 'GDP Per Capita';
            this.yAxisLabel = 'Life expectancy [years]';
        }
        else {
            this.yAxisLabel = 'GDP Per Capita';
            this.xAxisLabel = 'Country';
        }
        for (var _i = 0, _a = this.chartGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.charts; _b < _c.length; _b++) {
                var chart = _c[_b];
                if (chart.selector === chartSelector) {
                    this.chart = chart;
                    return;
                }
            }
        }
    };
    ParentChartComponent.prototype.select = function (data) {
        console.log('Item clicked', data);
    };
    ParentChartComponent.prototype.setInterpolationType = function (curveType) {
        this.curveType = curveType;
        if (curveType === 'Basis') {
            this.curve = shape.curveBasis;
        }
        if (curveType === 'Bundle') {
            this.curve = shape.curveBundle.beta(1);
        }
        if (curveType === 'Cardinal') {
            this.curve = shape.curveCardinal;
        }
        if (curveType === 'Catmull Rom') {
            this.curve = shape.curveCatmullRom;
        }
        if (curveType === 'Linear') {
            this.curve = shape.curveLinear;
        }
        if (curveType === 'Monotone X') {
            this.curve = shape.curveMonotoneX;
        }
        if (curveType === 'Monotone Y') {
            this.curve = shape.curveMonotoneY;
        }
        if (curveType === 'Natural') {
            this.curve = shape.curveNatural;
        }
        if (curveType === 'Step') {
            this.curve = shape.curveStep;
        }
        if (curveType === 'Step After') {
            this.curve = shape.curveStepAfter;
        }
        if (curveType === 'Step Before') {
            this.curve = shape.curveStepBefore;
        }
    };
    ParentChartComponent.prototype.setColorScheme = function (name) {
        this.selectedColorScheme = name;
        this.colorScheme = this.colorSets.find(function (s) { return s.name === name; });
    };
    ParentChartComponent.prototype.onLegendLabelClick = function (entry) {
        console.log('Legend clicked', entry);
    };
    return ParentChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ParentChartComponent.prototype, "viewCrumb", void 0);
ParentChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ngx-app',
        encapsulation: core_1.ViewEncapsulation.None,
        styleUrls: ['./parentChart.css'],
        templateUrl: './ngx.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ParentChartComponent);
exports.ParentChartComponent = ParentChartComponent;
//# sourceMappingURL=parentChart.component.js.map