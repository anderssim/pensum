const TemplatesAPI = (() => {

    const renderAllSteps = (pattern) => {
        
        return /*html*/ `
            <table>
                <thead>
                    <tr>
                        <th>Tælling</th>
                        <th>Stand</th>
                        <th>Teknik</th>
                    </tr>
                </thead>
                <tbody>
                    ${pattern.steps.map((step) => 
                        step.actions.map((action, index, actions) => {
                            const oddEvenClass = step.count % 2 === 0 ? 'even' : 'odd';
                            if (index < actions.length - 1 && actions[index + 1].stance === "-||-") {
                                return /*html*/ `
                                    <tr>
                                        <td class="${oddEvenClass}">${step.count}${actions.length > 1 ? `.${index + 1}` : ''}</td>
                                        <td class="${oddEvenClass}" rowspan="2">${action.stance}</td>
                                        <td class="${oddEvenClass}">${action.technique}</td>
                                    </tr>
                                `;
                            } else if (action.stance === "-||-") {
                                return /*html*/ `
                                    <tr>
                                        <td class="${oddEvenClass}">${step.count}${actions.length > 1 ? `.${index + 1}` : ''}</td>
                                        <td class="${oddEvenClass}">${action.technique}</td>
                                    </tr>
                                `;
                            } else {
                                return /*html*/ `
                                    <tr>
                                        <td class="${oddEvenClass}">${step.count}${actions.length > 1 ? `.${index + 1}` : ''}</td>
                                        <td class="${oddEvenClass}">${action.stance}</td>
                                        <td class="${oddEvenClass}">${action.technique}</td>
                                    </tr>
                                `;
                            }
                        }).join('')
                    ).join('')}
                </tbody>
            </table>`;
        
    }

    return {
        renderAllSteps
    }

})()