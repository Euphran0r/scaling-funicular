Sett = {
    //tworzenie gry
    difficulty: null,
    player: null,// to tu? 
    map: null,
    color: null,
    direct: null,
    tutorial: null,
    //mechanika gry:
    kontenery: [],
    sprawdzanie: [],
    sprawdzone: [],

    //timer/rekordy
    czy_liczyc: false,
    player: null,
    rekord: null,
    timer: null,
    stop_timer: null,

    raycaster_true: true,
    orbitControl: null,

    kafelki: [],
    rury: [],
    easy: [
        [1, 2, 0, 0, 1, 2, 1, 1],
        [2, 1, 2, 0, 2, 1, 0, 0],
        [0, 0, 1, 2, 0, 2, 2, 0],
        [0, 2, 2, 2, 1, 2, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 0],
        [2, 2, 1, 2, 0, 2, 2, 0],
        [2, 1, 2, 2, 0, 2, 1, 0],
        [0, 1, 2, 1, 1, 2, 0, 0],
    ],
    medium: [
        [2, 1, 2, 0, 0, 0, 2, 1, 1],
        [2, 2, 2, 2, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 2, 2, 0, 0],
        [2, 2, 0, 2, 1, 2, 1, 0, 0],
        [1, 0, 0, 1, 0, 0, 1, 2, 0],
        [2, 1, 2, 2, 2, 0, 2, 2, 0],
        [0, 2, 2, 0, 1, 1, 2, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 0],
        [0, 2, 1, 1, 2, 2, 0, 0, 0],
    ],
    extreme: [
        [1, 2, 1, 2, 0, 1, 0, 0, 0, 0],
        [2, 2, 0, 1, 1, 2, 0, 0, 2, 1],
        [1, 0, 2, 2, 0, 0, 0, 2, 2, 2],
        [2, 0, 1, 0, 2, 1, 1, 2, 1, 0],
        [2, 1, 2, 0, 1, 0, 2, 0, 1, 0],
        [1, 0, 1, 2, 2, 1, 2, 0, 2, 2],
        [1, 0, 2, 2, 0, 0, 1, 0, 0, 1],
        [2, 1, 2, 0, 2, 1, 2, 1, 2, 2],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [2, 1, 2, 1, 2, 0, 2, 1, 2, 0],
    ],




    //loader, 
}
console.log("zrobiłem sett")