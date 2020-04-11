import Mock from 'mockjs';


const Books = [];
let bookNames = ['五年高考三年模拟英语（全国一卷）','我不怕这漫长黑夜','假如给我三天光明','福尔摩斯探案集','华夏万卷字帖']
let bookTypes = ['考试','文学','文学','文学','艺术']
for (let i = 0; i < 5; i++) {
    Books.push(Mock.mock({
        id: Mock.Random.guid(),
        bookType:bookTypes[i],
        bookName: bookNames[i],
        bookNum: Mock.Random.integer(1, 10)
    }));
}

export { Books };
