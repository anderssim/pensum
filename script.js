(() => {
        
    var start = document.getElementById("START");
    console.log(list)
    console.log(il_jang)
    
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
        console.log('difficulty', difficulty);

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

        question.innerHTML = /*html*/`
        <div class="question">
            <h3>${pattern.type} ${pattern.name}</h3>
            <p>${pattern.description}</p>
            <h3>Step: ${step.count} / ${pattern.steps.length}</h3>
            <button id="SHOW_ANSWER">See the answer</button>
        </div>`

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
                            <th></th>
                            <th>Stance</th>
                            <th>Technique</th>
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
            </div>`
    }
})();