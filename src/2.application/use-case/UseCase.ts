export interface UseCase {
  execute(): Promise<unknown>;
}
