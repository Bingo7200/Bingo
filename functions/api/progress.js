// 学习进度API
// GET /api/progress?userId=xxx - 获取用户所有学习进度
// GET /api/progress?userId=xxx&courseId=xxx - 获取某门课程的进度
// POST /api/progress - 更新/创建进度记录

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
    const courseId = url.searchParams.get('courseId');

    if (!userId) {
      return jsonResponse({ error: '缺少 userId 查询参数' }, 400);
    }

    let result;

    if (courseId) {
      // 获取某门课程下的所有课时进度
      result = await env.DB.prepare(
        `SELECT p.id, p.lesson_id, p.status, p.score, p.completed_at,
                l.title AS lesson_title, l.course_id
         FROM progress p
         LEFT JOIN lessons l ON p.lesson_id = l.id
         WHERE p.user_id = ? AND l.course_id = ?
         ORDER BY p.completed_at DESC`
      )
        .bind(userId, courseId)
        .all();
    } else {
      // 获取用户所有学习进度
      result = await env.DB.prepare(
        `SELECT p.id, p.lesson_id, p.status, p.score, p.completed_at,
                l.title AS lesson_title, l.course_id
         FROM progress p
         LEFT JOIN lessons l ON p.lesson_id = l.id
         WHERE p.user_id = ?
         ORDER BY p.completed_at DESC`
      )
        .bind(userId)
        .all();
    }

    return jsonResponse({ progress: result.results || [] });
  } catch (err) {
    return jsonResponse({ error: '获取学习进度失败', detail: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { userId, lessonId, status, score } = body;

    if (!userId || !lessonId) {
      return jsonResponse({ error: '缺少必填字段: userId, lessonId' }, 400);
    }

    if (!status) {
      return jsonResponse({ error: '缺少必填字段: status' }, 400);
    }

    // 检查是否已有进度记录，有则更新，无则创建
    const existing = await env.DB.prepare(
      'SELECT id FROM progress WHERE user_id = ? AND lesson_id = ?'
    )
      .bind(userId, lessonId)
      .first();

    let result;

    if (existing) {
      // 更新已有记录
      await env.DB.prepare(
        'UPDATE progress SET status = ?, score = ?, completed_at = ? WHERE id = ?'
      )
        .bind(status, score || null, new Date().toISOString(), existing.id)
        .run();

      result = await env.DB.prepare(
        'SELECT * FROM progress WHERE id = ?'
      )
        .bind(existing.id)
        .first();
    } else {
      // 创建新记录
      const insertResult = await env.DB.prepare(
        'INSERT INTO progress (user_id, lesson_id, status, score, completed_at) VALUES (?, ?, ?, ?, ?)'
      )
        .bind(userId, lessonId, status, score || null, new Date().toISOString())
        .run();

      result = await env.DB.prepare(
        'SELECT * FROM progress WHERE id = ?'
      )
        .bind(insertResult.meta.last_row_id)
        .first();
    }

    // 如果状态为 completed，给用户增加XP
    if (status === 'completed') {
      await env.DB.prepare(
        'UPDATE users SET xp = xp + 10 WHERE id = ?'
      )
        .bind(userId)
        .run();
    }

    return jsonResponse({ progress: result }, existing ? 200 : 201);
  } catch (err) {
    return jsonResponse({ error: '更新学习进度失败', detail: err.message }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
