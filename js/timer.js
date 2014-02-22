'use strict';

var DEFAULT_WORK_TIME = 10000,
      DEFAULT_REST_TIME = 5000;

var workTime = 0,
    restTime = 0,
    workTimer = 0,
    restTimer = 0,
    workTimerCallback = null,
    restTimerCallback = null;

var Timer = function(window) {
  if (!window) {
    throw new Error('No window param.');
  }

  if (window.localStorage.worktime) {
    workTime = window.localStorage.worktime;
  } else {
    window.localStorage.worktime = DEFAULT_WORK_TIME;
    workTime = window.localStorage.worktime;
  }

  if (window.localStorage.restTime) {
    restTime = window.localStorage.restTime;
  } else {
    window.localStorage.restTime = DEFAULT_REST_TIME;
    restTime = window.localStorage.restTime;
  }
};

Timer.prototype = {
  /**
   * Config work and rest time and reset the timers.
   *
   * @param {Object} config A config JSON object,
   *   the format is { workTime: 0, restTime: 0 }.
   */
  setupConfig: function(config) {
    if (config && config.workTime) {
      window.localStorage.workTime = config.workTime;
      workTime = window.localStorage.workTime;

      this.clearWorkTimer();
      this.setupWorkTimer(workTimerCallback);
    }

    if (config && config.restTime) {
      window.localStorage.restTime = config.restTime;
      restTime = window.localStorage.restTime;

      this.clearRestTimer();
      this.setupRestTimer(restTimerCallback);
    }
  },

  /**
   * Setup work timer.
   *
   * @param {Function} callback execute after time is up.
   */
  setupWorkTimer: function(callback) {
    if (callback && typeof callback === 'function') {
      workTimerCallback = callback;
      workTimer = setInterval(workTimerCallback, workTime);
    }
  },

  /**
   * Clear work timer.
   */
  clearWorkTimer: function() {
    clearInterval(workTimer);
  },

  /**
   * Setup rest timer.
   *
   * @param {Function} callback execute after time is up.
   */
  setupRestTimer: function(callback) {
    if (callback && typeof callback === 'function') {
      restTimerCallback = callback;
      restTimer = setInterval(restTimerCallback, restTime);
    }
  },

  /**
   * Clear rest timer.
   */
  clearRestTimer: function() {
    clearInterval(restTimer);
  }
};

module.exports = Timer;
