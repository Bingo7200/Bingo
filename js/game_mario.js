;(function() {
  'use strict';

  // ==================== 颜色常量 ====================
  var COLORS = {
    sky: '#5c94fc', skyBottom: '#92b4ff',
    ground: '#00aa00', groundDark: '#008800', groundDirt: '#c84c0c',
    brick: '#c84c0c', brickDark: '#a0380c', brickLight: '#e06020',
    qBlock: '#f8b800', qBlockDark: '#c88800', qBlockLight: '#ffe060', qBlockUsed: '#888888',
    pipe: '#00aa00', pipeDark: '#008800', pipeLight: '#44cc44',
    hat: '#ff0000', skin: '#ffcc80', shirt: '#42a5f5', pants: '#1565c0', shoes: '#795548',
    goomba: '#8b4513', goombaDark: '#5d3010',
    koopa: '#2e8b57', koopaDark: '#1a6b3a',
    coin: '#ffd700', coinDark: '#daa520',
    correct: '#44cc44', wrong: '#cc4444',
    text: '#ffffff', textDark: '#1a237e',
    uiBg: 'rgba(0,0,0,0.5)',
    cloud: '#ffffff',
    hill: '#44aa44', hillSnow: '#ffffff'
  };

  // ==================== 工具函数 ====================
  function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }
  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }
  function drawRoundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
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
  function wrapText(ctx, text, maxW) {
    var chars = text.split('');
    var lines = [];
    var line = '';
    for (var i = 0; i < chars.length; i++) {
      var test = line + chars[i];
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = chars[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // ==================== 粒子系统 ====================
  function Particle(x, y, color, type) {
    this.x = x; this.y = y; this.color = color; this.type = type || 'spark';
    this.vx = rand(-3, 3); this.vy = rand(-6, -1);
    this.life = 1.0; this.decay = rand(0.02, 0.04);
    this.size = rand(2, 5);
  }
  Particle.prototype.update = function() {
    this.x += this.vx; this.y += this.vy; this.vy += 0.15;
    this.life -= this.decay;
  };
  Particle.prototype.draw = function(ctx, camX) {
    if (this.life <= 0) return;
    var sx = this.x - camX;
    ctx.globalAlpha = clamp(this.life, 0, 1);
    ctx.fillStyle = this.color;
    if (this.type === 'star') {
      ctx.save();
      ctx.translate(sx, this.y);
      ctx.rotate(this.life * 10);
      ctx.beginPath();
      for (var i = 0; i < 5; i++) {
        var a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        var px = Math.cos(a) * this.size, py = Math.sin(a) * this.size;
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
    this.speed = 4; this.jumpForce = -11; this.gravity = 0.5;
    this.grounded = false; this.canDoubleJump = true;
    this.facingRight = true;
    this.frame = 0; this.frameTimer = 0;
    this.lives = 3; this.invincible = 0; this.dead = false; this.deadTimer = 0;
    this.score = 0; this.coins = 0;
  }
  Player.prototype.update = function(keys, canvasW, canvasH) {
    if (this.dead) { this.deadTimer++; this.vy += this.gravity; this.y += this.vy; return; }
    if (this.invincible > 0) this.invincible--;

    // 移动
    if (keys.left) { this.vx = -this.speed; this.facingRight = false; }
    else if (keys.right) { this.vx = this.speed; this.facingRight = true; }
    else { this.vx *= 0.8; if (Math.abs(this.vx) < 0.1) this.vx = 0; }

    // 跳跃
    if (keys.jumpPressed) {
      if (this.grounded) {
        this.vy = this.jumpForce; this.grounded = false; this.canDoubleJump = true;
      } else if (this.canDoubleJump) {
        this.vy = this.jumpForce * 0.8; this.canDoubleJump = false;
      }
      keys.jumpPressed = false;
    }

    this.vy += this.gravity;
    this.x += this.vx; this.y += this.vy;

    // 边界
    if (this.x < 0) this.x = 0;

    // 动画帧
    if (Math.abs(this.vx) > 0.5 && this.grounded) {
      this.frameTimer++;
      if (this.frameTimer > 6) { this.frame = (this.frame + 1) % 2; this.frameTimer = 0; }
    } else if (this.grounded) {
      this.frame = 0; this.frameTimer = 0;
    }
  };
  Player.prototype.draw = function(ctx, camX) {
    if (this.dead) return;
    if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2) return;

    var sx = this.x - camX, sy = this.y;
    ctx.save();
    if (!this.facingRight) {
      ctx.translate(sx + this.w, 0);
      ctx.scale(-1, 1);
      sx = 0;
    }
    // 跳跃时微倾
    if (!this.grounded) {
      ctx.translate(sx + this.w / 2, sy + this.h / 2);
      ctx.rotate(this.facingRight ? 0.15 : -0.15);
      ctx.translate(-(sx + this.w / 2), -(sy + this.h / 2));
    }

    // 帽子
    ctx.fillStyle = COLORS.hat;
    ctx.fillRect(sx + 4, sy, 16, 6);
    ctx.fillRect(sx + 2, sy + 6, 20, 4);
    // 脸
    ctx.fillStyle = COLORS.skin;
    ctx.fillRect(sx + 4, sy + 10, 16, 8);
    // 眼睛
    ctx.fillStyle = '#333';
    ctx.fillRect(sx + 14, sy + 12, 3, 3);
    // 身体
    ctx.fillStyle = COLORS.shirt;
    ctx.fillRect(sx + 4, sy + 18, 16, 6);
    // 背带裤
    ctx.fillStyle = COLORS.pants;
    ctx.fillRect(sx + 4, sy + 24, 16, 2);
    ctx.fillRect(sx + 8, sy + 18, 3, 8);
    ctx.fillRect(sx + 13, sy + 18, 3, 8);
    // 鞋子
    ctx.fillStyle = COLORS.shoes;
    if (this.grounded && this.frame === 1) {
      ctx.fillRect(sx + 2, sy + 26, 8, 6);
      ctx.fillRect(sx + 14, sy + 24, 8, 6);
    } else {
      ctx.fillRect(sx + 2, sy + 26, 8, 6);
      ctx.fillRect(sx + 14, sy + 26, 8, 6);
    }
    ctx.restore();
  };
  Player.prototype.respawn = function(x, y) {
    this.x = x; this.y = y; this.vx = 0; this.vy = 0;
    this.invincible = 120; this.grounded = false; this.canDoubleJump = true;
  };

  // ==================== 平台 ====================
  function Platform(x, y, w, h, type) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.type = type || 'ground'; // ground | brick | qblock | pipe | float
    this.destroyed = false;
    this.used = false;
    this.questionIndex = -1;
    this.result = null; // 'correct' | 'wrong'
    this.shake = 0;
    this.coinAnim = 0;
  }
  Platform.prototype.update = function() {
    if (this.shake > 0) this.shake--;
    if (this.coinAnim > 0) this.coinAnim--;
  };
  Platform.prototype.draw = function(ctx, camX) {
    if (this.destroyed) return;
    var sx = this.x - camX;
    var shakeOff = this.shake > 0 ? Math.sin(this.shake * 2) * 2 : 0;
    var sy = this.y + shakeOff;

    if (this.type === 'ground') {
      // 草地顶部
      ctx.fillStyle = COLORS.ground;
      ctx.fillRect(sx, sy, this.w, 6);
      // 泥土
      ctx.fillStyle = COLORS.groundDirt;
      ctx.fillRect(sx, sy + 6, this.w, this.h - 6);
      // 纹理线
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      for (var i = 0; i < this.w; i += 24) {
        ctx.beginPath(); ctx.moveTo(sx + i, sy + 6); ctx.lineTo(sx + i, sy + this.h); ctx.stroke();
      }
      for (var j = sy + 18; j < sy + this.h; j += 16) {
        ctx.beginPath(); ctx.moveTo(sx, j); ctx.lineTo(sx + this.w, j); ctx.stroke();
      }
    } else if (this.type === 'float') {
      ctx.fillStyle = '#b85c38';
      ctx.fillRect(sx, sy, this.w, this.h);
      ctx.fillStyle = '#d07850';
      ctx.fillRect(sx, sy, this.w, 3);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(sx, sy + this.h - 2, this.w, 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      for (var fx = 0; fx < this.w; fx += 20) {
        ctx.strokeRect(sx + fx, sy, 20, this.h);
      }
    } else if (this.type === 'pipe') {
      var lipH = 16;
      // 管道主体
      ctx.fillStyle = COLORS.pipe;
      ctx.fillRect(sx + 6, sy + lipH, this.w - 12, this.h - lipH);
      // 管道顶部唇
      ctx.fillRect(sx, sy, this.w, lipH);
      // 高光
      ctx.fillStyle = COLORS.pipeLight;
      ctx.fillRect(sx + 2, sy, 6, lipH);
      ctx.fillRect(sx + 10, sy + lipH, 6, this.h - lipH);
      // 阴影
      ctx.fillStyle = COLORS.pipeDark;
      ctx.fillRect(sx + this.w - 8, sy, 6, lipH);
      ctx.fillRect(sx + this.w - 14, sy + lipH, 6, this.h - lipH);
    } else if (this.type === 'brick') {
      ctx.fillStyle = COLORS.brick;
      ctx.fillRect(sx, sy, this.w, this.h);
      ctx.fillStyle = COLORS.brickLight;
      ctx.fillRect(sx, sy, this.w, 2);
      ctx.fillRect(sx, sy, 2, this.h);
      ctx.fillStyle = COLORS.brickDark;
      ctx.fillRect(sx, sy + this.h - 2, this.w, 2);
      ctx.fillRect(sx + this.w - 2, sy, 2, this.h);
      // 砖缝
      ctx.strokeStyle = '#8b3000';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx + 0.5, sy + 0.5, this.w - 1, this.h - 1);
      ctx.beginPath();
      ctx.moveTo(sx, sy + this.h / 2); ctx.lineTo(sx + this.w, sy + this.h / 2);
      ctx.moveTo(sx + this.w / 2, sy); ctx.lineTo(sx + this.w / 2, sy + this.h / 2);
      ctx.stroke();
    } else if (this.type === 'qblock') {
      var baseColor = COLORS.qBlock;
      var darkColor = COLORS.qBlockDark;
      var lightColor = COLORS.qBlockLight;
      if (this.result === 'correct') { baseColor = COLORS.correct; darkColor = '#2a9a2a'; lightColor = '#66ee66'; }
      else if (this.result === 'wrong') { baseColor = COLORS.wrong; darkColor = '#992222'; lightColor = '#ee6666'; }
      else if (this.used) { baseColor = COLORS.qBlockUsed; darkColor = '#666666'; lightColor = '#aaaaaa'; }

      ctx.fillStyle = baseColor;
      ctx.fillRect(sx, sy, this.w, this.h);
      ctx.fillStyle = lightColor;
      ctx.fillRect(sx, sy, this.w, 3);
      ctx.fillRect(sx, sy, 3, this.h);
      ctx.fillStyle = darkColor;
      ctx.fillRect(sx, sy + this.h - 3, this.w, 3);
      ctx.fillRect(sx + this.w - 3, sy, 3, this.h);
      // 问号或标记
      if (!this.used && !this.result) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', sx + this.w / 2, sy + this.h / 2 + 1);
      } else if (this.result === 'correct') {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('\u2713', sx + this.w / 2, sy + this.h / 2 + 1);
      } else if (this.result === 'wrong') {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('\u2717', sx + this.w / 2, sy + this.h / 2 + 1);
      }
      // 金币弹出动画
      if (this.coinAnim > 0) {
        var coinY = sy - 20 - (20 - this.coinAnim) * 2;
        var coinScale = Math.sin((this.coinAnim / 20) * Math.PI);
        ctx.fillStyle = COLORS.coin;
        ctx.beginPath();
        ctx.ellipse(sx + this.w / 2, coinY, 8 * coinScale, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = COLORS.coinDark;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };

  // ==================== 怪物 ====================
  function Enemy(x, y, type) {
    this.x = x; this.y = y; this.w = 28; this.h = 28;
    this.vx = -1.5; this.active = true; this.squished = false;
    this.squishTimer = 0;
    this.type = type; // 'goomba' | 'koopa'
    this.frame = 0; this.frameTimer = 0;
    this.patrolDir = 1;
  }
  Enemy.prototype.update = function(platforms) {
    if (!this.active) return;
    if (this.squished) { this.squishTimer++; if (this.squishTimer > 30) this.active = false; return; }

    this.x += this.vx * this.patrolDir;
    this.frameTimer++;
    if (this.frameTimer > 10) { this.frame = (this.frame + 1) % 2; this.frameTimer = 0; }

    // 边缘检测：检查前方是否有地面
    var self = this;
    var hasGround = false;
    var checkX = this.patrolDir > 0 ? this.x + this.w + 5 : this.x - 5;
    for (var i = 0; i < platforms.length; i++) {
      var p = platforms[i];
      if (p.destroyed) continue;
      if (p.type === 'ground' || p.type === 'float' || p.type === 'pipe') {
        if (checkX >= p.x && checkX <= p.x + p.w &&
            this.y + this.h >= p.y - 5 && this.y + this.h <= p.y + 15) {
          hasGround = true;
          break;
        }
      }
    }
    if (!hasGround) this.patrolDir *= -1;

    // 碰墙检测：检查前方是否有障碍物
    for (var i = 0; i < platforms.length; i++) {
      var p = platforms[i];
      if (p.destroyed) continue;
      if (p.type === 'pipe') {
        if (this.patrolDir > 0 && this.x + this.w + 2 >= p.x && this.x + this.w < p.x &&
            this.y + this.h > p.y && this.y < p.y + p.h) {
          this.patrolDir = -1;
        } else if (this.patrolDir < 0 && this.x - 2 <= p.x + p.w && this.x > p.x + p.w &&
            this.y + this.h > p.y && this.y < p.y + p.h) {
          this.patrolDir = 1;
        }
      }
    }
  };
  Enemy.prototype.draw = function(ctx, camX) {
    if (!this.active) return;
    var sx = this.x - camX, sy = this.y;

    if (this.type === 'goomba') {
      if (this.squished) {
        // 被踩扁
        ctx.fillStyle = COLORS.goomba;
        ctx.fillRect(sx, sy + this.h - 8, this.w, 8);
        ctx.fillStyle = COLORS.goombaDark;
        ctx.fillRect(sx + 2, sy + this.h - 6, 6, 4);
        ctx.fillRect(sx + this.w - 8, sy + this.h - 6, 6, 4);
        return;
      }
      // 身体（棕色半圆）
      ctx.fillStyle = COLORS.goomba;
      ctx.beginPath();
      ctx.arc(sx + this.w / 2, sy + this.h * 0.55, this.w / 2, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(sx + 2, sy + this.h * 0.55, this.w - 4, this.h * 0.45);
      // 脚
      ctx.fillStyle = COLORS.goombaDark;
      var footOff = this.frame === 1 ? 2 : 0;
      ctx.fillRect(sx + 1 - footOff, sy + this.h - 6, 8, 6);
      ctx.fillRect(sx + this.w - 9 + footOff, sy + this.h - 6, 8, 6);
      // 眼睛
      ctx.fillStyle = '#fff';
      ctx.fillRect(sx + 5, sy + this.h * 0.35, 7, 7);
      ctx.fillRect(sx + this.w - 12, sy + this.h * 0.35, 7, 7);
      ctx.fillStyle = '#000';
      ctx.fillRect(sx + 8, sy + this.h * 0.35 + 2, 3, 4);
      ctx.fillRect(sx + this.w - 10, sy + this.h * 0.35 + 2, 3, 4);
      // 眉毛
      ctx.fillStyle = '#000';
      ctx.fillRect(sx + 4, sy + this.h * 0.3, 9, 2);
      ctx.fillRect(sx + this.w - 13, sy + this.h * 0.3, 9, 2);
    } else if (this.type === 'koopa') {
      if (this.squished) {
        // 缩壳
        ctx.fillStyle = COLORS.koopa;
        ctx.beginPath();
        ctx.ellipse(sx + this.w / 2, sy + this.h - 10, 14, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = COLORS.koopaDark;
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }
      // 壳（绿色椭圆）
      ctx.fillStyle = COLORS.koopa;
      ctx.beginPath();
      ctx.ellipse(sx + this.w / 2, sy + this.h * 0.5, 12, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = COLORS.koopaDark;
      ctx.lineWidth = 2;
      ctx.stroke();
      // 头
      ctx.fillStyle = COLORS.koopa;
      ctx.beginPath();
      ctx.arc(sx + this.w / 2 + (this.patrolDir > 0 ? 8 : -8), sy + this.h * 0.25, 8, 0, Math.PI * 2);
      ctx.fill();
      // 眼睛
      ctx.fillStyle = '#fff';
      ctx.fillRect(sx + this.w / 2 + (this.patrolDir > 0 ? 10 : -14), sy + this.h * 0.2, 4, 4);
      ctx.fillStyle = '#000';
      ctx.fillRect(sx + this.w / 2 + (this.patrolDir > 0 ? 11 : -13), sy + this.h * 0.2 + 1, 2, 2);
      // 脚
      ctx.fillStyle = COLORS.koopaDark;
      var fOff = this.frame === 1 ? 2 : 0;
      ctx.fillRect(sx + 4 - fOff, sy + this.h - 6, 8, 6);
      ctx.fillRect(sx + this.w - 12 + fOff, sy + this.h - 6, 8, 6);
    }
  };

  // ==================== 金币 ====================
  function Coin(x, y) {
    this.x = x; this.y = y; this.w = 16; this.h = 20;
    this.collected = false;
    this.frame = 0; this.frameTimer = 0;
  }
  Coin.prototype.update = function() {
    if (this.collected) return;
    this.frameTimer++;
    if (this.frameTimer > 6) { this.frame = (this.frame + 1) % 4; this.frameTimer = 0; }
  };
  Coin.prototype.draw = function(ctx, camX) {
    if (this.collected) return;
    var sx = this.x - camX;
    var scale = [1, 0.6, 0.2, 0.6][this.frame];
    ctx.fillStyle = COLORS.coin;
    ctx.beginPath();
    ctx.ellipse(sx + this.w / 2, this.y + this.h / 2, (this.w / 2) * scale, this.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.coinDark;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // ==================== 选项方块 ====================
  function OptionBlock(x, y, w, h, text, isCorrect, index) {
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.text = text; this.isCorrect = isCorrect; this.index = index;
    this.answered = false; this.result = null;
    this.floatOffset = rand(0, Math.PI * 2);
    this.timer = 0;
  }
  OptionBlock.prototype.update = function() {
    this.timer++;
    this.floatOffset += 0.05;
  };
  OptionBlock.prototype.draw = function(ctx, camX) {
    var sx = this.x - camX;
    var floatY = this.y + Math.sin(this.floatOffset) * 3;

    // 背景
    if (this.answered) {
      ctx.fillStyle = this.result === 'correct' ? 'rgba(68,204,68,0.85)' : 'rgba(204,68,68,0.85)';
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
    }
    drawRoundRect(ctx, sx, floatY, this.w, this.h, 4);
    ctx.fill();

    // 边框
    ctx.strokeStyle = this.answered
      ? (this.result === 'correct' ? '#66ee66' : '#ee6666')
      : COLORS.qBlock;
    ctx.lineWidth = 2;
    drawRoundRect(ctx, sx, floatY, this.w, this.h, 4);
    ctx.stroke();

    // 文字
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var lines = wrapText(ctx, this.text, this.w - 8);
    var lineH = 13;
    var startY = floatY + this.h / 2 - (lines.length - 1) * lineH / 2;
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], sx + this.w / 2, startY + i * lineH);
    }
  };

  // ==================== 终点旗帜 ====================
  function drawFlag(ctx, x, y, camX) {
    var sx = x - camX;
    var poleH = 120;
    // 旗杆
    ctx.fillStyle = '#888';
    ctx.fillRect(sx, y - poleH, 6, poleH);
    ctx.fillStyle = '#aaa';
    ctx.fillRect(sx, y - poleH, 2, poleH);
    // 球
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(sx + 3, y - poleH, 6, 0, Math.PI * 2);
    ctx.fill();
    // 旗帜
    ctx.fillStyle = '#00aa00';
    ctx.beginPath();
    ctx.moveTo(sx + 6, y - poleH + 10);
    ctx.lineTo(sx + 46, y - poleH + 25);
    ctx.lineTo(sx + 6, y - poleH + 40);
    ctx.closePath();
    ctx.fill();
    // 文字
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('\u7ec8\u70b9', sx + 26, y - poleH + 28);
  }

  // ==================== 游戏引擎 ====================
  function MarioGame(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.questions = options.questions || [];
    this.onCorrect = options.onCorrect || function() {};
    this.onWrong = options.onWrong || function() {};
    this.onComplete = options.onComplete || function() {};

    this.state = 'start'; // start | playing | paused | gameover | victory
    this.score = 0; this.coins = 0;
    this.currentQ = 0; this.correctCount = 0;
    this.lives = 3;

    this.player = null;
    this.platforms = [];
    this.enemies = [];
    this.coinList = [];
    this.particles = [];
    this.optionBlocks = [];
    this.clouds = [];
    this.hills = [];

    this.camX = 0;
    this.levelWidth = 0;
    this.flagX = 0;

    this.showingQuestion = false;
    this.questionTimer = 0;
    this.currentQuestionData = null;
    this.shakeScreen = 0;

    this.keys = { left: false, right: false, jump: false, jumpPressed: false };
    this.animFrame = 0;

    this._generateLevel();
    this._initInput();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  // ==================== 关卡生成 ====================
  MarioGame.prototype._generateLevel = function() {
    var qCount = this.questions.length;
    this.levelWidth = Math.max(2000, qCount * 400 + 600);

    var groundY = 500;
    var self = this;

    // 起始区地面
    this.platforms.push(new Platform(0, groundY, 600, 100, 'ground'));

    // 每个题目区域
    for (var qi = 0; qi < qCount; qi++) {
      var areaX = 600 + qi * 400;

      // 地面（有时有坑）
      if (qi > 0 && qi % 3 === 0) {
        this.platforms.push(new Platform(areaX, groundY, 150, 100, 'ground'));
        this.platforms.push(new Platform(areaX + 250, groundY, 150, 100, 'ground'));
        // 坑上放浮动平台辅助
        this.platforms.push(new Platform(areaX + 130, groundY - 50, 60, 16, 'float'));
      } else {
        this.platforms.push(new Platform(areaX, groundY, 400, 100, 'ground'));
      }

      // 浮动平台
      if (randInt(0, 1)) {
        var floatX = areaX + randInt(50, 200);
        var floatY = groundY - randInt(80, 150);
        this.platforms.push(new Platform(floatX, floatY, 80, 16, 'float'));
      }

      // 问号砖块
      var qBlockX = areaX + 150;
      var qBlockY = groundY - 100;
      var qBlock = new Platform(qBlockX, qBlockY, 32, 32, 'qblock');
      qBlock.questionIndex = qi;
      this.platforms.push(qBlock);

      // 普通砖块
      var brickCount = randInt(2, 4);
      for (var bi = 0; bi < brickCount; bi++) {
        var brickX = areaX + randInt(20, 350);
        var brickY = groundY - randInt(50, 120);
        // 避免和问号砖块重叠
        if (Math.abs(brickX - qBlockX) < 40 && Math.abs(brickY - qBlockY) < 40) continue;
        this.platforms.push(new Platform(brickX, brickY, 32, 32, 'brick'));
      }

      // 管道
      if (randInt(0, 1)) {
        var pipeX = areaX + randInt(280, 350);
        var pipeH = randInt(2, 4) * 32;
        this.platforms.push(new Platform(pipeX, groundY - pipeH, 48, pipeH, 'pipe'));
      }

      // 怪物
      if (qi > 0 && randInt(0, 1)) {
        var enemyX = areaX + randInt(100, 300);
        var enemyType = randInt(0, 1) ? 'goomba' : 'koopa';
        this.enemies.push(new Enemy(enemyX, groundY - 28, enemyType));
      }

      // 金币
      var coinCount = randInt(2, 4);
      for (var ci = 0; ci < coinCount; ci++) {
        var coinX = areaX + randInt(30, 370);
        var coinY = groundY - randInt(60, 180);
        this.coinList.push(new Coin(coinX, coinY));
      }
    }

    // 终点区
    var endX = 600 + qCount * 400;
    this.platforms.push(new Platform(endX, groundY, 400, 100, 'ground'));
    this.flagX = endX + 200;

    // 云朵
    for (var c = 0; c < 15; c++) {
      this.clouds.push({ x: rand(0, this.levelWidth), y: rand(30, 150), w: rand(60, 120), speed: rand(0.2, 0.5) });
    }

    // 远景山丘
    for (var h = 0; h < 8; h++) {
      this.hills.push({ x: h * 300 + rand(-50, 50), w: rand(150, 250), h: rand(60, 120) });
    }
  };

  // ==================== 输入处理 ====================
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
      if (k === 'Enter') {
        if (self.state === 'start') self._startGame();
        else if (self.state === 'gameover' || self.state === 'victory') self._restart();
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].indexOf(k) >= 0) e.preventDefault();
    }
    document.addEventListener('keydown', function(e) { onKey(e, true); });
    document.addEventListener('keyup', function(e) { onKey(e, false); });

    // 点击开始/重来
    canvas.addEventListener('click', function(e) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      var mx = (e.clientX - rect.left) * scaleX;
      var my = (e.clientY - rect.top) * scaleY;
      var cw = canvas.width, ch = canvas.height;

      if (self.state === 'start') {
        if (mx > cw / 2 - 80 && mx < cw / 2 + 80 && my > ch / 2 + 100 && my < ch / 2 + 140) {
          self._startGame();
        }
      } else if (self.state === 'gameover' || self.state === 'victory') {
        if (mx > cw / 2 - 80 && mx < cw / 2 + 80 && my > ch / 2 + 80 && my < ch / 2 + 120) {
          self._restart();
        }
      }
    });

    // 虚拟按钮（移动端）
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
  };

  MarioGame.prototype._startGame = function() {
    this.state = 'playing';
    this.player = new Player(100, 400);
    this.player.lives = this.lives;
  };

  MarioGame.prototype._restart = function() {
    this.state = 'playing';
    this.score = 0; this.coins = 0;
    this.currentQ = 0; this.correctCount = 0;
    this.lives = 3;
    this.showingQuestion = false;
    this.questionTimer = 0;
    this.currentQuestionData = null;
    this.optionBlocks = [];
    this.particles = [];
    this.shakeScreen = 0;

    // 重置砖块状态
    for (var i = 0; i < this.platforms.length; i++) {
      var p = this.platforms[i];
      if (p.type === 'qblock') { p.used = false; p.result = null; p.shake = 0; p.coinAnim = 0; }
      if (p.type === 'brick') { p.destroyed = false; }
    }
    // 重置怪物
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].active = true; this.enemies[i].squished = false; this.enemies[i].squishTimer = 0;
    }
    // 重置金币
    for (var i = 0; i < this.coinList.length; i++) {
      this.coinList[i].collected = false;
    }

    this.player = new Player(100, 400);
    this.player.lives = 3;
    this.camX = 0;
  };

  // ==================== 显示题目 ====================
  MarioGame.prototype._showQuestion = function(qIndex) {
    if (qIndex >= this.questions.length) return;
    this.currentQ = qIndex;
    this.showingQuestion = true;
    this.questionTimer = 0;
    this.currentQuestionData = this.questions[qIndex];

    // 找到对应的问号砖块
    var sourceBlock = null;
    for (var i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i].questionIndex === qIndex) { sourceBlock = this.platforms[i]; break; }
    }
    if (!sourceBlock) return;

    var q = this.currentQuestionData;
    var optW = 90, optH = 28, gap = 12;
    var totalW = q.options.length * optW + (q.options.length - 1) * gap;
    var startX = sourceBlock.x + sourceBlock.w / 2 - totalW / 2;
    var optY = sourceBlock.y - 60;

    this.optionBlocks = [];
    for (var i = 0; i < q.options.length; i++) {
      this.optionBlocks.push(new OptionBlock(
        startX + i * (optW + gap), optY, optW, optH,
        q.options[i], i === q.correct, i
      ));
    }
  };

  // ==================== 游戏循环 ====================
  MarioGame.prototype._loop = function() {
    this._update();
    this._draw();
    requestAnimationFrame(this._loop);
  };

  MarioGame.prototype._update = function() {
    this.animFrame++;
    // 云朵始终移动
    for (var i = 0; i < this.clouds.length; i++) {
      this.clouds[i].x += this.clouds[i].speed;
      if (this.clouds[i].x > this.levelWidth + 200) this.clouds[i].x = -200;
    }

    if (this.state !== 'playing') return;

    var self = this;
    var player = this.player;
    if (!player || player.dead) {
      if (player && player.deadTimer > 60) this.state = 'gameover';
      return;
    }

    // 更新玩家
    player.update(this.keys, this.canvas.width, this.canvas.height);

    // 玩家与平台碰撞
    player.grounded = false;
    for (var i = 0; i < this.platforms.length; i++) {
      var p = this.platforms[i];
      if (p.destroyed) continue;
      if (p.type === 'brick' || p.type === 'qblock') continue; // 砖块和问号块不作为站立平台（除非从上方落下）

      // 从上方落下站立
      if (player.x + player.w > p.x && player.x < p.x + p.w &&
          player.y + player.h > p.y && player.y + player.h < p.y + 15 &&
          player.vy >= 0) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.grounded = true;
        player.canDoubleJump = true;
      }
    }

    // 砖块碰撞（从下方顶）
    for (var i = 0; i < this.platforms.length; i++) {
      var p = this.platforms[i];
      if (p.type === 'ground' || p.type === 'pipe' || p.type === 'float') continue;
      if (p.destroyed) continue;

      if (player.x + player.w > p.x && player.x < p.x + p.w &&
          player.y < p.y + p.h && player.y + player.h > p.y) {
        if (player.vy < 0 && player.y + player.h - player.vy >= p.y + p.h) {
          player.y = p.y + p.h;
          player.vy = 0;

          if (p.type === 'brick') {
            p.destroyed = true;
            player.score += 5;
            this.score = player.score;
            for (var k = 0; k < 8; k++) {
              this.particles.push(new Particle(p.x + p.w / 2, p.y + p.h / 2, COLORS.brick, 'spark'));
            }
          } else if (p.type === 'qblock' && !p.used) {
            p.used = true;
            p.shake = 10;
            p.coinAnim = 20;
            if (p.questionIndex < 0) {
              // 弹出金币
              player.score += 10;
              player.coins++;
              this.score = player.score;
              this.coins = player.coins;
              for (var k = 0; k < 5; k++) {
                this.particles.push(new Particle(p.x + p.w / 2, p.y, COLORS.coin, 'star'));
              }
            } else {
              // 弹出题目
              this._showQuestion(p.questionIndex);
            }
          }
        }
      }
    }

    // 管道侧面碰撞（阻挡）
    for (var i = 0; i < this.platforms.length; i++) {
      var p = this.platforms[i];
      if (p.type !== 'pipe' || p.destroyed) continue;
      // 左侧碰撞
      if (player.x + player.w > p.x && player.x + player.w < p.x + 10 &&
          player.y + player.h > p.y + 16 && player.y < p.y + p.h && player.vx > 0) {
        player.x = p.x - player.w;
        player.vx = 0;
      }
      // 右侧碰撞
      if (player.x < p.x + p.w && player.x > p.x + p.w - 10 &&
          player.y + player.h > p.y + 16 && player.y < p.y + p.h && player.vx < 0) {
        player.x = p.x + p.w;
        player.vx = 0;
      }
    }

    // 敌人碰撞
    if (player.invincible <= 0) {
      for (var i = 0; i < this.enemies.length; i++) {
        var e = this.enemies[i];
        if (!e.active || e.squished) continue;
        if (aabb(player, e)) {
          // 从上方踩
          if (player.vy > 0 && player.y + player.h - player.vy <= e.y + e.h / 2) {
            e.squished = true;
            e.squishTimer = 0;
            player.vy = -8;
            player.score += 5;
            this.score = player.score;
            for (var k = 0; k < 10; k++) {
              this.particles.push(new Particle(e.x + e.w / 2, e.y + e.h / 2,
                e.type === 'goomba' ? COLORS.goomba : COLORS.koopa, 'spark'));
            }
          } else {
            // 被碰到扣命
            player.lives--;
            player.invincible = 90;
            this.lives = player.lives;
            this.shakeScreen = 10;
            // 击退
            player.vx = player.x < e.x ? -5 : 5;
            player.vy = -5;
            if (player.lives <= 0) {
              player.lives = 0;
              player.dead = true;
              player.vy = -8;
              this.state = 'gameover';
              this.onComplete(this.score, this.questions.length);
            }
          }
        }
      }
    }

    // 金币收集
    for (var i = 0; i < this.coinList.length; i++) {
      var c = this.coinList[i];
      if (c.collected) continue;
      c.update();
      if (aabb(player, c)) {
        c.collected = true;
        player.coins++;
        player.score += 5;
        this.coins = player.coins;
        this.score = player.score;
        for (var k = 0; k < 6; k++) {
          this.particles.push(new Particle(c.x + c.w / 2, c.y + c.h / 2, COLORS.coin, 'star'));
        }
      }
    }

    // 选项方块碰撞
    var answeredOption = false;
    for (var i = 0; i < this.optionBlocks.length; i++) {
      var ob = this.optionBlocks[i];
      if (ob.answered) continue;
      ob.update();

      if (player.vy < 0 &&
          player.x + player.w > ob.x && player.x < ob.x + ob.w &&
          player.y < ob.y + ob.h && player.y + player.h > ob.y &&
          player.y + player.h - player.vy >= ob.y + ob.h) {
        player.y = ob.y + ob.h;
        player.vy = 0;
        ob.answered = true;
        answeredOption = true;

        if (ob.isCorrect) {
          ob.result = 'correct';
          player.score += 20;
          this.score = player.score;
          this.correctCount++;
          this.onCorrect(this.currentQ);
          for (var k = 0; k < 15; k++) {
            this.particles.push(new Particle(ob.x + ob.w / 2, ob.y + ob.h / 2, COLORS.correct, 'star'));
          }
        } else {
          ob.result = 'wrong';
          player.lives--;
          player.invincible = 90;
          this.lives = player.lives;
          this.onWrong(this.currentQ);
          this.shakeScreen = 10;
          for (var k = 0; k < 10; k++) {
            this.particles.push(new Particle(ob.x + ob.w / 2, ob.y + ob.h / 2, COLORS.wrong, 'spark'));
          }
          if (player.lives <= 0) {
            player.lives = 0;
            player.dead = true;
            player.vy = -8;
            this.state = 'gameover';
            this.onComplete(this.score, this.questions.length);
          }
        }
        break;
      }
    }
    // 选完任意选项后，立即清除所有选项
    if (answeredOption) {
      this.optionBlocks = [];
      this.showingQuestion = false;
      this.currentQuestionData = null;
    }

    // 题目计时器（选项不会自动消失，等玩家选择后才清除）
    if (this.showingQuestion) {
      this.questionTimer++;
      // 只有在所有选项都已回答时才清除
      if (this.questionTimer > 30) {
        var allAnswered = true;
        for (var i = 0; i < this.optionBlocks.length; i++) {
          if (!this.optionBlocks[i].answered) allAnswered = false;
        }
        if (allAnswered) {
          this.showingQuestion = false;
          this.optionBlocks = [];
          this.currentQuestionData = null;
        }
      }
    }

    // 怪物更新
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(this.platforms);
    }

    // 平台更新
    for (var i = 0; i < this.platforms.length; i++) {
      this.platforms[i].update();
    }

    // 粒子更新
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    // 屏幕震动
    if (this.shakeScreen > 0) this.shakeScreen--;

    // 相机跟随
    this.camX = clamp(player.x - this.canvas.width / 3, 0, this.levelWidth - this.canvas.width);

    // 掉出屏幕
    if (player.y > this.canvas.height + 50) {
      player.lives--;
      this.lives = player.lives;
      if (player.lives <= 0) {
        player.lives = 0;
        player.dead = true;
        this.state = 'gameover';
        this.onComplete(this.score, this.questions.length);
      } else {
        player.respawn(this.camX + 100, 300);
      }
    }

    // 终点检测
    if (player.x + player.w > this.flagX) {
      this.state = 'victory';
      this.onComplete(this.score, this.questions.length);
    }
  };

  // ==================== 绘制 ====================
  MarioGame.prototype._draw = function() {
    var ctx = this.ctx;
    var cw = this.canvas.width, ch = this.canvas.height;
    var self = this;

    ctx.save();
    if (this.shakeScreen > 0) {
      ctx.translate(rand(-3, 3), rand(-3, 3));
    }

    // 天空渐变
    var skyGrad = ctx.createLinearGradient(0, 0, 0, ch);
    skyGrad.addColorStop(0, COLORS.sky);
    skyGrad.addColorStop(1, COLORS.skyBottom);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, cw, ch);

    // 远景山丘（视差）
    for (var i = 0; i < this.hills.length; i++) {
      var h = this.hills[i];
      var sx = h.x - this.camX * 0.3;
      ctx.fillStyle = COLORS.hill;
      ctx.beginPath();
      ctx.moveTo(sx, ch - 100);
      ctx.lineTo(sx + h.w / 2, ch - 100 - h.h);
      ctx.lineTo(sx + h.w, ch - 100);
      ctx.closePath();
      ctx.fill();
      // 雪顶
      ctx.fillStyle = COLORS.hillSnow;
      ctx.beginPath();
      ctx.moveTo(sx + h.w / 2 - 15, ch - 100 - h.h + 15);
      ctx.lineTo(sx + h.w / 2, ch - 100 - h.h);
      ctx.lineTo(sx + h.w / 2 + 15, ch - 100 - h.h + 15);
      ctx.closePath();
      ctx.fill();
    }

    // 云朵
    for (var i = 0; i < this.clouds.length; i++) {
      var c = this.clouds[i];
      var sx = c.x - this.camX * 0.5;
      ctx.fillStyle = COLORS.cloud;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(sx, c.y, c.w / 3, 0, Math.PI * 2);
      ctx.arc(sx + c.w / 3, c.y - 8, c.w / 4, 0, Math.PI * 2);
      ctx.arc(sx + c.w / 2, c.y, c.w / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // 平台
    for (var i = 0; i < this.platforms.length; i++) {
      this.platforms[i].draw(ctx, this.camX);
    }

    // 金币
    for (var i = 0; i < this.coinList.length; i++) {
      this.coinList[i].draw(ctx, this.camX);
    }

    // 敌人
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(ctx, this.camX);
    }

    // 终点旗帜
    drawFlag(ctx, this.flagX, 500, this.camX);

    // 玩家
    if (this.player) this.player.draw(ctx, this.camX);

    // 选项方块
    for (var i = 0; i < this.optionBlocks.length; i++) {
      this.optionBlocks[i].draw(ctx, this.camX);
    }

    // 粒子
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(ctx, this.camX);
    }

    ctx.restore();

    // UI层
    this._drawUI(ctx, cw, ch);

    // 状态画面
    if (this.state === 'start') this._drawStart(ctx, cw, ch);
    else if (this.state === 'gameover') this._drawGameOver(ctx, cw, ch);
    else if (this.state === 'victory') this._drawVictory(ctx, cw, ch);
  };

  MarioGame.prototype._drawUI = function(ctx, cw, ch) {
    // 左上角：得分和金币
    ctx.fillStyle = COLORS.uiBg;
    drawRoundRect(ctx, 8, 8, 170, 70, 6);
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('\u5206\u6570: ' + this.score, 18, 16);
    ctx.fillText('\u91d1\u5e01: ' + this.coins, 18, 36);

    // 右上角：生命值
    var lives = this.player ? this.player.lives : this.lives;
    ctx.fillStyle = COLORS.uiBg;
    drawRoundRect(ctx, cw - 130, 8, 122, 36, 6);
    ctx.fill();
    ctx.fillStyle = '#cc4444';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'right';
    var heartStr = '';
    for (var h = 0; h < lives; h++) heartStr += '\u2764';
    ctx.fillText(heartStr, cw - 18, 16);

    // 顶部中间：当前题目
    if (this.showingQuestion && this.currentQuestionData) {
      var qText = this.currentQuestionData.question;
      ctx.font = 'bold 14px sans-serif';
      var qW = ctx.measureText(qText).width + 30;
      if (qW > 400) { ctx.font = 'bold 12px sans-serif'; qW = ctx.measureText(qText).width + 30; }
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      drawRoundRect(ctx, cw / 2 - qW / 2, 8, qW, 30, 6);
      ctx.fill();
      ctx.fillStyle = '#ffdd88';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(qText, cw / 2, 23);
    }

    // 进度
    var answered = 0;
    for (var i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i].type === 'qblock' && this.platforms[i].result) answered++;
    }
    var total = this.questions.length;
    ctx.fillStyle = COLORS.uiBg;
    drawRoundRect(ctx, cw / 2 - 60, ch - 36, 120, 28, 6);
    ctx.fill();
    ctx.fillStyle = COLORS.text;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u8fdb\u5ea6: ' + answered + ' / ' + total, cw / 2, ch - 22);

    // 底部操作提示
    ctx.fillStyle = COLORS.uiBg;
    drawRoundRect(ctx, 8, ch - 36, 200, 28, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u2190 \u2192 \u79fb\u52a8 | \u7a7a\u683c/\u2191 \u8df3\u8dc3 | \u9876\u9009\u9879\u7b54\u9898', 18, ch - 22);
  };

  MarioGame.prototype._drawStart = function(ctx, cw, ch) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, cw, ch);

    // 标题
    ctx.fillStyle = '#ffdd44';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u6570\u636e\u7ba1\u9053\u5de5', cw / 2, ch / 2 - 100);

    ctx.fillStyle = '#aaa';
    ctx.font = '16px sans-serif';
    ctx.fillText('\u7ecf\u5178\u9a6c\u91cc\u5965\u98ce\u683c\u6a2a\u7248\u5377\u8f74\u7b54\u9898\u6e38\u620f', cw / 2, ch / 2 - 65);

    // 角色动画
    ctx.save();
    ctx.translate(cw / 2, ch / 2 - 20);
    var t = this.animFrame / 20;
    ctx.translate(0, Math.sin(t) * 5);
    // 帽子
    ctx.fillStyle = COLORS.hat;
    ctx.fillRect(-12, -20, 24, 8);
    ctx.fillRect(-14, -12, 28, 4);
    // 脸
    ctx.fillStyle = COLORS.skin;
    ctx.fillRect(-10, -8, 20, 10);
    // 眼睛
    ctx.fillStyle = '#333';
    ctx.fillRect(4, -6, 3, 3);
    // 身体
    ctx.fillStyle = COLORS.shirt;
    ctx.fillRect(-10, 2, 20, 8);
    // 背带裤
    ctx.fillStyle = COLORS.pants;
    ctx.fillRect(-4, 2, 3, 8);
    ctx.fillRect(1, 2, 3, 8);
    // 鞋子
    ctx.fillStyle = COLORS.shoes;
    ctx.fillRect(-10, 10, 8, 4);
    ctx.fillRect(2, 10, 8, 4);
    ctx.restore();

    // 操作说明
    ctx.fillStyle = '#ffdd88';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('\u64cd\u4f5c\u8bf4\u660e', cw / 2, ch / 2 + 25);

    ctx.fillStyle = '#ddd';
    ctx.font = '13px sans-serif';
    ctx.fillText('\u2190 \u2192 \u6216 A D \u79fb\u52a8\u89d2\u8272', cw / 2, ch / 2 + 48);
    ctx.fillText('\u7a7a\u683c / \u2191 \u6216 W \u8df3\u8dc3\uff08\u7a7a\u4e2d\u53ef\u4e8c\u6bb5\u8df3\uff09', cw / 2, ch / 2 + 66);
    ctx.fillText('\u8df3\u8d77\u6765\u9876\u95ee\u53f7\u7816\u5757\u5f39\u51fa\u9898\u76ee\uff0c\u518d\u9876\u9009\u9879\u9009\u62e9\u7b54\u6848', cw / 2, ch / 2 + 84);

    // 开始按钮
    var btnY = ch / 2 + 110;
    ctx.fillStyle = COLORS.qBlock;
    drawRoundRect(ctx, cw / 2 - 80, btnY, 160, 40, 8);
    ctx.fill();
    ctx.strokeStyle = COLORS.qBlockLight;
    ctx.lineWidth = 3;
    drawRoundRect(ctx, cw / 2 - 80, btnY, 160, 40, 8);
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('\u6309 Enter \u5f00\u59cb', cw / 2, btnY + 22);
  };

  MarioGame.prototype._drawGameOver = function(ctx, cw, ch) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u6e38\u620f\u7ed3\u675f', cw / 2, ch / 2 - 60);

    ctx.fillStyle = COLORS.text;
    ctx.font = '18px sans-serif';
    ctx.fillText('\u6700\u7ec8\u5f97\u5206: ' + this.score, cw / 2, ch / 2 - 15);

    var total = this.correctCount;
    var rate = this.questions.length > 0 ? Math.round(this.correctCount / this.questions.length * 100) : 0;
    ctx.fillText('\u7b54\u5bf9: ' + this.correctCount + ' / ' + this.questions.length, cw / 2, ch / 2 + 12);
    ctx.fillText('\u6b63\u786e\u7387: ' + rate + '%', cw / 2, ch / 2 + 38);

    // 再来一次按钮
    var btnY = ch / 2 + 80;
    ctx.fillStyle = COLORS.correct;
    drawRoundRect(ctx, cw / 2 - 80, btnY, 160, 40, 8);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    drawRoundRect(ctx, cw / 2 - 80, btnY, 160, 40, 8);
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('\u6309 Enter \u91cd\u6765', cw / 2, btnY + 22);
  };

  MarioGame.prototype._drawVictory = function(ctx, cw, ch) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = '#44ff44';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\u901a\u5173\u6210\u529f\uff01', cw / 2, ch / 2 - 60);

    ctx.fillStyle = COLORS.text;
    ctx.font = '18px sans-serif';
    ctx.fillText('\u6700\u7ec8\u5f97\u5206: ' + this.score, cw / 2, ch / 2 - 15);

    var rate = this.questions.length > 0 ? Math.round(this.correctCount / this.questions.length * 100) : 0;
    ctx.fillText('\u7b54\u5bf9: ' + this.correctCount + ' / ' + this.questions.length, cw / 2, ch / 2 + 12);
    ctx.fillText('\u6b63\u786e\u7387: ' + rate + '%', cw / 2, ch / 2 + 38);

    // 再来一次按钮
    var btnY = ch / 2 + 80;
    ctx.fillStyle = COLORS.correct;
    drawRoundRect(ctx, cw / 2 - 80, btnY, 160, 40, 8);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    drawRoundRect(ctx, cw / 2 - 80, btnY, 160, 40, 8);
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('\u6309 Enter \u91cd\u6765', cw / 2, btnY + 22);
  };

  // ==================== 全局导出 ====================
  window.DataLearnMario = {
    create: function(containerId, questions, callbacks) {
      var container = document.getElementById(containerId);
      if (!container) { console.error('\u5bb9\u5668\u4e0d\u5b58\u5728: ' + containerId); return null; }
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
        container.style.position = 'relative';
        var btnStyle = 'position:absolute;bottom:10px;width:60px;height:60px;background:rgba(0,0,0,0.4);border:2px solid rgba(255,255,255,0.5);border-radius:8px;color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;z-index:10;user-select:none;-webkit-user-select:none;touch-action:none;';
        var btns = [
          { id: 'mario-btn-left', html: '\u2190', left: '10px' },
          { id: 'mario-btn-right', html: '\u2192', left: '80px' },
          { id: 'mario-btn-jump', html: '\u8df3', right: '10px' }
        ];
        btns.forEach(function(b) {
          var el = document.createElement('div');
          el.id = b.id;
          el.textContent = b.html;
          el.style.cssText = btnStyle + (b.left ? 'left:' + b.left + ';' : 'right:' + b.right + ';');
          container.appendChild(el);
        });
      }

      var game = new MarioGame(canvas, {
        questions: questions || [],
        onCorrect: (callbacks && callbacks.onCorrect) || function() {},
        onWrong: (callbacks && callbacks.onWrong) || function() {},
        onComplete: (callbacks && callbacks.onComplete) || function() {}
      });

      // 响应式
      var resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          canvas.width = Math.min(900, container.clientWidth || 900);
          canvas.height = 600;
          if (game.state !== 'playing') game._draw();
        }, 200);
      });

      return game;
    },
    isMobile: function() {
      return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 768;
    }
  };
})();
