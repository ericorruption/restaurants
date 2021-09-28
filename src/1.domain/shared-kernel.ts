export type NumberBetween1And5 = 1 | 2 | 3 | 4 | 5;

type UniqueId = string;
export type Id = UniqueId;

export type Email = string;
export type Password = string;

export class Rating {
  value: NumberBetween1And5;
  constructor(input: number) {
    if (![1, 2, 3, 4, 5].includes(input)) {
      throw new Error("Rating must be between 1 and 5");
    }

    this.value = input as NumberBetween1And5;
  }
}
