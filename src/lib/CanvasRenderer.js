// Canvas renderer for the Success Blueprint card (1080x1920)

const NAVY = '#002366';
const GOLD = '#D4AF37';
const WHITE = '#FFFFFF';
const LIGHT_GOLD = '#F5E6B8';
const DARK_NAVY = '#001744';

function drawRoundedRect(ctx, x, y, w, h, r) {
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

function drawCrown(ctx, cx, cy, size) {
  ctx.save();
  ctx.fillStyle = GOLD;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  
  const w = size;
  const h = size * 0.7;
  const baseY = cy + h / 2;
  const topY = cy - h / 2;
  
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, baseY);
  ctx.lineTo(cx - w / 2, baseY - h * 0.3);
  ctx.lineTo(cx - w / 4, baseY - h * 0.15);
  ctx.lineTo(cx - w / 8, topY);
  ctx.lineTo(cx, baseY - h * 0.25);
  ctx.lineTo(cx + w / 8, topY);
  ctx.lineTo(cx + w / 4, baseY - h * 0.15);
  ctx.lineTo(cx + w / 2, baseY - h * 0.3);
  ctx.lineTo(cx + w / 2, baseY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Jewels
  const jewels = [cx - w / 8, cx, cx + w / 8];
  jewels.forEach(jx => {
    ctx.beginPath();
    ctx.arc(jx, topY + h * 0.15, size * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
  });
  
  ctx.restore();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

export function renderBlueprint(canvas, { photo, vision, discipline, name }) {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;
  canvas.width = W;
  canvas.height = H;

  // === BACKGROUND ===
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, DARK_NAVY);
  bgGrad.addColorStop(0.3, NAVY);
  bgGrad.addColorStop(0.7, NAVY);
  bgGrad.addColorStop(1, DARK_NAVY);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // === DECORATIVE GOLD BORDER ===
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, 30, 30, W - 60, H - 60, 20);
  ctx.stroke();
  
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 42, 42, W - 84, H - 84, 16);
  ctx.stroke();

  // === TOP DECORATIVE LINE ===
  const lineY = 100;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, lineY);
  ctx.lineTo(W / 2 - 60, lineY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2 + 60, lineY);
  ctx.lineTo(W - 100, lineY);
  ctx.stroke();

  // Crown at top center
  drawCrown(ctx, W / 2, lineY, 80);

  // === TITLE ===
  ctx.fillStyle = GOLD;
  ctx.font = '700 52px Playfair Display, serif';
  ctx.textAlign = 'center';
  ctx.fillText('THE SUCCESS BLUEPRINT', W / 2, 195);

  ctx.fillStyle = WHITE;
  ctx.font = '600 28px Poppins, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('P O S T I N G   C H A L L E N G E', W / 2, 240);

  // === VISION BOARD SECTION HEADER ===
  const sectionY = 290;
  const sectionGrad = ctx.createLinearGradient(80, sectionY, W - 80, sectionY);
  sectionGrad.addColorStop(0, GOLD);
  sectionGrad.addColorStop(0.5, LIGHT_GOLD);
  sectionGrad.addColorStop(1, GOLD);
  ctx.fillStyle = sectionGrad;
  drawRoundedRect(ctx, 80, sectionY, W - 160, 52, 6);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '700 24px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VISION BOARD & CHALLENGE TRACKER', W / 2, sectionY + 35);

  // === PHOTO FRAME AREA ===
  const frameX = 120;
  const frameY = 375;
  const frameW = W - 240;
  const frameH = 620;

  // White card background
  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, frameX, frameY, frameW, frameH, 16);
  ctx.fill();

  // Inner shadow effect
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, frameX + 2, frameY + 2, frameW - 4, frameH - 4, 14);
  ctx.stroke();

  // "MY blueprint" text
  ctx.fillStyle = NAVY;
  ctx.font = '700 40px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MY', W / 2 - 80, frameY + 55);
  
  ctx.fillStyle = GOLD;
  ctx.font = 'italic 700 44px Playfair Display, serif';
  ctx.fillText('blueprint', W / 2 + 30, frameY + 57);

  // Photo area
  const photoAreaX = frameX + 60;
  const photoAreaY = frameY + 80;
  const photoAreaW = frameW - 120;
  const photoAreaH = frameH - 110;

  if (photo) {
    // Draw photo with rounded corners
    ctx.save();
    drawRoundedRect(ctx, photoAreaX, photoAreaY, photoAreaW, photoAreaH, 12);
    ctx.clip();
    
    const imgRatio = photo.width / photo.height;
    const areaRatio = photoAreaW / photoAreaH;
    let sx, sy, sw, sh;
    
    if (imgRatio > areaRatio) {
      sh = photo.height;
      sw = photo.height * areaRatio;
      sx = (photo.width - sw) / 2;
      sy = 0;
    } else {
      sw = photo.width;
      sh = photo.width / areaRatio;
      sx = 0;
      sy = (photo.height - sh) / 2;
    }
    
    ctx.drawImage(photo, sx, sy, sw, sh, photoAreaX, photoAreaY, photoAreaW, photoAreaH);
    ctx.restore();

    // Photo border
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, photoAreaX, photoAreaY, photoAreaW, photoAreaH, 12);
    ctx.stroke();
  } else {
    // Placeholder
    ctx.fillStyle = '#f0f0f0';
    drawRoundedRect(ctx, photoAreaX, photoAreaY, photoAreaW, photoAreaH, 12);
    ctx.fill();

    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    drawRoundedRect(ctx, photoAreaX + 10, photoAreaY + 10, photoAreaW - 20, photoAreaH - 20, 8);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#999';
    ctx.font = '500 28px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Insert Image/Text', W / 2, photoAreaY + photoAreaH / 2 - 15);
    ctx.font = '400 20px Poppins, sans-serif';
    ctx.fillText('[PLACEHOLDER FOR YOUR PHOTO/VISION]', W / 2, photoAreaY + photoAreaH / 2 + 25);
  }

  // === MY VISION SECTION ===
  const visionY = 1060;
  
  // Gold label
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 80, visionY, 220, 44, 6);
  ctx.fill();
  
  ctx.fillStyle = NAVY;
  ctx.font = '700 20px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MY VISION:', 190, visionY + 30);

  // Vision text area
  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, 310, visionY, W - 390, 44, 6);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '500 18px Poppins, sans-serif';
  ctx.textAlign = 'left';
  const visionText = vision || '[Write your core ambition for the year]';
  const visionLines = wrapText(ctx, visionText, W - 430);
  if (visionLines.length === 1) {
    ctx.fillText(visionLines[0], 325, visionY + 29);
  } else {
    ctx.font = '500 15px Poppins, sans-serif';
    visionLines.slice(0, 2).forEach((line, i) => {
      ctx.fillText(line, 325, visionY + 20 + i * 18);
    });
  }

  // Underline
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(325, visionY + 38);
  ctx.lineTo(W - 100, visionY + 38);
  ctx.stroke();

  // === DAILY DISCIPLINE SECTION ===
  const discY = 1130;

  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 80, discY, 320, 44, 6);
  ctx.fill();
  
  ctx.fillStyle = NAVY;
  ctx.font = '700 20px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DAILY DISCIPLINE:', 240, discY + 30);

  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, 410, discY, W - 490, 44, 6);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '500 18px Poppins, sans-serif';
  ctx.textAlign = 'left';
  const discText = discipline || '[One habit that builds the future]';
  ctx.fillText(discText, 425, discY + 29);

  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(425, discY + 38);
  ctx.lineTo(W - 100, discY + 38);
  ctx.stroke();

  // === DAY TRACKER CIRCLES ===
  const trackerY = 1230;
  const days = ['D1', 'D2', 'D3'];
  const labels = ['DAY 1', 'DAY 2', 'DAY 3'];
  const colors = [GOLD, '#C49A2A', '#B8860B'];
  const circleSpacing = 200;
  const startX = W / 2 - circleSpacing;

  days.forEach((day, i) => {
    const cx = startX + i * circleSpacing;
    
    // Outer circle
    ctx.beginPath();
    ctx.arc(cx, trackerY, 42, 0, Math.PI * 2);
    ctx.fillStyle = colors[i];
    ctx.fill();
    
    // Inner circle
    ctx.beginPath();
    ctx.arc(cx, trackerY, 34, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();

    ctx.fillStyle = NAVY;
    ctx.font = '800 24px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(day, cx, trackerY + 9);

    ctx.fillStyle = WHITE;
    ctx.font = '600 16px Poppins, sans-serif';
    ctx.fillText(labels[i], cx, trackerY + 65);
  });

  // === HOW TO JOIN BAR ===
  const joinY = 1360;
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 60, joinY, W - 120, 50, 8);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '600 20px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HOW TO JOIN:  1. Fill This Template   2. Post on your story   3. Tag @PENSAUCC', W / 2, joinY + 33);

  // === NAME SECTION ===
  if (name) {
    const nameY = 1445;
    ctx.fillStyle = LIGHT_GOLD;
    ctx.font = '600 26px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`— ${name} —`, W / 2, nameY);
  }

  // === BOTTOM PANEL DISCUSSION SECTION ===
  const panelY = 1490;
  
  // Dark navy panel
  ctx.fillStyle = DARK_NAVY;
  drawRoundedRect(ctx, 60, panelY, W - 120, 110, 12);
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 60, panelY, W - 120, 110, 12);
  ctx.stroke();

  ctx.fillStyle = WHITE;
  ctx.font = '600 22px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Join the Panel Discussion:', W / 2, panelY + 38);

  ctx.fillStyle = GOLD;
  ctx.font = '700 26px Poppins, sans-serif';
  ctx.fillText('THURSDAY  |  APEWOSIKA  |  6:30 PM', W / 2, panelY + 78);

  // === PENSA UCC BRANDING ===
  const brandY = 1640;
  
  ctx.fillStyle = WHITE;
  ctx.font = '800 42px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PENSA UCC', W / 2, brandY);

  ctx.fillStyle = GOLD;
  ctx.font = 'italic 500 22px Playfair Display, serif';
  ctx.fillText('Crowned with Purpose', W / 2, brandY + 35);

  // === CROWN UNDER BRAND ===
  drawCrown(ctx, W / 2, brandY + 75, 50);

  // === HASHTAG ===
  ctx.fillStyle = LIGHT_GOLD;
  ctx.font = '500 22px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('#CrownedWithPurpose', W / 2, brandY + 120);

  // === DECORATIVE BOTTOM LINE ===
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(200, brandY + 145);
  ctx.lineTo(W - 200, brandY + 145);
  ctx.stroke();

  // Small diamond decorations
  [W / 2 - 180, W / 2, W / 2 + 180].forEach(dx => {
    ctx.save();
    ctx.translate(dx, brandY + 145);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = GOLD;
    ctx.fillRect(-5, -5, 10, 10);
    ctx.restore();
  });
}