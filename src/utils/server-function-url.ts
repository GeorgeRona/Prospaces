import { getSupabaseUrl } from './supabase/client';

const SERVER_FUNCTION_NAME = 'server';
const LEGACY_ROUTE_PREFIX = '/make-server-8405be07';

export function buildServerFunctionUrl(path = ''): string {
  const normalizedPath = path
    ? (path.startsWith('/') ? path : `/${path}`)
    : '';

  return `${getSupabaseUrl()}/functions/v1/${SERVER_FUNCTION_NAME}${LEGACY_ROUTE_PREFIX}${normalizedPath}`;
}