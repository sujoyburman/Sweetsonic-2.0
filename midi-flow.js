/* SweetSonic MIDI Academy — public application flow
   Public-site version: displays a confirmation locally without storing student PII. */
(function(){
  const form=document.getElementById('midiApplicationForm');
  const success=document.getElementById('application-success');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const id='SS-MIDI-'+String(Math.floor(100000+Math.random()*900000));
      form.reset();
      const layout=form.closest('.application-layout');
      if(layout) layout.style.display='none';
      if(success){
        success.hidden=false;
        const el=document.getElementById('applicationId');
        if(el) el.textContent=id;
        success.scrollIntoView({behavior:'smooth'});
      }
    });
  }
})();
