export default class ScheduleItem {
  constructor(id, title, startTime, endTime) {
    this.id = id;
    this.span =
      Math.trunc((endTime - startTime) / 10) +
      ((endTime % 10) - (startTime % 10) >= 0
        ? (endTime % 10) - (startTime % 10)
        : 6 + (endTime % 10) - (startTime % 10)) *
        0.16666666666;
    this.dayWeek = Math.trunc(startTime / 1000);
    this.title = title;
    this.startTime = startTime;
    this.startHour = Math.trunc(this.startTime / 10) % 100;
    this.endTime = endTime;
    this.top = Number(this.startTime) % 10;
  }

  hourToStart(hour) {
    this.startTime =
      Math.trunc(this.startTime / 1000) * 1000 +
      (this.startTime % 10) +
      hour * 10;
    this.startHour = Math.trunc(this.startTime / 10) % 100;
    console.log(this.startTime);
  }
  minToStart(min) {
    this.startTime = Math.trunc(this.startTime / 10) * 10 + min / 10;
    this.top = this.startTime % 10;
  }
  dayWeekToStart(dayWeek) {
    this.startTime = (this.startTime % 1000) + dayWeek * 1000;
    this.dayWeek = Math.trunc(this.startTime / 1000);
  }

  hourToEnd(hour) {
    this.endTime =
      Math.trunc(this.endTime / 1000) * 1000 + (this.endTime % 10) + hour * 10;
  }
  minToEnd(min) {
    this.endTime = Math.trunc(this.endTime / 10) * 10 + min / 10;
  }

  reload() {
    this.startHour = Math.trunc(this.startTime / 10) % 100;
    this.endTime += this.dayWeek * 1000;
    this.top = Number(this.startTime) % 10;
    this.span =
      Math.trunc((this.endTime - this.startTime) / 10) +
      ((this.endTime % 10) - (this.startTime % 10) >= 0
        ? (this.endTime % 10) - (this.startTime % 10)
        : 6 + (this.endTime % 10) - (this.startTime % 10)) *
        0.16666666666;
  }
}
