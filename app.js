(function(){
const D=window.TB_RH, COR=['#ffdd5e','#4da3ff','#ff7a59','#7be0a5','#c79bff','#ffb3d1'];
const $=id=>document.getElementById(id);
const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const campos={nome:['NOME','f-nome'],filial:['FILIAL','f-filial'],depto:['DEPARTAMENTO','f-depto'],contr:['CONTRATACOES','f-contr'],faltas:['FALTAS','f-faltas']};
const estado={};
function opcoes(){for(const k in campos){const [c,id]=campos[k];const s=$(id);const v=[...new Set(D.map(r=>r[c]))].sort((a,b)=>a>b?1:-1);
  s.innerHTML='<option value="">Todos</option>'+v.map(x=>`<option>${x}</option>`).join('');s.onchange=()=>{estado[k]=s.value;draw()}}}
$('limpar').onclick=()=>{for(const k in campos){$(campos[k][1]).value='';estado[k]=''}draw()};
function filtrado(){return D.filter(r=>Object.keys(campos).every(k=>!estado[k]||String(r[campos[k][0]])===estado[k]))}
function soma(rows,chave,val){const m={};rows.forEach(r=>m[r[chave]]=(m[r[chave]]||0)+val(r));return Object.entries(m)}
function pizza(el,dados,fmt,rosca){
  const tot=dados.reduce((a,d)=>a+d[1],0);if(!tot){el.innerHTML='<p class="vazio">Sem dados para o filtro.</p>';return}
  let a0=-Math.PI/2,p='';const R=70,r=rosca?40:0;
  dados.forEach((d,i)=>{const a1=a0+d[1]/tot*2*Math.PI,g=a1-a0>Math.PI?1:0,pt=(R_,a)=>[100+R_*Math.cos(a),90+R_*Math.sin(a)];
    if(dados.length===1){p+=`<circle cx="100" cy="90" r="${R}" fill="${COR[0]}"/>`+(rosca?`<circle cx="100" cy="90" r="${r}" fill="#00306d"/>`:'')}
    else{const[x0,y0]=pt(R,a0),[x1,y1]=pt(R,a1),[x2,y2]=pt(r,a1),[x3,y3]=pt(r,a0);
      p+=`<path d="M${x0} ${y0}A${R} ${R} 0 ${g} 1 ${x1} ${y1}L${x2} ${y2}A${r} ${r} 0 ${g} 0 ${x3} ${y3}Z" fill="${COR[i%COR.length]}"><title>${d[0]}: ${fmt(d[1])}</title></path>`}
    a0=a1});
  el.innerHTML=`<svg viewBox="0 0 200 180" role="img" aria-label="Gráfico">${p}</svg><div class="legenda">${dados.map((d,i)=>`<span><b style="background:${COR[i%COR.length]}"></b>${d[0]} · ${fmt(d[1])} (${Math.round(d[1]/tot*100)}%)</span>`).join('')}</div>`}
function area(el,dados){
  if(!dados.length){el.innerHTML='<p class="vazio">Sem dados para o filtro.</p>';return}
  const W=560,H=240,L=60,B=30,max=Math.max(...dados.map(d=>d[1]))*1.1,n=dados.length;
  const X=i=>n===1?W/2:L+i*(W-L-20)/(n-1),Y=v=>H-B-v/max*(H-B-14);
  const pts=dados.map((d,i)=>`${X(i)},${Y(d[1])}`).join(' ');
  const grade=[0,.5,1].map(f=>`<line x1="${L}" x2="${W-10}" y1="${Y(max*f/1.1)}" y2="${Y(max*f/1.1)}" stroke="rgba(255,255,255,.15)"/><text x="${L-6}" y="${Y(max*f/1.1)+4}" text-anchor="end" font-size="11" fill="#cfe0ff">${brl(max*f/1.1)}</text>`).join('');
  el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Salário por departamento">${grade}<polygon points="${X(0)},${H-B} ${pts} ${X(n-1)},${H-B}" fill="rgba(255,221,94,.35)"/><polyline points="${pts}" fill="none" stroke="#ffdd5e" stroke-width="2.5"/>${dados.map((d,i)=>`<circle cx="${X(i)}" cy="${Y(d[1])}" r="4" fill="#ffdd5e"><title>${d[0]}: ${brl(d[1])}</title></circle><text x="${X(i)}" y="${H-10}" text-anchor="middle" font-size="12" fill="#fff">${d[0]}</text>`).join('')}</svg>`}
function barras(el,dados){
  if(!dados.length){el.innerHTML='<p class="vazio">Sem dados para o filtro.</p>';return}
  const max=Math.max(...dados.map(d=>d[1]));
  el.innerHTML=dados.sort((a,b)=>b[1]-a[1]).map(d=>`<div class="row"><span class="n" title="${d[0]}">${d[0]}</span><span class="b"><i style="width:${d[1]/max*100}%"></i></span><span class="v">${brl(d[1])}</span></div>`).join('')}
function draw(){
  const R=filtrado();$('kpi').textContent=R.length;
  pizza($('c-genero'),soma(R,'SEXO',()=>1),n=>n+' pessoas',true);
  pizza($('c-sal-filial'),soma(R,'FILIAL',r=>r.SALARIO),brl,false);
  pizza($('c-falt-filial'),soma(R,'FILIAL',r=>r.FALTAS),n=>n+' faltas',false);
  area($('c-sal-depto'),soma(R,'DEPARTAMENTO',r=>r.SALARIO));
  barras($('c-sal-nome'),soma(R,'NOME',r=>r.SALARIO));
}
opcoes();draw();
})();
