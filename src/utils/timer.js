export class timer {
  count = 0
  startTime = 0

  countStart() {
    this.startTime = new Date().getTime();
  }

  countStop() {
    const endTime = new Date().getTime();
    this.count = this.startTime === 0 ? 0 : Math.round((endTime - this.startTime) / 1000);
    this.startTime = 0;
  }

}