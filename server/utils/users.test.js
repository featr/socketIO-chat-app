const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
	let users;
	beforeEach(() => {
		users = new Users();
		users.users = [
			{ id: '1', name: 'jen', room: 'office' },
			{ id: '2', name: 'mike', room: 'office' },
			{ id: '3', name: 'john', room: 'react' },
		];
	});

	it('should add new user', () => {
		const users = new Users();
		const user = {
			id: 'xczc',
			name: 'ev',
			room: 'office',
		};
		const resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		const resUser = users.removeUser('1');
		expect(resUser.id).toBe('1');
		expect(users.users.length).toBe(2);
	});

	it('should not remove user', () => {
		const resUser = users.removeUser('4');
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		const resUser = users.getUser('1');
		expect(resUser).toEqual(users.users[0]);
	});

	it('should not find user', () => {
		const resUser = users.getUser('6');
		expect(resUser).toBeFalsy();
	});

	it('should return names for office room', () => {
		const userList = users.getUserList('office');
		expect(userList).toEqual(['jen', 'mike']);
	});

	it('should return names for react room', () => {
		const userList = users.getUserList('react');
		expect(userList).toEqual(['john']);
	});
});
