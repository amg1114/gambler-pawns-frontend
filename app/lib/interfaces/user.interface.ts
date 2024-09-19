export interface User {
    userId:                 number;
    nickname:               string;
    email:                  string;
    countryCode:            string;
    about:                  string;
    fkUserAvatarImgId:      number;
    eloRapid:               number;
    eloBlitz:               number;
    eloBullet:              number;
    eloArcade:              number;
    currentCoins:           number;
    acumulatedAlltimeCoins: number;
    nPuzzlesSolved:         number;
    streakDays:             number;
    isDeleted:              boolean;
    iat:                    number;
    exp:                    number;
}
