// 排行榜API
// GET /api/leaderboard - 获取排行榜（按XP排序，支持limit和offset查询参数）

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: jsonHeaders,
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit')) || 20;
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    // 参数校验
    if (limit < 1 || limit > 100) {
      return jsonResponse({ error: 'limit 参数必须在 1-100 之间' }, 400);
    }

    if (offset < 0) {
      return jsonResponse({ error: 'offset 参数不能为负数' }, 400);
    }

    // 获取排行榜总数
    const countResult = await env.DB.prepare(
      'SELECT COUNT(*) AS total FROM users'
    )
      .first();

    const total = countResult ? countResult.total : 0;

    // 获取排行榜数据
    const result = await env.DB.prepare(
      `SELECT id, username, nickname, avatar, xp, level, streak, created_at
       FROM users
       ORDER BY xp DESC, level DESC, created_at ASC
       LIMIT ? OFFSET ?`
    )
      .bind(limit, offset)
      .all();

    // 为每条记录添加排名
    const leaderboard = (result.results || []).map((user, index) => ({
      ...user,
      rank: offset + index + 1,
    }));

    return jsonResponse({
      leaderboard,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (err) {
    return jsonResponse({ error: '获取排行榜失败', detail: err.message }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
