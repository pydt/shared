/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-bitwise */
/* global window module */
/**
 * @license countdown.js v2.6.1 http://countdownjs.org
 * Copyright (c)2006-2014 Stephen M. McKamey.
 * Licensed under The MIT License.
 */
/* jshint bitwise:false */

/**
 * API entry
 * @public
 * @param {function(Object)|Date|number} start the starting date
 * @param {function(Object)|Date|number} end the ending date
 * @param {number} units the units to populate
 * @returns {Object|number}
 */
export default (

  function() {
    /* jshint smarttabs:true */


    /**
     * @private
     * @constant
     * @type {number}
     */
    const MILLISECONDS	= 0x001;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const SECONDS			= 0x002;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MINUTES			= 0x004;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const HOURS			= 0x008;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const DAYS			= 0x010;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const WEEKS			= 0x020;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MONTHS			= 0x040;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const YEARS			= 0x080;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const DECADES			= 0x100;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const CENTURIES		= 0x200;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MILLENNIA		= 0x400;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const DEFAULTS		= YEARS | MONTHS | DAYS | HOURS | MINUTES | SECONDS;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MILLISECONDS_PER_SECOND = 1000;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const SECONDS_PER_MINUTE = 60;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MINUTES_PER_HOUR = 60;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const HOURS_PER_DAY = 24;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MILLISECONDS_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const DAYS_PER_WEEK = 7;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const MONTHS_PER_YEAR = 12;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const YEARS_PER_DECADE = 10;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const DECADES_PER_CENTURY = 10;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const CENTURIES_PER_MILLENNIUM = 10;

    /**
     * @private
     * @param {number} x number
     * @returns {number}
     */
    const ceil = Math.ceil;

    /**
     * @private
     * @param {number} x number
     * @returns {number}
     */
    const floor = Math.floor;

    /**
     * @private
     * @param ref reference date
     * @param shift number of months to shift
     * @returns number of days shifted
     */
    function borrowMonths(ref, shift) {
      const prevTime = ref.getTime();

      // increment month by shift
      ref.setMonth(ref.getMonth() + shift);

      // this is the trickiest since months vary in length
      return Math.round((ref.getTime() - prevTime) / MILLISECONDS_PER_DAY);
    }

    /**
     * @private
     * @param ref reference date
     * @returns number of days
     */
    function daysPerMonth(ref) {
      const a = ref.getTime();

      // increment month by 1
      const b = new Date(a);

      b.setMonth(ref.getMonth() + 1);

      // this is the trickiest since months vary in length
      return Math.round((b.getTime() - a) / MILLISECONDS_PER_DAY);
    }

    /**
     * @private
     * @param ref reference date
     * @returns number of days
     */
    function daysPerYear(ref) {
      const a = ref.getTime();

      // increment year by 1
      const b = new Date(a);

      b.setFullYear(ref.getFullYear() + 1);

      // this is the trickiest since years (periodically) vary in length
      return Math.round((b.getTime() - a) / MILLISECONDS_PER_DAY);
    }

    /**
     * Applies the Timespan to the given date.
     * @private
     * @param ts
     * @param date
     * @returns
     */
    function addToDate(ts, date) {
      date = (date instanceof Date) || ((date !== null) && isFinite(date)) ? new Date(+date) : new Date();
      if (!ts) {
        return date;
      }

      // if there is a value field, use it directly
      let value = +ts.value || 0;

      if (value) {
        date.setTime(date.getTime() + value);
        return date;
      }

      value = +ts.milliseconds || 0;
      if (value) {
        date.setMilliseconds(date.getMilliseconds() + value);
      }

      value = +ts.seconds || 0;
      if (value) {
        date.setSeconds(date.getSeconds() + value);
      }

      value = +ts.minutes || 0;
      if (value) {
        date.setMinutes(date.getMinutes() + value);
      }

      value = +ts.hours || 0;
      if (value) {
        date.setHours(date.getHours() + value);
      }

      value = +ts.weeks || 0;
      if (value) {
        value *= DAYS_PER_WEEK;
      }

      value += +ts.days || 0;
      if (value) {
        date.setDate(date.getDate() + value);
      }

      value = +ts.months || 0;
      if (value) {
        date.setMonth(date.getMonth() + value);
      }

      value = +ts.millennia || 0;
      if (value) {
        value *= CENTURIES_PER_MILLENNIUM;
      }

      value += +ts.centuries || 0;
      if (value) {
        value *= DECADES_PER_CENTURY;
      }

      value += +ts.decades || 0;
      if (value) {
        value *= YEARS_PER_DECADE;
      }

      value += +ts.years || 0;
      if (value) {
        date.setFullYear(date.getFullYear() + value);
      }

      return date;
    }

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_MILLISECONDS	= 0;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_SECONDS		= 1;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_MINUTES		= 2;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_HOURS			= 3;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_DAYS			= 4;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_WEEKS			= 5;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_MONTHS		= 6;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_YEARS			= 7;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_DECADES		= 8;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_CENTURIES		= 9;

    /**
     * @private
     * @constant
     * @type {number}
     */
    const LABEL_MILLENNIA		= 10;

    /**
     * @private
     * @type {Array}
     */
    let LABELS_SINGLUAR;

    /**
     * @private
     * @type {Array}
     */
    let LABELS_PLURAL;

    /**
     * @private
     * @type {string}
     */
    let LABEL_LAST;

    /**
     * @private
     * @type {string}
     */
    let LABEL_DELIM;

    /**
     * @private
     * @type {string}
     */
    let LABEL_NOW;

    /**
     * Formats a number & unit as a string
     * @param {number} value
     * @param {number} unit
     * @returns {string}
     */
    let formatter;

    /**
     * Formats a number as a string
     * @private
     * @param {number} value
     * @returns {string}
     */
    let formatNumber;

    /**
     * @private
     * @param value
     * @param unit unit index into label list
     * @returns
     */
    function plurality(value, unit) {
      return formatNumber(value) + ((value === 1) ? LABELS_SINGLUAR[unit] : LABELS_PLURAL[unit]);
    }

    /**
     * Timespan representation of a duration of time
     * @private
     * @this {Timespan}
     * @constructor
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function Timespan() {}

    /**
     * Formats the Timespan as a sentence
     * @param emptyLabel the string to use when no values returned
     * @returns
     */
    Timespan.prototype.toString = function(emptyLabel) {
      const label = formatList(this);

      const count = label.length;

      if (!count) {
        return emptyLabel ? `${emptyLabel}` : LABEL_NOW;
      }
      if (count === 1) {
        return label[0];
      }

      const last = LABEL_LAST + label.pop();

      return label.join(LABEL_DELIM) + last;
    };

    /**
     * Formats the Timespan as a sentence in HTML
     * @param tag HTML tag name to wrap each value
     * @param emptyLabel the string to use when no values returned
     * @returns
     */
    Timespan.prototype.toHTML = function(tag, emptyLabel) {
      tag = tag || "span";
      const label = formatList(this);

      const count = label.length;

      if (!count) {
        emptyLabel = emptyLabel || LABEL_NOW;
        return emptyLabel ? `<${tag}>${emptyLabel}</${tag}>` : emptyLabel;
      }
      for (let i = 0; i < count; i++) {
        // wrap each unit in tag
        label[i] = `<${tag}>${label[i]}</${tag}>`;
      }
      if (count === 1) {
        return label[0];
      }

      const last = LABEL_LAST + label.pop();

      return label.join(LABEL_DELIM) + last;
    };

    /**
     * Applies the Timespan to the given date
     * @param date the date to which the timespan is added.
     * @returns
     */
    Timespan.prototype.addTo = function(date) {
      return addToDate(this, date);
    };

    /**
     * Formats the entries as English labels
     * @private
     * @param ts
     * @returns
     */
    const formatList = function(ts) {
      const list: string[] = [];

      let value = ts.millennia;

      if (value) {
        list.push(formatter(value, LABEL_MILLENNIA));
      }

      value = ts.centuries;
      if (value) {
        list.push(formatter(value, LABEL_CENTURIES));
      }

      value = ts.decades;
      if (value) {
        list.push(formatter(value, LABEL_DECADES));
      }

      value = ts.years;
      if (value) {
        list.push(formatter(value, LABEL_YEARS));
      }

      value = ts.months;
      if (value) {
        list.push(formatter(value, LABEL_MONTHS));
      }

      value = ts.weeks;
      if (value) {
        list.push(formatter(value, LABEL_WEEKS));
      }

      value = ts.days;
      if (value) {
        list.push(formatter(value, LABEL_DAYS));
      }

      value = ts.hours;
      if (value) {
        list.push(formatter(value, LABEL_HOURS));
      }

      value = ts.minutes;
      if (value) {
        list.push(formatter(value, LABEL_MINUTES));
      }

      value = ts.seconds;
      if (value) {
        list.push(formatter(value, LABEL_SECONDS));
      }

      value = ts.milliseconds;
      if (value) {
        list.push(formatter(value, LABEL_MILLISECONDS));
      }

      return list;
    };

    /**
     * Borrow any underflow units, carry any overflow units
     * @private
     * @param ts
     * @param toUnit
     */
    function rippleRounded(ts, toUnit) {
      switch (toUnit) {
        case "seconds":
          if (ts.seconds !== SECONDS_PER_MINUTE || isNaN(ts.minutes)) {
            return;
          }
          // ripple seconds up to minutes
          ts.minutes++;
          ts.seconds = 0;

          /* falls through */
        case "minutes":
          if (ts.minutes !== MINUTES_PER_HOUR || isNaN(ts.hours)) {
            return;
          }
          // ripple minutes up to hours
          ts.hours++;
          ts.minutes = 0;

          /* falls through */
        case "hours":
          if (ts.hours !== HOURS_PER_DAY || isNaN(ts.days)) {
            return;
          }
          // ripple hours up to days
          ts.days++;
          ts.hours = 0;

          /* falls through */
        case "days":
          if (ts.days !== DAYS_PER_WEEK || isNaN(ts.weeks)) {
            return;
          }
          // ripple days up to weeks
          ts.weeks++;
          ts.days = 0;

          /* falls through */
        case "weeks":
          if (ts.weeks !== daysPerMonth(ts.refMonth) / DAYS_PER_WEEK || isNaN(ts.months)) {
            return;
          }
          // ripple weeks up to months
          ts.months++;
          ts.weeks = 0;

          /* falls through */
        case "months":
          if (ts.months !== MONTHS_PER_YEAR || isNaN(ts.years)) {
            return;
          }
          // ripple months up to years
          ts.years++;
          ts.months = 0;

          /* falls through */
        case "years":
          if (ts.years !== YEARS_PER_DECADE || isNaN(ts.decades)) {
            return;
          }
          // ripple years up to decades
          ts.decades++;
          ts.years = 0;

          /* falls through */
        case "decades":
          if (ts.decades !== DECADES_PER_CENTURY || isNaN(ts.centuries)) {
            return;
          }
          // ripple decades up to centuries
          ts.centuries++;
          ts.decades = 0;

          /* falls through */
        case "centuries":
          if (ts.centuries !== CENTURIES_PER_MILLENNIUM || isNaN(ts.millennia)) {
            return;
          }
          // ripple centuries up to millennia
          ts.millennia++;
          ts.centuries = 0;
          /* falls through */
      }
    }

    /**
     * Ripple up partial units one place
     * @private
     * @param ts timespan
     * @param frac accumulated fractional value
     * @param fromUnit source unit name
     * @param toUnit target unit name
     * @param conversion multiplier between units
     * @param digits max number of decimal digits to output
     * @returns new fractional value
     */
    function fraction(ts, frac, fromUnit, toUnit, conversion, digits) {
      if (ts[fromUnit] >= 0) {
        frac += ts[fromUnit];
        delete ts[fromUnit];
      }

      frac /= conversion;
      if (frac + 1 <= 1) {
        // drop if below machine epsilon
        return 0;
      }

      if (ts[toUnit] >= 0) {
        // ensure does not have more than specified number of digits
        ts[toUnit] = +(ts[toUnit] + frac).toFixed(digits);
        rippleRounded(ts, toUnit);
        return 0;
      }

      return frac;
    }

    /**
     * Ripple up partial units to next existing
     * @private
     * @param ts
     * @param digits max number of decimal digits to output
     */
    function fractional(ts, digits) {
      let frac = fraction(ts, 0, "milliseconds", "seconds", MILLISECONDS_PER_SECOND, digits);

      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "seconds", "minutes", SECONDS_PER_MINUTE, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "minutes", "hours", MINUTES_PER_HOUR, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "hours", "days", HOURS_PER_DAY, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "days", "weeks", DAYS_PER_WEEK, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "weeks", "months", daysPerMonth(ts.refMonth) / DAYS_PER_WEEK, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "months", "years", daysPerYear(ts.refMonth) / daysPerMonth(ts.refMonth), digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "years", "decades", YEARS_PER_DECADE, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "decades", "centuries", DECADES_PER_CENTURY, digits);
      if (!frac) {
        return;
      }

      frac = fraction(ts, frac, "centuries", "millennia", CENTURIES_PER_MILLENNIUM, digits);

      // should never reach this with remaining fractional value
      if (frac) {
        throw new Error("Fractional unit overflow");
      }
    }

    /**
     * Borrow any underflow units, carry any overflow units
     * @private
     * @param ts
     */
    function ripple(ts) {
      let x;

      if (ts.milliseconds < 0) {
        // ripple seconds down to milliseconds
        x = ceil(-ts.milliseconds / MILLISECONDS_PER_SECOND);
        ts.seconds -= x;
        ts.milliseconds += x * MILLISECONDS_PER_SECOND;

      } else if (ts.milliseconds >= MILLISECONDS_PER_SECOND) {
        // ripple milliseconds up to seconds
        ts.seconds += floor(ts.milliseconds / MILLISECONDS_PER_SECOND);
        ts.milliseconds %= MILLISECONDS_PER_SECOND;
      }

      if (ts.seconds < 0) {
        // ripple minutes down to seconds
        x = ceil(-ts.seconds / SECONDS_PER_MINUTE);
        ts.minutes -= x;
        ts.seconds += x * SECONDS_PER_MINUTE;

      } else if (ts.seconds >= SECONDS_PER_MINUTE) {
        // ripple seconds up to minutes
        ts.minutes += floor(ts.seconds / SECONDS_PER_MINUTE);
        ts.seconds %= SECONDS_PER_MINUTE;
      }

      if (ts.minutes < 0) {
        // ripple hours down to minutes
        x = ceil(-ts.minutes / MINUTES_PER_HOUR);
        ts.hours -= x;
        ts.minutes += x * MINUTES_PER_HOUR;

      } else if (ts.minutes >= MINUTES_PER_HOUR) {
        // ripple minutes up to hours
        ts.hours += floor(ts.minutes / MINUTES_PER_HOUR);
        ts.minutes %= MINUTES_PER_HOUR;
      }

      if (ts.hours < 0) {
        // ripple days down to hours
        x = ceil(-ts.hours / HOURS_PER_DAY);
        ts.days -= x;
        ts.hours += x * HOURS_PER_DAY;

      } else if (ts.hours >= HOURS_PER_DAY) {
        // ripple hours up to days
        ts.days += floor(ts.hours / HOURS_PER_DAY);
        ts.hours %= HOURS_PER_DAY;
      }

      while (ts.days < 0) {
        // NOTE: never actually seen this loop more than once

        // ripple months down to days
        ts.months--;
        ts.days += borrowMonths(ts.refMonth, 1);
      }

      // weeks is always zero here

      if (ts.days >= DAYS_PER_WEEK) {
        // ripple days up to weeks
        ts.weeks += floor(ts.days / DAYS_PER_WEEK);
        ts.days %= DAYS_PER_WEEK;
      }

      if (ts.months < 0) {
        // ripple years down to months
        x = ceil(-ts.months / MONTHS_PER_YEAR);
        ts.years -= x;
        ts.months += x * MONTHS_PER_YEAR;

      } else if (ts.months >= MONTHS_PER_YEAR) {
        // ripple months up to years
        ts.years += floor(ts.months / MONTHS_PER_YEAR);
        ts.months %= MONTHS_PER_YEAR;
      }

      // years is always non-negative here
      // decades, centuries and millennia are always zero here

      if (ts.years >= YEARS_PER_DECADE) {
        // ripple years up to decades
        ts.decades += floor(ts.years / YEARS_PER_DECADE);
        ts.years %= YEARS_PER_DECADE;

        if (ts.decades >= DECADES_PER_CENTURY) {
          // ripple decades up to centuries
          ts.centuries += floor(ts.decades / DECADES_PER_CENTURY);
          ts.decades %= DECADES_PER_CENTURY;

          if (ts.centuries >= CENTURIES_PER_MILLENNIUM) {
            // ripple centuries up to millennia
            ts.millennia += floor(ts.centuries / CENTURIES_PER_MILLENNIUM);
            ts.centuries %= CENTURIES_PER_MILLENNIUM;
          }
        }
      }
    }

    /**
     * Remove any units not requested
     * @private
     * @param ts
     * @param units the units to populate
     * @param max number of labels to output
     * @param digits max number of decimal digits to output
     */
    function pruneUnits(ts, units, max, digits) {
      let count = 0;

      // Calc from largest unit to smallest to prevent underflow
      if (!(units & MILLENNIA) || (count >= max)) {
        // ripple millennia down to centuries
        ts.centuries += ts.millennia * CENTURIES_PER_MILLENNIUM;
        delete ts.millennia;

      } else if (ts.millennia) {
        count++;
      }

      if (!(units & CENTURIES) || (count >= max)) {
        // ripple centuries down to decades
        ts.decades += ts.centuries * DECADES_PER_CENTURY;
        delete ts.centuries;

      } else if (ts.centuries) {
        count++;
      }

      if (!(units & DECADES) || (count >= max)) {
        // ripple decades down to years
        ts.years += ts.decades * YEARS_PER_DECADE;
        delete ts.decades;

      } else if (ts.decades) {
        count++;
      }

      if (!(units & YEARS) || (count >= max)) {
        // ripple years down to months
        ts.months += ts.years * MONTHS_PER_YEAR;
        delete ts.years;

      } else if (ts.years) {
        count++;
      }

      if (!(units & MONTHS) || (count >= max)) {
        // ripple months down to days
        if (ts.months) {
          ts.days += borrowMonths(ts.refMonth, ts.months);
        }
        delete ts.months;

        if (ts.days >= DAYS_PER_WEEK) {
          // ripple day overflow back up to weeks
          ts.weeks += floor(ts.days / DAYS_PER_WEEK);
          ts.days %= DAYS_PER_WEEK;
        }

      } else if (ts.months) {
        count++;
      }

      if (!(units & WEEKS) || (count >= max)) {
        // ripple weeks down to days
        ts.days += ts.weeks * DAYS_PER_WEEK;
        delete ts.weeks;

      } else if (ts.weeks) {
        count++;
      }

      if (!(units & DAYS) || (count >= max)) {
        // ripple days down to hours
        ts.hours += ts.days * HOURS_PER_DAY;
        delete ts.days;

      } else if (ts.days) {
        count++;
      }

      if (!(units & HOURS) || (count >= max)) {
        // ripple hours down to minutes
        ts.minutes += ts.hours * MINUTES_PER_HOUR;
        delete ts.hours;

      } else if (ts.hours) {
        count++;
      }

      if (!(units & MINUTES) || (count >= max)) {
        // ripple minutes down to seconds
        ts.seconds += ts.minutes * SECONDS_PER_MINUTE;
        delete ts.minutes;

      } else if (ts.minutes) {
        count++;
      }

      if (!(units & SECONDS) || (count >= max)) {
        // ripple seconds down to milliseconds
        ts.milliseconds += ts.seconds * MILLISECONDS_PER_SECOND;
        delete ts.seconds;

      } else if (ts.seconds) {
        count++;
      }

      // nothing to ripple milliseconds down to
      // so ripple back up to smallest existing unit as a fractional value
      if (!(units & MILLISECONDS) || (count >= max)) {
        fractional(ts, digits);
      }
    }

    /**
     * Populates the Timespan object
     * @private
     * @param ts
     * @param start the starting date
     * @param end the ending date
     * @param units the units to populate
     * @param max number of labels to output
     * @param digits max number of decimal digits to output
     */
    function populate(ts, start, end, units, max, digits) {
      const now = new Date();

      ts.start = start = start || now;
      ts.end = end = end || now;
      ts.units = units;

      ts.value = end.getTime() - start.getTime();
      if (ts.value < 0) {
        // swap if reversed
        const tmp = end;

        end = start;
        start = tmp;
      }

      // reference month for determining days in month
      ts.refMonth = new Date(start.getFullYear(), start.getMonth(), 15, 12, 0, 0);
      try {
        // reset to initial deltas
        ts.millennia = 0;
        ts.centuries = 0;
        ts.decades = 0;
        ts.years = end.getFullYear() - start.getFullYear();
        ts.months = end.getMonth() - start.getMonth();
        ts.weeks = 0;
        ts.days = end.getDate() - start.getDate();
        ts.hours = end.getHours() - start.getHours();
        ts.minutes = end.getMinutes() - start.getMinutes();
        ts.seconds = end.getSeconds() - start.getSeconds();
        ts.milliseconds = end.getMilliseconds() - start.getMilliseconds();

        ripple(ts);
        pruneUnits(ts, units, max, digits);

      } finally {
        delete ts.refMonth;
      }

      return ts;
    }

    /**
     * Determine an appropriate refresh rate based upon units
     * @private
     * @param units the units to populate
     * @returns milliseconds to delay
     */
    function getDelay(units) {
      if (units & MILLISECONDS) {
        // refresh very quickly
        return MILLISECONDS_PER_SECOND / 30; // 30Hz
      }

      if (units & SECONDS) {
        // refresh every second
        return MILLISECONDS_PER_SECOND; // 1Hz
      }

      if (units & MINUTES) {
        // refresh every minute
        return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
      }

      if (units & HOURS) {
        // refresh hourly
        return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
      }

      if (units & DAYS) {
        // refresh daily
        return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;
      }

      // refresh the rest weekly
      return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK;
    }

    /**
     * API entry point
     * @public
     * @param start the starting date
     * @param end the ending date
     * @param units the units to populate
     * @param max number of labels to output
     * @param digits max number of decimal digits to output
     * @returns
     */
    function countdown(start, end, units, max, digits) {
      let callback;

      // ensure some units or use defaults
      units = +units || DEFAULTS;
      // max must be positive
      max = (max > 0) ? max : NaN;
      // clamp digits to an integer between [0, 20]
      digits = (digits > 0) ? (digits < 20) ? Math.round(digits) : 20 : 0;

      // ensure start date
      let startTS = null;

      if (typeof start === "function") {
        callback = start;
        start = null;

      } else if (!(start instanceof Date)) {
        if ((start !== null) && isFinite(start)) {
          start = new Date(+start);
        } else {
          if (typeof startTS === "object") {
            startTS = /** @type{Timespan} */(start);
          }
          start = null;
        }
      }

      // ensure end date
      let endTS = null;

      if (typeof end === "function") {
        callback = end;
        end = null;

      } else if (!(end instanceof Date)) {
        if ((end !== null) && isFinite(end)) {
          end = new Date(+end);
        } else {
          if (typeof end === "object") {
            endTS = /** @type{Timespan} */(end);
          }
          end = null;
        }
      }

      // must wait to interpret timespans until after resolving dates
      if (startTS) {
        start = addToDate(startTS, end);
      }
      if (endTS) {
        end = addToDate(endTS, start);
      }

      if (!start && !end) {
        // used for unit testing
        return new Timespan();
      }

      if (!callback) {
        // eslint-disable-next-line max-len
        return populate(new Timespan(), /** @type{Date} */(start), /** @type{Date} */(end), /** @type{number} */(units), /** @type{number} */(max), /** @type{number} */(digits));
      }

      // base delay off units
      const delay = getDelay(units);
      let timerId;
      const fn = function() {
        callback(
          // eslint-disable-next-line max-len
          populate(new Timespan(), /** @type{Date} */(start), /** @type{Date} */(end), /** @type{number} */(units), /** @type{number} */(max), /** @type{number} */(digits)),
          timerId,
        );
      };

      fn();
      return (timerId = setInterval(fn, delay));
    }

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.MILLISECONDS = MILLISECONDS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.SECONDS = SECONDS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.MINUTES = MINUTES;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.HOURS = HOURS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.DAYS = DAYS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.WEEKS = WEEKS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.MONTHS = MONTHS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.YEARS = YEARS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.DECADES = DECADES;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.CENTURIES = CENTURIES;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.MILLENNIA = MILLENNIA;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.DEFAULTS = DEFAULTS;

    /**
     * @public
     * @constant
     * @type {number}
     */
    countdown.ALL = MILLENNIA | CENTURIES | DECADES | YEARS | MONTHS | WEEKS | DAYS | HOURS | MINUTES | SECONDS | MILLISECONDS;

    /**
     * Customize the format settings.
     * @public
     * @param format settings object
     */
    const setFormat = countdown.setFormat = function(format) {
      if (!format) {
        return;
      }

      if ("singular" in format || "plural" in format) {
        let singular = format.singular || [];

        if (singular.split) {
          singular = singular.split("|");
        }
        let plural = format.plural || [];

        if (plural.split) {
          plural = plural.split("|");
        }

        for (let i = LABEL_MILLISECONDS; i <= LABEL_MILLENNIA; i++) {
          // override any specified units
          LABELS_SINGLUAR[i] = singular[i] || LABELS_SINGLUAR[i];
          LABELS_PLURAL[i] = plural[i] || LABELS_PLURAL[i];
        }
      }

      if (typeof format.last === "string") {
        LABEL_LAST = format.last;
      }
      if (typeof format.delim === "string") {
        LABEL_DELIM = format.delim;
      }
      if (typeof format.empty === "string") {
        LABEL_NOW = format.empty;
      }
      if (typeof format.formatNumber === "function") {
        formatNumber = format.formatNumber;
      }
      if (typeof format.formatter === "function") {
        formatter = format.formatter;
      }
    };

    /**
     * Revert to the default formatting.
     * @public
     */
    const resetFormat = countdown.resetFormat = function() {
      LABELS_SINGLUAR = " millisecond| second| minute| hour| day| week| month| year| decade| century| millennium".split("|");
      LABELS_PLURAL = " milliseconds| seconds| minutes| hours| days| weeks| months| years| decades| centuries| millennia".split("|");
      LABEL_LAST = " and ";
      LABEL_DELIM = ", ";
      LABEL_NOW = "";
      formatNumber = function(value) {
        return value;
      };
      formatter = plurality;
    };

    /**
     * Override the unit labels.
     * @public
     * @param singular a pipe ('|') delimited list of singular unit name overrides
     * @param plural a pipe ('|') delimited list of plural unit name overrides
     * @param last a delimiter before the last unit (default: ' and ')
     * @param delim a delimiter to use between all other units (default: ', ')
     * @param empty a label to use when all units are zero (default: '')
     * @param formatNumber a function which formats numbers as a string
     * @param formatNumber2
     * @param formatter2
     * @param formatter a function which formats a number/unit pair as a string
     * @deprecated since version 2.6.0
     */
    countdown.setLabels = function(singular, plural, last, delim, empty, formatNumber2, formatter2) {
      setFormat({
        singular,
        plural,
        last,
        delim,
        empty,
        formatNumber2,
        formatter2,
      });
    };

    /**
     * Revert to the default unit labels.
     * @public
     * @deprecated since version 2.6.0
     */
    countdown.resetLabels = resetFormat;

    resetFormat();

    return countdown;

  }());
