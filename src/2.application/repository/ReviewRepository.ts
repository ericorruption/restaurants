import type { Review } from "../../1.domain/Review";

export interface ReviewRepository {
  persist(review: Review): Promise<void>;
}
