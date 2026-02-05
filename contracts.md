# GOSEC Full Backend & Admin Contracts

## Auth

### POST /api/auth/login
Admin login to get JWT.

Request:
- `username`: string
- `password`: string

Response:
- `access_token`: string (JWT)
- `token_type`: "bearer"

Used by: Admin UI login.

---

## Media Assets (images, logos, backgrounds)

Entity: `MediaAsset`
- `id`: string (Mongo `_id` as hex)
- `key`: string (e.g. `hero.main`, `logo.main`, `about.image`, `programs.soccer.image`)
- `url`: string (image URL)
- `alt_en`: string
- `alt_fr`: string

### GET /api/media
List all media assets.

### POST /api/media  (admin only)
Create new media asset.

### PUT /api/media/{id}  (admin only)
Update existing media asset (url, alt text).

---

## Hero Content

Entity: `HeroContent`
- `id`: string
- `title_en`, `title_fr`
- `subtitle_en`, `subtitle_fr`
- `tagline_en`, `tagline_fr`
- `media_key`: string (FK to `MediaAsset.key` for hero background)

### GET /api/content/hero
Get current hero content.

### PUT /api/content/hero  (admin only)
Update hero text + `media_key`.

Used by: Home hero.

---

## About Content

Entity: `AboutContent`
- `id`: string
- `about_en`, `about_fr`
- `mission_en`, `mission_fr`
- `vision_en`, `vision_fr`

### GET /api/content/about
### PUT /api/content/about  (admin only)

Used by: About page (About, Mission, Vision text).

Leadership grid remains static for now (role titles are coded, can be moved to backend later).

---

## Programs

Entity: `Program`
- `id`: string (e.g. `soccer`, `youth`, `family`, `culture`, `careers`)
- `title_en`, `title_fr`
- `description_en`, `description_fr`
- `bullets_en`: [string]
- `bullets_fr`: [string]
- `media_key`: string (FK to MediaAsset)
- `order`: number (for sorting, soccer last, etc.)

### GET /api/programs
Return list of programs sorted by `order`.

### GET /api/programs/{id}
Return single program.

### POST /api/programs  (admin only)
Create program.

### PUT /api/programs/{id}  (admin only)
Update program fields.

### DELETE /api/programs/{id}  (admin only)

Used by: Programs page & program detail pages.

---

## Gallery

Entity: `GalleryItem`
- `id`: string
- `title_en`, `title_fr`
- `media_key`: string
- `order`: number

### GET /api/gallery
### POST /api/gallery  (admin only)
### PUT /api/gallery/{id}  (admin only)
### DELETE /api/gallery/{id}  (admin only)

Used by: Gallery page.

---

## Events

Entity: `Event`
- `id`: string
- `date_en`, `date_fr`
- `title_en`, `title_fr`
- `location_en`, `location_fr`
- `summary_en`, `summary_fr`
- `media_key`: string
- `order`: number

### GET /api/events
### POST /api/events  (admin only)
### PUT /api/events/{id}  (admin only)
### DELETE /api/events/{id}  (admin only)

Used by: Upcoming Events page.

---

## Forms (Join, Donate, Contact)

### Join Program Form
Entity: `JoinForm`
- `id`: string
- `name`, `email`, `age_group`, `message`
- `created_at`: datetime

**POST /api/forms/join**
- Save new join entry.

**GET /api/forms/join** (admin only)
- List join entries.

### Donate Form (Pledge only, no payment)
Entity: `DonateForm`
- `id`: string
- `name`, `email`, `amount`, `card_last4` (optional for display only), `message`
- `created_at`: datetime

**POST /api/forms/donate**
**GET /api/forms/donate** (admin only)

### Contact Form
Entity: `ContactForm`
- `id`: string
- `first_name`, `last_name`, `email`, `phone`, `topic`, `relation`, `city`, `message`
- `created_at`: datetime

**POST /api/forms/contact**
**GET /api/forms/contact** (admin only)

Used by: current frontend forms (we will replace localStorage with calls to these endpoints).

---

## Admin UI expectations

- Admin logs in via `/api/auth/login`.
- Frontend stores JWT in localStorage and attaches `Authorization: Bearer ...` to admin-only requests.
- Admin pages allow clicking **Edit** on hero, about, programs, gallery items, events, and media assets.
- For images, admin will update **URL + alt text**. (No binary upload in this version.)

---

## Current Frontend Mock Dependencies

- `gosecMock.js` currently holds static data (hero, programs, faq, etc.).
- After backend integration, these mocks will be replaced by `GET` calls to:
  - `/api/content/hero`
  - `/api/content/about`
  - `/api/programs`
  - `/api/gallery`
  - `/api/events`
  - `/api/media`

All three forms (join, donate, contact) currently use localStorage; they will be changed to `POST` to `/api/forms/...`.
