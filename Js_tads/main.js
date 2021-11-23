const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content');
const tabsContent = document.getElementById('tabsContent');
const contentContent = document.querySelectorAll('.contentContent');

const changeClass = el => {
for (let i = 0; i < tabs.children.length; i++) {
tabs.children[i].classList.remove('active');
}
el.classList.add('active');
}

const changeClassContent = el => {
    for (let i = 0; i < tabsContent.children.length; i++) {
        tabsContent.children[i].classList.remove('active');
    }
    el.classList.add('active');
}

tabs.addEventListener('click', e => {
    const curTab = e.target.dataset.btn;
    changeClass(e.target);
    for (let i = 0; i < content.length; i++) {
        content[i].classList.remove('active');
        if (content[i].dataset.content === curTab) {
            content[i].classList.add('active');
        }
    }
})

tabsContent.addEventListener('click', e => {
    const curTab = e.target.dataset.btn;
    changeClassContent(e.target);
    for (let i = 0; i < contentContent.length; i++) {
        contentContent[i].classList.remove('active');
        if (contentContent[i].dataset.content === curTab) {
            contentContent[i].classList.add('active');
        }
    }
})

