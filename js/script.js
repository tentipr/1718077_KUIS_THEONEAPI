const ApiKey = "zgxxks65bD7V-86Ub-M8";
const baseUrl = "https://the-one-api.dev/v2/";
const Bearers = "Bearer zgxxks65bD7V-86Ub-M8";

const viewbook = `${baseUrl}book`;
const viewcharacter = `${baseUrl}character`;
const viewmovie = `${baseUrl}movie`;

const contents = document.querySelector("#content-list");
const isi = document.querySelector("#isi-list");
const title = document.querySelector(".card-title");
const ShowModal= document.querySelector(".modal");

const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey,
        'Authorization': Bearers
    }
};

function getListBook()
{
     title.innerHTML = "List Book"
    fetch(viewbook, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
        console.log(resJson.docs);
        let docs = "";
        resJson.docs.forEach(buku => {
            docs += `
           

                <div class="col s12 m4">
                <div class="card-panel teal">
                    <span class="white-text">
                    ${buku.name} 
                                                            
                    </span>
                    <a href="#modal1" data-id="${buku._id}"  class="secondary-content modal-trigger"><i class="material-icons" data-id="${buku._id}">info</i></a>                    
                </div>
                </div>
            `
        });
        contents.innerHTML = '<ul class="card">' + docs + '</ul>';
        const detil = document.querySelectorAll('.secondary-content');
        detil.forEach(btn => {
            btn.onclick = (event) => {
                showChapters(baseUrl + "book/"+ event.target.dataset.id +"/chapter" );
              //  showChapters( event.target.dataset.id  );
            }
        }) 
    }).catch(err => {
       console.error(err);
     })
}

function showChapters(id)
{
    // let url = baseUrl + "book/" + id + "/chapter";
    // contents.innerHTML = "ini" + url;

    fetch(id, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            ShowModal.innerHTML = `
            <center>
            <h3>Detail Buku per Chapter</h3>
            </center>
                <div class="modal-content">
                    <div class="modal-body" id="">
                    <center>
                    <h4>${resJson.bookName}</h4>
                        <p>
                            ID          : ${resJson._id}<br>
                            Chapter     : ${resJson.chapterName} <br>
                        </p>
                    </div>
                </div></center>
                <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Tutup</a>
              </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListCharacter()
{
     title.innerHTML = "List Character"
    fetch(viewcharacter, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
        console.log(resJson.docs);
        let docs = "";
        resJson.docs.forEach(karakter => {
            docs += 
            `
  

                    <div class="col s12 m4">
                    <div class="card teal">
                      <div class="card-action white-text">
                      <span class="white-text"><center><h5>${karakter.name}</h5></center>
                      </div>
                      <div class="card-content white-text">
                      <p> Jenis Kelamin   : ${karakter.gender} <br>
                      Lahir           : ${karakter.birth} <br>
                      Ras             : ${karakter.race} <br>
                      Pasangan        : ${karakter.spouse} <br>
                      Wafat           : ${karakter.death} <br>
                  </p>
                      </div>
                    </div>
                  </div>


            `
        });
        contents.innerHTML = '<ul class="card">' + docs + '</ul>'; 
    }).catch(err => {
        console.error(err);
    })
}

function getListMovie()
{
    title.innerHTML = "List Movie "
    fetch(viewmovie, fetchHeader)
    .then(response => response.json())
    .then(resJson => {
        console.log(resJson.docs);
        let docs = "";
        let i = 1;
        resJson.docs.forEach(movie => {
            docs += `
            <tr>
                <td style = "padding-left:20px;">${i}.</td>
                <td>${movie.name}</td>
            </tr>
            `;
            i++;
        });
        contents.innerHTML = `
        
            <table class = "stripped responsive-table">
                <thead>
                    <th>No</th>
                    <th>Movie</th>
                </thead>
                <tbody>
                    ${docs}
                </tbody>
            </table>
       
        ` 
    })
}

function loadPage(page) {
    switch (page) {
        case "books":
            getListBook();
            break;
        case "characters":
            getListCharacter();
            break;
        case "movies":
            getListMovie();
            break;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .tabs a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "books";
    loadPage(page);

    
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var ViewModal = M.Modal.init(elems);
});