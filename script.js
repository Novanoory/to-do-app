document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskinput');
    const Btn = document.getElementById('btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container');

    const toggleEmptyImage = () => {
        const isEmpty = taskList.children.length === 0;
        emptyImage.style.display = isEmpty ? 'block' : 'none';
        todosContainer.style.flexBasis = isEmpty ? '100%' : '50%';
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox"> 
            <span class="task-text">${taskText}</span>
            <div class="tasks-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        // Delete logic
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyImage();
        });

        // Edit logic
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const span = li.querySelector('.task-text');
            const currentText = span.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.className = 'edit-input';
            input.style.flex = '1';
            span.replaceWith(input);
            input.focus();

            const confirmEdit = () => {
                const newText = input.value.trim();
                const newSpan = document.createElement('span');
                newSpan.className = 'task-text';
                newSpan.textContent = newText || currentText; // fallback if empty
                input.replaceWith(newSpan);
            };

            input.addEventListener('blur', confirmEdit);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    confirmEdit();
                }
            });
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyImage();
    };

    Btn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });
});
