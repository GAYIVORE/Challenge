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

/**
 * Enhanced Logo Drawing:
 * Handles clipping and ensures the image covers the circle without stretching.
 */
function drawLogo(ctx, logoImg, cx, cy, size) {
  if (!logoImg || !logoImg.complete) return;

  ctx.save();
  // Create circular clip
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Calculate "aspect fill" (cover) logic
  const imgAspect = logoImg.width / logoImg.height;
  let drawW, drawH;

  if (imgAspect > 1) {
    drawW = size * imgAspect;
    drawH = size;
  } else {
    drawW = size;
    drawH = size / imgAspect;
  }

  ctx.drawImage(logoImg, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
  ctx.restore();

  // Add a subtle gold ring around the logo
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2 + 2, 0, Math.PI * 2);
  ctx.stroke();
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

export function renderBlueprint(canvas, { photo, vision, discipline, name, logoImg }) {
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
  ctx.lineTo(W / 2 - 80, lineY); // Wider gap for logo
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2 + 80, lineY);
  ctx.lineTo(W - 100, lineY);
  ctx.stroke();

  // Draw Logo at top
  drawLogo(ctx, logoImg, W / 2, lineY, 110);

  // === TITLE ===
  ctx.fillStyle = WHITE;
  ctx.font = '700 52px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('PENSA UCC', W / 2, 200);

  ctx.fillStyle = GOLD;
  ctx.font = '600 28px Poppins, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('THE SUCCESS BLUEPRINT', W / 2, 245);

  // === SECTION HEADER ===
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
  ctx.fillText("LADIES' AND GENTS' WEEK CELEBRATION", W / 2, sectionY + 35);

  // === PHOTO FRAME ===
  const frameX = 120;
  const frameY = 375;
  const frameW = W - 240;
  const frameH = 620;

  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, frameX, frameY, frameW, frameH, 16);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.font = '700 40px Poppins, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('MY', W / 2 - 10, frameY + 55);
  
  ctx.fillStyle = GOLD;
  ctx.font = 'italic 700 44px "Playfair Display", serif';
  ctx.textAlign = 'left';
  ctx.fillText('blueprint', W / 2 + 10, frameY + 57);

  // Photo Drawing Logic
  const pAreaX = frameX + 60, pAreaY = frameY + 80, pAreaW = frameW - 120, pAreaH = frameH - 110;

  if (photo) {
    ctx.save();
    drawRoundedRect(ctx, pAreaX, pAreaY, pAreaW, pAreaH, 12);
    ctx.clip();
    const ratio = Math.max(pAreaW / photo.width, pAreaH / photo.height);
    const w = photo.width * ratio, h = photo.height * ratio;
    ctx.drawImage(photo, pAreaX + (pAreaW - w) / 2, pAreaY + (pAreaH - h) / 2, w, h);
    ctx.restore();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, pAreaX, pAreaY, pAreaW, pAreaH, 12);
    ctx.stroke();
  } else {
    ctx.fillStyle = '#f8f8f8';
    drawRoundedRect(ctx, pAreaX, pAreaY, pAreaW, pAreaH, 12);
    ctx.fill();
    ctx.fillStyle = '#bbb';
    ctx.textAlign = 'center';
    ctx.font = '500 24px Poppins';
    ctx.fillText('PHOTO AREA', W/2, pAreaY + pAreaH/2);
  }

  // === VISION & DISCIPLINE ===
  const drawEntry = (y, label, val, placeholder) => {
    ctx.fillStyle = GOLD;
    drawRoundedRect(ctx, 80, y, 220, 44, 6);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.font = '700 20px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(label, 190, y + 30);

    ctx.fillStyle = WHITE;
    drawRoundedRect(ctx, 310, y, W - 390, 44, 6);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.textAlign = 'left';
    ctx.font = '500 18px Poppins';
    ctx.fillText(val || placeholder, 325, y + 29);
  };

  drawEntry(1060, 'MY VISION:', vision, '[Vision for the year]');
  drawEntry(1130, 'DAILY DISCIPLINE:', discipline, '[Your daily habit]');

  // === DAY TRACKER ===
  const trackerY = 1240;
  ['D1', 'D2', 'D3'].forEach((day, i) => {
    const cx = (W / 2 - 200) + i * 200;
    ctx.beginPath();
    ctx.arc(cx, trackerY, 42, 0, Math.PI * 2);
    ctx.fillStyle = GOLD;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, trackerY, 34, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.textAlign = 'center';
    ctx.font = '800 24px Poppins';
    ctx.fillText(day, cx, trackerY + 9);
    ctx.fillStyle = WHITE;
    ctx.font = '600 16px Poppins';
    ctx.fillText(`DAY ${i+1}`, cx, trackerY + 65);
  });

  // === JOIN BAR ===
  const joinY = 1380;
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 60, joinY, W - 120, 50, 8);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.font = '600 20px Poppins';
  ctx.fillText('HOW TO JOIN: 1. Fill Template  2. Post to Story  3. Tag @PENSAUCC', W/2, joinY + 33);

  if (name) {
    ctx.fillStyle = LIGHT_GOLD;
    ctx.font = '600 26px Poppins';
    ctx.fillText(`— ${name.toUpperCase()} —`, W / 2, 1465);
  }

  // === PANEL SECTION ===
  const panelY = 1510;
  ctx.fillStyle = DARK_NAVY;
  drawRoundedRect(ctx, 60, panelY, W - 120, 110, 12);
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.stroke();
  ctx.fillStyle = WHITE;
  ctx.font = '600 22px Poppins';
  ctx.fillText('Join the Panel Discussion:', W / 2, panelY + 38);
  ctx.fillStyle = GOLD;
  ctx.font = '700 26px Poppins';
  ctx.fillText('THURSDAY  |  APEWOSIKA  |  6:30 PM', W / 2, panelY + 78);

  // === BRANDING ===
  const brandY = 1680;
  ctx.fillStyle = WHITE;
  ctx.font = '800 42px Poppins';
  ctx.fillText('PENSA UCC', W / 2, brandY);
  ctx.fillStyle = GOLD;
  ctx.font = 'italic 500 22px "Playfair Display"';
  ctx.fillText('Crowned with Purpose', W / 2, brandY + 35);

  drawLogo(ctx, logoImg, W / 2, brandY + 95, 90);
  
  ctx.fillStyle = LIGHT_GOLD;
  ctx.font = '500 22px Poppins';
  ctx.fillText('#CrownedWithPurpose', W / 2, brandY + 165);
}