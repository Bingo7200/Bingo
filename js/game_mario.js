;(function() {
  'use strict';

  // ==================== 颜色常量 ====================
  var COLORS = {
    sky: '#5c94fc',
    grass: '#00aa00',
    ground: '#c84c0c',
    groundTop: '#00aa00',
    pipe: '#00aa00',
    pipeDark: '#007700',
    pipeLight: '#44cc44',
    block: '#b85c38',
    blockTop: '#d07850',
    qBlock: '#f8b800',
    qBlockDark: '#c88800',
    qBlockLight: '#ffe060',
    qBlockOpen: '#888888',
    qBlockCorrect: '#44cc44',
    qBlockWrong: '#cc4444',
    playerSkin: '#ffcc99',
    playerHat: '#cc0000',
    playerShirt: '#cc0000',
    playerOveralls: '#0055cc',
    playerShoes: '#442200',
    coin: '#f8d800',
    text: '#ffffff',
    textShadow: '#000000',
    uiBg: 'rgba(0,0,0,0.5)',
    cloud: '#ffffff',
    cloudShadow: '#dddddd',
    mountain: '#44aa44',
    mountainTop: '#ffffff'
  };

  // ==================== 工具函数 ====================
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function rectIntersect(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ==================== 粒子系统 ====================
  function Particle(x, y, color, type) {
    this.x = x; this.y = y; this.color = color; this.type = type || 'spark';
    this.vx = rand(-3, 3); this.vy = rand(-5, -1);
    this.life = 1.0; this.decay = rand(0.02, 0.05);
    this.size = rand(2, 5);
  }
  Particle.prototype.update = function() {
    this.x += this.vx; this.y += this.vy; this.vy += 0.15;
    this.life -= this.decay;
  };
  Particle.prototype.draw = function(ctx) {
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    if (this.type === 'star') {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.life * 10);
      ctx.beginPath();
      for (var i = 0; i < 5; i++) {
        var angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        var px = Math.cos(angle) * this.size;
        var py = Math.sin(angle) * this.size;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
    } else {
      ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
    ctx.globalAlpha = 1;
  };

  // ==================== 玩家角色 ====================
  function Player(x, y) {
    this.x = x; this.y = y; this.w = 24; this.h = 32;
    this.vx = 0; this.vy = 0;
    this.speed = 3.5;
    this.jumpForce = -11;
    this.gravity = 0.5;
    this.grounded = false;
    this.doubleJump = true;
    this.facingRight = true;
    this.frame = 0;
    this.frameTimer = 0;
    this.lives = 3;
    this.invincible = 0;
    this.dead = false;
    this.deadTimer = 0;
  }
  Player.prototype.update = function(platforms, blocks, keys, canvasH) {
    if (this.dead) {
      this.deadTimer++;
      this.y += this.vy; this.vy += this.gravity;
      return;
    }
    if (this.invincible > 0) this.invincible--;

    // 左右移动
    if (keys.left) { this.vx = -this.speed; this.facingRight = false; }
    else if (keys.right) { this.vx = this.speed; this.facingRight = true; }
    else { this.vx *= 0.8; }

    // 跳跃
    if (keys.jumpPressed) {
      if (this.grounded) {
        this.vy = this.jumpForce; this.grounded = false; this.doubleJump = true;
      } else if (this.doubleJump) {
        this.vy = this.jumpForce * 0.8; this.doubleJump = false;
      }
      keys.jumpPressed = false;
    }

    this.vy += this.gravity;
    this.x += this.vx; this.y += this.vy;

    // 动画帧
    if (Math.abs(this.vx) > 0.5 && this.grounded) {
      this.frameTimer++;
      if (this.frameTimer > 6) { this.frame = (this.frame + 1) % 3; this.frameTimer = 0; }
    } else if (this.grounded) {
      this.frame = 0; this.frameTimer = 0;
    }

    // 平台碰撞
    this.grounded = false;
    var self = this;
    platforms.forEach(function(p) {
      if (self.x + self.w > p.x && self.x < p.x + p.w &&
          self.y + self.h > p.y && self.y + self.h < p.y + p.h + 10 &&
          self.vy >= 0) {
        self.y = p.y - self.h; self.vy = 0; self.grounded = true; self.doubleJump = true;
      }
    });

    // 砖块碰撞（底部顶上去）
    blocks.forEach(function(b) {
      if (!b.active) return;
      if (self.x + self.w > b.x && self.x < b.x + b.w &&
          self.y < b.y + b.h && self.y > b.y + b.h - 10 &&
          self.vy < 0) {
        self.vy = 0; self.y = b.y + b.h;
        b.hit(self);
      }
    });

    // 掉出屏幕
    if (this.y > canvasH + 50) {
      this.lives--;
      if (this.lives <= 0) {
        this.dead = true; this.vy = -5;
      } else {
        this.respawn(100, 300);
      }
    }
  };
  Player.prototype.respawn = function(x, y) {
    this.x = x; this.y = y; this.vx = 0; this.vy = 0;
    this.invincible = 120; this.grounded = false; this.doubleJump = true;
  };
  Player.prototype.draw = function(ctx) {
    if (this.dead) return;
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) return;

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    if (!this.grounded) ctx.rotate(this.facingRight ? 0.15 : -0.15);
    if (!this.facingRight) ctx.scale(-1, 1);

    var fw = this.w, fh = this.h;
    // 身体（背带裤）
    ctx.fillStyle = COLORS.playerOveralls;
    ctx.fillRect(-fw / 2 + 2, -2, fw - 4, fh / 2 + 2);
    // 衬衫
    ctx.fillStyle = COLORS.playerShirt;
    ctx.fillRect(-fw / 2 + 2, -fh / 2 + 4, fw - 4, 10);
    // 帽子
    ctx.fillStyle = COLORS.playerHat;
    ctx.fillRect(-fw / 2, -fh / 2, fw, 8);
    ctx.fillRect(-fw / 2 - 2, -fh / 2 + 4, fw + 4, 4);
    // 脸
    ctx.fillStyle = COLORS.playerSkin;
    ctx.fillRect(-fw / 2 + 2, -fh / 2 + 8, fw - 4, 8);
    // 眼睛
    ctx.fillStyle = '#000000';
    ctx.fillRect(2, -fh / 2 + 10, 3, 3);
    // 胡子
    ctx.fillRect(0, -fh / 2 + 14, 6, 2);
    // 鞋子
    ctx.fillStyle = COLORS.playerShoes;
    if (this.grounded && Math.abs(this.vx) > 0.5) {
      var runOffset = this.frame === 1 ? 3 : (this.frame === 2 ? -3 : 0);
      ctx.fillRect(-fw / 2 + 1 + runOffset, fh / 2 - 4, 8, 4);
      ctx.fillRect(fw / 2 - 9 - runOffset, fh / 2 - 4, 8, 4);
    } else {
      ctx.fillRect(-fw / 2 + 1, fh / 2 - 4, 8, 4);
      ctx.fillRect(fw / 2 - 9, fh / 2 - 4, 8, 4);
    }
    // 手臂
    ctx.fillStyle = COLORS.playerShirt;
    if (!this.grounded) {
      ctx.fillRect(-fw / 2 - 4, -2, 4, 10);
      ctx.fillRect(fw / 2, -2, 4, 10);
    } else if (Math.abs(this.vx) > 0.5) {
      var armOffset = this.frame === 1 ? -4 : (this.frame === 2 ? 4 : 0);
      ctx.fillRect(-fw / 2 - 4, -2 + armOffset, 4, 10);
      ctx.fillRect(fw / 2, -2 - armOffset, 4, 10);
    } else {
      ctx.fillRect(-fw / 2 - 4, 0, 4, 10);
      ctx.fillRect(fw / 2, 0, 4, 10);
    }

    ctx.restore();
  };

  // ==================== 平台 ====================
  function Platform(x, y, w, h, type) {
    this.x = x; this.y = y; this.w = w; this.h = h; this.type = type || 'ground';
  }
  Platform.prototype.draw = function(ctx, camX) {
    var sx = this.x - camX;
    if (this.type === 'ground') {
      ctx.fillStyle = COLORS.groundTop;
      ctx.fillRect(sx, this.y, this.w, 4);
      ctx.fillStyle = COLORS.ground;
      ctx.fillRect(sx, this.y + 4, this.w, this.h - 4);
      // 砖块纹理
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      for (var i = 0; i < this.w; i += 20) {
        ctx.beginPath(); ctx.moveTo(sx + i, this.y + 4); ctx.lineTo(sx + i, this.y + this.h); ctx.stroke();
      }
      for (var j = this.y + 4; j < this.y + this.h; j += 12) {
        ctx.beginPath(); ctx.moveTo(sx, j); ctx.lineTo(sx + this.w, j); ctx.stroke();
      }
    } else if (this.type === 'float') {
      ctx.fillStyle = COLORS.block;
      ctx.fillRect(sx, this.y, this.w, this.h);
      ctx.fillStyle = COLORS.blockTop;
      ctx.fillRect(sx, this.y, this.w, 4);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      for (var fx = 0; fx < this.w; fx += 16) {
        ctx.strokeRect(sx + fx, this.y, 16, this.h);
      }
    } else if (this.type === 'pipe') {
      // 管道主体
      ctx.fillStyle = COLORS.pipe;
      ctx.fillRect(sx + 4, this.y + 16, this.w - 8, this.h - 16);
      // 管道顶部
      ctx.fillRect(sx, this.y, this.w, 16);
      // 高光
      ctx.fillStyle = COLORS.pipeLight;
      ctx.fillRect(sx + 4, this.y, 4, 16);
      ctx.fillRect(sx + 8, this.y + 16, 4, this.h - 16);
      // 阴影
      ctx.fillStyle = COLORS.pipeDark;
      ctx.fillRect(sx + this.w - 8, this.y, 4, 16);
      ctx.fillRect(sx + this.w - 8, this.y + 16, 4, this.h - 16);
    }
  };

  // ==================== 问号砖块 ====================
  function QuestionBlock(x, y, questionData, index) {
    this.x = x; this.y = y; this.w = 32; this.h = 32;
    this.question = questionData;
    this.index = index;
    this.active = true;
    this.opened = false;
    this.result = null; // 'correct' | 'wrong'
    this.shake = 0;
    this.showOptions = false;
    this.optionSelected = -1;
    this.coinAnim = 0;
  }
  QuestionBlock.prototype.hit = function(player) {
    if (!this.active || this.opened) return;
    this.shake = 10;
    this.opened = true;
    this.showOptions = true;
    this.coinAnim = 20;
  };
  QuestionBlock.prototype.update = function() {
    if (this.shake > 0) this.shake--;
    if (this.coinAnim > 0) this.coinAnim--;
  };
  QuestionBlock.prototype.checkSelection = function(player, keys, particles) {
    if (!this.showOptions || this.result) return null;
    if (!keys.downPressed) return null;
    keys.downPressed = false;

    var options = this.question.options;
    var optW = 40, optH = 28, gap = 10;
    var totalW = options.length * optW + (options.length - 1) * gap;
    var startX = this.x + this.w / 2 - totalW / 2;
    var optY = this.y - 70;

    for (var i = 0; i < options.length; i++) {
      var ox = startX + i * (optW + gap);
      if (player.x + player.w > ox && player.x < ox + optW &&
          player.y + player.h > optY && player.y < optY + optH) {
        this.optionSelected = i;
        var correct = (i === this.question.correctIndex);
        this.result = correct ? 'correct' : 'wrong';
        this.showOptions = false;
        // 粒子特效
        var color = correct ? COLORS.qBlockCorrect : COLORS.qBlockWrong;
        for (var p = 0; p < 15; p++) {
          particles.push(new Particle(this.x + this.w / 2, this.y, color, correct ? 'star' : 'spark'));
        }
        return { index: this.index, correct: correct, selected: i };
      }
    }
    return null;
  };
  QuestionBlock.prototype.draw = function(ctx, camX) {
    var sx = this.x - camX;
    var sy = this.y + (this.shake > 0 ? Math.sin(this.shake) * 3 : 0);

    // 砖块底色
    if (this.result === 'correct') ctx.fillStyle = COLORS.qBlockCorrect;
    else if (this.result === 'wrong') ctx.fillStyle = COLORS.qBlockWrong;
    else if (this.opened) ctx.fillStyle = COLORS.qBlockOpen;
    else ctx.fillStyle = COLORS.qBlock;

    ctx.fillRect(sx, sy, this.w, this.h);

    // 边框高光
    ctx.fillStyle = this.opened ? '#aaaaaa' : COLORS.qBlockLight;
    ctx.fillRect(sx, sy, this.w, 3);
    ctx.fillRect(sx, sy, 3, this.h);
    ctx.fillStyle = this.opened ? '#666666' : COLORS.qBlockDark;
    ctx.fillRect(sx, sy + this.h - 3, this.w, 3);
    ctx.fillRect(sx + this.w - 3, sy, 3, this.h);

    // 问号或状态标记
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (!this.opened) {
      ctx.fillText('?', sx + this.w / 2, sy + this.h / 2 + 2);
    } else if (this.result === 'correct') {
      ctx.fillStyle = '#ffffff';
      ctx.fillText('✓', sx + this.w / 2, sy + this.h / 2 + 2);
    } else if (this.result === 'wrong') {
      ctx.fillStyle = '#ffffff';
      ctx.fillText('✗', sx + this.w / 2, sy + this.h / 2 + 2);
    }

    // 金币弹出动画
    if (this.coinAnim > 0) {
      var coinY = sy - 30 - (20 - this.coinAnim) * 2;
      var coinScale = Math.sin((this.coinAnim / 20) * Math.PI);
      ctx.fillStyle = COLORS.coin;
      ctx.beginPath();
      ctx.ellipse(sx + this.w / 2, coinY, 8 * coinScale, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4a000';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 选项显示
    if (this.showOptions && !this.result) {
      var options = this.question.options;
      var optW = 40, optH = 28, gap = 10;
      var totalW = options.length * optW + (options.length - 1) * gap;
      var startX = sx + this.w / 2 - totalW / 2;
      var optY = sy - 70;

      // 题目背景
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      var qText = this.question.question;
      ctx.font = '12px sans-serif';
      var qW = ctx.measureText(qText).width + 20;
      ctx.fillRect(sx + this.w / 2 - qW / 2, optY - 30, qW, 24);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(qText, sx + this.w / 2, optY - 14);

      for (var i = 0; i < options.length; i++) {
        var ox = startX + i * (optW + gap);
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(ox, optY, optW, optH);
        ctx.strokeStyle = COLORS.qBlock;
        ctx.lineWidth = 2;
        ctx.strokeRect(ox, optY, optW, optH);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(options[i], ox + optW / 2, optY + optH / 2);
      }
    }
  };

  // ==================== 金币 ====================
  function Coin(x, y) {
    this.x = x; this.y = y; this.w = 16; this.h = 20;
    this.frame = 0; this.frameTimer = 0;
  }
  Coin.prototype.update = function() {
    this.frameTimer++;
    if (this.frameTimer > 4) { this.frame = (this.frame + 1) % 4; this.frameTimer = 0; }
  };
  Coin.prototype.draw = function(ctx, camX) {
    var sx = this.x - camX;
    var scale = [1, 0.6, 0.2, 0.6][this.frame];
    ctx.fillStyle = COLORS.coin;
    ctx.beginPath();
    ctx.ellipse(sx + this.w / 2, this.y + this.h / 2, (this.w / 2) * scale, this.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d4a000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // ==================== 终点旗帜 ====================
  function Flag(x, y) {
    this.x = x; this.y = y; this.w = 8; this.h = 120;
    this.poleH = 120;
  }
  Flag.prototype.draw = function(ctx, camX) {
    var sx = this.x - camX;
    // 旗杆
    ctx.fillStyle = '#888888';
    ctx.fillRect(sx, this.y - this.poleH, this.w, this.poleH);
    ctx.fillStyle = '#aaaaaa';
    ctx.fillRect(sx, this.y - this.poleH, 3, this.poleH);
    // 球
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(sx + this.w / 2, this.y - this.poleH, 6, 0, Math.PI * 2);
    ctx.fill();
    // 旗帜
    ctx.fillStyle = '#00aa00';
    ctx.beginPath();
    ctx.moveTo(sx + this.w, this.y - this.poleH + 10);
    ctx.lineTo(sx + this.w + 40, this.y - this.poleH + 25);
    ctx.lineTo(sx + this.w, this.y - this.poleH + 40);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('终点', sx + this.w + 10, this.y - this.poleH + 28);
  };

  // ==================== 游戏引擎 ====================
  function MarioGame(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.questions = options.questions || [];
    this.callbacks = options.callbacks || {};
    this.state = 'start'; // start | playing | gameover | complete
    this.score = 0;
    this.coins = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.shakeScreen = 0;
    this.particles = [];
    this.clouds = [];
    this.mountains = [];
    this.coinsList = [];

    this.player = new Player(100, 300);
    this.platforms = [];
    this.blocks = [];
    this.flag = null;
    this.camX = 0;
    this.levelWidth = 0;

    this.keys = { left: false, right: false, jumpPressed: false, downPressed: false };
    this.touchBtns = {};

    this._buildLevel();
    this._initInput();
    this._initBackground();

    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  MarioGame.prototype._buildLevel = function() {
    var qw = this.questions.length;
    this.levelWidth = Math.max(800, qw * 200 + 400);

    // 地面
    this.platforms.push(new Platform(0, 400, this.levelWidth, 200, 'ground'));

    // 浮动平台和砖块
    var px = 200;
    for (var i = 0; i < qw; i++) {
      // 浮动平台
      this.platforms.push(new Platform(px, 300, 80, 16, 'float'));
      // 问号砖块
      this.blocks.push(new QuestionBlock(px + 24, 220, this.questions[i], i));
      // 装饰金币
      if (i % 2 === 0) {
        this.coinsList.push(new Coin(px + 100, 360));
      }
      px += 200;
    }

    // 额外平台
    this.platforms.push(new Platform(120, 280, 60, 16, 'float'));
    this.platforms.push(new Platform(380, 240, 60, 16, 'float'));
    this.platforms.push(new Platform(600, 260, 60, 16, 'float'));

    // 管道装饰
    this.platforms.push(new Platform(350, 400 - 48, 40, 48, 'pipe'));
    this.platforms.push(new Platform(650, 400 - 64, 40, 64, 'pipe'));
    this.platforms.push(new Platform(950, 400 - 48, 40, 48, 'pipe'));

    // 终点
    this.flag = new Flag(this.levelWidth - 100, 400);
  };

  MarioGame.prototype._initBackground = function() {
    for (var i = 0; i < 8; i++) {
      this.clouds.push({ x: rand(0, this.levelWidth), y: rand(40, 150), w: rand(60, 100), speed: rand(0.2, 0.5) });
    }
    for (var j = 0; j < 5; j++) {
      this.mountains.push({ x: rand(0, this.levelWidth), w: rand(80, 150), h: rand(60, 120) });
    }
  };

  MarioGame.prototype._initInput = function() {
    var self = this;
    var canvas = this.canvas;

    function onKey(e, val) {
      var k = e.key || e.code;
      if (k === 'ArrowLeft' || k === 'KeyA' || k === 'a') self.keys.left = val;
      if (k === 'ArrowRight' || k === 'KeyD' || k === 'd') self.keys.right = val;
      if (k === 'ArrowUp' || k === ' ' || k === 'Space' || k === 'KeyW' || k === 'w') {
        if (val && !self.keys.jump) self.keys.jumpPressed = true;
        self.keys.jump = val;
      }
      if (k === 'ArrowDown' || k === 'KeyS' || k === 's') {
        if (val && !self.keys.down) self.keys.downPressed = true;
        self.keys.down = val;
      }
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].indexOf(k) >= 0) e.preventDefault();
    }
    document.addEventListener('keydown', function(e) { onKey(e, true); });
    document.addEventListener('keyup', function(e) { onKey(e, false); });

    // 触摸/鼠标虚拟按钮
    function touchBtn(id, key) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', function(e) { e.preventDefault(); self.keys[key] = true; if (key === 'jump') self.keys.jumpPressed = true; });
      el.addEventListener('touchend', function(e) { e.preventDefault(); self.keys[key] = false; });
      el.addEventListener('mousedown', function(e) { e.preventDefault(); self.keys[key] = true; if (key === 'jump') self.keys.jumpPressed = true; });
      el.addEventListener('mouseup', function(e) { e.preventDefault(); self.keys[key] = false; });
    }
    touchBtn('mario-btn-left', 'left');
    touchBtn('mario-btn-right', 'right');
    touchBtn('mario-btn-jump', 'jump');
    touchBtn('mario-btn-down', 'down');

    // 开始按钮
    canvas.addEventListener('click', function(e) {
      if (self.state === 'start') {
        var rect = canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left, my = e.clientY - rect.top;
        if (mx > canvas.width / 2 - 80 && mx < canvas.width / 2 + 80 &&
            my > canvas.height / 2 + 40 && my < canvas.height / 2 + 80) {
          self.state = 'playing';
        }
      } else if (self.state === 'gameover' || self.state === 'complete') {
        var rect = canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left, my = e.clientY - rect.top;
        if (mx > canvas.width / 2 - 80 && mx < canvas.width / 2 + 80 &&
            my > canvas.height / 2 + 60 && my < canvas.height / 2 + 100) {
          self.restart();
        }
      }
    });
  };

  MarioGame.prototype.restart = function() {
    this.state = 'playing';
    this.score = 0;
    this.coins = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.shakeScreen = 0;
    this.particles = [];
    this.player = new Player(100, 300);
    this.camX = 0;
    this.blocks.forEach(function(b) {
      b.opened = false; b.result = null; b.showOptions = false; b.optionSelected = -1;
    });
  };

  MarioGame.prototype._update = function() {
    if (this.state !== 'playing') return;

    this.player.update(this.platforms, this.blocks, this.keys, this.canvas.height);

    // 相机跟随
    this.camX = clamp(this.player.x - this.canvas.width / 3, 0, this.levelWidth - this.canvas.width);

    // 砖块更新
    var self = this;
    this.blocks.forEach(function(b) {
      b.update();
      var res = b.checkSelection(self.player, self.keys, self.particles);
      if (res) {
        if (res.correct) {
          self.score += 10; self.coins++; self.correctCount++;
          if (self.callbacks.onCorrect) self.callbacks.onCorrect(res.index);
        } else {
          self.wrongCount++;
          self.player.lives--;
          self.shakeScreen = 15;
          self.player.invincible = 120;
          if (self.player.lives <= 0) {
            self.player.dead = true; self.player.vy = -5;
          }
          if (self.callbacks.onWrong) self.callbacks.onWrong(res.index);
        }
      }
    });

    // 金币收集
    this.coinsList.forEach(function(c) {
      c.update();
      if (rectIntersect(self.player, c)) {
        self.coins++;
        c.x = -9999; // 移除
        for (var p = 0; p < 8; p++) {
          self.particles.push(new Particle(c.x + 8, c.y, COLORS.coin, 'star'));
        }
      }
    });

    // 粒子更新
    this.particles.forEach(function(p) { p.update(); });
    this.particles = this.particles.filter(function(p) { return p.life > 0; });

    // 屏幕震动
    if (this.shakeScreen > 0) this.shakeScreen--;

    // 终点检测
    if (this.player.x > this.flag.x && this.state === 'playing') {
      var allAnswered = this.blocks.every(function(b) { return b.result !== null; });
      if (allAnswered) {
        this.state = 'complete';
        if (this.callbacks.onComplete) this.callbacks.onComplete(this.score, this.questions.length);
      }
    }

    // 死亡检测
    if (this.player.dead && this.player.deadTimer > 60) {
      this.state = 'gameover';
    }
  };

  MarioGame.prototype._draw = function() {
    var ctx = this.ctx;
    var cw = this.canvas.width, ch = this.canvas.height;

    ctx.save();
    if (this.shakeScreen > 0) {
      ctx.translate(rand(-3, 3), rand(-3, 3));
    }

    // 天空背景
    ctx.fillStyle = COLORS.sky;
    ctx.fillRect(0, 0, cw, ch);

    // 远景山丘
    var self = this;
    this.mountains.forEach(function(m) {
      var sx = m.x - self.camX * 0.3;
      ctx.fillStyle = COLORS.mountain;
      ctx.beginPath();
      ctx.moveTo(sx, ch - 100);
      ctx.lineTo(sx + m.w / 2, ch - 100 - m.h);
      ctx.lineTo(sx + m.w, ch - 100);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = COLORS.mountainTop;
      ctx.beginPath();
      ctx.moveTo(sx + m.w / 2 - 15, ch - 100 - m.h + 15);
      ctx.lineTo(sx + m.w / 2, ch - 100 - m.h);
      ctx.lineTo(sx + m.w / 2 + 15, ch - 100 - m.h + 15);
      ctx.closePath();
      ctx.fill();
    });

    // 云朵
    this.clouds.forEach(function(c) {
      var sx = c.x - self.camX * 0.5;
      ctx.fillStyle = COLORS.cloud;
      ctx.beginPath();
      ctx.arc(sx, c.y, c.w / 3, 0, Math.PI * 2);
      ctx.arc(sx + c.w / 3, c.y - 5, c.w / 4, 0, Math.PI * 2);
      ctx.arc(sx + c.w / 2, c.y, c.w / 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // 平台
    this.platforms.forEach(function(p) { p.draw(ctx, self.camX); });

    // 金币
    this.coinsList.forEach(function(c) { c.draw(ctx, self.camX); });

    // 砖块
    this.blocks.forEach(function(b) { b.draw(ctx, self.camX); });

    // 终点旗帜
    if (this.flag) this.flag.draw(ctx, this.camX);

    // 玩家
    this.player.draw(ctx, this.camX);

    // 粒子
    this.particles.forEach(function(p) { p.draw(ctx); });

    ctx.restore();

    // UI
    this._drawUI(ctx, cw, ch);

    // 开始/结束画面
    if (this.state === 'start') this._drawStart(ctx, cw, ch);
    else if (this.state === 'gameover') this._drawGameOver(ctx, cw, ch);
    else if (this.state === 'complete') this._drawComplete(ctx, cw, ch);
  };

  MarioGame.prototype._drawUI = function(ctx, cw, ch) {
    // 左上角信息
    ctx.fillStyle = COLORS.uiBg;
    ctx.fillRect(8, 8, 180, 70);
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('分数: ' + this.score, 16, 14);
    ctx.fillText('金币: ' + this.coins, 16, 34);
    ctx.fillText('生命: ' + (this.player ? this.player.lives : 0), 16, 54);

    // 右上角进度
    var answered = this.blocks.filter(function(b) { return b.result !== null; }).length;
    ctx.fillStyle = COLORS.uiBg;
    ctx.fillRect(cw - 140, 8, 132, 30);
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'right';
    ctx.fillText('进度: ' + answered + ' / ' + this.blocks.length, cw - 16, 14);

    // 底部操作提示
    ctx.fillStyle = COLORS.uiBg;
    ctx.fillRect(8, ch - 36, cw - 16, 28);
    ctx.fillStyle = COLORS.text;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('← → 移动  |  空格/↑ 跳跃（可二段跳）  |  ↓ 选择答案', cw / 2, ch - 22);
  };

  MarioGame.prototype._drawStart = function(ctx, cw, ch) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('数据管道工', cw / 2, ch / 2 - 60);

    ctx.font = '16px sans-serif';
    ctx.fillText('马里奥风格的平台跳跃答题游戏', cw / 2, ch / 2 - 20);

    // 角色动画预览
    ctx.save();
    ctx.translate(cw / 2, ch / 2 + 10);
    var t = Date.now() / 200;
    ctx.translate(0, Math.sin(t) * 5);
    // 简化的角色预览
    ctx.fillStyle = COLORS.playerHat;
    ctx.fillRect(-12, -20, 24, 8);
    ctx.fillStyle = COLORS.playerSkin;
    ctx.fillRect(-10, -12, 20, 10);
    ctx.fillStyle = COLORS.playerOveralls;
    ctx.fillRect(-10, -2, 20, 14);
    ctx.fillStyle = COLORS.playerShoes;
    ctx.fillRect(-10, 12, 8, 4);
    ctx.fillRect(2, 12, 8, 4);
    ctx.restore();

    // 开始按钮
    var btnY = ch / 2 + 60;
    ctx.fillStyle = COLORS.qBlock;
    ctx.fillRect(cw / 2 - 80, btnY, 160, 40);
    ctx.strokeStyle = COLORS.qBlockLight;
    ctx.lineWidth = 3;
    ctx.strokeRect(cw / 2 - 80, btnY, 160, 40);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('开始游戏', cw / 2, btnY + 22);
  };

  MarioGame.prototype._drawGameOver = function(ctx, cw, ch) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('游戏结束', cw / 2, ch / 2 - 50);

    ctx.fillStyle = COLORS.text;
    ctx.font = '18px sans-serif';
    ctx.fillText('最终得分: ' + this.score, cw / 2, ch / 2);
    ctx.fillText('答对: ' + this.correctCount + '  答错: ' + this.wrongCount, cw / 2, ch / 2 + 28);
    var rate = this.correctCount + this.wrongCount > 0 ? Math.round(this.correctCount / (this.correctCount + this.wrongCount) * 100) : 0;
    ctx.fillText('正确率: ' + rate + '%', cw / 2, ch / 2 + 52);

    // 再来一次按钮
    var btnY = ch / 2 + 80;
    ctx.fillStyle = COLORS.qBlockCorrect;
    ctx.fillRect(cw / 2 - 80, btnY, 160, 40);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cw / 2 - 80, btnY, 160, 40);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('再来一次', cw / 2, btnY + 22);
  };

  MarioGame.prototype._drawComplete = function(ctx, cw, ch) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = '#44ff44';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('通关成功！', cw / 2, ch / 2 - 50);

    ctx.fillStyle = COLORS.text;
    ctx.font = '18px sans-serif';
    ctx.fillText('最终得分: ' + this.score, cw / 2, ch / 2);
    ctx.fillText('答对: ' + this.correctCount + '  答错: ' + this.wrongCount, cw / 2, ch / 2 + 28);
    var rate = this.correctCount + this.wrongCount > 0 ? Math.round(this.correctCount / (this.correctCount + this.wrongCount) * 100) : 0;
    ctx.fillText('正确率: ' + rate + '%', cw / 2, ch / 2 + 52);

    // 再来一次按钮
    var btnY = ch / 2 + 80;
    ctx.fillStyle = COLORS.qBlockCorrect;
    ctx.fillRect(cw / 2 - 80, btnY, 160, 40);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cw / 2 - 80, btnY, 160, 40);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('再来一次', cw / 2, btnY + 22);
  };

  MarioGame.prototype._loop = function() {
    this._update();
    this._draw();
    requestAnimationFrame(this._loop);
  };

  // ==================== 全局导出 ====================
  window.DataLearnMario = {
    create: function(containerId, questions, callbacks) {
      var container = document.getElementById(containerId);
      if (!container) { console.error('容器不存在: ' + containerId); return null; }

      var canvas = document.createElement('canvas');
      canvas.width = container.clientWidth || 800;
      canvas.height = container.clientHeight || 480;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      // 移动端虚拟按钮
      if (this.isMobile()) {
        var btnStyle = 'position:absolute;bottom:10px;width:60px;height:60px;background:rgba(0,0,0,0.4);border:2px solid rgba(255,255,255,0.5);border-radius:8px;color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;z-index:10;user-select:none;';
        var btns = [
          { id: 'mario-btn-left', html: '←', left: '10px' },
          { id: 'mario-btn-right', html: '→', left: '80px' },
          { id: 'mario-btn-jump', html: '跳', right: '80px' },
          { id: 'mario-btn-down', html: '↓', right: '10px' }
        ];
        btns.forEach(function(b) {
          var el = document.createElement('div');
          el.id = b.id;
          el.innerHTML = b.html;
          el.style.cssText = btnStyle + (b.left ? 'left:' + b.left : 'right:' + b.right);
          container.style.position = 'relative';
          container.appendChild(el);
        });
      }

      return new MarioGame(canvas, { questions: questions || [], callbacks: callbacks || {} });
    },
    isMobile: function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  };
})();
