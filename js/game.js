/**
 * 数据冒险家 - 教育平台动画小游戏模块
 * 纯 JavaScript + HTML5 Canvas 实现
 * 角色跳跃收集正确答案，躲避错误答案
 */

;(function () {
  'use strict';

  /* ========== 颜色常量 ========== */
  var COLORS = {
    primary:    '#1a237e',
    accent:     '#00bcd4',
    highlight:  '#ff6f00',
    correct:    '#4caf50',
    correctGlow:'#66bb6a',
    wrong:      '#f44336',
    wrongGlow:  '#ef5350',
    bg:         '#87ceeb',
    ground:     '#4caf50',
    groundDark: '#388e3c',
    skyTop:     '#4fc3f7',
    skyBottom:  '#b3e5fc',
    white:      '#ffffff',
    black:      '#333333',
    cloud:      '#ffffff',
    gold:       '#ffd54f',
    textDark:   '#1a237e',
    textLight:  '#ffffff',
    skin:       '#ffcc80',
    hair:       '#5d4037',
    shirt:      '#42a5f5',
    pants:      '#1565c0',
    shoe:       '#795548',
    buttonBg:   'rgba(0,0,0,0.35)',
    overlay:    'rgba(0,0,0,0.55)',
    panelBg:    'rgba(255,255,255,0.92)',
  };

  /* ========== 工具函数 ========== */
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function rand(a, b) { return Math.random() * (b - a) + a; }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }

  /** AABB 矩形碰撞检测 */
  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  /** 检测是否移动端 */
  function isMobile() {
    if (typeof window === 'undefined') return false;
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
  }

  /* ========== 粒子系统 ========== */
  function Particle(x, y, color, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type; // 'star' | 'spark' | 'score'
    this.life = 1;
    this.vx = rand(-3, 3);
    this.vy = rand(-6, -1);
    this.size = rand(3, 7);
    this.text = type === 'score' ? '+10 XP' : '';
    this.gravity = 0.12;
    this.decay = rand(0.015, 0.03);
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= this.decay;
  };

  Particle.prototype.draw = function (ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    if (this.type === 'score') {
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = COLORS.gold;
      ctx.textAlign = 'center';
      ctx.fillText(this.text, this.x, this.y);
    } else if (this.type === 'star') {
      drawStar(ctx, this.x, this.y, 5, this.size, this.size * 0.5, this.color);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
    ctx.restore();
  };

  /** 绘制五角星 */
  function drawStar(ctx, cx, cy, spikes, outerR, innerR, color) {
    outerR = Math.max(1, outerR);
    innerR = Math.max(0.5, innerR);
    var rot = -Math.PI / 2;
    var step = Math.PI / spikes;
    ctx.beginPath();
    for (var i = 0; i < spikes * 2; i++) {
      var r = i % 2 === 0 ? outerR : innerR;
      var a = rot + step * i;
      if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  /* ========== 云朵 ========== */
  function Cloud(x, y, scale) {
    this.x = x;
    this.y = y;
    this.scale = scale || 1;
    this.speed = rand(0.2, 0.6);
  }

  Cloud.prototype.update = function (canvasW) {
    this.x += this.speed;
    if (this.x > canvasW + 80) this.x = -100;
  };

  Cloud.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.fillStyle = COLORS.cloud;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.arc(25, -8, 20, 0, Math.PI * 2);
    ctx.arc(50, 0, 25, 0, Math.PI * 2);
    ctx.arc(20, 8, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  /* ========== 答案方块 ========== */
  function AnswerBlock(x, y, w, h, text, isCorrect, index) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.isCorrect = isCorrect;
    this.index = index;
    this.collected = false;
    this.bobOffset = rand(0, Math.PI * 2);
    this.bobSpeed = 0.03;
    this.glowPhase = 0;
  }

  AnswerBlock.prototype.update = function () {
    this.bobOffset += this.bobSpeed;
    this.glowPhase += 0.05;
  };

  AnswerBlock.prototype.draw = function (ctx) {
    if (this.collected) return;
    var bobY = this.y + Math.sin(this.bobOffset) * 4;
    var glowAlpha = 0.3 + Math.sin(this.glowPhase) * 0.15;

    ctx.save();
    // 发光效果
    if (this.isCorrect) {
      ctx.shadowColor = COLORS.correct;
      ctx.shadowBlur = 16;
    } else {
      ctx.shadowColor = COLORS.wrong;
      ctx.shadowBlur = 10;
    }

    // 方块主体（圆角矩形）
    var r = 8;
    var bx = this.x, by = bobY, bw = this.w, bh = this.h;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.lineTo(bx + bw - r, by);
    ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
    ctx.lineTo(bx + bw, by + bh - r);
    ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
    ctx.lineTo(bx + r, by + bh);
    ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
    ctx.lineTo(bx, by + r);
    ctx.quadraticCurveTo(bx, by, bx + r, by);
    ctx.closePath();

    var baseColor = this.isCorrect ? COLORS.correct : COLORS.wrong;
    var grad = ctx.createLinearGradient(bx, by, bx, by + bh);
    grad.addColorStop(0, baseColor);
    grad.addColorStop(1, this.isCorrect ? COLORS.correctGlow : COLORS.wrongGlow);
    ctx.fillStyle = grad;
    ctx.fill();

    // 高光
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,' + glowAlpha + ')';
    ctx.fillRect(bx + 4, by + 3, bw - 8, bh * 0.35);

    // 文字
    ctx.fillStyle = COLORS.white;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, bx + bw / 2, by + bh / 2 + 1);
    ctx.restore();
  };

  AnswerBlock.prototype.getHitbox = function () {
    return { x: this.x, y: this.y + Math.sin(this.bobOffset) * 4, w: this.w, h: this.h };
  };

  /* ========== 玩家角色 ========== */
  function Player(x, y) {
    this.x = x;
    this.y = y;
    this.w = 28;
    this.h = 40;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    this.jumpForce = -10;
    this.gravity = 0.45;
    this.grounded = false;
    this.facingRight = true;
    this.frame = 0;       // 动画帧
    this.frameTimer = 0;
    this.lives = 3;
    this.invincible = 0;  // 无敌时间（帧数）
  }

  Player.prototype.update = function (keys, groundY, canvasW) {
    // 水平移动
    var moving = false;
    if (keys.left) { this.vx = -this.speed; this.facingRight = false; moving = true; }
    else if (keys.right) { this.vx = this.speed; this.facingRight = true; moving = true; }
    else { this.vx *= 0.7; }

    // 跳跃
    if (keys.jump && this.grounded) {
      this.vy = this.jumpForce;
      this.grounded = false;
    }

    // 重力
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // 地面碰撞
    if (this.y + this.h >= groundY) {
      this.y = groundY - this.h;
      this.vy = 0;
      this.grounded = true;
    }

    // 边界
    this.x = clamp(this.x, 0, canvasW - this.w);

    // 动画帧切换
    if (moving && this.grounded) {
      this.frameTimer++;
      if (this.frameTimer > 8) { this.frame = this.frame === 0 ? 1 : 0; this.frameTimer = 0; }
    } else {
      this.frame = 0;
      this.frameTimer = 0;
    }

    // 无敌倒计时
    if (this.invincible > 0) this.invincible--;
  };

  Player.prototype.draw = function (ctx) {
    // 无敌闪烁
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) return;

    ctx.save();
    var cx = this.x + this.w / 2;
    var cy = this.y;

    // 翻转方向
    if (!this.facingRight) {
      ctx.translate(cx, 0);
      ctx.scale(-1, 1);
      ctx.translate(-cx, 0);
    }

    // 身体偏移（跑步动画）
    var legOffset = this.frame === 1 ? 3 : 0;

    // 头发
    ctx.fillStyle = COLORS.hair;
    ctx.beginPath();
    ctx.arc(cx, cy + 8, 10, 0, Math.PI * 2);
    ctx.fill();

    // 脸
    ctx.fillStyle = COLORS.skin;
    ctx.beginPath();
    ctx.arc(cx, cy + 10, 8, 0, Math.PI * 2);
    ctx.fill();

    // 眼睛
    ctx.fillStyle = COLORS.black;
    ctx.beginPath();
    ctx.arc(cx + 3, cy + 9, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // 嘴巴
    ctx.strokeStyle = COLORS.black;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx + 4, cy + 13, 2, 0, Math.PI);
    ctx.stroke();

    // 身体（衬衫）
    ctx.fillStyle = COLORS.shirt;
    ctx.fillRect(cx - 7, cy + 17, 14, 12);

    // 裤子
    ctx.fillStyle = COLORS.pants;
    ctx.fillRect(cx - 7, cy + 28, 6, 8 + legOffset);
    ctx.fillRect(cx + 1, cy + 28, 6, 8 - legOffset);

    // 鞋子
    ctx.fillStyle = COLORS.shoe;
    ctx.fillRect(cx - 8, cy + 35 + legOffset, 7, 4);
    ctx.fillRect(cx + 1, cy + 35 - legOffset, 7, 4);

    ctx.restore();
  };

  Player.prototype.getHitbox = function () {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  };

  /* ========== 游戏引擎 ========== */
  function GameEngine(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.questions = options.questions || [];
    this.onCorrect = options.onCorrect || function () {};
    this.onWrong = options.onWrong || function () {};
    this.onComplete = options.onComplete || function () {};
    this.theme = options.theme || {};
    this._initialized = false;

    // 游戏状态: 'start' | 'playing' | 'paused' | 'gameover' | 'complete'
    this.state = 'start';
    this.score = 0;
    this.currentQ = 0;
    this.totalQ = this.questions.length;
    this.correctCount = 0;

    // 游戏对象
    this.player = null;
    this.blocks = [];
    this.particles = [];
    this.clouds = [];
    this.keys = { left: false, right: false, jump: false };
    this.animId = null;
    this.lastTime = 0;
    this._mobile = isMobile();
    this._touchBtns = { left: false, right: false, jump: false };

    // UI 按钮区域（用于点击检测）
    this._startBtn = { x: 0, y: 0, w: 0, h: 0 };
    this._restartBtn = { x: 0, y: 0, w: 0, h: 0 };

    this._init();
  }

  GameEngine.prototype._init = function () {
    var self = this;
    var c = this.canvas;

    // 初始化云朵
    this.clouds = [];
    for (var i = 0; i < 5; i++) {
      this.clouds.push(new Cloud(rand(0, c.width), rand(20, c.height * 0.3), rand(0.5, 1.2)));
    }

    // 键盘事件
    this._onKeyDown = function (e) {
      self._handleKey(e, true);
    };
    this._onKeyUp = function (e) {
      self._handleKey(e, false);
    };
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);

    // 鼠标/触摸点击（用于按钮）
    this._onClick = function (e) {
      self._handleClick(e);
    };
    c.addEventListener('click', this._onClick);
    c.addEventListener('touchstart', function (e) {
      e.preventDefault();
      self._handleTouch(e);
    }, { passive: false });
    c.addEventListener('touchend', function (e) {
      e.preventDefault();
      self._handleTouchEnd(e);
    }, { passive: false });
  };

  GameEngine.prototype._handleKey = function (e, down) {
    switch (e.code) {
      case 'ArrowLeft': case 'KeyA': this.keys.left = down; e.preventDefault(); break;
      case 'ArrowRight': case 'KeyD': this.keys.right = down; e.preventDefault(); break;
      case 'Space': case 'ArrowUp': case 'KeyW':
        this.keys.jump = down; e.preventDefault(); break;
      case 'KeyP':
        if (down) { if (this.state === 'playing') this.pause(); else if (this.state === 'paused') this.resume(); }
        break;
    }
  };

  GameEngine.prototype._handleClick = function (e) {
    var rect = this.canvas.getBoundingClientRect();
    var x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
    var y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
    this._checkButtons(x, y);
  };

  GameEngine.prototype._handleTouch = function (e) {
    if (!this._mobile) return;
    var rect = this.canvas.getBoundingClientRect();
    var scaleX = this.canvas.width / rect.width;
    var scaleY = this.canvas.height / rect.height;
    for (var i = 0; i < e.touches.length; i++) {
      var tx = (e.touches[i].clientX - rect.left) * scaleX;
      var ty = (e.touches[i].clientY - rect.top) * scaleY;
      // 虚拟按钮区域检测
      if (this.state === 'playing') {
        var btnY = this.canvas.height - 60;
        if (tx < 80 && ty > btnY) this._touchBtns.left = true;
        else if (tx > 80 && tx < 160 && ty > btnY) this._touchBtns.right = true;
        else if (tx > this.canvas.width - 120 && ty > btnY) this._touchBtns.jump = true;
      }
      this._checkButtons(tx, ty);
    }
  };

  GameEngine.prototype._handleTouchEnd = function () {
    this._touchBtns.left = false;
    this._touchBtns.right = false;
    this._touchBtns.jump = false;
  };

  GameEngine.prototype._checkButtons = function (x, y) {
    var btn;
    if (this.state === 'start') {
      btn = this._startBtn;
      if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
        this.start();
      }
    } else if (this.state === 'gameover' || this.state === 'complete') {
      btn = this._restartBtn;
      if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
        this._restart();
      }
    }
  };

  GameEngine.prototype._getEffectiveKeys = function () {
    return {
      left: this.keys.left || this._touchBtns.left,
      right: this.keys.right || this._touchBtns.right,
      jump: this.keys.jump || this._touchBtns.jump,
    };
  };

  /** 生成当前题目的答案方块 */
  GameEngine.prototype._spawnBlocks = function () {
    if (this.currentQ >= this.totalQ) return;
    var q = this.questions[this.currentQ];
    var c = this.canvas;
    var count = q.options.length;
    var bw = 80, bh = 40;
    var gap = 20;
    var totalW = count * bw + (count - 1) * gap;
    var startX = (c.width - totalW) / 2;
    var baseY = c.height * 0.55;

    this.blocks = [];
    for (var i = 0; i < count; i++) {
      var bx = startX + i * (bw + gap);
      var by = baseY + rand(-20, 20);
      var isCorrect = (i === q.correct);
      this.blocks.push(new AnswerBlock(bx, by, bw, bh, q.options[i], isCorrect, i));
    }
  };

  /** 爆发粒子 */
  GameEngine.prototype._emitParticles = function (x, y, type) {
    var colors = type === 'correct'
      ? [COLORS.correct, COLORS.gold, COLORS.accent]
      : [COLORS.wrong, COLORS.highlight, '#ff8a80'];
    var pType = type === 'correct' ? 'star' : 'spark';
    for (var i = 0; i < 15; i++) {
      this.particles.push(new Particle(x, y, colors[randInt(0, colors.length - 1)], pType));
    }
    // 得分飘字
    if (type === 'correct') {
      var sp = new Particle(x, y - 20, COLORS.gold, 'score');
      sp.vy = -2;
      sp.gravity = 0;
      sp.decay = 0.012;
      this.particles.push(sp);
    }
  };

  /* --- 公共方法 --- */

  GameEngine.prototype.start = function () {
    if (this.questions.length === 0) return;
    this._initialized = true;
    this.state = 'playing';
    this.score = 0;
    this.currentQ = 0;
    this.correctCount = 0;
    this.particles = [];

    var c = this.canvas;
    var groundY = c.height - 50;
    this.player = new Player(c.width / 2 - 14, groundY - 40);
    this.player.lives = 3;
    this._spawnBlocks();
    this._loop();
  };

  GameEngine.prototype.pause = function () {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = null;
    this._draw();
  };

  GameEngine.prototype.resume = function () {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this._loop();
  };

  GameEngine.prototype.stop = function () {
    this.state = 'start';
    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = null;
    // 移除事件监听
    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
    this.canvas.removeEventListener('click', this._onClick);
  };

  GameEngine.prototype.getState = function () {
    return {
      state: this.state,
      score: this.score,
      currentQ: this.currentQ + 1,
      totalQ: this.totalQ,
      lives: this.player ? this.player.lives : 3,
      correctCount: this.correctCount,
    };
  };

  GameEngine.prototype._restart = function () {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = null;
    this.start();
  };

  /** 进入下一题 */
  GameEngine.prototype._nextQuestion = function () {
    this.currentQ++;
    if (this.currentQ >= this.totalQ) {
      this.state = 'complete';
      this.onComplete(this.score, this.totalQ);
      this._draw();
      return;
    }
    this._spawnBlocks();
  };

  /* --- 游戏循环 --- */

  GameEngine.prototype._loop = function () {
    var self = this;
    this.animId = requestAnimationFrame(function () {
      self._update();
      self._draw();
      if (self.state === 'playing') self._loop();
    });
  };

  GameEngine.prototype._update = function () {
    var c = this.canvas;
    var groundY = c.height - 50;
    var keys = this._getEffectiveKeys();

    // 更新云朵
    for (var i = 0; i < this.clouds.length; i++) this.clouds[i].update(c.width);

    // 更新玩家
    this.player.update(keys, groundY, c.width);

    // 更新方块
    for (var i = 0; i < this.blocks.length; i++) this.blocks[i].update();

    // 更新粒子
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    // 碰撞检测：玩家 vs 方块
    var pBox = this.player.getHitbox();
    for (var i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      if (b.collected) continue;
      if (aabb(pBox, b.getHitbox())) {
        b.collected = true;
        if (b.isCorrect) {
          // 正确答案
          this.score += 10;
          this.correctCount++;
          this._emitParticles(b.x + b.w / 2, b.y + b.h / 2, 'correct');
          this.onCorrect(this.currentQ);
          // 短暂延迟后进入下一题
          var self = this;
          setTimeout(function () { self._nextQuestion(); }, 600);
        } else {
          // 错误答案
          this.player.lives--;
          this.player.invincible = 60; // 1秒无敌
          this._emitParticles(b.x + b.w / 2, b.y + b.h / 2, 'wrong');
          this.onWrong(this.currentQ);
          if (this.player.lives <= 0) {
            this.state = 'gameover';
            this.onComplete(this.score, this.totalQ);
          }
        }
      }
    }
  };

  /* --- 渲染 --- */

  GameEngine.prototype._draw = function () {
    var ctx = this.ctx;
    var c = this.canvas;
    ctx.clearRect(0, 0, c.width, c.height);

    switch (this.state) {
      case 'start':    renderGameStart(ctx, c, this); break;
      case 'playing':  renderGamePlaying(ctx, c, this); break;
      case 'paused':   renderGamePaused(ctx, c, this); break;
      case 'gameover': renderGameOver(ctx, c, this); break;
      case 'complete': renderGameComplete(ctx, c, this); break;
    }
  };

  /* ========== 渲染函数 ========== */

  /** 绘制渐变天空背景 + 云朵 */
  function drawSkyAndClouds(ctx, c, clouds) {
    var grad = ctx.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, COLORS.skyTop);
    grad.addColorStop(1, COLORS.skyBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    for (var i = 0; i < clouds.length; i++) clouds[i].draw(ctx);
  }

  /** 绘制地面 */
  function drawGround(ctx, c) {
    var groundY = c.height - 50;
    // 草地
    var gGrad = ctx.createLinearGradient(0, groundY, 0, c.height);
    gGrad.addColorStop(0, COLORS.ground);
    gGrad.addColorStop(1, COLORS.groundDark);
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, groundY, c.width, 50);
    // 草地纹理线
    ctx.strokeStyle = '#66bb6a';
    ctx.lineWidth = 2;
    for (var x = 0; x < c.width; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x + 4, groundY - 6);
      ctx.stroke();
    }
  }

  /** 绘制 HUD */
  function drawHUD(ctx, c, engine) {
    var q = engine.questions[engine.currentQ];
    // 题号 - 左上
    ctx.fillStyle = COLORS.textDark;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('第 ' + (engine.currentQ + 1) + ' / ' + engine.totalQ + ' 题', 12, 12);

    // 生命值 - 右上
    ctx.textAlign = 'right';
    var hearts = '';
    for (var i = 0; i < 3; i++) {
      hearts += i < engine.player.lives ? '\u2764\u2764' : '\u2661\u2661';
    }
    ctx.font = '16px sans-serif';
    ctx.fillText(hearts, c.width - 12, 12);

    // 得分 - 右上（生命下方）
    ctx.fillStyle = COLORS.highlight;
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('得分: ' + engine.score, c.width - 12, 34);

    // 题目文字 - 顶部中间
    if (q) {
      ctx.fillStyle = COLORS.textDark;
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      // 背景条
      var tw = ctx.measureText(q.question).width + 30;
      var tx = (c.width - tw) / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      roundRect(ctx, tx, 6, tw, 32, 8);
      ctx.fill();
      ctx.fillStyle = COLORS.textDark;
      ctx.fillText(q.question, c.width / 2, 12);
    }

    // 控制提示 - 底部
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    var hint = '\u2190 \u2192 \u79fb\u52a8 | \u7a7a\u683c \u8df3\u8dc3 | P \u6682\u505c';
    ctx.fillText(hint, c.width / 2, c.height - 4);
  }

  /** 绘制移动端虚拟按钮 */
  function drawMobileControls(ctx, c) {
    var btnY = c.height - 70;
    var btnR = 28;

    ctx.globalAlpha = 0.5;
    // 左按钮
    ctx.fillStyle = COLORS.buttonBg;
    ctx.beginPath();
    ctx.arc(50, btnY + 20, btnR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.white;
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u25C0', 50, btnY + 20);

    // 右按钮
    ctx.fillStyle = COLORS.buttonBg;
    ctx.beginPath();
    ctx.arc(120, btnY + 20, btnR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.white;
    ctx.fillText('\u25B6', 120, btnY + 20);

    // 跳跃按钮
    ctx.fillStyle = COLORS.buttonBg;
    ctx.beginPath();
    ctx.arc(c.width - 60, btnY + 20, btnR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.white;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('\u8df3', c.width - 60, btnY + 20);

    ctx.globalAlpha = 1;
  }

  /** 圆角矩形路径 */
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /** 绘制居中按钮，返回按钮区域 */
  function drawButton(ctx, x, y, w, h, text) {
    ctx.save();
    // 按钮阴影
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    var grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, COLORS.accent);
    grad.addColorStop(1, COLORS.primary);
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, w, h, 12);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = COLORS.white;
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w / 2, y + h / 2);
    ctx.restore();
    return { x: x, y: y, w: w, h: h };
  }

  /** 开始画面 */
  function renderGameStart(ctx, canvas, engine) {
    drawSkyAndClouds(ctx, canvas, engine.clouds);
    drawGround(ctx, canvas);

    // 半透明遮罩
    ctx.fillStyle = COLORS.overlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 标题面板
    var pw = Math.min(400, canvas.width - 40);
    var ph = 260;
    var px = (canvas.width - pw) / 2;
    var py = (canvas.height - ph) / 2 - 20;

    ctx.fillStyle = COLORS.panelBg;
    roundRect(ctx, px, py, pw, ph, 16);
    ctx.fill();

    // 标题
    ctx.fillStyle = COLORS.primary;
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u6570\u636e\u5192\u9669\u5bb6', canvas.width / 2, py + 50);

    // 副标题
    ctx.fillStyle = COLORS.accent;
    ctx.font = '16px sans-serif';
    ctx.fillText('\u8df3\u8dc3\u6536\u96c6\u6b63\u786e\u7b54\u6848\uff0c\u8eb2\u907f\u9519\u8bef\u7b54\u6848\uff01', canvas.width / 2, py + 90);

    // 说明
    ctx.fillStyle = COLORS.black;
    ctx.font = '14px sans-serif';
    ctx.fillText('\u2190 \u2192 / A D \u79fb\u52a8  |  \u7a7a\u683c / \u2191 \u8df3\u8dc3', canvas.width / 2, py + 130);
    ctx.fillText('\u7eff\u8272\u65b9\u5757 = \u6b63\u786e\u7b54\u6848  |  \u7ea2\u8272\u65b9\u5757 = \u9519\u8bef\u7b54\u6848', canvas.width / 2, py + 155);
    ctx.fillText('\u5171 3 \u6761\u547d\uff0c\u78b0\u5230\u9519\u8bef\u7b54\u6848\u4f1a\u6263\u547d\u54e6\uff01', canvas.width / 2, py + 180);

    // 开始按钮
    var bw = 160, bh = 48;
    var bx = (canvas.width - bw) / 2;
    var by = py + ph - 65;
    engine._startBtn = drawButton(ctx, bx, by, bw, bh, '\u5f00\u59cb\u6e38\u620f');
  }

  /** 游戏进行中 */
  function renderGamePlaying(ctx, canvas, engine) {
    drawSkyAndClouds(ctx, canvas, engine.clouds);
    drawGround(ctx, canvas);

    // 方块
    for (var i = 0; i < engine.blocks.length; i++) engine.blocks[i].draw(ctx);

    // 玩家
    if (engine.player) engine.player.draw(ctx);

    // 粒子
    for (var i = 0; i < engine.particles.length; i++) engine.particles[i].draw(ctx);

    // HUD
    drawHUD(ctx, canvas, engine);

    // 移动端虚拟按钮
    if (engine._mobile) drawMobileControls(ctx, canvas);
  }

  /** 暂停画面 */
  function renderGamePaused(ctx, canvas, engine) {
    renderGamePlaying(ctx, canvas, engine);

    // 遮罩
    ctx.fillStyle = COLORS.overlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 暂停面板
    var pw = 240, ph = 100;
    var px = (canvas.width - pw) / 2;
    var py = (canvas.height - ph) / 2;
    ctx.fillStyle = COLORS.panelBg;
    roundRect(ctx, px, py, pw, ph, 12);
    ctx.fill();

    ctx.fillStyle = COLORS.primary;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u6682\u505c\u4e2d', canvas.width / 2, py + 35);

    ctx.fillStyle = COLORS.accent;
    ctx.font = '16px sans-serif';
    ctx.fillText('\u6309 P \u7ee7\u7eed\u6e38\u620f', canvas.width / 2, py + 70);
  }

  /** 游戏结束（生命耗尽） */
  function renderGameOver(ctx, canvas, engine) {
    drawSkyAndClouds(ctx, canvas, engine.clouds);
    drawGround(ctx, canvas);

    ctx.fillStyle = COLORS.overlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var pw = Math.min(360, canvas.width - 40);
    var ph = 220;
    var px = (canvas.width - pw) / 2;
    var py = (canvas.height - ph) / 2 - 10;

    ctx.fillStyle = COLORS.panelBg;
    roundRect(ctx, px, py, pw, ph, 16);
    ctx.fill();

    ctx.fillStyle = COLORS.wrong;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u6e38\u620f\u7ed3\u675f', canvas.width / 2, py + 40);

    ctx.fillStyle = COLORS.black;
    ctx.font = '18px sans-serif';
    ctx.fillText('\u5f97\u5206: ' + engine.score, canvas.width / 2, py + 85);
    var rate = engine.totalQ > 0 ? Math.round(engine.correctCount / engine.totalQ * 100) : 0;
    ctx.fillText('\u6b63\u786e\u7387: ' + rate + '%', canvas.width / 2, py + 115);
    ctx.fillText('\u5b8c\u6210\u9898\u6570: ' + engine.correctCount + ' / ' + engine.totalQ, canvas.width / 2, py + 145);

    var bw = 160, bh = 48;
    var bx = (canvas.width - bw) / 2;
    var by = py + ph - 65;
    engine._restartBtn = drawButton(ctx, bx, by, bw, bh, '\u518d\u6765\u4e00\u6b21');
  }

  /** 游戏完成（全部答完） */
  function renderGameComplete(ctx, canvas, engine) {
    drawSkyAndClouds(ctx, canvas, engine.clouds);
    drawGround(ctx, canvas);

    // 庆祝粒子
    for (var i = 0; i < engine.particles.length; i++) engine.particles[i].draw(ctx);

    ctx.fillStyle = COLORS.overlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var pw = Math.min(360, canvas.width - 40);
    var ph = 240;
    var px = (canvas.width - pw) / 2;
    var py = (canvas.height - ph) / 2 - 10;

    ctx.fillStyle = COLORS.panelBg;
    roundRect(ctx, px, py, pw, ph, 16);
    ctx.fill();

    ctx.fillStyle = COLORS.correct;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u606d\u559c\u901a\u5173\uff01', canvas.width / 2, py + 40);

    ctx.fillStyle = COLORS.black;
    ctx.font = '18px sans-serif';
    ctx.fillText('\u5f97\u5206: ' + engine.score, canvas.width / 2, py + 85);
    var rate = engine.totalQ > 0 ? Math.round(engine.correctCount / engine.totalQ * 100) : 0;
    ctx.fillText('\u6b63\u786e\u7387: ' + rate + '%', canvas.width / 2, py + 115);

    // 评价
    var comment = rate >= 90 ? '\u592a\u68d2\u4e86\uff01' : rate >= 70 ? '\u8868\u73b0\u4e0d\u9519\uff01' : rate >= 50 ? '\u7ee7\u7eed\u52a0\u6cb9\uff01' : '\u518d\u7ec3\u4e60\u4e00\u4e0b\u5427\uff01';
    ctx.fillStyle = COLORS.highlight;
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(comment, canvas.width / 2, py + 150);

    var bw = 160, bh = 48;
    var bx = (canvas.width - bw) / 2;
    var by = py + ph - 65;
    engine._restartBtn = drawButton(ctx, bx, by, bw, bh, '\u518d\u6765\u4e00\u6b21');
  }

  /* ========== 全局导出 ========== */
  window.DataLearnGame = {
    /**
     * 在指定容器中创建 Canvas 并初始化游戏
     * @param {string} containerId - HTML 容器元素 ID
     * @param {Array} questions - 题目数组 [{ question, options, correct }]
     * @param {Object} callbacks - 回调 { onCorrect, onWrong, onComplete }
     * @returns {GameEngine} 游戏引擎实例
     */
    create: function (containerId, questions, callbacks) {
      var container = document.getElementById(containerId);
      if (!container) {
        console.error('\u6570\u636e\u5192\u9669\u5bb6: \u627e\u4e0d\u5230\u5bb9\u5668\u5143\u7d20 #' + containerId);
        return null;
      }

      // 创建 Canvas
      var canvas = document.createElement('canvas');
      canvas.width = Math.min(800, container.clientWidth || 800);
      canvas.height = Math.round(canvas.width * 0.6);
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.borderRadius = '12px';
      canvas.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
      container.appendChild(canvas);

      // 初始化引擎
      var engine = new GameEngine(canvas, {
        questions: questions || [],
        onCorrect: (callbacks && callbacks.onCorrect) || function () {},
        onWrong:   (callbacks && callbacks.onWrong) || function () {},
        onComplete:(callbacks && callbacks.onComplete) || function () {},
      });

      // 绘制初始画面
      engine._draw();

      // 窗口大小变化时自适应
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          var newW = Math.min(800, container.clientWidth || 800);
          canvas.width = newW;
          canvas.height = Math.round(newW * 0.6);
          // 重新生成云朵位置
          for (var i = 0; i < engine.clouds.length; i++) {
            engine.clouds[i].x = rand(0, canvas.width);
          }
          if (engine.state !== 'playing') engine._draw();
        }, 200);
      });

      return engine;
    },

    /** 检测是否移动端 */
    isMobile: isMobile,
  };

})();
