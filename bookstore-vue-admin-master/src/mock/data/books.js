import Mock from 'mockjs';


const Books = [];

for (let i = 0; i < 5; i++) {
    Books.push(Mock.mock({
        id: Mock.Random.guid(),
        bookType:'aaa',
        bookName: 'asss',
        bookNum: Mock.Random.integer(1, 10)
    }));
}

export { Books };
