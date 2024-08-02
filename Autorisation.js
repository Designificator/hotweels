javascript
const bcrypt = require('bcrypt'); // подключаем библиотеку bcrypt

class User {
    constructor(username, password) {
        this.username = username;
        this.setPassword(password); // создаетс€ класс User, который содержит конструктор класса дл€ создани€ новых пользователей.
    }

    setPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        this.passwordHash = bcrypt.hashSync(password, salt); // ћетод setPassword генерирует соль (случайную строку) и хеширует переданный пароль с помощью библиотеки bcrypt, а затем сохран€ет хеш парол€ в свойстве passwordHash объекта User
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash); // провер€ет соответствие введЄнного парол€ и хешировани€, парол€ у пользовател€ добавлен метод checkPassword, который использует метод bcrypt.compareSync дл€ сравнени€ хеша введенного парол€ с хешем сохраненного парол€
    }
}

const usersDatabase = [            //создаетс€ массив, который содержит два объекта типа `User` с предоставленными именем пользовател€ и паролем
    new User('user1', 'password1'),
    new User('user2', 'password2')
];

function loginUser(email, password) {  // происходит поиск пользовател€ в `usersDatabase` по имени пользовател€. ≈сли пользователь найден и его метод `checkPassword` возвращает `true` дл€ предоставленного парол€, то создаютс€ refresh и access токены
    const user = usersDatabase.find(user => user.email === email);

    if (user && user.checkPassword(password)) {
        createRefreshToken();
        createAccessToken();               //создаютс€ RefreshToken и AccessToken
        console.log('ѕользователь успешно авторизован!'); // вывод 'ѕользователь успешно авторизован!'
        console.log('Access token:', accessToken);
        console.log('Refresh token:', refreshToken);
        alert('You have now stored your email address');
    } else {
        console.log('ќшибка авторизации. Ќеверное им€ пользовател€ или пароль.'); // вывод 'ќшибка авторизации. Ќеверное им€ пользовател€ или пароль.'
    }
}

// ѕример использовани€
loginUser('user1', 'password1');
