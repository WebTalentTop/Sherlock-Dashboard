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
var trim_label_helper_1 = require("../trim-label.helper");
var label_helper_1 = require("../label.helper");
var AdvancedLegendComponent = (function () {
    function AdvancedLegendComponent() {
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.legendItems = [];
        this.totalLabel = 'total';
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d, index) {
            var label = label_helper_1.formatLabel(d.name);
            var value = d.value;
            var percentage = value / _this.total * 100;
            var color = _this.colors.getColor(label);
            return {
                value: value,
                color: color,
                label: trim_label_helper_1.trimLabel(label, 20),
                originalLabel: d.name,
                percentage: percentage
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    return AdvancedLegendComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], AdvancedLegendComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "colors", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AdvancedLegendComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AdvancedLegendComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AdvancedLegendComponent.prototype, "deactivate", void 0);
AdvancedLegendComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-advanced-legend',
        template: "\n    <div class=\"advanced-pie-legend\"\n      [style.width.px]=\"width\">\n      <div\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\">\n      </div>\n      <div class=\"total-label\">\n        {{totalLabel}}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy:trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div\n              class=\"item-color\"\n              [style.background]=\"legendItem.color\">\n            </div>\n            <div\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.value\">\n            </div>\n            <div class=\"item-label\">{{legendItem.label}}</div>\n            <div\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        styleUrls: ['./advanced-legend.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], AdvancedLegendComponent);
exports.AdvancedLegendComponent = AdvancedLegendComponent;
//# sourceMappingURL=advanced-legend.component.js.map