// 测验API
// POST /api/quiz - 提交测验结果
// GET /api/quiz?userId=xxx - 获取用户测验历史

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
      `SELECT qr.id, qr.lesson_id, qr.score, qr.total, qr.answers, qr.created_at,
              l.title AS lesson_title
       FROM quiz_results qr
       LEFT JOIN lessons l ON qr.lesson_id = l.id
       WHERE qr.user_id = ?
       ORDER BY qr.created_at DESC`
    )
      .bind(userId)
      .all();

    return jsonResponse({ quizzes: result.results || [] });
  } catch (err) {
    return jsonResponse({ error: '获取测验历史失败', detail: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { userId, lessonId, score, total, answers } = body;

    if (!userId || !lessonId || score === undefined || !total) {
      return jsonResponse({ error: '缺少必填字段: userId, lessonId, score, total' }, 400);
    }

    if (typeof score !== 'number' || typeof total !== 'number') {
      return jsonResponse({ error: 'score 和 total 必须为数字' }, 400);
    }

    if (score < 0 || score > total) {
      return jsonResponse({ error: 'score 不能小于0或大于total' }, 400);
    }

    const answersJson = typeof answers === 'string' ? answers : JSON.stringify(answers || []);

    const result = await env.DB.prepare(
      'INSERT INTO quiz_results (user_id, lesson_id, score, total, answers, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind(userId, lessonId, score, total, answersJson, new Date().toISOString())
      .run();

    // 根据得分比例给予XP奖励
    const percentage = score / total;
    let xpReward = 0;
    if (percentage >= 0.9) {
      xpReward = 30; // 90%以上
    } else if (percentage >= 0.7) {
      xpReward = 20; // 70%以上
    } else if (percentage >= 0.5) {
      xpReward = 10; // 50%以上
    }

    if (xpReward > 0) {
      await env.DB.prepare(
        'UPDATE users SET xp = xp + ? WHERE id = ?'
      )
        .bind(xpReward, userId)
        .run();
    }

    const newQuiz = await env.DB.prepare(
      'SELECT * FROM quiz_results WHERE id = ?'
    )
      .bind(result.meta.last_row_id)
      .first();

    return jsonResponse({ quiz: newQuiz, xpReward }, 201);
  } catch (err) {
    return jsonResponse({ error: '提交测验失败', detail: err.message }, 500);
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
