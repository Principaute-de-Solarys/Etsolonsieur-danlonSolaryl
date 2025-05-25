/*
   Copyright 2025 Timoh de Solarys

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

function updateTotalCount() {
    const inputs = document.querySelectorAll(".interactif input");
    document.getElementById("total").textContent = inputs.length;
}

function checkAnswers() {
    const inputs = document.querySelectorAll(".interactif input");
    let score = 0;

    inputs.forEach(input => {
        const correct = input.dataset.correct.toLowerCase().trim();
        const value = input.value.toLowerCase().trim();
		const showAnswer = input.dataset.showAnswer === "true";
        
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains("feedback")) {
            feedback = document.createElement("div");
            feedback.className = "feedback";
            input.parentNode.appendChild(feedback);
        }
      
        if (value === correct) {
            input.classList.add("correct");
            input.classList.remove("incorrect");
            feedback.textContent = "";
            score++;
        } else {
            input.classList.add("incorrect");
            input.classList.remove("correct");
            feedback.textContent = showAnswer ? `Réponse attendue : ${input.dataset.correct}` : "";
        }
    });

    document.getElementById("score").textContent = score;
}

function toggleReveal(button) {
    const content = button.nextElementSibling;
    const shown = content.style.display === "block";
    content.style.display = shown ? "none" : "block";
    button.textContent = shown ? "Voir la réponse" : "Masquer la réponse";
}

function goTo(link) {
    document.location.href = link
}

function playAudio(button) {
    if (button.disabled) return;

    const src = button.dataset.audio;
    const audio = new Audio(src);

    button.disabled = true;
    button.textContent = '🔊 Lecture...';

    audio.play().then(() => {
        audio.onended = () => {
            button.disabled = false;
            button.textContent = '▶️ Écouter';
        };
    }).catch(() => {
        button.disabled = false;
        button.textContent = '▶️ Écouter';
    });
}

document.querySelectorAll(".interactif input").forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("correct", "incorrect");
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains("feedback")) {
            feedback.textContent = "";
        }
        document.getElementById("score").textContent = 0;
    });
});

window.addEventListener("DOMContentLoaded", updateTotalCount);