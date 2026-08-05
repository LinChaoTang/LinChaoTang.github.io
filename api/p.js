const BOT_UA = /bot|crawl|spider|slurp|preview|linkedinbot|slackbot|facebookexternalhit|whatsapp|telegrambot|twitterbot|discordbot|mimecast|proofpoint|barracuda|mailscanner|pingdom|uptimerobot|headlesschrome|python-requests|curl\//i;

module.exports = async function handler(req, res) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || '';
  const country = req.headers['x-vercel-ip-country'] || '';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  const city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : '';
  const ua = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || req.headers['referrer'] || '';
  const isBot = BOT_UA.test(ua);

  let org = '';
  try {
    if (ip) {
      const token = process.env.IPINFO_TOKEN ? `?token=${process.env.IPINFO_TOKEN}` : '';
      const r = await fetch(`https://ipinfo.io/${ip}/json${token}`, { signal: AbortSignal.timeout(1500) });
      if (r.ok) {
        const data = await r.json();
        org = data.org || '';
      }
    }
  } catch (e) {
    // ipinfo lookup best-effort only; never block the redirect on it
  }

  const webhookUrl = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.LOG_SECRET;

  if (webhookUrl && secret) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          timestamp: new Date().toISOString(),
          ip, country, region, city, org, ua, referer,
          isBot: isBot ? 'BOT' : ''
        }),
        signal: AbortSignal.timeout(7000)
      });
    } catch (e) {
      // logging is best-effort; the redirect must still happen
    }
  }

  res.writeHead(302, { Location: '/portfolio-2026.pdf' });
  res.end();
};
