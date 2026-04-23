// 用户相关API
// GET /api/user?userId=xxx - 获取用户信息
// POST /api/user - 创建新用户
// PUT /api/user - 更新用户信息

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
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return jsonResponse({ error: '缺少 userId 查询参数' }, 400);
    }

    const result = await env.DB.prepare(
      'SELECT id, username, nickname, avatar, xp, level, streak, last_login, created_at FROM users WHERE id = ?'
    )
      .bind(userId)
      .first();

    if (!result) {
      return jsonResponse({ error: '用户不存在' }, 404);
    }

    return jsonResponse({ user: result });
  } catch (err) {
    return jsonResponse({ error: '获取用户信息失败', detail: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { username, nickname, avatar } = body;

    if (!username) {
      return jsonResponse({ error: '缺少必填字段: username' }, 400);
    }

    // 检查用户名是否已存在
    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE username = ?'
    )
      .bind(username)
      .first();

    if (existing) {
      return jsonResponse({ error: '用户名已存在' }, 409);
    }

    const result = await env.DB.prepare(
      'INSERT INTO users (username, nickname, avatar, xp, level, streak) VALUES (?, ?, ?, 0, 1, 0)'
    )
      .bind(username, nickname || username, avatar || null)
      .run();

    const newUser = await env.DB.prepare(
      'SELECT id, username, nickname, avatar, xp, level, streak, last_login, created_at FROM users WHERE id = ?'
    )
      .bind(result.meta.last_row_id)
      .first();

    return jsonResponse({ user: newUser }, 201);
  } catch (err) {
    return jsonResponse({ error: '创建用户失败', detail: err.message }, 500);
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { userId, nickname, avatar } = body;

    if (!userId) {
      return jsonResponse({ error: '缺少必填字段: userId' }, 400);
    }

    if (!nickname && !avatar) {
      return jsonResponse({ error: '至少需要提供一个更新字段 (nickname 或 avatar)' }, 400);
    }

    // 检查用户是否存在
    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE id = ?'
    )
      .bind(userId)
      .first();

    if (!existing) {
      return jsonResponse({ error: '用户不存在' }, 404);
    }

    // 动态构建更新语句
    const updates = [];
    const params = [];

    if (nickname) {
      updates.push('nickname = ?');
      params.push(nickname);
    }
    if (avatar) {
      updates.push('avatar = ?');
      params.push(avatar);
    }

    params.push(userId);

    await env.DB.prepare(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`
    )
      .bind(...params)
      .run();

    const updatedUser = await env.DB.prepare(
      'SELECT id, username, nickname, avatar, xp, level, streak, last_login, created_at FROM users WHERE id = ?'
    )
      .bind(userId)
      .first();

    return jsonResponse({ user: updatedUser });
  } catch (err) {
    return jsonResponse({ error: '更新用户信息失败', detail: err.message }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
