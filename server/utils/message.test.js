const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		const res = generateMessage('Admin', 'About...');
		expect(res.from).toBe('Admin');
		expect(res.text).toBe('About...');
		expect(res.createdAt).toEqual(expect.any(Number));
	});
});
