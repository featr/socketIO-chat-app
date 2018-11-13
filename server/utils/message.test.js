const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		const res = generateMessage('Admin', 'About...');
		expect(res.from).toBe('Admin');
		expect(res.text).toBe('About...');
		expect(res.createdAt).toEqual(expect.any(Number));
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const res = generateLocationMessage('Admin', '1324', '1324');
		expect(res.from).toBe('Admin');
		expect(res.url).toBe('https://www.google.com/maps?q=1324,1324');
		expect(res.createdAt).toEqual(expect.any(Number));
	});
});
