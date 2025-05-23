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
    
    var pensumMap = {
        "kup_8": kup_8,
        "kup_7": kup_7,
        "kup_6": kup_6,
        "kup_5": kup_5,
        "kup_4": kup_4,
        "kup_3": kup_3,
        "kup_2": kup_2,
        "kup_1": kup_1,
        "dan_1": dan_1,
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
        console.log("DOMContentLoaded");
        const savedLevel = localStorage.getItem("selectedLevel");
        console.log('savedLevel', savedLevel);
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
        var pensum = pensumMap[list[index].degree];
                
        pensum_box.innerHTML = renderTTU(pensum)
        
        registerPatternListeners(pensum);
        registerFlagListeners();
    }

    function registerFlagListeners() {
        document.getElementById("FLAG_INFO").addEventListener("click", () => {
            // showFlagInfo();
        })

    }

    function registerPatternListeners(pensum) {
        var buttons = pensum.taegeuk.map(item => {
            document.getElementById(item.key).addEventListener("click", () => {
                var pattern = patterns[item.key];
                showPattern(pattern)
            })
        })
    }

    function showFlagInfo () {
        var modal = document.getElementById("MODAL");
        modal.classList.remove('hidden');
        modal.innerHTML = /*html*/`
            <div class="modal-container">
            <div class="modal_content">
                <button id="CLOSE_MODAL" class="close_btn">✖</button>
                <h3 style="margin: 0px;">
                    <div>
                        <div style="display: inline-block;">Taegeukgi</div> 
                    </div>
                </h3>
                <!-- <div class="flag-container">
                    <img src="assets/taegeuki.mid.jpg" alt="flag" class="flag">
                </div> -->

                <div class="flag-container">
                    <img src="assets/taegeuki.mid.jpg" alt="Taegeukgi Flag" class="flag">
                    <div class="trigram-geon" data-label="Geon: Himmel"></div>
                    <div class="trigram-gam" data-label="Gam: Vand"></div>
                    <div class="trigram-ri" data-label="Ri: Ild"></div>
                    <div class="trigram-gon" data-label="Gon: Jorden"></div>
                </div>
                
                
                <!-- <img src="assets/taegeuki.mid.jpg" alt="flag" class="flag">

                <div class="infographic-details">
                    <p><strong>Den hvide baggrund:</strong> Purity</p>
                    <p><strong>Red & Blue Taegeuk:</strong> Positive & Negative Cosmic Forces</p>
                    <p><strong>Black Bars:</strong> Movement & Harmony</p>
                    <ul>
                        <li><strong>☰ Geon:</strong> Sky</li>
                        <li><strong>☵ Gam:</strong> Water</li>
                        <li><strong>☲ Ri:</strong> Fire</li>
                        <li><strong>☷ Gon:</strong> Earth</li>
                    </ul>
                </div> -->

                
            </div>
        </div>
        `
    }

    function showPattern(pattern) {
        

        var modal = document.getElementById("MODAL");
        modal.classList.remove('hidden');
        modal.innerHTML = /*html*/`

        <div class="modal-container">
            <div class="modal_content">
                <button id="CLOSE_MODAL" class="close_btn">✖</button>
                <h3 style="margin: 0px;">
                    <div>
                        <div style="display: inline-block;">${pattern.name}</div> 
                    </div>
                </h3>
                <div class="p5tb">${pattern.steps.length} tællinger </div>
                <button class="cta-button" id="TEST_BUTTON">Test din viden</button>

                ${TemplatesAPI.renderAllSteps(pattern)}
            </div>
        </div>`
        var testButton = document.getElementById("TEST_BUTTON");
        testButton.addEventListener("click", () => {
            showARandomQuestion(pattern);
        })
        getHeightOfTableDiv();
        registerCloseModalListener(modal);
    }

    function getHeightOfTableDiv() {
        requestAnimationFrame(() => {
            var viewportHeight = window.innerHeight;
            var tableDiv = document.getElementById("TABLE_DIV");
            if (tableDiv) {
                console.log('tableDiv', tableDiv);
                if (tableDiv.offsetHeight > viewportHeight) {
                    tableDiv.style.height = (viewportHeight - 240) + "px";
                    tableDiv.style.overflowY = "auto";
                }
            } else {
                console.warn('TABLE_DIV element not found in the DOM.');
            }
            return ''
        });
    }

    function renderTTU(pensum) {

        // showPattern(patterns["il_jang"])
        // showPattern(patterns["yi_jang"])
        // showPattern(patterns["sam_jang"])
        // showPattern(patterns["sah_jang"])
        return /*html*/`
            <div class="pensum-container">

                <div class="pensum-content">
                    <h5 class="pensum-section-head">Serier</h5>
                    <div class="content-emoji strong">🥋</div>
                    <div class="grid-container">
                        
                        ${pensum.taegeuk.map(item => /*html*/`
                            <button id="${item.key}" class="grid-button"> 
                                <div class="grid-column">
                                    <div class="p8tb">${item.number}. ${item.name}</div>
                                </div>
                                <div class="grid-column ">

                                ${Analogies[item.key]().gwe ? `
                                    <div class="gwe-on-list" gwe-emoji="${Analogies[item.key]().gwe.emoji}">
                                        <span class="gwe-on-list-name">${Analogies[item.key]().gwe.name}</span>
                                        <span class="gwe-on-list-name-element" >${Analogies[item.key]().gwe.primary}</span>
                                    </div>`: ''}

                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
                

                <div class="pensum-content ${pensum.ttu.poomse.length > 0 ? '' : 'hidden'}">
                    <h5 class="pensum-section-head">TTU Serier </h5>
                    <div class="content-emoji strong">
                        <img src="assets/um-yang.png" alt="uuummm" class="um-yang">
                    </div>
      
                    <div class="grid-container">
                        ${pensum.ttu.poomse.map(item => /*html*/`
                            <div class="grid-column">
                                <div class="p8tb">${item.number}. ${item.name}</div>
                            </div>
                            <div class="grid-column">
                                <div></div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="pensum-content ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.son_dong_jak.length > 0 ? '' : 'hidden'}">                
                    <h5 class="pensum-section-head">Hanbon kyorugi <span class="h5-minor">(Et skridt kamp)</span></h5>
                    <div class="content-emoji hand">👊 <span>1</span></div>
                    <div class="grid-container">
                        ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.son_dong_jak.length > 0 ? `
                            <div class="grid-column">
                                <div class="p5tb">
                                    <div class="no-mb">Son Dong Jak</div>
                                    <div class="danish"><i>Et skridt (hånd)</i></div>    
                                </div>
                            </div>
                            <div class="grid-column">
                                <div class="pensum-value">1 - ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.son_dong_jak.length}</div>
                            </div>
                        ` : ''}
                    
                        ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.bal_dong_jak.length > 0 ? `
                            <div class="grid-column">
                                <div class="p5tb">    
                                    <div class="no-mb">Bal Dong Jak</div>
                                    <div class="danish"><i>Et skridt (fod)</i></div>
                                </div>
                            </div>
                            <div class="grid-column ">
                                <div class="pensum-value">1 - ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.bal_dong_jak.length}</div>
                            </div>
                        ` : ''}

                        ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.eungyong_dong_jak.length > 0 ? `
                            <div class="grid-column no-border">
                                <div class="p5tb">
                                    <div class="no-mb">Eungyong Dong Jak</div>
                                    <div class="danish"><i>Et skridt (kombinationer)</i></div>
                                </div>
                            </div>
                            <div class="grid-column no-border">
                                <div class="pensum-value">1 - ${pensum.ttu.pensum.kyorugi.hanbon_kyorugi.eungyong_dong_jak.length}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
          

                <div class="pensum-content ${pensum.ttu.pensum.kyorugi.hosinsul.palmok_jagbi.length > 0 ? `` : 'hidden'}">
                    <h5 class="pensum-section-head">Hosinsul <span class="h5-minor">(Selvforsvar)</span></h5>
                    <div class="content-emoji strong">🛡️</div>
                    
                    <div class="grid-container">
                        ${pensum.ttu.pensum.kyorugi.hosinsul.palmok_jagbi.length > 0 ? `
                            <div class="grid-column">
                                <div class="p5tb">
                                    <div class="no-mb">Palmok Jagbi</div>
                                    <div class="danish"><i>Frigørelse (hånd)</i></div>
                                </div>
                            </div>
                            <div class="grid-column">
                                <div class="pensum-value">1 - ${pensum.ttu.pensum.kyorugi.hosinsul.palmok_jagbi.length}</div>
                            </div>
                        ` : ''}

                        ${pensum.ttu.pensum.kyorugi.hosinsul.mom_jagbi.length > 0 ? `
                            <div class="grid-column">
                                <div class="p5tb">
                                    <div class="no-mb">Mom Jagbi</div>
                                    <div class="danish"><i>Frigørelse (krop)</i></div>
                                </div>
                            </div>
                            <div class="grid-column">
                                <div class="pensum-value"> 1 - ${pensum.ttu.pensum.kyorugi.hosinsul.mom_jagbi.length}</div>
                            </div>
                        ` : ''}

                        ${pensum.ttu.pensum.kyorugi.hosinsul.jireugi.length > 0 ? `
                            <div class="grid-column">
                            <div class="p5tb">
                                <div class="no-mb">Jireugi</div>
                                <div class="danish"><i>Forsvar mod slag</i></div>
                            </div>
                            </div>
                            <div class="grid-column ">
                                <div class="pensum-value"> 1 - ${pensum.ttu.pensum.kyorugi.hosinsul.jireugi.length}</div>
                            </div>
                        ` : ''}
                   </div>
                

                </div>


                <div class="pensum-content">
                    <h5 class="pensum-section-head">Sambon kyorugi <span class="h5-minor">(Tre skridts kamp)</span></h5>
                    <div class="content-emoji hand">👊 <span>3</span></div>
                        <div class="grid-container">
                            <div class="grid-column">
                                <div class="p8tb">Tre skridts kamp</div>
                            </div>
                            <div class="grid-column">
                                <div class="pensum-value">1 - ${pensum.ttu.pensum.kyorugi.sambon_kyorugi.length}</div>
                            </div>
                    </div>
                </div>


                <div class="pensum-content ${pensum.ttu.pensum.kyorugi.sparring.required ? ``: 'hidden'}" >
                    <h5 class="pensum-section-head">Frikamp</h5>
                    <div class="content-emoji strong">⚔️</div>
                    <div class="grid-container">
                        <div class="grid-column">
                            <div class="p8tb">Runder</div>
                        </div>
                        <div class="grid-column">
                            <div class="pensum-value">${pensum.ttu.pensum.kyorugi.sparring.rounds} x ${pensum.ttu.pensum.kyorugi.sparring.roundTimeSeconds / 60} <span class="danish" >minutter</span> </div>
                        </div>
                        <div class="grid-column">
                            <div class="p8tb">Beskyttelse</div>
                        </div>
                        <div class="grid-column">
                            <div class="pensum-value">${pensum.ttu.pensum.kyorugi.sparring.protection ? 'Ja' : 'Nej'}</div>
                        </div>
                        <div class="grid-column">
                            <div class="p8tb">2 mod 1 frikamp</div>
                        </div>
                        <div class="grid-column">
                            <div class="pensum-value">${pensum.ttu.pensum.kyorugi.sparring['1vs2'] ? 'Ja' : 'Nej'}</div>
                        </div>
                    </div>
                </div>

               
                <div class="pensum-content  ${pensum.ttu.pensum.kyokpa.required ? ``: 'hidden'}">
                    <h5 class="pensum-section-head">Gennembrydning</h5>
                    <div class="content-emoji strong"><span>💥</span>🧱</div>
                    <div class="grid-container">                    
                        <div class="grid-column">
                            <div>Brædder</div>
                        </div>
                        <div class="grid-column">
                            <div class="p5tb">
                                ${pensum.ttu.pensum.kyokpa.punch ? `<div>- Slag</div>` : ''}
                                ${pensum.ttu.pensum.kyokpa.kick ? `<div>- Spark</div>` : ''}
                                ${pensum.ttu.pensum.kyokpa.jump_kick ? `<div>- Flyvespark</div>` : ''}
                            </div>
                        </div>

                        ${pensum.ttu.pensum.kyokpa.bricks.required ? `
                            <div class="grid-column">
                                <div class="p5tb">
                                    <div class="no-mb">Tagsten</div>
                                    <div class="danish"><i>Alderskrav: ${pensum.ttu.pensum.kyokpa.bricks.requirements.age} år</i></div>
                                </div>
                            </div>
                            <div class="grid-column">
                                <div class="pensum-value" style="padding: 3px 0;">
                                    <div>
                                        <div class="danish" style="width: 70px; display: inline-block">Mænd:</div>${pensum.ttu.pensum.kyokpa.bricks.male} 
                                    </div>
                                    <div>
                                        <div class="danish" style="width: 70px; display: inline-block;">Kvinder:</div>${pensum.ttu.pensum.kyokpa.bricks.female}
                                    </div>
                                    
                                </div>
                            </div>
                        `: ''}
                    </div>                    
                </div>
                


                <div class="pensum-content">
                    <h5 class="pensum-section-head">Fysisk pensum</h5>
                    
                    <div class="content-emoji strong">🏋️</div>
                    <div class="grid-container">                    
                        <div class="grid-column">
                            <div class="p8tb">Armbøjninger</div>
                        </div>
                        <div class="grid-column">
                            <div class="pensum-value" >
                                ${pensum.physical.push_ups}
                            </div>
                        </div>

                        <div class="grid-column">
                            <div class="p8tb">Mavebøjninger</div>
                        </div>
                        <div class="grid-column">
                            <div class="pensum-value" >
                                ${pensum.physical.sit_ups}
                            </div>
                        </div>

                        <div class="grid-column">
                            <div class="p8tb">Englehop</div>
                        </div>
                        <div class="grid-column">
                            <div class="pensum-value" >
                                ${pensum.physical.jumping_jacks}
                            </div>
                        </div>
                        <div class="p5tb">
                            <i>Tid til rådighed: ${pensum.physical.timeSeconds / 60} minutter</i>
                        </div>
                    </div>                    
                </div>

                <div class="pensum-content">
                    <h5 class="pensum-section-head">Baggrund <span class="h5-minor">(Historie og andet skrammel)</span></h5>
                    
                    <div class="content-emoji strong">
                        <div class="emo-symbols">
                            <div class="emo-eye">👁</div>
                            <div class="emo-tri">🜂</div>
                        </div>

                        
                    </div>
                    
                    <div class="grid-container">                    
                        <div class="grid-column">
                            <div class="p8tb">Teakwondo historie</div>
                        </div>
                        <div class="grid-column">
                            <div>
                                
                            </div>
                        </div>

                        <button id="FLAG_INFO" class="grid-button"> 
                            <div class="grid-column">
                                <div class="p8tb">Flaget</div>
                            </div>
                            <div class="grid-column">
                                <div>
                                    
                                </div>
                            </div>
                        </button>
                                      
                        <div class="grid-column">
                            <div class="p8tb">Gwe'erne</div>
                        </div>
                        <div class="grid-column">
                            <div>
                                
                            </div>
                        </div>
                    </div>                    
                </div>

                <div class="pensum-content">
                    <h5 class="pensum-section-head">Kroppen
                        <!-- <span class="h5-minor">(Historie og symbolikker)</span> -->
                    </h5>
                    
                    <div class="content-emoji strong">🧘</div>
                    
                    <div class="grid-container">                    
                        <div class="grid-column">
                            <div class="p8tb">Generelt</div>
                        </div>
                        <div class="grid-column"></div>
                                     
                        <div class="grid-column">
                            <div class="p8tb">Sårbare punkter</div>
                        </div>
                        <div class="grid-column">
                            <div>
                                Hoved, hals
                            </div>
                        </div>
                        
                        <div class="grid-column">
                            <div class="p8tb">Sårbare punkter</div>
                        </div>
                        <div class="grid-column">
                            <div>
                                Krop <span class="danish">(for og bag)</span>
                            </div>
                        </div>

                        <div class="grid-column">
                            <div class="p8tb">Sårbare punkter</div>
                        </div>
                        <div class="grid-column">
                            <div>
                                Arme, ben
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>`
    }


    
    
    // function renderGweButton (pattern) {
    //     if (pattern.number < 9) {
    //         return /*html*/`
    //             <div>
    //                 <button id="GWE_INFO" class="info_button" info-text="${pattern.gwe.name}">
    //                     ${pattern.gwe.emoji}
    //                 </button>
    //             </div>`
    //     }
    //     return ''
    // }

    // function registerListeners(pattern) {

    //     var latestFormButton = document.getElementById("LATEST_FORM");

    //     latestFormButton.addEventListener("click", () => {
    //         showLatestForm(pattern)
    //     })

    
    // }

    
    // function showGweInfo (pattern) {
    //     var modal = document.getElementById("MODAL");
    //     modal.classList.remove('hidden');
    //     modal.innerHTML = /*html*/`

    //     <div class="modal-container">
    //         <div class="modal_content">
    //             <button id="CLOSE_MODAL" class="close_btn">✖</button>
    //             <div>
    //                 <h1 class="gwe_info">${pattern.gwe.emoji}</h1>
    //             </div>
    //             <div>
    //                 <h2>${pattern.gwe.name}</h2>
    //                 <p>${pattern.gwe.description}</p>
    //             </div>
    //         </div>
    //     </div>`
    //     registerCloseModalListener(modal);
    // }

    // function showPhysicalInfo (pattern) {
    //     var modal = document.getElementById("MODAL");
    //     modal.classList.remove('hidden');
    //     modal.innerHTML = /*html*/`

    //     <div class="modal-container">
    //         <div class="modal_content">
    //             <button id="CLOSE_MODAL" class="close_btn">✖</button>
    //             <div class="inner-content">
    //                 <table>
    //                     <thead>
    //                         <tr>
    //                             <th>Handlinger</th>
    //                             <th>Antal</th>
    //                             <th>Tid</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                     ${pattern.physicalTest.actions.map((item, index) => /*html*/`
    //                         <tr>
    //                             <td>${item.name}</td>
    //                             <td>${item.count}</td>
    //                             ${index === 0 ? `<td rowspan="${pattern.physicalTest.actions.length}">${pattern.physicalTest.timeSeconds / 60} minutter</td>` : ''}
    //                         </tr>
    //                     `).join('')}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>`
    //     registerCloseModalListener(modal);
    // }

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
                        <h3 class="question-title">Spørgsmål er... 🤔</h3>
                        <p>Hvilken stand og ${step.actions.length > 1 ? 'teknikker' : 'teknik'} skal man udføre på <br>${pattern.type} <b>${pattern.name}'s</b> tælling nummer: <span class="countHighlight">${step.count}</span></p>
                    </div>
                    <div class="question relative hidden" id="RESPONSE_CONTAINER">
                        <p>På tællingen <b>${step.count}</b> i ${pattern.type} <b>${pattern.name}</b> skal man udføre <b>${step.actions.length}</b> ${step.actions.length > 1 ? 'handlinger' : 'handling'}. 🤓</p>
                    </div>                    
                    <div class="hidden" id="ANSWER_CONTAINER"></div>
                    <div>
                        <button id="ANSWER_BUTTON" class="answer_btn">Se svaret</button>
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

})();