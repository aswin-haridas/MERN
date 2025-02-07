const apiEndpoint = "http://localhost:3000/api/notes";

async function fetchNotes() {
  try {
    const response = await fetch(apiEndpoint);
    const notes = await response.json();
    const noteContainer = document.getElementById("all-notes");
    noteContainer.innerHTML = "";
    notes.forEach(note => {
      createNoteElement(note);
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
}

function createNoteElement(note) {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.innerHTML = `
    <div class="note-div" style="cursor:pointer;" onclick="openEditModal('${note._id}', '${note.title}', '${note.content}')">
      <h2 >${note.title}</h2>
      <p>${note.content.slice(0,100)}</p>
      <small class="date">${new Date(note.date).toLocaleString()}</small>
    </div>
  `;
  document.getElementById("all-notes").appendChild(noteDiv);
}

async function handleNoteRequest(method, noteData = {}, id = "") {
  const url = id ? `${apiEndpoint}/${id}` : apiEndpoint;
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      fetchNotes();
      return response.json();
    } else {
      console.error(`Failed to ${method.toLowerCase()} note`);
    }
  } catch (error) {
    console.error(`Error ${method.toLowerCase()}ing note:`, error);
  }
}

async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const newNote = await handleNoteRequest("POST", { title, content });
  if (newNote) {
    createNoteElement(newNote);
    resetForm();
    closeModal("new-note-modal");
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function openEditModal(id, title, content) {
  document.getElementById("editTitle").value = title;
  document.getElementById("editContent").value = content;
  openModal("edit-note-modal");

  document.getElementById("saveButton").onclick = () => {
    updateNote(id);
  };
  document.getElementById("delete-button").onclick = () => deleteNote(id);
}

async function updateNote(id) {
  const title = document.getElementById("editTitle").value;
  const content = document.getElementById("editContent").value;

  const updatedNote = await handleNoteRequest("PUT", { title, content }, id);
  if (updatedNote) closeModal("edit-note-modal");
}

async function deleteNote(id) {
  await handleNoteRequest("DELETE", {}, id);
  closeModal("edit-note-modal");
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function search() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach(note => {
    const title = note.querySelector("h2").textContent.toLowerCase();
    const content = note.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || content.includes(searchTerm)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("noteButton").addEventListener("click", debounce(addNote, 300));
  document.getElementById("new-note-button").addEventListener("click", debounce(() => openModal("new-note-modal"), 300));

  document.querySelectorAll(".closemodalbutton").forEach(button =>
    button.addEventListener("click", () => closeModal("new-note-modal"))
  );

  document.querySelectorAll(".closeeditmodalbutton").forEach(button =>
    button.addEventListener("click", () => closeModal("edit-note-modal"))
  );

  document.getElementById("search-input").addEventListener("input", debounce(search, 300));
  
  fetchNotes();
});