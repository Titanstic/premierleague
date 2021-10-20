// UI
const season = document.querySelector("#season");
const loading = document.querySelector(".loading-container");
const standing_container = document.querySelector(".standing-container");


fetch(`https://app.sportdataapi.com/api/v1/soccer/seasons?apikey=0043b0e0-2830-11ec-92d3-3dbe1ec0f638&league_id=237`)
    .then(res => res.json())
    .then(data => {
        for (const key in data.data) {
            $("#season").append(`
                    <option value="${data.data[key].season_id}">${data.data[key].name}</option>
                `);
        }
    })
    .catch(error => console.log(error))

init();

async function init() {
    loading.style.display = "flex";
    standing_container.style.display = "none";
    await fetch(`https://app.sportdataapi.com/api/v1/soccer/standings?apikey=0043b0e0-2830-11ec-92d3-3dbe1ec0f638&season_id=352`)
        .then(res => res.json())
        .then(data => {
                let count = 1;
                let add = document.querySelectorAll(".add");
                for (let i = 0; i < add.length; i++) {
                    add[i].remove();
                }
                for (const key in data.data.standings) {
                    $(".standing-container").append(`
                    <div class="standing-headings add">
                        <div class="club-name">
                            <p>${count <10 ? `<span class="visible">0</span>${count}` : count}</p>
                            <img class="img"/>
                            <p class="club">${data.data.standings[key].team_id}</p>
                         </div>
                        <div class="standing">
                            <p>${data.data.standings[key].overall.games_played}</p>
                            <p>${data.data.standings[key].overall.won}</p>
                            <p>${data.data.standings[key].overall.draw}</p>
                            <p>${data.data.standings[key].overall.lost}</p>
                            <p>${data.data.standings[key].overall.goals_diff}</p>
                            <p>${data.data.standings[key].overall.goals_scored}</p>
                            <p>${data.data.standings[key].overall.goals_against}</p>
                            <p>${data.data.standings[key].points}</p>
                        </div>
                    </div>
                `)
            count++;
        }

        clubname();
    })
    .catch(error => console.log(error))



}

season.addEventListener("change",async function() {
    loading.style.display = "flex";
    standing_container.style.display = "none";
    await fetch(`https://app.sportdataapi.com/api/v1/soccer/standings?apikey=0043b0e0-2830-11ec-92d3-3dbe1ec0f638&season_id=${season.value}`)
        .then(res => res.json())
        .then(data => {
            let add = document.querySelectorAll(".add");
            for (let i=0;i<add.length;i++){
                add[i].remove();
            }
            let count = 1;
            for (const key in data.data.standings) {
                $(".standing-container").append(`
                    <div class="standing-headings add">
                        <div class="club-name">
                             <p>${count <10 ? `<span class="visible">0</span>${count}` : count}</p>
                            <img class="img"/>
                            <p class="club">${data.data.standings[key].team_id}</p>
                         </div>
                        <div class="standing">
                            <p>${data.data.standings[key].overall.games_played}</p>
                            <p>${data.data.standings[key].overall.won}</p>
                            <p>${data.data.standings[key].overall.draw}</p>
                            <p>${data.data.standings[key].overall.lost}</p>
                            <p>${data.data.standings[key].overall.goals_diff}</p>
                            <p>${data.data.standings[key].overall.goals_scored}</p>
                            <p>${data.data.standings[key].overall.goals_against}</p>
                            <p>${data.data.standings[key].points}</p>
                        </div>
                    </div>
                `);
                count++;
            }
            clubname();
        })
        .catch(error => console.log(error))
});


async function clubname() {
    console.log("hay");
    await fetch("https://app.sportdataapi.com/api/v1/soccer/teams?apikey=0043b0e0-2830-11ec-92d3-3dbe1ec0f638&country_id=42")
        .then(res => res.json())
        .then(data => {
            const club = document.querySelectorAll(".club");
            const img = document.querySelectorAll(".img");
            for (let index = 0; index < club.length; index++) {
                for (const key in data.data){
                    // console.log(club);
                    if (club[index].innerText == data.data[key].team_id) {
                        img[index].setAttribute("src",`${data.data[key].logo}`);
                        club[index].innerText = data.data[key].name;
                    }
                }
                // club[index].classList.remove("visible");
            }
            // $(".club").removeClass(".remove");
        })
        .catch(error => console.log(error))
    
    loading.style.display = "none";
    standing_container.style.display = "block";
}