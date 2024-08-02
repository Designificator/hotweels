javascript
const bcrypt = require('bcrypt'); // ���������� ���������� bcrypt

class User {
    constructor(username, password) {
        this.username = username;
        this.setPassword(password); // ��������� ����� User, ������� �������� ����������� ������ ��� �������� ����� �������������.
    }

    setPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        this.passwordHash = bcrypt.hashSync(password, salt); // ����� setPassword ���������� ���� (��������� ������) � �������� ���������� ������ � ������� ���������� bcrypt, � ����� ��������� ��� ������ � �������� passwordHash ������� User
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash); // ��������� ������������ ��������� ������ � �����������, ������ � ������������ �������� ����� checkPassword, ������� ���������� ����� bcrypt.compareSync ��� ��������� ���� ���������� ������ � ����� ������������ ������
    }
}

const usersDatabase = [            //��������� ������, ������� �������� ��� ������� ���� `User` � ���������������� ������ ������������ � �������
    new User('user1', 'password1'),
    new User('user2', 'password2')
];

function loginUser(email, password) {  // ���������� ����� ������������ � `usersDatabase` �� ����� ������������. ���� ������������ ������ � ��� ����� `checkPassword` ���������� `true` ��� ���������������� ������, �� ��������� refresh � access ������
    const user = usersDatabase.find(user => user.email === email);

    if (user && user.checkPassword(password)) {
        createRefreshToken();
        createAccessToken();               //��������� RefreshToken � AccessToken
        console.log('������������ ������� �����������!'); // ����� '������������ ������� �����������!'
        console.log('Access token:', accessToken);
        console.log('Refresh token:', refreshToken);
        alert('You have now stored your email address');
    } else {
        console.log('������ �����������. �������� ��� ������������ ��� ������.'); // ����� '������ �����������. �������� ��� ������������ ��� ������.'
    }
}

// ������ �������������
loginUser('user1', 'password1');
