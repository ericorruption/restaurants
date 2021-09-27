import type { FunctionComponent } from "react";

import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";

export const StarRating: FunctionComponent<{ value: NumberBetween1And5 }> = ({
  value,
}) => (
  <>
    <span className="visually-hidden">{value}</span>
    <span aria-hidden="true">{Array(value).fill("⭐").join("")}</span>
  </>
);
