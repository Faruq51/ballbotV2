const { jidDecode, downloadContentFromMessage } = (await import('baileys')).default;
import { fileTypeFromBuffer } from 'file-type';
import q from '../../Setting/settings.js'
import Jimp from 'jimp';
import fetch from 'node-fetch';
import fs from 'fs';

export const connect = async(serve) => {
	try {
		// Buat ephemeral biar ngga ada tanda serunya
		const ephe = { ephemeralExpiration: 8640000, forwardingScore: 99999, isForwarded: true }
	   /**
	    * getBuffer hehe
	    * @param {String} PATH 
	    * @param {Boolean} saveToFile
	    * @returns
	    */
	   serve.getfile = async (PATH, saveToFile = false) => {let res, filename;const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');const type = await fileTypeFromBuffer(data) || {mime: 'application/octet-stream',ext: '.bin'};if (data && saveToFile && !filename) (filename = path.join(__dirname, '../../../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data));return { res, filename, ...type, data, deleteFile() {return filename && fs.promises.unlink(filename)}}};
		/* 
		* Regex mention match
		* @param {String} query
		* @returns
		* By Bolaxd
		*/
		serve.ments = async (query) => [...query.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + q.idwa)
		/* 
		* Create jid at id
		* @param {String} chatId
		* @returns chatId
		* By Bolaxd
		*/
		serve.createJid = (chatId) => {if (!chatId) return chatId;if (/:\d+@/gi.test(chatId)) {let decode = jidDecode(chatId) || {};return decode.user && decode.server && decode.user + '@' + decode.server || chatId}else return chatId};
		/* 
		* Send Kontak maybe
		* @param {String} chatId
		* @param {String} teks
		* @param {Array} arr
		* @param {String} quoted
		* #param {Object} opts
		* @returns
		* By Bolaxd
		*/
		serve.sendkon = async (chatId, teks, arr = [...[0, 1, 2]], quoted = '', opts = {}) => {var push = [];for (let i of arr) push.push({displayName: '', vcard: 'BEGIN:VCARD\n'+'VERSION:3.0\n'+'FN:'+i[0]+'\n'+'ORG:'+i[2]+';\n'+'TEL;type=CELL;type=VOICE;waid='+i[1]+':'+i[1]+'\n'+'END:VCARD' });await q.delay(1500);return serve.sendMessage(chatId, { contacts: { displayName: teks, contacts: push }, ...opts}, {quoted},ephe)};
		/* 
		* Send Button teks
		* @param {String} chatId
		* @param {String} teks
		* @param {String} foot
		* @param {Array} but
		* @param {String} quoted
		* @param {Object} opts
		* @returns
		* By Bolaxd
		*/
		serve.sendlist = async (chatId, teks, foot, but = [...[dis = '', id = '', des = '' ]], quoted = '') => {let coi = [];for (let u of but) coi.push({ title: u[0], rowId: u[1], description: u[2] });await q.delay(1500);return serve.sendMessage(chatId, { text: teks, footer: foot, title: null, buttonText: 'Click Here', sections: [{title: 'Ballbot', rows: coi }]}, { quoted })}
		/* 
		* Send Button teks
		* @param chatId
		* @param {String} text
		* @param {String} footer
		* @param {Array} but
		* @param {String} men
		* @param {Object} opts
		* @returns
		* By Bolaxd
		*/
		serve.butteks = async (chatId, text, footer, but = [...[dis, id]], quoted = '', opts = {}) => {let button = [];for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 });await q.delay(1500);return serve.sendMessage(chatId, {video: { url: q.video }, caption: text, footer, buttons: button, headerType: 2,...opts}, { quoted }, ephe)}
		/* 
		* Send Button Video
		* @param {String} chatId
		* @param {String} vid
		* @param {String} text
		* @param {String} footer
		* @param {Array} but
		* @param {String} men
		* @param {Object} opts
		* @returns
		* By Bolaxd
		*/
		serve.butvid = async (chatId, vid, text, footer, but = [...[dis, id]], quoted = '', opts = {}) => {let button = [];for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 });await q.delay(1500);return serve.sendMessage(chatId, {video: { url: vid }, caption: text, footer, buttons: button, headerType: 5,...opts}, { quoted }, ephe)};
		/* 
		* Send Button Image
		* @param {String} chatId
		* @param {String} img
		* @param {String} text
		* @param {String} footer
		* @param {Array} but
		* @param {String} men
		* @param {Object} opts
		* @returns
		* By Bolaxd
		*/
		serve.butimg = async (chatId, img, text, footer, but = [...[dis, id]], quoted = '', opts = {}) => {let button = [];for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 });await q.delay(1500);return serve.sendMessage(chatId, {image: { url: img }, fileLength: (await Math.floor(Math.random()*10360047029)), caption: text, footer, buttons: button, headerType: 4,...opts}, { quoted }, ephe)};
		/* 
		* Send Teks biasaa
		* @param {String} chatId
		* @param {String} text
		* @param {String} quoted
		* @param {Object} opts
		* @returns
		* By Bolaxd
		*/
		serve.sendteks = async (chatId, text, quoted = '', opts = {}) => {await q.delay(1500);return serve.sendMessage(chatId, { text, ephe, ...opts}, {quoted})}
		/* 
		* Send Image
		* @param {String} chatId
		* @param {String} text
		* @param {Buffer} image
		* @returns
		* By Bolaxd
		*/
		serve.sendimg = async (chatId, img, teks = '', quoted = '', opts = {}) => {await q.delay(1500);return serve.sendMessage(chatId, {image: { url: img }, caption: teks}, {quoted}, ephe, opts)}
		/* 
		* Send Video
		* @param {String} chatId
		* @param {String} text
		* @param {Buffer} vid
		* @returns
		* By Bolaxd
		*/
		serve.sendvid = async (chatId, vid, teks = '', quoted = '', opts = {}) => {await q.delay(1500);return serve.sendMessage(chatId, {video: { url: vid }, caption: teks}, {quoted}, ephe, opts)}
		/* 
		* Send Audio
		* @param {String} chatId
		* @param {String} text
		* @param {Buffer} aud
		* @returns
		* By Bolaxd
		*/
		serve.sendaud = async (chatId, aud, teks = '', quoted = '', opts = {}) => {await q.delay(1500);return serve.sendMessage(chatId, {audio: { url: aud }}, {quoted}, ephe, opts)}
		/* 
		* Regenerate resize from Jimp
		* @param {Buffer} buff
		* @returns { img, preview }
		* By Bochiel team
		*/
		serve.resize = async (buff) => {const jimp = await Jimp.read(buff);const crop = jimp.crop(0, 0, (await jimp.getWidth()), (await jimp.getHeight()));return {img: await crop.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),preview: await crop.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)}}
		/* 
		* create Profile
		* @param {String} chatId
		* @param {Buffer} img
		* @returns
		* 
		*/
		serve.createprofile = async (chatId, buff) => {const { img } = await serve.resize(buff);return serve.query({ tag: 'iq', attrs: { to: chatId, type:'set', xmlns: 'w:profile:picture' }, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })}
		
		return serve
	} catch (e) {
		console.log(e);
	}
}
