import type {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";

import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";

import "./RatingFilter.css";
import { StarRating } from "./StarRating";

export const RatingFilter: FunctionComponent<{
  value?: NumberBetween1And5;
  onChange: Dispatch<SetStateAction<NumberBetween1And5 | undefined>>;
}> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value) as NumberBetween1And5);
  };

  const resetFilter = () => onChange(undefined);

  return (
    <>
      <p>Filter by rating:</p>
      <fieldset>
        <legend className="visually-hidden">Rating</legend>

        <RatingRadio value={5} checked={value === 5} onChange={handleChange} />
        <RatingRadio value={4} checked={value === 4} onChange={handleChange} />
        <RatingRadio value={3} checked={value === 3} onChange={handleChange} />
        <RatingRadio value={2} checked={value === 2} onChange={handleChange} />
        <RatingRadio value={1} checked={value === 1} onChange={handleChange} />

        {value && (
          <button
            type="button"
            className="rating-filter-button"
            onClick={resetFilter}
          >
            Reset filter
          </button>
        )}
      </fieldset>
    </>
  );
};

const RatingRadio: FunctionComponent<{
  value: NumberBetween1And5;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, checked, onChange }) => (
  <label>
    <input
      type="radio"
      name="rating"
      value={value}
      onChange={onChange}
      checked={checked}
    />{" "}
    <StarRating value={value} />
  </label>
);
