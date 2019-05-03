import { ValueTransformer } from 'typeorm';

export class BoardTransformer implements ValueTransformer {
  // Store the board as a stringified 3d string array,
  // Access the board as a parsed 3d array.
  to(board: number[][]): string {
    return JSON.stringify(board);
  }

  from(stringified: string): number[] {
    return JSON.parse(stringified);
  }
}
