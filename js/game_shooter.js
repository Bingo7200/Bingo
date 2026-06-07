;(function() {
  'use strict';

  // ==================== 常量与工具 ====================
  var COLORS = {
    bg: '#0a0a1a',
    player: '#00bcd4',
    playerGlow: 'rgba(0,188,212,0.4)',
    bullet: '#00e5ff',
    bulletGlow: 'rgba(0,229,255,0.6)',
    enemy: '#f44336',
    enemyGlow: 'rgba(244,67,54,0.3)',
    correct: '#4caf50',
    correctGlow: 'rgba(76,175,80,0.4)',
    wrong: '#ff9800',
    text: '#ffffff',
    textShadow: 'rgba(0,0,0,0.8)',
    panel: 'rgba(10,10,26,0.85)',
    border: 'rgba(0,188,212,0.5)',
    star: '#ffffff',
    combo: '#ffeb3b',
    life: '#00bcd4'
  };

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function randInt(a, b) {
    return Math.floor(rand(a, b + 1));
  }

  // ==================== 粒子系统 ====================
  function Particle(x, y, color, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type || 'spark'; // spark, smoke, star
    this.life = 1.0;
    this.decay = rand(0.02, 0.05);
    var angle = rand(0, Math.PI * 2);
    var speed = rand(1, 4);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = rand(2, 5);
    if (type === 'smoke') {
      this.vy = rand(-1, 1);
      this.vx = rand(-1, 1);
      this.decay = 0.01;
      this.size = rand(4, 10);
    }
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    if (this.type === 'spark') {
      this.vy += 0.1;
    }
  };

  Particle.prototype.draw = function(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // ==================== 浮动文字 ====================
  function FloatText(x, y, text, color) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.life = 1.0;
    this.vy = -1.5;
  }

  FloatText.prototype.update = function() {
    this.y += this.vy;
    this.life -= 0.02;
  };

  FloatText.prototype.draw = function(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  };

  // ==================== 玩家战机 ====================
  function Player(x, y) {
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 36;
    this.speed = 5;
    this.shootCooldown = 0;
    this.lives = 3;
    this.invincible = 0;
    this.engineFrame = 0;
  }

  Player.prototype.update = function(input, width) {
    if (input.left) this.x -= this.speed;
    if (input.right) this.x += this.speed;
    this.x = clamp(this.x, this.w / 2, width - this.w / 2);

    this.shootCooldown = Math.max(0, this.shootCooldown - 1);
    this.invincible = Math.max(0, this.invincible - 1);
    this.engineFrame++;
  };

  Player.prototype.draw = function(ctx) {
    ctx.save();
    var x = this.x, y = this.y;

    // 无敌闪烁
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    // 引擎尾焰
    var flameH = 8 + Math.sin(this.engineFrame * 0.3) * 4;
    ctx.fillStyle = '#ff5722';
    ctx.beginPath();
    ctx.moveTo(x - 6, y + this.h / 2);
    ctx.lineTo(x, y + this.h / 2 + flameH);
    ctx.lineTo(x + 6, y + this.h / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ff9800';
    ctx.beginPath();
    ctx.moveTo(x - 3, y + this.h / 2);
    ctx.lineTo(x, y + this.h / 2 + flameH * 0.7);
    ctx.lineTo(x + 3, y + this.h / 2);
    ctx.closePath();
    ctx.fill();

    // 战机主体 - 三角形
    ctx.shadowColor = COLORS.player;
    ctx.shadowBlur = 15;
    ctx.fillStyle = COLORS.player;
    ctx.beginPath();
    ctx.moveTo(x, y - this.h / 2);
    ctx.lineTo(x - this.w / 2, y + this.h / 2);
    ctx.lineTo(x, y + this.h / 2 - 8);
    ctx.lineTo(x + this.w / 2, y + this.h / 2);
    ctx.closePath();
    ctx.fill();

    // 驾驶舱
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y - 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // ==================== 子弹 ====================
  function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.vy = -10;
    this.w = 4;
    this.h = 14;
    this.active = true;
  }

  Bullet.prototype.update = function() {
    this.y += this.vy;
    if (this.y < -20) this.active = false;
  };

  Bullet.prototype.draw = function(ctx) {
    ctx.save();
    ctx.shadowColor = COLORS.bullet;
    ctx.shadowBlur = 10;
    ctx.fillStyle = COLORS.bullet;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    // 弹头高光
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x - 1, this.y - this.h / 2, 2, 4);
    ctx.restore();
  };

  // ==================== 敌机 ====================
  function Enemy(x, y, text, isCorrect, index) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.isCorrect = isCorrect;
    this.index = index; // 0=A, 1=B, 2=C, 3=D
    this.w = 70;
    this.h = 50;
    this.vy = 0.8;
    this.active = true;
    this.hovered = false;
    this.revealed = false;
    this.attackable = false;
    this.label = String.fromCharCode(65 + index); // A,B,C,D
  }

  Enemy.prototype.update = function() {
    this.y += this.vy;
    if (this.y > window.innerHeight + 60) {
      this.active = false;
      this.missed = true; // 标记为漏过
    }
    if (!this.attackable && this.y >= 100 && this.y <= 400) {
      this.attackable = true;
    }
  };

  Enemy.prototype.draw = function(ctx) {
    if (!this.active) return;
    ctx.save();
    var x = this.x, y = this.y;
    var color, glow;
    if (this.revealed) {
      color = this.isCorrect ? COLORS.correct : COLORS.enemy;
      glow = this.isCorrect ? COLORS.correctGlow : COLORS.enemyGlow;
    } else {
      color = COLORS.wrong;
      glow = 'rgba(255,152,0,0.3)';
    }

    // 反馈期间半透明
    if (!this.attackable && this.revealed === false) {
      ctx.globalAlpha = 0.5;
    }

    // 外发光
    ctx.shadowColor = color;
    ctx.shadowBlur = this.hovered ? 20 : 10;

    // 敌机主体 - 倒三角形
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - this.w / 2, y - this.h / 2);
    ctx.lineTo(x + this.w / 2, y - this.h / 2);
    ctx.lineTo(x + this.w / 2 - 8, y + this.h / 2 - 10);
    ctx.lineTo(x, y + this.h / 2);
    ctx.lineTo(x - this.w / 2 + 8, y + this.h / 2 - 10);
    ctx.closePath();
    ctx.fill();

    // 边框
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 选项标签背景
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(x - 12, y - this.h / 2 + 4, 24, 18);

    // 选项标签文字
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, x, y - this.h / 2 + 13);

    // 答案文字
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 自动缩小字号以适应宽度
    var eFontSize = 13;
    var maxEWidth = this.w - 10;
    ctx.font = 'bold ' + eFontSize + 'px sans-serif';
    while (ctx.measureText(this.text).width > maxEWidth && eFontSize > 8) {
      eFontSize--;
      ctx.font = 'bold ' + eFontSize + 'px sans-serif';
    }
    var words = this.text;
    if (ctx.measureText(words).width > maxEWidth) {
      while (ctx.measureText(words + '..').width > maxEWidth && words.length > 0) {
        words = words.slice(0, -1);
      }
      words = words + '..';
    }
    ctx.fillText(words, x, y + 6);

    ctx.restore();
  };

  Enemy.prototype.getBounds = function() {
    return {
      x: this.x - this.w / 2,
      y: this.y - this.h / 2,
      w: this.w,
      h: this.h
    };
  };

  // ==================== 星星背景 ====================
  function Star(x, y, speed, size) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.brightness = rand(0.3, 1.0);
  }

  Star.prototype.update = function(height) {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = rand(0, window.innerWidth);
    }
  };

  Star.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = this.brightness;
    ctx.fillStyle = COLORS.star;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // ==================== 游戏引擎 ====================
  function ShooterGame(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.questions = options.questions || [];
    this.callbacks = options.callbacks || {};
    this.width = canvas.width;
    this.height = canvas.height;

    this.state = 'start'; // start, playing, gameover, victory
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.totalAnswered = 0;
    this.currentQIndex = 0;
    this.shakeTimer = 0;
    this.flashTimer = 0;

    this.player = new Player(this.width / 2, this.height - 80);
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.floatTexts = [];
    this.stars = [];

    this.input = { left: false, right: false, shoot: false };
    this.lastTime = 0;
    this.spawnTimer = 0;
    this.enemySpawned = false;
    this.questionTransition = 0;
    this.feedbackTimer = 0;
    this.feedbackText = '';

    this._initStars();
    this._bindEvents();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  ShooterGame.prototype._initStars = function() {
    this.stars = [];
    for (var i = 0; i < 120; i++) {
      this.stars.push(new Star(
        rand(0, this.width),
        rand(0, this.height),
        rand(0.5, 3),
        rand(0.5, 2.5)
      ));
    }
  };

  ShooterGame.prototype._bindEvents = function() {
    var self = this;
    var canvas = this.canvas;

    // 键盘
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') self.input.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') self.input.right = true;
      if (e.key === ' ' || e.key === 'ArrowUp') self.input.shoot = true;
      if (e.key === 'Enter' && self.state === 'start') self._startGame();
      if (e.key === 'Enter' && (self.state === 'gameover' || self.state === 'victory')) self._restart();
    });

    document.addEventListener('keyup', function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') self.input.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') self.input.right = false;
      if (e.key === ' ' || e.key === 'ArrowUp') self.input.shoot = false;
    });

    // 触摸 / 鼠标
    var touchStartX = 0;
    canvas.addEventListener('touchstart', function(e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches[0];
      var tx = touch.clientX - rect.left;
      var ty = touch.clientY - rect.top;
      touchStartX = tx;

      // 虚拟按钮检测
      if (self._isMobile) {
        if (tx < self.width * 0.25) self.input.left = true;
        else if (tx > self.width * 0.75) self.input.right = true;
        else self.input.shoot = true;
      } else {
        // 点击开始/重新开始
        if (self.state === 'start') self._startGame();
        if (self.state === 'gameover' || self.state === 'victory') self._restart();
      }
    }, { passive: false });

    canvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      if (!self._isMobile) return;
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches[0];
      var tx = touch.clientX - rect.left;
      self.input.left = false;
      self.input.right = false;
      if (tx < self.width * 0.25) self.input.left = true;
      else if (tx > self.width * 0.75) self.input.right = true;
    }, { passive: false });

    canvas.addEventListener('touchend', function(e) {
      e.preventDefault();
      self.input.left = false;
      self.input.right = false;
      self.input.shoot = false;
    }, { passive: false });

    canvas.addEventListener('mousedown', function(e) {
      if (self.state === 'start') self._startGame();
      if (self.state === 'gameover' || self.state === 'victory') self._restart();
    });
  };

  ShooterGame.prototype._startGame = function() {
    this.state = 'playing';
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctCount = 0;
    this.totalAnswered = 0;
    this.currentQIndex = 0;
    this.player.lives = 3;
    this.player.x = this.width / 2;
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.floatTexts = [];
    this.enemySpawned = false;
    this.spawnTimer = 60;
    if (this.callbacks.onStart) this.callbacks.onStart();
  };

  ShooterGame.prototype._restart = function() {
    this._startGame();
  };

  ShooterGame.prototype._spawnEnemies = function() {
    if (this.currentQIndex >= this.questions.length) return;
    var q = this.questions[this.currentQIndex];
    var options = q.options;
    var correctIndex = q.correct;
    var spacing = this.width / 5;
    var startX = spacing;

    for (var i = 0; i < options.length; i++) {
      this.enemies.push(new Enemy(
        startX + spacing * i,
        -60 - i * 20,
        options[i],
        i === correctIndex,
        i
      ));
    }
    this.enemySpawned = true;
  };

  ShooterGame.prototype._spawnParticles = function(x, y, color, count, type) {
    for (var i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color, type));
    }
  };

  ShooterGame.prototype._addFloatText = function(x, y, text, color) {
    this.floatTexts.push(new FloatText(x, y, text, color));
  };

  ShooterGame.prototype._clearEnemies = function() {
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].active = false;
    }
  };

  ShooterGame.prototype._nextQuestion = function() {
    this.currentQIndex++;
    this.enemySpawned = false;
    this.spawnTimer = 60;
    this.bullets = [];

    if (this.currentQIndex >= this.questions.length) {
      this.state = 'victory';
      if (this.callbacks.onVictory) this.callbacks.onVictory(this.score, this.correctCount, this.questions.length);
    }
  };

  ShooterGame.prototype._gameOver = function() {
    this.state = 'gameover';
    if (this.callbacks.onGameOver) this.callbacks.onGameOver(this.score, this.correctCount, this.totalAnswered);
  };

  ShooterGame.prototype._update = function() {
    var i;

    // 星星背景
    for (i = 0; i < this.stars.length; i++) {
      this.stars[i].update(this.height);
    }

    if (this.state === 'start') {
      this.player.engineFrame++;
      return;
    }

    if (this.state !== 'playing') return;

    // 震动
    if (this.shakeTimer > 0) this.shakeTimer--;
    if (this.flashTimer > 0) this.flashTimer--;

    // 玩家
    this.player.update(this.input, this.width);

    // 手动射击（空格/上箭头/触摸中间区域）
    if (this.input.shoot && this.player.shootCooldown <= 0) {
      this.bullets.push(new Bullet(this.player.x, this.player.y - this.player.h / 2));
      this.player.shootCooldown = 15;
    }

    // 子弹
    for (i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
      if (!this.bullets[i].active) {
        this.bullets.splice(i, 1);
      }
    }

    // 反馈计时器
    if (this.feedbackTimer > 0) {
      this.feedbackTimer--;
      if (this.feedbackTimer === 0) {
        this._nextQuestion();
      }
      return; // 暂停其他更新
    }

    // 生成敌机
    if (!this.enemySpawned && this.spawnTimer > 0) {
      this.spawnTimer--;
      if (this.spawnTimer <= 0) {
        this._spawnEnemies();
      }
    }

    // 敌机
    var allEnemiesGone = true;
    var anyMissed = false;
    for (i = this.enemies.length - 1; i >= 0; i--) {
      var enemy = this.enemies[i];
      enemy.update();
      if (enemy.active) {
        allEnemiesGone = false;
      } else {
        if (enemy.missed) anyMissed = true;
        this.enemies.splice(i, 1);
        continue;
      }

      // 碰撞检测 - 子弹 vs 敌机
      for (var j = this.bullets.length - 1; j >= 0; j--) {
        var bullet = this.bullets[j];
        if (!enemy.attackable) continue; // 还没飞到可攻击位置
        var eb = enemy.getBounds();
        if (
          bullet.active &&
          bullet.x > eb.x && bullet.x < eb.x + eb.w &&
          bullet.y > eb.y && bullet.y < eb.y + eb.h
        ) {
          bullet.active = false;
          this.totalAnswered++;
          enemy.revealed = true;

          if (enemy.isCorrect) {
            // 正确
            this.combo++;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;
            var points = 10 + this.combo * 2;
            this.score += points;
            this.correctCount++;
            this._spawnParticles(enemy.x, enemy.y, COLORS.correct, 20, 'spark');
            this._spawnParticles(enemy.x, enemy.y, '#ffffff', 8, 'smoke');
            this._addFloatText(enemy.x, enemy.y, '+' + points, COLORS.correct);
            if (this.combo >= 3) {
              this._addFloatText(this.width / 2, this.height / 2, this.combo + '连击！', COLORS.combo);
            }
            if (this.callbacks.onCorrect) this.callbacks.onCorrect(this.currentQIndex);

            this.feedbackText = '回答正确！';
            this.feedbackTimer = 90;
            this._clearEnemies();
          } else {
            // 错误
            this.combo = 0;
            this.player.lives--;
            this.shakeTimer = 15;
            this.flashTimer = 10;
            this._spawnParticles(enemy.x, enemy.y, COLORS.enemy, 20, 'spark');
            this._addFloatText(enemy.x, enemy.y, '-1 生命', COLORS.enemy);
            if (this.callbacks.onWrong) this.callbacks.onWrong(this.currentQIndex);

            var correctIdx = this.questions[this.currentQIndex].correct;
            this.feedbackText = '回答错误！正确答案是 ' + String.fromCharCode(65 + correctIdx);
            this.feedbackTimer = 90;
            this._clearEnemies();

            if (this.player.lives <= 0) {
              this._gameOver();
              return;
            }
          }
          break;
        }
      }
    }

    // 如果所有敌机都飞走或击毁，检查是否有漏过
    if (this.enemySpawned && this.enemies.length === 0 && this.state === 'playing') {
      // 如果有漏过，扣除1条生命
      if (anyMissed) {
        this.player.lives--;
        this._addFloatText(this.width / 2, this.height / 2, '漏过敌机！扣除1生命', COLORS.enemy);
        if (this.player.lives <= 0) {
          this._gameOver();
          return;
        }
      }
      this.enemySpawned = false;
      this.spawnTimer = 60;
    }

    // 粒子
    for (i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // 浮动文字
    for (i = this.floatTexts.length - 1; i >= 0; i--) {
      this.floatTexts[i].update();
      if (this.floatTexts[i].life <= 0) {
        this.floatTexts.splice(i, 1);
      }
    }
  };

  ShooterGame.prototype._draw = function() {
    var ctx = this.ctx;
    var w = this.width, h = this.height;

    ctx.save();

    // 屏幕震动
    if (this.shakeTimer > 0) {
      var sx = rand(-4, 4);
      var sy = rand(-4, 4);
      ctx.translate(sx, sy);
    }

    // 背景
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(-10, -10, w + 20, h + 20);

    // 受击闪烁
    if (this.flashTimer > 0) {
      ctx.fillStyle = 'rgba(244,67,54,0.2)';
      ctx.fillRect(-10, -10, w + 20, h + 20);
    }

    // 星星
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].draw(ctx);
    }

    if (this.state === 'start') {
      this._drawStartScreen(ctx, w, h);
      ctx.restore();
      return;
    }

    if (this.state === 'gameover') {
      this._drawGameOverScreen(ctx, w, h);
      ctx.restore();
      return;
    }

    if (this.state === 'victory') {
      this._drawVictoryScreen(ctx, w, h);
      ctx.restore();
      return;
    }

    // 游戏画面
    // 题目
    if (this.currentQIndex < this.questions.length) {
      var q = this.questions[this.currentQIndex];
      ctx.save();
      ctx.fillStyle = COLORS.panel;
      ctx.fillRect(10, 10, w - 20, 50);
      ctx.strokeStyle = COLORS.border;
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, w - 20, 50);

      ctx.fillStyle = COLORS.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var qText = '第' + (this.currentQIndex + 1) + '/' + this.questions.length + '题：' + q.question;
      // 自动缩小字号以适应宽度
      var qFontSize = 16;
      ctx.font = 'bold ' + qFontSize + 'px sans-serif';
      var maxQWidth = w - 40;
      while (ctx.measureText(qText).width > maxQWidth && qFontSize > 10) {
        qFontSize--;
        ctx.font = 'bold ' + qFontSize + 'px sans-serif';
      }
      // 如果字号已经缩到最小仍然太长，则截断
      if (ctx.measureText(qText).width > maxQWidth) {
        while (ctx.measureText(qText + '...').width > maxQWidth && qText.length > 0) {
          qText = qText.slice(0, -1);
        }
        qText = qText + '...';
      }
      ctx.fillText(qText, w / 2, 35);
      ctx.restore();
    }

    // 分数和生命
    ctx.save();
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('分数: ' + this.score, 20, 80);

    // 红心生命
    var heartX = 20;
    var heartY = 95;
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    for (var hi = 0; hi < this.player.lives; hi++) {
      ctx.fillStyle = '#f44336';
      ctx.fillText('♥', heartX + hi * 24, heartY);
    }

    // 连击
    if (this.combo >= 2) {
      ctx.fillStyle = COLORS.combo;
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(this.combo + '连击', w - 20, 80);
    }
    ctx.restore();

    // 敌机
    for (i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(ctx);
    }

    // 子弹
    for (i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(ctx);
    }

    // 玩家
    this.player.draw(ctx);

    // 粒子
    for (i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(ctx);
    }

    // 浮动文字
    for (i = 0; i < this.floatTexts.length; i++) {
      this.floatTexts[i].draw(ctx);
    }

    // 反馈提示
    if (this.feedbackTimer > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, h / 2 - 40, w, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.feedbackText, w / 2, h / 2);
    }

    // 底部提示
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, h - 30, w, 30);
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('方向键/A D移动 | 空格/↑ 手动射击 | 击中正确答案得分', w / 2, h - 12);
    ctx.restore();

    // 移动端虚拟按钮提示
    if (this._isMobile) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(0, h - 100, w * 0.25, 100);
      ctx.fillRect(w * 0.75, h - 100, w * 0.25, 100);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('←', w * 0.125, h - 50);
      ctx.fillText('→', w * 0.875, h - 50);
      ctx.restore();
    }

    ctx.restore();
  };

  ShooterGame.prototype._drawStartScreen = function(ctx, w, h) {
    // 标题动画
    var titleY = h * 0.35 + Math.sin(Date.now() * 0.002) * 10;

    ctx.save();
    ctx.shadowColor = COLORS.player;
    ctx.shadowBlur = 30;
    ctx.fillStyle = COLORS.player;
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('数据战机', w / 2, titleY);
    ctx.restore();

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('射击答题挑战', w / 2, titleY + 40);

    // 战机预览
    var demoPlayer = new Player(w / 2, h * 0.6);
    demoPlayer.engineFrame = Math.floor(Date.now() / 16);
    demoPlayer.draw(ctx);

    // 开始提示
    var blink = Math.sin(Date.now() * 0.005) > 0;
    if (blink) {
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('点击屏幕或按回车开始游戏', w / 2, h * 0.75);
    }

    // 操作说明
    ctx.fillStyle = '#888888';
    ctx.font = '14px sans-serif';
    ctx.fillText('← → 或 A D 移动战机 | 空格/↑ 手动射击 | 击中正确敌机得分', w / 2, h * 0.82);
    ctx.fillText('敌机飞到中间区域才可被击中，击中错误扣除生命', w / 2, h * 0.88);
  };

  ShooterGame.prototype._drawGameOverScreen = function(ctx, w, h) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.shadowColor = COLORS.enemy;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COLORS.enemy;
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('游戏结束', w / 2, h * 0.3);
    ctx.restore();

    ctx.fillStyle = COLORS.text;
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('最终得分: ' + this.score, w / 2, h * 0.45);
    ctx.fillText('答对: ' + this.correctCount + ' / ' + this.totalAnswered, w / 2, h * 0.52);

    var accuracy = this.totalAnswered > 0 ? Math.round(this.correctCount / this.totalAnswered * 100) : 0;
    ctx.fillText('正确率: ' + accuracy + '%', w / 2, h * 0.59);
    ctx.fillText('最高连击: ' + this.maxCombo, w / 2, h * 0.66);

    var blink = Math.sin(Date.now() * 0.005) > 0;
    if (blink) {
      ctx.fillStyle = COLORS.player;
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('点击屏幕或按回车再来一次', w / 2, h * 0.78);
    }
  };

  ShooterGame.prototype._drawVictoryScreen = function(ctx, w, h) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.shadowColor = COLORS.correct;
    ctx.shadowBlur = 30;
    ctx.fillStyle = COLORS.correct;
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('恭喜通关！', w / 2, h * 0.3);
    ctx.restore();

    ctx.fillStyle = COLORS.text;
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('最终得分: ' + this.score, w / 2, h * 0.45);
    ctx.fillText('答对: ' + this.correctCount + ' / ' + this.questions.length, w / 2, h * 0.52);

    var accuracy = this.questions.length > 0 ? Math.round(this.correctCount / this.questions.length * 100) : 0;
    ctx.fillText('正确率: ' + accuracy + '%', w / 2, h * 0.59);
    ctx.fillText('最高连击: ' + this.maxCombo, w / 2, h * 0.66);

    // 评级
    var rank = 'C';
    var rankColor = '#ff9800';
    if (accuracy >= 100) { rank = 'S'; rankColor = '#ffeb3b'; }
    else if (accuracy >= 80) { rank = 'A'; rankColor = '#4caf50'; }
    else if (accuracy >= 60) { rank = 'B'; rankColor = '#2196f3'; }

    ctx.save();
    ctx.fillStyle = rankColor;
    ctx.font = 'bold 72px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(rank, w / 2, h * 0.78);
    ctx.restore();

    var blink = Math.sin(Date.now() * 0.005) > 0;
    if (blink) {
      ctx.fillStyle = COLORS.player;
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('点击屏幕或按回车再来一次', w / 2, h * 0.88);
    }
  };

  ShooterGame.prototype._loop = function(timestamp) {
    this._update();
    this._draw();
    requestAnimationFrame(this._loop);
  };

  ShooterGame.prototype.destroy = function() {
    // 清理事件监听等（简化版）
    this.state = 'destroyed';
  };

  // ==================== 全局导出 ====================
  window.DataLearnShooter = {
    create: function(containerId, questions, callbacks) {
      var container = document.getElementById(containerId);
      if (!container) {
        console.error('DataLearnShooter: 容器 #' + containerId + ' 不存在');
        return null;
      }

      var canvas = document.createElement('canvas');
      canvas.width = Math.min(900, container.clientWidth || 900);
      canvas.height = 600;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.innerHTML = '';
      container.appendChild(canvas);

      var game = new ShooterGame(canvas, {
        questions: questions || [],
        callbacks: callbacks || {}
      });

      game._isMobile = this.isMobile();

      // 响应式
      var resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          var nw = Math.min(900, container.clientWidth || 900);
          canvas.width = nw;
          canvas.height = 600;
          game.width = nw;
          game.height = 600;
          game.player.y = 600 - 80;
          game.player.x = clamp(game.player.x, game.player.w / 2, nw - game.player.w / 2);
        }, 200);
      });

      return {
        canvas: canvas,
        game: game,
        destroy: function() {
          game.destroy();
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        }
      };
    },

    isMobile: function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  };
})();
