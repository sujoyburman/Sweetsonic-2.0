(function(){
  const KEY='sweetsonic_midi_applications';
  const legacy='sweetsonic_midi_application';
  const body=document.getElementById('studentBody'), empty=document.getElementById('emptyState'), detail=document.getElementById('detailPanel');
  let records=[];
  function load(){
    try{records=JSON.parse(localStorage.getItem(KEY)||'[]');}catch(_){records=[]}
    if(!Array.isArray(records)) records=[];
    if(!records.length){try{const old=JSON.parse(localStorage.getItem(legacy)||'null');if(old) records=[old];}catch(_){} }
    render();
  }
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function save(){localStorage.setItem(KEY,JSON.stringify(records));}
  function render(){
    const q=(document.getElementById('search').value||'').toLowerCase(), f=document.getElementById('statusFilter').value;
    const filtered=records.filter(r=>{const hay=[r.name,r.email,r.phone,r.id].join(' ').toLowerCase();return (!q||hay.includes(q))&&(f==='all'||(r.status||'Applied')===f)});
    body.innerHTML=filtered.map(r=>`<tr class="student-row" data-id="${esc(r.id)}"><td><strong>${esc(r.name)}</strong><br><small>${esc(r.id)}</small></td><td>${esc(r.email)}<br>${esc(r.phone)}</td><td>${esc(r.experience)}</td><td>${esc(r.schedule)}</td><td><span class="status">${esc(r.status||'Applied')}</span></td><td>${r.submittedAt?new Date(r.submittedAt).toLocaleDateString():''}</td></tr>`).join('');
    empty.style.display=filtered.length?'none':'block';
    document.getElementById('totalCount').textContent=records.length;
    document.getElementById('appliedCount').textContent=records.filter(r=>(r.status||'Applied')==='Applied').length;
    document.getElementById('approvedCount').textContent=records.filter(r=>r.status==='Approved').length;
    document.getElementById('pendingCount').textContent=records.filter(r=>r.status==='Payment Pending').length;
    body.querySelectorAll('.student-row').forEach(row=>row.onclick=()=>show(row.dataset.id));
  }
  function show(id){const r=records.find(x=>x.id===id);if(!r)return;detail.hidden=false;detail.innerHTML=`<div class="admin-head" style="margin-bottom:18px"><div><p class="eyebrow">STUDENT PROFILE</p><h2>${esc(r.name)}</h2></div><button class="btn btn-ghost" id="closeDetail">Close</button></div><div class="detail-grid"><div class="detail-item"><span>Application ID</span><strong>${esc(r.id)}</strong></div><div class="detail-item"><span>Status</span><strong>${esc(r.status||'Applied')}</strong></div><div class="detail-item"><span>Email</span><strong>${esc(r.email)}</strong></div><div class="detail-item"><span>Phone / WhatsApp</span><strong>${esc(r.phone)}</strong></div><div class="detail-item"><span>Experience</span><strong>${esc(r.experience)}</strong></div><div class="detail-item"><span>Preferred schedule</span><strong>${esc(r.schedule)}</strong></div><div class="detail-item" style="grid-column:1/-1"><span>Learning goal</span><strong>${esc(r.goal||'Not provided')}</strong></div></div><div class="admin-actions" style="margin-top:22px"><select id="detailStatus" style="padding:12px;border-radius:10px;background:#0b0d0c;color:inherit;border:1px solid rgba(255,255,255,.16)"><option>Applied</option><option>Approved</option><option>Payment Pending</option><option>Paid</option><option>Enrolled</option></select><button class="btn btn-primary" id="saveStatus">Save status</button></div>`;document.getElementById('detailStatus').value=r.status||'Applied';document.getElementById('closeDetail').onclick=()=>detail.hidden=true;document.getElementById('saveStatus').onclick=()=>{r.status=document.getElementById('detailStatus').value;save();render();show(r.id)};detail.scrollIntoView({behavior:'smooth',block:'start'});}
  document.getElementById('search').oninput=render;document.getElementById('statusFilter').onchange=render;
  document.getElementById('exportBtn').onclick=()=>{const rows=[['Application ID','Name','Email','Phone','Experience','Schedule','Goal','Status','Submitted At'],...records.map(r=>[r.id,r.name,r.email,r.phone,r.experience,r.schedule,r.goal,r.status||'Applied',r.submittedAt])];const csv=rows.map(row=>row.map(x=>'"'+String(x??'').replace(/"/g,'""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='sweetsonic-midi-students.csv';a.click();URL.revokeObjectURL(a.href);};
  document.getElementById('demoBtn').onclick=()=>{records.unshift({id:'SS-MIDI-'+Math.floor(100000+Math.random()*900000),name:'Demo Student',email:'demo@example.com',phone:'+91 90000 00000',experience:'Intermediate',schedule:'Weekend',goal:'Learn MIDI production and build a complete track.',status:'Applied',submittedAt:new Date().toISOString()});save();render();};
  load();
})();
