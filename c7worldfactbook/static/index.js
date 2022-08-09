fetch('static/worldl.json')
    .then(r=>r.json())
    .then(r=>{
        for(let con of r){
        let d=document.createElement('div');
        d.innerText=con.name;
        d.classList.add('countryIndex');
        d.onclick=()=>{
            document.getElementById('content').innerHTML=`
            <h1>Content</h1>
            <h3>Country: ${con.name}</h3>
            <table>
            <tr><th>Id: </th><td>${con.id}</td></tr>
            <tr><th>Capital: </th><td>${con.capital}</td></tr>
            <tr><th>Continent: </th><td>${con.continent}</td></tr>
            <tr><th>Area: </th><td>${con.area.toLocaleString("en-uk")}</td></tr>
            <tr><th>GDP: </th><td>${con.gdp.toLocaleString("en-uk")}</td></tr>
            <tr><th>Population: </th><td>${con.population.toLocaleString("en-uk")}</td></tr>
            <tr><td colspan=2><img src=${con.flag}></td></tr>
            </table>
            `;
            
        }
        document.getElementById('countrieslist').append(d);
        }
        //Implement Alphabet buttons
       for(let button of document.querySelectorAll("#alphabet button")){
        button.onclick = ()=>{
            for(let n of document.querySelectorAll("#countrieslist div")){
                if (n.innerText.startsWith(button.innerText)){
                    n.classList.remove('hide');
                }else{
                    n.classList.add('hide');
                }
            }
        }
    }
    //for drop down
    for(let letter of document.querySelectorAll('#inselect')){
     letter.onchange = ()=>{
        
         for(let n of document.querySelectorAll('#countrieslist div')){
           
             if (n.innerText.startsWith(letter.value)){
                 n.classList.remove('hide');
                 
             }else{
                 n.classList.add('hide');
             }
         }
     }
 }
 //for drop down
 for(let letter of document.querySelectorAll('#conselect')){
    letter.onchange = ()=>{
       
        for(let n of document.querySelectorAll('#countrieslist div')){
          
            if (n.innerText(letter==c.continent)){
                n.classList.remove('hide');
                
            }else{
                n.classList.add('hide');
            }
        }
    }
}
 //for quiz
    document.getElementById("question").onclick=()=>{
        document.getElementById('question1').innerHTML="";
        let q = document.createElement('div');
      q.innerText = '#Which country has the biggest population?';
      document.getElementById('question1').append(q);
      let alist = r.filter(c=>c.population >= 100000000);
      for(let c of alist){
        c.rand = Math.random();
      }
      alist.sort((a,b)=>a.rand-b.rand);
      let distractors = [];
      for(let i=0;i<4;i++){
          distractors.push(alist[i]);
      }
      //Find biggest population
      let biggest = 0;
      for (let c of distractors){
          if (c.population>biggest){
              biggest = c.population;
          }
      }
      
      console.log(biggest);
      for(let c of distractors){
          let d = document.createElement('div');
          d.innerText = c.name;
          d.onclick = ()=>{
              if (c.population === biggest){
                  alert("You are right!");
              }else{
                  alert("That is not right");
              }
          };
          document.getElementById('question1').append(d);
      }}
      //for question 2
      document.getElementById("question3").onclick=()=>{
        document.getElementById('question1').innerHTML="";
      let rnd = Math.floor(r.length*Math.random());
      document.getElementById('question1').innerHTML = `
      <h6>Choose the flag of<h6>: ${r[rnd].name}<br><br>
      `;
      let distractors = [];
      distractors.push(r[rnd].flag);
      distractors.push(r[23].flag);
      distractors.push(r[44].flag);
      distractors.push(r[90].flag);
      for(let flg of distractors){
          let img = document.createElement('img');
          img.src = flg;
          img.style.width = '60px';
          img.onclick = ()=>{
            if (flg ===r[rnd].flag){
                alert("You are right!");
            }else{
                alert("That is not right");
            }  
          }
          document.getElementById('question1').append(img);
      }
      }

    })
    document.getElementById('getbutton').onclick = ()=>{
        //Make a GET call
        let id = document.getElementById('getid').value;
        fetch(`/api/country/${id}`)
          .then(r=>r.json())
          .then(r=>{
              document.getElementById('getoutput').value=JSON.stringify(r);
          })
    }
    
    document.getElementById('deletebutton').onclick = ()=>{
        //Make a DELETE call
        let id = document.getElementById('deleteid').value;
        fetch(`/api/country/${id}`, {method:'DELETE'})
    }
    
    
    document.getElementById('postbutton').onclick = ()=>{
        //Assemble the payload
        let payload = {
            id: document.getElementById('postid').value,
            name: document.getElementById('postname').value,
            continent: document.getElementById('postcontinent').value,
            capital: document.getElementById('postcapital').value,
        }
        fetch(`/api/country/${payload.id}`, {
            method:'post',
            body: JSON.stringify(payload),
            headers:{'content-type':'application/json'}
        })
    }
    