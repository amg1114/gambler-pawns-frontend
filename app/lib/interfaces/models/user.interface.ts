export interface User {
    userId:                 number;
    nickname:               string;
    email:                  string;
    dateOfBirth:            string;
    countryCode:            string;
    aboutText:              string;
    eloRapid:               number;
    eloBlitz:               number;
    eloBullet:              number;
    eloArcade:              number;
    currentCoins:           number;
    acumulatedAllTimeCoins: number;
    nPuzzlesSolved:         number;
    streakDays:             number;
    isDeleted:              boolean;
    userAvatarImg:          UserAvatarImg;
}

export interface UserAvatarImg {
    userAvatarImgId: number;
    fileName:        string;
}
