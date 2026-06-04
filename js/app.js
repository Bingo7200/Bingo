// ============================================================
// DataLearn - 商务数据分析在线教育平台
// 完整前端核心JS文件
// ============================================================

// ============================================================
// 1. 全局状态管理
// ============================================================
const store = {
  user: null,
  theme: 'light',
  currentCourse: null,
  currentLesson: null,
  progress: {},
  achievements: [],
  pyodideReady: false,
  pyodide: null,
  currentQuiz: null,
  courseFilter: 'all',
  mobileMenuOpen: false,
};

// 状态变更通知
function setStore(key, value) {
  store[key] = value;
  persistState();
  onStateChange(key, value);
}

function persistState() {
  try {
    const data = {
      user: store.user,
      theme: store.theme,
      progress: store.progress,
      achievements: store.achievements,
    };
    localStorage.setItem('datalearn_state', JSON.stringify(data));
  } catch (e) {
    console.warn('持久化状态失败:', e);
  }
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem('datalearn_state');
    if (raw) {
      const data = JSON.parse(raw);
      if (data.user) store.user = data.user;
      if (data.theme) store.theme = data.theme;
      if (data.progress) store.progress = data.progress;
      if (data.achievements) store.achievements = data.achievements;
    }
  } catch (e) {
    console.warn('加载持久化状态失败:', e);
  }
}

function onStateChange(key, value) {
  if (key === 'theme') {
    applyTheme(value);
    updateThemeToggle();
  }
  if (key === 'user') {
    renderNavbar();
  }
}

// ============================================================
// 2. 成就系统定义
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first-lesson', title: '初学者', description: '完成第一个课时', icon: '\u{1F31F}', tier: 'bronze' },
  { id: 'first-quiz', title: '测验新手', description: '首次完成测验', icon: '\u{1F4DD}', tier: 'bronze' },
  { id: 'streak-3', title: '三日坚持', description: '连续学习3天', icon: '\u{1F525}', tier: 'silver' },
  { id: 'streak-7', title: '一周达人', description: '连续学习7天', icon: '\u{26A1}', tier: 'gold' },
  { id: 'code-10', title: '代码练习生', description: '完成10个代码练习', icon: '\u{1F4BB}', tier: 'silver' },
  { id: 'code-20', title: '代码大师', description: '完成20个代码练习', icon: '\u{1F9D1}\u{200D}\u{1F4BB}', tier: 'gold' },
  { id: 'perfect-score', title: '满分通关', description: '测验获得满分', icon: '\u{1F4AF}', tier: 'gold' },
  { id: 'course-complete', title: '课程毕业', description: '完成一门完整课程', icon: '\u{1F393}', tier: 'special' },
  { id: 'explorer', title: '探索者', description: '学习3门不同课程', icon: '\u{1F9ED}', tier: 'silver' },
  { id: 'all-courses', title: '全能学者', description: '学习全部6门课程', icon: '\u{1F451}', tier: 'special' },
  { id: 'xp-100', title: '百分学子', description: '累计获得100XP', icon: '\u{2728}', tier: 'bronze' },
  { id: 'xp-500', title: '学海无涯', description: '累计获得500XP', icon: '\u{1F30A}', tier: 'gold' },
];

// ============================================================
// 3. 工具函数
// ============================================================
function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}分钟`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`;
}

function calculateXP(score, type) {
  const base = { theory: 10, practice: 20, quiz: 30 };
  const b = base[type] || 10;
  if (type === 'quiz' && score !== undefined) {
    return Math.round(b * (score / 100));
  }
  return b;
}

function getLevelInfo(xp) {
  const levels = [
    { level: 1, title: '初学者', minXP: 0 },
    { level: 2, title: '学习者', minXP: 50 },
    { level: 3, title: '探索者', minXP: 120 },
    { level: 4, title: '实践者', minXP: 220 },
    { level: 5, title: '分析师', minXP: 350 },
    { level: 6, title: '专家', minXP: 500 },
    { level: 7, title: '大师', minXP: 700 },
    { level: 8, title: '宗师', minXP: 1000 },
  ];
  let current = levels[0];
  let next = levels[1];
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].minXP) {
      current = levels[i];
      next = levels[i + 1] || null;
    }
  }
  const progress = next
    ? ((xp - current.minXP) / (next.minXP - current.minXP)) * 100
    : 100;
  return {
    level: current.level,
    title: current.title,
    nextXP: next ? next.minXP : current.minXP,
    progress: Math.min(progress, 100),
  };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return '夜深了';
  if (h < 12) return '早上好';
  if (h < 14) return '中午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

function getDifficultyLabel(difficulty) {
  const map = { beginner: '入门', intermediate: '进阶', advanced: '高级' };
  return map[difficulty] || difficulty;
}

function getDifficultyColor(difficulty) {
  const map = { beginner: '#4CAF50', intermediate: '#FF9800', advanced: '#F44336' };
  return map[difficulty] || '#999';
}

function getLessonTypeIcon(type) {
  const map = { theory: '\u{1F4D6}', practice: '\u{1F4BB}', quiz: '\u{1F4DD}' };
  return map[type] || '\u{1F4C4}';
}

function getLessonTypeLabel(type) {
  const map = { theory: '理论', practice: '练习', quiz: '测验' };
  return map[type] || '课时';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getCourseProgress(courseId) {
  if (!COURSES_DATA) return 0;
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return 0;
  const total = course.lessons.length;
  if (total === 0) return 0;
  let completed = 0;
  course.lessons.forEach(lesson => {
    if (store.progress[lesson.id] && store.progress[lesson.id].status === 'completed') {
      completed++;
    }
  });
  return Math.round((completed / total) * 100);
}

function getUserXP() {
  return store.user ? (store.user.xp || 0) : 0;
}

function getUserStreak() {
  return store.user ? (store.user.streak || 0) : 0;
}

function getCompletedLessonsCount() {
  return Object.values(store.progress).filter(p => p.status === 'completed').length;
}

function getCompletedQuizzesCount() {
  return Object.values(store.progress).filter(p => p.status === 'completed' && p.type === 'quiz').length;
}

function getCompletedPracticeCount() {
  return Object.values(store.progress).filter(p => p.status === 'completed' && p.type === 'practice').length;
}

function getUniqueCoursesLearned() {
  const courseIds = new Set();
  Object.keys(store.progress).forEach(lessonId => {
    if (store.progress[lessonId].status === 'completed') {
      if (COURSES_DATA) {
        COURSES_DATA.forEach(course => {
          if (course.lessons.find(l => l.id === lessonId)) {
            courseIds.add(course.id);
          }
        });
      }
    }
  });
  return courseIds.size;
}

// ============================================================
// 4. Toast 通知系统
// ============================================================
function showToast(message, type = 'info', title = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '\u{2705}',
    error: '\u{274C}',
    warning: '\u{26A0}\u{FE0F}',
    info: '\u{2139}\u{FE0F}',
  };

  const titles = {
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '提示',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <div class="toast__content">
      <div class="toast__title">${escapeHtml(title || titles[type])}</div>
      <div class="toast__message">${escapeHtml(message)}</div>
    </div>
    <button class="toast__close" data-action="close-toast">&times;</button>
    <div class="toast__progress"><div class="toast__progress-bar"></div></div>
  `;

  container.appendChild(toast);

  // 触发进度条动画
  requestAnimationFrame(() => {
    const bar = toast.querySelector('.toast__progress-bar');
    if (bar) bar.style.width = '100%';
  });

  // 自动关闭
  const duration = 4000;
  setTimeout(() => {
    toast.classList.add('toast--fade-out');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

// ============================================================
// 5. API 通信层
// ============================================================
async function api(method, path, data) {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (data && method !== 'GET') {
      opts.body = JSON.stringify(data);
    }
    const res = await fetch(`/api${path}`, opts);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || `请求失败 (${res.status})`);
    }
    return json;
  } catch (e) {
    console.warn('API请求失败，降级到本地存储:', e.message);
    return null;
  }
}

// ============================================================
// 6. Pyodide 集成
// ============================================================
let pyodideInstance = null;

async function initPyodide() {
  try {
    // 动态加载 Pyodide 脚本
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    pyodideInstance = await loadPyodide();
    await pyodideInstance.loadPackage(['pandas', 'numpy', 'matplotlib']);
    store.pyodideReady = true;
    store.pyodide = pyodideInstance;
    showToast('Python运行环境加载完成', 'success');
  } catch (e) {
    console.warn('Pyodide加载失败:', e);
    showToast('Python运行环境加载失败，代码练习功能可能受限', 'warning');
  }
}

async function runPythonCode(code) {
  if (!pyodideInstance) {
    return { success: false, output: 'Python运行环境尚未加载完成，请稍后再试。' };
  }

  try {
    // 重定向 stdout
    pyodideInstance.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

    // 执行用户代码
    await pyodideInstance.runPythonAsync(code);

    // 获取输出
    const stdout = pyodideInstance.runPython('sys.stdout.getvalue()');
    const stderr = pyodideInstance.runPython('sys.stderr.getvalue()');

    // 恢复 stdout
    pyodideInstance.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

    if (stderr && stderr.trim()) {
      return { success: false, output: stderr.trim() };
    }

    return { success: true, output: stdout || '(代码执行成功，无输出)' };
  } catch (e) {
    // 恢复 stdout
    try {
      pyodideInstance.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
    } catch (_) { /* ignore */ }

    return { success: false, output: e.message };
  }
}

// ============================================================
// 7. 主题管理
// ============================================================
function loadTheme() {
  const saved = localStorage.getItem('datalearn_theme');
  if (saved) {
    store.theme = saved;
  } else {
    store.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(store.theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  setStore('theme', store.theme === 'light' ? 'dark' : 'light');
}

function updateThemeToggle() {
  const btn = document.querySelector('[data-action="toggle-theme"]');
  if (btn) {
    btn.textContent = store.theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}';
    btn.title = store.theme === 'light' ? '切换到暗色主题' : '切换到亮色主题';
  }
}

// ============================================================
// 8. 用户管理
// ============================================================
function loadUser() {
  loadPersistedState();
}

function loginUser(username, password) {
  if (!username || !password) {
    showToast('请填写用户名和密码', 'warning');
    return false;
  }
  if (username.length < 2) {
    showToast('用户名至少需要2个字符', 'warning');
    return false;
  }
  if (password.length < 4) {
    showToast('密码至少需要4个字符', 'warning');
    return false;
  }

  // 本地模拟登录
  const users = JSON.parse(localStorage.getItem('datalearn_users') || '{}');
  if (users[username]) {
    if (users[username].password !== password) {
      showToast('密码错误', 'error');
      return false;
    }
    store.user = {
      id: users[username].id,
      username: username,
      nickname: users[username].nickname || username,
      avatar: users[username].avatar || null,
      xp: users[username].xp || 0,
      streak: users[username].streak || 0,
      lastLogin: new Date().toISOString(),
    };
  } else {
    // 自动注册
    store.user = {
      id: 'user_' + Date.now(),
      username: username,
      nickname: username,
      avatar: null,
      xp: 0,
      streak: 0,
      lastLogin: new Date().toISOString(),
    };
    users[username] = {
      id: store.user.id,
      password: password,
      nickname: username,
      avatar: null,
      xp: 0,
      streak: 0,
    };
    localStorage.setItem('datalearn_users', JSON.stringify(users));
  }

  persistState();
  renderNavbar();
  closeModal();
  showToast(`欢迎回来，${store.user.nickname}！`, 'success');
  return true;
}

function registerUser(username, nickname, password) {
  if (!username || !nickname || !password) {
    showToast('请填写所有必填字段', 'warning');
    return false;
  }
  if (username.length < 2) {
    showToast('用户名至少需要2个字符', 'warning');
    return false;
  }
  if (password.length < 4) {
    showToast('密码至少需要4个字符', 'warning');
    return false;
  }

  const users = JSON.parse(localStorage.getItem('datalearn_users') || '{}');
  if (users[username]) {
    showToast('用户名已存在', 'error');
    return false;
  }

  const userId = 'user_' + Date.now();
  users[username] = {
    id: userId,
    password: password,
    nickname: nickname,
    avatar: null,
    xp: 0,
    streak: 0,
  };
  localStorage.setItem('datalearn_users', JSON.stringify(users));

  store.user = {
    id: userId,
    username: username,
    nickname: nickname,
    avatar: null,
    xp: 0,
    streak: 0,
    lastLogin: new Date().toISOString(),
  };

  persistState();
  renderNavbar();
  closeModal();
  showToast(`注册成功，欢迎 ${nickname}！`, 'success');
  return true;
}

function logoutUser() {
  store.user = null;
  persistState();
  renderNavbar();
  navigateTo('#/home');
  showToast('已退出登录', 'info');
}

function updateUserXP(amount) {
  if (!store.user) return;
  store.user.xp = (store.user.xp || 0) + amount;
  // 更新本地存储
  const users = JSON.parse(localStorage.getItem('datalearn_users') || '{}');
  if (users[store.user.username]) {
    users[store.user.username].xp = store.user.xp;
    localStorage.setItem('datalearn_users', JSON.stringify(users));
  }
  persistState();
}

function updateStreak() {
  if (!store.user) return;
  const today = new Date().toDateString();
  const lastLogin = store.user.lastLogin ? new Date(store.user.lastLogin).toDateString() : null;

  if (lastLogin === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastLogin === yesterday.toDateString()) {
    store.user.streak = (store.user.streak || 0) + 1;
  } else if (lastLogin !== today) {
    store.user.streak = 1;
  }

  store.user.lastLogin = new Date().toISOString();

  const users = JSON.parse(localStorage.getItem('datalearn_users') || '{}');
  if (users[store.user.username]) {
    users[store.user.username].streak = store.user.streak;
    users[store.user.username].lastLogin = store.user.lastLogin;
    localStorage.setItem('datalearn_users', JSON.stringify(users));
  }
  persistState();
}

// ============================================================
// 9. 进度管理
// ============================================================
function markLessonComplete(lessonId, type, score) {
  store.progress[lessonId] = {
    status: 'completed',
    type: type,
    score: score,
    completedAt: new Date().toISOString(),
  };
  persistState();

  // 增加XP
  const xp = calculateXP(score, type);
  updateUserXP(xp);

  // 更新连续学习天数
  updateStreak();

  // 检查成就
  checkAchievements(lessonId, type, score);

  return xp;
}

// ============================================================
// 10. 成就检查
// ============================================================
function checkAchievements(lessonId, type, score) {
  const newlyUnlocked = [];

  // 初学者 - 完成第一个课时
  if (!isAchievementUnlocked('first-lesson') && getCompletedLessonsCount() >= 1) {
    unlockAchievement('first-lesson');
    newlyUnlocked.push('first-lesson');
  }

  // 测验新手 - 首次完成测验
  if (!isAchievementUnlocked('first-quiz') && type === 'quiz' && score !== undefined) {
    unlockAchievement('first-quiz');
    newlyUnlocked.push('first-quiz');
  }

  // 三日坚持
  if (!isAchievementUnlocked('streak-3') && getUserStreak() >= 3) {
    unlockAchievement('streak-3');
    newlyUnlocked.push('streak-3');
  }

  // 一周达人
  if (!isAchievementUnlocked('streak-7') && getUserStreak() >= 7) {
    unlockAchievement('streak-7');
    newlyUnlocked.push('streak-7');
  }

  // 代码练习生
  if (!isAchievementUnlocked('code-10') && getCompletedPracticeCount() >= 10) {
    unlockAchievement('code-10');
    newlyUnlocked.push('code-10');
  }

  // 代码大师
  if (!isAchievementUnlocked('code-20') && getCompletedPracticeCount() >= 20) {
    unlockAchievement('code-20');
    newlyUnlocked.push('code-20');
  }

  // 满分通关
  if (!isAchievementUnlocked('perfect-score') && type === 'quiz' && score === 100) {
    unlockAchievement('perfect-score');
    newlyUnlocked.push('perfect-score');
  }

  // 课程毕业
  if (!isAchievementUnlocked('course-complete') && COURSES_DATA) {
    const completed = COURSES_DATA.find(c => getCourseProgress(c.id) === 100);
    if (completed) {
      unlockAchievement('course-complete');
      newlyUnlocked.push('course-complete');
    }
  }

  // 探索者
  if (!isAchievementUnlocked('explorer') && getUniqueCoursesLearned() >= 3) {
    unlockAchievement('explorer');
    newlyUnlocked.push('explorer');
  }

  // 全能学者
  if (!isAchievementUnlocked('all-courses') && COURSES_DATA && getUniqueCoursesLearned() >= COURSES_DATA.length) {
    unlockAchievement('all-courses');
    newlyUnlocked.push('all-courses');
  }

  // 百分学子
  if (!isAchievementUnlocked('xp-100') && getUserXP() >= 100) {
    unlockAchievement('xp-100');
    newlyUnlocked.push('xp-100');
  }

  // 学海无涯
  if (!isAchievementUnlocked('xp-500') && getUserXP() >= 500) {
    unlockAchievement('xp-500');
    newlyUnlocked.push('xp-500');
  }

  // 显示新解锁的成就通知
  newlyUnlocked.forEach(id => {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) {
      showToast(`成就解锁：${ach.icon} ${ach.title}`, 'success', '恭喜！');
    }
  });
}

function isAchievementUnlocked(id) {
  return store.achievements.includes(id);
}

function unlockAchievement(id) {
  if (!isAchievementUnlocked(id)) {
    store.achievements.push(id);
    persistState();
  }
}

// ============================================================
// 11. 模态框管理
// ============================================================
function openModal(content) {
  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = content;
  requestAnimationFrame(() => {
    overlay.classList.add('is-open');
  });
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('is-open');
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  }
}

// ============================================================
// 12. 路由系统
// ============================================================
function setupRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash || '#/home';
  const main = document.getElementById('app');
  if (!main) return;

  // 页面过渡动画
  main.classList.add('page-transition');

  setTimeout(() => {
    const path = hash.replace('#', '');

    if (path === '/' || path === '/home') {
      renderHome();
    } else if (path === '/courses') {
      renderCourses();
    } else if (path.startsWith('/course/')) {
      const courseId = path.replace('/course/', '');
      renderCourseDetail(courseId);
    } else if (path.startsWith('/lesson/')) {
      const parts = path.replace('/lesson/', '').split('/');
      const courseId = parts[0];
      const lessonId = parts[1];
      renderLesson(courseId, lessonId);
    } else if (path === '/dashboard') {
      renderDashboard();
    } else if (path === '/achievements') {
      renderAchievements();
    } else {
      renderHome();
    }

    // 更新导航栏活跃状态
    updateNavbarActive(hash);

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 移除过渡动画
    requestAnimationFrame(() => {
      main.classList.remove('page-transition');
    });
  }, 150);
}

function navigateTo(href) {
  window.location.hash = href;
}

function updateNavbarActive(hash) {
  document.querySelectorAll('.navbar__link').forEach(link => {
    link.classList.remove('navbar__link--active');
    const linkHref = link.getAttribute('data-href') || link.getAttribute('href');
    if (linkHref && hash.startsWith(linkHref.replace('#', ''))) {
      link.classList.add('navbar__link--active');
    }
  });
}

// ============================================================
// 13. 导航栏渲染
// ============================================================
function renderNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const themeIcon = store.theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}';
  const themeTitle = store.theme === 'light' ? '切换到暗色主题' : '切换到亮色主题';

  const userSection = store.user
    ? `
      <div class="navbar__user">
        <div class="navbar__avatar">${store.user.avatar || escapeHtml(store.user.nickname.charAt(0).toUpperCase())}</div>
        <span class="navbar__username">${escapeHtml(store.user.nickname)}</span>
        <button class="navbar__auth-btn navbar__auth-btn--login" data-action="logout">退出</button>
      </div>
    `
    : `
      <div class="navbar__actions">
        <button class="navbar__auth-btn navbar__auth-btn--login" data-action="open-auth" data-mode="login">登录</button>
        <button class="navbar__auth-btn navbar__auth-btn--signup" data-action="open-auth" data-mode="register">注册</button>
      </div>
    `;

  navbar.innerHTML = `
    <nav class="navbar">
      <div class="navbar__inner container">
        <a class="navbar__logo" data-action="navigate" data-href="#/home">
          <span class="navbar__logo-icon">\u{1F4CA}</span>
          <span class="navbar__logo-text">DataLearn</span>
        </a>
        <div class="navbar__links">
          <a class="navbar__link" data-action="navigate" data-href="#/home">
            <span class="navbar__link-icon">\u{1F3E0}</span> 首页
          </a>
          <a class="navbar__link" data-action="navigate" data-href="#/courses">
            <span class="navbar__link-icon">\u{1F4DA}</span> 课程
          </a>
          <a class="navbar__link" data-action="navigate" data-href="#/dashboard">
            <span class="navbar__link-icon">\u{1F4CA}</span> 仪表板
          </a>
          <a class="navbar__link" data-action="navigate" data-href="#/achievements">
            <span class="navbar__link-icon">\u{1F3C6}</span> 成就
          </a>
        </div>
        <div class="navbar__actions">
          <button class="navbar__auth-btn" data-action="toggle-theme" title="${themeTitle}">${themeIcon}</button>
          ${userSection}
        </div>
        <button class="navbar__mobile-toggle" data-action="toggle-mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="navbar__mobile-menu">
        <a class="navbar__link" data-action="navigate" data-href="#/home">
          <span class="navbar__link-icon">\u{1F3E0}</span> 首页
        </a>
        <a class="navbar__link" data-action="navigate" data-href="#/courses">
          <span class="navbar__link-icon">\u{1F4DA}</span> 课程
        </a>
        <a class="navbar__link" data-action="navigate" data-href="#/dashboard">
          <span class="navbar__link-icon">\u{1F4CA}</span> 仪表板
        </a>
        <a class="navbar__link" data-action="navigate" data-href="#/achievements">
          <span class="navbar__link-icon">\u{1F3C6}</span> 成就
        </a>
      </div>
    </nav>
  `;
}

// ============================================================
// 14. 页脚渲染
// ============================================================
function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">
              <span class="footer__logo-icon">\u{1F4CA}</span>
              <span class="footer__logo-text">DataLearn</span>
            </div>
            <p class="footer__description">专业的商务数据分析在线教育平台，通过互动式学习体验，帮助你掌握数据分析技能，赋能商业决策。</p>
          </div>
          <div>
            <h4 class="footer__column-title">课程</h4>
            <div class="footer__links">
              <a class="footer__link" data-action="navigate" data-href="#/courses">全部课程</a>
              <a class="footer__link" data-action="navigate" data-href="#/course/python-basics">Python基础</a>
              <a class="footer__link" data-action="navigate" data-href="#/course/data-analysis">数据分析</a>
              <a class="footer__link" data-action="navigate" data-href="#/course/data-visualization">数据可视化</a>
            </div>
          </div>
          <div>
            <h4 class="footer__column-title">学习资源</h4>
            <div class="footer__links">
              <a class="footer__link" href="javascript:void(0)">学习指南</a>
              <a class="footer__link" href="javascript:void(0)">常见问题</a>
              <a class="footer__link" href="javascript:void(0)">社区论坛</a>
              <a class="footer__link" href="javascript:void(0)">更新日志</a>
            </div>
          </div>
          <div>
            <h4 class="footer__column-title">关于</h4>
            <div class="footer__links">
              <a class="footer__link" href="javascript:void(0)">关于我们</a>
              <a class="footer__link" href="javascript:void(0)">联系方式</a>
              <a class="footer__link" href="javascript:void(0)">隐私政策</a>
              <a class="footer__link" href="javascript:void(0)">服务条款</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${new Date().getFullYear()} DataLearn. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  `;
}

// ============================================================
// 15. 认证模态框
// ============================================================
function renderAuthModal(mode) {
  const isLogin = mode === 'login';
  const title = isLogin ? '欢迎回来' : '创建账户';
  const submitAction = isLogin ? 'login' : 'register';
  const submitLabel = isLogin ? '登录' : '注册';
  const switchText = isLogin ? '还没有账户？' : '已有账户？';
  const switchAction = isLogin ? 'register' : 'login';
  const switchLabel = isLogin ? '立即注册' : '去登录';

  const extraFields = isLogin ? '' : `
    <div class="modal__field">
      <label class="modal__label">昵称</label>
      <input type="text" class="modal__input" id="auth-nickname" placeholder="请输入昵称" autocomplete="off" />
    </div>
  `;

  const content = `
    <div class="modal">
      <div class="modal__header">
        <h2 class="modal__title">${title}</h2>
        <button class="modal__close" data-action="close-modal">&times;</button>
      </div>
      <div class="modal__body">
        <form id="auth-form" onsubmit="return false;">
          <div class="modal__field">
            <label class="modal__label">用户名</label>
            <input type="text" class="modal__input" id="auth-username" placeholder="请输入用户名" autocomplete="off" />
          </div>
          ${extraFields}
          <div class="modal__field">
            <label class="modal__label">密码</label>
            <input type="password" class="modal__input" id="auth-password" placeholder="请输入密码" autocomplete="off" />
          </div>
          <button type="submit" class="btn btn--primary btn--lg" style="width:100%;margin-top:8px;" data-action="${submitAction}">${submitLabel}</button>
        </form>
      </div>
      <div class="modal__footer">
        <span class="modal__footer-text">${switchText}</span>
        <a class="modal__footer-link" data-action="open-auth" data-mode="${switchAction}" href="javascript:void(0)">${switchLabel}</a>
      </div>
    </div>
  `;

  openModal(content);
}

// ============================================================
// 16. 首页渲染
// ============================================================
function renderHome() {
  const main = document.getElementById('app');
  if (!main) return;

  const courses = COURSES_DATA || [];
  const featuredCourses = courses.slice(0, 4);

  main.innerHTML = `
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <div class="hero__badge">
            <span class="hero__badge-dot"></span>
            全新互动学习体验
          </div>
          <h1 class="hero__title">
            掌握数据分析，<span class="hero__title-highlight">赋能商业决策</span>
          </h1>
          <p class="hero__subtitle">
            通过实战项目和互动练习，系统学习Python数据分析、商业统计、数据可视化等核心技能。
            浏览器内直接运行代码，即时获得反馈。
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary btn--lg" data-action="navigate" data-href="#/courses">开始学习</button>
            <button class="btn btn--outline btn--lg" data-action="navigate" data-href="#/courses">浏览课程</button>
          </div>
          <div class="hero__stats">
            <div class="hero__stat">
              <span class="hero__stat-number">${courses.length}</span>
              <span class="hero__stat-label">门课程</span>
            </div>
            <div class="hero__stat-divider"></div>
            <div class="hero__stat">
              <span class="hero__stat-number">${courses.reduce((sum, c) => sum + c.lessons.length, 0)}+</span>
              <span class="hero__stat-label">课时</span>
            </div>
            <div class="hero__stat-divider"></div>
            <div class="hero__stat">
              <span class="hero__stat-number">1000+</span>
              <span class="hero__stat-label">练习题</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 课程概览 -->
    <section class="section">
      <div class="container">
        <div class="section__header">
          <span class="section__label">精选课程</span>
          <h2 class="section__title">开启你的数据分析之旅</h2>
          <p class="section__description">从入门到精通，我们为你准备了系统化的学习路径</p>
        </div>
        <div class="dashboard__grid">
          ${featuredCourses.map(course => renderCourseCard(course)).join('')}
        </div>
        <div style="text-align:center;margin-top:40px;">
          <button class="btn btn--secondary btn--lg" data-action="navigate" data-href="#/courses">查看全部课程</button>
        </div>
      </div>
    </section>

    <!-- 平台特色 -->
    <section class="section">
      <div class="container">
        <div class="section__header">
          <span class="section__label">平台特色</span>
          <h2 class="section__title">为什么选择 DataLearn</h2>
        </div>
        <div class="dashboard__grid">
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">互动学习</span>
              <span class="stat-card__icon stat-card__icon--primary">\u{1F4A1}</span>
            </div>
            <div class="stat-card__value" style="font-size:1rem;font-weight:400;">
              浏览器内置Python运行环境，无需安装任何软件，边学边练，代码即写即运行。
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">即时反馈</span>
              <span class="stat-card__icon stat-card__icon--accent">\u{26A1}</span>
            </div>
            <div class="stat-card__value" style="font-size:1rem;font-weight:400;">
              每次代码运行和测验提交后立即获得结果和详细解析，快速定位问题，高效学习。
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">成就系统</span>
              <span class="stat-card__icon stat-card__icon--highlight">\u{1F3C6}</span>
            </div>
            <div class="stat-card__value" style="font-size:1rem;font-weight:400;">
              12项成就等你解锁，从初学者到全能学者，记录你的每一步成长和突破。
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">实战项目</span>
              <span class="stat-card__icon stat-card__icon--success">\u{1F680}</span>
            </div>
            <div class="stat-card__value" style="font-size:1rem;font-weight:400;">
              真实商务场景案例，涵盖销售分析、用户画像、财务报表等，学以致用。
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// 17. 课程卡片组件
// ============================================================
function renderCourseCard(course) {
  const progress = getCourseProgress(course.id);
  const totalLessons = course.lessons ? course.lessons.length : 0;
  const completedLessons = course.lessons
    ? course.lessons.filter(l => store.progress[l.id] && store.progress[l.id].status === 'completed').length
    : 0;

  return `
    <div class="course-card" data-action="navigate" data-href="#/course/${course.id}" style="cursor:pointer;">
      <div class="course-card__header">
        <span class="course-card__icon">${course.icon || '\u{1F4DA}'}</span>
        <span class="course-card__category" style="color:${getDifficultyColor(course.difficulty)}">${getDifficultyLabel(course.difficulty)}</span>
      </div>
      <div class="course-card__body">
        <h3 class="course-card__title">${escapeHtml(course.title)}</h3>
        <p class="course-card__description">${escapeHtml(course.description)}</p>
      </div>
      <div class="course-card__meta">
        <div class="course-card__info">
          <span class="course-card__info-item">${totalLessons} 课时</span>
          <span class="course-card__info-item">${formatDuration(course.lessons ? course.lessons.reduce((s, l) => s + (l.duration || 0), 0) : 0)}</span>
        </div>
        ${progress > 0 ? `
          <div class="course-card__progress">
            <div class="course-card__progress-header">
              <span class="course-card__progress-label">学习进度</span>
              <span class="course-card__progress-value">${progress}%</span>
            </div>
            <div class="course-card__progress-bar">
              <div class="course-card__progress-fill" style="width:${progress}%"></div>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ============================================================
// 18. 课程列表页渲染
// ============================================================
function renderCourses() {
  const main = document.getElementById('app');
  if (!main) return;

  const courses = COURSES_DATA || [];
  const filter = store.courseFilter || 'all';
  const filtered = filter === 'all' ? courses : courses.filter(c => c.difficulty === filter);

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const diffLabels = { all: '全部', beginner: '入门', intermediate: '进阶', advanced: '高级' };

  main.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section__header">
          <span class="section__label">课程中心</span>
          <h2 class="section__title">探索全部课程</h2>
          <p class="section__description">选择适合你的课程，开始系统化学习之旅</p>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:32px;flex-wrap:wrap;">
          ${difficulties.map(d => `
            <button class="btn ${filter === d ? 'btn--primary' : 'btn--outline'} btn--sm"
                    data-action="filter-courses" data-difficulty="${d}">
              ${diffLabels[d]}
            </button>
          `).join('')}
        </div>
        <div class="dashboard__grid">
          ${filtered.length > 0
            ? filtered.map(course => renderCourseCard(course)).join('')
            : '<p style="text-align:center;color:#999;grid-column:1/-1;">暂无符合条件的课程</p>'
          }
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// 19. 课程详情页渲染
// ============================================================
function renderCourseDetail(courseId) {
  const main = document.getElementById('app');
  if (!main) return;

  const course = (COURSES_DATA || []).find(c => c.id === courseId);
  if (!course) {
    main.innerHTML = `
      <section class="section">
        <div class="container">
          <div style="text-align:center;padding:60px 0;">
            <h2>课程未找到</h2>
            <p style="margin:16px 0 24px;">请检查课程链接是否正确</p>
            <button class="btn btn--primary" data-action="navigate" data-href="#/courses">返回课程列表</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  store.currentCourse = course;

  const progress = getCourseProgress(course.id);
  const completedCount = course.lessons.filter(l => store.progress[l.id] && store.progress[l.id].status === 'completed').length;

  main.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="course-detail">
          <!-- 左侧边栏 -->
          <div class="course-sidebar">
            <div class="course-sidebar__header">
              <h2 class="course-sidebar__title">${course.icon} ${escapeHtml(course.title)}</h2>
              <p class="course-sidebar__subtitle">
                ${getDifficultyLabel(course.difficulty)} · ${course.lessons.length} 课时 · 已完成 ${completedCount}/${course.lessons.length}
              </p>
              <div class="course-card__progress" style="margin-top:12px;">
                <div class="course-card__progress-header">
                  <span class="course-card__progress-label">课程进度</span>
                  <span class="course-card__progress-value">${progress}%</span>
                </div>
                <div class="course-card__progress-bar">
                  <div class="course-card__progress-fill" style="width:${progress}%"></div>
                </div>
              </div>
            </div>
            <nav class="course-sidebar__nav">
              ${renderSidebarSections(course)}
            </nav>
          </div>

          <!-- 右侧内容区 -->
          <div class="course-content" id="course-content-area">
            <div class="course-content__breadcrumb">
              <a class="course-content__breadcrumb-link" data-action="navigate" data-href="#/courses">课程</a>
              <span class="course-content__breadcrumb-sep">/</span>
              <span>${escapeHtml(course.title)}</span>
            </div>
            <h1 class="course-content__title">${course.icon} ${escapeHtml(course.title)}</h1>
            <p class="course-content__meta">
              <span class="course-content__meta-item">${getDifficultyLabel(course.difficulty)}</span>
              <span class="course-content__meta-item">${course.lessons.length} 课时</span>
              <span class="course-content__meta-item">${formatDuration(course.lessons.reduce((s, l) => s + (l.duration || 0), 0))}</span>
            </p>
            <div class="course-content__body">
              <p>${escapeHtml(course.description)}</p>
              <p style="margin-top:16px;color:var(--text-secondary);">请从左侧课时列表中选择一个课时开始学习。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderSidebarSections(course) {
  if (!course.lessons || course.lessons.length === 0) return '';

  // 按类型分组
  const sections = {};
  course.lessons.forEach(lesson => {
    const type = lesson.type || 'theory';
    if (!sections[type]) sections[type] = [];
    sections[type].push(lesson);
  });

  const typeOrder = ['theory', 'practice', 'quiz'];
  let html = '';

  typeOrder.forEach(type => {
    if (!sections[type]) return;
    const label = getLessonTypeLabel(type);
    const icon = getLessonTypeIcon(type);

    html += `
      <div class="course-sidebar__section">
        <div class="course-sidebar__section-title">${icon} ${label}</div>
        ${sections[type].map(lesson => {
          const isCompleted = store.progress[lesson.id] && store.progress[lesson.id].status === 'completed';
          const isActive = store.currentLesson && store.currentLesson.id === lesson.id;
          let itemClass = 'course-sidebar__item';
          if (isActive) itemClass += ' course-sidebar__item--active';
          if (isCompleted) itemClass += ' course-sidebar__item--completed';

          return `
            <div class="${itemClass}" data-action="select-lesson" data-course-id="${course.id}" data-lesson-id="${lesson.id}">
              <span class="course-sidebar__item-icon">${getLessonTypeIcon(lesson.type)}</span>
              <span class="course-sidebar__item-text">${escapeHtml(lesson.title)}</span>
              <span class="course-sidebar__item-duration">${lesson.duration || 0}分钟</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  });

  return html;
}

// ============================================================
// 20. 课时学习页渲染
// ============================================================
function renderLesson(courseId, lessonId) {
  const main = document.getElementById('app');
  if (!main) return;

  const course = (COURSES_DATA || []).find(c => c.id === courseId);
  if (!course) {
    main.innerHTML = `
      <section class="section">
        <div class="container">
          <div style="text-align:center;padding:60px 0;">
            <h2>课程未找到</h2>
            <button class="btn btn--primary" data-action="navigate" data-href="#/courses" style="margin-top:16px;">返回课程列表</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) {
    main.innerHTML = `
      <section class="section">
        <div class="container">
          <div style="text-align:center;padding:60px 0;">
            <h2>课时未找到</h2>
            <button class="btn btn--primary" data-action="navigate" data-href="#/course/${courseId}" style="margin-top:16px;">返回课程</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  store.currentCourse = course;
  store.currentLesson = lesson;

  // 标记课时开始学习（非完成）
  if (!store.progress[lesson.id]) {
    store.progress[lesson.id] = {
      status: 'in_progress',
      type: lesson.type,
      startedAt: new Date().toISOString(),
    };
    persistState();
  }

  // 查找上一个和下一个课时
  const lessonIndex = course.lessons.indexOf(lesson);
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  // 根据课时类型渲染内容
  let contentHtml = '';
  if (lesson.type === 'theory') {
    contentHtml = renderTheoryContent(lesson, course);
  } else if (lesson.type === 'practice') {
    contentHtml = renderPracticeContent(lesson, course);
  } else if (lesson.type === 'quiz') {
    contentHtml = renderQuizContent(lesson, course);
  }

  // 导航按钮
  const navButtons = `
    <div class="course-content__nav-buttons">
      ${prevLesson ? `
        <button class="btn btn--outline" data-action="prev-lesson" data-course-id="${course.id}" data-lesson-id="${prevLesson.id}">
          \u{2190} ${escapeHtml(prevLesson.title)}
        </button>
      ` : '<div></div>'}
      ${nextLesson ? `
        <button class="btn btn--primary" data-action="next-lesson" data-course-id="${course.id}" data-lesson-id="${nextLesson.id}">
          ${escapeHtml(nextLesson.title)} \u{2192}
        </button>
      ` : `
        <button class="btn btn--primary" data-action="navigate" data-href="#/course/${course.id}">
          返回课程
        </button>
      `}
    </div>
  `;

  main.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="course-detail">
          <!-- 左侧边栏 -->
          <div class="course-sidebar">
            <div class="course-sidebar__header">
              <h2 class="course-sidebar__title">${course.icon} ${escapeHtml(course.title)}</h2>
              <p class="course-sidebar__subtitle">
                ${getDifficultyLabel(course.difficulty)} · ${course.lessons.length} 课时
              </p>
            </div>
            <nav class="course-sidebar__nav">
              ${renderSidebarSections(course)}
            </nav>
          </div>

          <!-- 右侧内容区 -->
          <div class="course-content">
            <div class="course-content__breadcrumb">
              <a class="course-content__breadcrumb-link" data-action="navigate" data-href="#/courses">课程</a>
              <span class="course-content__breadcrumb-sep">/</span>
              <a class="course-content__breadcrumb-link" data-action="navigate" data-href="#/course/${course.id}">${escapeHtml(course.title)}</a>
              <span class="course-content__breadcrumb-sep">/</span>
              <span>${escapeHtml(lesson.title)}</span>
            </div>
            <h1 class="course-content__title">${getLessonTypeIcon(lesson.type)} ${escapeHtml(lesson.title)}</h1>
            <div class="course-content__meta">
              <span class="course-content__meta-item">${getLessonTypeLabel(lesson.type)}</span>
              <span class="course-content__meta-item">${formatDuration(lesson.duration || 0)}</span>
            </div>
            <div class="course-content__body">
              ${contentHtml}
            </div>
            ${navButtons}
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// 21. 理论课时内容
// ============================================================
function renderTheoryContent(lesson, course) {
  const isCompleted = store.progress[lesson.id] && store.progress[lesson.id].status === 'completed';

  return `
    <div class="theory-content">
      ${lesson.content || '<p>暂无内容</p>'}
      ${!isCompleted ? `
        <div style="margin-top:32px;text-align:center;">
          <button class="btn btn--primary btn--lg" data-action="complete-lesson" data-lesson-id="${lesson.id}" data-type="theory">
            标记为已完成
          </button>
        </div>
      ` : `
        <div style="margin-top:32px;text-align:center;">
          <span style="color:var(--color-success);font-weight:500;">\u{2705} 已完成此课时</span>
        </div>
      `}
    </div>
  `;
}

// ============================================================
// 22. 代码练习内容
// ============================================================
function renderPracticeContent(lesson, course) {
  const isCompleted = store.progress[lesson.id] && store.progress[lesson.id].status === 'completed';
  const initialCode = lesson.initialCode || '# 在此编写你的代码\nprint("Hello, DataLearn!")';
  const hints = lesson.hints || [];

  return `
    <div class="practice-content">
      ${lesson.content ? `<div class="practice-description">${lesson.content}</div>` : ''}

      <div class="code-editor">
        <div class="code-editor__header">
          <div class="code-editor__dots">
            <span class="code-editor__dot code-editor__dot--red"></span>
            <span class="code-editor__dot code-editor__dot--yellow"></span>
            <span class="code-editor__dot code-editor__dot--green"></span>
          </div>
          <span class="code-editor__filename">solution.py</span>
          <div class="code-editor__actions">
            ${hints.length > 0 ? `
              <button class="code-editor__btn" data-action="show-hint" data-lesson-id="${lesson.id}">\u{1F4A1} 提示</button>
            ` : ''}
            <button class="code-editor__btn code-editor__btn--run" data-action="run-code" ${!store.pyodideReady ? 'disabled' : ''}>
              \u{25B6} 运行
            </button>
          </div>
        </div>
        <div class="code-editor__body">
          <div class="code-editor__lines" id="code-line-numbers"></div>
          <textarea class="code-editor__code" id="code-textarea" spellcheck="false">${escapeHtml(initialCode)}</textarea>
        </div>
        <div class="code-editor__output" id="code-output-panel" style="display:none;">
          <div class="code-editor__output-header">
            <span class="code-editor__output-title">输出</span>
          </div>
          <div class="code-editor__output-content" id="code-output-content"></div>
        </div>
      </div>

      ${!isCompleted ? `
        <div style="margin-top:16px;text-align:center;">
          <button class="btn btn--primary" data-action="complete-lesson" data-lesson-id="${lesson.id}" data-type="practice">
            完成此练习
          </button>
        </div>
      ` : `
        <div style="margin-top:16px;text-align:center;">
          <span style="color:var(--color-success);font-weight:500;">\u{2705} 已完成此练习</span>
        </div>
      `}
    </div>
  `;
}

// ============================================================
// 23. 测验内容
// ============================================================
function renderQuizContent(lesson, course) {
  const questions = lesson.questions || [];
  if (questions.length === 0) {
    return '<p>暂无测验题目</p>';
  }

  // 初始化测验状态
  store.currentQuiz = {
    lessonId: lesson.id,
    courseId: course.id,
    questions: questions,
    currentIndex: 0,
    answers: [],
    submitted: false,
    results: [],
  };

  return renderQuizQuestion();
}

function renderQuizQuestion() {
  const quiz = store.currentQuiz;
  if (!quiz) return '';

  if (quiz.submitted) {
    return renderQuizResult();
  }

  const q = quiz.questions[quiz.currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = ((quiz.currentIndex) / totalQuestions) * 100;
  const isAnswered = quiz.answers[quiz.currentIndex] !== undefined;

  return `
    <div class="quiz">
      <div class="quiz__progress">
        <div class="quiz__progress-bar">
          <div class="quiz__progress-fill" style="width:${progressPercent}%"></div>
        </div>
        <span class="quiz__progress-text">第 ${quiz.currentIndex + 1} / ${totalQuestions} 题</span>
      </div>

      <div class="quiz__card">
        <span class="quiz__question-number">题目 ${quiz.currentIndex + 1}</span>
        <h3 class="quiz__question-text">${escapeHtml(q.question)}</h3>

        ${q.code ? `<pre class="quiz__code-block"><code>${escapeHtml(q.code)}</code></pre>` : ''}

        <div class="quiz__options">
          ${(q.options || []).map((opt, i) => {
            const isSelected = quiz.answers[quiz.currentIndex] === i;
            let optClass = 'quiz__option';
            if (isSelected) optClass += ' quiz__option--selected';
            if (quiz.results[quiz.currentIndex] !== undefined) {
              optClass += ' quiz__option--disabled';
              if (i === q.correct) optClass += ' quiz__option--correct';
              if (isSelected && i !== q.correct) optClass += ' quiz__option--wrong';
            }
            return `
              <div class="${optClass}" data-action="select-option" data-index="${i}">
                <span class="quiz__option-marker">${String.fromCharCode(65 + i)}</span>
                <span class="quiz__option-text">${escapeHtml(opt)}</span>
              </div>
            `;
          }).join('')}
        </div>

        ${quiz.results[quiz.currentIndex] !== undefined ? `
          <div class="quiz__explanation">
            <h4 class="quiz__explanation-title">
              ${quiz.results[quiz.currentIndex] ? '\u{2705} 回答正确' : '\u{274C} 回答错误'}
            </h4>
            <p class="quiz__explanation-text">${escapeHtml(q.explanation || '正确答案是 ' + String.fromCharCode(65 + q.correct))}</p>
          </div>
        ` : ''}

        <div style="margin-top:24px;display:flex;justify-content:flex-end;gap:12px;">
          ${quiz.results[quiz.currentIndex] !== undefined ? `
            ${quiz.currentIndex < totalQuestions - 1
              ? `<button class="btn btn--primary" data-action="next-question">下一题 \u{2192}</button>`
              : `<button class="btn btn--primary" data-action="submit-quiz">查看结果</button>`
            }
          ` : `
            <button class="btn btn--primary" data-action="submit-quiz" ${!isAnswered ? 'disabled' : ''}>
              提交答案
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderQuizResult() {
  const quiz = store.currentQuiz;
  if (!quiz) return '';

  const totalQuestions = quiz.questions.length;
  const correctCount = quiz.results.filter(r => r).length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= 80;
  const xp = calculateXP(score, 'quiz');

  return `
    <div class="quiz">
      <div class="quiz__result">
        <span class="quiz__result-icon">${passed ? '\u{1F389}' : '\u{1F4AA}'}</span>
        <h2 class="quiz__result-title">${passed ? '恭喜通过！' : '继续加油！'}</h2>
        <div class="quiz__result-score ${passed ? 'quiz__result-score--pass' : 'quiz__result-score--fail'}">
          ${score}分
        </div>
        <div class="quiz__result-stats">
          <div class="quiz__result-stat">
            <span class="quiz__result-stat-value">${correctCount}/${totalQuestions}</span>
            <span class="quiz__result-stat-label">正确题数</span>
          </div>
          <div class="quiz__result-stat">
            <span class="quiz__result-stat-value">+${xp}</span>
            <span class="quiz__result-stat-label">获得XP</span>
          </div>
          <div class="quiz__result-stat">
            <span class="quiz__result-stat-value">${passed ? '通过' : '未通过'}</span>
            <span class="quiz__result-stat-label">结果 (80分及格)</span>
          </div>
        </div>
        <div class="quiz__result-actions">
          <button class="btn btn--outline" data-action="retry-quiz">重新测验</button>
          <button class="btn btn--primary" data-action="navigate" data-href="#/course/${quiz.courseId}">返回课程</button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// 24. 仪表板渲染
// ============================================================
function renderDashboard() {
  const main = document.getElementById('app');
  if (!main) return;

  if (!store.user) {
    main.innerHTML = `
      <section class="section">
        <div class="container">
          <div style="text-align:center;padding:60px 0;">
            <h2>请先登录</h2>
            <p style="margin:16px 0 24px;">登录后即可查看你的学习仪表板</p>
            <button class="btn btn--primary btn--lg" data-action="open-auth" data-mode="login">立即登录</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  const greeting = getGreeting();
  const levelInfo = getLevelInfo(getUserXP());
  const completedLessons = getCompletedLessonsCount();
  const completedQuizzes = getCompletedQuizzesCount();
  const streak = getUserStreak();
  const courses = COURSES_DATA || [];

  // 最近学习的课程
  const recentCourses = courses
    .map(course => {
      const progress = getCourseProgress(course.id);
      return { ...course, progress };
    })
    .filter(c => c.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4);

  // 已解锁的成就
  const unlockedAchievements = ACHIEVEMENTS.filter(a => isAchievementUnlocked(a.id));
  const recentAchievements = unlockedAchievements.slice(-4).reverse();

  main.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="dashboard">
          <div class="dashboard__header">
            <div class="dashboard__greeting">${greeting}，${escapeHtml(store.user.nickname)}</div>
            <h1 class="dashboard__title">学习仪表板</h1>
            <p style="color:var(--text-secondary);margin-top:4px;">
              等级 ${levelInfo.level} · ${levelInfo.title} · ${getUserXP()} XP
            </p>
          </div>

          <!-- 统计卡片 -->
          <div class="dashboard__grid">
            <div class="stat-card">
              <div class="stat-card__header">
                <span class="stat-card__label">学习课时</span>
                <span class="stat-card__icon stat-card__icon--primary">\u{1F4D6}</span>
              </div>
              <div class="stat-card__value">${completedLessons}</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__header">
                <span class="stat-card__label">获得XP</span>
                <span class="stat-card__icon stat-card__icon--accent">\u{2B50}</span>
              </div>
              <div class="stat-card__value">${getUserXP()}</div>
              <div class="stat-card__trend stat-card__trend--up">
                距下一等级还需 ${levelInfo.nextXP - getUserXP()} XP
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-card__header">
                <span class="stat-card__label">连续天数</span>
                <span class="stat-card__icon stat-card__icon--highlight">\u{1F525}</span>
              </div>
              <div class="stat-card__value">${streak} 天</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__header">
                <span class="stat-card__label">完成测验</span>
                <span class="stat-card__icon stat-card__icon--success">\u{1F4DD}</span>
              </div>
              <div class="stat-card__value">${completedQuizzes}</div>
            </div>
          </div>

          <!-- 最近学习 -->
          <div class="dashboard__panel" style="margin-top:32px;">
            <div class="dashboard__panel-header">
              <h3 class="dashboard__panel-title">最近学习</h3>
              <button class="btn btn--sm btn--outline" data-action="navigate" data-href="#/courses">查看全部</button>
            </div>
            <div class="dashboard__panel-body">
              ${recentCourses.length > 0
                ? `<div class="dashboard__grid">
                    ${recentCourses.map(course => renderCourseCard(course)).join('')}
                  </div>`
                : '<p style="color:var(--text-secondary);text-align:center;padding:24px;">还没有开始学习任何课程</p>'
              }
            </div>
          </div>

          <!-- 成就展示 -->
          <div class="dashboard__panel" style="margin-top:32px;">
            <div class="dashboard__panel-header">
              <h3 class="dashboard__panel-title">最近成就</h3>
              <button class="btn btn--sm btn--outline" data-action="navigate" data-href="#/achievements">查看全部</button>
            </div>
            <div class="dashboard__panel-body">
              ${recentAchievements.length > 0
                ? `<div class="dashboard__grid">
                    ${recentAchievements.map(ach => renderAchievementCard(ach)).join('')}
                  </div>`
                : '<p style="color:var(--text-secondary);text-align:center;padding:24px;">还没有解锁任何成就，开始学习吧！</p>'
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// 25. 成就页面渲染
// ============================================================
function renderAchievements() {
  const main = document.getElementById('app');
  if (!main) return;

  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = store.achievements.length;
  const percentage = totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0;

  const tierOrder = ['bronze', 'silver', 'gold', 'special'];
  const tierLabels = { bronze: '青铜', silver: '白银', gold: '黄金', special: '特殊' };

  main.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section__header">
          <span class="section__label">成就系统</span>
          <h2 class="section__title">我的成就</h2>
          <p class="section__description">通过学习和练习解锁成就，记录你的成长历程</p>
        </div>

        <div class="dashboard__grid" style="margin-bottom:32px;">
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">已解锁</span>
              <span class="stat-card__icon stat-card__icon--primary">\u{1F3C6}</span>
            </div>
            <div class="stat-card__value">${unlockedCount} / ${totalAchievements}</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">完成进度</span>
              <span class="stat-card__icon stat-card__icon--accent">\u{1F4CA}</span>
            </div>
            <div class="stat-card__value">${percentage}%</div>
            <div class="course-card__progress" style="margin-top:8px;">
              <div class="course-card__progress-bar">
                <div class="course-card__progress-fill" style="width:${percentage}%"></div>
              </div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">当前等级</span>
              <span class="stat-card__icon stat-card__icon--highlight">\u{2B50}</span>
            </div>
            <div class="stat-card__value">Lv.${getLevelInfo(getUserXP()).level}</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__header">
              <span class="stat-card__label">总XP</span>
              <span class="stat-card__icon stat-card__icon--success">\u{2728}</span>
            </div>
            <div class="stat-card__value">${getUserXP()}</div>
          </div>
        </div>

        <!-- 按等级分组展示 -->
        ${tierOrder.map(tier => {
          const tierAchievements = ACHIEVEMENTS.filter(a => a.tier === tier);
          if (tierAchievements.length === 0) return '';
          return `
            <div style="margin-bottom:32px;">
              <h3 style="margin-bottom:16px;color:var(--text-secondary);">${tierLabels[tier]}成就</h3>
              <div class="dashboard__grid">
                ${tierAchievements.map(ach => renderAchievementCard(ach)).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderAchievementCard(achievement) {
  const unlocked = isAchievementUnlocked(achievement.id);
  const cardClass = `achievement-card ${unlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'}`;
  const badgeClass = `achievement-badge achievement-badge--${achievement.tier}`;

  return `
    <div class="${cardClass}">
      <div class="achievement-card__inner">
        <div class="${badgeClass}">
          <span class="achievement-badge__icon">${unlocked ? achievement.icon : '\u{1F512}'}</span>
        </div>
        <h4 class="achievement-card__title">${escapeHtml(achievement.title)}</h4>
        <p class="achievement-card__description">${escapeHtml(achievement.description)}</p>
        ${unlocked ? '<span class="achievement-card__date">\u{2705} 已解锁</span>' : '<span class="achievement-card__date" style="color:var(--text-secondary);">未解锁</span>'}
      </div>
    </div>
  `;
}

// ============================================================
// 26. 事件委托系统
// ============================================================
function setupEventDelegation() {
  document.addEventListener('click', handleGlobalClick);
  document.addEventListener('submit', handleGlobalSubmit);
  document.addEventListener('input', handleGlobalInput);
}

function handleGlobalClick(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;

  const action = target.getAttribute('data-action');

  switch (action) {
    case 'navigate': {
      const href = target.getAttribute('data-href');
      if (href) {
        navigateTo(href);
        // 关闭移动端菜单
        closeMobileMenu();
      }
      break;
    }

    case 'toggle-theme': {
      toggleTheme();
      break;
    }

    case 'open-auth': {
      const mode = target.getAttribute('data-mode') || 'login';
      renderAuthModal(mode);
      break;
    }

    case 'close-modal': {
      closeModal();
      break;
    }

    case 'login': {
      const username = document.getElementById('auth-username');
      const password = document.getElementById('auth-password');
      if (username && password) {
        loginUser(username.value.trim(), password.value);
      }
      break;
    }

    case 'register': {
      const username = document.getElementById('auth-username');
      const nickname = document.getElementById('auth-nickname');
      const password = document.getElementById('auth-password');
      if (username && nickname && password) {
        registerUser(username.value.trim(), nickname.value.trim(), password.value);
      }
      break;
    }

    case 'logout': {
      logoutUser();
      break;
    }

    case 'select-lesson': {
      const courseId = target.getAttribute('data-course-id');
      const lessonId = target.getAttribute('data-lesson-id');
      if (courseId && lessonId) {
        navigateTo(`#/lesson/${courseId}/${lessonId}`);
      }
      break;
    }

    case 'filter-courses': {
      const difficulty = target.getAttribute('data-difficulty');
      store.courseFilter = difficulty;
      renderCourses();
      break;
    }

    case 'run-code': {
      handleRunCode();
      break;
    }

    case 'show-hint': {
      handleShowHint(target);
      break;
    }

    case 'select-option': {
      handleSelectOption(target);
      break;
    }

    case 'submit-quiz': {
      handleSubmitQuiz();
      break;
    }

    case 'next-question': {
      handleNextQuestion();
      break;
    }

    case 'retry-quiz': {
      handleRetryQuiz();
      break;
    }

    case 'complete-lesson': {
      const lessonId = target.getAttribute('data-lesson-id');
      const type = target.getAttribute('data-type');
      if (lessonId) {
        const xp = markLessonComplete(lessonId, type, undefined);
        showToast(`课时已完成！获得 ${xp} XP`, 'success');
        // 重新渲染当前页面
        handleRoute();
      }
      break;
    }

    case 'prev-lesson': {
      const courseId = target.getAttribute('data-course-id');
      const lessonId = target.getAttribute('data-lesson-id');
      if (courseId && lessonId) {
        navigateTo(`#/lesson/${courseId}/${lessonId}`);
      }
      break;
    }

    case 'next-lesson': {
      const courseId = target.getAttribute('data-course-id');
      const lessonId = target.getAttribute('data-lesson-id');
      if (courseId && lessonId) {
        navigateTo(`#/lesson/${courseId}/${lessonId}`);
      }
      break;
    }

    case 'toggle-mobile-menu': {
      toggleMobileMenu();
      break;
    }

    case 'close-toast': {
      const toast = target.closest('.toast');
      if (toast) {
        toast.classList.add('toast--fade-out');
        setTimeout(() => {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }
      break;
    }
  }
}

function handleGlobalSubmit(e) {
  const form = e.target.closest('#auth-form');
  if (form) {
    e.preventDefault();
    const mode = form.querySelector('[data-action="login"]')
      ? 'login'
      : form.querySelector('[data-action="register"]')
        ? 'register'
        : null;

    if (mode === 'login') {
      const username = document.getElementById('auth-username');
      const password = document.getElementById('auth-password');
      if (username && password) {
        loginUser(username.value.trim(), password.value);
      }
    } else if (mode === 'register') {
      const username = document.getElementById('auth-username');
      const nickname = document.getElementById('auth-nickname');
      const password = document.getElementById('auth-password');
      if (username && nickname && password) {
        registerUser(username.value.trim(), nickname.value.trim(), password.value);
      }
    }
  }
}

function handleGlobalInput(e) {
  // 代码编辑器行号同步
  if (e.target.id === 'code-textarea') {
    updateLineNumbers(e.target);
  }
}

// ============================================================
// 27. 事件处理函数
// ============================================================
function handleRunCode() {
  const textarea = document.getElementById('code-textarea');
  const outputPanel = document.getElementById('code-output-panel');
  const outputContent = document.getElementById('code-output-content');

  if (!textarea || !outputPanel || !outputContent) return;

  const code = textarea.value;

  if (!store.pyodideReady) {
    outputPanel.style.display = 'block';
    outputContent.className = 'code-editor__output-content code-editor__output-content--error';
    outputContent.textContent = 'Python运行环境尚未加载完成，请稍后再试...';
    return;
  }

  outputPanel.style.display = 'block';
  outputContent.className = 'code-editor__output-content';
  outputContent.textContent = '正在执行...';

  runPythonCode(code).then(result => {
    if (result.success) {
      outputContent.className = 'code-editor__output-content code-editor__output-content--success';
    } else {
      outputContent.className = 'code-editor__output-content code-editor__output-content--error';
    }
    outputContent.textContent = result.output;
  });
}

function handleShowHint(target) {
  const lessonId = target.getAttribute('data-lesson-id');
  if (!lessonId || !COURSES_DATA) return;

  let lesson = null;
  COURSES_DATA.forEach(course => {
    const found = course.lessons.find(l => l.id === lessonId);
    if (found) lesson = found;
  });

  if (!lesson || !lesson.hints || lesson.hints.length === 0) {
    showToast('暂无可用提示', 'info');
    return;
  }

  const hintIndex = Math.floor(Math.random() * lesson.hints.length);
  const hint = lesson.hints[hintIndex];

  showToast(hint, 'info', '\u{1F4A1} 提示');
}

function handleSelectOption(target) {
  const quiz = store.currentQuiz;
  if (!quiz || quiz.submitted) return;

  // 如果当前题目已经提交了答案，不允许再选
  if (quiz.results[quiz.currentIndex] !== undefined) return;

  const index = parseInt(target.getAttribute('data-index'), 10);
  if (isNaN(index)) return;

  quiz.answers[quiz.currentIndex] = index;

  // 重新渲染测验区域
  const quizContainer = document.querySelector('.quiz');
  if (quizContainer) {
    quizContainer.innerHTML = renderQuizQuestion().replace(/<div class="quiz">/, '').replace(/<\/div>\s*$/, '');
    // 更简单的方式：直接重新渲染整个课程内容
    refreshQuizDisplay();
  }
}

function refreshQuizDisplay() {
  const quizContainer = document.querySelector('.quiz');
  if (!quizContainer) return;

  // 重新渲染整个quiz
  const temp = document.createElement('div');
  temp.innerHTML = renderQuizQuestion();
  const newQuiz = temp.querySelector('.quiz');
  if (newQuiz && quizContainer.parentNode) {
    quizContainer.parentNode.replaceChild(newQuiz, quizContainer);
  }
}

function handleSubmitQuiz() {
  const quiz = store.currentQuiz;
  if (!quiz) return;

  const q = quiz.questions[quiz.currentIndex];
  const selectedAnswer = quiz.answers[quiz.currentIndex];

  if (selectedAnswer === undefined) {
    showToast('请先选择一个答案', 'warning');
    return;
  }

  // 如果当前题目已经评判过了，且是最后一题，则提交整个测验
  if (quiz.results[quiz.currentIndex] !== undefined) {
    if (quiz.currentIndex >= quiz.questions.length - 1) {
      // 提交整个测验
      finishQuiz();
    }
    return;
  }

  // 评判当前题目
  const isCorrect = selectedAnswer === q.correct;
  quiz.results[quiz.currentIndex] = isCorrect;

  refreshQuizDisplay();
}

function handleNextQuestion() {
  const quiz = store.currentQuiz;
  if (!quiz) return;

  if (quiz.currentIndex < quiz.questions.length - 1) {
    quiz.currentIndex++;
    refreshQuizDisplay();
  }
}

function finishQuiz() {
  const quiz = store.currentQuiz;
  if (!quiz) return;

  quiz.submitted = true;

  const totalQuestions = quiz.questions.length;
  const correctCount = quiz.results.filter(r => r).length;
  const score = Math.round((correctCount / totalQuestions) * 100);

  // 记录进度
  markLessonComplete(quiz.lessonId, 'quiz', score);

  refreshQuizDisplay();
}

function handleRetryQuiz() {
  const quiz = store.currentQuiz;
  if (!quiz) return;

  quiz.currentIndex = 0;
  quiz.answers = [];
  quiz.submitted = false;
  quiz.results = [];

  refreshQuizDisplay();
}

// ============================================================
// 28. 代码编辑器辅助
// ============================================================
function updateLineNumbers(textarea) {
  const lineNumbersContainer = document.getElementById('code-line-numbers');
  if (!lineNumbersContainer) return;

  const lines = textarea.value.split('\n').length;
  let html = '';
  for (let i = 1; i <= lines; i++) {
    html += `<span class="code-editor__line-number">${i}</span>`;
  }
  lineNumbersContainer.innerHTML = html;
}

function initCodeEditor() {
  const textarea = document.getElementById('code-textarea');
  if (textarea) {
    updateLineNumbers(textarea);

    // 同步滚动
    textarea.addEventListener('scroll', () => {
      const lineNumbers = document.getElementById('code-line-numbers');
      if (lineNumbers) {
        lineNumbers.scrollTop = textarea.scrollTop;
      }
    });

    // Tab键支持
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        updateLineNumbers(textarea);
      }
    });
  }
}

// ============================================================
// 29. 移动端菜单
// ============================================================
function toggleMobileMenu() {
  store.mobileMenuOpen = !store.mobileMenuOpen;
  const menu = document.querySelector('.navbar__mobile-menu');
  const toggle = document.querySelector('.navbar__mobile-toggle');
  if (menu) {
    menu.classList.toggle('is-open', store.mobileMenuOpen);
  }
  if (toggle) {
    toggle.classList.toggle('is-open', store.mobileMenuOpen);
  }
}

function closeMobileMenu() {
  store.mobileMenuOpen = false;
  const menu = document.querySelector('.navbar__mobile-menu');
  const toggle = document.querySelector('.navbar__mobile-toggle');
  if (menu) menu.classList.remove('is-open');
  if (toggle) toggle.classList.remove('is-open');
}

// ============================================================
// 30. MutationObserver - 初始化代码编辑器
// ============================================================
function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // 检查是否包含代码编辑器
            if (node.querySelector && node.querySelector('.code-editor__code')) {
              initCodeEditor();
            }
            if (node.classList && node.classList.contains('code-editor__code')) {
              initCodeEditor();
            }
          }
        });
      }
    });
  });

  const app = document.getElementById('app');
  if (app) {
    observer.observe(app, { childList: true, subtree: true });
  }
}

// ============================================================
// 31. 初始化
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  loadTheme();
  loadUser();
  renderNavbar();
  renderFooter();
  setupRouter();
  setupEventDelegation();
  setupMutationObserver();

  // 后台预加载 Pyodide，不阻塞页面渲染
  initPyodide();
});
