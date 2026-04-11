/** Square Web Payments SDK type declarations */

interface SquarePayments {
  card(options?: Record<string, unknown>): Promise<SquareCard>;
}

interface SquareCard {
  attach(selector: string): Promise<void>;
  tokenize(): Promise<SquareTokenResult>;
  destroy(): Promise<void>;
  addEventListener(event: string, callback: (event: any) => void): void;
}

interface SquareTokenResult {
  status: "OK" | "ERROR";
  token?: string;
  errors?: Array<{ type: string; message: string }>;
}

interface SquareSDK {
  payments(appId: string, locationId: string): Promise<SquarePayments>;
}

interface Window {
  Square?: SquareSDK;
}
