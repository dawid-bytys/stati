export interface FetchTokensParams {
  code: string;
  codeVerifier: string;
}

export interface TopItemsParams {
  type: string;
  period?: string;
  limit?: number;
  offset?: number;
}
