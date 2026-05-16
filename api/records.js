const UPSTASH_URL = process.env.KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN;

async function redisGet(key) {
  const res = await fetch(`${UPSTASH_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

async function redisSet(key, value) {
  await fetch(`${UPSTASH_URL}/set/${key}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(value))
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const records = await redisGet('cafe_records') || [];
      return res.status(200).json({ ok: true, records });
    }
    if (req.method === 'POST') {
      const { records } = req.body;
      if (!Array.isArray(records)) return res.status(400).json({ ok: false, msg: '数据格式错误' });
      await redisSet('cafe_records', records);
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'DELETE') {
      await redisSet('cafe_records', []);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ ok: false, msg: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, msg: e.message });
  }
}
