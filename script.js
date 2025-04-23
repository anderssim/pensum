(() => {
        
    var start = document.getElementById("START");
    
    
    var patterns = {
        "il_jang": il_jang,
        "yi_jang": yi_jang,
        "sam_jang": sam_jang,
        "sah_jang": sah_jang,
        "oh_jang": oh_jang,
        "yuk_jang": yuk_jang,
        "chil_jang": chil_jang,
        "pal_jang": pal_jang,
        "koryo": koryo
    }

    var levelSelect = document.getElementById("LEVEL_SELECT");
    var question = document.getElementById("QUESTION");
    var answer = document.getElementById("ANSWER");
    var difficulty = 1;

    
    start.addEventListener("click", () => {
        difficulty = levelSelect.options[levelSelect.selectedIndex].value;
        start.classList.add('hidden');
        reset();
        randomQuestion();
    })

    function reset() {
        question.innerHTML = "";
        answer.innerHTML = "";
    }

    function randomQuestion () {
        // var randomIndex = Math.floor(Math.random() * difficulty);
        var index = difficulty;
        var pattern = patterns[list[index].key];
        var randomStepIndex = Math.floor(Math.random() * pattern.steps.length);
        var step = pattern.steps[randomStepIndex];

        showQuestion(pattern, step);
    }

    function showQuestion(pattern, step) {
        question.innerHTML = /*html*/`
        
        <div class="question">
            ${pattern.type} <span class="countHighlight">${pattern.name}</span> har ${pattern.steps.length} tællinger.
            <br>
            <br>
            Tælling ${step.count}  har ${step.actions.length} ${step.actions.length > 1 ? 'bevægelser' : 'bevægelse'}.
            
            Hvilken stand og ${step.actions.length > 1 ? 'teknikker' : 'teknik'} er der i den <span class="countHighlight">${step.count}</span> tælling?
        </div>
        <button id="SHOW_ANSWER" class="answer_btn">
            Se svaret!    
        </button>`

        var answerButton = document.getElementById("SHOW_ANSWER");
        answerButton.addEventListener("click", () => {
            answerButton.classList.add('hidden');
            showAnswer(step);
        })
    }

    function showAnswer(step) {
        answer.innerHTML = /*html*/`
        
            <div class="answer">
                
                <table>
                    <thead>
                        <tr>
                            <th>Tælling</th>
                            <th>Stand</th>
                            <th>Teknik</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${step.actions.map((action, index) => /*html*/`
                            <tr>
                                <td>${step.count}${step.actions.length > 1 ? `.${index + 1}` : ''}</td>
                                <td>${action.stance}</td>
                                <td>${action.technique}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="breaker"></div>`

        start.classList.remove('hidden');
    }
})();