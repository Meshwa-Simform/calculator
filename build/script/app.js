import { reply } from "./input.js";
import { keyboardinput } from "./keyboardinput.js";
import { convert_to_infix } from "./toinfix.js";
import { convert_to_postfix } from "./topostfix.js";
import { evaluatepostfix } from "./evaluatepostfix.js";
import { history, displayHistory } from "./history.js";
let unit;
// Event Listner for onlick input
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = button.getAttribute("value");
        if (value === '=') {
            const input = document.querySelector('input');
            const equation = input === null || input === void 0 ? void 0 : input.value;
            const resultElement = document.getElementById("result");
            let openCount = 0;
            let closeCount = 0;
            if (equation) {
                for (let char of equation) {
                    if (char === '(') {
                        openCount++;
                    }
                    else if (char === ')') {
                        closeCount++;
                    }
                    if (openCount !== closeCount) {
                        if (resultElement) {
                            resultElement.innerHTML = "Error: Missmatched brackets";
                        }
                        return;
                    }
                    if (equation.length === 0) {
                        if (resultElement) {
                            resultElement.innerHTML = "Error: Enter input";
                        }
                        return;
                    }
                    else {
                        const infix_arr = convert_to_infix(equation);
                        const postfix_arr = convert_to_postfix(infix_arr);
                        const Answer = evaluatepostfix(postfix_arr, unit);
                        if (resultElement) {
                            resultElement.innerHTML = Answer;
                        }
                        history(equation, Answer);
                    }
                }
            }
        }
        else {
            unit = reply(button.id, unit);
        }
    });
});
// Event listner for key input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Enter') {
        const input = document.querySelector('input');
        const equation = input === null || input === void 0 ? void 0 : input.value;
        const resultElement = document.getElementById("result");
        let openCount = 0;
        let closeCount = 0;
        if (equation) {
            for (let char of equation) {
                if (char === '(') {
                    openCount++;
                }
                else if (char === ')') {
                    closeCount++;
                }
            }
            if (openCount !== closeCount) {
                if (resultElement) {
                    resultElement.innerHTML = "Error: Missmatched brackets";
                }
                return;
            }
            if (equation.length === 0) {
                if (resultElement) {
                    resultElement.innerHTML = "Error: Enter input";
                }
                return;
            }
            else {
                const infix_arr = convert_to_infix(equation);
                const postfix_arr = convert_to_postfix(infix_arr);
                const Answer = evaluatepostfix(postfix_arr);
                if (resultElement) {
                    resultElement.innerHTML = Answer;
                }
                history(equation, Answer);
            }
        }
    }
    else {
        keyboardinput(key);
    }
});
// Event listner for dark mode
document.getElementsByClassName('fa-circle-half-stroke')[0].addEventListener('click', function () {
    var element = document.body;
    element.classList.toggle("dark-mode");
});
// Event listener for history icon
document.getElementsByClassName('fa-clock')[0].addEventListener('click', () => {
    document.getElementsByClassName("fa-clock")[0].style.display = "none";
    document.getElementsByClassName("fa-calculator")[0].style.display = "block";
    document.getElementsByClassName('buttons')[0].style.display = "none";
    document.getElementsByClassName('history-view')[0].style.display = "flex";
    displayHistory();
});
// Event listener for calculator icon
document.getElementsByClassName('fa-calculator')[0].addEventListener('click', () => {
    document.getElementsByClassName("fa-clock")[0].style.display = "block";
    document.getElementsByClassName("fa-calculator")[0].style.display = "none";
    document.getElementsByClassName('buttons')[0].style.display = "grid";
    document.getElementsByClassName('history-view')[0].style.display = "none";
});
