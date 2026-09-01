/* SweetSonic MIDI Academy — enrolment flow
   Front-end application capture only. For production, send submissions to your
   backend/CRM and issue a gateway payment link after approval. */
(function(){
  const form=document.getElementById('midiApplicationForm');
  const success=document.getElementById('application-success');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());
      const id='SS-MIDI-'+String(Math.floor(100000+Math.random()*900000));
      const record={...data,id,submittedAt:new Date().toISOString(),status:'Applied'};
      try{localStorage.setItem('sweetsonic_midi_application',JSON.stringify(record)); const key='sweetsonic_midi_applications'; const list=JSON.parse(localStorage.getItem(key)||'[]'); list.unshift(record); localStorage.setItem(key,JSON.stringify(list));}catch(_){}
      form.reset();
      form.closest('.application-layout').style.display='none';
      if(success){success.hidden=false;document.getElementById('applicationId').textContent=id;success.scrollIntoView({behavior:'smooth'});}
    });
  }
  const idInput=document.getElementById('paymentApplicationId');
  const amountInput=document.getElementById('paymentAmount');
  const btn=document.getElementById('payButton');
  const status=document.getElementById('paymentStatus');
  if(idInput){
    let approved=false, paymentUrl='';
    try{
      const saved=JSON.parse(localStorage.getItem('sweetsonic_midi_payment')||'null');
      if(saved){approved=saved.status==='Approved' && !!saved.paymentUrl; paymentUrl=saved.paymentUrl||''; if(saved.applicationId) idInput.value=saved.applicationId; if(saved.amount) amountInput.value=saved.amount;}
    }catch(_){}
    function refresh(){
      const ok=approved && idInput.value.trim() && paymentUrl;
      btn.disabled=!ok;
      status.innerHTML=ok?'<b>Payment ready</b><span>Your application has been approved. Continue to the secure gateway.</span>':'<b>Payment link required</b><span>SweetSonic will issue your secure payment link after approval.</span>';
    }
    refresh();
    btn.addEventListener('click',()=>{if(paymentUrl) window.location.href=paymentUrl;});
  }
})();