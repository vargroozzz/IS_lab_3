import type { Lecture } from "./lecture.mjs";

export class TimeTable {
  constructor(public readonly schedule: Lecture[]) {}

  calculateFitness() {
    const conflicts = this.schedule.reduce((acc, lesson) =>
      acc + this.schedule.reduce(
        (acc, pretender) => acc + lesson.conflicts(pretender),
        0
      ) + lesson.auditoryMismatch(), 0);

    return 1 / (conflicts + 1);
  }

  print() {
    console.table(
      this.schedule.map((e) => {
        return {
          auditory: e.auditory.name,
          science: e.science,
          timing: e.timing.time,
          lecturer: e.lecturer.name,
          type: e.type,
          group: e.group,
          day: e.day.name,
        };
      })
    );
  }
}
