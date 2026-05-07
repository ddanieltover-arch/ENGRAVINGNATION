# Analytics Setup Documentation

## Current State

- GA4 property is installed with `G-WHN37054LG` via global layout.
- Base pageview tracking is active through `gtag`.
- Existing commerce event observed: `begin_checkout` (cart to checkout transition).

## Recommended Event Framework

Track these events consistently using `gtag('event', ...)`:

- `view_item` on product detail page view
- `add_to_cart` when cart item is added
- `begin_checkout` when user enters checkout
- `generate_lead` when contact/custom inquiry form is submitted
- `purchase` when order is confirmed
- `search` when on-site search is used

## Event Parameters Standard

- `currency`: `USD`
- `value`: numeric order/cart value
- `items`: array of objects with `item_id`, `item_name`, `price`, `quantity`, `item_variant`

## GA4 + Search Console Integration

1. Open GA4 Admin for `engravingnation.store`.
2. Link product with Search Console property.
3. Confirm reports:
   - Acquisition > Search Console > Queries
   - Acquisition > Search Console > Landing Pages

## GTM Notes (Optional Migration)

If moving from direct gtag to GTM:

1. Add GTM container snippet in root layout.
2. Port GA4 config tag and all event tags.
3. Validate with Tag Assistant and GA4 DebugView before publish.

## Validation Checklist

- Realtime report receives pageviews from production.
- DebugView shows each custom event with correct parameters.
- Conversion events are marked in GA4 admin:
  - `purchase`
  - `generate_lead`
  - `begin_checkout`
- Revenue in GA4 matches internal order totals within acceptable variance.

