const search = document.querySelector("#search-table");
const tablesList = document.querySelector("#tables");
let tables = document.querySelectorAll(".material");

const tablesLocal = localStorage.getItem("materias");
if (tablesLocal) {
    tablesList.innerHTML = tablesLocal;
}

const searchFunction = (text) => {
    const tablesArray = Array.from(tables).filter((table) =>
        table.firstElementChild.firstElementChild.textContent
            .toLowerCase()
            .includes(text)
    );
    tablesArray.forEach((table) => {
        tablesList.appendChild(table);
    });
};

const editTableNote = (table) => {
    table.querySelectorAll(".edit").forEach((note) => {
        note.contentEditable = true;
        note.addEventListener("input", (e) => {
            e.target.textContent = e.target.textContent.replace(/[^0-9.]/g, "");
            calculationNote(e.target.parentNode);
        });
    });
};

const editTable = ({ target }) => {
    if (target.classList.contains("edit-btn")) {
        if (target.textContent === "Editar ") {
            target.innerHTML = 'Salvar <i class="fas fa-floppy-disk"></i>';
            editTableNote(target.parentNode.parentNode);
        } else {
            saveNotes();
        }
    }
};

const calculationNote = (table) => {
    const notes = table.querySelectorAll(".edit");
    const noteEnd = table.querySelector(".note");
    let number = 0;

    notes.forEach((note) => (number += +note.textContent));

    noteEnd.textContent = (number / 3).toFixed(2);

    let numberEnd = 0;

    table.parentNode
        .querySelectorAll(".note")
        .forEach(
            (notes) => (numberEnd += +notes.textContent.replace(",", "."))
        );

    table.parentNode.querySelector(".end-note").textContent = (
        numberEnd / 4
    ).toFixed(2);
};

const saveNotes = () => {
    document
        .querySelectorAll(".edit-btn")
        .forEach(
            (btn) => (btn.innerHTML = 'Editar <i class="fas fa-pen"></i>')
        );
    document
        .querySelectorAll(".edit")
        .forEach((note) => (note.contentEditable = false));
    let tablesListHTML = document.querySelector("#tables");
    localStorage.setItem("materias", tablesListHTML.innerHTML);
};

tablesList.addEventListener("click", editTable);

search.addEventListener("input", (e) => {
    tablesList.innerHTML = "";
    searchFunction(search.value.toLowerCase());
});
