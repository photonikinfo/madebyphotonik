# CoCreators Google Search Campaign

## Summary
Phuket-only Search campaign for retainer leads. This is a micro-test built around the current homepage and a very small monthly budget, so the goal is qualified inquiry tracking rather than scale.

## Campaign Settings
- Campaign type: Search only
- Goal: Leads
- Location: Phuket, Thailand
- Location option: Presence only
- Language: English
- Final URL: `https://madebyphotonik.netlify.app/`
- Budget: `500-1000 THB/month`
- Bidding: `Maximize clicks` with a low max CPC cap
- Networks: Google Search only
- Ad schedule: run continuously at launch, then trim after search-term review

## Conversion Tracking
- Track `book_call_click` on the topbar `Book a call` link and the hero `Start a retainer` link.
- Track `email_retainer_click` on the `Email retainer brief` link.
- Push events to `window.dataLayer` so they can be connected to Google Ads, GA4, or GTM later.

## Ad Group
### Phuket Retainer Leads
Use only exact and phrase match keywords.

#### Exact Match
- `[phuket photographer]`
- `[phuket photography]`
- `[luxury photography phuket]`
- `[luxury real estate photography phuket]`
- `[hospitality photographer phuket]`
- `[wedding photography phuket]`
- `[food photographer phuket]`
- `[content retainer phuket]`
- `[commercial videography phuket]`

#### Phrase Match
- `"phuket photographer"`
- `"luxury photography phuket"`
- `"phuket content creator"`
- `"phuket photo retainer"`
- `"phuket video retainer"`
- `"luxury real estate photography phuket"`
- `"hospitality photographer phuket"`
- `"wedding photography phuket"`

## Responsive Search Ad Copy
### Headlines
1. Phuket Photography Retainers
2. Luxury Photography in Phuket
3. CoCreators
4. Retainer-Ready Content Engine
5. Phuket Content Retainers
6. Premium Brand Visuals
7. Book a Monthly Creative Partner
8. Luxury Real Estate Photography
9. Hospitality Content Creation
10. Food Photography in Phuket
11. Wedding Photography Phuket
12. Fast Turnaround, Premium Finish
13. One Partner for Photo and Video
14. Monthly Content, Consistent Quality
15. Built for Premium Brands

### Descriptions
- Keep your Phuket brand looking premium with a monthly photography and video retainer. Fast turnarounds, consistent quality, and content that supports sales.
- Luxury real estate, hospitality, food, weddings, and commercial video. Built for premium brands that need reliable content every month.
- One partner for strategy, capture, editing, and delivery. Less coordination, better visual consistency, more usable assets.
- Based in Phuket and available across Thailand for select premium projects.

## Assets
### Sitelinks
- Work -> `/#work`
- Services -> `/#services`
- Contact -> `/#contact`
- Retainer Process -> `/#retainer`

### Callouts
- Retainer-ready
- Phuket-based
- Luxury brands
- Fast turnaround
- Photo + video
- Monthly planning

## Negative Keywords
- free
- cheap
- stock
- wallpaper
- template
- course
- class
- tutorial
- how to
- diy
- jobs
- salary
- internship
- career
- camera
- lens
- canon
- nikon
- sony
- lightroom
- photoshop
- preset
- png
- jpg
- download
- wedding planner
- photo booth
- passport photo
- studio rental
- camera shop
- pricing calculator
- real estate photography jobs
- photographer jobs
- wedding photographer jobs

## Launch Checklist
- Verify the conversion events fire on the homepage CTAs.
- Create the two Google Ads conversion actions, one for `book_call_click` and one for `email_retainer_click`.
- Paste the ad copy, sitelinks, and callouts into the Google Ads UI.
- Confirm the campaign is restricted to Phuket only.
- Review search terms after 7 days and add negatives immediately.
- Pause any keyword that attracts low-intent or non-local traffic.

## Risk Note
The stated monthly budget is too small for meaningful lead volume. Treat this as a tracking and search-term validation test first. If lead quality is the goal, a higher daily budget will be required later.
