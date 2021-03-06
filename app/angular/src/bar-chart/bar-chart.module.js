"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var bar_component_1 = require("./bar.component");
exports.BarComponent = bar_component_1.BarComponent;
var bar_horizontal_component_1 = require("./bar-horizontal.component");
exports.BarHorizontalComponent = bar_horizontal_component_1.BarHorizontalComponent;
var bar_horizontal_2d_component_1 = require("./bar-horizontal-2d.component");
exports.BarHorizontal2DComponent = bar_horizontal_2d_component_1.BarHorizontal2DComponent;
var bar_horizontal_normalized_component_1 = require("./bar-horizontal-normalized.component");
exports.BarHorizontalNormalizedComponent = bar_horizontal_normalized_component_1.BarHorizontalNormalizedComponent;
var bar_horizontal_stacked_component_1 = require("./bar-horizontal-stacked.component");
exports.BarHorizontalStackedComponent = bar_horizontal_stacked_component_1.BarHorizontalStackedComponent;
var bar_vertical_component_1 = require("./bar-vertical.component");
exports.BarVerticalComponent = bar_vertical_component_1.BarVerticalComponent;
var bar_vertical_2d_component_1 = require("./bar-vertical-2d.component");
exports.BarVertical2DComponent = bar_vertical_2d_component_1.BarVertical2DComponent;
var bar_vertical_normalized_component_1 = require("./bar-vertical-normalized.component");
exports.BarVerticalNormalizedComponent = bar_vertical_normalized_component_1.BarVerticalNormalizedComponent;
var bar_vertical_stacked_component_1 = require("./bar-vertical-stacked.component");
exports.BarVerticalStackedComponent = bar_vertical_stacked_component_1.BarVerticalStackedComponent;
var series_horizontal_component_1 = require("./series-horizontal.component");
exports.SeriesHorizontal = series_horizontal_component_1.SeriesHorizontal;
var series_vertical_component_1 = require("./series-vertical.component");
exports.SeriesVerticalComponent = series_vertical_component_1.SeriesVerticalComponent;
var BarChartModule = (function () {
    function BarChartModule() {
    }
    return BarChartModule;
}());
BarChartModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            bar_component_1.BarComponent,
            bar_horizontal_component_1.BarHorizontalComponent,
            bar_horizontal_2d_component_1.BarHorizontal2DComponent,
            bar_horizontal_normalized_component_1.BarHorizontalNormalizedComponent,
            bar_horizontal_stacked_component_1.BarHorizontalStackedComponent,
            bar_vertical_component_1.BarVerticalComponent,
            bar_vertical_2d_component_1.BarVertical2DComponent,
            bar_vertical_normalized_component_1.BarVerticalNormalizedComponent,
            bar_vertical_stacked_component_1.BarVerticalStackedComponent,
            series_horizontal_component_1.SeriesHorizontal,
            series_vertical_component_1.SeriesVerticalComponent
        ],
        exports: [
            bar_component_1.BarComponent,
            bar_horizontal_component_1.BarHorizontalComponent,
            bar_horizontal_2d_component_1.BarHorizontal2DComponent,
            bar_horizontal_normalized_component_1.BarHorizontalNormalizedComponent,
            bar_horizontal_stacked_component_1.BarHorizontalStackedComponent,
            bar_vertical_component_1.BarVerticalComponent,
            bar_vertical_2d_component_1.BarVertical2DComponent,
            bar_vertical_normalized_component_1.BarVerticalNormalizedComponent,
            bar_vertical_stacked_component_1.BarVerticalStackedComponent,
            series_horizontal_component_1.SeriesHorizontal,
            series_vertical_component_1.SeriesVerticalComponent
        ]
    })
], BarChartModule);
exports.BarChartModule = BarChartModule;
//# sourceMappingURL=bar-chart.module.js.map