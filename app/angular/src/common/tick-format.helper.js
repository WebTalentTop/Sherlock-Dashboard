"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_time_format_1 = require("d3-time-format");
function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = d3_time_format_1.timeFormat('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}
exports.tickFormat = tickFormat;
//# sourceMappingURL=tick-format.helper.js.map