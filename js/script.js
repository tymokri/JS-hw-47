'use strict';


class Human {
    constructor(name, surname, birthYear) {
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
    }

    getAge() {
        return new Date().getFullYear() - this.birthYear;
    }
}

class Student extends Human {
    #attendances = new Array(10);
    _marks = new Array(10);

    constructor(name, surname, birthYear, attendances, marks) {
        super(name, surname, birthYear);
    }

    present() {
        if ((this.#attendances)[this.#attendances.length - 1] !== undefined) throw new Error('Attendances array is full');

        for (let i = 0; i < this.#attendances.length; i++) {
            if ((this.#attendances)[i] === undefined) {
                this.#attendances[i] = true;
                break;
            }
        }
    }

    absent() {
        if (this.#attendances[this.#attendances.length - 1] !== undefined) throw new Error('Attendances array is full');

        for (let i = 0; i < this.#attendances.length; i++) {
            if (this.#attendances [i] === undefined) {
                this.#attendances[i] = false;
                break;
            }
        }
    }

    mark(value) {
        if (this._marks[this._marks.length - 1] !== undefined) throw new Error('Marks array is full');
        if (value > 10) throw new Error('Mark is invalid');

        for (let i = 0; i < this._marks.length; i++) {
            if (this._marks[i] === undefined) {
                this._marks[i] = value;
                break;
            }
        }
    }


    summary () {
        const massage1 = "Wow! It's amazing!";
        const massage2 = "Ok. But you can do it better";
        const massage3 = "A tad far from perfect! :/";


        const indexOfUndefinedAttendances = this.#attendances.findIndex( item => {
            return item === undefined;
        });
        if (indexOfUndefinedAttendances !== -1) throw new Error('Based on attendances information course is not completed');

        const indexOfUndefinedMarks = this._marks.findIndex( item => {
            return item === undefined;
        });
        if (indexOfUndefinedMarks !== -1) throw new Error('Based on marks information course is not completed');


        let sumMarks = null;

        for (let i = 0; i < this._marks.length; i += 1) {
            sumMarks += this._marks[i]
        }
        let averageMark = sumMarks/this._marks.length;


        let averageAttendance = this.#attendances.map(item => {
            if (item) {
                return 1;
            } else {
                return 0;
            }
        }).reduce((acc, item) => {
            return acc + item;
        })/this.#attendances.length;


        if (averageMark > 9 && averageAttendance > 0.9) return massage1;
        if (averageMark < 9 && averageAttendance < 0.9) {
            return massage3;
        } else {
            return massage2;
        }
    }
}

let studentAlex = new Student('Alex', 'Berk', 2005);

console.log(studentAlex);
console.log(studentAlex.getAge());

studentAlex.present();
studentAlex.present();
studentAlex.present();
studentAlex.absent();
studentAlex.present();
studentAlex.present();
studentAlex.present();
studentAlex.present();
studentAlex.present();
studentAlex.absent();

studentAlex.mark(9);
studentAlex.mark(9);
studentAlex.mark(10);
studentAlex.mark(10);
studentAlex.mark(9);
studentAlex.mark(8);
studentAlex.mark(10);
studentAlex.mark(10);
studentAlex.mark(10);
studentAlex.mark(9);

console.log(studentAlex.summary());