import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { cardResult, external_balance, internal_product, single, multi, countries, bubble, generateData, generateGraph } from './data';
import chartGroups from './chartTypes';
import { Http, Response } from '@angular/http';
@Component({
  moduleId: module.id,
  selector: 'ngx-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./parentChart.css'],
  templateUrl: './ngx.component.html'
})
export class ParentChartComponent implements OnInit {

  version = "4.3.0";
  @Input() viewCrumb:any;
  colorSets = [
      {
          name: 'cool',
          selectable: true,
          group: 'Ordinal',
          domain: [
              '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
          ]
      },   
  ];
  theme = 'dark';
  chartType = 'bar-vertical';
  chartGroups: any[];
  chart: any;
  realTimeData: boolean = true;
  countries: any[];
  single: any[];
  multi: any[];
  dateData: any[];
  dateDataWithRange: any[];
  graph: { links: any[], nodes: any[] };
  bubble: any;
  linearScale: boolean = false;
  range: boolean = false;

  view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = true;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  innerPadding = 8;
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;

  // line interpolation
  curveType: string = 'Linear';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Basis', 'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ];


  colorScheme: any;
  cardScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;

  // line, area
  autoScale = true;
  timeline = false;

  // margin
  margin: boolean = false;
  marginTop: number = 40;
  marginRight: number = 40;
  marginBottom: number = 40;
  marginLeft: number = 40;

  // gauge
  gaugeMin: number = 0;
  gaugeMax: number = 100;
  gaugeLargeSegments: number = 10;
  gaugeSmallSegments: number = 5;
  gaugeTextValue: string = '';
  gaugeUnits: string = 'alerts';
  gaugeAngleSpan: number = 240;
  gaugeStartAngle: number = -120;
  gaugeShowAxis: boolean = true;
  gaugeValue: number = 50; // linear gauge value
  gaugePreviousValue: number = 70;

  card1={
         name: 'card1',
         selectable: false,
         group: 'Ordinal',
         domain: [
         '#00a79a', '#94bfff', '#fdbf1d'
         ]};
  heatmap_color={
         name: 'heatmap1',
         selectable: true,
         group: 'Ordinal',
         domain: [
              '#657dab', '#677dac','#687eac', '#6c7ead', '#8c837a', '#9184ab', '#ac88ac', '#e99eb0', '#febfa5', '#ac88ac'  
         ]}; 
  constructor(private http: Http) {
    Object.assign(this, {
      cardResult,
      external_balance,
      internal_product,
      single,
      multi,
      countries,
      chartGroups,
      graph: generateGraph(50),
      bubble
    });
    this.dateData = generateData(5, false);
    this.dateDataWithRange = generateData(2, true);
    this.setColorScheme('cool');
    
  }
  
  handleError (error: any) {
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }
  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }

  }

  ngOnInit() {
    this.selectChart(this.chartType);
    //setInterval(this.updateData.bind(this), 1000);

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  updateData() {
    if (!this.realTimeData) {
      return;
    }

    this.gaugeValue = this.gaugeMin + Math.floor(Math.random() * (this.gaugeMax - this.gaugeMin));

    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const add = Math.random() < 0.7;
    const remove = Math.random() < 0.5;

    if (remove) {
      if (this.single.length > 1) {
        const index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [...this.single];
      }

      if (this.multi.length > 1) {
        const index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [...this.multi];
      }

      if (this.bubble.length > 1) {
        const index = Math.floor(Math.random() * this.bubble.length);
        this.bubble.splice(index, 1);
        this.bubble = [...this.bubble];
      }

      if (this.graph.nodes.length > 1) {
        const index = Math.floor(Math.random() * this.graph.nodes.length);
        const value = this.graph.nodes[index].value;
        this.graph.nodes.splice(index, 1);
        const nodes = [ ...this.graph.nodes ];

        const links = this.graph.links.filter(link => {
          return link.source !== value && link.source.value !== value &&
            link.target !== value && link.target.value !== value;
        });
        this.graph = { links, nodes };
      }
    }

    if (add) {
      // single
      const entry = {
        name: country,
        value: Math.floor(10000 + Math.random() * 50000)
      };
      this.single = [...this.single, entry];

      // multi
      const multiEntry = {
        name: country,
        series: [{
          name: '2010',
          value: Math.floor(1000000 + Math.random() * 20000000)
        }, {
          name: '2011',
          value: Math.floor(1000000 + Math.random() * 20000000)
        }]
      };

      this.multi = [...this.multi, multiEntry];

      // graph
      const node = { value: country };
      const nodes = [ ...this.graph.nodes, node];
      const link = {
        source: country,
        target: nodes[Math.floor(Math.random() * (nodes.length - 1))].value,
      };
      const links = [ ...this.graph.links, link];
      this.graph = { links, nodes };

      // bubble
      const bubbleEntry = {
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

      this.bubble = [...this.bubble, bubbleEntry];
    }

    this.dateData = generateData(5, false);
    this.dateDataWithRange = generateData(2, true);
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer(event) {
    this.fitContainer = event;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector;

    this.linearScale = this.chartType === 'line-chart' ||
      this.chartType === 'line-chart-with-ranges' ||
      this.chartType === 'area-chart' ||
      this.chartType === 'area-chart-normalized' ||
      this.chartType === 'area-chart-stacked';

    if (this.chartType === 'bubble-chart') {
      this.xAxisLabel = 'GDP Per Capita';
      this.yAxisLabel = 'Life expectancy [years]';
    } else {
      this.yAxisLabel = 'GDP Per Capita';
      this.xAxisLabel = 'Country';
    }

    for (const group of this.chartGroups) {
      for (const chart of group.charts) {
        if (chart.selector === chartSelector) {
          this.chart = chart;
          return;
        }
      }
    }
  }

  select(data) {
    console.log('Item clicked', data);
  }

  setInterpolationType(curveType) {
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
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }
  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

}