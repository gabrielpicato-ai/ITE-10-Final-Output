document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggle-btn');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('close');
    });
  }

  const dropdownButtons = document.querySelectorAll('.dropdown-btn');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {
      const submenu = button.nextElementSibling;
      if (!submenu) return;

      document.querySelectorAll('#sidebar .sub-menu').forEach(ul => {
        if (ul !== submenu) {
          ul.classList.remove('show');
          ul.previousElementSibling.classList.remove('rotate');
        }
      });

      submenu.classList.toggle('show');
      button.classList.toggle('rotate');
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const monthYearEl = document.getElementById('month-year');
  const daysEl = document.getElementById('days');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const todayBtn = document.getElementById('today-btn');
  const eventPanel = document.getElementById('event-panel');
  const eventDateEl = document.getElementById('event-date');
  const eventListEl = document.getElementById('event-list');
  
  let currentDate = new Date();
  let selectedDate = null;
  
  const events = {
    '2025-12-6': [
      { time: '7:00 AM', text: 'Holiday Clean-Up Drive' },
      { time: '10:30 M', text: 'Barangay Meeting' }
    ],
    '2025-9-20': [
      { time: '11:00 AM', text: 'Doctor appointment' }
    ],
    '2025-9-25': [
      { time: '07:00 PM', text: 'Birthday party' },
      { time: '09:00 PM', text: 'Dinner with friends' }
    ],
    '2025-10-2': [
      { time: '03:00 PM', text: 'Conference call' }
    ],
    '2025-10-10': [
      { time: 'All day', text: 'Project deadline' }
    ],
    '2025-10-18': [
      { time: '12:00 PM', text: 'Lunch with client' },
      { time: '04:00 PM', text: 'Product demo' }
    ]
  };
  
  function renderCalendar() {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    
    const prevLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    monthYearEl.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    let days = "";
    
    for (let x = firstDayIndex; x > 0; x--) {
      const prevDate = prevLastDay.getDate() - x + 1;
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${prevDate}`;
      const hasEvent = events[dateKey] !== undefined;
      
      days += `<div class="day other-month${hasEvent ? ' has-events' : ''}">${prevDate}</div>`;
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
      const hasEvent = events[dateKey] !== undefined;
      
      let dayClass = 'day';
      
      if (
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        dayClass += ' today';
      }
      
      if (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        dayClass += ' selected';
      }
      
      if (hasEvent) {
        dayClass += ' has-events';
      }
      
      days += `<div class="${dayClass}" data-date="${dateKey}">${i}</div>`;
    }
    
    for (let j = 1; j <= nextDays; j++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-${j}`;
      const hasEvent = events[dateKey] !== undefined;
      
      days += `<div class="day other-month${hasEvent ? ' has-events' : ''}">${j}</div>`;
    }
    
    daysEl.innerHTML = days;
    
    document.querySelectorAll('.day:not(.other-month)').forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.getAttribute('data-date');
        const [year, month, dayNum] = dateStr.split('-').map(Number);
        selectedDate = new Date(year, month - 1, dayNum);
        renderCalendar();
        showEvents(dateStr);
      });
    });
  }
  
  function showEvents(dateStr) {
    if(!dateStr) return;

    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[dateObj.getDay()];
    
    eventDateEl.textContent = `${dayName}, ${months[dateObj.getMonth()]} ${day}, ${year}`;
    
    eventListEl.innerHTML = '';
    
    if (events[dateStr] && events[dateStr].length > 0) {
      events[dateStr].forEach((event, index) => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        
        const contentWrapper = document.createElement('div');
        contentWrapper.style.display = 'flex';
        contentWrapper.style.alignItems = 'center';
        contentWrapper.style.gap = '12px';
        contentWrapper.style.flex = '1'; // Takes up remaining space
        
        contentWrapper.innerHTML = `
          <div class="event-color"></div>
          <div class="event-time">${event.time}</div>
          <div class="event-text">${event.text}</div>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-event-btn';
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
        
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation(); 
          deleteEvent(dateStr, index);
        });

        eventItem.appendChild(contentWrapper);
        eventItem.appendChild(deleteBtn);
        eventListEl.appendChild(eventItem);
      });
    } else {
      eventListEl.innerHTML = '<div class="no-events">No events scheduled for this day</div>';
    }
  }

  function deleteEvent(dateKey, index) {
    if (confirm('Are you sure you want to delete this event?')) {
      events[dateKey].splice(index, 1);

      if (events[dateKey].length === 0) {
        delete events[dateKey];
      }

      localStorage.setItem('events', JSON.stringify(events));

      renderCalendar();
      showEvents(dateKey);
    }
  }
  
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    eventDateEl.textContent = 'Select a date';
    eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here</div>';
  });
  
  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    eventDateEl.textContent = 'Select a date';
    eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here</div>';
  });
  
  todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    selectedDate = new Date();
    renderCalendar();
    
    const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    showEvents(dateStr);
  });
  
  renderCalendar();
});

document.addEventListener('DOMContentLoaded', function() {
  
const householdCSV = `Household ID,Household Number,Sitio,Owner Status,Interviewed By,Reviewed By,Date of Visit,Water Source,Toilet Type,Home Link,First Name,Last Name,Relationship
 H001,HM-2025-001,Maligaya,Owned,Maria Santos,Juan Dela Cruz,"june 8,2025", Level 3- Individual Household,A- Individual/ Pour-flush w/ septic tank,Google Link,Roberto,Gonzales,Head
  H002,HM-2025-002,Bagong Bukal,Owned,Maria Santos,Juan Dela Cruz,"june 9,2025", Level 2- Communal Faucet,A- Individual/ Pour-flush w/ septic tank,Google Link,Maria ,Santos,Wife
  H003,HM-2025-003,Makahiya, Rented,Maria Santos,Juan Dela Cruz,"june 7,2025",Level 1- Point Source,B- Shared/ Simple toilet,Google Link,Juan,Dela Cruz,Husband
  H004,HM-2025-004,Talipapa,Owned,Maria Santos,Juan Dela Cruz,"june 10,2025",Level 3- Individual Household,A- Individual/ Pour-flush w/ septic tank,Google Link,Ana,Villanueva,Head
  H005,HM-2025-005,San Roque Hieghts,Informal Settler,Maria Santos,Juan Dela Cruz,"june 10,2025", Level 2- Communal Faucet,A- Individual/ Pour-flush w/ septic tank,Google Link,Jose,Ramirez Jr.,Son
  H006,HM-2025-006,Kawayanon,Leased,Maria Santos,Juan Dela Cruz,"june 9,2025", Level 3- Individual Household,A- Individual/ Pour-flush w/ septic tank,Google Link,Micah,Fernandez,Daughter
  H007,HM-2025-007,Tinikaran,Owned,Maria Santos,Juan Dela Cruz,"june 5,2025",Level 1- Point Source,B- Shared/ Simple toilet,Google Link,Crisanto,Lopez,Head
  H008,HM-2025-008,Ilang-ilang,Owned,Maria Santos,Juan Dela Cruz,"june 6,2025", Level 3- Individual Household,A- Individual/ Pour-flush w/ septic tank,Google Link,Jenny,Loucor,Head
  H009,HM-2025-009,Sto.Niño,Rented,Maria Santos,Juan Dela Cruz,"june 11,2025", Level 2- Communal Faucet,B- Shared/ Simple toilet,Google Link,Bobby,Aguilar,Head
  H010,HM-2025-010,Pag-asa Creek,Owned,Maria Santos,Juan Dela Cruz,"june 12,2025",Level 3- Individual Household,A- Individual/ Pour-flush w/ septic tank,Google Link,Lucy,Mendoza,Wife`;

  let householdList = [];

  function initHouseholds() {
    const storedHH = localStorage.getItem('barangayHouseholds');
    
    if (storedHH) {
      householdList = JSON.parse(storedHH);
    } else {
      const rows = householdCSV.trim().split('\n');
      householdList = rows.slice(1).map(row => {
        const vals = parseCSVLine(row); 
        return {
          id: vals[0],
          number: vals[1],
          sitio: vals[2],
          status: vals[3],
          interviewer: vals[4],
          reviewer: vals[5],
          dateVisit: vals[6],
          water: vals[7],
          toilet: vals[8],
          link: vals[9],
          repName: `${vals[10]} ${vals[11]}`.trim(),
          relation: vals[12]
        };
      });
      localStorage.setItem('barangayHouseholds', JSON.stringify(householdList));
    }
    renderHouseholdTable();
  }

  function renderHouseholdTable() {
    const tbody = document.getElementById('household-table-body');
    const countSpan = document.getElementById('total-households');
    if (!tbody) return;

    if(countSpan) countSpan.innerText = householdList.length;

    tbody.innerHTML = householdList.map(h => {
      let statusClass = 'owned';
      const s = h.status.toLowerCase();
      if(s.includes('rent')) statusClass = 'rented';
      if(s.includes('lease')) statusClass = 'leased';
      if(s.includes('informal')) statusClass = 'informal';

      return `
        <tr>
          <td style="font-weight:600; color:var(--accent);">${h.number}</td>
          <td>
            <div style="font-weight:600;">${h.repName}</div>
            <div class="citizen-sub">${h.relation}</div>
          </td>
          <td>${h.sitio}</td>
          <td>${h.dateVisit}</td>
          <td><span class="status ${statusClass}">${h.status}</span></td>
          <td>
            <div class="action-group">
              <button class="btn-icon btn-view" onclick="viewHousehold('${h.id}')">
                 <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.viewHousehold = function(id) {
    const h = householdList.find(x => x.id === id);
    if (!h) return;

    const overlay = document.getElementById('household-modal-overlay');
    const content = document.getElementById('household-details-content');

    content.innerHTML = `
      <div class="view-grid">
        <h4 class="view-section">Household Info</h4>
        <div class="view-item"><label>Household No:</label> <span>${h.number}</span></div>
        <div class="view-item"><label>Sitio:</label> <span>${h.sitio}</span></div>
        <div class="view-item"><label>Owner Status:</label> <span>${h.status}</span></div>
        <div class="view-item"><label>Date Visit:</label> <span>${h.dateVisit}</span></div>

        <h4 class="view-section">Facilities</h4>
        <div class="view-item" style="grid-column: 1 / -1;">
            <label>Water Source:</label> <span>${h.water}</span>
        </div>
        <div class="view-item" style="grid-column: 1 / -1;">
            <label>Toilet Type:</label> <span>${h.toilet}</span>
        </div>
        <div class="view-item" style="grid-column: 1 / -1;">
            <label>Location Map:</label> 
            <a href="#" class="geo-link">
               <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 115-79.5 232.5T480-80Zm0-480Z"/></svg>
               ${h.link}
            </a>
        </div>

        <h4 class="view-section">Interview Data</h4>
        <div class="view-item"><label>Interviewed By:</label> <span>${h.interviewer}</span></div>
        <div class="view-item"><label>Reviewed By:</label> <span>${h.reviewer}</span></div>
        <div class="view-item"><label>Representative:</label> <span>${h.repName} (${h.relation})</span></div>
      </div>
    `;

    overlay.classList.add('active');
  }

  const hhOverlay = document.getElementById('household-modal-overlay');
  const hhCloseX = document.getElementById('close-household-modal');
  const hhCloseBtn = document.getElementById('close-household-btn');

  function closeHhModal() { hhOverlay.classList.remove('active'); }
  
  if(hhCloseX) hhCloseX.addEventListener('click', closeHhModal);
  if(hhCloseBtn) hhCloseBtn.addEventListener('click', closeHhModal);
  if(hhOverlay) hhOverlay.addEventListener('click', (e) => { if(e.target===hhOverlay) closeHhModal() });

  initHouseholds();

  const initialCSV = `Citizen ID,First Name,Middle Name,Last Name,Suffix,Date of Birth,Age,Sex,Civil Status,Email,Contact No,Place of Birth,Full Address,Sitio,Religion,Blood Type,Government Worker,Student,Registered Voter,Part of Indigenous Group,Deceased,Date of Death,Reason of Death,Educational Attainment,School Name,Socio Economic Status,NHTS Number,Employment Status,Occupation,Household ID,Relationship,Philhealth Category,Philhealth ID,Membership Type,Health Classification,Family Planning Method,FP Status,FP Date Started,FP Date Ended,Date Encoded,Encoded By,Date Updated,Updated By
  C001,Roberto,Noquil,Gonzales,,14/03/1987,38,Male,Married,roberto.g@gmail.com,9171234567,Cavite City,"Blk 3 Lot 12, Maligaya", Sitio Maligaya,Catholic,O+,No,No,Yes,No,No,N/A,N/A,College Graduate,Maligaya National High School,Middle Income,N/A,Employed,Carpenter,H001,Head,,N/A,N/A,Healthy,None,N/A,N/A,N/A,08/06/2025,Encoder 1,08/06/2025,Encoder 1
  C002,Maria,Lopez,Santos,,15/03/1987,32,Female,Married,maria.santos@gmail.com,9187654321,Taguig City,"Purok 2 Riverside, Bagong Bukal",Sitio Bagong Bukal,Catholic,A+,No,No,Yes,No,No,N/A,N/A,College Graduate,University of Cebu,Middle Income,N/A,Employed,Sales Associate,H002,Wife,,N/A,N/A,Healthy,Pills,Active,05/01/2024,N/A,12/04/2025,Encoder 2,12/04/2025,Encoder 2
  C003,Juan,Cruz,Dela Cruz,,16/03/1987,40,Male,Married,juan.dc@gmail.com,9181239876,Parañaque,"Purok 1 Zone 3, Makahiya",Sitio Makahiya,Catholic,O-,No,No,Yes,No,No,N/A,N/A,High School Graduate,Makahiya High School,Low Income,N/A,Employed,Driver,H003,Husband,,N/A,N/A,Healthy,None,N/A,N/A,N/A,05/06/2025,Encoder 1,05/06/2025,Encoder 1
  C004,Ana,Torres,Villanueva,,17/03/1987,51,Female,Widowed,ana.v@gmail.com,9182345712,Cebu City,"Sitio Proper, Talipapa",Sitio Talipapa,Christian,B+,No,No,Yes,No,No,N/A,N/A,High School Graduate,Talipapa High School,Middle Income,N/A,Unemployed,None,H004,Head,,N/A,N/A,Healthy,None,N/A,N/A,N/A,02/06/2025,Encoder 2,02/06/2025,Encoder 2
  C005,Jose,Josafat,Ramirez ,Jr.,18/03/1987,22,Male,Single,jose.rj@gmail.com,9184532167,Cavite,Zone 1 Purok 1,Sitio  San Roque Heights,Catholic,O+,No,Yes,Yes,No,No,N/A,N/A,College Level,CTU,Low Income,NHTS-5582193,Student,Student,H005,Son,,0112-9988-220,SSS,Healthy,None,N/A,N/A,N/A,10/03/2025,Encoder 1,10/03/2025,Encoder 1
  C006,Micah,Reyes,Fernandez,,19/03/1987,18,Female,Single,micah.f@gmail.com,9183451276,Toledo City,Purok 2 Hillside,Sitio Kawayanon,Catholic,A+,No,Yes,No,No,No,N/A,N/A,Senior High School,Kawayaon NHS,Low Income,N/A,Student,Student,H006,Daughter,,N/A,N/A,Healthy,None,N/A,N/A,N/A,07/06/2025,Encoder 2,07/06/2025,Encoder 2
  C007,Crisanto,Lorenzo,Lopez,,20/03/1987,40,Male,Married,cris.lopez@gmail.com,9174321678,Cebu,Blk 4 Lot 7,Sitio Tinikaran,Christian,O+,No,No,Yes,No,No,N/A,N/A,College Graduate,USC,Middle Income,N/A,Employed,Technician,H007,Head,,N/A,N/A,Healthy,None,N/A,N/A,N/A,01/02/2025,Encoder 1,01/02/2025,Encoder 1
  C008,Jenny,Ann,Loucor,,21/03/1987,33,Female,Single,jenny.l@gmail.com,9172314567,Carcar,Purok 4 Near Chapel,Sitio Ilang-ilang,Catholic,B-,No,No,Yes,No,No,N/A,N/A,College Graduate,UC-Main,Middle Income,N/A,Employed,Nurse,H008,Head,,N/A,N/A,Healthy,Pills,Active,11/02/2024,N/A,05/03/2025,Encoder 2,05/03/2025,Encoder 2
  C009,Bobby,Reyes,Aguilar,,22/03/1987,26,Male,Single,bobby.a@gmail.com,9178451239,Marigondon,Sitio Sto. Niño,Sitio Sto. Niño,Catholic,O+,No,No,Yes,No,No,N/A,N/A,High School Graduate,MNHS,Low Income,N/A,Employed,Vendor,H009,Head,,N/A,N/A,Healthy,None,N/A,N/A,N/A,22/01/2025,Encoder 1,22/01/2025,Encoder 1
  C010,Lucy,Valdez,Mendoza,,23/03/1987,30,Female,Married,lucy.m@gmail.com,9173234519,Lapu-Lapu,Purok 5 Riverside,Sitio Pag-asa Creek,Catholic,A-,No,No,Yes,No,No,N/A,N/A,College Graduate,USC-TC,Middle Income,N/A,Employed,Teacher,H010,Wife,,N/A,N/A,Healthy,Pills,Active,10/07/2024,N/A,10/06/2025,Encoder 2,10/06/2025,Encoder 2
  `;

  let residents = [];

  function initData() {
    const storedData = localStorage.getItem('barangayResidents_full');
    
    if (storedData) {
      residents = JSON.parse(storedData);
    } else {
      const rows = initialCSV.trim().split('\n');
      residents = rows.slice(1).map(row => {
        const vals = parseCSVLine(row);
        return {
          id: vals[0],
          fName: vals[1], mName: vals[2], lName: vals[3], suffix: vals[4],
          dob: vals[5], age: vals[6], sex: vals[7], civilStatus: vals[8],
          email: vals[9], contact: vals[10],
          birthPlace: vals[11], address: vals[12], sitio: vals[13], religion: vals[14],
          bloodType: vals[15],
          isGov: vals[16], isStudent: vals[17], isVoter: vals[18], isIP: vals[19],
          isDeceased: vals[20], deathDate: vals[21], deathReason: vals[22],
          education: vals[23], school: vals[24],
          socioEcon: vals[25], nhts: vals[26],
          employment: vals[27], occupation: vals[28],
          householdId: vals[29], relation: vals[30],
          philCategory: vals[31], philId: vals[32], philType: vals[33],
          healthClass: vals[34],
          fpMethod: vals[35], fpStatus: vals[36], fpStart: vals[37], fpEnd: vals[38],
          dateEncoded: vals[39], encodedBy: vals[40], dateUpdated: vals[41], updatedBy: vals[42]
        };
      });
      saveToLocal();
    }
    renderTable();
  }

  function saveToLocal() {
    localStorage.setItem('barangayResidents_full', JSON.stringify(residents));
    renderTable();
  }

  function parseCSVLine(line) {
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/; 
    return line.split(regex).map(val => val.trim().replace(/^"|"$/g, ''));
  }

  function renderTable() {
    const tableBody = document.getElementById('citizen-table-body');
    if(!tableBody) return;

    const displayList = [...residents].reverse(); 

    tableBody.innerHTML = displayList.map(r => {
      const fullName = `${r.fName} ${r.lName} ${r.suffix || ''}`;
      const initials = (r.fName[0] + r.lName[0]).toUpperCase();
      
      let statusClass = 'employed';
      if(r.employment === 'Student') statusClass = 'student';
      if(r.employment === 'Unemployed') statusClass = 'unemployed';

      return `
        <tr>
          <td>
            <div class="citizen-profile">
              <div class="avatar">${initials}</div>
              <div>
                <div class="citizen-name">${fullName}</div>
                <div class="citizen-sub">${r.sex}</div>
              </div>
            </div>
          </td>
          <td>${r.sitio}</td>
          <td>${r.age}</td>
          <td>${r.dateEncoded}</td>
          <td><span class="status ${statusClass}">${r.employment}</span></td>
          <td>
            <div class="action-group">
              <button class="btn-icon btn-view" title="View Details" onclick="viewResident('${r.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>
              </button>
              <button class="btn-icon btn-delete" title="Delete" onclick="deleteResident('${r.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.openAddModal = function() {
    const overlay = document.getElementById('resident-form-overlay');
    const title = document.getElementById('form-title');
    
    document.getElementById('edit-id').value = '';
    document.getElementById('input-fname').value = '';
    document.getElementById('input-lname').value = '';
    document.getElementById('input-sitio').value = '';
    document.getElementById('input-age').value = '';
    document.getElementById('input-sex').value = 'Male';
    document.getElementById('input-emp').value = 'Employed';

    title.innerText = "Add New Resident";
    overlay.classList.add('active');
  };

  window.saveResident = function() {
    const id = document.getElementById('edit-id').value;
    const fName = document.getElementById('input-fname').value;
    const lName = document.getElementById('input-lname').value;
    const sitio = document.getElementById('input-sitio').value;
    const age = document.getElementById('input-age').value;
    const sex = document.getElementById('input-sex').value;
    const emp = document.getElementById('input-emp').value;

    if (!fName || !lName) {
      alert("Please enter at least a First and Last Name.");
      return;
    }

    if (id) {
      
      alert("Edit feature coming soon!"); 
    } else {
      const newId = "C" + Date.now(); 
      const today = new Date().toLocaleDateString('en-GB'); 

      const newPerson = {
        id: newId,
        fName: fName,
        lName: lName,
        mName: '', suffix: '', 
        sitio: sitio,
        age: age,
        sex: sex,
        employment: emp,
        dateEncoded: today,
        civilStatus: 'Single', email: 'N/A', contact: 'N/A', 
        address: sitio, birthPlace: 'N/A', religion: 'N/A', bloodType: 'N/A',
        isGov: 'No', isStudent: 'No', isVoter: 'No', isIP: 'No',
        education: 'N/A', school: 'N/A', occupation: 'N/A',
        philId: 'N/A', healthClass: 'N/A', householdId: 'N/A'
      };

      residents.push(newPerson);
      
      saveToLocal();
      
      closeFormModal();
    }
  };

  function closeFormModal() {
    document.getElementById('resident-form-overlay').classList.remove('active');
  }

  const formOverlay = document.getElementById('resident-form-overlay');
  const closeFormX = document.getElementById('close-form-x');
  const closeFormBtn = document.getElementById('close-form-btn');

  if(closeFormX) closeFormX.addEventListener('click', closeFormModal);
  if(closeFormBtn) closeFormBtn.addEventListener('click', closeFormModal);
  if(formOverlay) {
    formOverlay.addEventListener('click', (e) => {
       if(e.target === formOverlay) closeFormModal();
    });
  }

  window.viewResident = function(id) {
    const r = residents.find(x => x.id === id);
    if (!r) return;

    const overlay = document.getElementById('citizen-modal-overlay');
    const content = document.getElementById('citizen-details-content');

    content.innerHTML = `
      <div class="view-grid">
        <h4 class="view-section">Personal Information</h4>
        <div class="view-item"><label>Full Name:</label> <span>${r.fName} ${r.mName} ${r.lName} ${r.suffix}</span></div>
        <div class="view-item"><label>Citizen ID:</label> <span>${r.id}</span></div>
        <div class="view-item"><label>Date of Birth:</label> <span>${r.dob} (${r.age} yrs)</span></div>
        <div class="view-item"><label>Sex:</label> <span>${r.sex}</span></div>
        <div class="view-item"><label>Civil Status:</label> <span>${r.civilStatus}</span></div>
        <div class="view-item"><label>Blood Type:</label> <span>${r.bloodType}</span></div>
        <div class="view-item"><label>Religion:</label> <span>${r.religion}</span></div>
        
        <h4 class="view-section">Contact & Address</h4>
        <div class="view-item"><label>Email:</label> <span>${r.email}</span></div>
        <div class="view-item"><label>Phone:</label> <span>${r.contact}</span></div>
        <div class="view-item"><label>Address:</label> <span>${r.address}</span></div>
        <div class="view-item"><label>Sitio:</label> <span>${r.sitio}</span></div>
        <div class="view-item"><label>Place of Birth:</label> <span>${r.birthPlace}</span></div>

        <h4 class="view-section">Household & Social</h4>
        <div class="view-item"><label>Household ID:</label> <span>${r.householdId}</span></div>
        <div class="view-item"><label>Relationship:</label> <span>${r.relation}</span></div>
        <div class="view-item"><label>Voter Status:</label> <span>${r.isVoter}</span></div>
        <div class="view-item"><label>IP Group:</label> <span>${r.isIP}</span></div>
        <div class="view-item"><label>NHTS ID:</label> <span>${r.nhts}</span></div>
        <div class="view-item"><label>Socio-Econ:</label> <span>${r.socioEcon}</span></div>

        <h4 class="view-section">Employment & Education</h4>
        <div class="view-item"><label>Education:</label> <span>${r.education}</span></div>
        <div class="view-item"><label>School:</label> <span>${r.school}</span></div>
        <div class="view-item"><label>Employment:</label> <span>${r.employment}</span></div>
        <div class="view-item"><label>Occupation:</label> <span>${r.occupation}</span></div>
        <div class="view-item"><label>Gov Worker:</label> <span>${r.isGov}</span></div>

        <h4 class="view-section">Health & PhilHealth</h4>
        <div class="view-item"><label>Health Class:</label> <span>${r.healthClass}</span></div>
        <div class="view-item"><label>PhilHealth ID:</label> <span>${r.philId}</span></div>
        <div class="view-item"><label>Category:</label> <span>${r.philCategory}</span></div>
        <div class="view-item"><label>FP Method:</label> <span>${r.fpMethod} (${r.fpStatus})</span></div>
      </div>
    `;

    overlay.classList.add('active');
  };

  window.deleteResident = function(id) {
    if (confirm("Are you sure you want to delete this record?")) {
      residents = residents.filter(r => r.id !== id);
      saveToLocal();
    }
  };

  const overlay = document.getElementById('citizen-modal-overlay');
  const closeBtn = document.getElementById('close-citizen-modal');
  const cancelBtn = document.getElementById('close-citizen-btn');
  
  function closeModal() { overlay.classList.remove('active'); }
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if(overlay) overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });

  initData();
});