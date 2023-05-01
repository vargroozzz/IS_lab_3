import type { Auditory } from "./auditory.mjs";
import type { Day } from "./day.mjs";
import type { Lecturer } from "./lecturer.mjs";
import type { TimeSlot } from "./timeSlot.mjs";

export class Lecture {
  constructor(
    public readonly science: string,
    public readonly timing: TimeSlot,
    public readonly auditory: Auditory,
    public readonly lecturer: Lecturer,
    public readonly type: "lecture" | "lab",
    public readonly group: string,
    public readonly day: Day,
    public readonly maxStudents: number
  ) {}

  auditoryMismatch(): number {
    return this.maxStudents > this.auditory.capacity ? 1 : 0;
  }

  conflicts(p: Lecture) {
    if (!(p.day === this.day && p.timing === this.timing)) {
      return 0;
    }

    const auditoryConflict = this.auditory === p.auditory &&
      (p.group !== this.group ||
        p.lecturer !== this.lecturer ||
        p.science !== this.science ||
        p.type !== this.type) ? 1 : 0;

    const groupConflict = this.group === p.group &&
      (this.auditory !== p.auditory ||
        p.lecturer !== this.lecturer ||
        p.science !== this.science ||
        p.type !== this.type) ? 1 : 0;

    const lecturerConflict = this.lecturer === p.lecturer &&
      (this.auditory !== p.auditory ||
        p.group !== this.group ||
        p.science !== this.science ||
        p.type !== this.type) ? 1 : 0;

    return (auditoryConflict + groupConflict + lecturerConflict) as 0 | 1 | 2 | 3;
  }
}
