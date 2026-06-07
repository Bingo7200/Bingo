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
  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split('');
    var line = '';
    var lines = [];
    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i];
      var metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        lines.push(line);
        line = words[i];
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    var startY = y - (lines.length - 1) * lineHeight / 2;
    for (var j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], x, startY + j * lineHeight);
    }
  }
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
  Particle.prototype.draw = function(ctx, camX) {
    camX = camX || 0;
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    var sx = this.x - camX;
    if (this.type === 'star') {
      ctx.save();
      ctx.translate(sx, this.y);
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
      ctx.fillRect(sx - this.size / 2, this.y - this.size / 2, this.size, this.size);
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
    this.onBlockAnswer = null;
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

    // 砖块碰撞（从上方落下碰到砖块）
    blocks.forEach(function(b) {
      if (!b.active || b.answered) return;
      if (self.x + self.w > b.x && self.x < b.x + b.w &&
          self.y + self.h > b.y && self.y + self.h < b.y + b.h + 10 &&
          self.vy >= 0) {
        // 从上方碰到砖块
        self.y = b.y - self.h;
        self.vy = 0;
        self.grounded = true;
        var correct = b.answer();
        // 将结果通知游戏引擎（通过回调）
        if (self.onBlockAnswer) self.onBlockAnswer(b, correct);
      }
    });

    // 掉出屏幕
    if (this.y > canvasH + 50) {
      this.lives--;
      if (this.lives <= 0) {
        this.lives = 0;
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
  Player.prototype.draw = function(ctx, camX) {
    camX = camX || 0;
    if (this.dead) return;
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) return;

    ctx.save();
    ctx.translate(this.x + this.w / 2 - camX, this.y + this.h / 2);
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
  function QuestionBlock(x, y, questionData, questionIndex, optionIndex, optionText, isCorrect) {
    this.x = x; this.y = y; this.w = 80; this.h = 32;
    this.questionData = questionData;
    this.questionIndex = questionIndex;
    this.optionIndex = optionIndex;
    this.text = optionText;
    this.isCorrect = isCorrect;
    this.active = true;
    this.answered = false;
    this.result = null; // 'correct' | 'wrong'
    this.shake = 0;
    this.bobOffset = Math.random() * Math.PI * 2;
  }
  QuestionBlock.prototype.answer = function() {
    if (this.answered) return false;
    this.answered = true;
    this.shake = 10;
    if (this.isCorrect) {
      this.result = 'correct';
    } else {
      this.result = 'wrong';
    }
    return this.isCorrect;
  };
  QuestionBlock.prototype.update = function() {
    if (this.shake > 0) this.shake--;
    this.bobOffset += 0.03;
  };
  QuestionBlock.prototype.draw = function(ctx, camX) {
    var sx = this.x - camX;
    var sy = this.y + (this.shake > 0 ? Math.sin(this.shake) * 3 : 0);

    // 未回答的砖块有轻微浮动
    if (!this.answered) {
      sy += Math.sin(this.bobOffset) * 2;
    }

    // 砖块底色
    if (this.result === 'correct') ctx.fillStyle = COLORS.qBlockCorrect;
    else if (this.result === 'wrong') ctx.fillStyle = COLORS.qBlockWrong;
    else if (this.answered) ctx.fillStyle = COLORS.qBlockOpen;
    else ctx.fillStyle = COLORS.qBlock;

    ctx.fillRect(sx, sy, this.w, this.h);

    // 边框高光
    ctx.fillStyle = this.answered ? '#aaaaaa' : COLORS.qBlockLight;
    ctx.fillRect(sx, sy, this.w, 3);
    ctx.fillRect(sx, sy, 3, this.h);
    ctx.fillStyle = this.answered ? '#666666' : COLORS.qBlockDark;
    ctx.fillRect(sx, sy + this.h - 3, this.w, 3);
    ctx.fillRect(sx + this.w - 3, sy, 3, this.h);

    // 文字内容
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (this.result === 'correct') {
      // 正确：显示对勾
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('\u2713', sx + this.w / 2, sy + this.h / 2 + 1);
    } else if (this.result === 'wrong') {
      // 错误：显示叉号
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('\u2717', sx + this.w / 2, sy + this.h / 2 + 1);
    } else if (this.answered) {
      // 已回答但无结果（被同组正确答案关闭的）：灰色
      ctx.fillStyle = '#cccccc';
      ctx.font = '10px sans-serif';
      ctx.fillText(this.text, sx + this.w / 2, sy + this.h / 2 + 1);
    } else {
      // 未回答：显示选项文字（白色，自动缩小适配）
      ctx.fillStyle = '#ffffff';
      var fontSize = 12;
      ctx.font = 'bold ' + fontSize + 'px sans-serif';
      var maxTextW = this.w - 10;
      while (ctx.measureText(this.text).width > maxTextW && fontSize > 8) {
        fontSize--;
        ctx.font = 'bold ' + fontSize + 'px sans-serif';
      }
      ctx.fillText(this.text, sx + this.w / 2, sy + this.h / 2 + 1);
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
    this.currentQIndex = 0;

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
    this.levelWidth = Math.max(800, qw * 350 + 400);

    // 地面
    this.platforms.push(new Platform(0, 400, this.levelWidth, 200, 'ground'));

    // 每道题生成一组砖块（4个选项）
    for (var qi = 0; qi < qw; qi++) {
      var q = this.questions[qi];
      var baseX = 200 + qi * 350; // 每题一组，间隔350
      var baseY = 220; // 平台上方

      // 为每组砖块添加浮动平台
      this.platforms.push(new Platform(baseX - 10, baseY + 40, 340, 16, 'float'));

      for (var oi = 0; oi < q.options.length; oi++) {
        var bx = baseX + oi * 85;
        var by = baseY + (oi % 2) * 50; // 上下错开
        this.blocks.push(new QuestionBlock(bx, by, q, qi, oi, q.options[oi], oi === q.correct));
      }

      // 装饰金币
      if (qi % 2 === 0) {
        this.coinsList.push(new Coin(baseX + 160, 360));
      }
    }

    // 额外平台帮助到达砖块
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
            my > canvas.height / 2 + 60 && my < canvas.height / 2 + 100) {
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

  MarioGame.prototype._nextQuestion = function() {
    this.currentQIndex++;
    if (this.currentQIndex >= this.questions.length) {
      // 所有题目已答完
      this.state = 'complete';
      if (this.callbacks.onComplete) this.callbacks.onComplete(this.score, this.questions.length);
    }
  };

  MarioGame.prototype._spawnParticles = function(x, y, color, count, type) {
    for (var i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color, type || 'spark'));
    }
  };

  MarioGame.prototype.restart = function() {
    this.state = 'playing';
    this.score = 0;
    this.coins = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.shakeScreen = 0;
    this.particles = [];
    this.currentQIndex = 0;
    this.player = new Player(100, 300);
    this.camX = 0;
    this.blocks.forEach(function(b) {
      b.answered = false;
      b.result = null;
      b.active = true;
    });
    // 设置玩家回调
    this._setupBlockAnswerCallback();
  };

  MarioGame.prototype._setupBlockAnswerCallback = function() {
    var self = this;
    this.player.onBlockAnswer = function(block, correct) {
      if (correct) {
        self.score += 10;
        self.correctCount++;
        self._spawnParticles(block.x + block.w / 2, block.y, COLORS.qBlockCorrect, 15, 'star');
        if (self.callbacks.onCorrect) self.callbacks.onCorrect(block.questionIndex);
        // 移除当前题的其他砖块（标记为已回答）
        self.blocks.forEach(function(b) {
          if (b.questionIndex === block.questionIndex && b !== block) {
            b.answered = true;
            b.result = null;
          }
        });
        // 延迟进入下一题
        setTimeout(function() { self._nextQuestion(); }, 600);
      } else {
        self.wrongCount++;
        self.player.lives--;
        self.player.invincible = 60;
        self.shakeScreen = 15;
        self._spawnParticles(block.x + block.w / 2, block.y, COLORS.qBlockWrong, 15, 'spark');
        if (self.callbacks.onWrong) self.callbacks.onWrong(block.questionIndex);
        if (self.player.lives <= 0) {
          self.player.lives = 0;
          self.player.dead = true;
          self.player.vy = -5;
          self.state = 'gameover';
          if (self.callbacks.onComplete) self.callbacks.onComplete(self.score, self.questions.length);
        }
      }
    };
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
    });

    // 金币收集
    this.coinsList.forEach(function(c) {
      c.update();
      if (rectIntersect(self.player, c)) {
        self.coins++;
        for (var p = 0; p < 8; p++) {
          self.particles.push(new Particle(c.x + c.w / 2, c.y + c.h / 2, COLORS.coin, 'star'));
        }
        c.x = -9999; // 移除
      }
    });

    // 粒子更新
    this.particles.forEach(function(p) { p.update(); });
    this.particles = this.particles.filter(function(p) { return p.life > 0; });

    // 屏幕震动
    if (this.shakeScreen > 0) this.shakeScreen--;

    // 终点检测
    if (this.flag && this.player.x > this.flag.x && this.state === 'playing') {
      var allAnswered = this.blocks.every(function(b) { return b.answered; });
      if (allAnswered) {
        this.state = 'complete';
        if (self.callbacks.onComplete) self.callbacks.onComplete(self.score, self.questions.length);
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
    this.particles.forEach(function(p) { p.draw(ctx, self.camX); });

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
    ctx.fillRect(8, 8, 180, 80);
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('分数: ' + this.score, 16, 14);
    ctx.fillText('金币: ' + this.coins, 16, 34);

    // 红心生命
    var lives = this.player ? this.player.lives : 0;
    ctx.fillStyle = '#cc4444';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    var heartStr = '';
    for (var h = 0; h < lives; h++) heartStr += '\u2665';
    ctx.fillText(heartStr, 16, 56);

    // 右上角进度
    var answered = this.blocks.filter(function(b) { return b.result === 'correct'; }).length;
    ctx.fillStyle = COLORS.uiBg;
    ctx.fillRect(cw - 140, 8, 132, 30);
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'right';
    ctx.fillText('进度: ' + answered + ' / ' + this.questions.length, cw - 16, 14);

    // 底部操作提示
    ctx.fillStyle = COLORS.uiBg;
    ctx.fillRect(8, ch - 36, cw - 16, 28);
    ctx.fillStyle = COLORS.text;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u2190 \u2192 移动  |  空格/\u2191 跳跃\uff08可二段跳\uff09  |  跳到正确答案的砖块上即可作答', cw / 2, ch - 22);

    // 当前题目 HUD（顶部居中）
    if (this.state === 'playing' && this.currentQIndex < this.questions.length) {
      var q = this.questions[this.currentQIndex];
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      roundRect(ctx, 10, 44, cw - 20, 36, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var qText = '\u7B2C' + (this.currentQIndex + 1) + '\u9898: ' + q.question;
      // 自动缩小
      var maxW = cw - 60;
      while (ctx.measureText(qText).width > maxW && parseInt(ctx.font) > 10) {
        var currentSize = parseInt(ctx.font);
        ctx.font = 'bold ' + (currentSize - 1) + 'px sans-serif';
      }
      ctx.fillText(qText, cw / 2, 62);
    }
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

    // 操作说明
    ctx.fillStyle = '#ffdd88';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('操作说明', cw / 2, ch / 2 + 15);
    ctx.fillStyle = '#eeeeee';
    ctx.font = '14px sans-serif';
    ctx.fillText('\u2190 \u2192 或 A D 移动角色', cw / 2, ch / 2 + 40);
    ctx.fillText('空格 / \u2191 或 W 跳跃\uff08空中可二段跳\uff09', cw / 2, ch / 2 + 60);
    ctx.fillStyle = '#ffcc66';
    ctx.font = '13px sans-serif';
    ctx.fillText('提示：跳到正确答案的砖块上即可作答', cw / 2, ch / 2 + 85);

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
    var btnY = ch / 2 + 80;
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

      // 清空容器（移除"游戏加载中"等文字）
      container.innerHTML = '';

      var canvas = document.createElement('canvas');
      canvas.width = Math.min(900, container.clientWidth || 900);
      canvas.height = 600;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);

      // 移动端虚拟按钮
      if (this.isMobile()) {
        var btnStyle = 'position:absolute;bottom:10px;width:60px;height:60px;background:rgba(0,0,0,0.4);border:2px solid rgba(255,255,255,0.5);border-radius:8px;color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;z-index:10;user-select:none;';
        var btns = [
          { id: 'mario-btn-left', html: '\u2190', left: '10px' },
          { id: 'mario-btn-right', html: '\u2192', left: '80px' },
          { id: 'mario-btn-jump', html: '跳', right: '80px' },
          { id: 'mario-btn-down', html: '\u2193', right: '10px' }
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

      var game = new MarioGame(canvas, { questions: questions || [], callbacks: callbacks || {} });
      game._setupBlockAnswerCallback();
      return game;
    },
    isMobile: function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  };
})();
