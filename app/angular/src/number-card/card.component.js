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
var trim_label_helper_1 = require("../common/trim-label.helper");
var shape_helper_1 = require("../common/shape.helper");
var count_1 = require("../common/count");
var CardComponent = (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.select = new core_1.EventEmitter();
        this.value = '';
        this.resizeScale = 1;
        this.textFontSize = 35;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 10, 20];
        this.labelFontSize = 12;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.data ? _this.data.name : '';
            _this.trimmedLabel = trim_label_helper_1.trimLabel(_this.label, 55);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = _this.value = hasValue ? _this.data.value.toLocaleString() : '';
            if (_this.medianSize && _this.medianSize > value.length) {
                _this.value = _this.value + '\u2007'.repeat(_this.medianSize - value.length);
            }
            var textHeight = _this.textFontSize + 2 * _this.labelFontSize;
            _this.textPadding[0] = _this.textPadding[2] = (_this.cardHeight - textHeight - _this.bandHeight) / 2;
            _this.bandPath = shape_helper_1.roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, false, false, true, true);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                setTimeout(function () { return _this.startCount(); }, 20);
            }, 0);
        });
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized) {
            cancelAnimationFrame(this.animationReq);
            var val = this.data.value;
            var decs = count_1.decimalChecker(val);
            var callback = function (_a) {
                var value = _a.value;
                _this.zone.run(function () {
                    _this.value = value.toLocaleString();
                    if (_this.medianSize && _this.medianSize > value.length) {
                        _this.value = _this.value + '\u2007'.repeat(_this.medianSize - value.length);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count_1.count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            _this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8;
            var availableWidth = _this.cardWidth - _this.textPadding[1] - _this.textPadding[3];
            var availableHeight = _this.cardHeight / 3;
            if (!_this.originalWidthRatio) {
                _this.originalWidthRatio = availableWidth / width;
                _this.originalWidth = availableWidth;
            }
            if (!_this.originalHeightRatio) {
                _this.originalHeightRatio = availableHeight / height;
                _this.originalHeight = availableHeight;
            }
            var newWidthRatio = (availableWidth / _this.originalWidth) * _this.originalWidthRatio;
            var newHeightRatio = (availableHeight / _this.originalHeight) * _this.originalHeightRatio;
            _this.resizeScale = Math.min(newWidthRatio, newHeightRatio);
            _this.textFontSize = Number.parseInt((35 * _this.resizeScale).toString());
            _this.labelFontSize = Math.min(_this.textFontSize, 12);
            var textHeight = _this.textFontSize + 2 * _this.labelFontSize;
            _this.textPadding[0] = _this.textPadding[2] = (_this.cardHeight - textHeight - _this.bandHeight) / 2;
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    return CardComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "bandColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "textColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "x", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "y", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CardComponent.prototype, "medianSize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CardComponent.prototype, "select", void 0);
__decorate([
    core_1.ViewChild('textEl'),
    __metadata("design:type", core_1.ElementRef)
], CardComponent.prototype, "textEl", void 0);
CardComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-card]',
        template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0] + textFontSize + labelFontSize\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\">\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\">\n          {{trimmedLabel}}\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, core_1.NgZone])
], CardComponent);
exports.CardComponent = CardComponent;
//# sourceMappingURL=card.component.js.map