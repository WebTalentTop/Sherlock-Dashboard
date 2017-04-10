"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
require("../../config/testing-utils");
var data_1 = require("../../parentChart/data");
var common_1 = require("@angular/common");
var bar_chart_module_1 = require("./bar-chart.module");
var bar_component_1 = require("./bar.component");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
var TestComponent = (function () {
    function TestComponent() {
        this.single = data_1.single;
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        selector: 'test-component',
        template: ''
    })
], TestComponent);
describe('<ngx-charts-bar-vertical>', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [bar_chart_module_1.BarChartModule],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' }
            ]
        });
    });
    describe('basic setup', function () {
        beforeEach(function () {
            testing_1.TestBed.overrideComponent(TestComponent, {
                set: {
                    template: "\n               <ngx-charts-bar-vertical\n                [view]=\"[400,800]\"\n                [scheme]=\"colorScheme\"\n                [results]=\"single\">\n              </ngx-charts-bar-vertical>"
                }
            });
        });
        it('should set the svg width and height', function (done) {
            testing_1.TestBed.compileComponents().then(function () {
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                var svg = fixture.debugElement.nativeElement.querySelector('svg');
                expect(svg.getAttribute('width')).toBe('400');
                expect(svg.getAttribute('height')).toBe('800');
                done();
            });
        });
        it('should render 12 cell elements', function (done) {
            testing_1.TestBed.compileComponents().then(function () {
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                var compiled = fixture.debugElement.nativeElement;
                expect(compiled.querySelectorAll('path.bar').length).toEqual(6);
                done();
            });
        });
        it('should render correct cell size', function (done) {
            testing_1.TestBed.compileComponents().then(function () {
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                var bar = fixture.debugElement.query(platform_browser_1.By.directive(bar_component_1.BarComponent));
                expect(bar.componentInstance.width).toEqual(53); // ~(360 - 5 * barPadding) / 6 
                done();
            });
        });
    });
    describe('padding', function () {
        it('should render correct cell size, with zero padding', function (done) {
            testing_1.TestBed.overrideComponent(TestComponent, {
                set: {
                    template: "\n               <ngx-charts-bar-vertical\n                [view]=\"[400,800]\"\n                [scheme]=\"colorScheme\"\n                [results]=\"single\"\n                [barPadding]=\"0\">\n              </ngx-charts-bar-vertical>"
                }
            });
            testing_1.TestBed.compileComponents().then(function () {
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                var bar = fixture.debugElement.query(platform_browser_1.By.directive(bar_component_1.BarComponent));
                expect(bar.componentInstance.width).toEqual(60); // ~(360 - 5 * barPadding) / 6 
                done();
            });
        });
        it('should render correct cell size, with padding', function (done) {
            testing_1.TestBed.overrideComponent(TestComponent, {
                set: {
                    template: "\n               <ngx-charts-bar-vertical\n                [view]=\"[400,800]\"\n                [scheme]=\"colorScheme\"\n                [results]=\"single\"\n                [barPadding]=\"20\">\n              </ngx-charts-bar-vertical>"
                }
            });
            testing_1.TestBed.compileComponents().then(function () {
                var fixture = testing_1.TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                var bar = fixture.debugElement.query(platform_browser_1.By.directive(bar_component_1.BarComponent));
                expect(bar.componentInstance.width).toEqual(43); // ~(360 - 5 * barPadding) / 6 
                done();
            });
        });
    });
});
//# sourceMappingURL=bar-vertical.component.spec.js.map