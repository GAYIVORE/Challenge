/**
 * Helper to draw the logo image centered at a specific position
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLImageElement} img 
 * @param {number} cx - Center X
 * @param {number} cy - Center Y
 * @param {number} maxHeight - Target height for the logo
 */
function drawLogo(ctx, img, cx, cy, maxHeight) {
  if (!img) return;
  const ratio = img.width / img.height;
  const w = maxHeight * ratio;
  const h = maxHeight;
  ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
}

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
  
  const NAVY = '#002366';
  const GOLD = '#D4AF37';
  const WHITE = '#FFFFFF';
  const LIGHT_GOLD = '#F5E6B8';
  const DARK_NAVY = '#001744';

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
  drawRoundedRect(ctx, 30, 30, W - 60, H - 100, 20); // Adjusted height for footer breathing room
  ctx.stroke();

  // === TOP SECTION ===
  const lineY = 100;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(100, lineY);
  ctx.lineTo(W / 2 - 80, lineY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W / 2 + 80, lineY);
  ctx.lineTo(W - 100, lineY);
  ctx.stroke();

  // Draw Logo at top
  if (logoImg) {
    drawLogo(ctx, logoImg, W / 2, lineY, 90);
  }

  // === TITLE ===
  ctx.fillStyle = GOLD;
  ctx.font = '700 52px Playfair Display, serif';
  ctx.textAlign = 'center';
  ctx.fillText('THE SUCCESS BLUEPRINT', W / 2, 210);

  ctx.fillStyle = WHITE;
  ctx.font = '600 28px Poppins, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('P O S T I N G   C H A L L E N G E', W / 2, 255);

  // === VISION BOARD SECTION HEADER ===
  const sectionY = 310;
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
  const frameY = 395;
  const frameW = W - 240;
  const frameH = 620;

  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, frameX, frameY, frameW, frameH, 16);
  ctx.fill();

  // Inner Title inside photo frame
  ctx.fillStyle = NAVY;
  ctx.font = '700 40px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MY', W / 2 - 80, frameY + 55);
  
  ctx.fillStyle = GOLD;
  ctx.font = 'italic 700 44px Playfair Display, serif';
  ctx.fillText('blueprint', W / 2 + 30, frameY + 57);

  const photoAreaX = frameX + 60;
  const photoAreaY = frameY + 80;
  const photoAreaW = frameW - 120;
  const photoAreaH = frameH - 110;

  if (photo) {
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
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, photoAreaX, photoAreaY, photoAreaW, photoAreaH, 12);
    ctx.stroke();
  }

  // === VISION & DISCIPLINE ===
  const visionY = 1080;
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 80, visionY, 220, 44, 6);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.font = '700 20px Poppins, sans-serif';
  ctx.fillText('MY VISION:', 190, visionY + 30);

  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, 310, visionY, W - 390, 44, 6);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.font = '500 18px Poppins, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(vision || '[Your core ambition]', 325, visionY + 29);

  const discY = 1150;
  ctx.fillStyle = GOLD;
  drawRoundedRect(ctx, 80, discY, 320, 44, 6);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.textAlign = 'center';
  ctx.fillText('DAILY DISCIPLINE:', 240, discY + 30);

  ctx.fillStyle = WHITE;
  drawRoundedRect(ctx, 410, discY, W - 490, 44, 6);
  ctx.fill();
  ctx.fillStyle = NAVY;
  ctx.textAlign = 'left';
  ctx.fillText(discipline || '[Your daily habit]', 425, discY + 29);

  // === TRACKER ===
  const trackerY = 1260;
  const days = ['D1', 'D2', 'D3'];
  const colors = [GOLD, '#C49A2A', '#B8860B'];
  days.forEach((day, i) => {
    const cx = (W / 2 - 200) + i * 200;
    ctx.beginPath();
    ctx.arc(cx, trackerY, 42, 0, Math.PI * 2);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, trackerY, 34, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.textAlign = 'center';
    ctx.font = '800 24px Poppins, sans-serif';
    ctx.fillText(day, cx, trackerY + 9);
  });

  // === FOOTER BRANDING ===
  const brandY = 1660;
  ctx.fillStyle = WHITE;
  ctx.font = '800 45px Poppins, sans-serif';
  ctx.fillText('PENSA UCC', W / 2, brandY);
  
  ctx.fillStyle = GOLD;
  ctx.font = 'italic 500 24px Playfair Display, serif';
  ctx.fillText('Becoming Kings with Discipline', W / 2, brandY + 40);

  // Draw Logo at bottom
  if (logoImg) {
    drawLogo(ctx, logoImg, W / 2, brandY + 95, 80);
  }

  if (name) {
    ctx.fillStyle = LIGHT_GOLD;
    ctx.font = '600 28px Poppins, sans-serif';
    ctx.fillText(`— ${name} —`, W / 2, 1550);
  }
}