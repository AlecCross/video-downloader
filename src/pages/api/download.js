import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!ytdl.validateURL(url)) {
      res.status(400).json({ error: 'Invalid URL' });
      return;
    }

    try {
      const info = await ytdl.getInfo(url);
      const links = info.formats
        .filter(format => format.hasAudio && format.hasVideo)
        .map(format => ({
          url: format.url,
          format: format.container,
          quality: format.qualityLabel,
        }));

      res.status(200).json({ links });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve video info' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
