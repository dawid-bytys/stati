import { InvalidSpdcCookieError, ServiceUnavailableError, TooManyRequestsError } from '@/common/errors';

export async function fetchWithErrorHandling<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (response.status === 401) {
    throw new InvalidSpdcCookieError();
  }

  if (response.status === 429) {
    throw new TooManyRequestsError();
  }

  if (response.status === 503) {
    throw new ServiceUnavailableError();
  }

  if (!response.ok) {
    throw new Error('Something went wrong, try reloading the app.');
  }

  return response.json();
}
