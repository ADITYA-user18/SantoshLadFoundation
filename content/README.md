# CMS content

The Latest Feed is driven by JSON files in `content/posts/`.

Each file is one `Post`:

```json
{
  "title": "Post title",
  "titleKn": "ಕನ್ನಡ ಶೀರ್ಷಿಕೆ",
  "slug": "url-safe-slug",
  "description": "Short description",
  "descriptionKn": "ಕನ್ನಡ ವಿವರಣೆ",
  "contentType": "IMAGE",
  "image": "/images/example.jpg",
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "category": "Labour",
  "publishedDate": "2026-08-14",
  "readMoreUrl": "https://optional-external-link.example",
  "featured": false,
  "status": "published"
}
```

- `contentType`: `IMAGE` or `YOUTUBE`
- `category`: Labour | Development | Dharwad | Events | Janatha Darshan | Rescue & Relief | Announcements
- `status`: `published` or `draft`
- YouTube posts embed playback on the site. Use a full YouTube URL.

Add a file, keep `status: "published"`, and it appears on `/latest` and `/api/posts`.
