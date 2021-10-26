const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // Сам вопорс

const numberOfQestion = document.getElementById('number-of-question'), // Номер вопорса
      numberOfAllQestion = document.getElementById('number-of-all-questions'); // Кол-во всех вопросов

let indexOfQestion,  // Индекс текущего вопроса
    indexOfPage = 0; // Индекс страницы

const answerTracker = document.getElementById('answers-tracker'); // Обертка для трекера
const btnNext = document.getElementById('btn-next'); // Кнопка далее

let score = 0; // Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // Кол-во правильных ответов
      numbetOfAllQestions2 = document.getElementById('number-of-all-questions-2'), // Кол-во всех вопросов
      btnTryAgain = document.getElementById('btn-try-again'); // Кнопка "начать викторину заново"

const questions = [
    {
        question: 'Меня зовут?',
        options: [
            'Андрей',
            'Дмитрий',
            'Николай',
            'Вячеслав',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком университете России я учусь?',
        options: [
            'ПетрГУ',
            'ИТМО',
            'МГУ',
            'Какой универ? Я в школе',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сколько курсов от Wayup я прошел?',
        options: [
           '1',
           '4',
           '3',
           '2',
        ],
        rightAnswer: 3
    }
];

numberOfAllQestion.innerHTML = questions.length; // Выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQestion].question; // Сам вопрос

    // Мапим ответы
    option1.innerHTML = questions[indexOfQestion].options[0];
    option2.innerHTML = questions[indexOfQestion].options[1];
    option3.innerHTML = questions[indexOfQestion].options[2];
    option4.innerHTML = questions[indexOfQestion].options[3];

    numberOfQestion.innerHTML = indexOfPage + 1; // Установка номера текущей страницы
    indexOfPage++; // Увеличение индекса страницы
};

let completedAnswers = []; // Массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNuder = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // Флаг для проерки одинаковых вопросов

    if(indexOfPage == questions.length){
        quizOver();
    } 
    else {
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if(item == randomNuder) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            }
            else{
                indexOfQestion = randomNuder;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQestion = randomNuder;
            load();
        }
    }
    completedAnswers.push(indexOfQestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTrecker('correct');
        score++;
    }
    else{
        el.target.classList.add('wrong');
        updateAnswerTrecker('wrong');
    }
    disabledOptions();
};

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQestion].rightAnswer){
            item.classList.add('correct');
        }
    })
};

const enableOptions = () => {
    optionElements.forEach((item) => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker1 = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answerTracker.appendChild(div);
    })
};

const updateAnswerTrecker = status => {
    answerTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    }
    else{
        randomQuestion();
        enableOptions();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numbetOfAllQestions2.innerHTML = questions.length;
};

const truAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', truAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker1();
});

   