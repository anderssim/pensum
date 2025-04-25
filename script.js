(() => {
    
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
    
    var pensum_box = document.getElementById("PENSUM_BOX");
    var levelSelect = document.getElementById("LEVEL_SELECT");


    levelSelect.innerHTML = levels.map((item) => /*html*/`
        <option value="${item.level}">${item.pensum}</option>
    `).join('');

    levelSelect.addEventListener("change", (event) => {
        level = levelSelect.options[levelSelect.selectedIndex].value;
        localStorage.setItem("selectedLevel", level); 
        displayPensumLevel(level);
    });

    document.addEventListener("DOMContentLoaded", () => {
        const savedLevel = localStorage.getItem("selectedLevel");
        if (savedLevel) {
            level = savedLevel;
            levelSelect.value = savedLevel;
            displayPensumLevel(level);
        } else {
       
            level = levelSelect.options[0].value;
            displayPensumLevel(level);
        }
    });
    
    function displayPensumLevel (level) {
        var index = level;   
        var pattern = patterns[list[index].key];
        pensum_box.innerHTML = /*html*/`
        <div class="pensum">
            <div class="pensum_text">
                
                <h3 class="pensum-title">Serie: ${pattern.type} ${pattern.name}</h3>
                <div>Antal tællinger: ${pattern.steps.length}</div>

                <div class="primary-content">
                    <button id="TEST_BUTTON" class="test_button">
                        Test din viden om ${pattern.type} ${pattern.name}!
                    </button>
                </div>                
                <div class="breaker_2"></div>

                <div class="flex-container">
                    ${renderGweButton(pattern)}
                    <div style="width: 20%;">
                        <button id="PHYSICAL_INFO" class="info_button">
                            <div class="emojii" gwe-name="Fysik">🏋️‍♂️</div>
                        </button>
                    </div>
                </div>
            </div>            
        </div>`
        registerListeners(pattern);        
    }

    function renderGweButton (pattern) {
        if (pattern.number < 9) {
            return /*html*/`
                <div style="width: 20%;">
                    <button id="GWE_INFO" class="info_button">
                        <div class="emojii" gwe-name="Gwe">${pattern.gwe.emojii}</div>
                    </button>
                </div>`
        }
        return ''
    }

    function registerListeners(pattern) {
        var gweButton = document.getElementById("GWE_INFO");
        var physicalButton = document.getElementById("PHYSICAL_INFO");
        var testButton = document.getElementById("TEST_BUTTON");

        if (pattern.number < 9) {
            gweButton.addEventListener("click", () => {
                showGweInfo(pattern);
            });
        }

        physicalButton.addEventListener("click", () => {
            showPhysicalInfo(pattern);
        });

        testButton.addEventListener("click", () => {
            showARandomQuestion(pattern);
        })
    }
    
    function showGweInfo (pattern) {
        var modal = document.getElementById("MODAL");
        modal.classList.remove('hidden');
        modal.innerHTML = /*html*/`

        <div class="modal-container">
            <div class="modal_content">
                <button id="CLOSE_MODAL" class="close_btn">✖</button>
                <div>
                    <h1 class="gwe_info">${pattern.gwe.emojii}</h1>
                </div>
                <div>
                    <h2>${pattern.gwe.name}</h2>
                    <p>${pattern.gwe.description}</p>
                </div>
            </div>
        </div>`
        registerCloseModalListener(modal);
    }

    function showPhysicalInfo (pattern) {
        var modal = document.getElementById("MODAL");
        modal.classList.remove('hidden');
        modal.innerHTML = /*html*/`

        <div class="modal-container">
            <div class="modal_content">
                <button id="CLOSE_MODAL" class="close_btn">✖</button>
                <div class="inner-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Handlinger</th>
                                <th>Antal</th>
                                <th>Tid</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${pattern.physicalTest.actions.map((item, index) => /*html*/`
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.count}</td>
                                ${index === 0 ? `<td rowspan="${pattern.physicalTest.actions.length}">${pattern.physicalTest.timeSeconds / 60} minutter</td>` : ''}
                            </tr>
                        `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`
        registerCloseModalListener(modal);
    }

    function showARandomQuestion(pattern){
        var randomStepIndex = Math.round(Math.random() * pattern.steps.length);
        var step = pattern.steps[randomStepIndex];
        showQuestionModal(pattern, step, randomStepIndex);
    }

    function showQuestionModal(pattern, step, index) {
        var modal = document.getElementById("MODAL");
        modal.classList.remove('hidden');
        modal.innerHTML = /*html*/`

        <div class="modal-container">
            <div class="modal_content">
                <button id="CLOSE_MODAL" class="close_btn">✖</button>
                <div class="inner-content">
                    <div class="question" id="QUESTION_CONTAINER">
                        <h5 class="question-title">Spørgsmål 🤔</h5>
                        <p>Hvilken stand og ${step.actions.length > 1 ? 'teknikker' : 'teknik'} skal man udføre på <br>${pattern.type} <b>${pattern.name}'s</b> tælling nummer: <span class="countHighlight">${step.count}</span></p>
                    </div>
                    <div class="question relative hidden" id="RESPONSE_CONTAINER">
                        <p>På tællingen <b>${step.count}</b> i ${pattern.type} <b>${pattern.name}</b> skal man udføre <b>${step.actions.length}</b> ${step.actions.length > 1 ? 'handlinger' : 'handling'}. 🤓</p>
                    </div>                    
                    <div class="hidden" id="ANSWER_CONTAINER"></div>
                    <div>
                        <button id="ANSWER_BUTTON" class="answer_btn">Check dit svar</button>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>`
        registerAnswerButtonListener(step, pattern, index)
        registerCloseModalListener(modal);
    }

    function registerAnswerButtonListener(step, pattern, index) {
        var answerButton = document.getElementById("ANSWER_BUTTON");
        answerButton.addEventListener("click", () => {
            answerButton.classList.add('hidden');
            showTheAnswer(step, pattern, index);
        })
    }

    function showTheAnswer(step, pattern, index) {
        var question = document.getElementById("QUESTION_CONTAINER");
        var answer = document.getElementById("ANSWER_CONTAINER");
        var response = document.getElementById("RESPONSE_CONTAINER");

        response.classList.remove('hidden');
        question.classList.add('hidden');
        answer.classList.remove('hidden');

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
                    ${step.actions.map((action, index, actions) => {
                        if (index < actions.length - 1 && actions[index + 1].stance === "-||-") {
                            return /*html*/ `
                                <tr>
                                    <td>${step.count}${actions.length > 1 ? `.${index + 1}` : ''}</td>
                                    <td rowspan="2">${action.stance}</td>
                                    <td>${action.technique}</td>
                                </tr>
                            `;
                        } else if (action.stance === "-||-") {
                            return /*html*/ `
                                <tr>
                                    <td>${step.count}${actions.length > 1 ? `.${index + 1}` : ''}</td>
                                    <td>${action.technique}</td>
                                </tr>
                            `;
                        } else {
                            return /*html*/ `
                                <tr>
                                    <td>${step.count}${actions.length > 1 ? `.${index + 1}` : ''}</td>
                                    <td>${action.stance}</td>
                                    <td>${action.technique}</td>
                                </tr>
                            `;
                        }
                    }).join('')}
                </tbody>
            </table>
            
            <div class="nav-container">
                <button id="PREV" class="page_btn prev_btn ${index <= 0 ? 'hidden': ''}">⬅</button>
                <button id="NEXT" class="page_btn next_btn ${index >= pattern.steps.length - 1 ? 'hidden': ''}">⬅</button>
                <div class="clear"></div>
            </div>
        </div>`
        document.getElementById("PREV").addEventListener("click", () => {
            var newIndex = index - 1;
            var prevStep = pattern.steps[newIndex];
            showTheAnswer(prevStep, pattern, newIndex);
        });
        document.getElementById("NEXT").addEventListener("click", () => {
            var newIndex = index + 1;
            var nextStep = pattern.steps[newIndex];
            showTheAnswer(nextStep, pattern, newIndex);
        });

    }

    function registerCloseModalListener(modal) {
        var closeModalButton = document.getElementById("CLOSE_MODAL");
        closeModalButton.addEventListener("click", () => {
            modal.classList.add('hidden');
            modal.innerHTML = "";
        })
    }

    displayPensumLevel(0);

})();