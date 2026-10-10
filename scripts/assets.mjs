import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const artwork = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#071b33"/><path d="M70 90h70" stroke="#e0c15a" stroke-width="3"/><text x="70" y="145" font-family="Georgia" font-size="22" fill="#e0c15a" letter-spacing="4">ADVOCATE</text><text x="66" y="235" font-family="Georgia" font-size="62" fill="white">Dinesh</text><text x="66" y="309" font-family="Georgia" font-size="62" fill="white">Duwadi</text><text x="70" y="378" font-family="Arial" font-size="24" fill="#c5cdd8">Legal consultation &amp; representation</text><text x="70" y="420" font-family="Arial" font-size="24" fill="#c5cdd8">Dhading, Nepal</text><path d="M70 472h580" stroke="#43566b"/><text x="70" y="528" font-family="Arial" font-size="31" fill="#e0c15a">+977 9851159807</text><rect x="746" y="40" width="414" height="550" fill="none" stroke="#c9a227"/></svg>`);
const photo=await sharp('src/assets/portrait.png').resize(390,502,{fit:'contain',background:'#ffffff'}).toBuffer();
await sharp(artwork).composite([{input:photo,left:758,top:64}]).jpeg({quality:88}).toFile('public/social.jpg');
await sharp(await readFile('public/favicon.svg')).resize(180,180).png().toFile('public/apple-touch-icon.png');
console.log('Generated social card and site icon from supplied assets.');
