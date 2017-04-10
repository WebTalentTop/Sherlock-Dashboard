"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var d3_scale_1 = require("d3-scale");
var view_dimensions_helper_1 = require("../common/view-dimensions.helper");
var color_helper_1 = require("../common/color.helper");
var base_chart_component_1 = require("../common/base-chart.component");
var BarVerticalComponent = (function (_super) {
    __extends(BarVerticalComponent, _super);
    function BarVerticalComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.activate = new core_1.EventEmitter();
        _this.deactivate = new core_1.EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarVerticalComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarVerticalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        var spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
        return d3_scale_1.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVerticalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        var scale = d3_scale_1.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalComponent.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVerticalComponent.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarVerticalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarVerticalComponent;
}(base_chart_component_1.BaseChartComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "legend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "showGridLines", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BarVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BarVerticalComponent.prototype, "schemeType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "barPadding", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "roundDomains", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BarVerticalComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BarVerticalComponent.prototype, "deactivate", void 0);
BarVerticalComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-bar-vertical',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-vertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [activeEntries]=\"activeEntries\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (select)=\"onClick($event)\">\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styleUrls: ['../common/base-chart.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None
    })
], BarVerticalComponent);
exports.BarVerticalComponent = BarVerticalComponent;
//# sourceMappingURL=bar-vertical.component.js.map