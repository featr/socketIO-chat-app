const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		const res = isRealString(1234);
		expect(res).toBeFalsy();
	});
	it('should reject string with only spaces', () => {
		const res = isRealString('    ');
		expect(res).toBeFalsy();
	});
	it('should allow string with non space values', () => {
		const res = isRealString('Artifact   ');
		expect(res).toBeTruthy();
	});
});
