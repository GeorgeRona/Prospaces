-- Backfill historical campaign metrics from nested or camelCase JSON metadata.
-- Safe to run multiple times.

WITH parsed_campaigns AS (
  SELECT
    id,
    NULLIF(description, '')::jsonb AS meta
  FROM campaigns
  WHERE description IS NOT NULL
    AND btrim(description) LIKE '{%'
)
UPDATE campaigns AS c
SET
  audience_count = GREATEST(
    COALESCE(c.audience_count, 0),
    COALESCE(
      NULLIF(parsed.meta ->> 'audience_count', '')::integer,
      NULLIF(parsed.meta ->> 'audienceCount', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'audience_count', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'audienceCount', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'audience_count', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'audienceCount', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'audience_count', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'audienceCount', '')::integer,
      0
    )
  ),
  sent_count = GREATEST(
    COALESCE(c.sent_count, 0),
    COALESCE(
      NULLIF(parsed.meta ->> 'sent_count', '')::integer,
      NULLIF(parsed.meta ->> 'sentCount', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'sent_count', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'sentCount', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'sent_count', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'sentCount', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'sent_count', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'sentCount', '')::integer,
      0
    )
  ),
  opened_count = GREATEST(
    COALESCE(c.opened_count, 0),
    COALESCE(
      NULLIF(parsed.meta ->> 'opened_count', '')::integer,
      NULLIF(parsed.meta ->> 'openedCount', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'opened_count', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'openedCount', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'opened_count', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'openedCount', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'opened_count', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'openedCount', '')::integer,
      0
    )
  ),
  clicked_count = GREATEST(
    COALESCE(c.clicked_count, 0),
    COALESCE(
      NULLIF(parsed.meta ->> 'clicked_count', '')::integer,
      NULLIF(parsed.meta ->> 'clickedCount', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'clicked_count', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'clickedCount', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'clicked_count', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'clickedCount', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'clicked_count', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'clickedCount', '')::integer,
      NULLIF(parsed.meta ->> 'landing_page_clicks', '')::integer,
      NULLIF(parsed.meta ->> 'landingPageClicks', '')::integer,
      0
    )
  ),
  converted_count = GREATEST(
    COALESCE(c.converted_count, 0),
    COALESCE(
      NULLIF(parsed.meta ->> 'converted_count', '')::integer,
      NULLIF(parsed.meta ->> 'convertedCount', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'converted_count', '')::integer,
      NULLIF(parsed.meta -> 'metadata' ->> 'convertedCount', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'converted_count', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'convertedCount', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'converted_count', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'convertedCount', '')::integer,
      NULLIF(parsed.meta ->> 'conversions', '')::integer,
      NULLIF(parsed.meta -> 'metrics' ->> 'conversions', '')::integer,
      NULLIF(parsed.meta -> 'stats' ->> 'conversions', '')::integer,
      0
    )
  ),
  revenue = GREATEST(
    COALESCE(c.revenue, 0),
    COALESCE(
      NULLIF(parsed.meta ->> 'revenue', '')::numeric,
      NULLIF(parsed.meta ->> 'totalRevenue', '')::numeric,
      NULLIF(parsed.meta ->> 'total_revenue', '')::numeric,
      NULLIF(parsed.meta -> 'metadata' ->> 'revenue', '')::numeric,
      NULLIF(parsed.meta -> 'metadata' ->> 'totalRevenue', '')::numeric,
      NULLIF(parsed.meta -> 'metadata' ->> 'total_revenue', '')::numeric,
      NULLIF(parsed.meta -> 'metrics' ->> 'revenue', '')::numeric,
      NULLIF(parsed.meta -> 'metrics' ->> 'totalRevenue', '')::numeric,
      NULLIF(parsed.meta -> 'metrics' ->> 'total_revenue', '')::numeric,
      NULLIF(parsed.meta -> 'stats' ->> 'revenue', '')::numeric,
      NULLIF(parsed.meta -> 'stats' ->> 'totalRevenue', '')::numeric,
      NULLIF(parsed.meta -> 'stats' ->> 'total_revenue', '')::numeric,
      0
    )
  )
FROM parsed_campaigns AS parsed
WHERE c.id = parsed.id;