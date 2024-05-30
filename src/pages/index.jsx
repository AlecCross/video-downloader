import React, {useState} from 'react';

const Home = () => {
    const [url, setUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setDownloadLinks(data.links);
  };

  return (
    <div>
      <h1>Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
        />
        <button type="submit">Download</button>
      </form>
      {downloadLinks.length > 0 && (
        <div>
          <h2>Download Links</h2>
          <ul>
            {downloadLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} download>
                  {link.format} - {link.quality}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;