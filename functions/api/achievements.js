// 成就API
// GET /api/achievements?userId=xxx - 获取用户所有成就（包含已解锁和未解锁的）
// POST /api/achievements - 解锁成就

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

    // 获取所有成就
    const allAchievements = await env.DB.prepare(
      'SELECT id, title, description, icon, condition_type, condition_value, xp_reward FROM achievements ORDER BY id'
    )
      .all();

    // 获取用户已解锁的成就
    const unlockedResult = await env.DB.prepare(
      'SELECT achievement_id, unlocked_at FROM user_achievements WHERE user_id = ?'
    )
      .bind(userId)
      .all();

    const unlockedMap = {};
    for (const item of unlockedResult.results || []) {
      unlockedMap[item.achievement_id] = item.unlocked_at;
    }

    // 组合数据：标记每个成就是否已解锁
    const achievements = (allAchievements.results || []).map((achievement) => ({
      ...achievement,
      unlocked: achievement.id in unlockedMap,
      unlockedAt: unlockedMap[achievement.id] || null,
    }));

    const unlockedCount = Object.keys(unlockedMap).length;
    const totalCount = achievements.length;

    return jsonResponse({
      achievements,
      stats: {
        unlocked: unlockedCount,
        total: totalCount,
        percentage: totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0,
      },
    });
  } catch (err) {
    return jsonResponse({ error: '获取成就列表失败', detail: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const { userId, achievementId } = body;

    if (!userId || !achievementId) {
      return jsonResponse({ error: '缺少必填字段: userId, achievementId' }, 400);
    }

    // 检查成就是否存在
    const achievement = await env.DB.prepare(
      'SELECT id, title, xp_reward FROM achievements WHERE id = ?'
    )
      .bind(achievementId)
      .first();

    if (!achievement) {
      return jsonResponse({ error: '成就不存在' }, 404);
    }

    // 检查是否已解锁
    const existing = await env.DB.prepare(
      'SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?'
    )
      .bind(userId, achievementId)
      .first();

    if (existing) {
      return jsonResponse({ error: '该成就已解锁', achievement }, 409);
    }

    // 解锁成就
    const result = await env.DB.prepare(
      'INSERT INTO user_achievements (user_id, achievement_id, unlocked_at) VALUES (?, ?, ?)'
    )
      .bind(userId, achievementId, new Date().toISOString())
      .run();

    // 给用户增加XP奖励
    if (achievement.xp_reward > 0) {
      await env.DB.prepare(
        'UPDATE users SET xp = xp + ? WHERE id = ?'
      )
        .bind(achievement.xp_reward, userId)
        .run();
    }

    return jsonResponse({
      achievement,
      unlockedAt: new Date().toISOString(),
      xpReward: achievement.xp_reward,
    }, 201);
  } catch (err) {
    return jsonResponse({ error: '解锁成就失败', detail: err.message }, 500);
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
