// 定义异步函数以获取所有题目
async function fetchAllQuestions() {
    // 初始化数组用于存储所有题目数据
    let allQuestions = [];
    // 初始化题目索引
    let questionIndex = 1;

    // 循环直到没有下一题
    while (true) {
        // 获取题目序号
        let questionNumber = '';
        let activeQuestion = document.querySelector('.problem-list.clearfix span.active');
        if (activeQuestion) {
            questionNumber = activeQuestion.innerText.trim();
        } else {
            questionNumber = `Unknown_${questionIndex}`;
        }

        // 获取题目数据
        let question = document.querySelector('.qusetion-title')?.innerText || 'Question not found';
        let options = '';
        document.querySelectorAll('.option').forEach(function(e) {
            let index = e.querySelector('.before-icon')?.innerText || '';
            let content = e.querySelector('span:not(.before-icon)')?.innerText || '';
            options += index + '.' + content + ' ';
        });
        let answer = '';
        document.querySelectorAll('.option').forEach(function(e) {
            if (e.classList.contains('right')) {
                answer = e.querySelector('.before-icon')?.innerText + '.' + e.querySelector('span:not(.before-icon)')?.innerText || 'No answer found';
            }
        });

        // 存储题目数据
        allQuestions.push({
            number: questionNumber,
            question: question,
            options: options.trim(),
            answer: answer
        });

        // 在控制台打印进度
        console.log(`${questionNumber}.${question}`);
        console.log(options);
        console.log(answer);
        console.log('------------------------');

        // 查找下一题按钮
        let nextButton = document.querySelector('.next-preve button:nth-child(2) .flex-btn .tit');
        if (!nextButton || !nextButton.closest('button') || nextButton.closest('button').disabled) {
            console.log('没有更多题目或下一题按钮被禁用');
            break;
        }

        // 点击下一题按钮
        nextButton.closest('button').click();
        // 等待页面加载
        await new Promise(resolve => setTimeout(resolve, 2000));
        questionIndex++;
    }

    // 生成并下载文本文件
    let textContent = '';
    allQuestions.forEach((q) => {
        textContent += `${q.number}.${q.question}\n`;
        textContent += `${q.options}\n`;
        textContent += `${q.answer}\n`;
    });

    // 创建并触发下载
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // 控制台提示完成
    console.log('所有题目已获取并保存至questions.txt');
	console.log('注：本版本暂无法获取到简答题信息');
}
