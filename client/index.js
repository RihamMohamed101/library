 const table = document.getElementById("bookTable");

  function showSection(id) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function loadBooks() {
    fetch('http://localhost:3000/book')
      .then(res => res.json())
      .then(data => {
        table.innerHTML = '';
        data.books.forEach(book => addRow(book));
      })
      .catch(err => console.error('حدث خطأ في التحميل:', err));
  }

  function addRow(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author || ''}</td>
      <td>${book.yearPublished || ''}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick='editBook("${book._id}", "${book.title}", "${book.author}", "${book.yearPublished}")'>📝 تعديل</button>
        <button class="btn btn-sm btn-danger" onclick='deleteBook("${book._id}")'>🗑 حذف</button>
      </td>
    `;
    table.appendChild(row);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('bookId').value;
    const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      yearPublished: document.getElementById('year').value,
    };

    if (id) {
      fetch(`http://localhost:3000/book/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      }).then(loadBooks);
    } else {
      fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      }).then(loadBooks);
    }

    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
  }

  function editBook(id, title, author, year) {
    document.getElementById('bookId').value = id;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('year').value = year;
  }

  function deleteBook(id) {
    fetch(`http://localhost:3000/book/${id}`, {
      method: 'DELETE'
    }).then(loadBooks);
  }

  loadBooks();



const memberTable = document.getElementById("memberTable");

function loadMembers() {
  fetch('http://localhost:3000/member')
    .then(res => res.json())
    .then(data => {
      memberTable.innerHTML = '';
      data.members.forEach(m => addMemberRow(m));
    })
    .catch(err => console.error('فشل تحميل الأعضاء:', err));
}

function addMemberRow(member) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${member.fullName}</td>
    <td>${translateMembership(member.membershipType)}</td>
    <td>${member.joinYear}</td>
    <td>
      <button class="btn btn-sm btn-warning me-2" onclick='editMember("${member._id}", "${member.fullName}", "${member.membershipType}", "${member.joinYear}")'>📝 تعديل</button>
      <button class="btn btn-sm btn-danger" onclick='deleteMember("${member._id}")'>🗑 حذف</button>
    </td>
  `;
  memberTable.appendChild(row);
}

function submitMember(e) {
  e.preventDefault();
  const id = document.getElementById('memberId').value;
  const member = {
    fullName: document.getElementById('fullName').value,
    membershipType: document.getElementById('membershipType').value,
    joinYear: document.getElementById('joinYear').value,
  };

  const url = id ? `http://localhost:3000/member/${id}` : 'http://localhost:3000/member';
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member),
  }).then(() => {
    loadMembers();
    document.getElementById('memberForm').reset();
    document.getElementById('memberId').value = '';
  });
}

function editMember(id, fullName, membershipType, joinYear) {
  document.getElementById('memberId').value = id;
  document.getElementById('fullName').value = fullName;
  document.getElementById('membershipType').value = membershipType;
  document.getElementById('joinYear').value = joinYear;
}

function deleteMember(id) {
  fetch(`http://localhost:3000/member/${id}`, { method: 'DELETE' })
    .then(loadMembers);
}

function translateMembership(type) {
  switch (type) {
    case 'student': return 'طالب';
    case 'teacher': return 'معلم';
    case 'staff': return 'موظف';
    default: return type;
  }
}

loadMembers();






const borrowTable = document.getElementById('borrowTable');
const borrowMember = document.getElementById('borrowMember');
const borrowBook = document.getElementById('borrowBook');

// 🟦 تحميل الأعضاء والكتب لقائمة الاختيار
function loadBorrowFormData() {
  fetch('http://localhost:3000/member')
    .then(res => res.json())
    .then(data => {
      borrowMember.innerHTML = '<option value="">اختر عضو</option>';
      data.members.forEach(m => {
        borrowMember.innerHTML += `<option value="${m._id}">${m.fullName}</option>`;
      });
    });

  fetch('http://localhost:3000/book')
    .then(res => res.json())
    .then(data => {
      borrowBook.innerHTML = '<option value="">اختر كتاب</option>';
      data.books.forEach(b => {
        borrowBook.innerHTML += `<option value="${b._id}">${b.title}</option>`;
      });
    });
}

// 🟩 إضافة استعارة جديدة
function submitBorrowing(e) {
  e.preventDefault();
  const body = {
    member: borrowMember.value,
    book: borrowBook.value
  };

  fetch('http://localhost:3000/borrow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(() => {
      loadBorrowings();
      document.getElementById('borrowForm').reset();
    });
}

// 🟨 تحميل جدول الاستعارات
function loadBorrowings() {
  fetch('http://localhost:3000/borrow')
    .then(res => res.json())
    .then(data => {
      borrowTable.innerHTML = '';
      data.borrowings.forEach(b => addBorrowRow(b));
    });
}

// 🟥 حذف استعارة
function deleteBorrow(id) {
  fetch(`http://localhost:3000/borrow/${id}`, {
    method: 'DELETE'
  }).then(loadBorrowings);
}

// ✏️ تعديل تاريخ الإرجاع
function updateReturnDate(id) {
  const newDate = prompt('ادخل تاريخ الإرجاع (مثال: 2025-05-10):');
  if (!newDate) return;
  fetch(`http://localhost:3000/borrow/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ returnDate: newDate })
  }).then(loadBorrowings);
}

// ➕ عرض صف استعارة
function addBorrowRow(b) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${b.member?.fullName || '---'}</td>
    <td>${b.book?.title || '---'}</td>
    <td>${new Date(b.borrowDate).toLocaleDateString()}</td>
    <td>${b.returnDate ? new Date(b.returnDate).toLocaleDateString() : '—'}</td>
    <td>
      <button class="btn btn-sm btn-info me-2" onclick='updateReturnDate("${b._id}")'>✏️ تعديل الإرجاع</button>
      <button class="btn btn-sm btn-danger" onclick='deleteBorrow("${b._id}")'>🗑 حذف</button>
    </td>
  `;
  borrowTable.appendChild(row);
}

// عند التحميل
loadBorrowFormData();
loadBorrowings();
